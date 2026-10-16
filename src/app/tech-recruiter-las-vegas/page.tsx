import { Building2, Plane, Search } from "lucide-react";
import { CityPage } from "@/components/CityPage";
import { pageMetadata } from "@/lib/metadata";

/*
  City page for Las Vegas (helps startups searching "tech recruiter Las Vegas" find us).
  Layout lives in CityPage.tsx. Keep the copy specific to Las Vegas.
*/

export const metadata = pageMetadata({
  title: "Tech Recruiter for Las Vegas Startups",
  description:
    "Scalewrk helps Las Vegas startups hire engineers and sales teams, including people relocating to Nevada.",
  path: "/tech-recruiter-las-vegas",
});

export default function LasVegasPage() {
  return (
    <CityPage
      city="Las Vegas"
      jobsLocation="Las Vegas, NV"
      intro="Las Vegas is more than the Strip. Its startup scene keeps growing, from gaming tech to hospitality and fintech. We help Las Vegas startups hire great engineers and salespeople. We also help those people find their next Vegas startup."
      help={[
        {
          icon: Building2,
          title: "In office, hybrid or remote",
          body: ["Engineers who want to work in Las Vegas", "Remote hires for distributed teams", "We match the setup your team uses"],
        },
        {
          icon: Plane,
          title: "People moving to Las Vegas",
          body: ["Engineers from other cities who want to relocate", "We check timing and plans up front", "We help you pitch the move"],
        },
        {
          icon: Search,
          title: "A search run like part of your team",
          body: ["Punit or Mandeep runs it", "A small shortlist that fits", "We help you close the offer"],
        },
      ]}
      engineerTitle="Engineer in Las Vegas or moving there?"
      engineerBody="Tell us what you want next. We'll reach out when a Las Vegas startup fits."
      faqs={[
        {
          q: "Do you work with startups in Las Vegas?",
          a: "Yes. We help Las Vegas startups hire engineers and sales teams for in-office, hybrid and remote roles.",
        },
        {
          q: "Are you based in Las Vegas?",
          a: "Our team is based in Vancouver, on the same Pacific time as Las Vegas. We work with Vegas teams over video and phone.",
        },
        {
          q: "Can you find engineers willing to move to Las Vegas?",
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
