/*
  Co-founder cards on the About page.
  Photos live in /public/founders/ (square, at least 600×600). To swap one, replace the file
  or change `photo`. Leave photo empty ("") to show initials instead.
  Text inside [square brackets] renders as a highlighted PLACEHOLDER on the site.
*/

import type { ComponentType } from "react";
import { Camera, Clapperboard, Dog, Dumbbell, Mountain, Music, Plane, Sunset, UtensilsCrossed } from "lucide-react";
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
  previouslyAt?: string[]; // companies they worked at in other roles (About page only)
  linkedin: string;
  calendlyUrl: string; // their own booking link; while it says PLACEHOLDER, the button uses the shared calendar
  outsideWork: { icon: Icon; label: string }[]; // "Outside of work" tags on the About card
};

export const founders: Founder[] = [
  {
    name: "Punit Singh",
    title: "Co-founder and CEO",
    initials: "PS",
    photo: "/founders/punit.jpg",
    location: "Vancouver, Canada",
    bio: [
      "Punit has worked in tech recruiting since 2018, hiring for high-growth companies like TikTok, PayPal and Sully.ai.",
      "Punit has hired across engineering, sales and go-to-market teams. That gives a clear view of the people who drive product and revenue at a startup. That experience goes into every Scalewrk search.",
    ],
    experienceAt: ["TikTok", "PayPal", "Sully.ai"],
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
    title: "Co-founder",
    initials: "MS",
    photo: "/founders/mandeep-sajjan.jpg",
    location: "Vancouver, Canada",
    bio: [
      "Mandeep worked at Apple from 2018 to 2025 in sales, technical support and with the Apple Business team. Mandeep also helps small businesses grow through IT consulting.",
      "From Apple users to business owners, Mandeep has spent years helping people with tech. That helps Mandeep understand what founders need and match engineers with startups where they can thrive.",
    ],
    experienceAt: [],
    previouslyAt: ["Apple"],
    linkedin: "https://www.linkedin.com/in/PLACEHOLDER",
    calendlyUrl: "https://calendly.com/PLACEHOLDER",
    outsideWork: [
      { icon: Dumbbell, label: "Fitness" },
      { icon: MuayThaiFighter, label: "Muay Thai" },
      { icon: SoccerBall, label: "Soccer" },
      { icon: Mountain, label: "Hiking" },
      { icon: Camera, label: "Photography" },
      { icon: Sunset, label: "Sunsets" },
      { icon: Music, label: "Music festivals" },
      { icon: Plane, label: "Travel" },
      { icon: UtensilsCrossed, label: "Foodie" },
    ],
  },
];
