import { Building2, Languages, Search } from "lucide-react";
import { CityPage } from "@/components/CityPage";
import { pageMetadata } from "@/lib/metadata";
import montrealPhoto from "../../../public/places/montreal.jpg";

/*
  City page for Montreal (helps startups searching "tech recruiter Montreal" find us).
  Layout lives in CityPage.tsx. Keep the copy specific to Montreal.
*/

export const metadata = pageMetadata({
  title: "Tech Recruiter for Montreal Startups",
  description:
    "Scalewrk helps Montreal startups hire engineers and sales teams for in-office, hybrid and remote roles across Canada and the US.",
  path: "/tech-recruiter-montreal",
});

export default function MontrealPage() {
  return (
    <CityPage
      city="Montreal"
      jobsLocation="Montreal, QC"
      intro="With world-class AI research and a creative tech scene, Montreal punches above its weight. We help Montreal startups hire great engineers and salespeople. We also help those people find their next Montreal startup."
      // Photo by Marc-Olivier Jodoin on Unsplash (Unsplash License)
      photo={{
        src: montrealPhoto,
        alt: "Montreal skyline at dusk reflected in the river",
        credit: "Marc-Olivier Jodoin",
        creditUrl: "https://unsplash.com/photos/landscape-photography-of-skyscrapers-BG9oZ15a4Xk",
      }}
      help={[
        {
          icon: Building2,
          title: "In office, hybrid or remote",
          body: ["Engineers who want to work in Montreal", "Remote hires for distributed teams", "We match the setup your team uses"],
        },
        {
          icon: Languages,
          title: "French, English or both",
          body: ["We ask about language needs on the first call", "Engineers and sellers who fit your market", "No surprises late in the process"],
        },
        {
          icon: Search,
          title: "A search run like part of your team",
          body: ["Punit or Mandeep runs it", "A small shortlist that fits", "We help you close the offer"],
        },
      ]}
      engineerTitle="Engineer in Montreal or moving there?"
      engineerBody="Tell us what you want next. We'll reach out when a Montreal startup fits."
      faqs={[
        {
          q: "Do you work with startups in Montreal?",
          a: "Yes. We help Montreal startups hire engineers and sales teams for in-office, hybrid and remote roles.",
        },
        {
          q: "Are you based in Montreal?",
          a: "Our team is based in Vancouver. We work with Montreal teams over video and phone and plan calls around Eastern time.",
        },
        {
          q: "Can you find people who speak French?",
          a: "Yes. If a role needs French, tell us on the first call and we'll ask every candidate about it early.",
        },
        {
          q: "What does it cost?",
          a: "It depends on the role. Book a call and we'll walk you through pricing and answer any other questions.",
        },
      ]}
    />
  );
}
