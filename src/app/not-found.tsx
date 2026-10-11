import { Arrow, Button, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-2xl text-center">
        <p className="font-mono text-sm text-brand">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">This page isn&apos;t here.</h1>
        <p className="mt-4 text-lg text-body">But we&apos;re still hiring engineers for great startups.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/">
            Go home <Arrow />
          </Button>
          <Button href="/contact#book" variant="brand">
            Book a call
          </Button>
        </div>
      </Container>
    </section>
  );
}
