import { Building2, Clock, Search } from "lucide-react";
import { CityPage } from "@/components/CityPage";
import { pageMetadata } from "@/lib/metadata";
import torontoPhoto from "../../../public/places/toronto.jpg";

/*
  City page for Toronto (helps startups searching "tech recruiter Toronto" find us).
  Layout lives in CityPage.tsx. Keep the copy specific to Toronto.
*/

export const metadata = pageMetadata({
  title: "Tech Recruiter for Toronto Startups",
  description:
    "Scalewrk helps Toronto startups hire engineers and sales teams for in-office, hybrid and remote roles across Canada and the US.",
  path: "/tech-recruiter-toronto",
});

export default function TorontoPage() {
  return (
    <CityPage
      city="Toronto"
      jobsLocation="Toronto, ON"
      intro="From fintech on Bay Street to AI labs downtown, Toronto is Canada's biggest tech hub. We help Toronto startups hire great engineers and salespeople. We also help those people find their next Toronto startup."
      // Photo by Berkay Gumustekin on Unsplash (Unsplash License)
      photo={{
        src: torontoPhoto,
        alt: "Toronto skyline and the CN Tower at sunset across Lake Ontario",
        credit: "Berkay Gumustekin",
        creditUrl: "https://unsplash.com/photos/toronto-skyline-and-cn-tower-hRg1KL4-AUE",
      }}
      help={[
        {
          icon: Building2,
          title: "In office, hybrid or remote",
          body: ["Engineers who want to work in Toronto", "Remote hires for distributed teams", "We match the setup your team uses"],
        },
        {
          icon: Clock,
          title: "Working on Eastern time",
          body: ["Morning calls that fit your day", "Updates before you log off", "We work with teams across Canada"],
        },
        {
          icon: Search,
          title: "A search run like part of your team",
          body: ["Punit or Mandeep runs it", "A small shortlist that fits", "We help you close the offer"],
        },
      ]}
      engineerTitle="Engineer in Toronto or moving there?"
      engineerBody="Tell us what you want next. We'll reach out when a Toronto startup fits."
      faqs={[
        {
          q: "Do you work with startups in Toronto?",
          a: "Yes. We help Toronto startups hire engineers and sales teams for in-office, hybrid and remote roles.",
        },
        {
          q: "Are you based in Toronto?",
          a: "Our team is based in Vancouver. We work with Toronto teams over video and phone and plan calls around Eastern time.",
        },
        {
          q: "Can you hire outside Toronto?",
          a: "Yes. We find engineers and salespeople across Canada and in the US, for in-office, hybrid and remote roles.",
        },
        {
          q: "What does it cost?",
          a: "It depends on the role. Book a call and we'll walk you through pricing and answer any other questions.",
        },
      ]}
    />
  );
}
