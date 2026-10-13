import { bookingHref } from "@/content/site";
import { Arrow, CalendarIcon, Button, Container } from "./ui";

// Dark "Book a call" band used at the bottom of most pages.
// Pass `action` to use a different button (e.g. "Share your profile" on engineer pages).
export function CtaBand({
  title = "Ready to grow your team?",
  body = "Tell us what you're building and we'll help you find the engineers to build it.",
  action,
}: {
  title?: string;
  body?: string;
  action?: { href: string; label: string };
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
            {action ? (
              <Button href={action.href} variant="brand" className="mt-8 w-full sm:w-auto">
                {action.label} <Arrow />
              </Button>
            ) : (
              <Button href={bookingHref} variant="brand" className="mt-8 w-full sm:w-auto">
                <CalendarIcon /> Book a call
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
