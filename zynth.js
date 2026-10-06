/* Shared settings + behaviour for the website pages (index, sneak peeks, checkout). */

// ── SETTINGS: change these in one place ─────────────────────────
// The Zynth backend (server.js). Must match API_URL in dashboard.html.
window.ZYNTH_API_URL = 'https://license-api.exasty.workers.dev';
// Discord application (Developer Portal → OAuth2 → Client ID). Must match dashboard.html.
window.ZYNTH_DISCORD_CLIENT_ID = '1555931215180079236';

(function () {
  // Nav background once you scroll
  var nav = document.querySelector('nav.top');
  if (nav && !nav.classList.contains('solid')) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 20); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) nav.classList.add('scrolled');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); });
    });
  }

  // Fade sections in as they scroll into view
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
  els.forEach(function (el) {
    var i = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
    el.style.transitionDelay = Math.min(i, 3) * 80 + 'ms';
    io.observe(el);
  });
})();
