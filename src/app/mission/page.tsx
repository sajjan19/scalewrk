import { Compass, HeartHandshake, MessageCircle, Puzzle, Rocket, Target } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { Arrow, Button, PageHero, Section, SectionHeading } from "@/components/ui";
import { IconBadge } from "@/components/visuals";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Mission and Vision",
  description:
    "Scalewrk's mission is to help growing startups hire great engineers and help engineers find the startup where they can do their best work.",
  path: "/mission",
});

// The two big statements at the top of the page
const statements = [
  {
    icon: Target,
    label: "Our mission",
    text: "Help growing startups hire great engineers and help engineers find the startup where they can do their best work.",
  },
  {
    icon: Compass,
    label: "Our vision",
    text: "To be the first call a startup makes when it needs an engineer and the first call an engineer makes when they want something new.",
  },
];

// What we believe (bullet points, not paragraphs)
const beliefs = [
  {
    icon: Rocket,
    title: "Engineers build great startups",
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
    body: ["Founders hear the truth about the market", "Engineers hear the truth about the role"],
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
        eyebrow="Mission and vision"
        title={
          <>
            Why <span className="text-gradient">Scalewrk</span> exists.
          </>
        }
        intro="Hiring engineers is one of the most important things a startup does. We want to make it easier for both sides."
      />

      {/* Mission and vision */}
      <Section>
        <div className="grid gap-4 lg:grid-cols-2">
          {statements.map((s) => (
            <div key={s.label} className="flex flex-col rounded-3xl border border-line p-8 sm:p-10">
              <IconBadge icon={s.icon} size="lg" />
              <p className="mt-6 text-sm font-medium text-brand">{s.label}</p>
              <p className="mt-2 text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-3xl">{s.text}</p>
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
              <IconBadge icon={b.icon} />
              <p className="mt-5 text-lg font-semibold">{b.title}</p>
              <ul className="mt-3 space-y-1.5">
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
