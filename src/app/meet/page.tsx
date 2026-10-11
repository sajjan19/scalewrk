import Link from "next/link";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { CheckList, Container } from "@/components/ui";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

/*
  /meet — the page behind the QR code at events and demo days.
  Hidden from search engines and left out of the sitemap on purpose.
*/
export const metadata = pageMetadata({
  title: "Great meeting you",
  description:
    "Scalewrk is the tech recruiter for venture-backed startups. Book a 20-minute call.",
  path: "/meet",
  noindex: true,
});

export default function MeetPage() {
  return (
    <section className="pt-10 pb-16 sm:pt-16">
      <Container className="max-w-2xl">
        <p className="text-sm font-medium text-brand">Scalewrk</p>
        <h1 className="mt-2 text-[2.5rem] leading-[1.05] font-semibold tracking-tight sm:text-6xl">
          Great meeting <span className="text-gradient">you.</span>
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-body">
          We&apos;re the tech recruiter for venture-backed startups. When you&apos;re ready to hire engineers, we&apos;re ready to help.
        </p>

        <CheckList
          className="mt-6"
          items={[
            "AI/ML, backend, full-stack, frontend, and platform engineers",
            "Seed through Series C+, across the US",
            "Fee per hire: you only pay when you hire",
          ]}
        />

        <a
          href="#book"
          className="btn-brand mt-8 flex min-h-14 items-center justify-center rounded-xl text-base font-medium"
        >
          Book a 20-minute call
        </a>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <a
            href="/scalewrk.vcf"
            className="flex min-h-12 items-center justify-center rounded-xl text-[15px] font-medium ring-1 ring-line"
          >
            Save our contact
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center rounded-xl text-[15px] font-medium ring-1 ring-line"
          >
            LinkedIn
          </a>
        </div>

        <div id="book" className="mt-12 scroll-mt-20">
          <CalendlyEmbed height={680} />
        </div>

        <div className="mt-10 grid gap-3 text-[15px] sm:grid-cols-2">
          <Link href="/partners" className="rounded-xl bg-mist p-4 hover:bg-line/60">
            <span className="font-medium">Investor, lawyer, or CFO?</span>
            <span className="block text-body">Refer your founders →</span>
          </Link>
          <Link href="/engineers" className="rounded-xl bg-mist p-4 hover:bg-line/60">
            <span className="font-medium">Engineer?</span>
            <span className="block text-body">Share your profile →</span>
          </Link>
        </div>

        <p className="mt-10 text-center text-sm text-muted">
          <Link href="/" className="underline hover:text-ink">
            Visit scalewrk.ai
          </Link>{" "}
          · <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </Container>
    </section>
  );
}
