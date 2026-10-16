# Scalewrk website: project notes

Running source of truth for the scalewrk.ai marketing site. Update this file with every change.

_Last updated: 2026-10-10_

---

## 1. Approved plan (summary)

Marketing site for **Scalewrk** (legal name **Scalewrk Talent**, domain **scalewrk.ai**): a tech recruiting firm for growing startups in the US and Canada, seed through Series C+. (Originally US-only; Canada added 2026-10-11 at the user's request.)

**Audiences, in priority order**
1. US startup founders/CEOs checking us out on their phone after an event, a LinkedIn/X post, or outreach. They should get it in 5 seconds and book in one tap.
2. Referral partners: VC platform/talent teams, accelerators, startup lawyers, fractional CFOs.
3. Engineers looking for startup roles.

**Tech:** Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript. All pages are static. Deployed on Vercel. No backend: forms go to a form service (Formspree) and booking goes to Calendly.

---

## 2. Site map

| Route | Purpose | In nav | In sitemap |
|---|---|---|---|
| `/` | Home: hero, founders' experience strip, clients (placeholder), who we work with (stages), how it works (4 steps), roles, latest 3 jobs, why Scalewrk, founder credibility, partner/engineer split, CTA | Logo | Yes |
| `/startups` | For founders: 6-step process, in-house vs. agency vs. Scalewrk comparison, fee-per-hire engagement model (pricing placeholders), FAQ | Yes | Yes |
| `/jobs` | Jobs board with filters (from `src/content/jobs.ts`) + "share your profile" prompt | Yes | Yes |
| `/roles` | Link to /jobs, then 20 role families (9 marked `featured` show on Home) with top 3 common titles, key skills, "what we look for", a "Hire for [role name]" button, "See open jobs for [role name]" (links to /jobs?role=slug) or "Share your profile" when the role has no jobs, and an open jobs count (real jobs only); jump links | Yes | Yes |
| `/mission` | Redirects to `/about#mission` (Mission & Vision now lives on the About page) | No | No |
| `/tech-recruiter-new-york` | City page for New York startups (SEO): how we help, featured roles, New York jobs (location "New York, NY"), engineer block, FAQ. Linked from the footer | Yes | Yes |
| `/partners` | VCs, accelerators, lawyers, fractional CFOs: how we support, why refer, how referrals work, partner form | Yes | Yes |
| `/engineers` | Candidate pitch + profile form (LinkedIn required, current location, how they want to work, where they'd like to work, open to relocating, resume upload or link) | Yes | Yes |
| `/about` | Headline "Meet the team that matches startups and engineers", quick facts strip (Founded 2026, Vancouver, US and Canada, engineers only, fee per hire), founder cards (Punit first) with bio, experience, outside-of-work tags and a "Book a call with …" button, values | Yes | Yes |
| `/book-a-call` | Headline for both sides ("your next hire or your next role"), "Hiring engineers?" / "Looking for your next role?" cards, Calendly embed (`#book`) | "Book a call" buttons | Yes |
| `/contact` | "Get in touch": email, phone, "Prefer to talk? Book a call" link, referral line, contact form | Header, footer | Yes |
| `/jobs/<slug>` | One page per job listing: company (described, not named), what you'll do, needs, nice to have, interview steps, summary box + Apply (prefills the engineers form) | Via Jobs page | Real jobs only |
| `/meet` | Event QR-code landing page: "Great meeting you", booking, save contact (vCard) | No | **No** (`noindex`) |
| `/testimonial` | Form for clients, engineers and partners to send a testimonial (type, name, title, company, quote, rating, how to credit, permission checkbox) | Footer ("Leave a testimonial") + Home testimonials section | **No** (`noindex`) |
| `/privacy` | Short privacy note (needs legal review) | Footer | Yes |

Every "Book a call" button links to `/book-a-call` (`bookingHref` in site.ts). On phones, a sticky "Book a call" bar slides up once you start scrolling and hides at the top of the page (not shown on `/book-a-call`, `/meet`, `/testimonial`; job pages say "Apply for this role", `/jobs` says "Share your profile", `/engineers` says "View all jobs").

---

## 3. Design direction: A, "Signal" (light)

Light, crisp, startup-feel; matches the logo. The logo gradient is used sparingly (mark, one headline word, glows).

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0B1020` | Headlines, primary buttons, dark CTA band, footer |
| `body` | `#475569` | Paragraph text |
| `muted` | `#64748B` | Captions, labels |
| `line` | `#E6E8F0` | Borders |
| `mist` | `#F5F7FB` | Alternating section background |
| `brand` | `#4F46E5` | Links, eyebrows, focus rings |
| `.btn-brand` | violet → blue gradient; on hover it slides to blue → violet | All "Book a call" buttons (calendar icon in front, `CalendarIcon` in `ui.tsx`) and other gradient buttons/badges |
| Hover lift on everything clickable | `.lift` (globals.css): rises 2px with a soft shadow, for buttons, cards and tiles (role cards, job cards, partner/engineer cards, carousel arrows, /meet buttons). `.rise`: same 2px rise without a shadow, for text links, nav links, footer links, pills and chips. Links inside sentences don't move. Off for reduced motion | User asked for everything clickable to pop on hover |
| Secondary buttons | `ink` (near-black) fill, white text | User's choice. Same size and shape as the gradient "Book a call" buttons (e.g. "Roles we hire", "Meet the founders") |
| `violet` → `blue` | `#7A2FF5` → `#0D6EFD` | Logo gradient |

- **Font:** Geist (via `next/font`, self-hosted at build time). Headlines semibold with tight tracking.
- **Logo:** the "S" ribbon mark was redrawn as SVG from the supplied logo (`src/lib/brand.ts`). The wordmark is set in Geist ("**scalewrk** talent"). "(powered by wrangle.ai)" was removed as requested.
- Tokens live in `src/app/globals.css` (`@theme`), so a change there applies site-wide.

---

## 4. Key decisions and why

| Decision | Why |
|---|---|
| All editable content in `src/content/` (`site.ts`, `roles.ts`, `founders.ts`) | Easy to edit without touching layout code |
| `[Square brackets]` in content render as a highlighted placeholder | Placeholders can't slip onto the live site unnoticed |
| Fee-per-hire model; exact terms are placeholders | User confirmed fee per hire; numbers TBD |
| No testimonials, logos, stats, or named partners | Rule: nothing invented. Add real ones when available |
| TikTok etc. appear only as "Punit has recruited for…" | They're founders' past work, not Scalewrk clients |
| Home hero card: title "We track every role from plan to offer", 4 roles with a 4-step progress bar each, "One recruiting partner for every engineering role." at the bottom | Illustrative demo of the process, not real searches. Made clearer after the user asked what it was |
| Bios avoid pronouns | Pronouns not confirmed; safe default |
| Founder photos shown as supplied (no filter) | User asked to keep Mandeep's photo in color. Punit's original is black and white. Photos are 4:3 on About, served at quality 90 (`images.qualities` in `next.config.ts`) |
| Cache Components turned off in `next.config.ts` | Site is fully static; the classic model is simpler to edit |
| Vercel Web Analytics | Cookie-free, so no consent banner needed |
| One social preview image per page (`opengraph-image.tsx`) | Strong, page-specific link cards on LinkedIn, X, and Slack. Generated at build time with Geist fonts from `src/assets/fonts/` |
| `site.url` comes from Vercel's production domain | Link previews and canonical URLs work on scalewrk.vercel.app now and switch to scalewrk.ai automatically once the domain is added |
| "Why Scalewrk" (Home) built on 3 pillars: engineers only with an AI/ML edge, co-founder runs every search, in-person long-term partner | Strongest, hardest-to-copy differentiators. Fee per hire kept as a supporting line because it's standard for contingency recruiting. No speed promises until confirmed |
| No comma before "and" anywhere on the site (e.g. "A, B and C") | User's style preference. Keep it for all new copy |
| Plain, simple English with short sentences | User preference. Easier to read fast on a phone |
| Icons from `lucide-react` (lucide.dev/icons) | More visual and less text. Shared visuals live in `src/components/visuals.tsx` (`IconBadge`, `StepTimeline`, `YesNo`) |
| Nav: hover = purple text and a small lift (no background); current page = purple text + gradient bar (mobile: purple text + dot) | User asked for clearer hover and active states, then for no background box |
| Job listings use placeholder names (Company A, B…) plus a description of what the company does | User asked for a company name on each listing. Placeholders avoid inventing real-looking companies; swap in real names when clients agree |
| 14 EXAMPLE job listings (placeholder names Company A–N), each labeled "Example listing" and `noindex` | User asked to preview the job board. Fictional, not real openings. Switch off with `showExampleJobs = false` in `jobs.ts` once real jobs exist |
| "Our founders have recruited for" strip under the Home hero: brand symbols in brand colors (TikTok, PayPal via Simple Icons) + names; placeholder tile for Sully.ai. Official logo files can replace them (`src/content/companyLogos.ts`) | Originally "no company logos"; changed 2026-10-11 at the user's request. Exact brand typography needs official logo files from each company's press kit | Real past employers from `founders.ts` → `experienceAt`. Framed as the founders' experience, never as Scalewrk clients |
| "Startups we've hired for" section is ON with placeholder boxes (Client 1–5) and a visible "Placeholder: client names coming soon" note | User wanted it live but marked as a placeholder. No invented names. The note disappears once every name is real |
| Every main page headline has its key phrase in the logo gradient (`text-gradient`) | Consistent brand look across pages. Privacy, 404 and job pages stay plain |
| Market: "across the US and Canada" everywhere (hero chip, footer, FAQ, Engineers, /meet, Google descriptions, structured data `areaServed`) | User asked to include Canada (2026-10-11). US startup language and USD stay the same. Phones show a shorter hero chip: "Seed to Series C+ · US and Canada" |
| Testimonials section on Home with 6 EXAMPLE quotes: placeholder names ("[Founder name]"), "Example" tags and an "Example testimonials: real ones coming soon" label. No numbers or specific claims | User asked for examples. Rule: never publish invented testimonials as real. Swap in approved quotes from /testimonial in `src/content/testimonials.ts` |
| Button icons: calendar in front of "Book a call"; arrow after links that take you somewhere (View all jobs, Apply, See the full process); paper plane on form submit buttons; paperclip inside the custom "Choose file" button; plain text for secondary buttons | Keeps the main action recognizable and avoids clutter |
| `/meet` is `noindex` and not in the sitemap | It's for event QR codes, not search |
| Structured data: `EmploymentAgency` (schema.org), area served US | Helps search engines understand the business |
| Contact email `info@scalewrk.ai` | User choice |
| Hero headline "Tech hiring for growing startups." (was "venture-backed") | User choice. Changed 2026-10-11 because some clients are funded by angels, grants or revenue, not VCs. "venture-backed" was replaced everywhere, including Google titles |

### SEO targets
"startup tech recruiter" (Home title/description), "technical recruiter for growing startups" (`/startups` title; originally "venture-backed", changed at the user's request), "AI engineer recruiting for startups" (`/roles` title/description). Titles and descriptions are set per page with `pageMetadata()` in `src/lib/metadata.ts`.

---

## 5. Forms

All forms post via `src/components/Form.tsx` to the endpoints in `src/content/site.ts → forms`. Until an endpoint is set, a form shows "This form isn't connected yet. Email us at info@scalewrk.ai instead."

**To connect (Formspree):** create three forms at formspree.io (Contact, Partners, Engineers), set each to email `info@scalewrk.ai`, and paste each URL (e.g. `https://formspree.io/f/abcdwxyz`) into `site.ts`.

**Resume upload:** the engineers form has a file field (PDF/Word, 10 MB max, checked in the browser) plus an optional resume link. **Formspree only accepts files on paid plans (Personal or higher).** Options:
- Upgrade the Engineers form's Formspree account (simplest), or
- Use a free service that emails attachments (e.g. FormSubmit). This needs testing first, and its endpoint goes in `forms.engineers`.
- To hide the upload field, set `resumeUpload: false` in `site.ts`; LinkedIn and the resume link still work.

Spam: hidden `_gotcha` honeypot field. Each form sends a `_subject` line so emails are easy to filter.

---

## 6. Status

### Done
- [x] Next.js + Tailwind scaffold, brand tokens, Geist font
- [x] SVG logo mark, favicon (`icon.svg`), Apple touch icon
- [x] Header (desktop nav + mobile menu), footer (LinkedIn, X, Instagram, Facebook placeholders), mobile sticky booking bar
- [x] Pages: Home, For Startups, Roles, Partners, For Engineers, About, Contact, /meet, Privacy, 404
- [x] Calendly inline embed component (shows a placeholder box until a link is set)
- [x] Contact, partner, and engineer forms (Formspree-ready)
- [x] SEO: per-page titles, descriptions, canonical URLs, sitemap.xml, robots.txt, JSON-LD
- [x] Social preview images for every page
- [x] vCard download on /meet (`public/scalewrk.vcf`)
- [x] Vercel Web Analytics
- [x] Checked on mobile (375px) and desktop; production build and lint pass
- [x] Founder headshots: large photos on About, small avatars in the Home founder strip
- [x] Live on Vercel: https://scalewrk.vercel.app
- [x] Pushed to GitHub: https://github.com/sajjan19/scalewrk (`main`)

### Still a placeholder / next steps
Tracked in **[TODO.md](TODO.md)**: links and accounts, founder info, pricing, decisions, legal, and after-launch checks.

Calendly and the three form endpoints use dummy `PLACEHOLDER` links. `isSet()` in `site.ts` detects these, so the site shows a friendly fallback (an amber booking box, or a "form not connected yet" message pointing to info@scalewrk.ai) instead of breaking.

---

## 7. Open questions
See the "Decisions" section of [TODO.md](TODO.md): resume uploads, partner referral incentive, and which promises in the copy to keep.

---

## 8. Change log
- **2026-10-10:** Initial build: all pages, components, SEO, social images, forms, and notes. Pushed to GitHub.
- **2026-10-10:** Dummy `PLACEHOLDER` links for Calendly and forms (with `isSet()` fallback); added TODO.md reminders list.
- **2026-10-10:** Added founder headshots in `public/founders/`; larger photo layout on About; avatars on Home.
- **2026-10-10:** Mandeep's photo re-cropped wider at full resolution (1500×1125) and shown in color; black-and-white filter removed.
- **2026-10-10:** Deployed to Vercel (scalewrk.vercel.app). Site URL now follows the Vercel production domain.
- **2026-10-10:** Rewrote Home "Why Scalewrk" around three differentiators, each contrasted with big agencies.
- **2026-10-10:** Added Instagram and Facebook (placeholder links) to the footer Follow section.
- **2026-10-10:** Punit's location set to Vancouver.
- **2026-10-10:** Footer social links now have icons (`src/components/SocialIcons.tsx`). Placeholder phone `(555) 555-0123` added to footer and Contact page (kept out of the vCard and structured data so a fake number isn't saved or indexed).
- **2026-10-10:** All footer links (company, contact, privacy, email, phone, social) turn logo blue (`#0D6EFD`) on hover. (Later changed to the gradient, see below.) Mail and phone icons added to footer and Contact page.
- **2026-10-10:** Widened section headings (max-w-4xl) and intro text (max-w-3xl) so headings fit on one line on desktop. Set in `SectionHeading` / `PageHero` in `src/components/ui.tsx`.
- **2026-10-10:** Every "Book a call" button uses the logo gradient (`.btn-brand` in `globals.css`, `variant="brand"` on `Button`). Other buttons stay ink.
- **2026-10-10:** Site-wide rewrite in simpler English, no comma before "and". Added icons and visuals: stage cards with typical hires, step timelines (Home, Partners), icon role cards, check/cross comparison (Startups), icon lists (Partners, Engineers, About, /meet). Nav hover and active-page styles.
- **2026-10-10:** New photo for Mandeep (`public/founders/mandeep-sajjan.jpg`, 1280×960, color). Tip: when replacing a photo, use a new filename so browsers and Vercel don't show the old cached one.
- **2026-10-10:** Contact form shows "Open to relocating?" when the visitor picks Engineer (`ContactReason.tsx`).
- **2026-10-10:** Job board: `src/content/jobs.ts`, `JobList.tsx` (Role, Location and Work style dropdowns, job count, clear filters, "no matches" message; remote jobs count for every location), `/jobs/[slug]` pages, Apply → engineers form with the job prefilled (`AppliedJob.tsx`). Mobile bottom bar says "Apply for this role" on job pages. Founders' location now "Vancouver, Canada".
- **2026-10-10:** Jobs moved to their own page `/jobs`, added to the menu after For Engineers (menu also highlights Jobs on job detail pages). Added an example Engineering Manager listing. AI/ML icon changed to Sparkles. Tip: if the local preview shows a "Hydration failed" error after edits, restart it; running `npm run build` while it's running makes it stale.
- **2026-10-11:** Process cards (`ProcessCards.tsx`) shared by Home "How it works" (4 per row) and For Startups "How a search works" (3 per row): step number badge on the icon, title beside it, bullets, gradient lines joining cards in the same row (user preferred lines over arrows). For Startups' last step "Stay with you" is tinted with an "Ongoing" tag.
- **2026-10-11:** Testimonials are a carousel (`TestimonialCarousel.tsx`): swipe/scroll, arrows, dots; 1 card on phones, 2 on tablets, 3 on desktop.
- **2026-10-11:** Testimonials: `/testimonial` form page, Home testimonials section (`Testimonials.tsx`, `testimonials.ts`) with labeled examples, footer link.
- **2026-10-11:** Removed all "within one business day" promises (contact and partner thank-you messages, partner referral steps). Now "soon" / "We follow up quickly".
- **2026-10-11:** Partners: "Why refer Scalewrk" is its own section with 6 bullet-point cards (engineering experts, no cost up front, makes you look good, founder-led, good for engineers too, every stage US and Canada). Section backgrounds re-alternated.
- **2026-10-11:** About page: quick facts strip (`site.founded`, `site.basedIn` in `site.ts`; `foundingDate` in structured data), "Book a call with Punit/Mandeep" buttons (per-founder `calendlyUrl` in `founders.ts`, falls back to the shared calendar), "Outside of work" tags (Punit: fitness, Ducky the dog, movies, music festivals, travel, foodie; Mandeep: fitness, Muay Thai, soccer, hiking, photography, sunsets, music festivals, travel, foodie). Custom Muay Thai kick pictogram and soccer ball icons in `src/components/icons.tsx` (drawn from scratch). Tags lift and get a purple outline on hover.
- **2026-10-11:** Mandeep's bio: Apple 2018–2025 (sales, Genius Bar, Apple Business team) and IT consulting for small businesses; "Previously at: Apple" on the About card (`previouslyAt` in `founders.ts`). Apple is NOT on the Home "recruited for" strip, because Mandeep worked there rather than recruiting for it. About "How we work" cards use bullet points.
- **2026-10-11:** Punit's bio and experience filled in: TikTok, PayPal, Sully.ai; background across engineering, sales and go-to-market hiring. Title kept as Co-founder.
- **2026-10-11:** Partners form: choosing "Other" shows a required "What do you do?" box (`PartnerType.tsx`, sent as `partner_type_other`). Home headline gradient now covers "growing startups".
- **2026-10-11:** Contact form: the Message hint changes with "I'm reaching out as a" (founder, investor, engineer or other), set in `ContactReason.tsx`.
- **2026-10-11:** Contact form: choosing "Something else" shows a required "Tell us who you are" box (sent as `reason_other`).
- **2026-10-11:** Added 11 role types (ML researchers, data scientists, QA, embedded, hardware, robotics, game, blockchain, network, solutions/sales engineers, DevRel): 20 total. Home shows the 9 `featured` ones plus "See all 20 roles".
- **2026-10-11:** Engineers form: choosing "Other" as primary role shows a required "What's your role?" box (`PrimaryRole.tsx`, sent as `role_other`).
- **2026-10-11:** Home: "Latest jobs" section with the 3 newest listings (jobs now have a `posted` date; newest first everywhere). Shared `JobCard.tsx`. Home section backgrounds re-alternated. Home "How it works" bullets now use the same wording as the For Startups process.
- **2026-10-11:** Job cards and job pages show a company logo on the left (`CompanyLogo.tsx`). Placeholder tile with the company's letter until `companyLogo` is set in `jobs.ts`.
- **2026-10-10:** Home: founders' experience strip (TikTok + placeholders) and a hidden "Startups we've hired for" section (`Credibility.tsx`, `clients.ts`).
- **2026-10-10:** Roles page jump bar is now `RoleJumpBar.tsx`: purple chips, faded edges and arrows when there's more to scroll, and the chip for the role on screen is highlighted. Nav order changed to For Startups, For Engineers, Roles, Partners, About.
- **2026-10-10:** Footer link hover changed from solid blue to the logo gradient (text and icons): `.link-gradient` in `globals.css`, with `#brand-gradient` defined in `Footer.tsx`.
- **2026-10-11:** Roles cards: top 3 titles, key skills tags, "Hire for [role name]" + "See open jobs for [role name]" buttons, open jobs count (real jobs only). Jobs page reads `?role=` to preselect the Role filter.
- **2026-10-11:** Bottom CTA band default copy: "Ready to grow your team?" / "Tell us what you're building and we'll help you find the engineers to build it."
- **2026-10-11:** About page CTA band body: "Talk with a Scalewrk co-founder."
- **2026-10-11:** For Startups comparison section eyebrow changed from "Why a specialist" to "Why Scalewrk".
- **2026-10-11:** Added the New York city page `/tech-recruiter-new-york` (in sitemap, footer link, own OG image). Jobs page now also reads `?location=` to preselect the Location filter. Only add more city pages where Scalewrk really works, with copy specific to that city.
- **2026-10-11:** New York page hero is a full-width photo with white text on top (`public/places/new-york.jpg`, aerial view of Manhattan and Central Park by Jermaine Ee on Unsplash (third photo, chosen by the user; earlier ones were by Luca Bravo and Michael Discenza), Unsplash License; credit link in the corner). A dark layer keeps text readable (even on phones, darker on the left on bigger screens). `.text-gradient-light` is a lighter gradient for text on dark photos. The earlier skyline drawing was removed.
- **2026-10-12:** Titles: Punit Singh is "Co-founder and CEO"; Mandeep Sajjan is "Co-founder" (for now). Briefly changed to Founder and CEO / Sales and Technical Recruiter with all co-founder wording removed, then reverted at the user's request. Final titles are still to be decided (see TODO.md). If Mandeep stops being a co-founder, commit 9c9151f shows every spot that needs new wording.
- **2026-10-12:** Home: the "Our founders have recruited for" logos now scroll right to left in a loop (60s per loop; slowed down and reversed at the user's request) (`.marquee` in globals.css; pauses on hover, still for reduced motion; screen readers get a plain list). New "What we do" section right under the hero (above the logo strip): three cards (For startups / For engineers / For partners) with bullets, each linking to its page.
- **2026-10-12:** Home order is now hero → What we do → logo strip → clients. The logo strip lost its "Our founders have recruited for" label on the left (user's request) and now has a small caption under the logos: "Where our team has recruited", so the past employers don't read as clients.
- **2026-10-12:** Added `/mission` (Mission and vision page; in sitemap, own OG image, footer link, button in the About hero). Logo strip caption: "Where our team has recruited".
- **2026-10-12:** Top menu: "About" now has a dropdown (desktop, opens on hover or keyboard focus) with "Our Team" and "Mission & Vision"; on phones Mission & Vision shows as a sub-link under About. Set in `nav` in `src/content/site.ts` (`children`). Page renamed "Mission & Vision" everywhere.
- **2026-10-12:** "About" in the top menu no longer links to a page: clicking or tapping it opens the dropdown (Our Team, Mission & Vision), so it works on touchscreens. It still opens on hover with a mouse and closes on outside click or Escape. On phones, About is a small label with both links under it.
- **2026-10-12:** Arrows: on hover, the arrow in a link or button nudges 3px right (`.arrow` in globals.css; the `Arrow` icon has the class). Text links with arrows (`.nudge`) slide right as a whole, text and arrow together (back links use `.nudge-back` and slide left); all "→" characters in links became the `Arrow` icon.
- **2026-10-12:** Buttons with an arrow (`.btn:has(.arrow)`) also slide right as a whole on hover instead of lifting; buttons without an arrow still lift. Cards with arrows are unchanged.
- **2026-10-12:** Mandeep's bio says "technical support" instead of "Genius Bar".
- **2026-10-12:** Mandeep's bio first line reworded: "Mandeep worked at Apple from 2018 to 2025 in sales, technical support and with the Apple Business team. Mandeep also helps small businesses grow through IT consulting."
- **2026-10-12:** Mandeep's bio second line: "Mandeep has spent years helping all kinds of people with their technology, from everyday users to business owners. That helps Mandeep understand what founders need and match engineers with startups where they can thrive."
- **2026-10-12:** Home: new "Founder-led" block right after "What we do" (audit item 4): Punit's track record, both founders with photo/name/title, "Meet the team" button and the scrolling logos with the "Where our team has recruited" caption inside it. The old founder block near the bottom was removed (merged). `FounderExperienceStrip` became `LogoMarquee` in `Credibility.tsx`.
- **2026-10-12:** Audit items 5 and 8.
  - Home is shorter: Hero → What we do → Founder-led (with logos) → Clients (when real) → How it works → Why Scalewrk → Roles → Latest jobs → Testimonials → CTA band. Removed the "Who we work with" stages section and the duplicate Partners/Engineers cards at the bottom.
  - Top menu grouped by audience: For Startups ▾ (How we work, Roles we hire, Pricing), For Engineers ▾ (How we work, Open jobs; "Share your profile" was removed because it's the same page as How we work), Partners, About ▾ (Our Team, Mission & Vision), Book a call. Set in `nav` in `site.ts`. The footer has its own full list (`footerLinks` in `Footer.tsx`).
- **2026-10-12:** Engineers split into two pages:
  - `/engineers` ("How we work"): hero with Share your profile + See open jobs, a 4-step "From profile to offer" process, "What you can count on" cards (+ jobs shortcut), and an engineer CTA band.
  - `/share-profile`: just the profile form, with "what happens next" notes. `?job=slug` still shows "Applying for…".
  - Every old `/engineers#apply` link now points to `/share-profile`. Menu: For Engineers ▾ (How we work, Open jobs, Share your profile). Footer and sitemap include it. Phone bar: "Share your profile" on /engineers and /jobs; hidden on /share-profile.
  - `CtaBand` takes an optional `action` ({href, label}) for a non-booking button.
- **2026-10-12:** Undid audit item 4 at the user's request: the "Founder-led" block is gone. The logo strip (`FounderExperienceStrip`, with the "Where our team has recruited" caption) is back right after "What we do", and the "Run by the founders" block is back near the bottom (after Testimonials, before the CTA band). Home order: Hero → What we do → logo strip → Clients → How it works → Why Scalewrk → Roles → Latest jobs → Testimonials → Founders → CTA band.
- **2026-10-12:** "Where our team has recruited" moved above the scrolling logos (slightly bigger, as a label).
- **2026-10-12:** Home: the "Run by the founders" card moved up to right after "Why Scalewrk" (no top padding, so it sits under those cards). Order: Hero → What we do → logo strip → Clients → How it works → Why Scalewrk → Founders → Roles → Latest jobs → Testimonials → CTA band.
- **2026-10-12:** The founder card is now part of the "Why Scalewrk" section: a compact row under "No hire, no fee" (photos, "Run by the founders", Punit's line, Meet the founders), same card style as the rest of that section.
- **2026-10-12:** Founders now have their own Home section (same heading style as Roles): "Our founders" / "Who you'll work with" / Punit's line as the intro, "Meet the founders →" on the right, and two cards (photo, name, title, "Recruited for…" or "Previously at…"). It sits after "Why Scalewrk". The compact row inside Why Scalewrk was removed. Section colors re-alternated: Founders grey, Roles white, Latest jobs grey, Testimonials white.
- **2026-10-12:** Home founder cards are clickable: each opens that person's card on the About page (`/about#punit-singh`, `/about#mandeep-sajjan`; `founderId()` in founders.ts).
- **2026-10-12:** TikTok in the logo strip now uses the official logo image the user provided (`public/logos/tiktok.png`).
- **2026-10-12:** PayPal in the logo strip now uses the official full-color logo (`public/logos/paypal.svg`, downloaded from Wikimedia Commons with the user's OK).
- **2026-10-12:** The scrolling logos now run the full width of the screen (outside the page container); the label stays centered above them.
- **2026-10-12:** Sully.ai in the logo strip uses the blue sully.ai logo the user provided (`public/logos/sully.png`, trimmed). Their current site uses a newer black "Sully" wordmark; the user chose the older blue one. All three strip logos are now real logo files.
- **2026-10-12:** TikTok and PayPal logos replaced with the SVG files the user saved (`public/logos/tiktok.svg`, `public/logos/paypal.svg`); the old TikTok PNG was removed.
- **2026-10-12:** Home "Why Scalewrk" heading: "Recruiting that knows engineering" / "Engineers only. Startups only. Every search run by a founder."
- **2026-10-12:** Final team titles: Punit Singh "Founder & Principal Recruiter", Mandeep Sajjan "Founding Recruiter" (not a co-founder). All "co-founder" wording updated:
  - Home: "The same people on every search", "Every search run by Punit or Mandeep.", "Our founder Punit Singh…", team section eyebrow "Our team" and link "Meet the team".
  - Startups comparison "Who runs your search": "Punit or Mandeep, start to finish"; Contact "a call with the Scalewrk team"; About eyebrow "Our team", meta description names Punit as founder, CTA "Talk with the Scalewrk team."; Partners "talk to Punit or Mandeep directly"; New York "Punit or Mandeep runs it" / "Our team is based in Vancouver."
  - JSON-LD founder: Punit only.
- **2026-10-12:** About founder cards: title on its own line in purple; location below it as a small grey pill with a pin icon.
- **2026-10-12:** About founder cards: location is plain text with a pin icon (no grey pill).
- **2026-10-12:** For Startups comparison table label is now "How we compare" (anchor `#compare`). Home "Why Scalewrk" ends with a "See how we compare →" link to it, so the two sections don't repeat each other.
- **2026-10-12:** Comparison intro changed to "What you get with each way to hire engineers." (avoids repeating "compare").
- **2026-10-12:** Comparison intro is now "Your three hiring options at a glance."
- **2026-10-12:** Comparison table has vertical lines between the columns (In-house only, Big agency, Scalewrk).
- **2026-10-12:** Phone menu: while it is open the page behind can't scroll; the menu itself scrolls (fills the screen under the header). The phone "Book a call" bar hides while the menu is open.
- **2026-10-14:** Dropped the Partners audience for now (user's decision: stick to For Startups and For Engineers). Removed `/partners` (page, share image, `PartnerType.tsx`, `forms.partners`), the menu/footer/sitemap links, the Home "For partners" card (What we do is now 2 cards), the /meet partner card (its engineer card now goes to /share-profile), the 2 example partner testimonials and the "Partner" testimonial type. Contact now says "Know a founder who's hiring? Introduce us at info@scalewrk.ai." Restore from commit 2bd2c24 if needed (see TODO "Future").
- **2026-10-14:** Audience colors: startups are blue, engineers are purple. `.theme-startup` / `.theme-engineer` (globals.css) switch the brand colors, gradient text and gradient buttons inside them.
  - Blue: /startups, /roles, /tech-recruiter-new-york, Home How it works, Why Scalewrk, Roles and the startup "What we do" card, the For Startups menu group.
  - Purple: /engineers, /share-profile, /jobs, job pages, Home Latest jobs, the engineer "What we do" card, the hero "Engineer? Find your next startup" link, the For Engineers menu group, the phone bar's engineer actions, and the engineer bits on Roles and New York.
  - Neutral (logo colors): header, footer, Home hero, founders, testimonials, About, Mission, Contact.
- **2026-10-14:** Clients section renamed "Recent placements" and now real: Equall (Founding Engineer). Cards show the company and the role filled (`role` in clients.ts). Placeholder Client 1–5 removed.
- **2026-10-14:** Paraform added to the "Where our team has recruited" strip via `alsoRecruitedFor` in companyLogos.ts (team-level, not in a founder bio). No logo yet, so it shows as text; companies without a logo no longer get the dashed placeholder tile.
- **2026-10-14:** Paraform logo added to the strip (`public/logos/paraform.png`, from the user, trimmed).
- **2026-10-14:** Equall logo (square icon, `public/clients/equall.png`) shows next to "Equall / Founding Engineer" in Recent placements. Client cards are now a row: icon, then name and role.
- **2026-10-14:** Recent placements cards link to the company's website in a new tab (`url` in clients.ts). Equall → https://equall.com/.
- **2026-10-14:** Recent placements cards show tags under the role: stage, industry, location (`stage`/`industry`/`location` in clients.ts). Equall: Seed · Legal AI / LegalTech · [Location] (placeholder until confirmed).
- **2026-10-14:** Equall location tag: "On-site, New York".
- **2026-10-14:** Recent placements card redesigned: logo + name + website domain with an ↗ icon; a tinted "Role filled" box; stage, industry and location as icon facts (rocket, scales, pin).
- **2026-10-14:** Recent placements: only the company row (logo, name, domain, ↗) links to their website; the rest of the card is not clickable.
- **2026-10-14:** Placement fact icons are fixed per kind of fact (rocket = stage, building = industry, pin = location), so they never change with the value. The legal scales icon was replaced with a generic building.
- **2026-10-14:** Contact "what to bring" cards are bullet lists (5 points each): startups card blue, engineers card purple.
- **2026-10-14:** Home: every "see more" link now sits top right next to its section heading (See the full process, See how we compare, Meet the team, See all roles, View all jobs). On phones they sit under the heading.
- **2026-10-14 (branch `preview/tech-and-sales`, not on main):** Preview of "Option A: tech and go-to-market". Adds 6 sales & GTM roles (`group: "gtm"` in roles.ts: Account Executives, SDRs, Customer Success, RevOps, Growth & Marketing, Sales Leaders; AE, SDR and Sales Leaders featured on Home). Roles page groups roles under "Engineering" and "Sales & go-to-market". "For Engineers" became "For Candidates" (menu, footer, page labels). Copy updated from "engineers only" to "tech and sales" across Home, Startups, About, Mission, Contact, New York, Meet, Privacy, CTA band and SEO text. Contact form option "Candidate (engineering or sales)". 2 example sales jobs (Founding AE, Founding SDR). URLs unchanged (/engineers still the candidates page).
- **2026-10-14:** Share your profile form: removed the "Or link to your resume" field.
- **2026-10-14:** Roles page cut down: compact cards, 2 per row on desktop, showing the name, one-line summary, key skills, "Hire for [role]" and a "See open jobs" / "Share your profile" link. Common titles and "what we look for" are no longer shown (still in roles.ts).
- **2026-10-14:** Share your profile: "Primary role" dropdown replaced with a text box, "What role are you looking for?" (sent as `role`), with role names suggested as you type (`suggestions` on `Field`).
- **2026-10-14 (preview branch):** Home hero card: "Platform Engineer" row replaced with "Founding Account Executive" (Offer out), so the card shows a sales role.
- **2026-10-14:** All pricing removed from the site (user's decision: pricing is discussed on the call). Removed the For Startups Pricing section and its menu link, "No hire, no fee" bars (Home, New York), "You only pay when you hire" (Home hero, /meet, meta descriptions), the "Pay only when you hire" comparison row and the About "Pricing" fact. The "What does it cost?" FAQs now say: "It depends on the role. Book a call and we'll walk you through pricing and answer any other questions."
- **2026-10-14:** The tech and sales version (branch `preview/tech-and-sales`) was merged into main and is now the live site: engineering plus sales & GTM roles, "For Candidates" menu, tech-and-sales copy.
- **2026-10-14:** Jobs hidden for now (no real jobs yet). `showExampleJobs = false` and a new `hasOpenJobs` flag in jobs.ts. While it's false: no "Open jobs" in the menu, no Jobs footer link, /jobs out of the sitemap and noindexed, no Home "Latest jobs", no Roles "Looking for a job?" strip, no "See open jobs" button or jobs tile on For Candidates, no New York jobs section or button; Roles cards show "Share your profile". Adding a real job (`example: false`) brings all of it back in the same design.
- **2026-10-14:** Home headline: "From first hire to **full scale**." with "We help growing startups hire engineers and sales teams at every stage." Also the site tagline and the Home share image. Both "first hire" and "full scale" use the gradient.
- **2026-10-14:** For Startups hero intro: "From your first engineer to your first sales team, we run the search so you can run the company."
- **2026-10-14:** Contact "what to bring" cards now have a small label on top: "For startups" (blue) and "For candidates" (purple, person icon instead of code icon).
- **2026-10-14:** Every `</>` (Code2) icon swapped for a person icon (UserRound): Home "What we do" candidates card, About "Focus" fact, Meet page. Audience labels capitalized to match the menu: "For Startups" / "For Candidates".
- **2026-10-14:** Contact card intros: "What helps us get started:" (startups) and "What helps us find your fit:" (candidates).
- **2026-10-14:** Audience icons are consistent: startups = rocket, candidates = person (Home "What we do" and Contact cards).
- **2026-10-14:** Contact "what to bring" cards now use the same design as the Home "What we do" cards: big icon on top, label, title, then check-mark bullets.
- **2026-10-14:** Roles page turned off for now (team is small): `showRolesPage = false` in roles.ts. /roles shows "not found" and is noindexed; no Roles links in the menu, footer or sitemap; the Home hero's second button is now "How we work" (/startups). Home and New York still show the 12 featured roles as plain tiles (`RoleTiles.tsx`) so visitors see what kinds of roles we hire. Flip the flag to bring the page and all its links back.
- **2026-10-14:** "Roles we hire" section hidden on Home and New York too (`showRolePreview = false` in roles.ts). Section backgrounds after it adjust so grey and white still alternate. Flip the flag to bring it back.
- **2026-10-14:** Home "What we do" ends with a short "Roles we often hire:" tag row (8 roles, not clickable). Edit the list in `quickRoles` in roles.ts.
- **2026-10-14:** Home hero candidate link: "Looking for a job? See how we help candidates →" (to /engineers).
- **2026-10-14:** Process cards (Home How it works, For Startups, For Candidates) now match the other cards: soft tinted icon badge on top (with the step number), title below in the same size as the Why Scalewrk cards. Connecting lines moved to the icon's new center.
- **2026-10-14:** Process cards: title now sits beside the soft icon badge (not under it).
- **2026-10-14:** Every icon card now puts the title beside the icon (same as the process cards): Home What we do and Why Scalewrk, Contact cards, New York How we help, About How we work, Mission & Vision (mission/vision labels and the 4 beliefs).
- **2026-10-14:** Home headline: "Built to **Scale**. Powered by **Talent**." (gradient on Scale and Talent) with "AI-powered sourcing. Human expertise. Exceptional talent, delivered faster." Also the site tagline and Home share image.
- **2026-10-14:** Home headline shows one sentence per line ("Built to Scale." / "Powered by Talent."), never wrapping on tablet and desktop; desktop size is now text-6xl so "Powered by Talent." fits beside the hero card.
- **2026-10-14:** "Roles we often hire" tag row hidden (`showQuickRoles = false` in roles.ts).
- **2026-10-14:** Home hero buttons: "Book a call" (startups) and "Find your next role →" (candidates, to /engineers). Removed the small "Looking for a job?" line.
- **2026-10-14:** Home hero "progress tracker" card ("We track every role from plan to offer") hidden for now (`showHeroTracker = false` in page.tsx); the hero text now takes the full width.
- **2026-10-14:** New Home hero card in place of the tracker: "How we find your next hire" with 3 steps (AI-powered sourcing, Human expertise, Exceptional talent) and both founder photos with "Every search run by Punit or Mandeep." (`heroSteps` in page.tsx).
- **2026-10-14:** Home hero illustration (`HeroNetwork.tsx`) in place of the tracker card: the Scalewrk logo in the middle linked by flowing gradient lines to startups (blue rockets) and candidates (purple people) in a ring. Decorative only; motion is off for reduced-motion users.
- **2026-10-14:** Hero illustration now in an "AI network" style (dark panel, faint grid, turning rings, glowing lines, light pulses, glass pills with role names and funding stages). Candidate lines are brighter purple with dashes and pulses flowing out from the S, so the S-to-candidate connection stands out; startup pulses flow into the S.
- **2026-10-14:** Hero illustration back to the light style (no dark panel), keeping the role/stage pills and the strong S-to-candidate connection. Background dots are now small four-point stars that twinkle, alternating purple and blue; candidate pulses are purple (out from the S), startup pulses blue (into the S).
- **2026-10-14:** Hero illustration: spots at different distances with small angle nudges (lines of different lengths), a tilted oval orbit instead of a circle, and the stars back to tiny dots in a few sizes (still twinkling purple/blue).
- **2026-10-14:** Hero illustration has an Apple TV-style hover: it tilts in 3D toward the mouse and its layers shift by different amounts (glow, lines, pills, the S). Off for reduced motion; no effect on touch screens.
- **2026-10-14:** Hero illustration: removed the white rounded tile behind the S; the S logo floats on its own with a soft glow, and lines/pulses start a little away from the middle (`GAP`) so they don't run under it.
- **2026-10-14:** Hero illustration: a soft white circle behind the S that fades into the background, so the S blends in.
- **2026-10-14:** Hero illustration: macOS Dock-style magnify. Pills and the S grow as the mouse gets close (closest grows most, up to 45%, reach 140px), easing back on leave. Works with the tilt; off for reduced motion.
- **2026-10-14:** Hero illustration: gentler magnify (up to 18%). Pills now: Full-Stack Engineer (top), AI Engineer, Founding AE, SDR; stages Seed, Series A, Series B, Series E.
- **2026-10-15:** Menu: a group with only one page shows as a plain link. "For Startups" (only How we work while Roles is hidden) is now a direct link to /startups, still blue. It turns back into a dropdown automatically when the Roles page comes back.
- **2026-10-15:** Mobile polish for the Home page: sections use less vertical space on phones (py-12, all pages), the hero headline scales with screen width so "Built to Scale." and "Powered by Talent." each stay on one line, tighter hero spacing, a slightly smaller illustration, and tighter card padding on phones.
- **2026-10-15:** On phones, the numbered process cards (Home, For Startups, For Candidates) and the Home "Why Scalewrk" cards are swipeable rows (about 80% wide so the next card peeks in) instead of a tall stack. Desktop is unchanged.
- **2026-10-15:** Home hero buttons sit side by side on phones too (sharing the width); the candidate button reads "Find a role" on phones and "Find your next role" on bigger screens.


- Home hero: the network illustration is hidden on phones (below 640px). The pills crowded at that size and the tilt and magnify need a mouse. Tablets and desktop still show it.

- Home "Why Scalewrk": first card now reads "We only hire engineers and salespeople, the people who build and sell your product." (removed the AI and machine learning line).
- Home "Why Scalewrk": third card now reads "We get to know you and your team, then stay with you as you grow." (no longer says "in person").
- Home "Why Scalewrk": each card is now 2 check bullets (CheckList) instead of a sentence. Dropped "Every new hire gets faster" (speed claim).
- Why Scalewrk first card, second bullet: "We know these roles inside and out".
- Why Scalewrk middle card footnote shortened to "Big agencies often pass you to a junior." so all three fit on one line.
- Why Scalewrk third card bullets: "We get to know you, your team and how you work" / "We stay with you as you grow, hire after hire".
- Why Scalewrk third card bullets changed to "We build a real relationship with your team" / "We grow with you from first hire to full team".
- Hero network: removed the grey dashed orbit behind the pills.
- Hero network: "Series B" pill changed to "Series C".
- Hero network roles: Full-Stack Engineer (top), AI Engineer (right), Founding Engineer (bottom), Head of Sales (left). Replaced SDR and Founding AE.
- Mission page: mission and vision cards restyled to match the site (rounded-2xl, ring, dark title, normal body text instead of big bold text). "What we believe" uses CheckList bullets like the rest of the site.
- Mission wording: "Help growing startups hire great engineers and salespeople. Help those people find the startup where they can do their best work." (also the page description and the New York page line).
- Mission page card titles: "Mission" and "Vision".
- Why Scalewrk card titles shortened to fit one line on desktop: "Tech and sales only", "Hands-on from day one", "Here for the long run".
- Nav: For Startups is a dropdown again (How we work, Book a call), mirroring For Candidates (How we work, Share your profile).
- Nav: For Startups and For Candidates are both plain links (no dropdowns). Share your profile is reached from the For Candidates page.
- Nav: "Contact" added to the desktop menu (after About). It is now part of navItems in site.ts, so the phone menu uses the same entry.
- Split Contact in two: `/book-a-call` has the headline, what-to-bring cards and the calendar; `/contact` is just "Get in touch" (email, phone, form). All "Book a call" buttons point to `/book-a-call`.
- Merged Mission & Vision into the About page (section `#mission` after the quick facts, before the team). `/mission` redirects there (next.config.ts). About is a plain menu link now; footer "Mission & Vision" links to `/about#mission`. The old "What we believe" cards were dropped since they repeated About's "What founders can count on" (which now uses CheckList bullets).
- Home on phones: role/stage pills scroll by under the hero buttons (HeroPillsMarquee); "Where our team has recruited" strip moved right under the hero (desktop keeps it after What we do); What we do cards show 2 bullets; team rows are smaller (56px photo, no "Recruited for" line); swipe rows (How it works, Why Scalewrk) have dots underneath (ScrollDots, also on For Startups and For Candidates process cards).
- Home: "Where our team has recruited" strip now sits right under the hero on every screen. Removed the hero pills row (phones) and the 2-bullet What we do cards. Team rows are compact on every screen (56px photo, name and title only).
- About: sections alternate white and grey (facts grey, Mission & Vision white, team grey with white cards, How we work white).
- Scroll animation: inside every <Section> (all pages), headings and cards fade and slide up as they scroll into view and reverse when scrolling back up. Pure CSS scroll-driven animation (`.reveal-group` in globals.css, added by Section in ui.tsx). Off for people who turn off motion; browsers without support just show everything. Heroes, the logo strip and the CTA band do not animate.
- Scroll animation made faster: finishes within the first 40% of an item entering the screen (was 90%), 20px slide (was 28px).
- Scroll animation set in between: finishes within 65% of an item entering the screen, 24px slide.
- Phone menu redesigned like apple.com: fills the screen below the header, big bold links (28px) that drop in one after another, two-line icon that turns into an X, Escape closes it. Header blur is off while it is open (blur would trap the fixed menu inside the header).
- Phone menu: three-line icon (middle line fades, the others form an X); links spread evenly down the screen with Book a call at the bottom.
- Phone menu closing animation: links fade up, then the sheet folds back into the header (about 0.3s). Plays for the X button and Escape; tapping a link closes right away since the page changes.
- Scroll animation is now Apple-style (replaces the scroll-linked CSS version): `ScrollReveal.tsx` (in the layout) watches every block and card inside a <Section>; when one comes on screen it fades in and glides up 48px over about 1s, cards in a row one after another (90ms apart). Plays again when you scroll back above it and down again. Off for reduced motion; nothing is hidden without JavaScript.
- Scroll animation fix: cards inside a sideways-swiping row (phones) fade in together with the row and do not rise (the row was cutting off their tops), and swiping no longer hides and replays them.
- Scroll animation a little faster: 0.7s (was 1s), cards 70ms apart (was 90ms).
- Testimonial page: removed the heart icon above the heading.
- Cards on white sections are now light grey (mist); on grey sections they stay white. Done in one CSS rule (`.tone-white` in globals.css, class added by <Section> and the Recent placements strip), so new cards follow it automatically.
- Logo strip redesigned: small uppercase label "Where our team has recruited" on the left with a divider line, logos scrolling beside it (phones: label centered above). Tighter padding.
- Recent placements: same layout as the logo strip (small uppercase label on the left with a divider, card beside it; phones: label centered above).
- Logo strip and Recent placements: back to labels centered above (logos full width, card centered), both in the small uppercase style. Side-divider layout removed.
- Mandeep "Outside of work": added Brazilian Jiu-Jitsu (custom belt icon `JiuJitsuBelt` in icons.tsx), after Muay Thai.
- Mandeep interests: Brazilian Jiu-Jitsu now uses the Muay Thai fighter icon (belt icon removed); added "Vibe coding" (code icon).
- Recent placements card redesigned: logo, name with small arrow and domain on the left, "Placed" tag on the right; divider; "Role filled" label with the role as a big headline; stage, industry and location as small chips. Removed the purple role box.
- Mandeep bio: "helps small businesses in Canada and the US grow through IT consulting".
- Hero network: replaced the Dock-style magnify with an Apple TV-style focus on each pill and the S. The one under the mouse grows 15%, tilts toward the pointer, lifts with a deeper shadow and gets a soft brand-tinted shine that follows the mouse; it springs back when the mouse leaves (.net-focus / .net-glare in globals.css). The S layer lets the mouse through so pills under it can be hovered. The whole scene still tilts a little.
- Hero network: removed the whole-scene tilt and layer parallax. Only the per-item Apple TV focus remains.
- Hero pill shine made stronger (38% brand tint under the mouse, fading out).
- Hero network: back to the earlier animation (whole-scene Apple TV tilt with layer parallax + Dock-style magnify). The per-pill focus and shine were removed.
- Recent placements card: removed the "Placed" tag.
- Secondary buttons are now outlined and see-through (2px border, dark text; border darkens and a faint fill on hover) instead of solid black. Used for "Find your next role" (Home), "View all jobs" (For Candidates) and "Share your profile" (New York).
- Secondary button outline is now solid black.
- Secondary (outline) buttons: on hover the black outline turns into the purple-to-blue gradient (.btn-outline in globals.css).
- Buttons with an arrow now lift on hover like every other button (they used to slide right); the arrow inside still nudges right.
- Outline buttons: gradient hover removed; on hover they now fill black with white text.
- Apple TV remote-style buttons site-wide: every `.btn` (all Button components, header and phone-menu Book a call, /meet, form submit buttons, JobList) tilts toward the mouse, grows 6% and gets a soft white shine that follows the pointer; springs back on leave. TvButtons.tsx (in the layout) + .btn / .tv-on in globals.css. Mouse only; off for reduced motion.
- Hero network is back on phones (max 340px wide under the buttons). Pills use 10px text below 360px wide, and Series A / Founding Engineer were spread apart a little so nothing overlaps down to 320px.
- Recent placements card lifts on hover like the other cards (lift + brand border).
- Home hero: star trail that follows the mouse (inspired by lookdeep.health, our own code): HeroStarTrail.tsx draws a hidden grid of tiny dots on a canvas behind the hero; dots near the mouse light up purple to blue with a soft tail behind the pointer and faint rings while moving; fades out when the mouse leaves. Mouse only, off for reduced motion, idle when nothing moves.
- Hero illustration: removed its hover tilt and Dock magnify (and their CSS).
- Star trail: fewer stars (28px spacing, smaller glow, shorter tail, fewer and fainter rings).
- Star trail removed; hero illustration back to its tilt and Dock magnify hover.
- New city pages: `/tech-recruiter-san-francisco` (same Pacific time zone angle) and `/tech-recruiter-vancouver` (home city, can meet in person, hiring across Canada and the US). All three city pages now share `CityPage.tsx`; each page only holds its own copy. Linked in the footer and sitemap, each has its own OG image. SF and Vancouver have no hero photo yet (dark brand background).
- City page photos: San Francisco = Golden Gate Bridge by Maarten van den Heuvel, Vancouver = downtown and False Creek by Adrian Yu (both Unsplash License, credited in the hero corner). Files in public/places/.
- City pages: photo credit in the hero corner removed (Unsplash License does not require it); photographer names stay in the code.
- City pages: headings are back to "Tech recruiting for <city> startups." The line under each heading is now unique to the city (NY: fintech in Midtown to AI in Brooklyn; SF: where the next big AI startups are born; Vancouver: between the mountains and the ocean, gaming to climate tech).
- New city pages: `/tech-recruiter-toronto` (Canada's biggest tech hub, Bay Street fintech, calls planned around Eastern time) and `/tech-recruiter-seattle` (cloud giants and startups, team is just up the road in Vancouver on the same Pacific time, engineers moving from big tech). Footer, sitemap and OG images added.
- Toronto photo: skyline and CN Tower at sunset by Berkay Gumustekin; Seattle photo: Space Needle with Mount Rainier by Thom Milkovic (Unsplash License, public/places/).
- City pages: scroll parallax on the hero. HeroScroll.tsx sets --hero-p (0 to 1 as the hero scrolls away); the photo drifts down (up to 30%) and zooms from 1.05 to 1.15, the heading and text fade out and rise 60px. Off for reduced motion.
- New city pages: Montreal (AI research and creative tech, French/English language needs, Eastern time), Los Angeles (Silicon Beach, tech with media and entertainment, Pacific time), Las Vegas (more than the Strip, gaming tech to hospitality and fintech, relocation). City list now lives in src/content/cities.ts; the footer has its own "Cities" column and the sitemap reads the same list.
- Photos: Montreal (dusk skyline, Marc-Olivier Jodoin), Los Angeles (palms and downtown, Cedric Letsch), Las Vegas (Strip and Bellagio fountains, Yves Scheuber). Unsplash License, public/places/.
- New city pages: Austin (live music and fast-growing tech, relocation, Central time), Boston (universities, biotech and robotics, research backgrounds), Chicago (LaSalle Street trading to logistics and health tech, Central time), New Jersey (next to New York; fintech, pharma, Jersey City/Newark/Princeton; commuters). Footer city list is now two short columns.
- Photos: Austin (Lady Bird Lake, MJ Tangonan), Boston (Charles River, Jacob Licht), Chicago (aerial with Lake Michigan, Pedro Lastra), New Jersey (Jersey City railroad terminal, Gautam Krishnan). Unsplash License, public/places/.
- Home "By the numbers" (StatsSection.tsx, numbers in src/content/stats.ts): placements made, average days to signed offer, % still in role after a year, % of shortlisted candidates who get an offer. Empty values show as amber placeholders in the local preview only; the live site shows only filled-in numbers (nothing yet). Sits under Recent placements.
- By the numbers: each number counts up from 0 when it scrolls into view (CountUp.tsx; replays when you scroll back above it and down again; off for reduced motion). stats.ts has made-up `example` numbers (24, 28 days, 95%, 40%) shown ONLY in the local preview with an "Example" tag; the live site still shows only real `value`s (none yet).
- Swipe rows (How it works, Why Scalewrk, process cards on For Startups and For Candidates) now have the same controls as the testimonials carousel: round arrow buttons on each side, gradient active dot. Active card is tracked by position, arrows grey out at the ends.
- Carousel arrows and dots (testimonials and swipe rows) now glide with a custom ease-in-out scroll (~0.55s, src/lib/glide.ts) instead of the browser's smooth scroll; snapping pauses during the glide.
