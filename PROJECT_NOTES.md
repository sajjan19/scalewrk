# Scalewrk website: project notes

Running source of truth for the scalewrk.ai marketing site. Update this file with every change.

_Last updated: 2026-10-10_

---

## 1. Approved plan (summary)

Marketing site for **Scalewrk** (legal name **Scalewrk Talent**, domain **scalewrk.ai**): a tech recruiting firm for US venture-backed startups, seed through Series C+.

**Audiences, in priority order**
1. US startup founders/CEOs checking us out on their phone after an event, a LinkedIn/X post, or outreach. They should get it in 5 seconds and book in one tap.
2. Referral partners: VC platform/talent teams, accelerators, startup lawyers, fractional CFOs.
3. Engineers looking for startup roles.

**Tech:** Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript. All pages are static. Deployed on Vercel. No backend: forms go to a form service (Formspree) and booking goes to Calendly.

---

## 2. Site map

| Route | Purpose | In nav | In sitemap |
|---|---|---|---|
| `/` | Home: hero, who we work with (stages), how it works (4 steps), roles, why Scalewrk, founder credibility, partner/engineer split, CTA | Logo | Yes |
| `/startups` | For founders: 6-step process, in-house vs. agency vs. Scalewrk comparison, fee-per-hire engagement model (pricing placeholders), FAQ | Yes | Yes |
| `/roles` | 9 role families with typical titles and "what we screen for"; jump links | Yes | Yes |
| `/partners` | VCs, accelerators, lawyers, fractional CFOs: how we support, why refer, how referrals work, partner form | Yes | Yes |
| `/engineers` | Candidate pitch + profile form (LinkedIn required, resume upload or link) | Yes | Yes |
| `/about` | Story, two founder cards (Punit first), values | Yes | Yes |
| `/contact` | Calendly embed (`#book`) + contact form | Footer, "Book a call" buttons | Yes |
| `/meet` | Event QR-code landing page: "Great meeting you", booking, save contact (vCard) | No | **No** (`noindex`) |
| `/privacy` | Short privacy note (needs legal review) | Footer | Yes |

Every "Book a call" button links to `/contact#book`. On phones, a sticky "Book a 20-minute call" bar sits at the bottom of every page except `/contact`, `/meet`, and `/engineers`.

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
| Home hero card is labeled "Example" | Illustrative UI, not real searches |
| Bios avoid pronouns | Pronouns not confirmed; safe default |
| Founder photos shown as supplied (no filter) | User asked to keep Mandeep's photo in color. Punit's original is black and white. Photos are 4:3 on About, served at quality 90 (`images.qualities` in `next.config.ts`) |
| Cache Components turned off in `next.config.ts` | Site is fully static; the classic model is simpler to edit |
| Vercel Web Analytics | Cookie-free, so no consent banner needed |
| One social preview image per page (`opengraph-image.tsx`) | Strong, page-specific link cards on LinkedIn, X, and Slack. Generated at build time with Geist fonts from `src/assets/fonts/` |
| `site.url` comes from Vercel's production domain | Link previews and canonical URLs work on scalewrk.vercel.app now and switch to scalewrk.ai automatically once the domain is added |
| "Why Scalewrk" (Home) built on 3 pillars: engineers only with an AI/ML edge, co-founder runs every search, in-person long-term partner | Strongest, hardest-to-copy differentiators. Fee per hire kept as a supporting line because it's standard for contingency recruiting. No speed promises until confirmed |
| `/meet` is `noindex` and not in the sitemap | It's for event QR codes, not search |
| Structured data: `EmploymentAgency` (schema.org), area served US | Helps search engines understand the business |
| Contact email `info@scalewrk.ai` | User choice |
| Hero headline "Tech hiring for venture-backed startups." | User choice |

### SEO targets
"startup tech recruiter" (Home title/description), "technical recruiter for venture-backed startups" (`/startups` title), "AI engineer recruiting for startups" (`/roles` title/description). Titles and descriptions are set per page with `pageMetadata()` in `src/lib/metadata.ts`.

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
