import { Building2, Clock, Search } from "lucide-react";
import { CityPage } from "@/components/CityPage";
import { pageMetadata } from "@/lib/metadata";

/*
  City page for Chicago (helps startups searching "tech recruiter Chicago" find us).
  Layout lives in CityPage.tsx. Keep the copy specific to Chicago.
*/

export const metadata = pageMetadata({
  title: "Tech Recruiter for Chicago Startups",
  description:
    "Scalewrk helps Chicago startups hire engineers and sales teams, from fintech and trading to logistics and health tech.",
  path: "/tech-recruiter-chicago",
});

export default function ChicagoPage() {
  return (
    <CityPage
      city="Chicago"
      jobsLocation="Chicago, IL"
      intro="From trading firms on LaSalle Street to logistics and health tech, Chicago builds practical tech at scale. We help Chicago startups hire great engineers and salespeople. We also help those people find their next Chicago startup."
      help={[
        {
          icon: Building2,
          title: "In office, hybrid or remote",
          body: ["Engineers who want to work in Chicago", "Remote hires for distributed teams", "We match the setup your team uses"],
        },
        {
          icon: Clock,
          title: "Working on Central time",
          body: ["Morning calls that fit your day", "Updates before you log off", "We work with teams across the Midwest"],
        },
        {
          icon: Search,
          title: "A search run like part of your team",
          body: ["Punit or Mandeep runs it", "A small shortlist that fits", "We help you close the offer"],
        },
      ]}
      engineerTitle="Engineer in Chicago or moving there?"
      engineerBody="Tell us what you want next. We'll reach out when a Chicago startup fits."
      faqs={[
        {
          q: "Do you work with startups in Chicago?",
          a: "Yes. We help Chicago startups hire engineers and sales teams for in-office, hybrid and remote roles.",
        },
        {
          q: "Are you based in Chicago?",
          a: "Our team is based in Vancouver. We work with Chicago teams over video and phone and plan calls around Central time.",
        },
        {
          q: "Can you hire outside Chicago?",
          a: "Yes. We find engineers and salespeople across the US and Canada, for in-office, hybrid and remote roles.",
        },
        {
          q: "What does it cost?",
          a: "It depends on the role. Book a call and we'll walk you through pricing and answer any other questions.",
        },
      ]}
    />
  );
}
