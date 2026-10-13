import {
  CalendarCheck,
  CircleDollarSign,
  Handshake,
  ListChecks,
  Phone,
  Repeat,
  Search,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { ProcessCards } from "@/components/ProcessCards";
import { CalendarIcon, Button, PageHero, Section, SectionHeading, Text } from "@/components/ui";
import { IconBadge, YesNo } from "@/components/visuals";
import { bookingHref } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Technical Recruiter for Growing Startups",
  description:
    "An embedded technical recruiter for growing startups, seed to Series C+. We only hire engineers and you only pay when you hire.",
  path: "/startups",
});

const process = [
  { icon: Phone, title: "Kickoff call", body: ["We learn what you're building", "Who you need first"] },
  { icon: Target, title: "Plan the role", body: ["Skills and interview steps", "Pay and the pitch", "You approve it before we start"] },
  { icon: Search, title: "Find people", body: ["Engineers who aren't on job boards", "We screen every one first"] },
  { icon: ListChecks, title: "Shortlist", body: ["A few strong people", "Notes on why each one fits"] },
  { icon: Handshake, title: "Interview and hire", body: ["We handle scheduling", "We collect feedback", "We help you make the offer"] },
  { icon: Repeat, title: "Stay with you", body: ["We already know your team", "Every next hire starts faster"] },
];

const columns = ["In-house only", "Big agency", "Scalewrk"];

const comparison: { label: string; values: [boolean, string][] }[] = [
  {
    label: "Only hires engineers",
    values: [
      [false, "Hires for every role"],
      [false, "Every industry"],
      [true, "Engineers at startups only"],
    ],
  },
  {
    label: "Who runs your search",
    values: [
      [false, "Often the founders"],
      [false, "Often a junior recruiter"],
      [true, "Punit or Mandeep, start to finish"],
    ],
  },
  {
    label: "Small shortlist that fits",
    values: [
      [false, "Whoever applies"],
      [false, "Lots of resumes"],
      [true, "A few great matches"],
    ],
  },
  {
    label: "Understands startups",
    values: [
      [true, "Yes, but limited reach"],
      [false, "Often not"],
      [true, "Stage, equity and risk"],
    ],
  },
  {
    label: "Pay only when you hire",
    values: [
      [false, "Salaries, hiring or not"],
      [true, "Fee per hire"],
      [true, "Fee per hire"],
    ],
  },
];

const terms = [
  { icon: CircleDollarSign, label: "Fee", value: "[PLACEHOLDER: e.g. X% of first-year base salary]" },
  { icon: CalendarCheck, label: "When you pay", value: "[PLACEHOLDER: e.g. on the start date]" },
  { icon: ShieldCheck, label: "Replacement guarantee", value: "[PLACEHOLDER: e.g. 90 days]" },
];

const faqs = [
  {
    q: "What roles do you hire for?",
    a: "Only technical roles: from AI/ML, backend and frontend to QA, hardware, robotics and engineering leaders. See all of them on our Roles page.",
  },
  {
    q: "Where are the startups you work with?",
    a: "Across the US and Canada. We hire for remote, hybrid and in-office roles.",
  },
  {
    q: "How fast will we see candidates?",
    a: "It depends on the role. We'll give you an honest timeline on the first call. If a role will be hard to fill, we'll tell you up front.",
  },
  {
    q: "Can you work with our in-house recruiter?",
    a: "Yes. We can take your hardest engineering roles while your team handles the rest.",
  },
  {
    q: "What does it cost?",
    a: "You pay a one-time fee only when you make a hire. We'll go over the exact terms on the intro call.",
  },
];

export default function StartupsPage() {
  return (
    <>
      <PageHero
        eyebrow="For founders and CEOs"
        title={
          <>
            Your hiring partner from <span className="text-gradient">seed to scale</span>.
          </>
        }
        intro="Hiring engineers is one of the most important things you'll do. We run your searches like part of your team, so you can focus on building."
      >
        <Button href={bookingHref} variant="brand">
          <CalendarIcon /> Book a call
        </Button>
      </PageHero>

      {/* Process */}
      <Section>
        <SectionHeading eyebrow="Our process" title="How a search works" />
        <div className="mt-12">
          <ProcessCards steps={process} cols={3} ongoingLast />
        </div>
      </Section>

      {/* Comparison */}
      <Section tone="mist">
        <SectionHeading eyebrow="Why Scalewrk" title="In-house, big agency or Scalewrk?" intro="Here's how they compare." />

        {/* Phones: one card per option */}
        <div className="mt-10 space-y-4 md:hidden">
          {columns.map((col, c) => (
            <div key={col} className={`rounded-2xl bg-white p-6 ${c === 2 ? "ring-2 ring-brand" : "ring-1 ring-line"}`}>
              <p className="text-lg font-semibold">{col}</p>
              <ul className="mt-4 space-y-3 text-body">
                {comparison.map((row) => (
                  <li key={row.label}>
                    <YesNo yes={row.values[c][0]}>{row.values[c][1]}</YesNo>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tablet and up: grid */}
        <div className="mt-12 hidden overflow-hidden rounded-2xl bg-white ring-1 ring-line md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="w-1/4 p-5" />
                {columns.map((col, c) => (
                  <th key={col} scope="col" className={`p-5 font-semibold ${c === 2 ? "btn-brand" : ""}`}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label} className="border-b border-line last:border-0">
                  <th scope="row" className="p-5 text-sm font-medium">
                    {row.label}
                  </th>
                  {row.values.map(([yes, text], c) => (
                    <td key={c} className={`p-5 text-[15px] ${c === 2 ? "bg-brand-soft/60 font-medium text-ink" : "text-body"}`}>
                      <YesNo yes={yes}>{text}</YesNo>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Engagement model */}
      <Section id="pricing">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Pricing"
            title="No hire, no fee."
            intro="You pay a one-time fee only when you make a hire. No retainer. No monthly cost. Nothing to start."
          />
          <div className="space-y-3">
            {terms.map((t) => (
              <div key={t.label} className="flex items-center gap-4 rounded-2xl border border-line p-5">
                <IconBadge icon={t.icon} />
                <div>
                  <p className="font-medium">{t.label}</p>
                  <p className="text-body">
                    <Text>{t.value}</Text>
                  </p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-4 rounded-2xl border border-line p-5">
              <IconBadge icon={Users} />
              <p className="text-body">Hire one engineer or your whole team. Works alongside your in-house team.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="mist">
        <SectionHeading eyebrow="FAQ" title="Questions founders ask us" />
        <div className="mt-10 divide-y divide-line rounded-2xl bg-white ring-1 ring-line">
          {faqs.map((f) => (
            <details key={f.q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium">
                {f.q}
                <span className="text-2xl leading-none text-muted transition group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-body">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
