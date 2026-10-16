import { Building2, GraduationCap, Search } from "lucide-react";
import { CityPage } from "@/components/CityPage";
import { pageMetadata } from "@/lib/metadata";

/*
  City page for Boston (helps startups searching "tech recruiter Boston" find us).
  Layout lives in CityPage.tsx. Keep the copy specific to Boston.
*/

export const metadata = pageMetadata({
  title: "Tech Recruiter for Boston Startups",
  description:
    "Scalewrk helps Boston startups hire engineers and sales teams, from AI and robotics to biotech software.",
  path: "/tech-recruiter-boston",
});

export default function BostonPage() {
  return (
    <CityPage
      city="Boston"
      jobsLocation="Boston, MA"
      intro="With world-class universities and deep roots in biotech and robotics, Boston turns research into startups. We help Boston startups hire great engineers and salespeople. We also help those people find their next Boston startup."
      help={[
        {
          icon: Building2,
          title: "In office, hybrid or remote",
          body: ["Engineers who want to work in Boston", "Remote hires for distributed teams", "We match the setup your team uses"],
        },
        {
          icon: GraduationCap,
          title: "From research to product",
          body: ["Engineers from Boston's universities and labs", "Early-career and senior people", "We match the level you need"],
        },
        {
          icon: Search,
          title: "A search run like part of your team",
          body: ["Punit or Mandeep runs it", "A small shortlist that fits", "We help you close the offer"],
        },
      ]}
      engineerTitle="Engineer in Boston or moving there?"
      engineerBody="Tell us what you want next. We'll reach out when a Boston startup fits."
      faqs={[
        {
          q: "Do you work with startups in Boston?",
          a: "Yes. We help Boston startups hire engineers and sales teams for in-office, hybrid and remote roles.",
        },
        {
          q: "Are you based in Boston?",
          a: "Our team is based in Vancouver. We work with Boston teams over video and phone and plan calls around Eastern time.",
        },
        {
          q: "Can you find engineers with a research background?",
          a: "Yes. If a role needs research experience, like machine learning or robotics, we look for it from the first call.",
        },
        {
          q: "What does it cost?",
          a: "It depends on the role. Book a call and we'll walk you through pricing and answer any other questions.",
        },
      ]}
    />
  );
}
