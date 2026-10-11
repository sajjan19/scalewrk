import { CtaBand } from "@/components/CtaBand";
import { Arrow, Button, CheckList, PageHero, Section, SectionHeading, Text } from "@/components/ui";
import { bookingHref } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Technical Recruiter for Venture-Backed Startups",
  description:
    "An embedded technical recruiter for venture-backed startups, seed to Series C+. Specialist engineering hiring on a fee-per-hire model: you only pay when you hire.",
  path: "/startups",
});

const process = [
  {
    title: "Kickoff call",
    body: "We learn what you're building, where the company is headed, and which hires matter most this quarter.",
  },
  {
    title: "Calibrate the role",
    body: "Together we define must-haves vs. nice-to-haves, interview stages, comp range, and the story that will win candidates. You approve the profile before outreach starts.",
  },
  {
    title: "Source and screen",
    body: "We go well beyond job boards to reach engineers who aren't actively looking. Every candidate gets a technical and motivation screen from us before you see them.",
  },
  {
    title: "Shortlist",
    body: "You get a small set of candidates with clear notes on why each one fits, what to probe in interviews, and what they care about.",
  },
  {
    title: "Interview and close",
    body: "We handle scheduling, collect feedback fast, keep candidates engaged, and help you shape and negotiate the offer.",
  },
  {
    title: "Stay on as you scale",
    body: "Once we know your team, every next search starts faster. We become the recruiter you call for every engineering hire.",
  },
];

const comparison = {
  columns: ["In-house only", "Big agency", "Scalewrk"],
  rows: [
    {
      label: "Focus",
      values: ["Every role at the company", "Every industry, every function", "Engineers at venture-backed startups"],
    },
    {
      label: "Who does the work",
      values: ["Founders or one stretched recruiter", "Account managers and junior sourcers", "A Scalewrk co-founder, directly"],
    },
    {
      label: "Candidates you see",
      values: ["Whoever applies", "High volume, loose fit", "Small, calibrated shortlists"],
    },
    {
      label: "Startup context",
      values: ["Strong, but limited reach", "Often missing", "Built in: stage, equity, and risk"],
    },
    {
      label: "Cost",
      values: ["Salaries and tools, hiring or not", "Fee per hire", "Fee per hire, nothing up front"],
    },
  ],
};

const faqs = [
  {
    q: "What roles do you hire for?",
    a: "Technical roles only: AI/ML, backend, full-stack, frontend, DevOps and platform, data, mobile, security, and engineering leadership. See the full list on our Roles page.",
  },
  {
    q: "Where are the startups you work with?",
    a: "We work with venture-backed startups across the US, for remote, hybrid, and onsite roles.",
  },
  {
    q: "How fast will we see candidates?",
    a: "It depends on the role and the market. We'll give you a realistic timeline on our first call, and we'll tell you up front if a search is going to be hard.",
  },
  {
    q: "Can you work alongside our in-house recruiter or talent team?",
    a: "Yes. We can take on your hardest technical searches while your in-house team covers everything else.",
  },
  {
    q: "What does it cost?",
    a: "We work on a fee-per-hire basis. You pay a one-time fee only when you make a hire. We'll walk through the exact terms on our intro call.",
  },
];

export default function StartupsPage() {
  return (
    <>
      <PageHero
        eyebrow="For founders and CEOs"
        title="Your embedded hiring partner, from seed to scale."
        intro="Hiring engineers is the most important thing you'll do this year, and the easiest to get wrong. Scalewrk runs your technical searches like part of your team, so you can stay focused on building."
      >
        <Button href={bookingHref}>
          Book a call <Arrow />
        </Button>
      </PageHero>

      {/* Process */}
      <Section>
        <SectionHeading eyebrow="Our process" title="How a search works with Scalewrk" />
        <ol className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {process.map((step, i) => (
            <li key={step.title} className="border-t border-line pt-6">
              <span className="font-mono text-sm text-brand">0{i + 1}</span>
              <p className="mt-2 text-lg font-semibold">{step.title}</p>
              <p className="mt-2 leading-relaxed text-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Comparison */}
      <Section tone="mist">
        <SectionHeading
          eyebrow="Why a specialist"
          title="In-house, big agency, or a specialist tech recruiter?"
          intro="Each has its place. Here's where Scalewrk fits."
        />

        {/* Phones: one card per option */}
        <div className="mt-10 space-y-4 md:hidden">
          {comparison.columns.map((col, c) => (
            <div key={col} className={`rounded-2xl p-6 ${c === 2 ? "bg-ink text-white" : "bg-white ring-1 ring-line"}`}>
              <p className="text-lg font-semibold">{col}</p>
              <dl className="mt-4 space-y-3">
                {comparison.rows.map((row) => (
                  <div key={row.label}>
                    <dt className={`text-sm ${c === 2 ? "text-white/60" : "text-muted"}`}>{row.label}</dt>
                    <dd className={c === 2 ? "text-white" : "text-body"}>{row.values[c]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        {/* Tablet and up: table */}
        <div className="mt-12 hidden overflow-hidden rounded-2xl bg-white ring-1 ring-line md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="w-1/4 p-5" />
                {comparison.columns.map((col, c) => (
                  <th key={col} scope="col" className={`p-5 font-semibold ${c === 2 ? "bg-ink text-white" : ""}`}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row.label} className="border-b border-line last:border-0">
                  <th scope="row" className="p-5 text-sm font-medium text-muted">
                    {row.label}
                  </th>
                  {row.values.map((v, c) => (
                    <td key={c} className={`p-5 ${c === 2 ? "bg-ink font-medium text-white" : "text-body"}`}>
                      {v}
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
            eyebrow="Engagement model"
            title="Fee per hire. Nothing up front."
            intro="You pay a one-time fee only when you make a hire. No retainers, no monthly subscription, no cost to get started."
          />
          <div className="rounded-2xl border border-line p-6 sm:p-8">
            <dl className="divide-y divide-line">
              <div className="flex flex-col gap-1 pb-5 sm:flex-row sm:justify-between">
                <dt className="font-medium">Fee</dt>
                <dd className="text-body">
                  <Text>[PLACEHOLDER: e.g. X% of first-year base salary]</Text>
                </dd>
              </div>
              <div className="flex flex-col gap-1 py-5 sm:flex-row sm:justify-between">
                <dt className="font-medium">When it&apos;s due</dt>
                <dd className="text-body">
                  <Text>[PLACEHOLDER: e.g. on candidate start date]</Text>
                </dd>
              </div>
              <div className="flex flex-col gap-1 pt-5 sm:flex-row sm:justify-between">
                <dt className="font-medium">Replacement guarantee</dt>
                <dd className="text-body">
                  <Text>[PLACEHOLDER: e.g. 90 days]</Text>
                </dd>
              </div>
            </dl>
            <CheckList
              className="mt-8 border-t border-line pt-6"
              items={[
                "No hire, no fee",
                "Run one search or every engineering search",
                "Works alongside your in-house team",
              ]}
            />
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
