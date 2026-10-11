/*
  Co-founder cards on the About page.
  Photos live in /public/founders/ (square, at least 600×600). To swap one, replace the file
  or change `photo`. Leave photo empty ("") to show initials instead.
  Text inside [square brackets] renders as a highlighted PLACEHOLDER on the site.
*/

export type Founder = {
  name: string;
  title: string;
  initials: string;
  photo: string;
  location: string;
  bio: string[];
  experienceAt: string[];
  linkedin: string;
};

export const founders: Founder[] = [
  {
    name: "Punit Singh",
    title: "Co-founder",
    initials: "PS",
    photo: "/founders/punit.jpg",
    location: "[PLACEHOLDER: location]",
    bio: [
      "Punit has been in tech recruitment since 2018, hiring engineers for high-growth companies including TikTok and [PLACEHOLDER: other companies].",
      "Years of technical searches have taught Punit what separates a great engineering hire from one that only looks good on paper. That bar comes with every Scalewrk search.",
    ],
    experienceAt: ["TikTok", "[PLACEHOLDER: company]", "[PLACEHOLDER: company]"],
    linkedin: "https://www.linkedin.com/in/PLACEHOLDER",
  },
  {
    name: "Mandeep Sajjan",
    title: "Co-founder",
    initials: "MS",
    photo: "/founders/mandeep.jpg",
    location: "Vancouver",
    bio: [
      "Mandeep brings a background in tech and sales to recruiting, and works directly with founders to understand what they're building and who they need.",
      "That sales background matters: great engineers have options, and Mandeep knows how to turn a founder's vision into a pitch they want to hear. [PLACEHOLDER: add a line on prior roles]",
    ],
    experienceAt: [],
    linkedin: "https://www.linkedin.com/in/PLACEHOLDER",
  },
];
