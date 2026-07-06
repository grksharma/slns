# Sri Lakshmi Narasimha Swamy Temple, Bhairkhanpally — Website

A complete, fast, mobile-first bilingual (English / తెలుగు) website for the
**Sri Lakshmi Narasimha Swamy Temple, Bhairkhanpally** (village in Keshampet mandal,
Ranga Reddy district, Telangana — PIN 509408).

It is a **static website**: just HTML, CSS, one small JavaScript file and hand-drawn SVG
artwork. There is **no server, no database and no login** to maintain. It can be hosted
free (see *Publishing* below), loads instantly on a village phone connection, and every
piece of information the committee needs to change is in plain, well-commented files.

> **Important — please read first.** This site was prepared as a starting point. Some
> details (phone numbers, bank/UPI details, the temple's founding history, exact festival
> dates, and photographs) are **not yet filled in** — they appear as clearly-marked
> placeholders. Nothing about the temple has been invented. Search the files for
> `EDIT-ME` and fill in the real values before publishing. The full checklist is below.

---

## 1. How to view it right now

Double-click **`index.html`** — it opens in any web browser. That's it. To move between
pages, use the menu. (For the language toggle, gallery pop-ups and menus to work on your
own computer exactly as they will online, it's best to view it through a simple local
server or after publishing — but the content is fully readable just by opening the file.)

---

## 2. What's in the box (file map)

```
index.html        Home
about.html        About / Sthala Puranam — the Narasimha story, slokas
timings.html      Darshan & ritual timings (the screenshot-friendly schedule)
sevas.html        Sevas & poojas, with prices and how to book
festivals.html    Festivals & the annual Brahmotsavam / Jatara
donations.html    Donations / e-Hundi (bank & UPI details go here)
gallery.html      Photo gallery (illustrations for now — replace with real photos)
visit.html        How to reach, map, and contact details

css/styles.css    All styling. One file. (Colours, fonts, layout.)
js/main.js        All behaviour + THE DATA YOU EDIT MOST (announcements, festival dates).
assets/           Logo, hero artwork, icons, and the 9 gallery illustrations.
partials/         The shared header & footer (reference copies).
DESIGN_SPEC.md    The visual design rules (for a designer/developer).
STYLEGUIDE.md     How the pages are built (for a developer).
research.json     The sourced facts & content the site was built from, with links.
sitemap.xml       For search engines (edit the website address once you have one).
robots.txt        For search engines.
```

---

## 3. ★ Before you publish — the EDIT-ME checklist

**Good news — most of the core data has already been filled in** from the temple's
**2026 Brahmotsavam invitation**. Already done and live on the site:

- ✅ The deity's proper name — **Sri Guntuka Lakshmi Narasimha Swamy** (శ్రీ గుంటుక లక్ష్మీ
  నరసింహ స్వామి) — used across every page, with the meaning of "Guntuka" explained.
- ✅ The temple's **founding story / sthala puranam** (the ~312-year-old swayambhu stone,
  the farmer Sayinni Narsayya, the dream of Karnam Ramayya Pantulu, the Gannoju family) —
  on the About page, in English and Telugu.
- ✅ The **moolavirat** description (swayambhu; the stone grew to fill the sanctum).
- ✅ **Phone numbers** — Archakulu Gorenta Narasimha Sharma (89781 72136), Sarpanch / committee
  Baikani Shamanta – Yadayya Yadav (94409 28385), and the temple cell (96180 54672).
- ✅ **Bank details** for donations — State Bank of India, Keshampet branch, A/c 37611249654,
  IFSC SBIN0022054.
- ✅ The full **6-day Brahmotsavam / Jatara programme** (Dhwajarohanam through Chakratheertham,
  bull races, chariots, plays) — on the Festivals page.
- ✅ The **Telugu village spelling** corrected to **బైర్ఖాన్‌పల్లి**.

**What still needs you** (search the files for `EDIT-ME` — far fewer now):

### A. Real photographs (the biggest remaining item)
- The gallery shows hand-drawn illustrations. Replace them with real photos — see section 4
  below. Also add an `og-image.jpg` (a wide gopuram/deity photo) so shared links show a nice
  preview.

### B. A few donation details — `donations.html`
- The exact **bank account name** as registered (the invitation printed the account number
  and IFSC but not the name) — fill the "Account name" row and confirm it.
- Optionally add the temple's real **UPI QR image** (the page currently points donors to the
  bank transfer and the temple cell). The QR is not reproduced from the pamphlet on purpose,
  so no wrong code can ever be scanned.
- The page makes **no 80G / tax claim** by design; only add one if the temple holds a
  certificate (then a developer can add the registration number and PAN properly).

### C. Prices & daily hours — `sevas.html`, `timings.html`
- The **seva prices** and the **regular (non-festival) daily darshan hours** are still
  sensible defaults modelled on Yadadri/Mattapalli (the invitation only lists festival-day
  timings). Confirm them with the committee and the archakulu, and edit freely.

### D. Festival dates each year — `js/main.js` (top of the file)
- `FESTIVALS` — fill in each year's dates (from the panchangam) to power the "next festival"
  countdown. The Brahmotsavam falls in Phalguna masam (Feb–Mar). Wrong dates are worse than
  none — verify with the purohit.
- `ANNOUNCEMENTS` — the scrolling line at the top of every page, for the next festival or a
  timing change.

### E. Optional finishing touches
- Confirm the **utsava murti** and **dhwaja sthambham** descriptions on the About page.
- Add a door number / landmark line to the address on the Visit page if there is one.

---

## 4. Replacing the gallery illustrations with real photos

Right now `gallery.html` shows **9 hand-drawn illustrations** (in `assets/gallery/`) as
honest stand-ins — there are no fake "coming soon" boxes and no photos taken from the
internet. To use real photographs:

1. Take/collect photos (gopuram, the moolavirat — with the archakulu's permission, the
   utsavam, deeparadhana, Rathotsavam, etc.).
2. Save each as a **JPG, landscape, about 1600×1200 pixels, under ~400 KB**, into the
   `assets/gallery/` folder.
3. In `gallery.html`, find the `EDIT-ME` comment above each picture and change **both**
   the `href="..."` and the `src="..."` to your new file name, then rewrite that image's
   `alt="..."` text to describe the real photo. Keep the caption lines.
4. Photos that show people should be published only with their consent.

**Also recommended:** add one nice wide photo named `og-image.jpg` (1200×630 px) to the
folder — a developer can then reference it in each page's `og:image` tag so a beautiful
preview card shows when the link is shared on WhatsApp.

---

## 5. The English / Telugu toggle

Every visitor can switch the whole site between English and తెలుగు using the **తెలుగు /
English** button in the header. Their choice is remembered on their device. All the Telugu
is already written into the pages; you don't need to do anything for the toggle to work.

> **Please have a native Telugu speaker proofread the Telugu** before publishing. It was
> written carefully and uses the correct temple terms, but a local reader may prefer
> different phrasing or honorifics. All Telugu lives right next to its English twin in the
> HTML (look for `data-te="..."` and the `lang="te"` paragraphs), so edits are easy.

---

## 6. Publishing the site (free)

You do not need to pay for hosting. Two easy options:

### Option A — Netlify Drop (easiest, no account tools needed)
1. Go to **app.netlify.com/drop** in a browser.
2. Drag the **whole project folder** onto the page.
3. In under a minute you get a public web address (e.g. `your-temple.netlify.app`).
   Updating later = drag the folder again.

### Option B — GitHub Pages (good if you use GitHub)
1. Create a free GitHub account and a new repository.
2. Upload all these files to the repository.
3. In the repository: **Settings → Pages → Build and deployment → Deploy from a branch**,
   choose the `main` branch and the `/ (root)` folder, and **Save**.
4. Your site appears at `https://<your-username>.github.io/<repository-name>/` in a couple
   of minutes.

### A custom domain (e.g. `bhairkhanpallytemple.org`)
Buy the domain from any registrar (₹700–₹1000/year). Both Netlify and GitHub Pages let you
connect a custom domain for free from their settings — follow their "custom domain" guide,
which will ask you to add a DNS record at your registrar. After connecting the domain, also
update the address inside `sitemap.xml` (there's an `EDIT-ME` note there).

---

## 7. Content & sources

The village facts (location, mandal, district, PIN, distances, nearby temples), the daily
schedule and seva/festival patterns, the Narasimha story and the Sanskrit slokas were
compiled from public sources — all listed with links in **`research.json`**. The temple's
*own* specifics (history, staff, contacts, accounts, photos) were intentionally left as
placeholders for the committee to provide. When in doubt, the committee's word overrides
anything on the site.

*Built with care, in service of Sri Lakshmi Narasimha Swamy. 🙏*
