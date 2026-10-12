import Image from "next/image";
import { Filter, HeartHandshake, MessageCircle } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { IconBadge } from "@/components/visuals";
import { PageHero, Section, SectionHeading, Text } from "@/components/ui";
import { founders } from "@/content/founders";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Scalewrk was founded by tech recruiters Punit Singh and Mandeep Sajjan to be the embedded hiring partner for growing startups across the US and Canada.",
  path: "/about",
});

const values = [
  {
    icon: MessageCircle,
    title: "Honest",
    body: "We tell founders when a role will be hard to fill. We tell engineers when a job isn't right for them.",
  },
  {
    icon: Filter,
    title: "Selective",
    body: "A few of the right people beat a long list of maybes. Your time matters.",
  },
  {
    icon: HeartHandshake,
    title: "Here for the long run",
    body: "We learn your company once and keep showing up. We want to be your recruiter for every engineering hire.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Scalewrk"
        title={
          <>
            Recruiters who <span className="text-gradient">speak engineering</span>.
          </>
        }
        intro="Great hires come from recruiters who understand the work and stick around. We meet founders at tech events, learn what they're building and become the team they call for every engineer."
      />

      <Section>
        <SectionHeading eyebrow="The founders" title="Who you'll work with" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {founders.map((f) => (
            <article key={f.name} className="flex flex-col rounded-2xl border border-line p-6 sm:p-8">
              {f.photo ? (
                <Image
                  src={f.photo}
                  alt={`${f.name}, ${f.title} of Scalewrk`}
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
                <p className="mt-1 text-body">
                  {f.title} · <Text>{f.location}</Text>
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

              <a
                href={f.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 pt-6 font-medium text-brand hover:text-brand-dark"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
                {f.name.split(" ")[0]} on LinkedIn
              </a>
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
              <p className="mt-2 leading-relaxed text-body">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand title="Let's meet." body="Book a call with a Scalewrk co-founder." />
    </>
  );
}
