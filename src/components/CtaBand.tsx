import { bookingHref } from "@/content/site";
import { CalendarIcon, Button, Container } from "./ui";

// Dark "Book a call" band used at the bottom of most pages.
export function CtaBand({
  title = "Hiring engineers this quarter?",
  body = "Book a call. We'll talk about your roles and tell you honestly if we can help.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-12 text-white sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-violet to-blue opacity-40 blur-3xl"
          />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/75">{body}</p>
            <Button href={bookingHref} variant="brand" className="mt-8 w-full sm:w-auto">
              <CalendarIcon /> Book a call
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
