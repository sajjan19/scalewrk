# To-do reminders

Things still to fill in or decide. Everything below currently has a dummy value or placeholder on the site, so nothing is broken in the meantime.

**Tip:** search the code for `PLACEHOLDER` to find every spot. On the site, placeholder text shows as an amber highlighted box.

When you finish an item, tick it here (`[x]`) and update PROJECT_NOTES.md.

---

## Before launch (links and accounts)

- [ ] **Calendly link**: create the intro-call event, then paste its link into `src/content/site.ts` → `calendlyUrl`. Until then, Contact and /meet show an amber box with an "Email us to book" link.
- [ ] **Formspree: Contact form**: create the form at formspree.io, send it to info@scalewrk.ai, and paste the URL into `site.ts` → `forms.contact`.
- [ ] **Formspree: Partners form**: same steps, `forms.partners`.
- [ ] **Formspree: Engineers form**: same steps, `forms.engineers`. See "Resume uploads" below.
- [ ] **LinkedIn company page URL**: `site.ts` → `social.linkedin`. Used in the footer and on /meet.
- [ ] **X (Twitter) URL**: `site.ts` → `social.x`. Used in the footer.
- [ ] **Instagram URL**: `site.ts` → `social.instagram`. Used in the footer.
- [ ] **Facebook URL**: `site.ts` → `social.facebook`. Used in the footer.
- [x] **Deploy to Vercel**: live at https://scalewrk.vercel.app
- [ ] **Connect domain**: add `scalewrk.ai` under Vercel → Project → Settings → Domains, then update DNS at your registrar

## Founder info (`src/content/founders.ts`)

- [ ] Punit: other companies recruited for (bio line + "Experience recruiting for" list)
- [ ] Punit: location
- [ ] Punit: LinkedIn URL
- [x] Punit: photo (`public/founders/punit.jpg`)
- [ ] Mandeep: one more bio line about prior roles
- [ ] Mandeep: LinkedIn URL
- [x] Mandeep: photo (`public/founders/mandeep.jpg`)

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

## Legal

- [ ] Privacy page: set the "last updated" date and have a lawyer review it (`src/app/privacy/page.tsx`)

## After launch

- [ ] Fill a test submission on all three forms and confirm the emails arrive at info@scalewrk.ai
- [ ] Book a test call through the Calendly embed
- [ ] Check link previews with LinkedIn Post Inspector, then by sharing a link on X and in Slack
- [ ] Add the site to Google Search Console and submit `https://scalewrk.ai/sitemap.xml`
- [ ] Make a QR code pointing to `https://scalewrk.ai/meet` for events
- [ ] Optional: send official logo SVG files to replace the redrawn mark
- [ ] Optional: add real testimonials once you have approved quotes
- [ ] Optional: individual role pages (e.g. `/roles/ai-ml-engineers`) for stronger SEO
