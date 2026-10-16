import { Building2, Plane, Search } from "lucide-react";
import { CityPage } from "@/components/CityPage";
import { pageMetadata } from "@/lib/metadata";
import austinPhoto from "../../../public/places/austin.jpg";

/*
  City page for Austin (helps startups searching "tech recruiter Austin" find us).
  Layout lives in CityPage.tsx. Keep the copy specific to Austin.
*/

export const metadata = pageMetadata({
  title: "Tech Recruiter for Austin Startups",
  description:
    "Scalewrk helps Austin startups hire engineers and sales teams, including people relocating to Texas.",
  path: "/tech-recruiter-austin",
});

export default function AustinPage() {
  return (
    <CityPage
      city="Austin"
      jobsLocation="Austin, TX"
      intro="Austin mixes live music with one of the fastest-growing tech scenes in the US, from SaaS to chips to AI. We help Austin startups hire great engineers and salespeople. We also help those people find their next Austin startup."
      // Photo by MJ Tangonan on Unsplash (Unsplash License)
      photo={{
        src: austinPhoto,
        alt: "Downtown Austin skyline over Lady Bird Lake",
        credit: "MJ Tangonan",
        creditUrl: "https://unsplash.com/photos/river-near-buildings-during-daytime-wKfTNWaDYgs",
      }}
      help={[
        {
          icon: Building2,
          title: "In office, hybrid or remote",
          body: ["Engineers who want to work in Austin", "Remote hires for distributed teams", "We match the setup your team uses"],
        },
        {
          icon: Plane,
          title: "People moving to Austin",
          body: ["Engineers from other cities who want to relocate", "We check timing and plans up front", "We help you pitch the move"],
        },
        {
          icon: Search,
          title: "A search run like part of your team",
          body: ["Punit or Mandeep runs it", "A small shortlist that fits", "We help you close the offer"],
        },
      ]}
      engineerTitle="Engineer in Austin or moving there?"
      engineerBody="Tell us what you want next. We'll reach out when a Austin startup fits."
      faqs={[
        {
          q: "Do you work with startups in Austin?",
          a: "Yes. We help Austin startups hire engineers and sales teams for in-office, hybrid and remote roles.",
        },
        {
          q: "Are you based in Austin?",
          a: "Our team is based in Vancouver. We work with Austin teams over video and phone and plan calls around Central time.",
        },
        {
          q: "Can you find engineers willing to move to Austin?",
          a: "Yes. We ask about relocation early, so you only meet people whose plans fit your timeline.",
        },
        {
          q: "What does it cost?",
          a: "It depends on the role. Book a call and we'll walk you through pricing and answer any other questions.",
        },
      ]}
    />
  );
}
