import { Globe, MapPin, Search } from "lucide-react";
import { CityPage } from "@/components/CityPage";
import { pageMetadata } from "@/lib/metadata";
import vancouverPhoto from "../../../public/places/vancouver.jpg";

/*
  City page for Vancouver, our home city (helps startups searching "tech recruiter Vancouver" find us).
  Layout lives in CityPage.tsx. Keep the copy specific to Vancouver.
*/

export const metadata = pageMetadata({
  title: "Tech Recruiter for Vancouver Startups",
  description:
    "Scalewrk is a Vancouver-based tech recruiter helping local startups hire engineers and sales teams across Canada and the US.",
  path: "/tech-recruiter-vancouver",
});

export default function VancouverPage() {
  return (
    <CityPage
      city="Vancouver"
      headline={{ highlight: "Vancouver’s own", after: " startup recruiters." }}
      jobsLocation="Vancouver, BC"
      intro="We're based in Vancouver. We help local startups hire great engineers and salespeople. We also help those people find the right Vancouver startup."
      // Photo by Adrian Yu on Unsplash (Unsplash License)
      photo={{
        src: vancouverPhoto,
        alt: "Downtown Vancouver and False Creek with the North Shore mountains behind",
        credit: "Adrian Yu",
        creditUrl: "https://unsplash.com/photos/vancouver-skyline-and-false-creek-waterfront-Wc45W-dQFlA",
      }}
      help={[
        {
          icon: MapPin,
          title: "Local to Vancouver",
          body: ["Our team lives and works here", "We can meet you in person", "We know the local startup scene"],
        },
        {
          icon: Globe,
          title: "Hiring across Canada and the US",
          body: ["Engineers in Vancouver and across Canada", "Remote hires for distributed teams", "We match the setup your team uses"],
        },
        {
          icon: Search,
          title: "A search run like part of your team",
          body: ["Punit or Mandeep runs it", "A small shortlist that fits", "We help you close the offer"],
        },
      ]}
      engineerTitle="Engineer in Vancouver or moving here?"
      engineerBody="Tell us what you want next. We'll reach out when a Vancouver startup fits."
      faqs={[
        {
          q: "Are you based in Vancouver?",
          a: "Yes. Our team is based in Vancouver and works with startups here and across Canada and the US.",
        },
        {
          q: "Can we meet in person?",
          a: "Yes. If you're in Vancouver, we're happy to meet at your office or for a coffee.",
        },
        {
          q: "Do you only hire people in Vancouver?",
          a: "No. We find engineers and salespeople in Vancouver, across Canada and in the US, for in-office, hybrid and remote roles.",
        },
        {
          q: "What does it cost?",
          a: "It depends on the role. Book a call and we'll walk you through pricing and answer any other questions.",
        },
      ]}
    />
  );
}
