/*
  ─────────────────────────────────────────────────────────────
  SITE SETTINGS — most day-to-day edits happen in this file.
  ─────────────────────────────────────────────────────────────
  Anything marked PLACEHOLDER still needs a real value before launch.
*/

export const site = {
  name: "Scalewrk",
  legalName: "Scalewrk Talent",
  // On Vercel this is the live production domain (scalewrk.vercel.app now,
  // scalewrk.ai once the domain is connected). Locally it falls back to scalewrk.ai.
  url: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://scalewrk.ai",
  email: "info@scalewrk.ai",
  // PLACEHOLDER: fake number (555-01xx numbers are reserved for fiction). Replace with your real one.
  phone: "(555) 555-0123",
  tagline: "Tech hiring for venture-backed startups.",
  description:
    "Scalewrk is a startup tech recruiter for venture-backed companies across the US. We hire AI/ML, backend, full-stack, frontend and DevOps engineers from seed to Series C and beyond.",

  // PLACEHOLDER: replace with your real Calendly event link,
  // e.g. "https://calendly.com/scalewrk/intro-call"
  calendlyUrl: "https://calendly.com/PLACEHOLDER",

  // PLACEHOLDER: replace with your real profile links
  social: {
    linkedin: "https://www.linkedin.com/company/PLACEHOLDER",
    x: "https://x.com/PLACEHOLDER",
    instagram: "https://www.instagram.com/PLACEHOLDER",
    facebook: "https://www.facebook.com/PLACEHOLDER",
  },

  /*
    Form endpoints. Create a form at formspree.io, then paste its URL here,
    e.g. "https://formspree.io/f/abcdwxyz". While a link still says PLACEHOLDER,
    the form shows a "not connected yet" message and points people to the email above.

    Resume file uploads on Formspree need a paid plan (Personal or higher).
    See PROJECT_NOTES.md → "Forms" for the free alternative.
  */
  forms: {
    contact: "https://formspree.io/f/PLACEHOLDER",
    partners: "https://formspree.io/f/PLACEHOLDER",
    engineers: "https://formspree.io/f/PLACEHOLDER",
  },

  // Show the resume file-upload field on the engineers form.
  resumeUpload: true,
};

// True once a setting has a real value (not empty, not a PLACEHOLDER dummy).
export function isSet(value: string) {
  return value !== "" && !value.includes("PLACEHOLDER");
}

export const nav = [
  { href: "/startups", label: "For Startups" },
  { href: "/engineers", label: "For Engineers" },
  { href: "/jobs", label: "Jobs" },
  { href: "/roles", label: "Roles" },
  { href: "/partners", label: "Partners" },
  { href: "/about", label: "About" },
];

export const bookingHref = "/contact#book";
