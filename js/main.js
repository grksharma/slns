/* ==========================================================================
   Sri Lakshmi Narasimha Swamy Temple, Bhairkhanpally — shared script
   Dependency-free. Loaded once per page with:  <script src="js/main.js" defer></script>
   Every feature checks for its own markup and no-ops cleanly if absent.
   ========================================================================== */
'use strict';

/* ==========================================================================
   EDITABLE DATA — temple committee / site maintainers edit ONLY this block.
   ========================================================================== */

/* --------------------------------------------------------------------------
   ANNOUNCEMENTS — the single strip at the very top of every page.
   EDIT-ME: Keep ONE short line normally (festival dates, timing changes).
   This strip is the only place on the site where dated content should live.
   Each entry needs an English line (en) and a Telugu line (te).
   To silence the strip entirely, empty the array: const ANNOUNCEMENTS = [];
   -------------------------------------------------------------------------- */
const ANNOUNCEMENTS = [
  {
    en: 'Daily darshan: 6:00 AM – 12:00 noon and 5:00 – 8:00 PM · Seva bookings by phone or WhatsApp',
    te: 'నిత్య దర్శనం: ఉదయం 6:00 – మధ్యాహ్నం 12:00, సాయంత్రం 5:00 – రాత్రి 8:00 · సేవల బుకింగ్ ఫోన్ / వాట్సాప్ ద్వారా'
  }
  /* Example of a second, dated line (uncomment and edit when needed):
  ,{
    en: 'Special abhishekam on the coming Pournami — all devotees welcome',
    te: 'రాబోయే పౌర్ణమి రోజు ప్రత్యేక అభిషేకం — భక్తులందరూ ఆహ్వానితులు'
  }
  */
];

/* --------------------------------------------------------------------------
   FESTIVALS — powers the "next festival" countdown chip ([data-next-festival]).
   EDIT-ME: Each year, fill in the `date` field for each festival from the
   panchangam, in ISO format 'YYYY-MM-DD' (e.g. '2026-12-20').
     - Leave date: '' (empty) to keep a festival OUT of the countdown.
     - Delete or add entries freely; only `en` + a valid future `date` are
       required for an entry to count.
     - Wrong dates are worse than none: CONFIRM every date with the temple
       purohit / a printed panchangam before publishing.
   When no entry has an upcoming date, the chip hides itself automatically.
   Filled-in example (example date only — check the panchangam!):
     { en: 'Vaikuntha Ekadashi', te: 'వైకుంఠ ఏకాదశి',
       date: '2026-12-20', note: 'Uttara Dwara Darshanam from early morning' },
   -------------------------------------------------------------------------- */
const FESTIVALS = [
  {
    en: 'Sri Narasimha Jayanti',
    te: 'శ్రీ నరసింహ జయంతి',
    date: '',
    note: 'Vaishakha Shuddha Chaturdashi (April–May)'
  },
  {
    en: 'Annual Brahmotsavam & Jatara',
    te: 'బ్రహ్మోత్సవం / జాతర',
    date: '',
    note: 'Dates fixed by panchangam (usually February–April)'
  },
  {
    en: 'Sri Rama Navami',
    te: 'శ్రీరామనవమి',
    date: '',
    note: 'Chaitra Shuddha Navami (March–April)'
  },
  {
    en: 'Ugadi',
    te: 'ఉగాది',
    date: '',
    note: 'Chaitra Shuddha Padyami (March–April)'
  },
  {
    en: 'Hanuman Jayanti',
    te: 'హనుమాన్ జయంతి',
    date: '',
    note: 'Vaishakha Bahula Dashami (May)'
  },
  {
    en: 'Vaikuntha Ekadashi (Mukkoti Ekadashi)',
    te: 'వైకుంఠ ఏకాదశి',
    date: '',
    note: 'Dhanurmasam (December–January)'
  }
];

/* ==========================================================================
   IMPLEMENTATION — no edits needed below this line.
   ========================================================================== */
(function () {
  var doc = document;
  var root = doc.documentElement;

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  var reducedMotion = false;
  try {
    reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) { /* no-op */ }

  /* Signals to CSS that JS is running (enables .reveal styling). */
  root.classList.add('js');

  /* ------------------------------------------------------------------
     1. LANGUAGE TOGGLE (EN <-> TE)
     - Inline strings: every [data-en][data-te] element gets its text
       swapped (plain text only — no markup inside these elements).
     - Block-level prose: [data-lang="en"] / [data-lang="te"] siblings
       are shown/hidden as a pair.
     - Persists in localStorage; updates <html lang> and aria-pressed.
     ------------------------------------------------------------------ */
  var LANG_KEY = 'bkp-temple-lang';

  function storedLang() {
    try {
      return localStorage.getItem(LANG_KEY) === 'te' ? 'te' : 'en';
    } catch (e) {
      return 'en';
    }
  }

  function translateAll(lang) {
    $$('[data-en][data-te]').forEach(function (el) {
      if (lang === 'te') {
        el.textContent = el.getAttribute('data-te');
        el.setAttribute('lang', 'te');
      } else {
        el.textContent = el.getAttribute('data-en');
        el.removeAttribute('lang');
      }
    });
    $$('[data-lang]').forEach(function (el) {
      if (el === root) { return; }   /* <html> carries data-lang as state, never hide it */
      el.hidden = el.getAttribute('data-lang') !== lang;
    });
  }

  function updateToggleButtons(lang) {
    $$('[data-lang-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', lang === 'te' ? 'true' : 'false');
      var label = btn.querySelector('.lang-toggle__label') || btn;
      if (lang === 'te') {
        label.textContent = 'English';
        label.setAttribute('lang', 'en');
      } else {
        label.textContent = 'తెలుగు'; /* తెలుగు */
        label.setAttribute('lang', 'te');
      }
    });
  }

  function setLang(lang, persist) {
    lang = lang === 'te' ? 'te' : 'en';
    root.lang = lang;
    root.setAttribute('data-lang', lang);
    translateAll(lang);
    updateToggleButtons(lang);
    if (persist) {
      try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* no-op */ }
    }
  }

  function currentLang() {
    return root.getAttribute('data-lang') === 'te' ? 'te' : 'en';
  }

  function initLanguage() {
    $$('[data-lang-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(currentLang() === 'te' ? 'en' : 'te', true);
      });
    });
  }

  /* ------------------------------------------------------------------
     2. MOBILE NAV TOGGLE
     ------------------------------------------------------------------ */
  function initNav() {
    var toggle = $('[data-nav-toggle]');
    var nav = toggle && doc.getElementById(toggle.getAttribute('aria-controls') || 'site-nav');
    if (!toggle || !nav) { return; }

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'));
    });

    nav.addEventListener('click', function (e) {
      if (e.target && e.target.closest && e.target.closest('a')) { setOpen(false); }
    });

    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------
     3. ANNOUNCEMENT STRIP — renders ANNOUNCEMENTS into [data-announcements]
     ------------------------------------------------------------------ */
  function initAnnouncements() {
    var slot = $('[data-announcements]');
    if (!slot) { return; }
    var items = Array.isArray(ANNOUNCEMENTS) ? ANNOUNCEMENTS.filter(function (it) {
      return it && (it.en || it.te);
    }) : [];
    if (!items.length) {
      var strip = slot.closest ? slot.closest('.announce') : null;
      (strip || slot).hidden = true;
      return;
    }
    slot.textContent = '';
    items.forEach(function (item, i) {
      if (i > 0) {
        var sep = doc.createElement('span');
        sep.className = 'announce__sep';
        sep.setAttribute('aria-hidden', 'true');
        sep.textContent = '·';
        slot.appendChild(sep);
      }
      var span = doc.createElement('span');
      span.setAttribute('data-en', String(item.en || item.te || ''));
      span.setAttribute('data-te', String(item.te || item.en || ''));
      span.textContent = String(item.en || item.te || '');
      slot.appendChild(span);
    });
  }

  /* ------------------------------------------------------------------
     4. NEXT FESTIVAL — renders the soonest upcoming FESTIVALS entry
        into [data-next-festival]; hides the slot when none upcoming.
     ------------------------------------------------------------------ */
  function initNextFestival() {
    var slot = $('[data-next-festival]');
    if (!slot) { return; }

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var next = null;
    (Array.isArray(FESTIVALS) ? FESTIVALS : []).forEach(function (f) {
      if (!f || typeof f.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(f.date)) { return; }
      var d = new Date(f.date + 'T00:00:00');
      if (isNaN(d.getTime()) || d < today) { return; }
      if (!next || d < next.d) { next = { f: f, d: d }; }
    });

    if (!next) {
      slot.hidden = true;
      return;
    }
    slot.hidden = false;
    slot.classList.add('next-festival');

    var days = Math.round((next.d.getTime() - today.getTime()) / 86400000);
    var dateEn, dateTe;
    try {
      dateEn = next.d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
      dateTe = next.d.toLocaleDateString('te-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) {
      dateEn = next.f.date;
      dateTe = next.f.date;
    }
    var whenEn = days === 0 ? 'today' : (days === 1 ? 'tomorrow' : 'in ' + days + ' days');
    var whenTe = days === 0 ? 'ఈరోజే' : (days === 1 ? 'రేపు' : 'మరో ' + days + ' రోజుల్లో');

    slot.textContent = '';

    var label = doc.createElement('span');
    label.className = 'next-festival__label kicker';
    label.setAttribute('data-en', 'Next festival');
    label.setAttribute('data-te', 'రాబోయే పండుగ');
    label.textContent = 'Next festival';
    slot.appendChild(label);

    var name = doc.createElement('strong');
    name.className = 'next-festival__name';
    name.setAttribute('data-en', String(next.f.en || ''));
    name.setAttribute('data-te', String(next.f.te || next.f.en || ''));
    name.textContent = String(next.f.en || '');
    slot.appendChild(name);

    var when = doc.createElement('span');
    when.className = 'next-festival__when';
    when.setAttribute('data-en', dateEn + ' — ' + whenEn);
    when.setAttribute('data-te', dateTe + ' — ' + whenTe);
    when.textContent = dateEn + ' — ' + whenEn;
    slot.appendChild(when);

    if (next.f.note) {
      var note = doc.createElement('span');
      note.className = 'next-festival__note';
      if (typeof next.f.note === 'object') {
        note.setAttribute('data-en', String(next.f.note.en || ''));
        note.setAttribute('data-te', String(next.f.note.te || next.f.note.en || ''));
        note.textContent = String(next.f.note.en || '');
      } else {
        note.textContent = String(next.f.note);
      }
      slot.appendChild(note);
    }
  }

  /* ------------------------------------------------------------------
     5. SCROLL REVEAL — one-time fade-up on .reveal elements.
        Skipped entirely for reduced-motion users and old browsers.
     ------------------------------------------------------------------ */
  function initReveal() {
    var els = $$('.reveal');
    if (!els.length) { return; }
    if (reducedMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------
     6. GALLERY LIGHTBOX
        Markup: a [data-gallery] container of <a class="gallery-item"
        href="full-image"> <img alt="..."> </a> items (see STYLEGUIDE.md).
        Keyboard: Esc closes, arrow keys navigate; focus is trapped.
     ------------------------------------------------------------------ */
  function initLightbox() {
    var items = $$('[data-gallery] a.gallery-item');
    if (!items.length) { return; }

    var lb = doc.createElement('div');
    lb.className = 'lightbox';
    lb.hidden = true;
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Image viewer');
    lb.innerHTML =
      '<button type="button" class="lightbox__btn lightbox__close" aria-label="Close">×</button>' +
      '<button type="button" class="lightbox__btn lightbox__prev" aria-label="Previous image">‹</button>' +
      '<figure class="lightbox__figure">' +
      '  <img class="lightbox__img" src="" alt="">' +
      '  <figcaption class="lightbox__caption"></figcaption>' +
      '</figure>' +
      '<button type="button" class="lightbox__btn lightbox__next" aria-label="Next image">›</button>';
    doc.body.appendChild(lb);

    var img = $('.lightbox__img', lb);
    var caption = $('.lightbox__caption', lb);
    var btnClose = $('.lightbox__close', lb);
    var btnPrev = $('.lightbox__prev', lb);
    var btnNext = $('.lightbox__next', lb);

    if (items.length < 2) {
      btnPrev.hidden = true;
      btnNext.hidden = true;
    }

    var index = -1;
    var lastFocus = null;

    function show(i) {
      index = (i + items.length) % items.length;
      var link = items[index];
      var thumb = link.querySelector('img');
      img.src = link.getAttribute('href');
      img.alt = (thumb && thumb.getAttribute('alt')) || '';
      var fig = link.closest ? link.closest('figure') : null;
      var figcap = fig && fig.querySelector('figcaption');
      caption.textContent = link.getAttribute('data-caption') ||
        (figcap ? figcap.textContent : '') || '';
    }

    function open(i) {
      lastFocus = doc.activeElement;
      show(i);
      lb.hidden = false;
      doc.body.style.overflow = 'hidden';
      btnClose.focus();
    }

    function close() {
      lb.hidden = true;
      img.src = '';
      doc.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) { lastFocus.focus(); }
    }

    items.forEach(function (link, i) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        open(i);
      });
    });

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', function () { show(index - 1); });
    btnNext.addEventListener('click', function () { show(index + 1); });
    lb.addEventListener('click', function (e) {
      if (e.target === lb) { close(); }
    });

    doc.addEventListener('keydown', function (e) {
      if (lb.hidden) { return; }
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        show(index + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        show(index - 1);
      } else if (e.key === 'Tab') {
        /* Focus trap: cycle through the lightbox's visible buttons only */
        var focusables = $$('.lightbox__btn', lb).filter(function (b) { return !b.hidden; });
        if (!focusables.length) { return; }
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && (doc.activeElement === first || !lb.contains(doc.activeElement))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (doc.activeElement === last || !lb.contains(doc.activeElement))) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ------------------------------------------------------------------
     7. FOOTER YEAR — keeps the copyright line current
     ------------------------------------------------------------------ */
  function initYear() {
    $$('[data-year]').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ------------------------------------------------------------------
     BOOT — dynamic content first, then translate everything once.
     (Script is loaded with `defer`, so the DOM is already parsed.)
     ------------------------------------------------------------------ */
  function boot() {
    initAnnouncements();
    initNextFestival();
    initYear();
    setLang(storedLang(), false);
    initLanguage();
    initNav();
    initReveal();
    initLightbox();
  }

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
