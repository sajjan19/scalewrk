/*
  ─────────────────────────────────────────────────────────────
  SITE SETTINGS — most day-to-day edits happen in this file.
  ─────────────────────────────────────────────────────────────
  Anything marked PLACEHOLDER still needs a real value before launch.
*/

export const site = {
  name: "Scalewrk",
  legalName: "Scalewrk Talent",
  url: "https://scalewrk.ai",
  email: "info@scalewrk.ai",
  tagline: "Tech hiring for venture-backed startups.",
  description:
    "Scalewrk is a startup tech recruiter for venture-backed companies across the US. We hire AI/ML, backend, full-stack, frontend, and DevOps engineers from seed to Series C and beyond.",

  // PLACEHOLDER: replace with your real Calendly event link,
  // e.g. "https://calendly.com/scalewrk/intro-call"
  calendlyUrl: "",

  // PLACEHOLDER: replace with your real profile links
  social: {
    linkedin: "https://www.linkedin.com/company/PLACEHOLDER",
    x: "https://x.com/PLACEHOLDER",
  },

  /*
    Form endpoints. Create a form at formspree.io, then paste its URL here,
    e.g. "https://formspree.io/f/abcdwxyz". Until then the form shows a
    "not connected yet" message and points people to the email above.

    Resume file uploads on Formspree need a paid plan (Personal or higher).
    See PROJECT_NOTES.md → "Forms" for the free alternative.
  */
  forms: {
    contact: "", // PLACEHOLDER
    partners: "", // PLACEHOLDER
    engineers: "", // PLACEHOLDER
  },

  // Show the resume file-upload field on the engineers form.
  resumeUpload: true,
};

export const nav = [
  { href: "/startups", label: "For Startups" },
  { href: "/roles", label: "Roles" },
  { href: "/partners", label: "Partners" },
  { href: "/engineers", label: "For Engineers" },
  { href: "/about", label: "About" },
];

export const bookingHref = "/contact#book";
