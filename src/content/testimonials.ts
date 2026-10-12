/*
  TESTIMONIALS (Home page)
  ────────────────────────
  Only publish real quotes you have permission to share.
  New ones come in through the form at /testimonial.

  The entries below are EXAMPLES to preview the layout. They are not real.
  While any example is showing, the section is labeled "Example testimonials".
  To go live: replace them with real quotes and set `example: false`.
  To hide all examples: set `showExampleTestimonials = false`.
*/

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  type: "Founder" | "Engineer" | "Partner";
  photo?: string; // optional, e.g. "/testimonials/jane.jpg" in /public/testimonials/
  example: boolean;
};

export const showExampleTestimonials = true;

export const testimonials: Testimonial[] = [
  {
    quote:
      "Scalewrk understood what we were building on the first call. We met a few great engineers and hired our first AI engineer.",
    name: "[Founder name]",
    title: "CEO",
    company: "Company A (Seed)",
    type: "Founder",
    example: true,
  },
  {
    quote:
      "They told me the real story about the startup before I even interviewed: stage, team and pay. I'd never had a recruiter be that honest.",
    name: "[Engineer name]",
    title: "Senior Backend Engineer",
    company: "Company B (Series A)",
    type: "Engineer",
    example: true,
  },
  {
    quote:
      "We send our portfolio founders to Scalewrk for engineering hires. They treat every intro like a long-term relationship.",
    name: "[Partner name]",
    title: "Platform Lead",
    company: "[Venture firm]",
    type: "Partner",
    example: true,
  },
];

export const visibleTestimonials = testimonials.filter((t) => !t.example || showExampleTestimonials);
