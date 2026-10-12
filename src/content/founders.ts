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
  experienceAt: string[]; // companies they recruited for (also shown on the Home strip)
  previouslyAt?: string[]; // companies they worked at in other roles (About page only)
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
      "Mandeep spent seven years at Apple, from 2018 to 2025, working in sales, at the Genius Bar and with the Apple Business team. Mandeep has also done IT consulting for small businesses, helping them grow.",
      "That mix of tech and sales helps Mandeep understand what founders are building and who they need. It also helps Mandeep share a founder's vision in a way great engineers want to hear.",
    ],
    experienceAt: [],
    previouslyAt: ["Apple"],
    linkedin: "https://www.linkedin.com/in/PLACEHOLDER",
  },
];
