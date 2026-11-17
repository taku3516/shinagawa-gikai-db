/*
 * 絞り込んだイベントを、その場で .ics とGoogleカレンダーのリンクに変換します。
 *
 * 購読用の .ics は scripts/events_ics.py が作って exports/ に置いています。
 * こちらは「いま画面で絞り込んでいる分だけ」を手元に落とすためのもので、
 * サーバー側に無い組み合わせを作れるようにするためにブラウザで組み立てます。
 *
 * 出力の決まりは Python 側と同じにしてあります（scripts/test_events_ics.py と
 * scripts/events-ics.test.mjs で同じ期待値を確かめています）。食い違うと、
 * 購読したカレンダーと手元に落とした .ics で同じ予定が別物として入ります。
 */
(() => {
  "use strict";

  const FOLD_LIMIT = 75;
  const PRODID = "-//Shinagawa Council DB//Event Calendar//JA";

  // TEXT型の値を逃がす。円記号を最初に置き換えること。
  // 後に回すと、他の置換で入れた円記号まで二重に逃がしてしまう。
  function escapeText(value) {
    return String(value ?? "")
      .replace(/\\/g, "\\\\")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,")
      .replace(/\r\n|\r|\n/g, "\\n");
  }

  // 1行は75オクテットまで。日本語は1文字3バイトなので、文字数ではなくバイト数で数える。
  const encoder = typeof TextEncoder === "function" ? new TextEncoder() : null;
  function byteLength(text) {
    if (encoder) return encoder.encode(text).length;
    return unescape(encodeURIComponent(text)).length;
  }

  function fold(line) {
    if (byteLength(line) <= FOLD_LIMIT) return line;
    const chunks = [];
    let current = "";
    let currentBytes = 0;
    let limit = FOLD_LIMIT;
    // サロゲートペア（絵文字など）を割らないよう、コードポイント単位で回す
    for (const char of line) {
      const size = byteLength(char);
      if (currentBytes + size > limit) {
        chunks.push(current);
        current = char;
        currentBytes = size;
        limit = FOLD_LIMIT - 1; // 2行目以降は行頭の空白1つぶん使う
      } else {
        current += char;
        currentBytes += size;
      }
    }
    chunks.push(current);
    return chunks.join("\r\n ");
  }

  const pad = n => String(n).padStart(2, "0");
  const compact = day => String(day || "").replace(/-/g, "");

  function nextDay(day) {
    const [y, m, d] = String(day).split("-").map(Number);
    const moved = new Date(Date.UTC(y, m - 1, d + 1));
    return `${moved.getUTCFullYear()}-${pad(moved.getUTCMonth() + 1)}-${pad(moved.getUTCDate())}`;
  }

  function addHour(day, clock) {
    const [h, min] = String(clock).split(":").map(Number);
    const [y, m, d] = String(day).split("-").map(Number);
    const moved = new Date(Date.UTC(y, m - 1, d, h + 1, min));
    return `${moved.getUTCFullYear()}${pad(moved.getUTCMonth() + 1)}${pad(moved.getUTCDate())}T${pad(moved.getUTCHours())}${pad(moved.getUTCMinutes())}00`;
  }

  function local(day, clock) {
    const [h, min] = String(clock).split(":");
    return `${compact(day)}T${h}${min}00`;
  }

  function stamp(date) {
    return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
      `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
  }

  // 期間もの（periods）は1件にまとめる。1日ずつ出すと、
  // 数か月続く催しがカレンダーに何百件も入ってしまう。
  function occurrences(event) {
    const periods = (event.periods || []).filter(p => p && p.from && p.to);
    const spans = periods.map(p => [p.from, p.to]);
    const covered = new Set();
    for (const [begin, finish] of spans) {
      let step = begin;
      let guard = 0;
      while (step <= finish && guard < 2000) {
        covered.add(step);
        step = nextDay(step);
        guard += 1;
      }
    }
    for (const day of event.dates || []) {
      if (!covered.has(day)) spans.push([day, day]);
    }
    const seen = new Set();
    return spans
      .filter(span => {
        const key = span.join("/");
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((a, b) => (a[0] === b[0] ? a[1].localeCompare(b[1]) : a[0].localeCompare(b[0])));
  }

  function describe(event, siteBase) {
    const parts = [];
    if (event.summary) parts.push(event.summary);
    if (event.timeText) parts.push(`時間: ${event.timeText}`);
    if (event.application) parts.push(`申込: ${event.application}`);
    if (event.deadline) parts.push(`申込締切: ${event.deadline}`);
    if (event.confidence === "estimated") {
      parts.push("※この開催日は記事本文から推定したものです。出典で確かめてください。");
    }
    parts.push(`出典: ${event.source || ""}`);
    if (event.url) parts.push(event.url);
    parts.push(`品川区議会DB ${siteBase}events.html`);
    return parts.join("\n");
  }

  function vevent(event, span, now, siteBase) {
    const [begin, finish] = span;
    const startTime = event.startTime || "";
    const endTime = event.endTime || "";
    const lines = [
      "BEGIN:VEVENT",
      `UID:${event.id}-${compact(begin)}@shinagawa-gikai-db`,
      `DTSTAMP:${stamp(now)}`
    ];
    if (begin === finish && startTime) {
      lines.push(`DTSTART;TZID=Asia/Tokyo:${local(begin, startTime)}`);
      if (endTime && endTime > startTime) {
        lines.push(`DTEND;TZID=Asia/Tokyo:${local(finish, endTime)}`);
      } else {
        lines.push(`DTEND;TZID=Asia/Tokyo:${addHour(begin, startTime)}`);
      }
    } else {
      // 終日の予定。DTEND は翌日を指す（終わりは含まない）。
      lines.push(`DTSTART;VALUE=DATE:${compact(begin)}`);
      lines.push(`DTEND;VALUE=DATE:${compact(nextDay(finish))}`);
    }
    lines.push(`SUMMARY:${escapeText(event.title || "")}`);
    lines.push(`DESCRIPTION:${escapeText(describe(event, siteBase))}`);
    if (event.place) lines.push(`LOCATION:${escapeText(event.place)}`);
    if (event.url) lines.push(`URL:${escapeText(event.url)}`);
    if (event.category) lines.push(`CATEGORIES:${escapeText(event.category)}`);
    lines.push(event.confidence === "estimated" ? "STATUS:TENTATIVE" : "STATUS:CONFIRMED");
    lines.push("TRANSP:TRANSPARENT");
    lines.push("END:VEVENT");
    return lines;
  }

  function buildCalendar(events, name, description, siteBase, now) {
    const moment = now || new Date();
    const lines = [
      "BEGIN:VCALENDAR", "VERSION:2.0", `PRODID:${PRODID}`,
      "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
      `X-WR-CALNAME:${escapeText(name)}`,
      `X-WR-CALDESC:${escapeText(description)}`,
      "X-WR-TIMEZONE:Asia/Tokyo",
      "REFRESH-INTERVAL;VALUE=DURATION:PT6H",
      "X-PUBLISHED-TTL:PT6H",
      "BEGIN:VTIMEZONE", "TZID:Asia/Tokyo", "BEGIN:STANDARD",
      "DTSTART:19700101T000000", "TZOFFSETFROM:+0900", "TZOFFSETTO:+0900",
      "TZNAME:JST", "END:STANDARD", "END:VTIMEZONE"
    ];
    for (const event of events) {
      for (const span of occurrences(event)) {
        lines.push(...vevent(event, span, moment, siteBase));
      }
    }
    lines.push("END:VCALENDAR");
    return lines.map(fold).join("\r\n") + "\r\n";
  }

  // Googleカレンダーの登録画面を開くURL。ログインしたまま押せば1件だけ入る。
  // 時刻つきは ctz=Asia/Tokyo を付けて日本時間として読ませる。
  // 終日は YYYYMMDD/YYYYMMDD で、終わりの日は含まれない（翌日を書く）。
  function googleCalendarUrl(event, span, siteBase) {
    const [begin, finish] = span || (occurrences(event)[0] || ["", ""]);
    if (!begin) return "";
    const params = new URLSearchParams();
    params.set("action", "TEMPLATE");
    params.set("text", event.title || "");
    if (begin === finish && event.startTime) {
      const end = event.endTime && event.endTime > event.startTime
        ? local(finish, event.endTime)
        : addHour(begin, event.startTime);
      params.set("dates", `${local(begin, event.startTime)}/${end}`);
      params.set("ctz", "Asia/Tokyo");
    } else {
      params.set("dates", `${compact(begin)}/${compact(nextDay(finish))}`);
    }
    params.set("details", describe(event, siteBase));
    if (event.place) params.set("location", event.place);
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  window.SHINAGAWA_EVENTS_ICS = {
    escapeText, fold, occurrences, buildCalendar, googleCalendarUrl, vevent, nextDay
  };
})();
