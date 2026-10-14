import Link from "next/link";
import { Suspense } from "react";
import { Lock, MessageSquare, Phone } from "lucide-react";
import { AppliedJob } from "@/components/AppliedJob";
import { PrimaryRole } from "@/components/PrimaryRole";
import { Field, FileField, Form, Select, TextArea } from "@/components/Form";
import { Container, Eyebrow } from "@/components/ui";
import { IconBadge } from "@/components/visuals";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Share Your Profile",
  description:
    "Engineers and sales people: share your LinkedIn or resume with Scalewrk. We'll reach out when a startup in the US or Canada fits what you want next.",
  path: "/share-profile",
});

// What happens after someone sends the form
const next = [
  { icon: MessageSquare, title: "We read every profile", body: "A real person reviews it. No bots." },
  { icon: Phone, title: "We reach out when a role fits", body: "Then we set up a short intro call." },
  { icon: Lock, title: "Your profile stays private", body: "We never share it without your OK." },
];

export default function ShareProfilePage() {
  return (
    <section className="theme-engineer pt-12 pb-20 sm:pt-20 sm:pb-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <Eyebrow>For candidates</Eyebrow>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Share your <span className="text-gradient">profile</span>.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-body sm:text-xl">
            Tell us about you and what you want next. It takes about two minutes.
          </p>

          <ul className="mt-8 space-y-3">
            {next.map((item) => (
              <li key={item.title} className="flex items-start gap-3 rounded-2xl border border-line p-4">
                <IconBadge icon={item.icon} size="sm" />
                <span>
                  <span className="block font-semibold">{item.title}</span>
                  <span className="block text-[15px] leading-relaxed text-body">{item.body}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">
            Want to know more first? See{" "}
            <Link href="/engineers" className="underline hover:text-ink">
              how we work with candidates
            </Link>{" "}
            or read our{" "}
            <Link href="/privacy" className="underline hover:text-ink">
              privacy note
            </Link>
            .
          </p>
        </div>

        <div className="rounded-2xl p-0 sm:p-8 sm:ring-1 sm:ring-line">
          <h2 className="mb-6 text-xl font-semibold">Your profile</h2>
          <Form
            endpoint={site.forms.engineers}
            subject="New candidate profile (scalewrk.ai)"
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
            <TextArea label="What are you looking for next?" name="message" placeholder="Stage, team size, product, anything else" />
          </Form>
        </div>
      </Container>
    </section>
  );
}
