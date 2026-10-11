import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CheckCircle2,
  DollarSign,
  MapPin,
  ListChecks,
  PieChart,
  TrendingUp,
  Users,
} from "lucide-react";
import { Arrow, Button, Container } from "@/components/ui";
import { IconBadge } from "@/components/visuals";
import { jobs, visibleJobs } from "@/content/jobs";
import { roles } from "@/content/roles";
import { pageMetadata } from "@/lib/metadata";

// One page per job, built at deploy time. Unknown slugs show the 404 page.
export const dynamicParams = false;

export function generateStaticParams() {
  return visibleJobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: PageProps<"/jobs/[slug]">) {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);
  if (!job) return {};
  return pageMetadata({
    title: `${job.title} at ${job.companyName} (${job.stage}, ${job.company})`,
    description: job.summary,
    path: `/jobs/${job.slug}`,
    // Example listings are never shown to Google
    noindex: job.example,
  });
}

export default async function JobPage({ params }: PageProps<"/jobs/[slug]">) {
  const { slug } = await params;
  const job = visibleJobs.find((j) => j.slug === slug);
  if (!job) notFound();

  const role = roles.find((r) => r.slug === job.role);
  const Icon = role?.icon ?? Briefcase;

  const facts = [
    { icon: Building2, label: "Company", value: job.companyName },
    { icon: TrendingUp, label: "Stage", value: job.stage },
    { icon: MapPin, label: "Location", value: job.location },
    { icon: Briefcase, label: "Work style", value: job.workType },
    { icon: DollarSign, label: "Salary", value: job.salary },
    ...(job.equity ? [{ icon: PieChart, label: "Equity", value: job.equity }] : []),
    { icon: Users, label: "Team size", value: job.teamSize },
  ];

  const applyHref = `/engineers?job=${job.slug}#apply`;

  return (
    <>
      {job.example && (
        <div className="border-b border-amber-200 bg-amber-50">
          <Container className="py-3 text-sm text-amber-900">
            <span className="font-semibold">Example listing.</span> This shows how our job posts will look. It isn&apos;t a real
            opening yet.
          </Container>
        </div>
      )}

      {/* Header */}
      <section className="border-b border-line pt-8 pb-10 sm:pt-12 sm:pb-14">
        <Container>
          <Link href="/jobs" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-dark">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All jobs
          </Link>
          <div className="mt-6 flex items-start gap-4 sm:gap-5">
            <span className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-brand-soft text-brand">
              <Icon className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">{job.title}</h1>
              <p className="mt-2 text-lg text-body">
                <span className="font-medium text-ink">{job.companyName}</span> · {job.stage} · {job.company}
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-body sm:text-xl">{job.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm text-body">
            {facts.slice(2, 5).map((f) => (
              <span key={f.label} className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5">
                <f.icon className="h-4 w-4 text-brand" aria-hidden="true" />
                {f.value}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-14">
          <div className="space-y-10">
            <JobSection icon={Building2} title="About the company">
              <p className="leading-relaxed text-body">{job.aboutCompany}</p>
            </JobSection>

            <JobSection icon={ListChecks} title="What you'll do">
              <List items={job.whatYoullDo} />
            </JobSection>

            <JobSection icon={CheckCircle2} title="What you'll need">
              <List items={job.whatYoullNeed} />
            </JobSection>

            {job.niceToHave.length > 0 && (
              <JobSection icon={TrendingUp} title="Nice to have">
                <List items={job.niceToHave} muted />
              </JobSection>
            )}

            <JobSection icon={Users} title="Interview steps">
              <ol className="space-y-3">
                {job.interviewSteps.map((step, i) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className="btn-brand flex h-7 w-7 flex-none items-center justify-center rounded-full text-sm font-semibold">
                      {i + 1}
                    </span>
                    <span className="text-body">{step}</span>
                  </li>
                ))}
              </ol>
            </JobSection>
          </div>

          {/* Summary + apply */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-line p-6 shadow-[0_20px_50px_-30px_rgba(11,16,32,0.3)]">
              <p className="font-semibold">Role summary</p>
              <dl className="mt-4 space-y-3">
                {facts.map((f) => (
                  <div key={f.label} className="flex items-center gap-3">
                    <IconBadge icon={f.icon} size="sm" />
                    <div>
                      <dt className="text-xs text-muted">{f.label}</dt>
                      <dd className="font-medium">{f.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <Button href={applyHref} variant="brand" className="mt-6 w-full">
                Apply for this role <Arrow />
              </Button>
              <p className="mt-3 text-center text-sm text-muted">Takes about two minutes.</p>
            </div>
            <p className="mt-4 text-center text-sm text-body">
              Not quite right?{" "}
              <Link href="/engineers#apply" className="font-medium text-brand hover:text-brand-dark">
                Share your profile
              </Link>{" "}
              and we&apos;ll match you.
            </p>
          </aside>
        </Container>
      </section>
    </>
  );
}

function JobSection({ icon, title, children }: { icon: typeof Users; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <IconBadge icon={icon} size="sm" />
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function List({ items, muted = false }: { items: string[]; muted?: boolean }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-body">
          <span className={`mt-2.5 h-1.5 w-1.5 flex-none rounded-full ${muted ? "bg-muted/50" : "bg-gradient-to-r from-violet to-blue"}`} />
          {item}
        </li>
      ))}
    </ul>
  );
}
