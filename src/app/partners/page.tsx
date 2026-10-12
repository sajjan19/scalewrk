import {
  Bell,
  Calculator,
  CircleDollarSign,
  Code2,
  Globe,
  GraduationCap,
  HeartHandshake,
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
import { Field, Form, TextArea } from "@/components/Form";
import { PartnerType } from "@/components/PartnerType";
import { Arrow, CalendarIcon, Button, PageHero, Section, SectionHeading } from "@/components/ui";
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
  {
    icon: Landmark,
    title: "VC platform and talent teams",
    body: ["A tech hiring expert for your portfolio", "No extra headcount on your team"],
  },
  {
    icon: GraduationCap,
    title: "Accelerators",
    body: ["Your founders are about to raise and hire", "We help them get their first engineers right"],
  },
  {
    icon: Scale,
    title: "Startup lawyers",
    body: ["Your clients just raised and hiring is next", "Send them to a recruiter who knows startups"],
  },
  {
    icon: Calculator,
    title: "Fractional CFOs",
    body: ["You build the hiring plan", "We help fill it", "A simple fee per hire that's easy to budget"],
  },
];

const support = [
  {
    icon: UserCheck,
    title: "Direct access",
    body: ["Your founders talk to a Scalewrk co-founder", "No hand-offs to junior recruiters"],
  },
  {
    icon: Presentation,
    title: "Hiring talks",
    body: ["Talks or office hours for your portfolio or clients", "Tips founders can use right away"],
  },
  {
    icon: MessagesSquare,
    title: "Practical advice",
    body: ["Hiring plans", "Interview steps", "Offers and pay"],
  },
  {
    icon: Bell,
    title: "Updates for you",
    body: ["We keep you posted on intros", "Always with the founder's OK"],
  },
];

const reasons = [
  {
    icon: Code2,
    title: "Engineering experts",
    body: ["We only hire engineers", "Strongest in AI and machine learning", "We know the roles and the tech"],
  },
  {
    icon: CircleDollarSign,
    title: "No cost up front",
    body: ["Founders pay only when they hire", "No retainer", "No risk to try us"],
  },
  {
    icon: Star,
    title: "Makes you look good",
    body: ["Every founder you send gets real care", "Treated like a long-term relationship", "We keep you in the loop"],
  },
  {
    icon: UserCheck,
    title: "Founder-led",
    body: ["Punit or Mandeep runs every search", "Punit has recruited since 2018 for TikTok, PayPal and Sully.ai"],
  },
  {
    icon: HeartHandshake,
    title: "Good for engineers too",
    body: ["Honest about stage, team and pay", "Engineers join startups where they can thrive"],
  },
  {
    icon: Globe,
    title: "Every stage, US and Canada",
    body: ["Seed to Series C+", "Startups across the US and Canada", "Remote, hybrid or in office"],
  },
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
          <CalendarIcon /> Book a call
        </Button>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Who we partner with" title="Built for the people around the founder" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <div key={a.title} className="rounded-2xl border border-line p-6">
              <IconBadge icon={a.icon} size="lg" />
              <p className="mt-5 text-lg font-semibold">{a.title}</p>
              <ul className="mt-3 space-y-1.5">
                {a.body.map((point) => (
                  <li key={point} className="flex gap-2 leading-snug text-body">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-r from-violet to-blue" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading eyebrow="How we help your companies" title="More than a name on a list" />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {support.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white p-6 ring-1 ring-line transition hover:ring-brand/30">
              <div className="flex items-center gap-3">
                <IconBadge icon={item.icon} />
                <p className="text-lg font-semibold">{item.title}</p>
              </div>
              <ul className="mt-4 space-y-1.5">
                {item.body.map((point) => (
                  <li key={point} className="flex gap-2 leading-snug text-body">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-r from-violet to-blue" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Why refer Scalewrk" title="Good for founders and good for you" />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="rounded-2xl border border-line bg-white p-6 transition hover:border-brand/30">
              <div className="flex items-center gap-3">
                <IconBadge icon={r.icon} />
                <p className="text-lg font-semibold">{r.title}</p>
              </div>
              <ul className="mt-4 space-y-1.5">
                {r.body.map((point) => (
                  <li key={point} className="flex gap-2 leading-snug text-body">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-r from-violet to-blue" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading eyebrow="How referrals work" title="Three steps. No paperwork." />
        <div className="mt-12">
          <StepTimeline steps={steps} />
        </div>
      </Section>

      <Section id="partner-form">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            eyebrow="Become a partner"
            title="Let's talk"
            intro="Let's find out how we can help your founders hire. Send a note or book a call."
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
              <PartnerType />
              <TextArea label="Anything we should know?" name="message" placeholder="Portfolio size, stages, hiring needs…" />
            </Form>
          </div>
        </div>
      </Section>
    </>
  );
}
