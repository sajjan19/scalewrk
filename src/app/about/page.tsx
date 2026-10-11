import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { PageHero, Section, SectionHeading, Text } from "@/components/ui";
import { founders } from "@/content/founders";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Scalewrk was founded by tech recruiters Punit Singh and Mandeep Sajjan to be the embedded hiring partner for venture-backed startups across the US.",
  path: "/about",
});

const values = [
  {
    title: "Honest",
    body: "We tell founders when a search will be hard and candidates when a role isn't right. Trust is the whole business.",
  },
  {
    title: "Selective",
    body: "A short list of the right people beats a long list of maybes. Your time is the scarcest thing at a startup.",
  },
  {
    title: "Embedded",
    body: "We learn your company once and keep showing up. The goal is to be the recruiter you call for every engineering hire.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Scalewrk"
        title="Recruiters who speak engineering."
        intro="The best startup hires come from recruiters who understand the work and stick around. We meet founders at tech events, learn what they're building, and become the team they call whenever they need an engineer."
      />

      <Section>
        <SectionHeading eyebrow="The founders" title="Who you'll work with" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {founders.map((f) => (
            <article key={f.name} className="flex flex-col rounded-2xl border border-line p-6 sm:p-8">
              <div className="flex items-center gap-4">
                {f.photo ? (
                  <Image src={f.photo} alt={f.name} width={80} height={80} className="h-20 w-20 rounded-full object-cover" />
                ) : (
                  <div
                    className="flex h-20 w-20 flex-none items-center justify-center rounded-full bg-gradient-to-br from-violet to-blue text-xl font-semibold text-white"
                    aria-hidden="true"
                    title="PLACEHOLDER: founder photo"
                  >
                    {f.initials}
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold">{f.name}</h3>
                  <p className="text-body">{f.title}</p>
                  <p className="text-sm text-muted">
                    <Text>{f.location}</Text>
                  </p>
                </div>
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
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="border-t border-ink/10 pt-6">
              <p className="text-lg font-semibold">{v.title}</p>
              <p className="mt-2 leading-relaxed text-body">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand title="Let's meet." body="Book a 20-minute call with a Scalewrk co-founder." />
    </>
  );
}
