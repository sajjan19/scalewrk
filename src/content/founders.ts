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
  // Which part of the photo stays in view when it is cropped to a square on About (CSS object-position). Default "50% 35%"
  photoPosition?: string;
  location: string;
  bio: string[];
  experienceAt: string[]; // companies they recruited for (also shown on the Home strip)
  // "Background" list on the About card: past jobs (briefcase icon) and schools (graduation cap icon)
  previouslyAt?: { name: string; detail?: string }[]; // companies they worked at in other roles
  education?: { name: string; detail?: string }[]; // schools and programs
  email: string; // their own email for the Email button on About; while it says PLACEHOLDER, the button uses info@scalewrk.ai
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
    email: "punit@scalewrk.ai",
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
    photo: "/founders/mandeep-sajjan-square.jpg",
    location: "Vancouver, Canada",
    bio: [
      "Mandeep powers the “AI” in our AI-powered sourcing. He builds the tools and workflows behind Scalewrk’s sourcing and growth, so we spend less time searching and more time with people.",
      "He spent seven years at Apple in sales, technical support and Apple Business. He also helped businesses in Canada and the US grow through IT consulting.",
    ],
    experienceAt: [],
    previouslyAt: [
      { name: "Apple", detail: "Sales, technical support and Apple Business" },
      { name: "IT consulting", detail: "Helped businesses in Canada and the US grow" },
    ],
    education: [
      { name: "University of British Columbia (UBC)", detail: "BSc in Computer Science" },
      { name: "British Columbia Institute of Technology (BCIT)", detail: "New Media and Web Development" },
    ],
    email: "mandeep@scalewrk.ai",
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
