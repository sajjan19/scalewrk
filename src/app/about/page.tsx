import Image from "next/image";
import { Code2, Filter, Flag, Globe, HeartHandshake, MapPin, MessageCircle } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { IconBadge } from "@/components/visuals";
import { Arrow, Button, CalendarIcon, Container, PageHero, Section, SectionHeading, Text } from "@/components/ui";
import { bookingHref, isSet, site } from "@/content/site";
import { founderId, founders } from "@/content/founders";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Scalewrk was founded by tech recruiter Punit Singh to be the embedded hiring partner for growing startups across the US and Canada.",
  path: "/about",
});

const values = [
  {
    icon: MessageCircle,
    title: "Honest",
    body: ["We tell founders when a role will be hard to fill", "We tell engineers when a job isn't right for them"],
  },
  {
    icon: Filter,
    title: "Selective",
    body: ["A few of the right people", "Not a long list of maybes", "Your time matters"],
  },
  {
    icon: HeartHandshake,
    title: "Here for the long run",
    body: ["We learn your company once", "We keep showing up", "Your recruiter for every engineering hire"],
  },
];

// Quick facts strip under the intro. Edit the year and city in src/content/site.ts
const facts = [
  { icon: Flag, label: "Founded", value: String(site.founded) },
  { icon: MapPin, label: "Based in", value: site.basedIn },
  { icon: Globe, label: "Hiring across", value: "US and Canada" },
  { icon: Code2, label: "Focus", value: "Engineers only" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Scalewrk"
        title={
          <>
            <span className="text-gradient">Meet the team</span> that matches startups and engineers.
          </>
        }
        intro="We meet founders and engineers at tech events, through our network and online. Then we bring the right people together."
      >
        <Button href="/mission" variant="secondary">
          Mission & Vision <Arrow />
        </Button>
      </PageHero>

      {/* Quick facts */}
      <section className="border-b border-line bg-mist py-6">
        <Container>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {facts.map((f) => (
              <li key={f.label} className="flex items-center gap-3">
                <IconBadge icon={f.icon} size="sm" />
                <div>
                  <p className="text-xs text-muted">{f.label}</p>
                  <p className="font-semibold">{f.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Section>
        <SectionHeading eyebrow="Our team" title="Who you'll work with" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {founders.map((f) => (
            <article key={f.name} id={founderId(f.name)} className="flex scroll-mt-24 flex-col rounded-2xl border border-line p-6 sm:p-8">
              {f.photo ? (
                <Image
                  src={f.photo}
                  alt={`${f.name}, ${f.title} at Scalewrk`}
                  width={1200}
                  height={900}
                  quality={90}
                  sizes="(min-width: 1152px) 520px, (min-width: 768px) 45vw, 100vw"
                  className="aspect-[4/3] w-full rounded-xl bg-mist object-cover object-[50%_35%]"
                />
              ) : (
                <div
                  className="flex aspect-[4/3] w-full items-center justify-center rounded-xl bg-gradient-to-br from-violet to-blue text-5xl font-semibold text-white"
                  aria-hidden="true"
                  title="PLACEHOLDER: founder photo"
                >
                  {f.initials}
                </div>
              )}
              <div className="mt-6">
                <h3 className="text-2xl font-semibold tracking-tight">{f.name}</h3>
                <p className="mt-1 font-medium text-brand">{f.title}</p>
                {/* Location with a pin icon */}
                <p className="mt-2 flex items-center gap-1.5 text-sm text-body">
                  <MapPin className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                  <Text>{f.location}</Text>
                </p>
              </div>

              <div className="mt-6 space-y-4 leading-relaxed text-body">
                {f.bio.map((para, i) => (
                  <p key={i}>
                    <Text>{para}</Text>
                  </p>
                ))}
              </div>

              {f.experienceAt.length > 0 && (
                <p className="mt-6 text-sm text-body">
                  <span className="font-medium text-ink">Experience recruiting for:</span>{" "}
                  {f.experienceAt.map((c, i) => (
                    <span key={i}>
                      {i > 0 && " · "}
                      <Text>{c}</Text>
                    </span>
                  ))}
                </p>
              )}
              {f.previouslyAt && f.previouslyAt.length > 0 && (
                <p className="mt-6 text-sm text-body">
                  <span className="font-medium text-ink">Previously at:</span> {f.previouslyAt.join(" · ")}
                </p>
              )}

              {f.outsideWork.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-ink">Outside of work</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {f.outsideWork.map((item) => (
                      <li key={item.label} className="inline-flex cursor-default items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-sm text-brand-dark ring-1 ring-transparent transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_6px_16px_-6px_rgba(79,70,229,0.45)] hover:ring-brand/30 motion-reduce:hover:translate-y-0">
                        <item.icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Book directly with this founder, plus LinkedIn */}
              <div className="mt-auto flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Button href={isSet(f.calendlyUrl) ? f.calendlyUrl : bookingHref} variant="brand">
                  <CalendarIcon /> Book a call with {f.name.split(" ")[0]}
                </Button>
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rise inline-flex items-center gap-2 font-medium text-brand hover:text-brand-dark"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                    </svg>
                    {f.name.split(" ")[0]} on LinkedIn
                  </a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading eyebrow="How we work" title="What founders can count on" />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl bg-white p-6 ring-1 ring-line">
              <IconBadge icon={v.icon} size="lg" />
              <p className="mt-5 text-lg font-semibold">{v.title}</p>
              <ul className="mt-3 space-y-1.5">
                {v.body.map((point) => (
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

      <CtaBand title="Let's meet." body="Talk with the Scalewrk team." />
    </>
  );
}
