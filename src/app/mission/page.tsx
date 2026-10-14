import { Compass, HeartHandshake, MessageCircle, Puzzle, Rocket, Target } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { Arrow, Button, PageHero, Section, SectionHeading } from "@/components/ui";
import { IconBadge } from "@/components/visuals";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Mission & Vision",
  description:
    "Scalewrk's mission is to help growing startups hire great engineers and sales teams and help them find the startup where they can do their best work.",
  path: "/mission",
});

// The two big statements at the top of the page
const statements = [
  {
    icon: Target,
    label: "Our mission",
    text: "Help growing startups hire great engineers and sales teams and help them find the startup where they can do their best work.",
  },
  {
    icon: Compass,
    label: "Our vision",
    text: "To be the first call a startup makes when it needs to grow its team and the first call a candidate makes when they want something new.",
  },
];

// What we believe (bullet points, not paragraphs)
const beliefs = [
  {
    icon: Rocket,
    title: "People build great startups",
    body: ["Your first hires shape the company", "Getting them right matters most"],
  },
  {
    icon: Puzzle,
    title: "The right fit beats a fast fill",
    body: ["Skills, stage and goals all have to match", "A good fit lasts longer"],
  },
  {
    icon: MessageCircle,
    title: "Both sides deserve honesty",
    body: ["Founders hear the truth about the market", "Candidates hear the truth about the role"],
  },
  {
    icon: HeartHandshake,
    title: "Hiring is a relationship",
    body: ["We learn your company once", "We stay with you as you grow"],
  },
];

export default function MissionPage() {
  return (
    <>
      <PageHero
        eyebrow="Mission & Vision"
        title={
          <>
            Why <span className="text-gradient">Scalewrk</span> exists.
          </>
        }
        intro="Hiring the people who build and sell is one of the most important things a startup does. We want to make it easier for both sides."
      />

      {/* Mission and vision */}
      <Section>
        <div className="grid gap-4 lg:grid-cols-2">
          {statements.map((s) => (
            <div key={s.label} className="flex flex-col rounded-3xl border border-line p-8 sm:p-10">
              <div className="flex items-center gap-4">
                <IconBadge icon={s.icon} size="lg" />
                <p className="text-xl leading-tight font-semibold tracking-tight text-brand">{s.label}</p>
              </div>
              <p className="mt-5 text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-3xl">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* What we believe */}
      <Section tone="mist">
        <SectionHeading eyebrow="What we believe" title="The ideas behind every search" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {beliefs.map((b) => (
            <div key={b.title} className="rounded-2xl bg-white p-6 ring-1 ring-line">
              <div className="flex items-center gap-4">
                <IconBadge icon={b.icon} size="lg" />
                <p className="text-lg leading-tight font-semibold tracking-tight">{b.title}</p>
              </div>
              <ul className="mt-4 space-y-1.5">
                {b.body.map((point) => (
                  <li key={point} className="flex gap-2 leading-snug text-body">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-r from-violet to-blue" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/about" variant="secondary">
            Meet the team <Arrow />
          </Button>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
