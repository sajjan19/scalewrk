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
| `/tech-recruiter-new-york` | City page for New York startups (SEO): how we help, featured roles, New York jobs (location "New York, NY"), engineer block, FAQ. Linked from the footer | Yes | Yes |
| `/partners` | VCs, accelerators, lawyers, fractional CFOs: how we support, why refer, how referrals work, partner form | Yes | Yes |
| `/engineers` | Candidate pitch + profile form (LinkedIn required, current location, how they want to work, where they'd like to work, open to relocating, resume upload or link) | Yes | Yes |
| `/about` | Headline "Meet the team that matches startups and engineers", quick facts strip (Founded 2026, Vancouver, US and Canada, engineers only, fee per hire), founder cards (Punit first) with bio, experience, outside-of-work tags and a "Book a call with …" button, values | Yes | Yes |
| `/contact` | Headline for both sides ("your next hire or your next role"), "Hiring engineers?" / "Looking for your next role?" cards, Calendly embed (`#book`) + contact form | Footer, "Book a call" buttons | Yes |
| `/jobs/<slug>` | One page per job listing: company (described, not named), what you'll do, needs, nice to have, interview steps, summary box + Apply (prefills the engineers form) | Via Jobs page | Real jobs only |
| `/meet` | Event QR-code landing page: "Great meeting you", booking, save contact (vCard) | No | **No** (`noindex`) |
| `/testimonial` | Form for clients, engineers and partners to send a testimonial (type, name, title, company, quote, rating, how to credit, permission checkbox) | Footer ("Leave a testimonial") + Home testimonials section | **No** (`noindex`) |
| `/privacy` | Short privacy note (needs legal review) | Footer | Yes |

Every "Book a call" button links to `/contact#book`. On phones, a sticky "Book a call" bar slides up once you start scrolling and hides at the top of the page (not shown on `/contact`, `/meet`, `/testimonial`; job pages say "Apply for this role", `/jobs` says "Share your profile", `/engineers` says "View all jobs").

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
- **2026-10-12:** Home: the "Our founders have recruited for" logos now scroll left to right in a loop (`.marquee` in globals.css; pauses on hover, still for reduced motion; screen readers get a plain list). New "What we do" section right under the logo strip: three cards (For startups / For engineers / For partners) with bullets, each linking to its page.
