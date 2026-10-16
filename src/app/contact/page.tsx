import { ContactReason } from "@/components/ContactReason";
import { Field, Form } from "@/components/Form";
import { MailIcon, PhoneIcon } from "@/components/SocialIcons";
import { Container, Eyebrow } from "@/components/ui";
import { bookingHref, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact Scalewrk by email, phone or a quick message. Startup recruiting for engineering and sales roles.",
  path: "/contact",
});

// Email, phone and the contact form. Booking a call has its own page (/book-a-call).
export default function ContactPage() {
  return (
    <>
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Get in touch</h1>
            <p className="mt-4 text-lg leading-relaxed text-body">
              Reach us by email or phone, or send a quick message by filling out the form.
            </p>
            <div className="mt-6 space-y-2 text-lg">
              <a href={`mailto:${site.email}`} className="rise flex w-fit items-center gap-3 font-medium text-brand hover:text-brand-dark">
                <MailIcon />
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                className="rise flex w-fit items-center gap-3 font-medium text-brand hover:text-brand-dark"
              >
                <PhoneIcon />
                {site.phone}
              </a>
            </div>
            <p className="mt-8 text-body">
              Prefer to talk?{" "}
              <a href={bookingHref} className="font-medium text-brand hover:text-brand-dark">
                Book a call
              </a>
              .
            </p>
            <p className="mt-3 text-body">
              Know a founder who&apos;s hiring? Introduce us at{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-brand hover:text-brand-dark">
                {site.email}
              </a>
              .
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 ring-1 ring-line sm:p-8">
            <Form
              endpoint={site.forms.contact}
              subject="New contact form message (scalewrk.ai)"
              submitLabel="Send message"
              successTitle="Message sent."
              successBody="Thanks for reaching out. We'll get back to you soon."
            >
              <Field label="Name" name="name" required autoComplete="name" />
              <Field label="Email" name="email" type="email" required autoComplete="email" />
              <Field label="Company" name="company" autoComplete="organization" />
              <ContactReason />
            </Form>
          </div>
        </Container>
      </section>
    </>
  );
}
