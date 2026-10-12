import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { ContactReason } from "@/components/ContactReason";
import { Field, Form } from "@/components/Form";
import { MailIcon, PhoneIcon } from "@/components/SocialIcons";
import { Building2, Code2 } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui";
import { IconBadge } from "@/components/visuals";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Book a Call",
  description:
    "Book a call with Scalewrk. Founders: talk through the engineers you need to hire. Engineers: tell us what you want in your next startup role.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section id="book" className="scroll-mt-16 pt-12 pb-16 sm:pt-20">
        <Container>
          <Eyebrow>Book a call</Eyebrow>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Let&apos;s talk about <span className="text-gradient">your next hire</span> or{" "}
            <span className="text-gradient">your next role</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body sm:text-xl">
            Pick a time for a call with a Scalewrk co-founder.
          </p>

          {/* What to bring, for founders and for engineers */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              { icon: Building2, title: "Hiring engineers?", body: "Bring your hiring plan or just one role." },
              { icon: Code2, title: "Looking for your next role?", body: "Tell us what you want next: stage, team and work style." },
            ].map((c) => (
              <div key={c.title} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4">
                <IconBadge icon={c.icon} size="sm" />
                <div>
                  <p className="font-semibold">{c.title}</p>
                  <p className="mt-0.5 text-body">{c.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <CalendlyEmbed />
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-mist py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Other ways to reach us</h2>
            <p className="mt-4 text-lg leading-relaxed text-body">
              Reach us by email or phone, or send a quick message with the form.
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
