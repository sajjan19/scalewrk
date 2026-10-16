import { Building2, Clock, Search } from "lucide-react";
import { CityPage } from "@/components/CityPage";
import { pageMetadata } from "@/lib/metadata";
import sfPhoto from "../../../public/places/san-francisco.jpg";

/*
  City page for San Francisco and the Bay Area (helps startups searching "tech recruiter San Francisco" find us).
  Layout lives in CityPage.tsx. Keep the copy specific to San Francisco.
*/

export const metadata = pageMetadata({
  title: "Tech Recruiter for San Francisco Startups",
  description:
    "Scalewrk helps San Francisco and Bay Area startups hire engineers and sales teams. AI engineers, full-stack, founding engineers, account executives and more.",
  path: "/tech-recruiter-san-francisco",
});

export default function SanFranciscoPage() {
  return (
    <CityPage
      city="San Francisco"
      jobsLocation="San Francisco, CA"
      intro="The Bay Area is where the next big AI startups are born. We help San Francisco teams hire the engineers who build them and the salespeople who sell them. We also help those people find their next Bay Area startup."
      // Photo by Maarten van den Heuvel on Unsplash (Unsplash License)
      photo={{
        src: sfPhoto,
        alt: "Golden Gate Bridge with San Francisco across the bay",
        credit: "Maarten van den Heuvel",
        creditUrl: "https://unsplash.com/photos/golden-gate-bridge-during-daytime-gZXx8lKAb7Y",
      }}
      help={[
        {
          icon: Building2,
          title: "In office, hybrid or remote",
          body: ["Engineers who want to work in SF or the Bay Area", "Remote engineers for distributed teams", "We match the setup your team uses"],
        },
        {
          icon: Clock,
          title: "Same time zone as you",
          body: ["Our team is on Pacific time too", "Calls and updates during your workday", "Quick replies when things move fast"],
        },
        {
          icon: Search,
          title: "A search run like part of your team",
          body: ["Punit or Mandeep runs it", "A small shortlist that fits", "We help you close the offer"],
        },
      ]}
      engineerTitle="Engineer in the Bay Area or moving there?"
      engineerBody="Tell us what you want next. We'll reach out when a San Francisco startup fits."
      faqs={[
        {
          q: "Do you work with startups in San Francisco?",
          a: "Yes. We help San Francisco and Bay Area startups hire engineers and sales teams for in-office, hybrid and remote roles.",
        },
        {
          q: "Are you based in San Francisco?",
          a: "Our team is based in Vancouver, on the same Pacific time as San Francisco. We work with Bay Area teams over video and phone.",
        },
        {
          q: "Can you find engineers willing to move to the Bay Area?",
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
