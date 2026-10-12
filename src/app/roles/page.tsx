import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { RoleJumpBar } from "@/components/RoleJumpBar";
import { Arrow, CalendarIcon, Button, CheckList, PageHero, Section, SectionHeading } from "@/components/ui";
import { bookingHref } from "@/content/site";
import { roles } from "@/content/roles";
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
            Engineers for your <span className="text-gradient">whole stack</span>.
          </>
        }
        intro="We only hire engineers for growing startups. Here's who we hire and what we look for."
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
          <Link href="/jobs" className="inline-flex items-center gap-2 font-medium text-brand hover:text-brand-dark">
            View open jobs <Arrow />
          </Link>
        </div>
      </div>

      <Section className="!pb-0">
        <SectionHeading eyebrow="Roles we hire" title="Every type of engineer" intro="Here's who we hire and what we look for." />
      </Section>

      {/* Jump links (scrollable, highlights the role you're reading) */}
      <RoleJumpBar />

      <Section>
        <div className="space-y-6">
          {roles.map((role) => (
            <article
              key={role.slug}
              id={role.slug}
              className="scroll-mt-36 grid gap-8 rounded-2xl border border-line p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr]"
            >
              <div>
                <div className="flex items-center gap-4">
                  <IconBadge icon={role.icon} size="lg" />
                  <h2 className="text-2xl font-semibold tracking-tight">{role.name}</h2>
                </div>
                <p className="mt-4 leading-relaxed text-body">{role.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Typical titles">
                  {role.titles.map((t) => (
                    <li key={t} className="rounded-full bg-mist px-3 py-1 text-sm text-body">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-muted">What we look for</p>
                <CheckList className="mt-4" items={role.screenFor} />
              </div>
            </article>
          ))}
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
