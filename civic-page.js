(() => {
  "use strict";
  const root = document.querySelector("[data-civic-page]");
  if (!root) return;
  const legislature = window.SHINAGAWA_LEGISLATION;
  const finance = window.SHINAGAWA_FINANCE;
  const community = window.SHINAGAWA_COMMUNITY;
  const services = window.SHINAGAWA_SERVICES;
  const renderers = {
    bills: element => legislature.legislation(element, false),
    votes: element => legislature.legislation(element, true),
    session: element => legislature.session(element),
    fiscal: element => finance.fiscal(element),
    projects: element => finance.projects(element),
    funding: element => finance.funding(element),
    members: element => community.members(element),
    areas: element => community.areas(element),
    exports: element => services.exportsPage(element),
    status: element => services.statusPage(element),
    follow: element => services.follow(element),
    voice: element => services.voice(element)
  };
  Promise.resolve().then(() => renderers[root.dataset.civicPage](root)).catch(error => {
    window.SHINAGAWA_CIVIC_UI.showError(root, error);
  });
})();
