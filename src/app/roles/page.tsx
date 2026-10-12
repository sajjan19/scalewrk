import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { RoleJumpBar } from "@/components/RoleJumpBar";
import { Arrow, CalendarIcon, Button, CheckList, PageHero, Section, SectionHeading } from "@/components/ui";
import { bookingHref } from "@/content/site";
import { roles } from "@/content/roles";
import { jobs, visibleJobs } from "@/content/jobs";
import { IconBadge } from "@/components/visuals";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "AI Engineer Recruiting and Tech Roles We Hire",
  description:
    "AI engineer recruiting for startups, plus backend, full-stack, frontend, DevOps, data, mobile, security and engineering leadership roles for growing startups.",
  path: "/roles",
});

export default function RolesPage() {
  return (
    <>
      <PageHero
        eyebrow="Roles we hire"
        title={
          <>
            Every type of <span className="text-gradient">engineer</span>. Every kind of <span className="text-gradient">startup</span>.
          </>
        }
        intro="We match engineers with growing startups, from AI to hardware."
      >
        <Button href={bookingHref} variant="brand">
          <CalendarIcon /> Hire for a role
        </Button>
      </PageHero>

      {/* Link to the jobs board */}
      <div className="border-b border-line bg-mist">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-body">
            <span className="font-medium text-ink">Engineer looking for a job?</span> See startups hiring now.
          </p>
          <Link href="/jobs" className="inline-flex items-center gap-2 nudge font-medium text-brand hover:text-brand-dark">
            View open jobs <Arrow />
          </Link>
        </div>
      </div>

      <Section className="!pb-0">
        <SectionHeading eyebrow="Roles we hire" title="Who we hire" intro="Every role we recruit for and what we look for." />
      </Section>

      {/* Jump links (scrollable, highlights the role you're reading) */}
      <RoleJumpBar />

      <Section>
        <div className="space-y-6">
          {roles.map((role) => {
            const hasJobs = visibleJobs.some((j) => j.role === role.slug);
            // Only real (non-example) listings count as open jobs
            const openJobs = jobs.filter((j) => j.role === role.slug && !j.example).length;
            return (
              <article
                key={role.slug}
                id={role.slug}
                className="scroll-mt-36 rounded-2xl border border-line p-6 sm:p-8"
              >
                <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                  <div>
                    <div className="flex items-center gap-4">
                      <IconBadge icon={role.icon} size="lg" />
                      <h2 className="text-2xl font-semibold tracking-tight">{role.name}</h2>
                    </div>
                    <p className="mt-4 leading-relaxed text-body">{role.summary}</p>

                    <p className="mt-5 text-sm font-medium text-muted">Common titles</p>
                    <ul className="mt-2 flex flex-wrap gap-2" aria-label="Common titles">
                      {role.titles.map((t) => (
                        <li key={t} className="rounded-full bg-mist px-3 py-1 text-sm text-body">
                          {t}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-4 text-sm font-medium text-muted">Key skills</p>
                    <ul className="mt-2 flex flex-wrap gap-2" aria-label="Key skills">
                      {role.skills.map((skill) => (
                        <li key={skill} className="rounded-full bg-brand-soft px-3 py-1 text-sm font-medium text-brand-dark">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted">What we look for</p>
                    <CheckList className="mt-4" items={role.screenFor} />
                  </div>
                </div>

                {/* One action for founders, one for engineers */}
                <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
                  <Button href={bookingHref} variant="brand">
                    <CalendarIcon /> Hire for {role.name}
                  </Button>
                  {hasJobs ? (
                    <Button href={`/jobs?role=${role.slug}`} variant="secondary">
                      See open jobs for {role.name} <Arrow />
                    </Button>
                  ) : (
                    <Button href="/engineers#apply" variant="secondary">
                      Share your profile <Arrow />
                    </Button>
                  )}
                  {openJobs > 0 && (
                    <span className="text-sm font-medium text-brand sm:ml-2">
                      {openJobs} open {openJobs === 1 ? "job" : "jobs"}
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-lg text-body">
          Hiring for a tech role that isn&apos;t listed?{" "}
          <Link href={bookingHref} className="font-medium text-brand hover:text-brand-dark">
            Tell us about it
          </Link>
          .
        </p>
      </Section>

      <CtaBand title="Have a role open right now?" />
    </>
  );
}
