/*
  Logos for the "Our founders have recruited for" strip on the Home page.
  Names must match `experienceAt` in founders.ts.

  - `iconPath` + `color`: a brand symbol from Simple Icons (simpleicons.org) in the brand's color.
  - `image`: an official logo file (with the company's own typography) in /public/logos/,
    e.g. "/logos/paypal.svg". When set, it replaces the symbol and name.
  - Neither: a placeholder tile with the company's first letter.
*/

export const companyLogos: Record<string, { iconPath?: string; color?: string; image?: string }> = {
  TikTok: { image: "/logos/tiktok.svg" }, // official logo with wordmark (file from the user)
  PayPal: { image: "/logos/paypal.svg" }, // official full-color logo (file from the user)
  Paraform: {}, // no logo file yet: shows the name as text
  "Sully.ai": { image: "/logos/sully.png" }, // blue sully.ai logo from when Punit recruited for them (they have since rebranded)
};

// Other companies the team has recruited for, shown in the "Where our team has recruited" strip
// (not tied to one person, so they don't appear in a founder's bio).
export const alsoRecruitedFor = ["Paraform"];
