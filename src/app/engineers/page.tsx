import Link from "next/link";
import { Field, FileField, Form, Select, TextArea } from "@/components/Form";
import { CheckList, Container, Eyebrow } from "@/components/ui";
import { site } from "@/content/site";
import { roles } from "@/content/roles";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Startup Jobs for Engineers",
  description:
    "Looking for an engineering role at a venture-backed startup? Share your LinkedIn or resume with Scalewrk. We hire AI/ML, backend, full-stack, frontend, and platform engineers across the US.",
  path: "/engineers",
});

export default function EngineersPage() {
  return (
    <section className="pt-12 pb-20 sm:pt-20 sm:pb-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <Eyebrow>For engineers</Eyebrow>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">Find your next startup role.</h1>
          <p className="mt-5 text-lg leading-relaxed text-body sm:text-xl">
            We work with venture-backed startups across the US that are hiring AI/ML, backend, full-stack, frontend, and platform
            engineers. Share your profile and we&apos;ll reach out when there&apos;s a real fit.
          </p>
          <CheckList
            className="mt-8"
            items={[
              "Real context up front: stage, team, role scope, and as much detail on comp as we can share",
              "We only reach out when a role matches what you told us",
              "Honest feedback, whether it's a yes or a no",
              "Never shared with a company without your OK",
            ]}
          />
          <p className="mt-8 text-sm text-muted">
            We review every profile. If we don&apos;t have a fit today, we&apos;ll keep you in mind as new searches open. Read our{" "}
            <Link href="/privacy" className="underline hover:text-ink">
              privacy note
            </Link>
            .
          </p>
        </div>

        <div className="rounded-2xl p-0 sm:p-8 sm:ring-1 sm:ring-line">
          <h2 className="text-xl font-semibold">Share your profile</h2>
          <p className="mt-1 mb-6 text-body">Takes about two minutes.</p>
          <Form
            endpoint={site.forms.engineers}
            subject="New engineer profile (scalewrk.ai)"
            submitLabel="Submit profile"
            successTitle="Got it, thanks."
            successBody="We'll review your profile and reach out when we have a role that fits."
          >
            <Field label="Full name" name="name" required autoComplete="name" />
            <Field label="Email" name="email" type="email" required autoComplete="email" />
            <Field
              label="LinkedIn profile"
              name="linkedin"
              type="url"
              required
              placeholder="https://www.linkedin.com/in/yourname"
            />
            <Select label="Primary role" name="role" required options={[...roles.map((r) => r.name), "Other"]} />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Location" name="location" placeholder="City, State" autoComplete="address-level2" />
              <Select label="Work preference" name="work_preference" options={["Remote", "Hybrid", "Onsite", "Open to any"]} />
            </div>
            {site.resumeUpload && (
              <FileField label="Resume" name="resume" accept=".pdf,.doc,.docx" hint="PDF or Word, up to 10 MB." />
            )}
            <Field
              label="Or link to your resume"
              name="resume_link"
              type="url"
              placeholder="Google Drive, Dropbox, or personal site"
            />
            <TextArea label="What are you looking for next?" name="message" placeholder="Stage, stack, team size, anything else" />
          </Form>
        </div>
      </Container>
    </section>
  );
}
