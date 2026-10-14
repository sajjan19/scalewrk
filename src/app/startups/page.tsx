import {
  Handshake,
  ListChecks,
  Phone,
  Repeat,
  Search,
  Target,
} from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { ProcessCards } from "@/components/ProcessCards";
import { CalendarIcon, Button, PageHero, Section, SectionHeading } from "@/components/ui";
import { YesNo } from "@/components/visuals";
import { bookingHref } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Technical Recruiter for Growing Startups",
  description:
    "An embedded technical recruiter for growing startups, seed to Series C+. We hire engineers and sales teams. Book a call to talk through your roles.",
  path: "/startups",
});

const process = [
  { icon: Phone, title: "Kickoff call", body: ["We learn what you're building", "Who you need first"] },
  { icon: Target, title: "Plan the role", body: ["Skills and interview steps", "Pay and the pitch", "You approve it before we start"] },
  { icon: Search, title: "Find people", body: ["People who aren't on job boards", "We screen every one first"] },
  { icon: ListChecks, title: "Shortlist", body: ["A few strong people", "Notes on why each one fits"] },
  { icon: Handshake, title: "Interview and hire", body: ["We handle scheduling", "We collect feedback", "We help you make the offer"] },
  { icon: Repeat, title: "Stay with you", body: ["We already know your team", "Every next hire starts faster"] },
];

const columns = ["In-house only", "Big agency", "Scalewrk"];

const comparison: { label: string; values: [boolean, string][] }[] = [
  {
    label: "Specializes in startup tech and sales",
    values: [
      [false, "Hires for every role"],
      [false, "Every industry"],
      [true, "Tech and sales at startups only"],
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
];

const faqs = [
  {
    q: "What roles do you hire for?",
    a: "Engineering and sales. On the tech side: AI/ML, backend, frontend, data, hardware and engineering leaders. On the sales side: account executives, SDRs, customer success, RevOps, marketing and sales leaders. See them all on our Roles page.",
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
    a: "Yes. We can take your hardest engineering and sales roles while your team handles the rest.",
  },
  {
    q: "What does it cost?",
    a: "It depends on the role. Book a call and we'll walk you through pricing and answer any other questions.",
  },
];

export default function StartupsPage() {
  return (
    <div className="theme-startup">
      <PageHero
        eyebrow="For founders and CEOs"
        title={
          <>
            Your hiring partner from <span className="text-gradient">seed to scale</span>.
          </>
        }
        intro="From your first engineer to your first sales team, we run the search so you can run the company."
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
      <Section tone="mist" id="compare">
        <SectionHeading eyebrow="How we compare" title="In-house, big agency or Scalewrk?" intro="Your three hiring options at a glance." />

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
                  <th key={col} scope="col" className={`border-l border-line p-5 font-semibold ${c === 2 ? "btn-brand" : ""}`}>
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
                    <td key={c} className={`border-l border-line p-5 text-[15px] ${c === 2 ? "bg-brand-soft/60 font-medium text-ink" : "text-body"}`}>
                      <YesNo yes={yes}>{text}</YesNo>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
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
    </div>
  );
}
