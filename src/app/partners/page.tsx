import { Field, Form, Select, TextArea } from "@/components/Form";
import { Arrow, Button, CheckList, PageHero, Section, SectionHeading } from "@/components/ui";
import { bookingHref, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Referral Partners: VCs, Accelerators, Lawyers, and CFOs",
  description:
    "Partner with Scalewrk to give your portfolio companies and clients a specialist tech recruiter for venture-backed startups. Built for VC platform teams, accelerators, startup lawyers, and fractional CFOs.",
  path: "/partners",
});

const audiences = [
  {
    title: "VC platform and talent teams",
    body: "Give your portfolio a specialist for technical hiring without adding headcount to your platform team.",
  },
  {
    title: "Accelerators",
    body: "Your founders are about to raise and hire. We help them make their first engineering hires count.",
  },
  {
    title: "Startup lawyers",
    body: "Your clients just closed a round, and hiring is next. Send them to a recruiter who knows the stage.",
  },
  {
    title: "Fractional CFOs",
    body: "You build the hiring plan and the burn model. We help fill the roles in it, with fee-per-hire costs that are easy to budget.",
  },
];

const support = [
  "Referred founders talk directly with a Scalewrk co-founder",
  "Hiring office hours or talks for your portfolio, cohort, or clients",
  "Practical guidance on engineering hiring plans, interview loops, and offers",
  "We keep you posted on how intros go, with the founder's OK",
];

const reasons = [
  {
    title: "Engineering-only expertise",
    body: "Your founders get a recruiter who knows the difference between a platform engineer and an SRE, and screens accordingly.",
  },
  {
    title: "Nothing up front for your founders",
    body: "Fee per hire means no retainer and no risk. Founders only pay when they make a hire.",
  },
  {
    title: "A referral that reflects well on you",
    body: "We treat every referred founder like a long-term relationship, because that's what we're building.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="For VCs, accelerators, lawyers, and fractional CFOs"
        title="A tech recruiter you can send your founders to."
        intro="We partner with the people founders already trust to help their companies hire great engineers, from seed through Series C and beyond."
      >
        <Button href="#partner-form">
          Become a partner <Arrow />
        </Button>
        <Button href={bookingHref} variant="secondary">
          Book a call
        </Button>
      </PageHero>

      <Section>
        <SectionHeading eyebrow="Who we partner with" title="Built for the people around the founder" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {audiences.map((a) => (
            <div key={a.title} className="rounded-2xl border border-line p-6 sm:p-8">
              <p className="text-lg font-semibold">{a.title}</p>
              <p className="mt-2 leading-relaxed text-body">{a.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="How we support your companies" title="More than a name on a resource list" />
            <CheckList className="mt-8" items={support} />
          </div>
          <div>
            <SectionHeading eyebrow="Why refer Scalewrk" title="Good for founders, good for you" />
            <div className="mt-8 space-y-6">
              {reasons.map((r) => (
                <div key={r.title}>
                  <p className="font-semibold">{r.title}</p>
                  <p className="mt-1 leading-relaxed text-body">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="How referrals work" title="Three steps, no paperwork" />
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { t: "Intro call", b: "A quick call so we understand your portfolio, cohort, or client base and how you like to work." },
            { t: "Make an intro", b: `Email ${site.email} with the founder in copy, or send them our booking link.` },
            { t: "We take it from there", b: "We follow up within one business day and keep you in the loop." },
          ].map((s, i) => (
            <li key={s.t} className="rounded-2xl border border-line p-6">
              <span className="font-mono text-sm text-brand">0{i + 1}</span>
              <p className="mt-2 text-lg font-semibold">{s.t}</p>
              <p className="mt-2 leading-relaxed text-body">{s.b}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="mist" id="partner-form">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            eyebrow="Set up a partnership"
            title="Let's talk"
            intro="Tell us a little about you and we'll be in touch to set up a referral partnership. Prefer to talk live? Book a call instead."
          />
          <div className="rounded-2xl bg-white p-6 ring-1 ring-line sm:p-8">
            <Form
              endpoint={site.forms.partners}
              subject="New partner inquiry (scalewrk.ai)"
              submitLabel="Send"
              successTitle="Thanks, we'll be in touch."
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
              <TextArea label="Anything we should know?" name="message" placeholder="Portfolio size, stages, current hiring needs…" />
            </Form>
          </div>
        </div>
      </Section>
    </>
  );
}
