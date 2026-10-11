import Link from "next/link";
import { JobList } from "@/components/JobList";
import { Arrow, PageHero, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Startup Jobs for Engineers",
  description:
    "Open engineering roles at venture-backed startups across the US. AI/ML, backend, frontend, platform and more.",
  path: "/jobs",
});

export default function JobsPage() {
  return (
    <>
      <PageHero
        eyebrow="Jobs"
        title="Startups hiring now."
        intro="Tap a role to see the details. We keep company names private until your first call."
      />

      <Section tone="mist">
        <JobList />
        <div className="mt-10 rounded-2xl bg-white p-6 ring-1 ring-line sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="font-semibold">Don&apos;t see the right role?</p>
            <p className="mt-1 text-body">Share your profile. We&apos;ll reach out when a startup fits what you want.</p>
          </div>
          <Link
            href="/engineers#apply"
            className="mt-4 inline-flex items-center gap-2 font-medium text-brand hover:text-brand-dark sm:mt-0 sm:shrink-0"
          >
            Share your profile <Arrow />
          </Link>
        </div>
      </Section>
    </>
  );
}
