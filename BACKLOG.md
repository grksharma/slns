# Backlog & Roadmap — Sri Guntuka Lakshmi Narasimha Swamy Temple Website

A living to-do list to grow this site into the best village-temple website in Telangana.
Work top-to-bottom: the **Now** items give the biggest jump for the least effort. Every
change is made by editing a file and running `git push` — the live site
(https://grksharma.github.io/slns/) updates on its own in a minute or two.

**Legend:** Impact ⭐ (High) / ◐ (Medium) · Effort **S** (hours) / **M** (a few days) /
**L** (needs a developer + budget or an online service).

---

## Guiding principles (please keep these)

1. **Ship only what fully works.** A small site that works beats a big one that half-works —
   especially for donations and anything "live." A broken feature costs trust; an absent one
   doesn't. (This is why the QR was only added after a real payment verified it.)
2. **Keep it editable by the committee.** Prefer plain files and free no-backend tools over
   anything that needs a server to babysit. If a task needs a developer, it's marked **L**.
3. **Telugu-first, mobile-first, fast.** ~90% of visitors are on phones on village
   connections, and most read Telugu. Never slow the site down or bury the Telugu.
4. **Never invent facts.** Names, dates, prices, amounts, and account details come from the
   committee — not guesses. Mark anything unconfirmed and confirm before publishing.

---

## 🟢 NOW — do these next (high impact, low effort)

- [ ] **Real photographs** ⭐ **M** — the single biggest upgrade. Replace the 9 gallery
  illustrations, add a hero photo, and add a wide `og-image.jpg` (1200×630) so shared
  WhatsApp/Facebook links show a real preview. Priority shots: the moolavirat (with archaka
  permission), the gopuram, Brahmotsavam Rathotsavam (chinnateru + peddateru), the bull races
  (banda laguta), Kalyanam, deeparadhana, annadanam. See `README.md` §4 for exact sizes/steps.
- [ ] **Confirm seva prices & daily darshan hours** ⭐ **S** — these are still Yadadri/Mattapalli
  defaults (the invitation only gave festival-day timings). Confirm with the archakulu and edit
  `sevas.html` / `timings.html`. *Accuracy is a trust item.*
- [ ] **Fill this year's festival dates** ⭐ **S** — put the panchangam dates into the
  `FESTIVALS` array at the top of `js/main.js` to switch on the "next festival" countdown, and
  add the coming Brahmotsavam to `ANNOUNCEMENTS`. Verify dates with the purohit.
- [ ] **Custom domain** ⭐ **S** — buy a memorable domain (e.g.
  `guntukanarasimhaswamy.org` / `bkptemple.in`, ~₹700–1,000/yr) and point it at GitHub Pages.
  A real domain reads as far more trustworthy than a `github.io` address. Then update
  `sitemap.xml` and `robots.txt` to the new address.
- [ ] **Google Business Profile + Maps listing** ⭐ **S** — claim/create the temple on Google
  Maps with the website link, timings, and photos. This is how pilgrims searching "Narasimha
  temple near Keshampet" will find it — likely the #1 source of new visitors.
- [ ] **Final native-speaker Telugu read** ◐ **S** — have one local reader skim the live pages,
  especially proper names and the deity spelling (నరసింహ vs the invitation's నృసింహ్మ). The
  committee is the final authority on names.

---

## 🟡 NEXT — meaningful additions (mostly still no backend)

- [ ] **Donor honour-roll page ("అభివృద్ధి దాతలు")** ⭐ **M** — the 2026 invitation already lists
  hundreds of donors. A respectful annual honour-roll page is culturally expected and gently
  encourages giving. Keep it a simple, updatable table per year.
- [ ] **Festival photo & video gallery** ⭐ **M** — once photos exist, group them by event
  (Brahmotsavam, Kalyanam, daily darshan). Embed existing YouTube/Facebook videos of past
  jataras/rathotsavam (embeds need no backend).
- [ ] **WhatsApp announcements channel** ⭐ **S** — create a WhatsApp Channel/broadcast for
  festival and timing updates and link it from the site. This is how the village audience
  actually receives news.
- [ ] **Seva / annadanam enquiry form** ◐ **M** — a no-backend form (Google Forms or Formspree)
  so devotees can request a seva or sponsor annadanam without a phone call, feeding the
  committee an email/sheet. Keep the phone/WhatsApp options too.
- [ ] **Analytics + Search Console** ◐ **S** — add a privacy-friendly counter (GoatCounter or
  Plausible) to see what devotees look at, and register the site in Google Search Console so it
  ranks well and you can submit the sitemap.
- [ ] **Accessibility & performance audit** ◐ **S** — run Lighthouse; fix any contrast/tap-target
  issues and confirm fast loads on a 3G phone. (The base is already good; this keeps it that way
  as photos are added.)
- [ ] **Richer SEO for festivals** ◐ **M** — add `Event` structured data for the annual
  Brahmotsavam so it can appear in Google's event results, and keep the festival calendar current.
- [ ] **Committee "how to edit" runbook** ⭐ **S** — a one-page guide (with screenshots) showing
  the committee how to change a phone number, a timing, or an announcement and publish it. Reduces
  dependence on a developer. (Some of this is already in `README.md`.)

---

## 🔵 LATER — bigger bets (need a developer, a service, or budget)

- [ ] **Online seva booking + payment + auto-receipts** ⭐ **L** — a proper booking flow with a
  payment gateway (Razorpay/Instamojo/PayU) that issues receipts. Only worth it once volume
  justifies it; until then the QR + phone booking is enough.
- [ ] **80G registration → tax-benefit info** ◐ **L** — if the temple trust obtains an 80G
  certificate, add the registration number, PAN and exact clause to the donations page (a
  developer should do this precisely). *Do not claim any tax benefit before the certificate
  exists.*
- [ ] **Live darshan streaming** ◐ **L** — a YouTube Live embed during Brahmotsavam and major
  festivals lets far-away devotees watch. Only enable it while it's actually streaming — never a
  dead "Live" link.
- [ ] **Simple CMS for the committee** ⭐ **L** — a lightweight editor (Decap/Netlify CMS or
  similar) so the committee updates text, photos, and dates through a friendly screen instead of
  editing files. The biggest lever for long-term self-sufficiency.
- [ ] **Brahmotsavam accommodation & annadanam slots** ◐ **L** — let devotees see/sponsor
  annadanam days and request stay during the jatara.
- [ ] **Installable app (PWA) + offline** ◐ **M/L** — make the site installable and readable
  offline (useful on-site where the signal is weak).
- [ ] **History & archive + virtual tour** ◐ **L** — a "then and now" archive of the temple's
  growth and old photos, and a 360°/virtual tour of the shrine.
- [ ] **Festival reminders (SMS/email)** ◐ **L** — opt-in reminders before big festivals.

---

## 🔧 Technical health (ongoing, keep the site solid)

- [ ] **Deploy reliability** — the GitHub Pages *deploy* step failed transiently twice and needed
  a re-push. If it recurs often, add a GitHub Action with a retry, or move hosting to Netlify /
  Cloudflare Pages (same free tier, more robust deploys). Nothing to do while it's behaving.
- [ ] **Image optimisation** — when real photos arrive, compress them (TinyPNG/Squoosh) and keep
  lazy-loading, so the site stays fast on phones.
- [ ] **Uptime & link monitoring** — a free uptime monitor (UptimeRobot) and an occasional
  broken-link check.
- [ ] **Backups & process** — the GitHub repo *is* the backup and history. Keep the "edit → push"
  process documented so any future volunteer can pick it up.
- [ ] **Keep the clean posture** — zero third-party dependencies, no secrets in the repo, no
  autoplay audio, no dead features. It's a big part of why the site loads fast and feels premium.

---

## What "the best" looks like

A devotee anywhere can, in Telugu on their phone in a few seconds: see today's darshan
timings, know when the next Brahmotsavam is, read the Swamy's story, book a seva or sponsor
annadanam, donate with one scan to a name they can verify, and find their way to the temple —
and the committee can keep all of it current themselves, without a developer. Everything in
this backlog serves that picture.

*Maintainers: tick items as you go, and add new ones freely. When in doubt, prefer the option
that the committee can maintain and that fully works over the one that looks impressive but
rots.*
