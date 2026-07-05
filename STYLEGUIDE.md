# STYLEGUIDE — Bhairkhanpally Sri Lakshmi Narasimha Swamy Temple Website

This is the **binding contract** for every page-builder agent. Read `DESIGN_SPEC.md` for the
design rationale and `research.json` for all content/data. This file tells you exactly *how*
to assemble a page from the shared foundation. Deviations are review-blocking.

---

## 1. File map

```
/
├── index.html            ← pages to be built (site root)
├── about.html
├── timings.html
├── sevas.html
├── festivals.html
├── donations.html
├── gallery.html
├── visit.html
├── css/
│   └── styles.css        ← the ONLY stylesheet. Never add page-level CSS.
├── js/
│   └── main.js           ← the ONLY script. Editable data consts at the top.
├── assets/
│   ├── emblem.svg        ← site mark (header, footer seal, slab head, hero)
│   ├── gopuram-hero.svg  ← wide hero illustration (1600×900, bottom-anchored)
│   ├── divider.svg       ← kalasham-on-rule divider
│   ├── lotus.svg         ← small line icon (card icons, decorations)
│   ├── diya.svg          ← small line icon (also used by .diya-list bullets)
│   ├── pattern.svg       ← tileable watermark (use at 3–6% opacity ONLY)
│   └── favicon.svg
├── partials/
│   ├── header.html       ← copy VERBATIM into every page
│   └── footer.html       ← copy VERBATIM into every page
├── DESIGN_SPEC.md
├── research.json
└── STYLEGUIDE.md
```

**Relative links only.** Only ever link to the eight pages above and existing files under
`css/`, `js/`, `assets/`. Never link to a file that does not exist.

---

## 2. Page skeleton & exact `<head>` boilerplate

Every page uses exactly this skeleton. Change only the `<title>`, the two descriptions,
and the OG title (unique per page):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Darshan Timings · Sri Lakshmi Narasimha Swamy Temple, Bhairkhanpally</title>
  <meta name="description" content="Daily darshan and ritual timings at Sri Lakshmi Narasimha Swamy Temple, Bhairkhanpally, Keshampet mandal, Ranga Reddy district — 509408.">
  <meta property="og:title" content="Darshan Timings · శ్రీ లక్ష్మీ నరసింహ స్వామి దేవాలయం, Bhairkhanpally">
  <meta property="og:description" content="Daily darshan 6:00 AM – 12:00 noon and 5:00 – 8:00 PM. Full ritual schedule, sevas and directions.">
  <meta property="og:type" content="website">
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Mulish:wght@400;500;700&family=Cormorant+Garamond:ital,wght@1,500;1,600&family=Noto+Serif+Telugu:wght@500;700&family=Noto+Sans+Telugu:wght@400;500&family=Noto+Serif+Devanagari:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <!-- [PASTE partials/header.html HERE, VERBATIM] -->

  <main id="main">
    <!-- page sections -->
  </main>

  <!-- [PASTE partials/footer.html HERE, VERBATIM] -->

</body>
</html>
```

Rules:

- `<main id="main">` is required — the skip link targets it. Exactly **one `<h1`** per page.
- Google Fonts is the **only** external dependency. No other CDN, script, frame (except the
  keyless Google Maps embed on visit.html), image, or font — ever.
- Do not add `<style>` blocks or inline `style=""` attributes. If a style seems missing,
  it exists in `css/styles.css` under another class — find it.

## 3. Including the partials

1. Open `partials/header.html`, copy its entire contents, paste as the first thing in `<body>`.
2. Add `aria-current="page"` to **your own page's** link in the nav — e.g. on timings.html:
   `<a href="timings.html" aria-current="page" data-en="Timings" data-te="దర్శన వేళలు">Timings</a>`
   That is the ONLY change permitted inside either partial.
3. Copy `partials/footer.html` verbatim after `</main>`. It already ends with
   `<script src="js/main.js" defer></script>` — do not add a second script tag.

---

## 4. The bilingual convention (EN / తెలుగు)

The site defaults to English with Telugu accents; the header toggle switches everything to
Telugu. `js/main.js` drives it. You must author BOTH languages for every string.

### 4.1 Inline strings (nav labels, headings, buttons, table labels, short spans)

Put both languages in data attributes; author the **English** text as the visible content:

```html
<span data-en="Darshan Timings" data-te="దర్శన వేళలు">Darshan Timings</span>
```

- Elements with `data-en`/`data-te` must contain **plain text only** — the toggle replaces
  `textContent`, so any child markup would be destroyed.
- Do NOT put a `lang` attribute on these elements; the script sets `lang="te"` while Telugu
  is active and removes it in English.

### 4.2 Block-level prose (paragraphs, long descriptions)

Author sibling blocks; the Telugu one carries `lang="te"` and starts `hidden`:

```html
<p data-lang="en">The Lord appeared at twilight — neither day nor night — to honour
  every word of Brahma's boon.</p>
<p data-lang="te" lang="te" hidden>బ్రహ్మ వరంలోని ప్రతి మాటను నిలబెడుతూ, స్వామివారు
  సంధ్యా సమయంలో — పగలు కాదు, రాత్రి కాదు — ఆవిర్భవించారు.</p>
```

### 4.3 Fixed-language strings

- Strings that are **always Telugu** (the brand wordmark's Telugu line, deity names shown
  in both scripts at once): hard-code with `lang="te"`, no data attributes.
- Strings that must **stay English** even in Telugu mode (the brand's Latin line): add
  `lang="en"` so Telugu font scoping never touches them.
- Sanskrit slokas: always `lang="sa"`, never toggled, never translated into the data-attrs.
- Times (`6:00 AM`), prices (`₹216`), and the PIN `509408` are shared between languages —
  keep them outside toggled spans where possible.

### 4.4 Telugu typography rules

- Every Telugu string carries `lang="te"` (or gets it from the toggle). Class `.te-display`
  opts headings/names into Noto Serif Telugu.
- Never letter-space Telugu. Never set Telugu line-height below 1.8. (The CSS enforces
  both — do not fight it.)
- Use the verified Telugu terms from `research.json → content.telugu_names.common_terms`
  (దర్శన వేళలు, సేవలు, విరాళాలు, ఉత్సవాలు, అభిషేకం, అన్నదానం, బ్రహ్మోత్సవం, జాతర,
  ఆలయ చరిత్ర, సంప్రదించండి, హారతి, ప్రసాదం …). Do not machine-translate new religious
  terminology.

---

## 5. The placeholder + EDIT-ME convention (hard rule)

**Never invent temple-specific facts**: no founding dates, priest/committee names, phone
numbers, bank account numbers, IFSC codes, UPI IDs, and no 80G/tax claims of any kind.
Where the committee must supply a value:

1. Show a **visible, obviously-intentional placeholder** styled with `.placeholder`
   (muted tone + dashed underline), in the `+91 XXXXX XXXXX` style.
2. Put an `<!-- EDIT-ME: ... -->` comment **immediately above**, explaining exactly what
   to fill in and in what format.

```html
<!-- EDIT-ME: Replace with the UPI ID of the temple committee's bank account, and state
     the account holder's name exactly as registered at the bank. Never publish a QR
     without the account holder name, bank name and committee identity beside it. -->
<p>UPI ID: <span class="placeholder">temple-upi-id@bank</span><br>
   Account holder: <span class="placeholder">Temple committee account name</span><br>
   Bank &amp; branch: <span class="placeholder">Bank name, branch</span></p>
```

```html
<!-- EDIT-ME: Replace +91XXXXXXXXXX in the href AND the visible number with the priest's
     real number. href format: tel:+91 followed by 10 digits, no spaces. -->
<a class="btn btn--call" href="tel:+91XXXXXXXXXX">
  <span data-en="Call the Temple" data-te="ఫోన్ చేయండి">Call the Temple</span>&nbsp;
  <span class="placeholder">+91 XXXXX XXXXX</span>
</a>
```

**What MAY be stated as fact** (verified in `research.json → facts`): the village location
(Bhairkhanpally/Bhairkhanpalle, Keshampet mandal, Ranga Reddy district, Telangana),
PIN **509408**, distances and routes (≈5 km from Keshampet, ≈64 km from Hyderabad via NH44
and Shadnagar — mark road distances "approximate"), railheads (Shadnagar ≈21 km, Timmapur),
TGSRTC bus connectivity, and the nearby temples/landmarks list.

**Authentic defaults** (the daily schedule, sevas and price ranges, festival patterns in
`research.json → content`): present them normally as the temple's schedule — they are
modeled on Yadadri/Mattapalli practice — but put an `<!-- EDIT-ME: ... -->` comment above
each such block so the committee can adjust:

```html
<!-- EDIT-ME: Seva list and prices follow Yadadri/Mattapalli practice (see research.json).
     Confirm each seva and price with the temple committee; edit rows freely. -->
```

**Dates:** it is July 2026. Never print a date already past as "upcoming" (Narasimha
Jayanti fell on 30 April 2026 — write "celebrated on Vaishakha Shuddha Chaturdashi
(April–May)" or reference 2027). Prefer Telugu-month/masam phrasing over exact years in
body copy. Dated content belongs ONLY in the announcement strip and the `FESTIVALS`
array in `js/main.js` (both committee-editable).

---

## 6. Component library (copy-paste snippets)

All colors, fonts, spacing come from tokens — never hard-code hex values or `px` font sizes
in markup. Snippet data below is real (from research.json) — reuse it.

### 6.1 Section + kicker + heading unit

Every section heading follows this fixed unit (kicker → English title → Telugu subline).
Kickers are numbered in page order, Telugu first:

```html
<section class="section" aria-labelledby="timings-title">
  <div class="container">
    <div class="section__head">
      <span class="kicker"><span class="kicker__num">02</span> · దర్శన వేళలు — Darshan Timings</span>
      <h2 class="section__title" id="timings-title" data-en="Darshan Timings" data-te="దర్శన వేళలు">Darshan Timings</h2>
      <span class="section__sub" lang="te">దర్శన వేళలు</span>
    </div>
    <!-- content -->
  </div>
</section>
```

Section variants: `.section--cream` (festivals band only), `.section--inverted`
(donations only — the page's single dark passage).

### 6.2 Kalasham divider (between ivory sections, under titles)

```html
<div class="divider" role="presentation">
  <img src="assets/divider.svg" alt="" width="240" height="24">
</div>
```

### 6.3 Hero

Homepage (full height) — art slot + glow + content; inner pages use `hero--short` and may
omit the art:

```html
<section class="hero">
  <div class="hero__glow" aria-hidden="true"></div>
  <div class="hero__art" aria-hidden="true">
    <img src="assets/gopuram-hero.svg" alt="" width="1600" height="900">
  </div>
  <div class="hero__content">
    <p class="hero__emblem"><img src="assets/emblem.svg" alt="" width="96" height="96"></p>
    <span class="hero__kicker" lang="en">Bhairkhanpally · Keshampet Mandal · Ranga Reddy</span>
    <h1>
      <span class="hero__title-te" lang="te">శ్రీ లక్ష్మీ నరసింహ స్వామి దేవాలయం</span>
      <span class="hero__title-en" lang="en">Sri Lakshmi Narasimha Swamy Temple</span>
    </h1>
    <span class="hero__sloka" lang="sa">ॐ उग्रं वीरं महाविष्णुं ज्वलन्तं सर्वतोमुखम्</span>
    <div class="hero__ctas">
      <a class="btn btn--primary" href="donations.html" data-en="Donate · విరాళాలు" data-te="విరాళాలు · Donate">Donate · విరాళాలు</a>
      <a class="btn btn--ghost" href="visit.html" data-en="Plan Your Visit · దర్శనం" data-te="దర్శనం · Plan Your Visit">Plan Your Visit · దర్శనం</a>
    </div>
  </div>
</section>
<p class="hero-caption" data-lang="en">"The Lord who appeared at twilight — neither day nor night."</p>
<p class="hero-caption" data-lang="te" lang="te" hidden>"పగలు కాదు, రాత్రి కాదు — సంధ్యా సమయంలో ఆవిర్భవించిన స్వామి."</p>
```

Keep hero text in the upper/middle band of the gradient (the CSS padding does this) —
never sitting on the bright ember horizon.

### 6.4 Buttons

```html
<a class="btn btn--primary" href="donations.html" data-en="Donate" data-te="విరాళాలు">Donate</a>
<a class="btn btn--ghost" href="visit.html" data-en="Get Directions" data-te="మార్గం చూడండి">Get Directions</a>

<!-- EDIT-ME: replace +91XXXXXXXXXX (tel: needs +91 & 10 digits; wa.me needs 91 & 10 digits) -->
<a class="btn btn--call" href="tel:+91XXXXXXXXXX">
  <span data-en="Book by Phone" data-te="ఫోన్‌లో బుక్ చేయండి">Book by Phone</span>
</a>
<a class="btn btn--whatsapp" href="https://wa.me/91XXXXXXXXXX?text=Namaskaram%2C%20I%20want%20to%20know%20about%20sevas%20at%20Sri%20Lakshmi%20Narasimha%20Swamy%20Temple%2C%20Bhairkhanpally.">
  <svg class="wa-glyph" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path fill="#25D366" d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.8 5 2.3 7L4 29l7.3-2.2c1.9 1 3.9 1.5 4.7 1.5 6.6 0 12-5.3 12-11.9S22.6 3 16 3zm5.9 16.9c-.3.8-1.7 1.6-2.4 1.6-.6.1-1.4.1-2.2-.2-.5-.2-1.2-.4-2-.8-3.6-1.5-5.9-5.2-6.1-5.4-.2-.2-1.5-1.9-1.5-3.7 0-1.8 1-2.7 1.3-3 .3-.4.7-.4 1-.4h.7c.2 0 .5-.1.8.6.3.8 1 2.7 1.1 2.9.1.2.2.4 0 .7-.1.3-.2.4-.4.7l-.6.7c-.2.2-.4.4-.2.8.2.4 1 1.7 2.2 2.7 1.5 1.4 2.8 1.8 3.2 2 .4.2.6.2.9-.1.2-.3 1-1.2 1.3-1.6.3-.4.5-.3.9-.2.4.1 2.2 1 2.6 1.2.4.2.6.3.7.5.1.2.1.9-.2 1.7z"/></svg>
  <span data-en="WhatsApp" data-te="వాట్సాప్">WhatsApp</span>
</a>
```

The green appears ONLY inside the `wa-glyph` SVG. Never green buttons or green text.

### 6.5 Card grid (sevas / festivals / donation options)

```html
<div class="card-grid">
  <article class="card">
    <p class="card__icon"><img src="assets/lotus.svg" alt="" width="40" height="40"></p>
    <h3 class="card__title" data-en="Kshirabhishekam" data-te="క్షీరాభిషేకం">Kshirabhishekam</h3>
    <span class="card__sub" lang="te">క్షీరాభిషేకం</span>
    <p class="card__desc" data-lang="en">Sacred bath of the moolavirat with milk, believed to
      cool and please the Lord's ugra (fierce) aspect.</p>
    <p class="card__desc" data-lang="te" lang="te" hidden>స్వామివారి ఉగ్ర స్వరూపాన్ని శాంతింపజేసే
      పాలతో పవిత్ర అభిషేకం.</p>
    <!-- EDIT-ME: price range follows Yadadri-modeled defaults in research.json — confirm. -->
    <p class="card__price">₹100 – ₹200</p>
    <p class="card__links">
      <!-- EDIT-ME: replace +91XXXXXXXXXX / 91XXXXXXXXXX with the seva booking number. -->
      <a href="tel:+91XXXXXXXXXX" data-en="Book by Phone" data-te="ఫోన్‌లో బుక్ చేయండి">Book by Phone</a>
      <a href="https://wa.me/91XXXXXXXXXX?text=Namaskaram%2C%20I%20want%20to%20know%20about%20sevas%20at%20Sri%20Lakshmi%20Narasimha%20Swamy%20Temple%2C%20Bhairkhanpally.">
        <svg class="wa-glyph" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path fill="#25D366" d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.8 5 2.3 7L4 29l7.3-2.2c1.9 1 3.9 1.5 4.7 1.5 6.6 0 12-5.3 12-11.9S22.6 3 16 3zm5.9 16.9c-.3.8-1.7 1.6-2.4 1.6-.6.1-1.4.1-2.2-.2-.5-.2-1.2-.4-2-.8-3.6-1.5-5.9-5.2-6.1-5.4-.2-.2-1.5-1.9-1.5-3.7 0-1.8 1-2.7 1.3-3 .3-.4.7-.4 1-.4h.7c.2 0 .5-.1.8.6.3.8 1 2.7 1.1 2.9.1.2.2.4 0 .7-.1.3-.2.4-.4.7l-.6.7c-.2.2-.4.4-.2.8.2.4 1 1.7 2.2 2.7 1.5 1.4 2.8 1.8 3.2 2 .4.2.6.2.9-.1.2-.3 1-1.2 1.3-1.6.3-.4.5-.3.9-.2.4.1 2.2 1 2.6 1.2.4.2.6.3.7.5.1.2.1.9-.2 1.7z"/></svg>
        <span data-en="WhatsApp" data-te="వాట్సాప్">WhatsApp</span>
      </a>
    </p>
  </article>
</div>
```

Featured festival card (Narasimha Jayanti only): add `card--featured`.
Two-column layout (donation options): use `card-grid card-grid--two`.

### 6.6 The shasanam timings slab (the only table style)

```html
<div class="slab">
  <div class="slab__head">
    <img class="slab__emblem" src="assets/emblem.svg" alt="" width="34" height="34">
    <span class="slab__title-te" lang="te">శ్రీ లక్ష్మీ నరసింహ స్వామి దేవాలయం</span>
    <span class="slab__title-en" lang="en">Sri Lakshmi Narasimha Swamy Temple</span>
    <span class="slab__place" lang="en">Bhairkhanpally · 509408</span>
  </div>

  <p class="slab__label">
    <img src="assets/diya.svg" alt="" width="14" height="14">
    <span data-en="Morning" data-te="ఉదయం">Morning</span>
  </p>
  <!-- EDIT-ME: Schedule follows the daily_schedule defaults in research.json
       (modeled on Yadadri/Mattapalli). Confirm each timing with the committee. -->
  <table class="slab-table">
    <tbody>
      <tr>
        <th scope="row">Suprabhata Seva <span class="te" lang="te">సుప్రభాత సేవ</span></th>
        <td class="slab-table__leader" aria-hidden="true"></td>
        <td class="slab-table__time">6:00 AM</td>
      </tr>
      <tr>
        <th scope="row">Abhishekam <span class="te" lang="te">అభిషేకం</span></th>
        <td class="slab-table__leader" aria-hidden="true"></td>
        <td class="slab-table__time">6:30 AM</td>
      </tr>
    </tbody>
  </table>
</div>
```

Repeat a `.slab__label` + `<table>` pair for the evening block. The slab is composed to
screenshot cleanly at 390px — do not widen it or restyle it.

### 6.7 Sloka pull-quote (framed by two dividers)

Only three slokas exist on the site, one placement each: Ugram Viram → hero,
Karavalamba (verse 1) → about pull-quote, Narasimha Gayatri → footer (already in the
partial). Never add decorative Sanskrit elsewhere.

```html
<div class="divider divider--tight" role="presentation"><img src="assets/divider.svg" alt="" width="240" height="24"></div>
<blockquote class="sloka">
  <p class="sloka__sa" lang="sa">श्रीमत्पयोनिधिनिकेतन चक्रपाणे भोगीन्द्रभोगमणिराजितपुण्यमूर्ते ।<br>
  योगीश शाश्वत शरण्य भवाब्धिपोत लक्ष्मीनृसिंह मम देहि करावलम्बम् ॥</p>
  <span class="sloka__tr" lang="en">O Lord of yogis, eternal refuge, the boat across the ocean
  of worldly existence — O Lakshmi Narasimha, give me the support of Your hand.</span>
</blockquote>
<div class="divider divider--tight" role="presentation"><img src="assets/divider.svg" alt="" width="240" height="24"></div>
```

### 6.8 Diya-bullet lists (timings notes, festivals, how-to-reach)

```html
<ul class="diya-list">
  <li data-lang="en">From Hyderabad: take NH44 south past Kothur to Shadnagar, then the
      Shadnagar–Keshampet road; the village is about 5 km beyond Keshampet (~64 km, distances approximate).</li>
  <li data-lang="te" lang="te" hidden>హైదరాబాద్ నుంచి: NH44 మీదుగా కొత్తూరు దాటి షాద్‌నగర్,
      అక్కడి నుంచి కేశంపేట రోడ్డు; కేశంపేట దాటాక సుమారు 5 కి.మీ. (మొత్తం సుమారు 64 కి.మీ.).</li>
</ul>
```

(Pair each `li[data-lang="en"]` with its Telugu sibling as shown.)

### 6.9 Next-festival chip & announcement strip

- Announcement strip: already in the header partial; its text comes from `ANNOUNCEMENTS`
  at the top of `js/main.js`. Do not add another strip.
- Next-festival chip: place an empty slot where useful (homepage, festivals page). It fills
  itself from the `FESTIVALS` array and hides automatically when no date is upcoming:

```html
<p data-next-festival hidden></p>
```

### 6.10 Gallery + lightbox

```html
<div class="gallery-grid" data-gallery>
  <figure class="gallery-figure">
    <a class="gallery-item" href="assets/gopuram-hero.svg">
      <img src="assets/gopuram-hero.svg" alt="The temple gopuram silhouetted against the dusk sky" loading="lazy" width="1600" height="900">
    </a>
    <figcaption data-en="The gopuram at dusk" data-te="సంధ్యా సమయంలో గోపురం">The gopuram at dusk</figcaption>
  </figure>
</div>
```

The lightbox (Esc / arrow keys / focus trap) is created by `js/main.js` — no extra markup.
Until the committee supplies real photographs, gallery items may ONLY use the existing local
SVG artwork with honest captions — never stock photos, never empty "coming soon" frames.

### 6.11 Watermark (sthala puranam & donations only)

The lotus-chakra watermark (`assets/pattern.svg`) is applied entirely by CSS. Add the
`.watermark` class to a wrapper INSIDE the section — no extra markup, no `<img>`, no
inline styles:

```html
<section class="section" aria-labelledby="about-title">
  <div class="container watermark">
    <!-- sthala puranam content -->
  </div>
</section>
```

- On ivory (about.html sthala puranam ONLY): the pattern renders in stone at 4% opacity.
- Inside `.section--inverted` (donations.html ONLY): the same pattern renders in gold at 5%.
- Those are the only two permitted placements (DESIGN_SPEC §5, motif #6). Content sits
  above the watermark automatically; it is hidden in print.

### 6.12 Scroll reveal

Add `class="reveal"` to section heading units and cards you want to fade up once.
JS/CSS handle reduced-motion and no-JS safely. Use sparingly (headings, not every element).

---

## 7. Section rhythm rules (per DESIGN_SPEC §7)

- Page backgrounds are ivory. **At most one** `.section--inverted` per page (donations
  content), plus the dark hero and the night footer. Nothing else inverts.
- `.section--cream` is reserved for the festivals band.
- Between two ivory sections: the kalasham `.divider`. Never stack two dividers.
- Numbered kickers restart from `01` on each page and count up in page order.
- Body copy max measure is enforced (`.measure` = 34rem) — wrap long prose in
  `<div class="measure">` (left-aligned; never center walls of text).
- Announcement strip (header partial) is the only ticker; the three slokas keep their
  fixed placements; the jyoti flame pulse and the one-time reveal are the only motion.

## 8. Icon usage

- Icons are ONLY: `assets/emblem.svg`, `assets/lotus.svg`, `assets/diya.svg`,
  `assets/divider.svg`, the inline WhatsApp glyph (§6.4), and hand-authored inline SVG in
  the partials. Style: 1.25px brass-gradient strokes, saffron flame tips only — anything
  new must match `DESIGN_SPEC.md §4` exactly.
- No emoji, no clip-art, no raster images, no icon fonts.
- Decorative images always get empty `alt=""` (they are ornament); meaningful images get
  real alt text.
- SVG gotcha: if you author a new inline SVG with gradient strokes, give the gradient
  `gradientUnits="userSpaceOnUse"` — bounding-box gradients vanish on purely
  horizontal/vertical lines.

## 9. Accessibility requirements (review-blocking)

- Semantic landmarks: `header` / `nav` / `main` / `section` / `footer`; one `h1`;
  headings never skip levels.
- Every `img` has an `alt` attribute (empty for decorative art).
- All interactive elements are real `<a>`/`<button>` with 44×44px minimum tap targets.
- Phone numbers are always tappable `tel:` links with visible number text — never images,
  never text-only.
- Do not override the shared `:focus-visible` styles or remove outlines.
- Contrast: body text uses `--ink` on ivory/cream and `--ivory-text` on maroon;
  small gold text on light surfaces must use `--gold-deep` (the AA-safe brass) — plain
  `--gold` on ivory is for hairlines/glyphs only. `--gold-bright` is for dark surfaces only.
- `aria-current="page"` on the active nav link; `aria-expanded` on the hamburger is
  managed by JS; `hidden` on Telugu blocks is managed by JS.
- Test Telugu conjuncts render (క్షీరాభిషేకం, ద్వారబంధనం, లక్ష్మీ) — no tofu.

## 10. Never do (hard constraints — from DESIGN_SPEC §10)

1. Never invent temple facts, dates, names, numbers, UPI/bank details — placeholders + EDIT-ME only.
2. Never claim 80G/tax exemption; say nothing about tax benefit anywhere.
3. Never show a donation QR/UPI block without account-holder name, bank, and committee identity beside it.
4. No autoplaying audio, no "Live Darshan", no empty gallery shells, no "coming soon" features.
5. No marquee/blinking text, visitor counters, beveled buttons, rainbow gradients.
6. No clip-art gods, watermarked Google images, stock photos, or raster icons — SVG engraving system only.
7. No colors beyond maroon/gold/ivory tokens (+ the restricted accents exactly as scoped); no pure #000/#fff; no flat yellow gold.
8. No dark surface without the lamp glow (`.section--inverted` and the footer already have it).
9. No year-specific festival dates in body copy — Telugu-masam phrasing ("Vaishakha Shuddha Chaturdashi, April–May"); dated content lives only in the announcement strip / FESTIVALS array.
10. No English-only sections — every heading, CTA, label and seva name carries its Telugu equivalent.
11. No new fonts, no external anything (fonts.googleapis.com and the keyless Maps iframe on visit.html are the sole exceptions).
12. No motion beyond the jyoti pulse and the one-time scroll reveal; both already respect `prefers-reduced-motion`.
13. Never link to a page or file that does not exist in the file map.

## 11. Editable data quick reference (for the committee / future edits)

| What | Where |
| --- | --- |
| Announcement line(s) | `js/main.js` → `ANNOUNCEMENTS` (top of file) |
| Festival countdown dates | `js/main.js` → `FESTIVALS` (fill ISO dates each year) |
| Phone / WhatsApp numbers | Search for `EDIT-ME` in each HTML page |
| UPI / bank / trust details | donations.html `EDIT-ME` blocks |
| Darshan hours | timings.html slab + footer summary (`EDIT-ME` comments) |
