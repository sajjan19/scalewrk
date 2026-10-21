import { Building2, TrainFront, Search } from "lucide-react";
import { CityPage } from "@/components/CityPage";
import { pageMetadata } from "@/lib/metadata";
import newJerseyPhoto from "../../../public/places/new-jersey.jpg";

/*
  City page for New Jersey (helps startups searching "tech recruiter New Jersey" find us).
  Layout lives in CityPage.tsx. Keep the copy specific to New Jersey.
*/

export const metadata = pageMetadata({
  title: "Tech Recruiter for New Jersey Startups",
  description:
    "Scalewrk helps New Jersey startups hire engineers and sales teams, from Jersey City and Newark to Princeton.",
  path: "/tech-recruiter-new-jersey",
});

export default function NewJerseyPage() {
  return (
    <CityPage
      city="New Jersey"
      jobsLocation="New Jersey"
      intro="Right next to New York, New Jersey is home to fintech, pharma and growing startup hubs in Jersey City, Newark and Princeton. We help New Jersey startups hire great engineers and salespeople. We also help those people find their next New Jersey startup."
      // Photo by Gautam Krishnan on Unsplash (Unsplash License)
      photo={{
        src: newJerseyPhoto,
        alt: "The historic railroad terminal in Jersey City with the city towers behind",
        credit: "Gautam Krishnan",
        creditUrl: "https://unsplash.com/photos/skyline-view-of-building-with-clock-OWMN3ujgWBc",
      }}
      help={[
        {
          icon: Building2,
          title: "In office, hybrid or remote",
          body: ["Engineers who want to work in New Jersey", "Remote hires for distributed teams", "We match the setup your team uses"],
        },
        {
          icon: TrainFront,
          title: "Close to New York talent",
          body: ["Engineers across New Jersey and New York", "Hybrid roles with an easy commute", "We match the setup your team uses"],
        },
        {
          icon: Search,
          title: "A search run like part of your team",
          body: ["Punit runs every search", "A small shortlist that fits", "We help you close the offer"],
        },
      ]}
      engineerTitle="Engineer in New Jersey or moving there?"
      engineerBody="Tell us what you want next. We'll reach out when a New Jersey startup fits."
      faqs={[
        {
          q: "Do you work with startups in New Jersey?",
          a: "Yes. We help New Jersey startups hire engineers and sales teams for in-office, hybrid and remote roles.",
        },
        {
          q: "Are you based in New Jersey?",
          a: "Our team is based in Vancouver. We work with New Jersey teams over video and phone and plan calls around Eastern time.",
        },
        {
          q: "Can you find people who will commute from New York?",
          a: "Yes. We ask about commute and office days early, so you only meet people whose plans fit.",
        },
        {
          q: "What does it cost?",
          a: "It depends on the role. Book a call and we'll walk you through pricing and answer any other questions.",
        },
      ]}
    />
  );
}
