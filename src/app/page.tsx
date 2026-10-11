import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { LogoMark } from "@/components/Logo";
import { Arrow, Button, Container, Section, SectionHeading, Text } from "@/components/ui";
import { bookingHref } from "@/content/site";
import { roles } from "@/content/roles";
import { founders } from "@/content/founders";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Scalewrk | Startup Tech Recruiter for Venture-Backed Startups",
  description:
    "Scalewrk is a startup tech recruiter for venture-backed companies across the US. We hire AI/ML, backend, full-stack, frontend, and DevOps engineers from seed to Series C+.",
  path: "/",
  absoluteTitle: true,
});

const stages = [
  {
    name: "Seed",
    body: "Your first engineers set the bar for everyone after them. We find builders who thrive in ambiguity and own whole problems.",
  },
  {
    name: "Series A",
    body: "You've found signal. Now the team has to grow without slowing down shipping. We run your searches in parallel so you stay focused on product.",
  },
  {
    name: "Series B",
    body: "Specialists, tech leads, and first-time managers. We hire for depth and help you build a bench that can scale.",
  },
  {
    name: "Series C+",
    body: "Hiring at volume without lowering the bar. We plug into your talent team for the hardest-to-fill technical roles.",
  },
];

const steps = [
  {
    title: "Intro call",
    body: "20 minutes. Tell us what you're building, who you need, and how fast.",
  },
  {
    title: "Role calibration",
    body: "We dig into the stack, the bar, and the pitch. You sign off on the profile before we reach out to anyone.",
  },
  {
    title: "Curated shortlist",
    body: "Vetted engineers who match the role and actually want the startup ride. No resume dumps.",
  },
  {
    title: "Interview to offer",
    body: "We run scheduling, keep candidates warm, and help you close. You pay a fee only when you hire.",
  },
];

const reasons = [
  {
    title: "Engineers only. AI is our edge.",
    body: "We don't recruit for sales, ops, or finance. Every search is technical, and AI/ML hiring is where we go deepest. We know an applied ML engineer from a research scientist, and we screen for the one you actually need.",
    versus: "Big agencies send the same recruiter to fill your engineer and your office manager.",
  },
  {
    title: "A co-founder runs your search.",
    body: "You work directly with Punit or Mandeep from kickoff to signed offer. The person who learns your company is the person talking to candidates.",
    versus: "At most agencies, the person who sells you isn't the person who recruits for you.",
  },
  {
    title: "A partner you met, not a cold email.",
    body: "We meet founders in person at tech events and build from there. Once we know your team, product, and bar, every next search starts faster. We're the recruiter you call from your first engineer to your fiftieth.",
    versus: "Transactional recruiters start from zero on every req.",
  },
];

// Illustrative only: shows what working with us looks like. Not real searches.
const exampleBoard = [
  { role: "Founding AI Engineer", stage: "Shortlist sent", tone: "bg-brand-soft text-brand-dark" },
  { role: "Senior Backend Engineer", stage: "Interviewing", tone: "bg-amber-50 text-amber-800" },
  { role: "Platform Engineer", stage: "Offer out", tone: "bg-emerald-50 text-emerald-800" },
  { role: "Full-Stack Engineer", stage: "Calibrating", tone: "bg-slate-100 text-slate-700" },
];

export default function Home() {
  const punit = founders[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-violet/20 to-blue/20 blur-3xl"
        />
        <Container className="relative grid items-center gap-12 pt-12 pb-16 sm:pt-20 sm:pb-24 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-sm text-body">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet to-blue" aria-hidden="true" />
              Seed to Series C+ startups across the US
            </p>
            <h1 className="mt-6 text-[2.75rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Tech hiring for <span className="text-gradient whitespace-nowrap">venture-backed</span> startups.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-body text-pretty sm:text-xl">
              We help founders hire AI/ML, software, and platform engineers, and help engineers find startups where
              they can thrive.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={bookingHref} variant="brand">
                Book a call <Arrow />
              </Button>
              <Button href="/roles" variant="secondary">
                Roles we hire
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted">20-minute intro. Fee per hire, so you only pay when you hire.</p>
            <p className="mt-2 text-sm text-muted">
              Engineer?{" "}
              <Link href="/engineers" className="font-medium text-brand hover:text-brand-dark">
                Find your next startup →
              </Link>
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
            <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_20px_60px_-20px_rgba(11,16,32,0.25)]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Your hiring plan</p>
                <p className="text-xs text-muted">Example</p>
              </div>
              <ul className="mt-4 divide-y divide-line">
                {exampleBoard.map((item) => (
                  <li key={item.role} className="flex items-center justify-between gap-3 py-3.5">
                    <span className="text-[15px]">{item.role}</span>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${item.tone}`}>{item.stage}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex items-center gap-3 rounded-xl bg-mist p-3 text-sm text-body">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white ring-1 ring-line">
                  <LogoMark className="h-4 w-auto" />
                </span>
                One recruiting partner across every engineering role.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Who we work with */}
      <Section>
        <SectionHeading
          eyebrow="Who we work with"
          title="Built for every stage of venture-backed growth"
          intro="Founders and CEOs of US startups who are hiring engineers and want a recruiter who already speaks their language."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage) => (
            <div key={stage.name} className="rounded-2xl border border-line p-6">
              <p className="text-lg font-semibold">{stage.name}</p>
              <p className="mt-3 leading-relaxed text-body">{stage.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section tone="mist">
        <SectionHeading eyebrow="How it works" title="From first call to signed offer" />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-2xl bg-white p-6 ring-1 ring-line">
              <span className="font-mono text-sm text-brand">0{i + 1}</span>
              <p className="mt-3 text-lg font-semibold">{step.title}</p>
              <p className="mt-2 leading-relaxed text-body">{step.body}</p>
            </li>
          ))}
        </ol>
        <Link href="/startups" className="mt-8 inline-flex items-center gap-2 font-medium text-brand hover:text-brand-dark">
          See our full process <Arrow />
        </Link>
      </Section>

      {/* Roles */}
      <Section>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Roles we hire"
            title="Engineers across your whole stack"
            intro="From founding engineers to heads of engineering, with deep focus on AI and machine learning."
          />
          <Link href="/roles" className="inline-flex shrink-0 items-center gap-2 font-medium text-brand hover:text-brand-dark">
            All roles <Arrow />
          </Link>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <li key={role.slug} className="bg-white">
              <Link href={`/roles#${role.slug}`} className="group block h-full px-6 py-4 transition hover:bg-mist sm:py-6">
                <p className="flex items-center justify-between font-semibold">
                  {role.name}
                  <span className="text-muted transition group-hover:translate-x-0.5 group-hover:text-brand">
                    <Arrow />
                  </span>
                </p>
                <p className="mt-2 hidden text-[15px] leading-relaxed text-body sm:block">{role.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Why Scalewrk */}
      <Section tone="mist">
        <SectionHeading
          eyebrow="Why Scalewrk"
          title="A specialist, not a staffing agency"
          intro="Engineers only. Startups only. Founder-led. And we stick around."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <div key={r.title} className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-line sm:p-8">
              <span className="font-mono text-sm text-brand">0{i + 1}</span>
              <p className="mt-3 text-xl font-semibold tracking-tight">{r.title}</p>
              <p className="mt-3 leading-relaxed text-body">{r.body}</p>
              <div className="mt-auto pt-6">
                <p className="border-t border-line pt-4 text-sm leading-relaxed text-muted">{r.versus}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-body">
          And it&apos;s fee per hire: <span className="font-medium text-ink">nothing up front, and you only pay when you hire.</span>
        </p>
      </Section>

      {/* Founder credibility */}
      <Section>
        <div className="grid items-center gap-8 rounded-3xl border border-line p-6 sm:p-10 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-5 flex -space-x-3">
              {founders.map((f) =>
                f.photo ? (
                  <Image
                    key={f.name}
                    src={f.photo}
                    alt={f.name}
                    width={112}
                    height={112}
                    quality={90}
                    className="h-14 w-14 rounded-full object-cover object-[60%_40%] ring-4 ring-white"
                  />
                ) : null,
              )}
            </div>
            <p className="text-sm font-medium text-brand">Founder-led</p>
            <p className="mt-3 text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-3xl">
              Our co-founder Punit Singh has recruited engineers since 2018, for companies including{" "}
              <Text>{punit.experienceAt.slice(0, 2).join(" and ")}</Text>.
            </p>
          </div>
          <Button href="/about" variant="secondary">
            Meet the founders
          </Button>
        </div>
      </Section>

      {/* Partners and engineers */}
      <Section tone="mist">
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/partners" className="group rounded-2xl bg-white p-8 ring-1 ring-line transition hover:ring-ink/25">
            <p className="text-sm font-medium text-brand">For VCs, accelerators, lawyers, and CFOs</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight">Refer your founders to a tech recruiter they&apos;ll thank you for.</p>
            <span className="mt-6 inline-flex items-center gap-2 font-medium">
              Become a partner <Arrow />
            </span>
          </Link>
          <Link href="/engineers" className="group rounded-2xl bg-white p-8 ring-1 ring-line transition hover:ring-ink/25">
            <p className="text-sm font-medium text-brand">For engineers</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight">Looking for your next startup? Get on our radar.</p>
            <span className="mt-6 inline-flex items-center gap-2 font-medium">
              Share your profile <Arrow />
            </span>
          </Link>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
