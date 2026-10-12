# To-do reminders

Things still to fill in or decide. Everything below currently has a dummy value or placeholder on the site, so nothing is broken in the meantime.

**Tip:** search the code for `PLACEHOLDER` to find every spot. On the site, placeholder text shows as an amber highlighted box.

When you finish an item, tick it here (`[x]`) and update PROJECT_NOTES.md.

---

## Before launch (links and accounts)

- [ ] **Calendly link**: create the intro-call event, then paste its link into `src/content/site.ts` → `calendlyUrl`. Until then, Contact and /meet show an amber box with an "Email us to book" link.
- [ ] **Formspree: Contact form**: create the form at formspree.io, send it to info@scalewrk.ai, and paste the URL into `site.ts` → `forms.contact`.
- [ ] **Formspree: Partners form**: same steps, `forms.partners`.
- [ ] **Formspree: Testimonials form**: same steps, `forms.testimonials`.
- [ ] **Formspree: Engineers form**: same steps, `forms.engineers`. See "Resume uploads" below.
- [ ] **LinkedIn company page URL**: `site.ts` → `social.linkedin`. Used in the footer and on /meet.
- [ ] **X (Twitter) URL**: `site.ts` → `social.x`. Used in the footer.
- [ ] **Instagram URL**: `site.ts` → `social.instagram`. Used in the footer.
- [ ] **Facebook URL**: `site.ts` → `social.facebook`. Used in the footer.
- [ ] **Phone number**: replace the fake `(555) 555-0123` in `site.ts` → `phone`. Used in the footer and on the Contact page. Once it's real, it can also go in the /meet contact card (`public/scalewrk.vcf`).
- [x] **Deploy to Vercel**: live at https://scalewrk.vercel.app
- [ ] **Connect domain**: add `scalewrk.ai` under Vercel → Project → Settings → Domains, then update DNS at your registrar

## Founder info (`src/content/founders.ts`)

- [x] Punit: other companies recruited for (TikTok, PayPal, Sully.ai)
- [x] Punit: location (Vancouver)
- [ ] Punit: LinkedIn URL
- [x] Punit: photo (`public/founders/punit.jpg`)
- [x] Mandeep: bio with prior roles (Apple, 2018–2025: sales, Genius Bar, Apple Business)
- [ ] Mandeep: LinkedIn URL
- [x] Mandeep: photo (`public/founders/mandeep.jpg`)

## Founder booking links (optional)

- [ ] Personal Calendly links for Punit and Mandeep: `calendlyUrl` in `src/content/founders.ts` (until then, both About buttons use the shared calendar)

## Pricing (`src/app/startups/page.tsx` → Engagement model)

- [ ] Fee (e.g. X% of first-year base salary)
- [ ] When the fee is due (e.g. on start date)
- [ ] Replacement guarantee period (e.g. 90 days)

## Decisions

- [ ] **Resume uploads**: Formspree only accepts files on paid plans (Personal or higher). Upgrade, switch the Engineers form to a free attachment service (ask Claude), or set `resumeUpload: false` in `site.ts` to hide the upload field.
- [ ] **Partner referral incentive**: do we offer a referral fee or anything in return? (The Partners page doesn't mention one yet.)
- [ ] **Promises in the copy**: keep or soften each one:
  - "We reply within one business day" (Contact and Partners pages)
  - "Hiring office hours or talks" offered to partners (Partners page)
  - "You work directly with a Scalewrk co-founder" (Home, Startups, Partners, About)

## Company logos (founders' experience strip)

- [ ] Optional: download official logo files (with their typography) from the TikTok, PayPal and Sully.ai press/brand pages, put them in `public/logos/`, and set `image` in `src/content/companyLogos.ts`
- [ ] Sully.ai logo (currently a placeholder tile)

## Testimonials

- [ ] After each placement, send the client and engineer `https://scalewrk.ai/testimonial`
- [ ] Replace the 6 example quotes in `src/content/testimonials.ts` with approved real ones (set `example: false`), or set `showExampleTestimonials = false`

## Clients

- [ ] When you have clients who agree to be listed: replace `[Client 1]`… in `src/content/clients.ts` with real names (optional logo in `public/clients/`). The placeholder note disappears automatically

## Jobs board

- [ ] Add company logos to real job listings: put the file in `public/companies/` and set `companyLogo` in `jobs.ts`
- [ ] Replace the example listings in `src/content/jobs.ts` with real jobs (set `example: false`), or set `showExampleJobs = false` to hide them

## Legal

- [ ] Privacy page: set the "last updated" date and have a lawyer review it (`src/app/privacy/page.tsx`)

## After launch

- [ ] Fill a test submission on all three forms and confirm the emails arrive at info@scalewrk.ai
- [ ] Book a test call through the Calendly embed
- [ ] Check link previews with LinkedIn Post Inspector, then by sharing a link on X and in Slack
- [ ] Add the site to Google Search Console and submit `https://scalewrk.ai/sitemap.xml`
- [ ] Make a QR code pointing to `https://scalewrk.ai/meet` for events
- [ ] Optional: send official logo SVG files to replace the redrawn mark
- [ ] Optional: individual role pages (e.g. `/roles/ai-ml-engineers`) for stronger SEO
