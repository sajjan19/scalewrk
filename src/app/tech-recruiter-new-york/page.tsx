import { Building2, Plane, Search } from "lucide-react";
import { CityPage } from "@/components/CityPage";
import { pageMetadata } from "@/lib/metadata";
import nyPhoto from "../../../public/places/new-york.jpg";

/*
  City page for New York (helps startups searching "tech recruiter New York" find us).
  Layout lives in CityPage.tsx. Keep the copy specific to New York.
*/

export const metadata = pageMetadata({
  title: "Tech Recruiter for New York Startups",
  description:
    "Scalewrk helps New York startups hire engineers and sales teams for in-office, hybrid and remote roles. AI/ML, backend, account executives and more.",
  path: "/tech-recruiter-new-york",
});

export default function NewYorkPage() {
  return (
    <CityPage
      city="New York"
      headline={{ before: "Hiring for the city that ", highlight: "never sleeps", after: "." }}
      jobsLocation="New York, NY"
      intro="We help New York startups hire great engineers and salespeople. We also help those people find the right New York startup."
      // Photo by Jermaine Ee on Unsplash (Unsplash License)
      photo={{
        src: nyPhoto,
        alt: "Aerial view of Manhattan with Central Park in front",
        credit: "Jermaine Ee",
        creditUrl: "https://unsplash.com/photos/new-york-central-park-A2CChTZvzTE",
        position: "object-[center_40%]",
      }}
      help={[
        {
          icon: Building2,
          title: "In office, hybrid or remote",
          body: ["Engineers who want to work in New York", "Remote engineers for distributed teams", "We match the setup your team uses"],
        },
        {
          icon: Plane,
          title: "Engineers moving to New York",
          body: ["Engineers from other cities who want to relocate", "We check timing and plans up front", "No surprises late in the process"],
        },
        {
          icon: Search,
          title: "A search run like part of your team",
          body: ["Punit or Mandeep runs it", "A small shortlist that fits", "We help you close the offer"],
        },
      ]}
      engineerTitle="Engineer in New York or moving there?"
      engineerBody="Tell us what you want next. We'll reach out when a New York startup fits."
      faqs={[
        {
          q: "Do you work with startups in New York?",
          a: "Yes. We help New York startups hire engineers and sales teams for in-office, hybrid and remote roles.",
        },
        {
          q: "Are you based in New York?",
          a: "Our team is based in Vancouver. We work with New York teams over video and phone.",
        },
        {
          q: "Can you find engineers willing to move to New York?",
          a: "Yes. We ask about relocation early, so you only meet engineers whose plans fit your timeline.",
        },
        {
          q: "What does it cost?",
          a: "It depends on the role. Book a call and we'll walk you through pricing and answer any other questions.",
        },
      ]}
    />
  );
}
