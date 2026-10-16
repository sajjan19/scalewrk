import Image from "next/image";
import Link from "next/link";
import {
  UserRound,
  Handshake,
  HeartHandshake,
  ListChecks,
  Phone,
  Rocket,
  Sparkles,
  Target,
  UserCheck,
} from "lucide-react";
import { ClientsSection, FounderExperienceStrip } from "@/components/Credibility";
import { CtaBand } from "@/components/CtaBand";
import { HeroNetwork } from "@/components/HeroNetwork";
import { RoleTiles, SeeAllRolesLink } from "@/components/RoleTiles";
import { quickRoles, showQuickRoles, showRolePreview } from "@/content/roles";
import { JobCard } from "@/components/JobCard";
import { Testimonials } from "@/components/Testimonials";
import { LogoMark } from "@/components/Logo";
import { Arrow, CalendarIcon, Button, CheckList, Container, Section, SectionHeading } from "@/components/ui";
import { IconBadge } from "@/components/visuals";
import { ProcessCards } from "@/components/ProcessCards";
import { bookingHref } from "@/content/site";
import { hasOpenJobs, latestJobs } from "@/content/jobs";
import { founderId, founders } from "@/content/founders";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Scalewrk | Startup Tech Recruiter for Growing Companies",
  description:
    "Scalewrk is a startup tech recruiter for growing companies across the US and Canada. We hire engineers and sales teams, from AI/ML and backend to account executives, from seed to Series C+.",
  path: "/",
  absoluteTitle: true,
});

// "What we do" section, right under the hero: one card per audience
const whatWeDo = [
  {
    icon: Rocket,
    theme: "theme-startup",
    audience: "For Startups",
    title: "We hire your team for you",
    body: ["Engineering and sales roles", "We find and screen every candidate", "We help you close the offer"],
    href: "/startups",
    link: "How we work with startups",
  },
  {
    icon: UserRound,
    theme: "theme-engineer",
    audience: "For Candidates",
    title: "We find your next startup",
    body: ["We learn what you want next", "We match you with startups that fit", "We guide you through every step"],
    href: "/engineers",
    link: "How we work with candidates",
  },
];

const steps = [
  // Same wording as the process on the For Startups page
  { icon: Phone, title: "Kickoff call", body: ["We learn what you're building", "Who you need first"] },
  { icon: Target, title: "Plan the role", body: ["Skills and interview steps", "Pay and the pitch", "You approve it before we start"] },
  { icon: ListChecks, title: "Shortlist", body: ["A few strong people", "Notes on why each one fits"] },
  { icon: Handshake, title: "Interview and hire", body: ["We handle scheduling", "We collect feedback", "We help you make the offer"] },
];

const reasons = [
  {
    icon: Sparkles,
    title: "Tech and sales only",
    body: "We only hire engineers and salespeople, the people who build and sell your product.",
    versus: "Big agencies hire for every kind of job.",
  },
  {
    icon: UserCheck,
    title: "The same people on every search",
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

// Hero "progress tracker" card (beside the headline). Hidden for now; set to true to bring it back.
const showHeroTracker = false;

// Illustrative only: shows what working with us looks like. Not real searches.
// `step` is how far along each role is (1 to 4), matching the steps in hiringSteps.
const hiringSteps = ["Planning", "Shortlist", "Interviews", "Offer"];
const exampleBoard = [
  { role: "Full-Stack Engineer", step: 1, stage: "Planning the role", tone: "bg-slate-100 text-slate-700" },
  { role: "Founding AI Engineer", step: 2, stage: "Shortlist sent", tone: "bg-brand-soft text-brand-dark" },
  { role: "Senior Backend Engineer", step: 3, stage: "Interviewing", tone: "bg-amber-50 text-amber-800" },
  { role: "Founding Account Executive", step: 4, stage: "Offer out", tone: "bg-emerald-50 text-emerald-800" },
];

// ["A", "B", "C"] → "A, B and C"
function listWithAnd(items: string[]) {
  return items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

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
        <Container className="relative grid items-center gap-8 pt-8 pb-12 sm:gap-12 sm:pt-20 sm:pb-24 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-sm text-body">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet to-blue" aria-hidden="true" />
              <span className="sm:hidden">Seed to Series C+ · US and Canada</span>
              <span className="hidden sm:inline">Seed to Series C+ startups across the US and Canada</span>
            </p>
            {/* One sentence per line, never wrapping (the size shrinks on small phones so it fits) */}
            <h1 className="mt-5 text-[clamp(1.75rem,9vw,2.75rem)] leading-[1.08] font-semibold tracking-tight sm:mt-6 sm:text-6xl">
              <span className="block whitespace-nowrap">
                Built to <span className="text-gradient">Scale</span>.
              </span>
              <span className="block whitespace-nowrap">
                Powered by <span className="text-gradient">Talent</span>.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-body text-pretty sm:text-xl">
              AI-powered sourcing. Human expertise. Exceptional talent, delivered faster.
            </p>
            {/* One button per audience: startups book a call, candidates go to For Candidates.
                Side by side on every screen; on phones they share the width and "Find a role" is shorter */}
            <div className="mt-7 flex gap-2 sm:mt-8 sm:gap-3">
              <Button href={bookingHref} variant="brand" className="flex-1 sm:flex-none">
                <CalendarIcon /> Book a call
              </Button>
              <Button href="/engineers" variant="secondary" className="flex-1 sm:flex-none">
                <span className="sm:hidden">Find a role</span>
                <span className="hidden sm:inline">Find your next role</span> <Arrow />
              </Button>
            </div>
          </div>

          {showHeroTracker && (
          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
            <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_20px_60px_-20px_rgba(11,16,32,0.25)]">
              <p className="font-semibold">We track every role from plan to offer</p>

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
                One recruiting partner for every tech and sales role.
              </div>
            </div>
          </div>
          )}

          {/* Network illustration: startups and candidates linked through Scalewrk */}
          {!showHeroTracker && <HeroNetwork />}
        </Container>
      </section>

      {/* What we do */}
      <Section tone="mist">
        <SectionHeading eyebrow="What we do" title="We bring startups and great people together" />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {whatWeDo.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`lift group flex flex-col rounded-2xl border border-line bg-white p-5 hover:border-brand/30 sm:p-8 ${item.theme}`}
            >
              <div className="flex items-center gap-4">
                <IconBadge icon={item.icon} size="lg" />
                <div>
                  <p className="text-sm font-medium text-brand">{item.audience}</p>
                  <p className="text-xl leading-tight font-semibold tracking-tight">{item.title}</p>
                </div>
              </div>
              <CheckList items={item.body} className="mt-5" />
              <span className="mt-auto inline-flex items-center gap-2 pt-6 font-medium text-brand group-hover:text-brand-dark">
                {item.link} <Arrow />
              </span>
            </Link>
          ))}
        </div>

        {/* Quick look at the roles we often hire (list in roles.ts → quickRoles). Hidden for now */}
        {showQuickRoles && (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <p className="shrink-0 text-sm font-medium text-muted">Roles we often hire:</p>
          <ul className="flex flex-wrap gap-2">
            {quickRoles.map((r) => (
              <li key={r} className="rounded-full bg-white px-3 py-1 text-sm font-medium text-body ring-1 ring-line">
                {r}
              </li>
            ))}
          </ul>
        </div>
        )}
      </Section>

      {/* Past employers (founders' experience) and, once real, clients */}
      <FounderExperienceStrip />
      <ClientsSection />

      {/* How it works */}
      <Section tone="mist" className="theme-startup">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="How it works" title="From first call to signed offer" />
          <Link href="/startups" className="shrink-0 inline-flex items-center gap-2 nudge font-medium text-brand hover:text-brand-dark">
            See the full process <Arrow />
          </Link>
        </div>
        <div className="mt-12">
          <ProcessCards steps={steps} cols={4} />
        </div>
      </Section>

      {/* Why Scalewrk */}
      <Section className="theme-startup">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Why Scalewrk"
            title="Recruiting that knows engineering"
            intro="Tech and sales roles. Startups only. Every search run by Punit or Mandeep."
          />
          <Link href="/startups#compare" className="shrink-0 inline-flex items-center gap-2 nudge font-medium text-brand hover:text-brand-dark">
            See how we compare <Arrow />
          </Link>
        </div>
        {/* Phones and tablets: swipeable row. Desktop: 3 across */}
        <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:mt-12 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
          {reasons.map((r) => (
            <div key={r.title} className="flex w-[82%] shrink-0 snap-start flex-col rounded-2xl bg-white p-5 ring-1 ring-line sm:w-[60%] sm:p-8 lg:w-auto">
              <div className="flex items-center gap-4">
                <IconBadge icon={r.icon} size="lg" />
                <p className="text-xl leading-tight font-semibold tracking-tight">{r.title}</p>
              </div>
              <p className="mt-4 leading-relaxed text-body">{r.body}</p>
              <div className="mt-auto pt-6">
                <p className="border-t border-line pt-4 text-sm leading-relaxed text-muted">{r.versus}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Founders: who runs every search (same heading style as Roles) */}
      <Section tone="mist">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Our team"
            title="Who you'll work with"
            intro={`Our founder Punit Singh has recruited since 2018 for companies like ${listWithAnd(punit.experienceAt)}.`}
          />
          <Link href="/about" className="shrink-0 inline-flex items-center gap-2 nudge font-medium text-brand hover:text-brand-dark">
            Meet the team <Arrow />
          </Link>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {founders.map((f) => {
            const background = f.experienceAt.length
              ? `Recruited for ${listWithAnd(f.experienceAt)}`
              : f.previouslyAt?.length
                ? `Previously at ${listWithAnd(f.previouslyAt)}`
                : null;
            return (
              <li key={f.name}>
                <Link
                  href={`/about#${founderId(f.name)}`}
                  className="lift group flex h-full items-center gap-5 rounded-2xl bg-white p-6 ring-1 ring-line hover:ring-brand/30"
                >
                  {f.photo ? (
                    <Image
                      src={f.photo}
                      alt={f.name}
                      width={160}
                      height={160}
                      quality={90}
                      className="h-20 w-20 flex-none rounded-full object-cover object-[60%_40%]"
                    />
                  ) : (
                    <span className="btn-brand flex h-20 w-20 flex-none items-center justify-center rounded-full text-xl font-semibold" aria-hidden="true">
                      {f.initials}
                    </span>
                  )}
                  <div className="flex-1">
                    <p className="text-lg font-semibold group-hover:text-brand">{f.name}</p>
                    <p className="text-body">{f.title}</p>
                    {background && <p className="mt-1 text-sm text-muted">{background}</p>}
                  </div>
                  <span className="text-muted transition-colors group-hover:text-brand">
                    <Arrow />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Roles we hire (preview tiles). Hidden for now, see showRolePreview in roles.ts */}
      {showRolePreview && (
      <Section className="theme-startup">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Roles we hire" title="Engineering and sales roles" intro="From AI engineers to founding account executives." />
          <SeeAllRolesLink />
        </div>
        <RoleTiles />
      </Section>
      )}

      {/* Latest jobs (newest 3 from src/content/jobs.ts). Hidden until there are jobs */}
      {hasOpenJobs && (
      <Section tone={showRolePreview ? "mist" : "white"} className="theme-engineer">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Latest jobs" title="Startups hiring now" intro="The newest roles we're hiring for." />
          <Link href="/jobs" className="shrink-0 inline-flex items-center gap-2 nudge font-medium text-brand hover:text-brand-dark">
            View all jobs <Arrow />
          </Link>
        </div>
        <ul className="mt-10 space-y-3">
          {latestJobs(3).map((job) => (
            <li key={job.slug}>
              <JobCard job={job} />
            </li>
          ))}
        </ul>
      </Section>
      )}

      {/* Testimonials (src/content/testimonials.ts) */}
      {/* Testimonials: the opposite background of whatever section sits right before it */}
      <Testimonials tone={hasOpenJobs ? (showRolePreview ? "white" : "mist") : showRolePreview ? "mist" : "white"} />

      <CtaBand />
    </>
  );
}
