import Image from "next/image";
import Link from "next/link";
import { Building2, MapPin, Plane, Search, UserCheck } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { JobCard } from "@/components/JobCard";
import { Arrow, Button, CalendarIcon, CheckList, Container, Section, SectionHeading } from "@/components/ui";
import { IconBadge } from "@/components/visuals";
import { bookingHref } from "@/content/site";
import { roles } from "@/content/roles";
import { visibleJobs } from "@/content/jobs";
import { pageMetadata } from "@/lib/metadata";
import nyPhoto from "../../../public/places/new-york.jpg";

/*
  City page for New York (helps startups searching "tech recruiter New York" find us).
  Keep the copy specific to New York so it isn't a copy-paste of other pages.
*/

export const metadata = pageMetadata({
  title: "Tech Recruiter for New York Startups",
  description:
    "Scalewrk helps New York startups hire engineers and sales teams for in-office, hybrid and remote roles. AI/ML, backend, account executives and more.",
  path: "/tech-recruiter-new-york",
});

// The city name as it appears in job listings (src/content/jobs.ts)
const city = "New York, NY";
const cityJobs = visibleJobs.filter((j) => j.location === city);

const help = [
  {
    icon: Building2,
    title: "In office, hybrid or remote",
    body: ["Engineers who want to work in New York", "Remote engineers for distributed teams", "We match the setup your team uses"],
  },
  {
    icon: Plane,
    title: "Engineers moving to New York",
    body: ["Engineers from other cities who want to relocate", "We check timing and plans up front", "No surprises late in the process"],
  },
  {
    icon: Search,
    title: "A search run like part of your team",
    body: ["Punit or Mandeep runs it", "A small shortlist that fits", "We help you close the offer"],
  },
];

const faqs = [
  {
    q: "Do you work with startups in New York?",
    a: "Yes. We help New York startups hire engineers and sales teams for in-office, hybrid and remote roles.",
  },
  {
    q: "Are you based in New York?",
    a: "Our team is based in Vancouver. We work with New York teams over video and phone.",
  },
  {
    q: "Can you find engineers willing to move to New York?",
    a: "Yes. We ask about relocation early, so you only meet engineers whose plans fit your timeline.",
  },
  {
    q: "What does it cost?",
    a: "It depends on the role. Book a call and we'll walk you through pricing and answer any other questions.",
  },
];

export default function NewYorkPage() {
  return (
    <div className="theme-startup">
      {/* Hero: photo with the text on top. Photo by Jermaine Ee on Unsplash (Unsplash License) */}
      <section className="relative isolate overflow-hidden bg-ink">
        <Image
          src={nyPhoto}
          alt="Aerial view of Manhattan with Central Park in front"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="-z-10 object-cover object-[center_40%]"
        />
        {/* Dark layer so the white text is easy to read: even on phones, darker on the left on bigger screens */}
        <div
          className="absolute inset-0 -z-10 bg-ink/70 sm:bg-transparent sm:bg-gradient-to-r sm:from-ink/90 sm:via-ink/65 sm:to-ink/25"
          aria-hidden="true"
        />
        <Container>
          <div className="py-20 sm:py-32">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance text-white sm:text-6xl">
              Tech recruiting for <span className="text-gradient text-gradient-light">New York startups</span>.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-white/85 sm:text-xl">
              We help New York startups hire great engineers and sales teams and help them find the right New York startup.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={bookingHref} variant="brand">
                <CalendarIcon /> Book a call
              </Button>
              <Button href={`/jobs?location=${encodeURIComponent(city)}`} variant="light">
                See New York jobs <Arrow />
              </Button>
            </div>
          </div>
        </Container>
        <a
          href="https://unsplash.com/photos/new-york-central-park-A2CChTZvzTE"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-3 bottom-2 text-[11px] text-white/60 hover:text-white"
        >
          Photo: Jermaine Ee / Unsplash
        </a>
      </section>

      {/* How we help */}
      <Section>
        <SectionHeading eyebrow="How we help" title="Hiring for New York teams" />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {help.map((h) => (
            <div key={h.title} className="rounded-2xl border border-line p-6 sm:p-8">
              <IconBadge icon={h.icon} size="lg" />
              <p className="mt-5 text-xl font-semibold tracking-tight">{h.title}</p>
              <CheckList items={h.body} className="mt-4" />
            </div>
          ))}
        </div>
      </Section>

      {/* Roles */}
      <Section tone="mist">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Roles we hire" title="Engineering and sales roles" />
          <Link href="/roles" className="shrink-0 inline-flex items-center gap-2 nudge font-medium text-brand hover:text-brand-dark">
            See all {roles.length} roles <Arrow />
          </Link>
        </div>
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {roles.filter((r) => r.featured).map((role) => (
            <li key={role.slug}>
              <Link
                href={`/roles#${role.slug}`}
                className="lift group flex h-full items-center gap-4 rounded-2xl border border-line bg-white p-4 hover:border-brand/30 sm:p-5"
              >
                <IconBadge icon={role.icon} />
                <span className="flex min-w-0 flex-1 items-center justify-between gap-2 font-semibold">
                  {role.name}
                  <span className="text-muted transition-colors group-hover:text-brand">
                    <Arrow />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* New York jobs */}
      <Section className="theme-engineer">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Jobs" title="New York startups hiring now" />
          <Link href="/jobs" className="shrink-0 inline-flex items-center gap-2 nudge font-medium text-brand hover:text-brand-dark">
            View all jobs <Arrow />
          </Link>
        </div>
        {cityJobs.length > 0 ? (
          <ul className="mt-10 space-y-3">
            {cityJobs.map((job) => (
              <li key={job.slug}>
                <JobCard job={job} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-10 rounded-2xl border border-line p-6 text-body">
            No New York jobs right now. Share your profile and we&apos;ll reach out when one fits.
          </p>
        )}
      </Section>

      {/* For engineers */}
      <Section tone="mist" className="theme-engineer">
        <div className="grid items-center gap-8 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-10 lg:grid-cols-[1fr_auto]">
          <div className="flex items-start gap-5">
            <IconBadge icon={MapPin} size="lg" />
            <div>
              <p className="text-2xl font-semibold tracking-tight">Engineer in New York or moving there?</p>
              <p className="mt-2 max-w-2xl leading-relaxed text-body">
                Tell us what you want next. We&apos;ll reach out when a New York startup fits.
              </p>
            </div>
          </div>
          <Button href="/share-profile" variant="secondary">
            <UserCheck className="h-4 w-4" aria-hidden="true" /> Share your profile
          </Button>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeading eyebrow="FAQ" title="Questions New York founders ask us" />
        <div className="mt-10 divide-y divide-line rounded-2xl ring-1 ring-line">
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

      <CtaBand title="Hiring in New York?" />
    </div>
  );
}
