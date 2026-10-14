import { Suspense } from "react";
import { JobList } from "@/components/JobList";
import { PageHero, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Startup Jobs in Engineering and Sales",
  description:
    "Open engineering and sales roles at growing startups across the US and Canada. AI/ML, backend, frontend, account executives and more.",
  path: "/jobs",
});

export default function JobsPage() {
  return (
    <div className="theme-engineer">
      <PageHero
        eyebrow="Jobs"
        title={
          <>
            Startups <span className="text-gradient">hiring now</span>.
          </>
        }
        intro="Tap a role to see the details. We keep company names private until your first call."
      />

      <Section tone="mist">
        <Suspense fallback={<p className="text-muted">Loading jobs…</p>}>
          <JobList />
        </Suspense>
      </Section>
    </div>
  );
}
