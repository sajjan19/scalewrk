import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { ContactReason } from "@/components/ContactReason";
import { Field, Form } from "@/components/Form";
import { MailIcon, PhoneIcon } from "@/components/SocialIcons";
import { Rocket, UserRound } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui";
import { IconBadge } from "@/components/visuals";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Book a Call",
  description:
    "Book a call with Scalewrk. Founders: talk through the engineers and sales people you need to hire. Candidates: tell us what you want in your next startup role.",
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
            Pick a time for a call with the Scalewrk team.
          </p>

          {/* What to bring, for founders (blue) and for candidates (purple) */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              {
                icon: Rocket,
                theme: "theme-startup",
                audience: "For Startups",
                title: "Hiring engineers or sales?",
                intro: "What helps us get started:",
                points: [
                  "The roles you need and how senior",
                  "What you're building and who you sell to",
                  "Pay range, including equity",
                  "On-site, hybrid or remote, and where",
                  "When you need someone to start",
                ],
              },
              {
                icon: UserRound,
                theme: "theme-engineer",
                audience: "For Candidates",
                title: "Looking for your next role?",
                intro: "What helps us find your fit:",
                points: [
                  "Your LinkedIn or resume",
                  "Your main role and key skills",
                  "What you want next: stage, team and product",
                  "Pay range and how much equity matters",
                  "Work style, location and when you could start",
                ],
              },
            ].map((c) => (
              <div key={c.title} className={`flex items-start gap-3 rounded-2xl border border-line bg-white p-5 ${c.theme}`}>
                <IconBadge icon={c.icon} size="sm" />
                <div>
                  <p className="text-sm font-medium text-brand">{c.audience}</p>
                  <p className="font-semibold">{c.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{c.intro}</p>
                  <ul className="mt-3 space-y-1.5">
                    {c.points.map((point) => (
                      <li key={point} className="flex gap-2 leading-snug text-body">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
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
