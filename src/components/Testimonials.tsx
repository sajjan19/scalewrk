import Link from "next/link";
import { Section, SectionHeading } from "./ui";
import { TestimonialCarousel } from "./TestimonialCarousel";
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
      <div className="mt-10">
        <TestimonialCarousel items={visibleTestimonials} />
      </div>
      <p className="mt-8 text-body">
        Worked with us?{" "}
        <Link href="/testimonial" className="rise inline-block font-medium text-brand hover:text-brand-dark">
          Share your experience →
        </Link>
      </p>
    </Section>
  );
}
