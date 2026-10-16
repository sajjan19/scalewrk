import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { Rocket, UserRound } from "lucide-react";
import { CheckList, Container, Eyebrow } from "@/components/ui";
import { IconBadge } from "@/components/visuals";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Book a Call",
  description:
    "Book a call with Scalewrk. Founders: talk through the engineers and sales people you need to hire. Candidates: tell us what you want in your next startup role.",
  path: "/book-a-call",
});

// Every "Book a call" button links here (bookingHref in site.ts). The contact form lives on /contact.
export default function BookACallPage() {
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
          <div className="mt-8 grid gap-4 md:grid-cols-2">
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
              // Same card style as "What we do" on the Home page
              <div key={c.title} className={`flex flex-col rounded-2xl border border-line bg-white p-6 sm:p-8 ${c.theme}`}>
                <div className="flex items-center gap-4">
                  <IconBadge icon={c.icon} size="lg" />
                  <div>
                    <p className="text-sm font-medium text-brand">{c.audience}</p>
                    <p className="text-xl leading-tight font-semibold tracking-tight">{c.title}</p>
                  </div>
                </div>
                <p className="mt-5 text-sm text-muted">{c.intro}</p>
                <CheckList items={c.points} className="mt-3" />
              </div>
            ))}
          </div>

          <div className="mt-10">
            <CalendlyEmbed />
          </div>
        </Container>
      </section>

    </>
  );
}
