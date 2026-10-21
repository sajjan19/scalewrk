import { Building2, Car, Search } from "lucide-react";
import { CityPage } from "@/components/CityPage";
import { pageMetadata } from "@/lib/metadata";
import seattlePhoto from "../../../public/places/seattle.jpg";

/*
  City page for Seattle (helps startups searching "tech recruiter Seattle" find us).
  Layout lives in CityPage.tsx. Keep the copy specific to Seattle.
*/

export const metadata = pageMetadata({
  title: "Tech Recruiter for Seattle Startups",
  description:
    "Scalewrk helps Seattle startups hire engineers and sales teams. Cloud, AI, full-stack, founding engineers, account executives and more.",
  path: "/tech-recruiter-seattle",
});

export default function SeattlePage() {
  return (
    <CityPage
      city="Seattle"
      jobsLocation="Seattle, WA"
      intro="Home to cloud giants and a fast-growing startup scene, Seattle is full of engineers ready for their next big thing. We help Seattle startups hire great engineers and salespeople. We also help those people find their next Seattle startup."
      // Photo by Thom Milkovic on Unsplash (Unsplash License)
      photo={{
        src: seattlePhoto,
        alt: "Seattle skyline and the Space Needle with Mount Rainier behind",
        credit: "Thom Milkovic",
        creditUrl: "https://unsplash.com/photos/space-needle-and-seattle-skyline-skUTVJi8-jc",
      }}
      help={[
        {
          icon: Building2,
          title: "In office, hybrid or remote",
          body: ["Engineers who want to work in Seattle", "Remote hires for distributed teams", "We match the setup your team uses"],
        },
        {
          icon: Car,
          title: "Close by and on your time",
          body: ["Our team is just up the road in Vancouver", "Same Pacific time zone", "Calls and updates during your workday"],
        },
        {
          icon: Search,
          title: "A search run like part of your team",
          body: ["Punit runs every search", "A small shortlist that fits", "We help you close the offer"],
        },
      ]}
      engineerTitle="Engineer in Seattle or moving there?"
      engineerBody="Tell us what you want next. We'll reach out when a Seattle startup fits."
      faqs={[
        {
          q: "Do you work with startups in Seattle?",
          a: "Yes. We help Seattle startups hire engineers and sales teams for in-office, hybrid and remote roles.",
        },
        {
          q: "Are you based in Seattle?",
          a: "Our team is based in Vancouver, a short trip from Seattle and on the same Pacific time. We work with Seattle teams over video and phone.",
        },
        {
          q: "Can you find engineers who want to move from big tech to a startup?",
          a: "Yes. We ask what each engineer wants next, so you meet people who are excited about a startup and not just a new job.",
        },
        {
          q: "What does it cost?",
          a: "It depends on the role. Book a call and we'll walk you through pricing and answer any other questions.",
        },
      ]}
    />
  );
}
