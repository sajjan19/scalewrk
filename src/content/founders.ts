/*
  Team cards on the About page. Punit is the founder; Mandeep is the founding recruiter.
  Photos live in /public/founders/ (square, at least 600×600). To swap one, replace the file
  or change `photo`. Leave photo empty ("") to show initials instead.
  Text inside [square brackets] renders as a highlighted PLACEHOLDER on the site.
*/

import type { ComponentType } from "react";
import { Camera, Clapperboard, CodeXml, Dog, Dumbbell, Mountain, Music, Plane, Sunset, UtensilsCrossed } from "lucide-react";
import { MuayThaiFighter, SoccerBall } from "@/components/icons";

type Icon = ComponentType<{ className?: string; strokeWidth?: number }>;

export type Founder = {
  name: string;
  title: string;
  initials: string;
  photo: string;
  location: string;
  bio: string[];
  experienceAt: string[]; // companies they recruited for (also shown on the Home strip)
  // "Background" list on the About card: past jobs (briefcase icon) and schools (graduation cap icon)
  previouslyAt?: { name: string; detail?: string }[]; // companies they worked at in other roles
  education?: { name: string; detail?: string }[]; // schools and programs
  linkedin: string;
  calendlyUrl: string; // their own booking link; while it says PLACEHOLDER, the button uses the shared calendar
  outsideWork: { icon: Icon; label: string }[]; // "Outside of work" tags on the About card
};

export const founders: Founder[] = [
  {
    name: "Punit Singh",
    title: "Co-Founder & Principal Recruiter",
    initials: "PS",
    photo: "/founders/punit.jpg",
    location: "Vancouver, Canada",
    bio: [
      "Punit has worked in tech recruiting since 2018, hiring for high-growth companies like TikTok, PayPal and Sully.ai.",
      "He has hired across engineering, sales and go-to-market teams. That gives him a clear view of the people who drive product and revenue at a startup. He brings that experience to every Scalewrk search.",
    ],
    experienceAt: ["TikTok", "PayPal", "Sully.ai"],
    education: [{ name: "British Columbia Institute of Technology (BCIT)", detail: "School of Business + Media" }],
    linkedin: "https://www.linkedin.com/in/PLACEHOLDER",
    calendlyUrl: "https://calendly.com/PLACEHOLDER",
    outsideWork: [
      { icon: Dumbbell, label: "Fitness" },
      { icon: Dog, label: "Ducky the dog" },
      { icon: Clapperboard, label: "Movies" },
      { icon: Music, label: "Music festivals" },
      { icon: Plane, label: "Travel" },
      { icon: UtensilsCrossed, label: "Foodie" },
    ],
  },
  {
    name: "Mandeep Sajjan",
    title: "Co-Founder, Head of Growth & Technology",
    initials: "MS",
    photo: "/founders/mandeep-sajjan.jpg",
    location: "Vancouver, Canada",
    bio: [
      "Mandeep worked at Apple from 2018 to 2025 in sales, technical support and with the Apple Business team. He also helped businesses in Canada and the US grow through IT consulting.",
      "He has spent years helping all kinds of people with their technology, from everyday users to business owners. That helps him understand what founders need and match engineers with startups where they can thrive.",
    ],
    experienceAt: [],
    previouslyAt: [{ name: "Apple", detail: "Sales, technical support and Apple Business" }],
    education: [
      { name: "University of British Columbia (UBC)", detail: "BSc in Computer Science" },
      { name: "British Columbia Institute of Technology (BCIT)", detail: "New Media and Web Development" },
    ],
    linkedin: "https://www.linkedin.com/in/PLACEHOLDER",
    calendlyUrl: "https://calendly.com/PLACEHOLDER",
    outsideWork: [
      { icon: Dumbbell, label: "Fitness" },
      { icon: MuayThaiFighter, label: "Muay Thai" },
      { icon: SoccerBall, label: "Soccer" },
      { icon: Mountain, label: "Hiking" },
      { icon: CodeXml, label: "Vibe coding" },
      { icon: Camera, label: "Photography" },
      { icon: Sunset, label: "Sunsets" },
      { icon: Music, label: "Music festivals" },
      { icon: Plane, label: "Travel" },
      { icon: UtensilsCrossed, label: "Foodie" },
    ],
  },
];

// Anchor for a founder's card on the About page, e.g. "Punit Singh" → "punit-singh" (/about#punit-singh)
export function founderId(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
