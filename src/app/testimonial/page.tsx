import { Heart } from "lucide-react";
import { Checkbox, Field, Form, Select, TextArea } from "@/components/Form";
import { Container, Eyebrow } from "@/components/ui";
import { IconBadge } from "@/components/visuals";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

/*
  /testimonial: the page you send to happy clients, engineers and partners.
  Not in the menu or sitemap. Approved quotes go in src/content/testimonials.ts.
*/
export const metadata = pageMetadata({
  title: "Share your experience",
  description: "Tell us what it was like to work with Scalewrk.",
  path: "/testimonial",
  noindex: true,
});

export default function TestimonialPage() {
  return (
    <section className="pt-12 pb-20 sm:pt-20 sm:pb-28">
      <Container className="max-w-2xl">
        <IconBadge icon={Heart} size="lg" />
        <Eyebrow>
          <span className="mt-5 block">Share your experience</span>
        </Eyebrow>
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          How was working with <span className="text-gradient">Scalewrk</span>?
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-body">
          Thank you for taking a minute. Your words help other founders and engineers decide if we&apos;re the right fit.
        </p>

        <div className="mt-10 rounded-2xl p-0 sm:p-8 sm:ring-1 sm:ring-line">
          <Form
            endpoint={site.forms.testimonials}
            subject="New testimonial (scalewrk.ai)"
            submitLabel="Send testimonial"
            successTitle="Thank you!"
            successBody="We really appreciate it. We'll check with you before we share anything."
          >
            <Select
              label="I'm a"
              name="type"
              required
              options={["Founder or hiring manager", "Engineer we placed", "Partner (VC, accelerator, lawyer or CFO)", "Other"]}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" required autoComplete="name" />
              <Field label="Email" name="email" type="email" required autoComplete="email" hint="Never shown on the site." />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Title" name="title" placeholder="CTO, Senior Engineer…" autoComplete="organization-title" />
              <Field label="Company" name="company" autoComplete="organization" />
            </div>
            <TextArea
              label="Your testimonial"
              name="testimonial"
              required
              placeholder="What was it like working with us? What changed for you or your team?"
            />
            <Select label="Overall, how was it?" name="rating" options={["5 - Excellent", "4 - Great", "3 - Good", "2 - Fair", "1 - Poor"]} />
            <Select
              label="How should we credit you?"
              name="credit"
              required
              options={["Full name, title and company", "First name and title only", "Anonymous"]}
            />
            <Field label="LinkedIn profile" name="linkedin" type="url" placeholder="https://www.linkedin.com/in/yourname" />
            <Checkbox
              name="permission"
              label="Scalewrk can share this testimonial on its website and social media, credited the way I chose above."
            />
          </Form>
        </div>
        <p className="mt-6 text-sm text-muted">
          Prefer to email it? Send it to{" "}
          <a href={`mailto:${site.email}?subject=Testimonial`} className="font-medium text-brand">
            {site.email}
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
