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
    location: "Vancouver, Canada",
    bio: [
      "Punit has worked in tech recruiting since 2018, hiring for high-growth companies like TikTok, PayPal and Sully.ai.",
      "Punit has hired across engineering, sales and go-to-market teams. That gives a clear view of the people who drive product and revenue at a startup. That experience goes into every Scalewrk search.",
    ],
    experienceAt: ["TikTok", "PayPal", "Sully.ai"],
    linkedin: "https://www.linkedin.com/in/PLACEHOLDER",
  },
  {
    name: "Mandeep Sajjan",
    title: "Co-founder",
    initials: "MS",
    photo: "/founders/mandeep-sajjan.jpg",
    location: "Vancouver, Canada",
    bio: [
      "Mandeep has a background in tech and sales. Mandeep works directly with founders to understand what they're building and who they need.",
      "Great engineers have many options. Mandeep knows how to share a founder's vision in a way engineers want to hear. [PLACEHOLDER: add a line on prior roles]",
    ],
    experienceAt: [],
    linkedin: "https://www.linkedin.com/in/PLACEHOLDER",
  },
];
