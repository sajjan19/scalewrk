import Link from "next/link";
import { Suspense } from "react";
import { AppliedJob } from "@/components/AppliedJob";
import { PrimaryRole } from "@/components/PrimaryRole";
import { Field, FileField, Form, Select, TextArea } from "@/components/Form";
import { Briefcase, Eye, Lock, MapPin, MessageSquare, Target } from "lucide-react";
import { Arrow, Container, Eyebrow } from "@/components/ui";
import { IconBadge } from "@/components/visuals";
import { site } from "@/content/site";
import { visibleJobs } from "@/content/jobs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Startup Jobs for Engineers",
  description:
    "Looking for an engineering role at a growing startup? Share your LinkedIn or resume with Scalewrk. We hire AI/ML, backend, full-stack, frontend and platform engineers across the US and Canada.",
  path: "/engineers",
});

// Only real (non-example) jobs count as open roles
const realJobs = visibleJobs.filter((j) => !j.example).length;

export default function EngineersPage() {
  return (
    <section className="pt-12 pb-20 sm:pt-20 sm:pb-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <Eyebrow>For engineers</Eyebrow>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Find your <span className="text-gradient">next startup role</span>.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-body sm:text-xl">
            We work with startups across the US and Canada that need great engineers. Share your profile. We&apos;ll reach out when we
            find a startup where you can thrive.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              { icon: Eye, text: "The real story up front: stage, team, role and pay" },
              { icon: Target, text: "We only reach out when a role fits what you want" },
              { icon: MessageSquare, text: "Honest feedback, yes or no" },
              { icon: Lock, text: "We never share your profile without your OK" },
              { icon: MapPin, text: "Roles across the US and Canada. Remote, hybrid or open to moving? Tell us." },
            ].map((item) => (
              <li key={item.text} className="flex items-start gap-3 rounded-2xl border border-line p-4">
                <IconBadge icon={item.icon} size="sm" />
                <span className="text-[15px] leading-relaxed text-body">{item.text}</span>
              </li>
            ))}
            {/* Shortcut to the jobs board (fills the last grid spot) */}
            <li>
              <Link
                href="/jobs"
                className="lift group flex h-full items-start gap-3 rounded-2xl border border-brand/20 bg-brand-soft p-4 hover:border-brand/40 hover:shadow-[0_10px_30px_-15px_rgba(79,70,229,0.35)]"
              >
                <span className="btn-brand flex h-9 w-9 flex-none items-center justify-center rounded-lg">
                  <Briefcase className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="flex items-center justify-between gap-2 font-semibold text-ink">
                    View all jobs
                    <span className="text-brand">
                      <Arrow />
                    </span>
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-body">
                    {realJobs > 0
                      ? `${realJobs} open ${realJobs === 1 ? "role" : "roles"} at startups across the US and Canada`
                      : "See example listings at startups across the US and Canada"}
                  </span>
                </span>
              </Link>
            </li>
          </ul>
          <p className="mt-8 text-sm text-muted">
            We read every profile. No match today? We&apos;ll keep you in mind for new roles. Read our{" "}
            <Link href="/privacy" className="underline hover:text-ink">
              privacy note
            </Link>
            .
          </p>
        </div>

        <div id="apply" className="scroll-mt-24 rounded-2xl p-0 sm:p-8 sm:ring-1 sm:ring-line">
          <h2 className="text-xl font-semibold">Share your profile</h2>
          <p className="mt-1 mb-6 text-body">Takes about two minutes.</p>
          <Form
            endpoint={site.forms.engineers}
            subject="New engineer profile (scalewrk.ai)"
            submitLabel="Submit profile"
            successTitle="Got it, thanks."
            successBody="We'll review your profile and reach out when we have a role that fits."
          >
            <Suspense fallback={null}>
              <AppliedJob />
            </Suspense>
            <Field label="Full name" name="name" required autoComplete="name" />
            <Field label="Email" name="email" type="email" required autoComplete="email" />
            <Field
              label="LinkedIn profile"
              name="linkedin"
              type="url"
              required
              placeholder="https://www.linkedin.com/in/yourname"
            />
            <PrimaryRole />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Where you live now" name="location" placeholder="Los Angeles, CA" autoComplete="address-level2" />
              <Select label="How you want to work" name="work_preference" options={["Remote", "Hybrid", "In office", "Open to any"]} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Where you'd like to work" name="target_locations" placeholder="New York, San Francisco or remote" />
              <Select
                label="Open to relocating?"
                name="relocation"
                options={["Yes", "Maybe, for the right role", "No"]}
              />
            </div>
            {site.resumeUpload && (
              <FileField label="Resume" name="resume" accept=".pdf,.doc,.docx" hint="PDF or Word, up to 10 MB." />
            )}
            <Field
              label="Or link to your resume"
              name="resume_link"
              type="url"
              placeholder="Google Drive, Dropbox or personal site"
            />
            <TextArea label="What are you looking for next?" name="message" placeholder="Stage, stack, team size, anything else" />
          </Form>
        </div>
      </Container>
    </section>
  );
}
