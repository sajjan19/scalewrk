import Image from "next/image";
import Link from "next/link";
import {
  BrainCircuit,
  Building2,
  CircleDollarSign,
  Code2,
  Handshake,
  HeartHandshake,
  ListChecks,
  Phone,
  Rocket,
  Sprout,
  Target,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { LogoMark } from "@/components/Logo";
import { Arrow, Button, Container, Section, SectionHeading, Text } from "@/components/ui";
import { IconBadge, StepTimeline } from "@/components/visuals";
import { bookingHref } from "@/content/site";
import { roles } from "@/content/roles";
import { founders } from "@/content/founders";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Scalewrk | Startup Tech Recruiter for Venture-Backed Startups",
  description:
    "Scalewrk is a startup tech recruiter for venture-backed companies across the US. We hire AI/ML, backend, full-stack, frontend and DevOps engineers from seed to Series C+.",
  path: "/",
  absoluteTitle: true,
});

const stages = [
  { icon: Sprout, name: "Seed", body: "Your first engineers. People who can build anything.", hires: ["Founding engineer", "Full-stack"] },
  { icon: Rocket, name: "Series A", body: "Grow the team fast without slowing down.", hires: ["Backend", "Frontend", "AI/ML"] },
  { icon: TrendingUp, name: "Series B", body: "Add experts and your first team leads.", hires: ["Tech lead", "Platform", "Data"] },
  { icon: Building2, name: "Series C+", body: "Hire more engineers and keep quality high.", hires: ["Eng manager", "Security", "Specialists"] },
];

const steps = [
  { icon: Phone, title: "Intro call", body: "20 minutes. Tell us who you need." },
  { icon: Target, title: "Plan the role", body: "We agree on skills, pay and the pitch together." },
  { icon: ListChecks, title: "Shortlist", body: "You meet a few great people. No piles of resumes." },
  { icon: Handshake, title: "Hire", body: "We help with interviews and the offer. You pay only when you hire." },
];

const reasons = [
  {
    icon: BrainCircuit,
    title: "Engineers only",
    body: "We only hire engineers. AI and machine learning is our strongest area.",
    versus: "Big agencies hire for every kind of job.",
  },
  {
    icon: UserCheck,
    title: "A co-founder on every search",
    body: "Punit or Mandeep works with you from the first call to the signed offer.",
    versus: "At big agencies, a junior recruiter often does the work.",
  },
  {
    icon: HeartHandshake,
    title: "With you for the long run",
    body: "We meet founders in person and stay with you as you grow. Every new hire gets faster.",
    versus: "Many recruiters start from zero every time.",
  },
];

// Illustrative only: shows what working with us looks like. Not real searches.
// `step` is how far along each role is (1 to 4), matching the steps in hiringSteps.
const hiringSteps = ["Planning", "Shortlist", "Interviews", "Offer"];
const exampleBoard = [
  { role: "Full-Stack Engineer", step: 1, stage: "Planning the role", tone: "bg-slate-100 text-slate-700" },
  { role: "Founding AI Engineer", step: 2, stage: "Shortlist sent", tone: "bg-brand-soft text-brand-dark" },
  { role: "Senior Backend Engineer", step: 3, stage: "Interviewing", tone: "bg-amber-50 text-amber-800" },
  { role: "Platform Engineer", step: 4, stage: "Offer out", tone: "bg-emerald-50 text-emerald-800" },
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
              We help founders hire engineers for every role, from AI/ML to DevOps. We also help engineers find
              startups where they can thrive.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={bookingHref} variant="brand">
                Book a call <Arrow />
              </Button>
              <Button href="/roles" variant="secondary">
                Roles we hire
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted">20-minute intro. You only pay when you hire.</p>
            <p className="mt-2 text-sm text-muted">
              Engineer?{" "}
              <Link href="/engineers" className="font-medium text-brand hover:text-brand-dark">
                Find your next startup →
              </Link>
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
            <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_20px_60px_-20px_rgba(11,16,32,0.25)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">What working with us looks like</p>
                  <p className="mt-0.5 text-sm text-muted">We track every role from plan to offer</p>
                </div>
                <span className="shrink-0 rounded-full border border-line px-2 py-0.5 text-xs text-muted">Example</span>
              </div>

              {/* Step labels */}
              <div className="mt-5 grid grid-cols-4 gap-1 text-center text-[11px] font-medium text-muted">
                {hiringSteps.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>

              <ul className="mt-2 divide-y divide-line">
                {exampleBoard.map((item) => (
                  <li key={item.role} className="py-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[15px] font-medium">{item.role}</span>
                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${item.tone}`}>{item.stage}</span>
                    </div>
                    {/* Progress: one segment per step */}
                    <div className="mt-2.5 grid grid-cols-4 gap-1" aria-label={`Step ${item.step} of 4`}>
                      {hiringSteps.map((label, i) => (
                        <span
                          key={label}
                          className={`h-1.5 rounded-full ${i < item.step ? "bg-gradient-to-r from-violet to-blue" : "bg-line"}`}
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex items-center gap-3 rounded-xl bg-mist p-3 text-sm text-body">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white ring-1 ring-line">
                  <LogoMark className="h-4 w-auto" />
                </span>
                One recruiting partner for every engineering role.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Who we work with */}
      <Section>
        <SectionHeading
          eyebrow="Who we work with"
          title="Startups at every stage"
          intro="From your first engineer to a full team."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage) => (
            <div key={stage.name} className="flex flex-col rounded-2xl border border-line p-6">
              <IconBadge icon={stage.icon} />
              <p className="mt-5 text-lg font-semibold">{stage.name}</p>
              <p className="mt-2 leading-relaxed text-body">{stage.body}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Typical hires">
                {stage.hires.map((h) => (
                  <li key={h} className="rounded-full bg-mist px-2.5 py-1 text-xs font-medium text-body">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section tone="mist">
        <SectionHeading eyebrow="How it works" title="From first call to signed offer" />
        <div className="mt-12">
          <StepTimeline steps={steps} />
        </div>
        <Link href="/startups" className="mt-10 inline-flex items-center gap-2 font-medium text-brand hover:text-brand-dark">
          See the full process <Arrow />
        </Link>
      </Section>

      {/* Roles */}
      <Section>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Roles we hire" title="Engineers for your whole stack" intro="With a special focus on AI and machine learning." />
          <Link href="/roles" className="inline-flex shrink-0 items-center gap-2 font-medium text-brand hover:text-brand-dark">
            All roles <Arrow />
          </Link>
        </div>
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <li key={role.slug}>
              <Link
                href={`/roles#${role.slug}`}
                className="group flex h-full items-center gap-4 rounded-2xl border border-line p-4 transition hover:border-brand/30 hover:bg-mist sm:items-start sm:p-5"
              >
                <IconBadge icon={role.icon} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2 font-semibold">
                    {role.name}
                    <span className="text-muted transition group-hover:translate-x-0.5 group-hover:text-brand">
                      <Arrow />
                    </span>
                  </span>
                  <span className="mt-1 hidden text-[15px] leading-relaxed text-body sm:block">{role.summary}</span>
                </span>
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
          intro="Engineers only. Startups only. Run by the founders."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-line sm:p-8">
              <IconBadge icon={r.icon} size="lg" />
              <p className="mt-5 text-xl font-semibold tracking-tight">{r.title}</p>
              <p className="mt-2 leading-relaxed text-body">{r.body}</p>
              <div className="mt-auto pt-6">
                <p className="border-t border-line pt-4 text-sm leading-relaxed text-muted">{r.versus}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-line">
          <IconBadge icon={CircleDollarSign} />
          <p className="text-body">
            <span className="font-semibold text-ink">No hire, no fee.</span> You only pay when you make a hire.
          </p>
        </div>
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
            <p className="text-sm font-medium text-brand">Run by the founders</p>
            <p className="mt-3 text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-3xl">
              Our co-founder Punit Singh has hired engineers since 2018 for companies like{" "}
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
          <Link href="/partners" className="group flex flex-col rounded-2xl bg-white p-8 ring-1 ring-line transition hover:ring-ink/25">
            <IconBadge icon={Handshake} size="lg" />
            <p className="mt-5 text-sm font-medium text-brand">For VCs, accelerators, lawyers and CFOs</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">Send your founders to a tech recruiter they can trust.</p>
            <span className="mt-6 inline-flex items-center gap-2 font-medium">
              Become a partner <Arrow />
            </span>
          </Link>
          <Link href="/engineers" className="group flex flex-col rounded-2xl bg-white p-8 ring-1 ring-line transition hover:ring-ink/25">
            <IconBadge icon={Code2} size="lg" />
            <p className="mt-5 text-sm font-medium text-brand">For engineers</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">Looking for your next startup? Share your profile.</p>
            <span className="mt-6 inline-flex items-center gap-2 font-medium">
              Get started <Arrow />
            </span>
          </Link>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
