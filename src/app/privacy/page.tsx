import { Container, Text } from "@/components/ui";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy",
  description:
    "How Scalewrk handles the information you share with us.",
  path: "/privacy",
});

// PLACEHOLDER: have a lawyer review this before launch.
export default function PrivacyPage() {
  return (
    <section className="py-12 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight">Privacy</h1>
        <p className="mt-3 text-muted">
          <Text>Last updated [PLACEHOLDER: date]. This summary should be reviewed by a lawyer before launch.</Text>
        </p>

        <div className="mt-10 space-y-8 leading-relaxed text-body [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink">
          <div>
            <h2>What we collect</h2>
            <p>
              Only what you choose to send us. When you contact us, that&apos;s your name, email, company and message. If you
              share your profile as an engineer, that&apos;s your LinkedIn, resume and job preferences. When you book a call, our
              booking tool saves the details you enter.
            </p>
          </div>
          <div>
            <h2>How we use it</h2>
            <p>
              To reply to you, to match engineers with roles and to run our recruiting work. We only share an engineer&apos;s
              profile with a company if they say yes. We never sell personal information.
            </p>
          </div>
          <div>
            <h2>Services we use</h2>
            <p>
              Our site runs on Vercel, which gives us simple visitor stats without cookies. Formspree handles our forms. Calendly
              handles call booking. Each follows its own privacy policy.
            </p>
          </div>
          <div>
            <h2>Your choices</h2>
            <p>
              You can ask us to see, update or delete your information at any time. Just email{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-brand">
                {site.email}
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
