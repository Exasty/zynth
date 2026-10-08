/* Shared settings + behaviour for the website pages (index, sneak peeks, checkout). */

// ── SETTINGS: change these in one place ─────────────────────────
// The Zynth backend (server.js). Must match API_URL in dashboard.html.
window.ZYNTH_API_URL = 'https://license-api.exasty.workers.dev';
// Discord application (Developer Portal → OAuth2 → Client ID). Must match dashboard.html.
window.ZYNTH_DISCORD_CLIENT_ID = '1555931215180079236';

(function () {
  var nav = document.querySelector('nav.top');

  // Nav background once you scroll
  if (nav && !nav.classList.contains('solid')) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.mobile-menu');
  if (burger && menu) {
    var setOpen = function (open) {
      menu.classList.toggle('open', open);
      nav.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    burger.addEventListener('click', function () { setOpen(!menu.classList.contains('open')); });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) { setOpen(false); burger.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 860) setOpen(false); });
  }

  // Elements with [data-inview] get .in once they scroll into view (used for one-off drawings, not fades)
  var els = document.querySelectorAll('[data-inview]');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.2 });
  els.forEach(function (el) { io.observe(el); });
})();
