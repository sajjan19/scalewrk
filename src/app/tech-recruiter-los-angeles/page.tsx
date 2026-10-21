import { Building2, Clock, Search } from "lucide-react";
import { CityPage } from "@/components/CityPage";
import { pageMetadata } from "@/lib/metadata";
import losAngelesPhoto from "../../../public/places/los-angeles.jpg";

/*
  City page for Los Angeles (helps startups searching "tech recruiter Los Angeles" find us).
  Layout lives in CityPage.tsx. Keep the copy specific to Los Angeles.
*/

export const metadata = pageMetadata({
  title: "Tech Recruiter for Los Angeles Startups",
  description:
    "Scalewrk helps Los Angeles startups hire engineers and sales teams, from Silicon Beach to downtown LA.",
  path: "/tech-recruiter-los-angeles",
});

export default function LosAngelesPage() {
  return (
    <CityPage
      city="Los Angeles"
      jobsLocation="Los Angeles, CA"
      intro="From Silicon Beach in Santa Monica to downtown, LA startups mix tech with media, entertainment and commerce. We help Los Angeles startups hire great engineers and salespeople. We also help those people find their next LA startup."
      // Photo by Cedric Letsch on Unsplash (Unsplash License)
      photo={{
        src: losAngelesPhoto,
        alt: "Palm trees in front of the downtown Los Angeles skyline at sunset",
        credit: "Cedric Letsch",
        creditUrl: "https://unsplash.com/photos/los-angeles-skyline-with-palm-trees-UZVlSjrIJ3o",
      }}
      help={[
        {
          icon: Building2,
          title: "In office, hybrid or remote",
          body: ["Engineers who want to work in Los Angeles", "Remote hires for distributed teams", "We match the setup your team uses"],
        },
        {
          icon: Clock,
          title: "Same time zone as you",
          body: ["Our team is on Pacific time too", "Calls and updates during your workday", "Quick replies when things move fast"],
        },
        {
          icon: Search,
          title: "A search run like part of your team",
          body: ["Punit runs every search", "A small shortlist that fits", "We help you close the offer"],
        },
      ]}
      engineerTitle="Engineer in LA or moving there?"
      engineerBody="Tell us what you want next. We'll reach out when a Los Angeles startup fits."
      faqs={[
        {
          q: "Do you work with startups in Los Angeles?",
          a: "Yes. We help LA startups hire engineers and sales teams for in-office, hybrid and remote roles.",
        },
        {
          q: "Are you based in Los Angeles?",
          a: "Our team is based in Vancouver, on the same Pacific time as LA. We work with Los Angeles teams over video and phone.",
        },
        {
          q: "Can you find people who know consumer and media products?",
          a: "Yes. We look for engineers and salespeople who have worked on products like yours, so they get up to speed quickly.",
        },
        {
          q: "What does it cost?",
          a: "It depends on the role. Book a call and we'll walk you through pricing and answer any other questions.",
        },
      ]}
    />
  );
}
