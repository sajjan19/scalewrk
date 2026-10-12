import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { ContactReason } from "@/components/ContactReason";
import { Field, Form } from "@/components/Form";
import { MailIcon, PhoneIcon } from "@/components/SocialIcons";
import { Container, Eyebrow } from "@/components/ui";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Book a Call",
  description:
    "Book a 20-minute call with Scalewrk, the startup tech recruiter for growing companies. Talk through the engineers you need to hire.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section id="book" className="scroll-mt-16 pt-12 pb-16 sm:pt-20">
        <Container>
          <Eyebrow>Book a call</Eyebrow>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Let&apos;s talk about <span className="text-gradient">who you&apos;re hiring</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body sm:text-xl">
            Pick a time for a 20-minute call with a Scalewrk co-founder. Bring your hiring plan or just one role.
          </p>
          <div className="mt-10">
            <CalendlyEmbed />
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-mist py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Prefer email or phone?</h2>
            <p className="mt-4 text-lg leading-relaxed text-body">
              Send us a note. We&apos;ll reply within one business day. Or reach us directly:
            </p>
            <div className="mt-6 space-y-2 text-lg">
              <a href={`mailto:${site.email}`} className="flex w-fit items-center gap-3 font-medium text-brand hover:text-brand-dark">
                <MailIcon />
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                className="flex w-fit items-center gap-3 font-medium text-brand hover:text-brand-dark"
              >
                <PhoneIcon />
                {site.phone}
              </a>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 ring-1 ring-line sm:p-8">
            <Form
              endpoint={site.forms.contact}
              subject="New contact form message (scalewrk.ai)"
              submitLabel="Send message"
              successTitle="Message sent."
              successBody="Thanks for reaching out. We'll get back to you within one business day."
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
