import { JobList } from "@/components/JobList";
import { PageHero, Section } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Startup Jobs for Engineers",
  description:
    "Open engineering roles at venture-backed startups across the US and Canada. AI/ML, backend, frontend, platform and more.",
  path: "/jobs",
});

export default function JobsPage() {
  return (
    <>
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
        <JobList />
      </Section>
    </>
  );
}
