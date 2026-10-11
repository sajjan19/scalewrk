# scalewrk.ai

Marketing site for Scalewrk, tech recruiting for venture-backed startups. Built with Next.js and Tailwind CSS and deployed on Vercel.

See **[TODO.md](TODO.md)** for what's left to fill in, and **[PROJECT_NOTES.md](PROJECT_NOTES.md)** for the plan, design system, and decisions.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where to edit things

| I want to change… | Edit this file |
|---|---|
| Calendly link, form endpoints, email, social links | `src/content/site.ts` |
| Roles we hire | `src/content/roles.ts` |
| Founder bios, photos, LinkedIn | `src/content/founders.ts` (photos go in `public/founders/`) |
| Text on a page | `src/app/<page>/page.tsx` (Home is `src/app/page.tsx`) |
| Page title / Google description | the `pageMetadata({...})` block at the top of each page |
| Social share image text | `src/app/<page>/opengraph-image.tsx` |
| Colors | `src/app/globals.css` (`@theme` block) |
| Header / footer | `src/components/Header.tsx`, `src/components/Footer.tsx` |

Text inside `[square brackets]` in content files shows up as a highlighted placeholder on the site. Search the code for `PLACEHOLDER` to find everything that still needs filling in.

## Check before pushing

```bash
npm run build
```

## Deploy

Import the GitHub repo at vercel.com/new (no settings to change), then add the `scalewrk.ai` domain under Project → Settings → Domains.
