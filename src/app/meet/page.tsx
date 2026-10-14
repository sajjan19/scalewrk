import Link from "next/link";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { CircleDollarSign, Code2, MapPin } from "lucide-react";
import { Arrow, CalendarIcon, Container } from "@/components/ui";
import { IconBadge } from "@/components/visuals";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

/*
  /meet — the page behind the QR code at events and demo days.
  Hidden from search engines and left out of the sitemap on purpose.
*/
export const metadata = pageMetadata({
  title: "Great meeting you",
  description:
    "Scalewrk is the tech recruiter for growing startups. Book a call.",
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
          We&apos;re the tech recruiter for growing startups. When you&apos;re ready to hire engineers or sales people, we&apos;re ready to help.
        </p>

        <ul className="mt-6 space-y-3">
          {[
            { icon: Code2, text: "Engineers across AI, software, hardware and more, plus sales and GTM roles" },
            { icon: MapPin, text: "Seed to Series C+ startups across the US and Canada" },
            { icon: CircleDollarSign, text: "You only pay when you hire" },
          ].map((item) => (
            <li key={item.text} className="flex items-center gap-3 text-body">
              <IconBadge icon={item.icon} size="sm" />
              {item.text}
            </li>
          ))}
        </ul>

        <a
          href="#book"
          className="btn-brand lift mt-8 flex min-h-14 items-center justify-center gap-2 rounded-xl text-base font-medium"
        >
          <CalendarIcon /> Book a call
        </a>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <a
            href="/scalewrk.vcf"
            className="lift flex min-h-12 items-center justify-center rounded-xl bg-white text-[15px] font-medium ring-1 ring-line hover:ring-brand/30"
          >
            Save our contact
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="lift flex min-h-12 items-center justify-center rounded-xl bg-white text-[15px] font-medium ring-1 ring-line hover:ring-brand/30"
          >
            LinkedIn
          </a>
        </div>

        <div id="book" className="mt-12 scroll-mt-20">
          <CalendlyEmbed height={680} />
        </div>

        <div className="mt-10 text-[15px]">
          <Link href="/share-profile" className="lift block rounded-xl bg-mist p-4 hover:bg-white hover:ring-1 hover:ring-brand/30">
            <span className="font-medium">Engineer?</span>
            <span className="flex items-center gap-1.5 text-body">Share your profile <Arrow /></span>
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
