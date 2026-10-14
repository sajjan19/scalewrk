import { Fragment } from "react";
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
  title: "Engineering and Sales Roles We Hire",
  description:
    "Startup recruiting for engineering and sales: AI/ML, backend, full-stack, frontend, DevOps and engineering leaders, plus account executives, SDRs, customer success and sales leaders.",
  path: "/roles",
});

export default function RolesPage() {
  return (
    <div className="theme-startup">
      <PageHero
        eyebrow="Roles we hire"
        title={
          <>
            The people who <span className="text-gradient">build</span> and <span className="text-gradient">sell</span> your product.
          </>
        }
        intro="We hire engineers and sales teams for growing startups, from AI engineers to founding AEs."
      >
        <Button href={bookingHref} variant="brand">
          <CalendarIcon /> Hire for a role
        </Button>
      </PageHero>

      {/* Link to the jobs board */}
      <div className="theme-engineer border-b border-line bg-mist">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-body">
            <span className="font-medium text-ink">Looking for a job?</span> See startups hiring now.
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
          {roles.map((role, i) => {
            // Group heading before the first role of each group
            const newGroup = i === 0 || roles[i - 1].group !== role.group;
            const hasJobs = visibleJobs.some((j) => j.role === role.slug);
            // Only real (non-example) listings count as open jobs
            const openJobs = jobs.filter((j) => j.role === role.slug && !j.example).length;
            return (
              <Fragment key={role.slug}>
              {newGroup && (
                <p className={`text-sm font-semibold tracking-wide text-muted uppercase ${i === 0 ? "" : "pt-6"}`}>
                  {role.group === "gtm" ? "Sales & go-to-market" : "Engineering"}
                </p>
              )}
              <article
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
                    <Button href="/share-profile" variant="secondary">
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
              </Fragment>
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
    </div>
  );
}
