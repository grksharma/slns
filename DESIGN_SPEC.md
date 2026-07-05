# DESIGN_SPEC — Bhairkhanpally Sri Lakshmi Narasimha Swamy Temple Website

**Direction: "Carved Stone & Twilight (Sandhya Shila)"** — winner of the 3-way judge round, with
grafts from "Kumkuma & Brass" (brass-gradient gold, lamp-glow physics, brass-plaque timings card,
prabhavali-framed UPI QR, three-sloka invocation thread) and "Modern Devasthanam" (single-inversion
restraint, unified engraving-stroke SVG system, tabular-numeral ledgers, bilingual numbered kickers,
`:lang(te)` typography scoping, saffron focus rings).

**One-line concept:** The Lord appeared at sandhya kala — neither day nor night — so the site is a
Kakatiya-era stone temple seen at dusk: the hero is a twilight sky over a carved gopuram silhouette,
the body of the page is sunlit ivory stone, donations are the single deep-twilight inverted passage,
and the footer is star-flecked night. Every ornament is hand-authored SVG drawn like temple-brass
engraving; the palette is exactly maroon + gold + ivory. The dusk gradient is theology, not
decoration — stated once in a caption under the hero.

All page copy/data (timings, sevas, festivals, slokas, Telugu strings, how-to-reach facts) comes
from `research.json` in this directory. Do not invent temple facts, dates, prices, phone numbers,
or an 80G claim.

---

## 1. Color tokens (the complete palette — no other colors permitted)

```css
:root {
  /* Core triad — the ONLY full-strength UI colors in any viewport */
  --maroon:        #6B1F24;  /* aged kumkum maroon: headings on ivory, solid button hover, slab base */
  --maroon-deep:   #33121A;  /* twilight plum: hero sky top, donations section bg */
  --maroon-night:  #241014;  /* night: footer bg, gopuram silhouette fill in hero */
  --gold:          #C9A227;  /* antique brass: hairlines, rules, strokes, kickers */
  --gold-bright:   #E3C363;  /* glow highlights + text on dark surfaces only */
  --gold-pale:     #E9C46A;  /* light stop of the brass gradient (see §5) — never used flat */
  --ivory:         #FAF5EA;  /* default page background */
  --ivory-card:    #FFFDF6;  /* card surface on ivory */
  --cream-tint:    #F6E9D8;  /* festivals band + card hover fill — the only alternate section fill */

  /* Ink */
  --ink:           #2B2118;  /* all body text; NEVER #000 */
  --ink-soft:      #6B5D4F;  /* captions, metadata */
  --ivory-text:    #FAF5EA;  /* body text on maroon surfaces; NEVER #fff */

  /* Restricted-use accents (see rules below) */
  --ember:         #B85C24;  /* ONLY inside sky gradients + the 1px horizon line. Never a UI color. */
  --saffron-flame: #E8A13D;  /* ONLY flame tips inside SVG artwork + the 2px focus ring. */
  --stone:         #8A7A66;  /* ONLY watermarks/frieze linework at 3–6% opacity on ivory. */
  --whatsapp:      #25D366;  /* ONLY the WhatsApp glyph itself. Never buttons/text. */

  /* Gradients */
  --grad-twilight: linear-gradient(180deg, #33121A 0%, #6B1F24 62%, #B85C24 100%); /* hero sky */
  --grad-brass:    linear-gradient(160deg, #E9C46A 0%, #C9A227 100%);              /* all "gold" fills: buttons, kickers glyphs, SVG stroke gradient */
  --glow-lamp:     radial-gradient(ellipse 90% 55% at 50% 100%, rgba(184,92,36,.28), transparent 70%); /* low-center lamp glow layered on every dark section */
}
```

Hard rules:
- Maroon + gold + ivory are the only full-strength colors visible in any viewport.
- No greens (except the 24px WhatsApp glyph), no blues, no pure black, no pure white — anywhere.
- Gold is never flat `#FFD700`-style yellow: fills use `--grad-brass`; SVG strokes use an SVG
  `linearGradient` with the same two stops. Hairlines may be flat `--gold` at reduced alpha.
- Every dark section (`hero`, `donations`, `footer`) layers `--glow-lamp` above its base so dark
  reads as deeparadhana lamplight, never flat dark-mode panels.

## 2. Typography

Google Fonts `<link>` (single request):

```
https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Mulish:wght@400;500;700&family=Cormorant+Garamond:ital,wght@1,500;1,600&family=Noto+Serif+Telugu:wght@500;700&family=Noto+Sans+Telugu:wght@400;500&family=Noto+Serif+Devanagari:wght@400;500&display=swap
```

```css
:root {
  --font-display: 'Cinzel', 'Times New Roman', serif;            /* English display/section headings, kickers, times, prices */
  --font-body:    'Mulish', 'Segoe UI', -apple-system, sans-serif; /* all Latin body, nav, buttons, captions, tables */
  --font-quote:   'Cormorant Garamond', Georgia, serif;           /* italic only: sloka translations + pull quotes */
  --font-te-serif:'Noto Serif Telugu', 'Noto Sans Telugu', serif; /* Telugu display: temple/deity/seva names, headings */
  --font-te-sans: 'Noto Sans Telugu', sans-serif;                 /* Telugu body, labels, table terms */
  --font-dev:     'Noto Serif Devanagari', serif;                 /* Sanskrit slokas in Devanagari */
}
```

Roles and rules:
- **Cinzel** (400/600/700): English display headings, section titles, all-caps letter-spaced
  kickers, timing values, ₹ prices. Never for paragraphs. On maroon surfaces, headings ≥ 15px get a
  carved-relief emboss: `text-shadow: 0 1px 0 rgba(0,0,0,.4), 0 -1px 0 rgba(255,240,200,.12);` —
  disabled below 15px.
- **Mulish** (400/500/700): everything Latin that isn't display. Base 17px / line-height 1.7.
- **Cormorant Garamond Italic** (500/600): ONLY sloka translations and the sthala-puranam pull
  quote. Never roman, never for UI.
- **Telugu**: scope with `:lang(te)` (set `lang="te"` on every Telugu string):
  ```css
  :lang(te) { font-family: var(--font-te-sans); line-height: 1.9; font-size: 0.94em; letter-spacing: 0 !important; }
  .te-display:lang(te) { font-family: var(--font-te-serif); }
  ```
  Never letter-space Telugu. Line-height ≥ 1.8 always (conjuncts/vattulu clip otherwise).
  0.94em relative sizing gives optical parity next to Latin. Test render of
  `క్షీరాభిషేకం`, `ద్వారబంధనం`, `లక్ష్మీ` before shipping. Ramabhadra is rejected (single weight,
  government-portal association).
- **Devanagari slokas**: `--font-dev`, line-height ≥ 1.9.
- **Tabular numerals**: `font-feature-settings: 'tnum' 1;` on the timings slab and all price
  columns so times and ₹ figures align like a ledger.

Scale (mobile-first, clamp):

| Role | Value |
|---|---|
| Kicker | 11–12px caps, tracking .18em, Mulish 700, gold |
| Body | 17px / 1.7 |
| Lead | 21px |
| H3 / card title | 21–24px Cinzel 600 |
| Section title (H2) | `clamp(1.5rem, 5.5vw, 2.25rem)` Cinzel 600 |
| Hero Telugu name | `clamp(1.6rem, 7.5vw, 2.8rem)` Noto Serif Telugu 700 |
| Hero English name | `clamp(1.3rem, 6vw, 2.4rem)` Cinzel 700 caps |
| Max text measure | 34rem (~66ch), never exceeded |

Kicker format (every section, fixed): numbered + bilingual, Telugu first —
`01 · దర్శన వేళలు — DARSHAN TIMINGS`, numeral in `--gold`, set in Mulish 700 caps.
The full heading unit is always: kicker → Cinzel English title → Noto Serif Telugu subline.

## 3. Spacing, radius, shadow, misc tokens

```css
:root {
  --space-1: .25rem;  --space-2: .5rem;  --space-3: 1rem;  --space-4: 1.5rem;
  --space-5: 2.25rem; --space-6: 3rem;   --space-7: 4.5rem; --space-8: 7rem;
  --section-pad: var(--space-7);          /* 4.5rem mobile */
  /* desktop ≥900px: --section-pad: var(--space-8) */

  --radius-card: 10px;
  --radius-btn:  8px;
  --radius-tag:  4px;

  --hairline:       1px solid rgba(201,162,39,.35);  /* gold hairline on ivory */
  --hairline-dark:  1px solid rgba(201,162,39,.25);  /* gold hairline on maroon */
  --shadow-relief:  inset 0 1px 0 rgba(255,253,246,.9), 0 1px 2px rgba(43,33,24,.06),
                    0 6px 18px rgba(43,33,24,.05);   /* cards: faint top-light = relief-carved */
  --shadow-slab:    0 10px 30px rgba(36,16,20,.28);  /* the timings slab + QR card */

  --focus-ring: 0 0 0 2px var(--ivory), 0 0 0 4px var(--saffron-flame); /* ALL interactive elements */
  --content-max: 68rem; /* page container */
}
```

Motion: exactly two animations site-wide — (1) the emblem's jyoti flame, 3s CSS opacity/scale
pulse; (2) optional one-time scroll-reveal fade-up (12px, 400ms) on section headings. Both wrapped
in `@media (prefers-reduced-motion: reduce) { animation: none; transition: none; }`. Nothing else
moves.

## 4. SVG engraving discipline (applies to ALL artwork)

Every illustration on the site is hand-authored inline SVG struck from one system:
- Strokes 1.25px in the brass gradient (SVG `<linearGradient>`: `#E9C46A → #C9A227`); secondary
  interior detail lines at `#E8C878`-equivalent = `--gold-pale` at 70% opacity.
- **No fills** except: flame tips (`--saffron-flame`), the gopuram silhouette (`--maroon-night`),
  and watermarks (`--stone` or gold at 3–6% opacity).
- Same stroke system for gopuram, prabhavali, kalasham, diya, lotus, chakra — everything feels
  struck from one sheet of temple brass. No emoji, no clip-art, no raster icons, ever.

## 5. The definitive motif set (6 motifs — nothing else exists)

1. **Split-pillar jyoti emblem** (site mark): a stone pillar cleft down the middle, a flame with a
   saffron tip emerging from the fissure — Prahlada's pillar, abstract, never a deity figure.
   Used: sticky header (24px), hero centerpiece inside the prabhavali, favicon (16/32px),
   footer seal, and the 1200×630 OG/WhatsApp preview image (emblem + bilingual name on
   `--grad-twilight`).
2. **Prabhavali arch**: fine double-stroke brass-gradient arch with stylized flame tips and a
   kalasham finial. Used: crowning the hero emblem (full size); miniature framing each seva-card
   icon; arching over the donation UPI QR. Nowhere else.
3. **Adhisthana frieze band**: repeating lotus-petal-over-stepped-course plinth molding, 20–28px
   tall SVG. Used at EVERY ivory↔dark boundary (hero→about, sevas→donations, donations→reach,
   reach→footer) so the page stacks like temple masonry courses. Gold-on-maroon linework.
4. **Kalasham-on-rule divider**: 1px gold rule at 35% alpha breaking for a centered 14px kalasham
   glyph (pot + coconut + mango leaves). The ONLY divider between ivory sections and under section
   titles. Never varied.
5. **Gopuram village skyline silhouette**: Kakatiya-style stepped pyramidal vimana with kalasham
   finial, flanked by low compound-wall and neem-tree silhouettes. Used twice: as the hero's
   Layer 2 (fill `--maroon-night`, with a 0.75px `--gold-bright` edge-light down its west profile),
   and as the footer's top edge (silhouette over a 1px `--ember` horizon line).
6. **Watermark + bullets**: one 8-petal lotus-chakra medallion, stroke-only — 4% `--stone` on ivory
   (behind sthala puranam only), 5% gold on maroon (behind donations only). Diya flame line-glyphs
   (12px, brass stroke) as list bullets in timings, festivals, and how-to-reach lists — replacing
   all generic bullets.

## 6. Hero composition (exact)

Full-viewport, `min-height: 92svh`, four stacked layers (all inline SVG/CSS, no images):

1. **Sky**: `--grad-twilight` vertical; ~20 one-pixel stars at 6–10% opacity in the upper third;
   `--glow-lamp` rising from the horizon.
2. **Skyline**: motif #5 centered — near-black maroon gopuram with gold kalasham finial and the
   0.75px `--gold-bright` west edge-light; village wall + trees flanking.
3. **Prabhavali + emblem**: motif #2 arch (~78vw wide on mobile, max 420px) crowning the gopuram;
   at its center the split-pillar jyoti emblem (motif #1), flame on the 3s pulse — the page's only
   persistent motion.
4. **Text block** (over the lower sky, centered):
   - Kicker: `BHAIRKHANPALLY · KESHAMPET MANDAL · RANGAREDDY` (11px caps, gold)
   - `శ్రీ లక్ష్మీ నరసింహ స్వామి దేవాలయం` — Noto Serif Telugu 700, `--gold-bright`
   - `SRI LAKSHMI NARASIMHA SWAMY TEMPLE` — Cinzel 700 caps, `--ivory-text`
   - One Devanagari line: `ॐ उग्रं वीरं महाविष्णुं ज्वलन्तं सर्वतोमुखम्` — small, 70% ivory
   - CTAs side by side: **Donate · విరాళాలు** (solid brass button) + **Plan Your Visit · దర్శనం**
     (ghost outline, see §8).

Bottom edge: NOT a straight line — the adhisthana frieze band (motif #3) steps the twilight down
onto the ivory page. Directly beneath, one caption line in Cormorant italic, `--ink-soft`:
*"The Lord who appeared at twilight — neither day nor night."*

Above the hero: sticky ivory header (emblem 24px + Telugu/English wordmark + brass Donate button)
with a one-line announcement strip beneath it — maroon bg, `--gold-bright` text, 12px diya glyph.

## 7. Section rhythm (exact order; ivory unless marked)

Restraint rule: dark hero + ONE full inverted section (donations) + night footer. Nothing else
inverts. Every ivory↔dark boundary crosses the adhisthana frieze; ivory↔ivory boundaries use the
kalasham divider.

| # | Section | Surface | Treatment |
|---|---|---|---|
| — | Announcement strip | maroon | single editable line, gold text, diya glyph |
| — | Hero | twilight | §6 |
| 01 | Sthala Puranam / About | ivory | chakra watermark 4% stone; short paragraphs, 66ch, Fraunces-style drop cap NOT used — plain Cinzel H2; Karavalamba verse as centered pull-quote (Devanagari + Cormorant-italic translation) framed by two kalasham rules. Never a centered wall of text. |
| 02 | Darshan Timings | ivory section, **maroon slab card** | the "shasanam" inscription slab: a `--maroon` card, double gold hairline frame, `--shadow-slab`; header row carries the emblem + bilingual temple name + `Bhairkhanpally 509408`; rows = diya bullet · ritual EN (Mulish 500) over Telugu subline · dotted gold leader · time in Cinzel small-caps `tnum`, `--gold-bright`; rows ruled by 1px gold @25%; morning/evening blocks labeled with sun/diya glyphs. Composed to screenshot cleanly at 390px. |
| 03 | Sevas & Poojas | ivory | card grid, 1-col phone / 3-col ≥900px (see §8 cards); data from research.json sevas with price ranges; each card: prabhavali-framed icon, EN + Telugu name, 2-line description, price in Cinzel, `Book by Phone` (tel:) + `WhatsApp` (wa.me, green glyph only) text links. No booking engine. |
| 04 | Festivals | `--cream-tint` band | vertical timeline, Telugu-month kickers (e.g. `VAISHAKHA SHUDDHA CHATURDASHI · APRIL–MAY`); date-less generic phrasing so content never rots; Narasimha Jayanti card slightly larger with a gold corner flame. |
| 05 | **Donations** | **inverted `--maroon-deep`** | the page's darkest passage: gold chakra watermark 5%, `--glow-lamp`; UPI QR inside an `--ivory-card` framed by a miniature prabhavali; UPI ID printed as selectable text beside it; gold-hairline trust block naming committee + account holder + bank in Telugu and English; receipt note; annadanam quote in Cormorant italic; **no 80G claim**. |
| 06 | How to Reach | ivory | Google Maps iframe (no API key) in a gold hairline frame; diya-bulleted route list (from-Hyderabad/NH44/Shadnagar/Keshampet distances from research.json, marked approximate); large tel: and WhatsApp buttons; `Get Directions` ghost button. |
| — | Footer | `--maroon-night` | top edge = gopuram village skyline over the 1px ember horizon; faint stars; Narasimha Gayatri sloka small in Devanagari; purpose-labelled tappable phone rows in `--gold-bright`; quick links in Mulish; emblem seal + "Bhairkhanpally Grama Devalayam" committee credit. |

Invocation thread (exactly three slokas, one placement each, never decorative Sanskrit soup):
Ugram Viram → hero · Karavalamba (verse 1) → About pull-quote · Narasimha Gayatri → footer.

## 8. Component treatments

**Buttons**
- Primary ("Donate · విరాళాలు"): `--grad-brass` fill, `--maroon-night` text, Mulish 700, 14px caps
  tracking .06em, padding 14px 28px, `--radius-btn`, hover deepens to flat `--gold`;
- Ghost ("Plan Your Visit"): transparent, 1px `--gold-bright` border on dark / `--maroon` border +
  text on ivory, same metrics;
- All interactive elements get `box-shadow: var(--focus-ring)` on `:focus-visible`;
- Min tap target 44×44px; every phone number is an underlined `tel:` link — never text-only or an
  image.

**Cards** (sevas, festivals): `--ivory-card` bg, `border: var(--hairline)`, `--radius-card`,
`--shadow-relief`, padding `--space-4`; hover: bg `--cream-tint`, border alpha to 60%; a small
arch-curve rule (flattened prabhavali) tops each seva card.

**Tables**: only the shasanam slab (§7 row 02) — no other table styles exist.

**Dividers**: kalasham-on-rule between ivory sections; adhisthana frieze at every ivory↔dark
boundary. No other divider may be invented.

**Pull quotes**: Devanagari line (--font-dev) + Cormorant italic translation, centered, max 30rem,
kalasham rules above and below.

## 9. Signature details (build these with care — they are the design)

1. **Doctrinal twilight**: the dusk-to-night scroll arc (twilight hero → lit ivory stone → deep-
   twilight donations → star-flecked night footer) mirrors the temple's own day from Suprabhatam to
   Kavata Bandhanam; the one caption line under the hero states why. No other temple can claim it.
2. **Split-pillar jyoti identity system**: one abstract mark at 16px favicon, 24px header, footer
   seal, and 1200×630 OG card — a real identity for a photo-less village temple, spread by
   WhatsApp forwards.
3. **The shasanam timing slab**: darshan timings as a carved maroon inscription slab with brass
   engraving rules and `tnum` Cinzel times, deliberately composed to screenshot at 390px with the
   temple's name and PIN inside the frame — the single most-forwarded artifact of any temple site.
4. **Hundi-grade donation block**: prabhavali-framed QR + selectable UPI ID + committee/account-
   holder/bank printed bilingually + receipt note — srjbtkshetra.org transparency at village scale,
   turned into the page's ornament.
5. **Adhisthana masonry rhythm + lamplight physics**: every ivory↔dark seam crosses the same lotus-
   plinth frieze, and every dark surface glows from a low-center ember radial — the page reads as
   Kakatiya stone courses lit by a single diya, using exactly one repeated device per idea.

## 10. Never do (from research pitfalls — hard constraints)

- Never show a donation QR without the account-holder name, bank, and committee identity in print.
- Never claim 80G/tax exemption (no certificate exists); say nothing about tax benefit.
- No autoplaying audio of any kind; no "Live Darshan" links, empty gallery shells, or
  "coming soon" features — ship only what fully works.
- No marquee/blinking text, visitor counters, beveled buttons, rainbow gradients, or
  clip-art gods / watermarked Google images / low-res stretched photos. All imagery is the §4
  SVG engraving system.
- No saffron+red+yellow+green+blue in one viewport — three colors plus ink, period.
- No walls of centered italic text; sthala puranam is short left-aligned paragraphs + one
  pull quote.
- No phone numbers below the fold only, and none as images — tappable `tel:` everywhere,
  one number reachable in the header/announcement zone.
- No hard-coded year-specific festival dates in body copy (use Telugu-month phrasing like
  "Vaishakha Shuddha Chaturdashi (April–May)"); the announcement strip is the single place
  dated content may live.
- Never render Telugu as images or without the Noto Telugu webfonts loaded; test conjuncts
  (క్ష్మీ, ద్వారబంధనం) — no tofu.
- No English-only sections: every section heading, CTA, and seva name carries its Telugu
  equivalent, Telugu first in kickers.
- No pure #000 / #fff, no flat yellow gold, no dark section without the lamp glow, no motion
  beyond the two sanctioned animations.

## 11. Practical requirements

- Mobile-first, single column below 900px; traffic is ~90% phones.
- Static HTML/CSS (+ minimal JS only for the lightbox-free needs here — none required).
- Google Maps `<iframe>` embed (no API key) + `Get Directions` link.
- WhatsApp deep link: `https://wa.me/91XXXXXXXXXX?text=` pre-filled
  "Namaskaram, I want to know about sevas at Sri Lakshmi Narasimha Swamy Temple, Bhairkhanpally."
- OG tags: `og:image` = the 1200×630 emblem card; `og:title` bilingual; `og:description` one line
  with timings summary — WhatsApp preview is the primary share surface.
- `lang="te"` on all Telugu strings; `lang="sa"` on Devanagari slokas; semantic landmarks;
  contrast ≥ 4.5:1 for body text on every surface (`--gold-bright` on `--maroon-deep` passes;
  plain `--gold` on maroon is for hairlines/glyphs only, not paragraphs).
