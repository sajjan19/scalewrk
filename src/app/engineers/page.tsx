import Link from "next/link";
import { Briefcase, Eye, FileText, Handshake, Lock, MapPin, MessageSquare, Phone, Target } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { ProcessCards } from "@/components/ProcessCards";
import { Arrow, Button, PageHero, Section, SectionHeading } from "@/components/ui";
import { IconBadge } from "@/components/visuals";
import { visibleJobs } from "@/content/jobs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Startup Jobs for Engineers",
  description:
    "Looking for an engineering role at a growing startup? Scalewrk matches AI/ML, backend, full-stack, frontend and platform engineers with startups across the US and Canada.",
  path: "/engineers",
});

// Only real (non-example) jobs count as open roles
const realJobs = visibleJobs.filter((j) => !j.example).length;

// How it works for engineers (same card style as the startup process)
const steps = [
  { icon: FileText, title: "Share your profile", body: ["Your LinkedIn or resume", "What you want next"] },
  { icon: Phone, title: "Intro call", body: ["We learn your goals", "Stack, stage and pay"] },
  { icon: Target, title: "Roles that fit", body: ["Only startups that match", "The real story up front"] },
  { icon: Handshake, title: "Interviews and offer", body: ["We guide you through each step", "Honest feedback either way"] },
];

// What engineers can count on
const promises = [
  { icon: Eye, text: "The real story up front: stage, team, role and pay" },
  { icon: Target, text: "We only reach out when a role fits what you want" },
  { icon: MessageSquare, text: "Honest feedback, yes or no" },
  { icon: Lock, text: "We never share your profile without your OK" },
  { icon: MapPin, text: "Roles across the US and Canada. Remote, hybrid or open to moving? Tell us." },
];

export default function EngineersPage() {
  return (
    <div className="theme-engineer">
      <PageHero
        eyebrow="For engineers"
        title={
          <>
            Find your <span className="text-gradient">next startup role</span>.
          </>
        }
        intro="We work with startups across the US and Canada that need great engineers. We'll match you with one where you can thrive."
      >
        <Button href="/share-profile" variant="brand">
          Share your profile <Arrow />
        </Button>
        <Button href="/jobs" variant="secondary">
          See open jobs <Arrow />
        </Button>
      </PageHero>

      {/* How it works */}
      <Section>
        <SectionHeading eyebrow="How we work" title="From profile to offer" />
        <div className="mt-12">
          <ProcessCards steps={steps} cols={4} />
        </div>
      </Section>

      {/* What you can count on */}
      <Section tone="mist">
        <SectionHeading eyebrow="What you can count on" title="Recruiting that respects your time" />
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {promises.map((item) => (
            <li key={item.text} className="flex items-start gap-3 rounded-2xl bg-white p-5 ring-1 ring-line">
              <IconBadge icon={item.icon} size="sm" />
              <span className="text-[15px] leading-relaxed text-body">{item.text}</span>
            </li>
          ))}
          {/* Shortcut to the jobs board (fills the last grid spot) */}
          <li>
            <Link
              href="/jobs"
              className="lift group flex h-full items-start gap-3 rounded-2xl border border-brand/20 bg-brand-soft p-5 hover:border-brand/40 hover:shadow-[0_10px_30px_-15px_rgba(79,70,229,0.35)]"
            >
              <span className="btn-brand flex h-9 w-9 flex-none items-center justify-center rounded-lg">
                <Briefcase className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <span className="flex-1">
                <span className="flex items-center justify-between gap-2 font-semibold text-ink">
                  View all jobs
                  <span className="text-brand">
                    <Arrow />
                  </span>
                </span>
                <span className="mt-0.5 block text-sm leading-relaxed text-body">
                  {realJobs > 0
                    ? `${realJobs} open ${realJobs === 1 ? "role" : "roles"} at startups across the US and Canada`
                    : "See example listings at startups across the US and Canada"}
                </span>
              </span>
            </Link>
          </li>
        </ul>
      </Section>

      <CtaBand
        title="Ready for your next role?"
        body="Share your profile. It takes about two minutes."
        action={{ href: "/share-profile", label: "Share your profile" }}
      />
    </div>
  );
}
