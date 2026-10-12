import Image from "next/image";
import Link from "next/link";
import { Quote } from "lucide-react";
import { Section, SectionHeading, Text } from "./ui";
import { visibleTestimonials } from "@/content/testimonials";

// Testimonials on the Home page. Hidden when there are none.
export function Testimonials() {
  if (visibleTestimonials.length === 0) return null;
  const hasExamples = visibleTestimonials.some((t) => t.example);
  return (
    <Section tone="mist">
      <SectionHeading eyebrow="Testimonials" title="What founders and engineers say" />
      {hasExamples && (
        <p className="mt-4 w-fit rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900 ring-1 ring-amber-200">
          Example testimonials: real ones coming soon
        </p>
      )}
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {visibleTestimonials.map((t, i) => (
          <li key={i} className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-line sm:p-8">
            <div className="flex items-center justify-between">
              <Quote className="h-7 w-7 text-brand" aria-hidden="true" />
              <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand-dark">{t.type}</span>
            </div>
            <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
            <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
              {t.photo ? (
                <Image src={t.photo} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
              ) : (
                <span className="btn-brand flex h-12 w-12 flex-none items-center justify-center rounded-full font-semibold" aria-hidden="true">
                  {t.type.charAt(0)}
                </span>
              )}
              <div className="min-w-0">
                <p className="font-semibold">
                  <Text>{t.name}</Text>
                </p>
                <p className="text-sm text-body">
                  {t.title} · <Text>{t.company}</Text>
                </p>
              </div>
              {t.example && (
                <span className="ml-auto self-start rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800">
                  Example
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-body">
        Worked with us?{" "}
        <Link href="/testimonial" className="font-medium text-brand hover:text-brand-dark">
          Share your experience →
        </Link>
      </p>
    </Section>
  );
}
