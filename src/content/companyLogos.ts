/*
  Logos for the "Our founder has recruited for" strip on the Home page.
  Names must match `experienceAt` in founders.ts.

  - `iconPath` + `color`: a brand symbol from Simple Icons (simpleicons.org) in the brand's color.
  - `image`: an official logo file (with the company's own typography) in /public/logos/,
    e.g. "/logos/paypal.svg". When set, it replaces the symbol and name.
  - Neither: a placeholder tile with the company's first letter.
*/
import { siPaypal, siTiktok } from "simple-icons";

export const companyLogos: Record<string, { iconPath?: string; color?: string; image?: string }> = {
  TikTok: { iconPath: siTiktok.path, color: `#${siTiktok.hex}` },
  PayPal: { iconPath: siPaypal.path, color: `#${siPaypal.hex}` },
  "Sully.ai": {}, // PLACEHOLDER: add their logo file to /public/logos/ and set image: "/logos/sully.svg"
};
