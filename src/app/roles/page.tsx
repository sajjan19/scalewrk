import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Arrow, Button, CheckList, PageHero, Section } from "@/components/ui";
import { bookingHref } from "@/content/site";
import { roles } from "@/content/roles";
import { IconBadge } from "@/components/visuals";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "AI Engineer Recruiting and Tech Roles We Hire",
  description:
    "AI engineer recruiting for startups, plus backend, full-stack, frontend, DevOps, data, mobile, security and engineering leadership roles for venture-backed companies.",
  path: "/roles",
});

export default function RolesPage() {
  return (
    <>
      <PageHero
        eyebrow="Roles we hire"
        title="Engineers for your whole stack."
        intro="We only hire engineers for venture-backed startups. Here's who we hire and what we look for."
      >
        <Button href={bookingHref} variant="brand">
          Hire for a role <Arrow />
        </Button>
      </PageHero>

      {/* Jump links */}
      <div className="sticky top-16 z-30 border-b border-line bg-white/95 backdrop-blur">
        <nav aria-label="Roles" className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-5 py-3 sm:px-8">
          {roles.map((role) => (
            <a
              key={role.slug}
              href={`#${role.slug}`}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm text-body transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand"
            >
              <role.icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              {role.name}
            </a>
          ))}
        </nav>
      </div>

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
