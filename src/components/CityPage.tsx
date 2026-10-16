import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { MapPin, UserCheck, type LucideIcon } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { RoleTiles, SeeAllRolesLink } from "@/components/RoleTiles";
import { showRolePreview } from "@/content/roles";
import { JobCard } from "@/components/JobCard";
import { Arrow, Button, CalendarIcon, CheckList, Container, Section, SectionHeading } from "@/components/ui";
import { IconBadge } from "@/components/visuals";
import { HeroScroll } from "@/components/HeroScroll";
import { bookingHref } from "@/content/site";
import { visibleJobs } from "@/content/jobs";

/*
  Shared layout for the city pages (New York, San Francisco, Vancouver).
  Each city page passes its own copy, so the pages aren't copy-pastes of each other.
  Sections: photo hero, How we help (3 cards), roles preview (hidden for now), city jobs (only when there are some),
  "Engineer in <city>?" card, FAQ, CTA band.
*/
export type CityPageProps = {
  city: string; // "New York"
  jobsLocation: string; // the location as written in jobs.ts, e.g. "New York, NY"
  intro: string;
  // credit and creditUrl are kept for our records only (the Unsplash License does not require showing them)
  photo?: { src: StaticImageData; alt: string; credit: string; creditUrl: string; position?: string };
  help: { icon: LucideIcon; title: string; body: string[] }[];
  engineerTitle: string;
  engineerBody: string;
  faqs: { q: string; a: string }[];
};

export function CityPage({ city, jobsLocation, intro, photo, help, engineerTitle, engineerBody, faqs }: CityPageProps) {
  const cityJobs = visibleJobs.filter((j) => j.location === jobsLocation);
  return (
    <div className="theme-startup">
      {/* Hero: photo with the text on top (dark brand background until there's a photo) */}
      <section className="relative isolate overflow-hidden bg-ink">
        {/* Scroll effect: the photo drifts down and zooms in a little as you scroll, the text fades out (HeroScroll.tsx) */}
        <HeroScroll />
        {photo && (
          <div
            className="absolute inset-0 -z-10 will-change-transform"
            style={{ transform: "translate3d(0, calc(var(--hero-p, 0) * 30%), 0) scale(calc(1.05 + var(--hero-p, 0) * 0.1))" }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              placeholder="blur"
              sizes="100vw"
              className={`object-cover ${photo.position ?? "object-center"}`}
            />
          </div>
        )}
        {/* Dark layer so the white text is easy to read: even on phones, darker on the left on bigger screens */}
        <div
          className="absolute inset-0 -z-10 bg-ink/70 sm:bg-transparent sm:bg-gradient-to-r sm:from-ink/90 sm:via-ink/65 sm:to-ink/25"
          aria-hidden="true"
        />
        {!photo && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-violet/40 to-blue/40 blur-3xl"
          />
        )}
        <Container>
          <div
            className="py-20 sm:py-32"
            style={{ opacity: "calc(1 - var(--hero-p, 0) * 1.4)", transform: "translate3d(0, calc(var(--hero-p, 0) * -60px), 0)" }}
          >
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance text-white sm:text-6xl">
              Tech recruiting for <span className="text-gradient text-gradient-light">{city} startups</span>.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-white/85 sm:text-xl">{intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={bookingHref} variant="brand">
                <CalendarIcon /> Book a call
              </Button>
              {cityJobs.length > 0 && (
                <Button href={`/jobs?location=${encodeURIComponent(jobsLocation)}`} variant="light">
                  See {city} jobs <Arrow />
                </Button>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* How we help */}
      <Section>
        <SectionHeading eyebrow="How we help" title={`Hiring for ${city} teams`} />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {help.map((h) => (
            <div key={h.title} className="rounded-2xl border border-line p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <IconBadge icon={h.icon} size="lg" />
                <p className="text-xl leading-tight font-semibold tracking-tight">{h.title}</p>
              </div>
              <CheckList items={h.body} className="mt-5" />
            </div>
          ))}
        </div>
      </Section>

      {/* Roles we hire (preview tiles). Hidden for now, see showRolePreview in roles.ts */}
      {showRolePreview && (
        <Section tone="mist">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Roles we hire" title="Engineering and sales roles" />
            <SeeAllRolesLink />
          </div>
          <RoleTiles />
        </Section>
      )}

      {/* City jobs (only while there are some) */}
      {cityJobs.length > 0 && (
        <Section className="theme-engineer">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Jobs" title={`${city} startups hiring now`} />
            <Link href="/jobs" className="nudge inline-flex shrink-0 items-center gap-2 font-medium text-brand hover:text-brand-dark">
              View all jobs <Arrow />
            </Link>
          </div>
          <ul className="mt-10 space-y-3">
            {cityJobs.map((job) => (
              <li key={job.slug}>
                <JobCard job={job} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* For engineers: grey unless the section right before it (roles preview) is grey */}
      <Section tone={cityJobs.length === 0 && showRolePreview ? "white" : "mist"} className="theme-engineer">
        <div className="grid items-center gap-8 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-10 lg:grid-cols-[1fr_auto]">
          <div className="flex items-start gap-5">
            <IconBadge icon={MapPin} size="lg" />
            <div>
              <p className="text-2xl font-semibold tracking-tight">{engineerTitle}</p>
              <p className="mt-2 max-w-2xl leading-relaxed text-body">{engineerBody}</p>
            </div>
          </div>
          <Button href="/share-profile" variant="secondary">
            <UserCheck className="h-4 w-4" aria-hidden="true" /> Share your profile
          </Button>
        </div>
      </Section>

      {/* FAQ: opposite background of the engineers section */}
      <Section tone={cityJobs.length === 0 && showRolePreview ? "mist" : "white"}>
        <SectionHeading eyebrow="FAQ" title={`Questions ${city} founders ask us`} />
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

      <CtaBand title={`Hiring in ${city}?`} />
    </div>
  );
}
