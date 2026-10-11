import {
  Bell,
  Calculator,
  CircleDollarSign,
  Code2,
  GraduationCap,
  Landmark,
  Mail,
  MessagesSquare,
  Phone,
  Presentation,
  Rocket,
  Scale,
  Star,
  UserCheck,
} from "lucide-react";
import { Field, Form, Select, TextArea } from "@/components/Form";
import { Arrow, Button, PageHero, Section, SectionHeading } from "@/components/ui";
import { IconBadge, StepTimeline } from "@/components/visuals";
import { bookingHref, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Referral Partners: VCs, Accelerators, Lawyers and CFOs",
  description:
    "Partner with Scalewrk to give your portfolio companies and clients a specialist tech recruiter. Built for VC platform teams, accelerators, startup lawyers and fractional CFOs.",
  path: "/partners",
});

const audiences = [
  { icon: Landmark, title: "VC platform and talent teams", body: "Give your portfolio a tech hiring expert without adding to your team." },
  { icon: GraduationCap, title: "Accelerators", body: "Your founders are about to raise and hire. We help them get their first engineers right." },
  { icon: Scale, title: "Startup lawyers", body: "Your clients just raised. Hiring is next. Send them to a recruiter who knows startups." },
  { icon: Calculator, title: "Fractional CFOs", body: "You build the hiring plan. We help fill it, with a simple fee per hire that's easy to budget." },
];

const support = [
  { icon: UserCheck, text: "Your founders talk directly with a Scalewrk co-founder" },
  { icon: Presentation, text: "Hiring talks or office hours for your portfolio or clients" },
  { icon: MessagesSquare, text: "Advice on hiring plans, interviews and offers" },
  { icon: Bell, text: "We keep you updated on intros, with the founder's OK" },
];

const reasons = [
  { icon: Code2, title: "Engineering experts", body: "We only hire engineers, so your founders get someone who really knows the roles." },
  { icon: CircleDollarSign, title: "No cost up front", body: "Founders pay only when they make a hire. No retainer and no risk." },
  { icon: Star, title: "Makes you look good", body: "We treat every founder you send like a long-term relationship." },
];

const steps = [
  { icon: Phone, title: "Intro call", body: ["We learn about your portfolio or clients", "How you like to work"] },
  { icon: Mail, title: "Make an intro", body: [`Email ${site.email}`, "Copy in the founder", "Or send them our booking link"] },
  { icon: Rocket, title: "We take it from there", body: ["We reply within one business day", "We keep you in the loop"] },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="For VCs, accelerators, lawyers and fractional CFOs"
        title={
          <>
            A tech recruiter you can <span className="text-gradient">send your founders to</span>.
          </>
        }
        intro="We work with the people founders already trust to help their companies hire great engineers."
      >
        <Button href="#partner-form">
          Become a partner <Arrow />
        </Button>
        <Button href={bookingHref} variant="brand">
          Book a call
        </Button>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Who we partner with" title="Built for the people around the founder" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <div key={a.title} className="rounded-2xl border border-line p-6">
              <IconBadge icon={a.icon} size="lg" />
              <p className="mt-5 text-lg font-semibold">{a.title}</p>
              <p className="mt-2 leading-relaxed text-body">{a.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="How we help your companies" title="More than a name on a list" />
            <ul className="mt-8 space-y-3">
              {support.map((s) => (
                <li key={s.text} className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-line">
                  <IconBadge icon={s.icon} size="sm" />
                  <span className="text-body">{s.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Why refer Scalewrk" title="Good for founders and good for you" />
            <div className="mt-8 space-y-3">
              {reasons.map((r) => (
                <div key={r.title} className="flex gap-4 rounded-2xl bg-white p-4 ring-1 ring-line">
                  <IconBadge icon={r.icon} size="sm" />
                  <div>
                    <p className="font-semibold">{r.title}</p>
                    <p className="mt-0.5 leading-relaxed text-body">{r.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="How referrals work" title="Three steps. No paperwork." />
        <div className="mt-12">
          <StepTimeline steps={steps} />
        </div>
      </Section>

      <Section tone="mist" id="partner-form">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            eyebrow="Become a partner"
            title="Let's talk"
            intro="Tell us a little about you. We'll get in touch to set up a partnership. Want to talk now? Book a call."
          />
          <div className="rounded-2xl bg-white p-6 ring-1 ring-line sm:p-8">
            <Form
              endpoint={site.forms.partners}
              subject="New partner inquiry (scalewrk.ai)"
              submitLabel="Send"
              successTitle="Thanks! We'll be in touch."
              successBody="We'll reply within one business day to set up a time to talk."
            >
              <Field label="Name" name="name" required autoComplete="name" />
              <Field label="Work email" name="email" type="email" required autoComplete="email" />
              <Field label="Firm or organization" name="organization" required autoComplete="organization" />
              <Select
                label="You are a"
                name="partner_type"
                required
                options={["VC (platform or talent team)", "VC (investor)", "Accelerator", "Startup lawyer", "Fractional CFO", "Other"]}
              />
              <TextArea label="Anything we should know?" name="message" placeholder="Portfolio size, stages, hiring needs…" />
            </Form>
          </div>
        </div>
      </Section>
    </>
  );
}
