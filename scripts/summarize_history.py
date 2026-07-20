#!/usr/bin/env python3
"""質問者別の公式会議録抜粋から、質問項目ごとの短い抽出要約を生成する。

外部AIサービスへ会議録を送らず、質問者発言と区側答弁を分離した上で、質問項目との
語句一致、質問・答弁を示す表現、発言位置を使って重要文を選ぶ。生成後は必ず
build_history_supplements.py の厳格検証を通す。
"""

from __future__ import annotations

import argparse
import json
import math
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
QUEUE_PATH = ROOT / "scripts/out/history/qa_queue.json"

QUESTION_CUES = (
    "伺", "質問", "見解", "お考え", "考えを", "求め", "べき", "でしょうか",
    "いただきたい", "お示し", "聞かせ", "対応", "検討", "実施", "要望",
)
STRONG_QUESTION_CUES = (
    "伺", "お聞かせ", "見解", "お考え", "考えを", "求め", "べき", "でしょうか",
    "いただきたい", "お示し", "いかがでしょう", "質問", "要望", "提案",
)
ANSWER_CUES = (
    "答え", "区では", "区は", "考えて", "進め", "実施", "検討", "努め", "予定",
    "取り組", "対応", "支援", "連携", "行って", "まいり", "図って", "設置",
)
# 本会議の議事進行だけを除外する。選挙管理委員会委員長など、行政側の
# 「委員長」は実質的な答弁者なので除外しない。
CHAIR_TERMS = ("議長", "副議長")
BOILERPLATE = (
    "ご質問についてお答え", "一般質問にお答え", "代表質問にお答え",
    "私からは", "初めに", "次に", "続きまして", "最後に",
)

# 自動照合では同じ答弁ブロック内の別見出しを選びやすかった項目を、
# 公式会議録で個別確認した上で固定する。
ANSWER_OVERRIDES = {
    ("r01-2t", "吉田ゆみこ", "羽田新飛行ルート計画に対する「品川区としての地元の意見」 のまとめ方について"):
        "区議会の決議や区民から寄せられた声を踏まえ、落下物・騒音対策、丁寧な説明、飛行ルートを固定化しない検討を国に求めます。連絡会での発言内容は、必要に応じて適切な方法で公開する方針です。",
    ("r02-1t", "大 沢 真 一", "若者の政治参加について"):
        "若年層の低投票率を課題と捉え、区内大学との連携や小中学生の模擬選挙を進めています。若者会議の展開を研究し、市民科・社会科での主権者教育や電子的手法を含む啓発の充実を図ります。",
    ("r02-1t", "若 林 ひろき", "ＳＤＧｓ・貧困の連鎖解消等について"):
        "子どもの相対的貧困率は国の調査で13.9％とされ、区は学習・経済・就労・食の支援を実施しています。フードパントリー支援なども加え、貧困の連鎖を断つ取組を充実させます。",
    ("r02-1t", "若 林 ひろき", "ＳＤＧｓ・がん対策について"):
        "品川区がん対策推進計画に基づき、正しい知識の普及、肺がん検診未受診者への受診勧奨、夜間相談窓口などを進め、がん対策を総合的・計画的に推進します。",
    ("r02-1t", "若 林 ひろき", "ＳＤＧｓ・障がい児者支援について"):
        "相談支援と地域生活支援を充実させ、グループホーム整備への公有地取得や助成拡充を予定しています。事業者間の連携を深め、心身障害者福祉会館の老朽化も総合的に検討します。",
    ("r02-1t", "若 林 ひろき", "ＳＤＧｓ・安全なトイレについて"):
        "学校トイレは洋式化90％の早期達成を目指し、公衆・公園トイレも全便器の洋式化を進めます。洗浄便座の検証や、非常用ボタン・手すり・外開き扉など安全面の改善も継続します。",
    ("r02-1t", "若 林 ひろき", "ＳＤＧｓ・中小企業等支援について"):
        "小規模事業者向け融資や事業承継支援に加え、自動化・ロボット化による生産性向上を支援しています。高齢者や障害者の就労支援、最低制限価格の課題にも取り組みます。",
    ("r02-1t", "若 林 ひろき", "ＳＤＧｓ・公共交通インフラについて"):
        "地域特性や高齢者を含む利用者の利便性を踏まえてコミュニティバスのルート等を検討し、民間のノウハウで持続性を確保します。舟運やＭａａＳの活用も関係会議で検討します。",
    ("r02-1t", "芹 澤 裕次郎", "バリアフリーについて"):
        "手話を聴覚障害者の重要なコミュニケーション手段と捉え、手話言語条例は他自治体の状況も参考に検討します。障害の有無にかかわらず楽しめるボッチャなどの普及にも取り組みます。",
    ("r02-1t", "藤 原 正 則", "待機児童対策について"):
        "認可保育園の申請増に対し、認証保育所や年間保育を活用して待機児童は実質的に解消できる見込みとしました。今後も保育需要の増加を踏まえた整備計画を進めます。",
    ("r03-1t", "中 塚 亮", "新型コロナ危機から住民の命と暮らしを守り抜くため、緊急に検査体制、医療及び事業所の支援強化を"):
        "感染が疑われる施設では無症状者にも検査を行い、高齢者・障害者施設の従事者検査を再実施します。中小企業には融資あっせんや区独自助成を進め、給付金や消費税は国で議論すべき事項としました。",
    ("r03-1t", "中 塚 亮", "実効性ある首都直下大震災及び豪雨災害への対策を直ちに"):
        "不燃化特区と感震ブレーカー助成の対象地域を拡大し、当面は対象地域の防災性向上を重点的に進めます。避難所環境は備蓄資機材と国・都・民間からの調達を組み合わせ、避難から生活支援までを含む個別計画を作成します。",
    ("r03-1t", "大 沢 真 一", "施政方針について"):
        "区民の声と状況を把握し、生活安定に向けた施策を実行することが区長の役割とし、区政運営を進めます。ワクチンや感染症対策は動画なども活用して区民に届く情報発信に努めます。",
    ("r03-1t", "大 沢 真 一", "新長期基本計画について"):
        "コロナ禍と自然災害の同時発生に備え、避難所運営や救命・インフラ復旧を国・都と連携して検討します。行政手続のオンライン化、心のケア、子育て環境なども各担当で進めます。",
    ("r03-1t", "大 沢 真 一", "新型コロナウイルス関連支援について"):
        "飲食店等への支援は国・都制度に加えて区独自助成や融資を案内し、生活困窮者には相談・住居確保給付金・貸付等を組み合わせて支援します。ワクチン接種や大会時の感染防止体制も関係機関と調整します。",
    ("r03-1t", "須 貝 行 宏", "東京五輪の延期を要請するべきでは"):
        "国・東京都・大会組織委員会などが安心・安全な開催に向けたルールと体制を検討しているとして、区から大会延期を要請する考えはないと答弁しました。",
    ("h30-1t", "渡部茂", "濱野区長の施政方針をうけて"):
        "基本構想は今後も尊重し、新長期基本計画に総合戦略を包含して町会・自治会支援などの重点施策を明確にし、平成31年度中の策定を目指すと答弁しました。",
    ("h30-1t", "渡部茂", "品川の教育について"):
        "全校でコミュニティ・スクール導入を進め、人材情報を学校間で活用しやすく整理します。学校選択制等は学事制度審議会の最終答申を受けて制度設計を検討し、オリンピック・パラリンピック教育や英語科も充実すると答弁しました。",
    ("h30-1t", "渡部茂", "未来の品川区に向けて"):
        "オリンピック・パラリンピックを品川区が飛躍する好機と捉え、にぎわいやまちづくりを拡充するとともに、防災・福祉の基盤を強化し、今後も区政のかじ取りを担う考えを示しました。",
    ("h30-1t", "南恵子", "公約実現の最終年、区長は責任をもって待機児ゼロに"):
        "一次申込み3,636人のうち内定2,681人、不承諾955人で、空きスペース活用や認可外保育施設等の助成を案内すると説明しました。二次募集の空きや1,400人超の定員拡大などを重ね、待機児童ゼロを目指すと答弁しました。",
    ("h30-1t", "南恵子", "国会発議が狙われる今 区長は９条改憲に反対表明を"):
        "外交・防衛と憲法に関する事項は国が担い、憲法改正は国会で十分に議論されるべきであるとして、区長として改憲への賛否は示しませんでした。",
    ("r01-3t", "あべ 祐美子", "SDGｓと品川区政について"):
        "長期基本計画では策定委員の増員、区政モニター、団体との意見交換、電子アンケートなどで意見を集めており、今後も住民参画の機会を広げると答弁しました。ジェンダー平等は計画に反映し、若年層への啓発と相談対応を進めるとしました。",
    ("r01-3t", "安藤 たい作", "人口激増であふれる駅 ゼネコンの儲けのために税金投入で進める超高層再開発は止めよ"):
        "大崎駅西口Ｆ南地区は、土地の合理的利用と防災性向上を図るため権利者が進める事業であり、区は再開発準備組合へ区民の意見や地域課題を伝え、駅混雑などにも関係機関と対応すると答弁しました。",
    ("r03-1t", "新妻 さえ子", "がん対策について"):
        "がん検診の啓発資料を刷新し、乳がん・子宮がん検診では40代・50代の未受診者へ個別に再勧奨します。仕事との両立支援冊子にQRコードやアピアランスケア情報を加え、HPVワクチンは全対象者へ案内すると答弁しました。",
    ("r03-1t", "渡 部 茂", "品川区の教育について"):
        "新学事制度の運用状況、全児童・生徒へのタブレット配備、35人学級への移行と教室・教員確保を説明しました。感染予防と心のケアを行いながら学びを保障すると答弁しました。",
    ("r03-3t", "大 沢 真 一", "オリンピック・パラリンピック開催による区行政・財政への影響について"):
        "延期・無観客化に伴い事業の中止や手法変更を行い、不要な予算は減額したと説明しました。大会経費の負担枠組みに区は含まれず、国・都等から追加負担を求められることはないと答弁しました。",
    ("r03-3t", "若 林 ひろき", "認知症施策について"):
        "認知症サポーターは延べ1万8,505人で、ステップアップ講座や地域活動を支援します。通いの場を認知症予防にも生かし、認知症検診の内容・対象年齢は医師会と効果的な方法を検討すると答弁しました。",
    ("r04-1t", "若 林 ひろき", "子育て等について"):
        "保育士等の処遇改善を国の補助制度で実施し、産後の家事育児支援を拡充します。子育て世帯への臨時給付金は迅速なシステム改修などにより年内支給を実現しました。",
    ("r04-1t", "若 林 ひろき", "防災について"):
        "要支援者の個別避難計画を本人・家族と作成し、福祉避難所への直接避難を周知します。新防災ラジオを普及させ、目黒川上流の調節池は早期整備を東京都へ要望すると答弁しました。",
    ("r04-1t", "つ る 伸一郎", "品川区のSDGsの取り組みについて"):
        "エコルとごしで子どもたちが環境課題を協議できる場を検討するとともに、サステナブルファッションショーやパネルディスカッションを今後の環境講座・イベントで検討してまいります。",
    ("r04-1t", "藤 原 正 則", "待機児童対策について"):
        "令和４年度も引き続き保育需要を充足できる見込みであり、待機児童は発生しないと見通しております。",
    ("r04-1t", "藤 原 正 則", "火山災害について"):
        "火山灰は目、鼻、喉など人体へ異常を生じさせる場合があり、交通やライフラインにも影響し得るため、地域防災計画に災害対策本部の設置や情報伝達などの降灰対策を定めております。",
    ("r04-1t", "湯 澤 一 貴", "コロナ不安について"):
        "保育園で陽性者が発生した際は、保健所と所管課が連携して濃厚接触者を迅速に特定し、自宅待機方針を伝えるなど、個別状況に応じた対応で園の不安や混乱の解消に努めております。",
    ("r04-1t", "横 山 由香理", "ハラスメント防止対策について"):
        "この項目について区側の具体的な答弁は記録されておらず、議員が政治分野のハラスメント防止研修や周知啓発を要望しました。",
    ("r04-1t", "安 藤 たい作", "子どもの権利条例を策定し、子どもの人権と尊厳を大切にする 学校教育を"):
        "子どもの権利条例について、教育委員会として検討委員会を設置する予定はないと答弁しました。",
    ("r04-2t", "松 澤 和 昌", "環境について"):
        "エコルとごしでは社会科見学や講座・イベントの際にアンケートを行って施設運営の質の向上に役立てており、今後も子どもたちをはじめ幅広い層の声を生かしてまいります。",
    ("r04-2t", "木 村 けんご", "コロナウイルスの影響か、 生徒の１割から２割にうつ症状が出ている事について"):
        "うつ症状の兆候や長期化するコロナ禍など複数の要因を説明し、学校ではスクールカウンセラーや医療機関と連携して、本人の体調に合わせた支援を行うと答弁しました。",
    ("r04-2t", "木 村 けんご", "大事な家族、夢や希望を与えてくれるぺット達の殺処分ゼロに"):
        "東京都では犬・猫とも殺処分ゼロを達成しており、区は不妊・去勢手術費の助成、適正飼養の啓発、他自治体やボランティアの取組の研究を続け、殺処分ゼロの継続を目指すと答弁しました。",
    ("r04-2t", "西 本 たか子", "区政運営について"):
        "教育改革や待機児童対策などの成果と健全財政を基盤に区政を進めてきたと評価し、今後も区民の幸福度向上を大切に、社会情勢の変化へ対応して前進を続けるべきと考えております。",
    ("r04-2t", "渡 部 茂", "品川区政について"):
        "区長４期16年間で様々な課題に取り組み、区民の幸せを増やし不幸せを減らす区政を展開できたと振り返りました。",
    ("r04-3t", "安藤 たい作", "一人ひとりの子どもの育ちが保障される保育に区が責任を果たせ"):
        "私立保育園には人件費比率の引上げだけでなく、職員宿舎借上げ支援など幅広い運営支援を行い、法令に基づく指導検査を実施します。区立保育園の民営化はガイドラインに沿って進める方針です。",
    ("r04-3t", "鈴木 博", "品川区の教育について"):
        "子どもの読書活動は表現力や想像力を育む上で欠かせないと考え、子ども読書活動推進計画に基づく環境整備や、10代向け蔵書の充実を進めております。",
    ("r04-3t", "新妻 さえ子", "高齢者が安心して暮らせる品川区について"):
        "簡易的な認知機能検査である「あたまの健康チェック」は、検査信頼度の研究や他自治体の動向を調査した上で、機器の導入を検討してまいります。",
    ("r04-3t", "鈴木 ひろ子", "障害者福祉は、一人ひとりの人権が保障される支援へ、 質量ともに抜本的に拡充を"):
        "医療的ケアが必要な方のニーズを調査して関係機関と対応を検討し、グループホームや障害者施設の整備は、土地確保の課題を踏まえて次期障害福祉計画の中で検討してまいります。",
    ("r04-4t", "高橋 伸明", "脱炭素社会に向けた区独自の取組みについて"):
        "子どもたちが環境に関心を持ち、自ら考えて発信し、具体的な取組を実践することが、将来の脱炭素社会の実現に重要な役割を果たすと考えております。",
    ("r04-4t", "おくの 晋治", "23区で最低に落ち込んだ品川の福祉は抜本的に引き上げを 旧第一日野小跡地に特養ホームを"):
        "特別養護老人ホームは区内12か所・定員973人分を整備済みで、八潮南の増改築や小山台住宅等跡地複合施設により定員を増やします。地域包括支援センターの機能強化、障害者グループホーム整備、保健師増員にも取り組みます。",
    ("r04-4t", "芹澤 裕次郎", "教育について"):
        "学校では市民科を中心にディベートのスキルを身につけ、互いに納得できる解決策を見いだす活動を行い、議論や交渉に必要なコミュニケーション能力を育成しております。",
    ("r05-1t", "渡辺 裕一", "心と体、地域を元気にする文化スポーツ政策について"):
        "若い世代から文化スポーツ施設の整備要望が高いことを認識しており、用地や経費の課題を踏まえ、区有地だけでなく民間の動向も注視しながら新たな活動場所を検討してまいります。",
    ("r05-1t", "若林 ひろき", "環境について"):
        "ゼロカーボンシティ宣言を令和５年４月に予定し、事業者の太陽光・蓄電池等を支援します。フードドライブは約２トンに増え通年化し、製品プラスチック回収の全区展開と給水機の拡充を進めると答弁しました。",
    ("r05-1t", "若林 ひろき", "防災について"):
        "2000年までに建築された新耐震の木造住宅について、東京都と連携した耐震助成制度の実施に向け、都の動向を注視しながら検討してまいります。",
    ("r05-1t", "石田 ちひろ", "戦争国家づくりは許さない 敵基地攻撃能力と大軍拡に反対を"):
        "非核平和都市品川宣言に込められた思いを区民へ着実に伝え、核兵器廃絶と恒久平和の確立に向けた取組を継続してまいります。",
    ("r05-1t", "石田 ちひろ", "社会保障のさらなる切り捨てを許さず、 命・暮らしを守る福祉の充実を"):
        "高齢者介護の需要増と生産年齢人口の減少を見据え、地域ニーズに対応したサービス基盤の整備や人材確保を進めるため、第九期介護保険事業計画の改定作業を進めてまいります。",
    ("r05-1t", "つる 伸一郎", "SDGsについて"):
        "経済と環境が両立するＳＤＧｓしながわを目指し、令和５年度は全体計画とモデル事業を策定してＳＤＧｓ未来都市へ提案し、講演会などで区民・事業者の意識醸成を図ります。",
    ("r05-1t", "渡部 茂", "品川区政について"):
        "職員には、区民とともに進めること、前例にとらわれない発想、ワークライフバランスの充実を求め、対話を重ねながら強いチームをつくってまいります。",
    ("r05-1t", "渡部 茂", "新庁舎整備について"):
        "基本計画素案へのパブリックコメントや策定委員会の議論、区長選挙での論点を踏まえ、庁舎周辺の一体的なまちづくりの観点から調整して基本計画を策定しました。",
    ("r05-1t", "渡部 茂", "子ども若者・子育て支援について"):
        "若者と地域の大人が触れ合える拠点や仕組みが必要との意見を踏まえ、児童センターとの融合も含めて具体的な若者支援を検討してまいります。",
    ("r05-1t", "せお 麻里", "インクルーシブ教育について"):
        "区立小学校内に新設する特別支援学級では、児童の実態と保護者の意向を踏まえ、通常学級との交流や共同学習が一層深まるよう体制づくりに努めてまいります。",
    ("r05-2t", "こしば 新", "高齢者を含む移動が困難な方への外出支援"):
        "バス事業者へ路線や運行間隔の改善を働きかけるとともに、外出介助サービスや福祉タクシー利用券など、移動が困難な方に必要な支援へ取り組んでまいります。",
    ("r05-2t", "つる 伸一郎", "誰もが安全と安心を体感できる品川区について"):
        "個人宅防犯カメラ助成は課題を整理して研究し、学校の登下校管理は費用面から国の動向を注視します。避暑シェルターは59か所で前倒し開設し、給水機を区役所や水族館へ広げると答弁しました。",
    ("r05-2t", "塚本 よしひろ", "経済と環境が両立するSDGｓしながわについて"):
        "デジタル商品券は店舗負担やデジタル利用が難しい人への配慮を含め商店街連合会と協議します。製品プラスチックは年間約500トン、資源化率0.5ポイントの上昇を見込み、分別周知を進めると答弁しました。",
    ("r05-2t", "松永 よしひろ", "防災対策について"):
        "品川区防災地図を全面改訂して全戸配布し、啓発動画も作成しました。訓練の場で防災ハンドブックや防災地図を活用することも検討してまいります。",
    ("r05-2t", "藤原 正則", "福祉施設の人材確保について"):
        "介護職員等の処遇改善加算取得を支援した結果、区内の地域密着型介護サービス事業所では取得率が９割を超えており、引き続き必要な情報提供と支援を行います。",
    ("r05-3t", "ゆきた 政春", "AEDについて"):
        "他自治体でコンビニへのＡＥＤ設置事例が増えたことを受け、区でもコンビニ事業者との協議を始め、引き続き設置拡大に取り組んでまいります。",
    ("r05-3t", "横山 由香理", "子ども・若者・家庭の支援について"):
        "子どもの生育環境で将来の選択肢が狭まらないよう、環境格差への対応と均等な教育機会の確保を重点課題とし、学習や食の支援を進めてまいります。",
    ("r05-3t", "横山 由香理", "危機管理について"):
        "地域の初期消火体制を支える区民消火隊やミニポンプ隊への支援、避難所運営物資の整備、防災訓練などを通じ、災害時の共助を担う方々への支援を充実してまいります。",
    ("r05-1t", "大倉 たかひろ", "高齢者も障がいのある方も安心を実感できる品川"):
        "訪問診療や訪問服薬指導について、医療・介護の連携会議で地区別に情報共有と情報提供を行っており、訪問マッサージの施術業者についても現状を調べると答弁しました。",
    ("r06-1t", "高橋 伸明", "新庁舎整備について"):
        "広町地区と商店街や大井町駅周辺地域との歩行者の回遊性を高めるため、動線の確保など具体的な整備内容を関係者と検討し、地域のにぎわい創出につなげてまいります。",
    ("r06-1t", "大倉 たかひろ", "DX推進の取り組みについて"):
        "デジタル技術は加速度的に進化しており、区民の利便性向上や業務改善が大きく見込まれるものについては、年度途中においても積極的に取り組んでまいります。",
    ("r06-1t", "大倉 たかひろ", "安心安全の取り組みについて"):
        "安全・安心な地域社会を構築するために再犯防止が重要であると認識し、必要な方を保健医療や福祉などの支援につなげるため、関係機関と連携して庁内横断的に取り組む計画を策定しました。",
    ("r06-1t", "せお 麻里", "施政方針"):
        "区民目線に立つ職員の柔軟な発想を生かした事業展開と政策形成能力の向上を目的に、全職員から事業提案を募集し、９事業を予算化しました。",
    ("r06-1t", "せお 麻里", "教育"):
        "特別支援学級では区独自の学習支援員を配置して個々の特性に配慮し、通常学級との交流・共同学習を通じて、互いを尊重し合う大切さを学ぶ機会を設けております。",
    ("r06-1t", "ゆきた 政春", "災害対策について"):
        "トイレトレーラーの導入および職員の牽引免許取得については、他自治体の事例も参考にしながら研究してまいります。",
    ("r06-1t", "ゆきた 政春", "AEDについて"):
        "区内コンビニエンスストア90か所への設置が加われば、夜間・休日を問わず24時間対応でき、全308か所・380台へ大幅に拡充できます。",
    ("r06-1t", "ひがし ゆき", "包括的性教育について"):
        "保護者に対しては、区民団体による未就学児等対象の性教育セミナーが開催されていることから、そうした機会も活用し、周知・啓発を図ってまいります。",
    ("r06-1t", "やなぎさわ聡", "家計のひっ迫はウェルビーイングの大敵。 今こそ区の貯金（基金）の積極活用を！"):
        "区民の生活状況等の把握に努め、国や東京都の動向も注視しながら、区民に最も身近な基礎自治体として各種支援策を推進してまいります。",
    ("r06-1t", "やなぎさわ聡", "こどものウェルビーイングを守れ！ STOP！大人によるこどもへの人権侵犯（品川翔英高校について）"):
        "私立学校について区は直接指導・監督する立場にはありませんが、区内在学の生徒から相談がある場合は、関係窓口を通じて所管する東京都などにつないでまいります。",
    ("r06-1t", "せりざわ裕次郎", "妊娠、出産の支援"):
        "妊娠中でもオンラインで就業相談やセミナーに参加できるようにし、女性向けの創業支援や託児サービスも提供しながら、女性のキャリア形成を支援してまいります。",
    ("r06-2t", "松永 よしひろ", "防災対策について"):
        "災害時は緊急輸送道路を確保し、陸路以外にもヘリポートを活用した空輸や船着場を活用した水上輸送の体制を整備しております。",
    ("r06-2t", "吉田 ゆみこ", "障がい者の多様な働き方の確保について"):
        "現在行っている超短時間雇用のマッチングを検証する際に、就労継続支援事業の受注拡大を含め、どのような範囲に応用できるか検討していきたいと考えております。",
    ("r06-3t", "せお 麻里", "障がい児支援"):
        "５歳児健診を円滑な就学に向けた必要な支援につなげる重要な機会と捉え、母子保健、子育ておよび教育に関する部署が協働し、実施に向けて準備を進めております。",
    ("r06-3t", "せお 麻里", "子育て支援"):
        "病児保育に対応可能なベビーシッターは区の利用支援事業で利用できるため周知に努め、区独自支援や対象年齢の拡大も検討してまいります。",
    ("r06-3t", "大倉 たかひろ", "再犯防止について"):
        "保護司の人材確保に向けて他自治体の先行事例を研究し、広報しながわなどを活用して保護司活動の周知に努めてまいります。",
    ("r06-3t", "藤原 正則", "民生委員の現状と課題について"):
        "地域の身近な相談相手として区民と行政・専門機関をつなぎ、地域福祉の根幹を培ってきた民生委員・児童委員に、あらゆる機会を捉えて感謝を伝えております。",
    ("r06-3t", "せらく 真央", "子ども達がのびのび過ごせる場について"):
        "平日の放課後の校庭利用について、保護者や子ども、地域の声を伺い、既存の放課後活動との関係や他自治体の事例も踏まえて検討してまいります。",
    ("r06-3t", "せらく 真央", "水辺の安全教育について"):
        "オンライン教材については、年間指導計画等を作成する際の参考にできるよう、各校に情報提供してまいります。",
    ("r06-3t", "石田 しんご", "人づくりこそ地域づくりについて"):
        "国や都に先駆けて学校給食や補助教材費を無償化し、本定例会では補助教材費無償化の対象を特別支援学校へ広げる補正予算を提案しております。",
    ("r06-4t", "えのした 正人", "子育て支援について"):
        "朝の時間帯に児童の安全・安心な居場所を学校内に設ける事業の検討を開始し、数校でのモデル実施を経て全校展開を目指します。",
    ("r06-4t", "山本 やすゆき", "教育の質Ｎｏ．1のまち、しながわ 子どもたちの無限の可能性を引き出す学校教育の仕組み、実現へ"):
        "学習用のマインクラフトや桃太郎電鉄など複数校で導入実績がある教材を含め、教育系アプリの事例を集めて各校に紹介してまいります。",
    ("r06-4t", "山本 やすゆき", "リアルの感動体験で子どもたちに夢を、区民の皆さまに活力を 防災拠点施設としても有効な、品川アリーナ構想、実現へ"):
        "東京都競馬株式会社との包括連携協定に基づき、同社が行うスポーツ・文化・エンターテインメント施設等の整備や施設の区民利用、周辺エリアの付加価値向上について連携・協力してまいります。",
    ("r07-1t", "若林 ひろき", "人権について"):
        "こうしたことから、今回、同性パートナーの方が事実婚の方と同様の権利を得られるよう各種社会保障制度等の改正についての検討などを、品川区のほか賛同した９区と共に国に対して申し入れたものです。",
    ("r07-1t", "大倉 たかひろ", "安心安全を守る取り組みについて"):
        "マンションごとの防災対策の進捗に応じた支援を進め、防災区民組織との連携や地域の防災訓練への参加など、共助の仕組みづくりを推進します。",
    ("r07-1t", "おぎの あやか", "外国人との共存社会について"):
        "今後も区民と在住外国人や訪日外国人との交流を深め、互いに安心して暮らしていけるよう取り組むことが重要と捉えています。",
    ("r07-3t", "こしば 新", "海外からの人材受け入れと外国人との共生について"):
        "モンゴルとの交流をさらに深めながら、引き続き技術人材の採用支援に力を入れます。",
    ("r07-4t", "澤田 えみこ", "性被害について"):
        "盗撮目的のカメラ探索機については、探知方法や精度の違い、探知作業を誰が行うかといった課題の整理が必要と考えています。",
    ("r07-4t", "須貝 行宏", "監査の識見がない上に監査される側にいる議員を、 区長はなぜ時給６万円の監査委員に選ぶのか"):
        "議員選出監査委員は政策的な知見を有し、政策の実効性や妥当性の視点から監査が期待できるため、議会の同意を得て選任しています。",
    ("r07-4t", "藤原 正則", "選挙公費負担について"):
        "選挙公費負担に関する答弁の詳細は、公式会議録で確認できます。",
    ("r07-4t", "高橋 しんじ", "産業振興施策について"):
        "社会経済情勢を的確に把握し、中小企業の新たな挑戦や区内産業の振興・活性化に必要な取組を切れ目なく実施するよう検討します。",
    ("r02-2t", "鈴 木 博", "品川区の子育て支援施策について"):
        "保育園では国と区のガイドラインに基づき、手洗い・消毒・換気や密集を避ける工夫を行い、年齢や発達段階、各園の実情に応じた感染症対策を強化すると答弁しました。",
    ("r02-2t", "鈴 木 博", "品川区の教育について"):
        "学校では発達段階に応じた感染症予防と差別防止を教え、区立学校版ガイドラインに基づく対策を実施しています。メディアリテラシー教育を充実し、生活アンケートや面談で休校後のストレスも把握すると答弁しました。",
    ("r02-1t", "若 林 ひろき", "ＳＤＧｓ・学校教育について"):
        "教員の在校時間をより厳格に管理し、外部人材の活用など働き方改革を進めます。市民科の教科書でも持続可能な開発目標を扱い、世界で活躍する人材を育てる指導を充実すると答弁しました。",
    ("r02-1t", "若 林 ひろき", "ＳＤＧｓ・防災について"):
        "木密地域の除却助成などで不燃領域率が約５ポイント向上したと評価し、都の事業延伸後も不燃化を進めます。非常用電源、避難所環境、情報発信、無電柱化、障害者避難支援も拡充すると答弁しました。",
    ("r02-1t", "せ お 麻 里", "インクルーシブ公園について"):
        "ワークショップで誰もが楽しめる遊具など70件超の案を得て、アイデアブックと基本構想に反映します。大井坂下公園を改修し、整備後も利用者の意見を聞いて改善すると答弁しました。",
    ("h30-1t", "松永よしひろ", "住みやすい品川区の実現について"):
        "シェアサイクルを区内全域へ展開し、他区との連携・相互乗り入れができるよう準備を進めており、利用ニーズに合った運用を課題として整備を進めると答弁しました。",
    ("r03-1t", "須 貝 行 宏", "コロナで企業と区民は減収で崖っぷち。区長と区議も給与の削減を"):
        "区長・区議会議員の給料、報酬、期末手当は報酬等審議会の審議と議会の議決を経て条例で定めており、令和2年第4回定例会では特別職と区議の期末手当を引き下げたと答弁しました。",
    ("r03-4t", "小 芝 新", "衆院選の投票と主権者教育について"):
        "児童・生徒の関心が高い政治ニュースを題材にICTを活用して議論する提案も踏まえ、主権者教育のさらなる充実に努めると答弁しました。",
    ("r03-2t", "湯 澤 一 貴", "子どもたちの学びについて"):
        "ICT支援員が機器管理と授業づくりを支え、市民科や英語教育とICTを組み合わせて教育の質を高めます。デジタル教科書の活用を検討し、体育ではマスク不要を周知して個別の事情にも配慮すると答弁しました。",
    ("h30-4t", "高橋しんじ", "産業振興施策について"):
        "モンゴル高専との交流を区内中小製造業の技術者確保につなげ、在留資格の手続支援と文化・生活環境の違いを踏まえた定着支援を行うと答弁しました。",
    ("h30-4t", "木村けんご", "特殊詐欺から狙われる高齢者を守るには"):
        "区内の特殊詐欺被害が前年より増加している状況を示し、警察と連携した注意喚起、自動通話録音機の貸与、民生委員等を通じた啓発を継続すると答弁しました。",
    ("h30-2t", "石田ちひろ", "羽田新ルートの容認、二枚舌、隠ぺいは許されない 計画撤回を国に求める区政に転換を"):
        "国の落下物対策は具体的内容が示されていないため、万が一にも落下物がない取組を示すよう国に求める一方、区長と国との交渉記録は従来の申入れ内容と同じため作成不要と判断したと答弁しました。",
    ("r01-3t", "安藤 たい作", "区民、区議会決議を無視し羽田新ルート計画を受け入れた区長に資格なし 濱野区長の辞職を求める"):
        "新飛行ルートは国が責任を持って判断・実施する事業であり、区は騒音・落下物対策とルートを固定化しない取組を引き続き国に求めるとの立場を示しました。",
}

# 発言順とデータ上の大項目順が一致せず、別項目の質問文を選びやすい箇所を
# 公式会議録の質問内容に沿った短文へ固定する。
QUESTION_OVERRIDES = {
    ("h30-1t", "渡部茂", "濱野区長の施政方針をうけて"):
        "基本構想・長期基本計画・総合戦略の整合と見直し時期を尋ね、町会・産業、子育て・福祉、環境、防災など施政方針の重点施策を提案しました。",
    ("h30-1t", "渡部茂", "品川の教育について"):
        "コミュニティ・スクール、地域人材の共有、学校選択制、オリンピック・パラリンピック教育、市民科・英語科、区固有教員について質問しました。",
    ("h30-1t", "渡部茂", "未来の品川区に向けて"):
        "東京2020大会や福祉、防災、産業、まちづくり、教育などの重要施策を挙げ、将来の区政運営と区長選への考えを尋ねました。",
    ("h30-1t", "南恵子", "公約実現の最終年、区長は責任をもって待機児ゼロに"):
        "認可保育園の申込み・内定・不承諾数と年齢別内訳を確認し、不承諾となった家庭への緊急支援、必要数の認可保育園整備、保育課の職員増を求めました。",
    ("h30-1t", "南恵子", "国会発議が狙われる今 区長は９条改憲に反対表明を"):
        "憲法9条改正への区長の認識を問い、戦争が区民の福祉と暮らしを損なうとの立場から、区長に反対表明を求めました。",
    ("r01-3t", "あべ 祐美子", "SDGｓと品川区政について"):
        "SDGsを区の各施策に反映し、長期計画などの策定に住民参加を広げること、包括的性教育と若者が利用できる相談の場を整えることを求めました。",
    ("r04-1t", "若 林 ひろき", "子育て等について"):
        "議員は、保育士・介護士等の処遇改善、訪問家事育児支援、子育て世帯への臨時給付金の対応について質問しました。",
    ("r04-1t", "つ る 伸一郎", "品川区のSDGsの取り組みについて"):
        "議員は、エコルとごしで子どもたちが環境課題を協議する場、サステナブルファッションの催し、障害者就労につながるアップサイクルについて質問しました。",
    ("r04-1t", "つ る 伸一郎", "子育て支援について"):
        "議員は、ベビーシッター一時預かり利用支援、すまいるスクールの長期休業中の昼食支援、コロナ禍の学習支援について質問しました。",
    ("r04-1t", "若 林 ひろき", "防災について"):
        "議員は、避難行動要支援者の個別計画、福祉避難所への直接避難、防災ラジオ、目黒川の流域治水について質問しました。",
    ("r04-1t", "横 山 由香理", "ハラスメント防止対策について"):
        "議員は、政治分野のハラスメント相談窓口やガイドライン、候補者向け研修と周知啓発について質問しました。",
    ("r04-1t", "安 藤 たい作", "子どもの権利条例を策定し、子どもの人権と尊厳を大切にする 学校教育を"):
        "議員は、子どもや区民が参加する検討委員会を設け、子どもの権利条例を制定するよう質問しました。",
    ("r04-2t", "西 本 たか子", "区政運営について"):
        "議員は、これまでの区政運営を評価した上で、変化の激しい時代に対応する積極的な区政運営と情報公開について質問しました。",
    ("r04-2t", "木 村 けんご", "コロナウイルスの影響か、 生徒の１割から２割にうつ症状が出ている事について"):
        "コロナ禍で中等度以上のうつ症状がみられる子どもの割合を踏まえ、症状や原因、学校での発見・支援、児童・生徒への接し方を尋ねました。",
    ("r04-2t", "木 村 けんご", "大事な家族、夢や希望を与えてくれるぺット達の殺処分ゼロに"):
        "東京都の犬猫の取扱実績と殺処分ゼロを続ける取組、ボランティアとの連携、マイクロチップ制度の周知について尋ねました。",
    ("r04-3t", "安藤 たい作", "一人ひとりの子どもの育ちが保障される保育に区が責任を果たせ"):
        "議員は、私立保育園の保育士の処遇と配置基準、指導検査、区立保育園の役割と民営化方針について質問しました。",
    ("r04-3t", "鈴木 博", "品川区の教育について"):
        "議員は、子どもの読書離れを踏まえ、品川区の読書推進活動について質問しました。",
    ("r04-3t", "鈴木 ひろ子", "障害者福祉は、一人ひとりの人権が保障される支援へ、 質量ともに抜本的に拡充を"):
        "議員は、医療的ケア児者への支援、緊急通報制度、グループホームと障害者施設の整備拡充について質問しました。",
    ("r04-4t", "おくの 晋治", "23区で最低に落ち込んだ品川の福祉は抜本的に引き上げを 旧第一日野小跡地に特養ホームを"):
        "議員は、特別養護老人ホームと地域包括支援センター、障害者グループホーム、保健師の増員、旧第一日野小学校跡地への特養整備について質問しました。",
    ("r05-1t", "若林 ひろき", "高齢者等への支援について"):
        "議員は、加齢性難聴の高齢者に対する補聴器購入費助成の開始時期、対象、助成額、周知方法について質問しました。",
    ("r05-1t", "若林 ひろき", "防災について"):
        "議員は、新耐震基準の木造住宅の耐震化と、東京都の助成制度を活用した区の支援について質問しました。",
    ("r05-1t", "石田 ちひろ", "戦争国家づくりは許さない 敵基地攻撃能力と大軍拡に反対を"):
        "議員は、敵基地攻撃能力や軍備拡大への区長の認識と、非核平和都市品川宣言に基づく平和への取組について質問しました。",
    ("r05-1t", "石田 ちひろ", "社会保障のさらなる切り捨てを許さず、 命・暮らしを守る福祉の充実を"):
        "議員は、介護保険、国民健康保険、特別養護老人ホーム、地域包括支援センターなど、社会保障と高齢者福祉の拡充について質問しました。",
    ("r05-1t", "渡部 茂", "新庁舎整備について"):
        "議員は、新庁舎整備の検討経緯、規模、スケジュールと、庁舎跡地を含むまちづくりへの区民参加について質問しました。",
    ("r05-1t", "渡部 茂", "子ども若者・子育て支援について"):
        "議員は、児童センターの今後の役割、若者と地域をつなぐ拠点、子どもの遊びと異年齢交流について質問しました。",
    ("r05-2t", "松永 よしひろ", "高齢者支援について"):
        "議員は、高齢者クラブの会員減少や活動場所の課題を踏まえ、クラブ活動を継続するための区の支援について質問しました。",
    ("r05-3t", "ゆきた 政春", "AEDについて"):
        "議員は、コンビニなどへのＡＥＤ設置拡大、学校での救命教育、ＡＥＤ検索アプリ、女性に配慮した使用方法について質問しました。",
    ("r06-1t", "大倉 たかひろ", "DX推進の取り組みについて"):
        "議員は、先進技術による区民サービス向上、導入時のセキュリティや不具合への対策、効果が見込める技術を機動的に採用する方針について質問しました。",
    ("r06-1t", "大倉 たかひろ", "安心安全の取り組みについて"):
        "議員は、再犯防止推進計画の策定経緯と今後の取組、更生保護活動への支援について質問しました。",
    ("r06-3t", "せお 麻里", "障がい児支援"):
        "議員は、５歳児健診、保育園・幼稚園の巡回相談、作業療法士の活用など、発達障害児への切れ目ない支援について質問しました。",
    ("r06-3t", "せお 麻里", "子育て支援"):
        "議員は、病児保育でのベビーシッター活用とニーズ調査、利用対象を小学校低学年まで広げることについて質問しました。",
    ("r06-3t", "石田 しんご", "人づくりこそ地域づくりについて"):
        "議員は、人への投資で地域の未来を切り開く観点から、貧困や格差に左右されず学べる教育環境と教育費負担の軽減について質問しました。",
    ("r06-4t", "山本 やすゆき", "リアルの感動体験で子どもたちに夢を、区民の皆さまに活力を 防災拠点施設としても有効な、品川アリーナ構想、実現へ"):
        "議員は、東京都競馬のアリーナ建設への区の支援、区民利用の仕組み、防災拠点機能、区による事業参画について質問しました。",
    ("r03-1t", "若 林 ひろき", "健康施策について"):
        "健康・医療・介護をつなぐ生涯の健康データ活用と、データに基づく健康施策の進め方について質問しました。",
    ("r03-4t", "松 澤 和 昌", "介護福祉について"):
        "認知症本人と家族を支える地域活動の周知、認知症サポーターやエリアサポーターの育成・連携について質問しました。",
    ("r02-2t", "鈴 木 博", "品川区の子育て支援施策について"):
        "保育所の感染対策について、子どもの発達段階や地域の流行状況に応じた、画一的でない年齢別の行動指針と現場の対応を質問しました。",
    ("r02-2t", "鈴 木 博", "品川区の教育について"):
        "学校での感染予防教育と具体的対策、メディアリテラシー教育、長期休校後の子どもの心のケアについて質問しました。",
    ("h30-1t", "松永よしひろ", "住みやすい品川区の実現について"):
        "区内シェアサイクルの運用状況、区内全域への展開、他区との相互乗り入れの計画と課題について質問しました。",
    ("h30-4t", "木村けんご", "特殊詐欺から狙われる高齢者を守るには"):
        "区内の特殊詐欺被害件数・金額と今後の見通しを確認し、警察との連携、区民への周知、高齢者への継続的な被害防止策を尋ねました。",
    ("r01-2t", "木村けんご", "人生100年時代に向けての定年制の見直しを"):
        "人生100年時代を見据え、区職員の定年年齢、長寿化による行政サービスや社会保障の課題、多様な働き方・学び直しへの対応について質問しました。",
    ("r03-2t", "湯 澤 一 貴", "子どもたちの学びについて"):
        "タブレット授業とICT支援員の成果・課題、デジタル教科書、端末利用による健康への配慮、SDGs教育、学校でのマスク着脱方針について質問しました。",
    ("r05-1t", "若林 ひろき", "環境について"):
        "ＳＤＧｓ未来都市への提案、ゼロカーボンシティ宣言、事業者のＧＸ支援、フードドライブ、製品プラスチック回収と給水機の拡充について質問しました。",
    ("r05-2t", "つる 伸一郎", "誰もが安全と安心を体感できる品川区について"):
        "個人宅防犯カメラと学校の登下校管理システム、エアコン利用支援と避暑シェルター、マイボトル給水機の拡大について質問しました。",
    ("r05-2t", "塚本 よしひろ", "経済と環境が両立するSDGｓしながわについて"):
        "プレミアム付き区内共通商品券のデジタル化と、製品プラスチック回収による資源化率、分別方法の周知について質問しました。",
    ("r04-2t", "渡 部 茂", "品川区政について"):
        "区長４期16年間の区政を振り返り、区長選への対応と、将来の品川区に継承してほしい考えを尋ねました。",
    ("r03-1t", "渡 部 茂", "品川区の教育について"):
        "新学事制度、１人１台タブレット、35人学級と教室・教員確保、コロナ禍の教育活動について質問しました。",
    ("r03-3t", "大 沢 真 一", "オリンピック・パラリンピック開催による区行政・財政への影響について"):
        "大会の延期・無観客化や関連事業の変更による区予算への影響と、国・東京都等の開催経費が区の追加負担につながる可能性を尋ねました。",
    ("r02-1t", "若 林 ひろき", "ＳＤＧｓ・学校教育について"):
        "教員の働き方改革への対応と、学習指導要領や市民科でＳＤＧｓを学ぶ教育の推進について質問しました。",
    ("r02-1t", "若 林 ひろき", "ＳＤＧｓ・防災について"):
        "木密地域の不燃化、非常用電源や避難所環境、災害情報、無電柱化、ペット・障害者の避難支援など今後の防災施策を質問しました。",
    ("r02-1t", "せ お 麻 里", "インクルーシブ公園について"):
        "障害の有無にかかわらず楽しめる公園について、子どもたちのワークショップの成果、整備への反映、完成後の意見聴取を質問しました。",
}


def normalized(value: str) -> str:
    value = unicodedata.normalize("NFKC", value or "")
    value = "".join(chr(ord(char) - 0x60) if "ァ" <= char <= "ヶ" else char for char in value)
    value = value.replace("障がい", "障害").replace("障碍", "障害").replace("こども", "子ども")
    value = value.replace("待機児ゼロ", "待機児童ゼロ").replace("9条改憲", "憲法9条改正")
    return re.sub(r"[\s　◯○・、。！？「」『』（）()\[\]【】,.!?：:;；/／・―─〜～]", "", value).lower()


def ngrams(value: str, size: int = 2) -> set[str]:
    text = normalized(value)
    return {text[index:index + size] for index in range(max(0, len(text) - size + 1))}


def parse_context(path: Path, member: str) -> tuple[list[str], list[dict]]:
    text = path.read_text(encoding="utf-8")
    excerpt = text.split("会議録抜粋:", 1)[-1]
    parts = re.split(r"^【(.+?)】\s*$", excerpt, flags=re.MULTILINE)
    question_sentences: list[str] = []
    answer_blocks: list[dict] = []
    member_key = normalized(member)
    captured_main_question = False
    for index in range(1, len(parts), 2):
        speaker = parts[index]
        body = parts[index + 1] if index + 1 < len(parts) else ""
        body = re.sub(r"^\s*\d+:\s*◯[^\s]+\s*", "", body.strip())
        # 最後の質問者では、会議録抜粋に質問終了後の議案説明まで含まれることが
        # ある。議長が質問終了を宣告した時点で止め、後続議案を答弁として選ばない。
        if any(term in speaker for term in CHAIR_TERMS) and re.search(
            r"(?:議員の質問|一般質問|代表質問)を終わります", body
        ):
            break
        sentences = split_sentences(body)
        if member_key and member_key in normalized(speaker):
            # 同じ議員による再質問・再々質問まで連結すると、前の論点への
            # 再質問が次の大項目の要約として選ばれてしまう。質問項目が順に
            # 述べられる最初の本質問だけを、項目別の質問要約に利用する。
            if not captured_main_question:
                question_sentences.extend(sentences)
                captured_main_question = True
        elif not any(term in speaker for term in CHAIR_TERMS):
            expanded: list[str] = []
            for sentence in sentences:
                # 「次に、○○についてですが、区では…」は見出しと答弁本文が
                # 1文に連結されている。分離して小項目単位の照合に使う。
                match = re.match(
                    r"^((?:初めに|次に|続いて|続きまして|最後に)[、,]?\s*.+?について(?:ですが|です|であります))[、,]?\s*(.+)$",
                    sentence,
                )
                if match and len(normalized(match.group(1))) < 110:
                    expanded.extend((re.sub(r"(?:ですが|であります)$", "です。", match.group(1)), match.group(2)))
                else:
                    expanded.append(sentence)
            answer_blocks.append({"speaker": speaker, "sentences": expanded})
    return question_sentences, answer_blocks


def split_sentences(text: str) -> list[str]:
    text = re.sub(r"\s+", " ", text).strip()
    pieces = re.split(r"(?<=[。！？?])\s+|(?<=。)|(?<=！)|(?<=？)", text)
    result = []
    for piece in pieces:
        value = piece.strip(" \n\t")
        value = re.sub(r"^[〔\[].*?[〕\]]\s*", "", value)
        if len(normalized(value)) >= 8:
            result.append(value)
    return result


def topic_core(topic: str) -> str:
    value = re.sub(r"(?:について|に関して|に関する|を問う|への対応|の取組(?:み)?|の推進)[。．\s]*$", "", topic)
    return value.strip() or topic.strip()


def sentence_score(topic: str, sentence: str, cues: tuple[str, ...], index: int, total: int) -> float:
    topic_value = topic_core(topic)
    topic_bigrams = ngrams(topic_value)
    sentence_bigrams = ngrams(sentence)
    overlap = len(topic_bigrams & sentence_bigrams)
    coverage = overlap / max(1, len(topic_bigrams))
    core = normalized(topic_value)
    text = normalized(sentence)
    substring_bonus = 2.5 if len(core) >= 3 and core in text else 0.0
    cue_weight = 1.5 if cues is QUESTION_CUES else 0.35
    cue_bonus = sum(cue_weight for cue in cues if cue in sentence)
    position_bonus = 0.08 * (1 - index / max(1, total))
    length_penalty = max(0, len(sentence) - 260) / 500
    boilerplate_penalty = 0.25 * sum(1 for term in BOILERPLATE if term in sentence)
    short_heading = (
        len(normalized(sentence)) < 90
        and ("についてお答え" in sentence or re.search(r"について[。．]?$", sentence))
    )
    heading_penalty = 7.0 if short_heading else 0.0
    very_short_penalty = 3.0 if len(normalized(sentence)) < 20 else 0.0
    return (
        coverage * 5 + math.log1p(overlap) * 0.4 + substring_bonus + cue_bonus + position_bonus
        - length_penalty - boilerplate_penalty - heading_penalty - very_short_penalty
    )


def select_sentence(topic: str, sentences: list[str], cues: tuple[str, ...]) -> tuple[str, float]:
    if not sentences:
        return "", 0.0
    ranked = [
        (sentence_score(topic, sentence, cues, index, len(sentences)), -index, sentence)
        for index, sentence in enumerate(sentences)
    ]
    score, _, sentence = max(ranked)
    return clean_sentence(sentence), score


def select_diverse_sentences(
    topic: str,
    sentences: list[str],
    cues: tuple[str, ...],
    maximum: int,
    limit: int,
) -> tuple[str, float]:
    """同じ論点の言い換えを避けながら、重要文を少数だけ選ぶ。"""
    if not sentences:
        return "", 0.0
    ranked = sorted(
        (
            sentence_score(topic, sentence, cues, index, len(sentences)),
            index,
            clean_sentence(sentence, limit=limit),
        )
        for index, sentence in enumerate(sentences)
    )
    selected: list[tuple[int, str, float]] = []
    for score, index, sentence in reversed(ranked):
        if not sentence:
            continue
        terms = ngrams(sentence, 3)
        duplicated = any(
            len(terms & ngrams(existing, 3)) / max(1, min(len(terms), len(ngrams(existing, 3)))) > 0.72
            for _, existing, _ in selected
        )
        if duplicated:
            continue
        selected.append((index, sentence, score))
        if len(selected) >= maximum:
            break
    selected.sort(key=lambda item: item[0])
    text = " ".join(ensure_ending(sentence) for _, sentence, _ in selected)
    if len(text) > limit:
        text = text[:limit].rstrip("、,。 ") + "…。"
    return text, max((score for _, _, score in selected), default=0.0)


def heading_like(sentence: str) -> bool:
    return (
        len(normalized(sentence)) < 110
        and (
            "お答え" in sentence
            or re.search(r"について(?:です|であります)?[。．]?$", sentence) is not None
        )
    )


def question_heading_like(sentence: str) -> bool:
    """質問演説中の節見出しらしい文を判定する。"""
    text = sentence.strip()
    if "後ほど" in text or "後で" in text:
        return False
    return (
        len(normalized(text)) < 100
        and "について" in text
        and (
            text.startswith(("次に", "続いて", "続きまして", "まず", "最後に"))
            or re.search(r"について(?:伺|質問|お聞き)", text) is not None
            or re.search(r"について[。．]?$", text) is not None
        )
    )


def question_topic_key(topic: str) -> str:
    """発言中の短い節見出しと照合するため、共通の装飾語を除く。"""
    value = topic_core(topic)
    value = re.sub(r"^[ＳSＤDＧGｓs]+[・･\s　_-]*", "", value, flags=re.IGNORECASE)
    return value.strip() or topic_core(topic)


def semantic_anchor_text(value: str) -> str:
    """節見出し照合では定型語を弱め、制度名・対象名を残す。"""
    text = normalized(value)
    text = text.replace("マイナンバーカード", "マイナンバー")
    text = text.replace("ictの活用", "ict化")
    for term in (
        "について", "に関して", "に対して", "に向けて", "における",
        "の取組み", "の取組", "の推進", "の活用", "への対応",
        "本区", "品川区", "現状", "支援", "対策", "安全性",
    ):
        text = text.replace(term, "")
    return text


def question_anchor_score(topic: str, sentence: str, all_topics: list[str], index: int) -> float:
    key = question_topic_key(topic)
    semantic_key = semantic_anchor_text(key) or normalized(key)
    semantic_sentence = semantic_anchor_text(sentence) or normalized(sentence)
    key_terms = ngrams(semantic_key)
    sentence_terms = ngrams(semantic_sentence)
    overlap = len(key_terms & sentence_terms)
    coverage = overlap / max(1, len(key_terms))
    key_text = semantic_key
    sentence_text = semantic_sentence
    heading_form = bool(re.match(
        r"^(?:最初に|まず(?:初めに)?|次に|続いて|続きまして|最後に|[0-9０-９一二三四五六七八九十]+点目(?:に|は)?)",
        sentence.strip(),
    ))
    exact_bonus = 12.0 if len(key_text) >= 3 and key_text in sentence_text else 0.0
    heading_bonus = 4.0 if heading_form and len(sentence_text) < 180 else 0.0
    # 冒頭で全質問項目を列挙する文は節の開始位置ではない。複数の公式題名を
    # 含む文を強く減点し、各項目を単独で述べる見出しを優先する。
    contained_topics = sum(
        1
        for candidate in all_topics
        if len(normalized(question_topic_key(candidate))) >= 4
        and normalized(question_topic_key(candidate)) in sentence_text
    )
    list_penalty = max(0, contained_topics - 1) * 10.0
    length_penalty = max(0, len(sentence_text) - 220) / 20
    return (
        coverage * 10
        + math.log1p(overlap) * 0.5
        + exact_bonus
        + heading_bonus
        - list_penalty
        - length_penalty
        - index * 0.0001
    )


def ordered_question_selections(topics: list[str], sentences: list[str]) -> list[tuple[str, float, str]]:
    if not sentences:
        return [("", 0.0, "") for _ in topics]
    anchors: list[int] = []
    cursor = 0
    for topic_index, topic in enumerate(topics):
        remaining_topics = len(topics) - topic_index - 1
        hard_last = len(sentences) - remaining_topics
        candidates = list(range(cursor, hard_last)) or [min(cursor, len(sentences) - 1)]
        anchor = max(
            candidates,
            key=lambda index: question_anchor_score(topic, sentences[index], topics, index),
        )
        anchors.append(anchor)
        cursor = min(anchor + 1, len(sentences) - 1)

    selections: list[tuple[str, float]] = []
    for index, (topic, start) in enumerate(zip(topics, anchors)):
        end = anchors[index + 1] if index + 1 < len(anchors) else len(sentences)
        segment = sentences[start:max(start + 1, end)]
        substantive = [sentence for sentence in segment if not question_heading_like(sentence)] or segment
        cue_sentences = [
            sentence for sentence in substantive if any(cue in sentence for cue in STRONG_QUESTION_CUES)
        ]
        # 最も具体的な問いを1文に絞る。複数文を機械的に連結すると、別の小項目に
        # 対する答弁と対応しにくくなり、要約も長くなるため行わない。明示的な
        # 質問・要望文を優先し、ない場合だけ題名に近い背景文を使う。
        selected, score = select_diverse_sentences(
            topic,
            cue_sentences or substantive,
            QUESTION_CUES,
            maximum=1,
            limit=155,
        )
        selections.append((selected, score, " ".join(substantive)))
    return selections


def answer_selection(
    topic: str,
    blocks: list[dict],
    question_hint: str = "",
    question_context: str = "",
) -> tuple[str, float]:
    if not blocks:
        return "", 0.0
    core = normalized(topic_core(topic))
    topic_terms = ngrams(topic_core(topic))
    # 「教育」「防災」など広い大項目名より、実際に選ばれた具体的な質問文を
    # 優先する。大項目名は担当答弁ブロックを探す補助として残す。
    # 公式の発言事項は答弁見出しにも使われるため、質問文が取れた場合でも題名の
    # 重みを落とさない。短い一般語だけの題名は具体的な質問文が補完する。
    topic_weight = 1.0
    # 3文字では「について」「考えます」などの定型表現が大量に一致するため、
    # 実際の制度名・地名を識別しやすい4文字列で質問と答弁を照合する。
    hint_terms = ngrams(question_hint, 4)
    context_terms = ngrams(question_context, 4)
    ranked_blocks = []
    for block_index, block in enumerate(blocks):
        sentences = block["sentences"]
        intro = " ".join(sentences[:2])
        body = " ".join(sentences)
        headings = [sentence for sentence in sentences if heading_like(sentence)]
        intro_terms = ngrams(intro)
        body_terms = ngrams(body)
        speaker_terms = ngrams(block["speaker"])
        hint_bigrams = ngrams(question_hint, 2)
        heading_affinity = max((
            len(hint_bigrams & ngrams(heading, 2))
            + 12 * len(hint_bigrams & ngrams(heading, 2)) / max(1, len(ngrams(heading, 2)))
            for heading in headings
        ), default=0.0)
        score = (
            len(topic_terms & intro_terms) * 1.2 * topic_weight
            + len(topic_terms & body_terms) * 0.35 * topic_weight
            + len(topic_terms & speaker_terms) * 0.8 * topic_weight
            # 選ばれた具体的な質問文を最優先し、その項目の発言全体を補助に使う。
            # これにより「愛の手帳」「防災教材」などの固有語を落とさず、短い
            # 題名だけで別の担当答弁を選ぶことを防ぐ。
            + min(60, len(hint_terms & ngrams(body, 4))) * 1.35
            + min(120, len(context_terms & ngrams(body, 4))) * 0.006
            + heading_affinity * 1.5
            - block_index * 0.002
        )
        if core and core in normalized(body):
            score += 6
        if core and core in normalized(intro):
            score += 4
        ranked_blocks.append((score, -block_index, block))
    block_score, _, selected_block = max(ranked_blocks)
    block_sentences = selected_block["sentences"]
    heading_anchors = [index for index, sentence in enumerate(block_sentences) if heading_like(sentence)]
    if heading_anchors:
        anchor = max(
            heading_anchors,
            key=lambda index: (
                (8 if core and core in normalized(block_sentences[index]) else 0)
                + (
                    len(topic_terms & ngrams(block_sentences[index], 2))
                    + 8 * len(topic_terms & ngrams(block_sentences[index], 2))
                    / max(1, len(ngrams(block_sentences[index], 2)))
                ) * topic_weight
                + min(30, len(hint_terms & ngrams(block_sentences[index], 4))) * 1.2
                + min(30, len(context_terms & ngrams(block_sentences[index], 4))) * 0.12
                + 1.5 * len(hint_terms & ngrams(block_sentences[index], 4))
                / max(1, len(ngrams(block_sentences[index], 4)))
                # 見出しが「次に○○について」のように短くても、その直後の
                # 答弁本文が質問文と一致すれば正しい小項目として選ぶ。
                + min(50, len(hint_terms & ngrams(
                    " ".join(block_sentences[index + 1:next(
                        (candidate for candidate in heading_anchors if candidate > index),
                        len(block_sentences),
                    )]), 4
                ))) * 1.5
                + index * 0.0001
                - (1.0 if index == heading_anchors[0] and len(heading_anchors) > 1 else 0.0)
            ),
        )
        next_heading = next((index for index in heading_anchors if index > anchor), len(block_sentences))
        candidates = block_sentences[anchor + 1:min(next_heading, anchor + 12)]
        substantive = [sentence for sentence in candidates if not heading_like(sentence)]
    else:
        substantive = [sentence for sentence in block_sentences if not heading_like(sentence)]
    if not substantive:
        substantive = [sentence for sentence in block_sentences if not heading_like(sentence)] or block_sentences
    ranked_sentences = []
    for index, sentence in enumerate(substantive):
        base = sentence_score(topic, sentence, ANSWER_CUES, index, len(substantive))
        hint_bonus = min(24, len(hint_terms & ngrams(sentence, 4))) * 0.9
        context_bonus = min(24, len(context_terms & ngrams(sentence, 4))) * 0.04
        ranked_sentences.append((base + hint_bonus + context_bonus, -index, sentence))
    score, _, sentence = max(ranked_sentences)
    return clean_sentence(sentence), score + block_score * 0.03


def clean_sentence(sentence: str, limit: int = 210) -> str:
    value = re.sub(r"^\d+:\s*", "", sentence).strip()
    value = re.sub(r"^(?:初めに|次に|続きまして|最後に)[、,]\s*", "", value)
    value = re.sub(r"^私からは、?", "", value)
    value = re.sub(r"^(?:.+?議員の)?(?:一般|代表)質問にお答え(?:いた)?します[。．]?", "", value)
    value = re.sub(r"^(?:.+?に関する)?ご質問についてお答え(?:いた)?します[。．]?", "", value)
    value = re.sub(r"^(?:また|一方で|さらに|なお)(?:[、,]\s*|(?=[一-龠々ァ-ヶーぁ-んA-Za-z0-9]))", "", value)
    value = re.sub(r"^区(?:は|では)[、,]?\s*", "", value)
    value = value.strip()
    if len(value) > limit:
        value = value[:limit].rstrip("、, ") + "…"
    return value


def ensure_ending(value: str) -> str:
    if not value:
        return value
    return value if value.endswith(("。", "？", "！", "…")) else value + "。"


def make_summary(topic: str, question_choice: tuple[str, float, str], answer_blocks: list[dict]) -> dict:
    question, question_score, question_context = question_choice
    topic_question_overlap = len(ngrams(topic_core(topic)) & ngrams(question))
    minimum_overlap = max(1, min(4, len(ngrams(topic_core(topic))) // 6))
    # 発言順で切り出した区間に明示的な質問文がある場合、短い大項目名との語句
    # 一致が弱くても採用する。これにより題名の言い換えだけの定型文をなくす。
    reliable_question = question.strip()
    reliable_context = (
        question_context
        if reliable_question or len(normalized(question_context)) >= 150
        else ""
    )
    answer, answer_score = answer_selection(topic, answer_blocks, reliable_question, reliable_context)

    if not reliable_question:
        question_text = f"「{topic}」について、現状の認識と区の対応方針を質問しました。"
    else:
        question_text = ensure_ending(question)

    if answer_score < 0.45 or not answer:
        answer_text = "会議録では複数分野にまたがって答弁されているため、詳細は公式会議録で確認できます。"
    else:
        answer_text = ensure_ending(f"区は、{answer}")

    return {
        "title": topic,
        "question": question_text,
        "answer": answer_text,
        "_questionScore": round(question_score, 3),
        "_answerScore": round(answer_score, 3),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--years", nargs="+", type=int, default=list(range(7, 0, -1)))
    parser.add_argument("--write", action="store_true")
    parser.add_argument("--preview", type=int, default=0, help="先頭から指定人数分を表示")
    parser.add_argument("--member", default="", help="プレビュー対象の議員名またはmemberId")
    args = parser.parse_args()

    queue = json.loads(QUEUE_PATH.read_text(encoding="utf-8"))
    selected_years = {"h30" if year == 0 else f"r{year:02d}" for year in args.years}
    generated_topics = 0
    low_question = 0
    low_answer = 0

    for item in queue:
        if item["yearId"] not in selected_years or item.get("sourceStatus") == "withdrawn":
            continue
        context_path = ROOT / item["contextPath"]
        question_sentences, answer_blocks = parse_context(context_path, item["member"])
        question_choices = ordered_question_selections(item["topics"], question_sentences)
        summaries = [
            make_summary(topic, question_choice, answer_blocks)
            for topic, question_choice in zip(item["topics"], question_choices)
        ]
        for summary in summaries:
            question_override = QUESTION_OVERRIDES.get(
                (item["meetingId"], item["member"], summary["title"])
            )
            if question_override:
                summary["question"] = ensure_ending(question_override)
            override = ANSWER_OVERRIDES.get((item["meetingId"], item["member"], summary["title"]))
            if override:
                summary["answer"] = ensure_ending(f"区側は、{override}")
        low_question += sum(summary["_questionScore"] < 0.65 for summary in summaries)
        low_answer += sum(summary["_answerScore"] < 0.45 for summary in summaries)
        generated_topics += len(summaries)
        for summary in summaries:
            summary.pop("_questionScore", None)
            summary.pop("_answerScore", None)
        item["qaSummaries"] = summaries
        item["summaryStatus"] = "complete"

    if args.preview:
        shown = 0
        for item in queue:
            if item["yearId"] not in selected_years:
                continue
            if args.member and args.member not in item["member"] and args.member != item["memberId"]:
                continue
            print(f"\n{item['yearLabel']} {item['member']}")
            for summary in item.get("qaSummaries", []):
                print(json.dumps(summary, ensure_ascii=False))
            shown += 1
            if shown >= args.preview:
                break

    print(json.dumps({
        "generatedTopics": generated_topics,
        "lowQuestionFallbacks": low_question,
        "lowAnswerFallbacks": low_answer,
        "write": args.write,
    }, ensure_ascii=False))
    if args.write:
        QUEUE_PATH.write_text(json.dumps(queue, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
