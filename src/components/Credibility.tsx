import Image from "next/image";
import { ArrowUpRight, MapPin, Rocket, Scale, UserCheck } from "lucide-react";
import { Container, Text } from "./ui";
import { clients, showClients, type Client } from "@/content/clients";
import { founders } from "@/content/founders";
import { alsoRecruitedFor, companyLogos } from "@/content/companyLogos";

// "Our founders have recruited for" strip: past employers in brand colors (or official logo files).
// The logos scroll right to left in a loop (see .marquee in globals.css).
export function FounderExperienceStrip() {
  const companies = [...new Set([...founders.flatMap((f) => f.experienceAt), ...alsoRecruitedFor])];
  if (companies.length === 0) return null;
  // Repeat the logos so one set is wider than the screen, then show that set twice for a seamless loop
  const oneSet = Array.from({ length: 6 }, () => companies).flat();
  return (
    <section className="border-b border-line py-8">
      <Container>
        {/* Label above the logos so they don't read as clients: these are where the team has recruited */}
        <p className="mb-5 text-center text-sm font-medium text-muted">Where our team has recruited</p>
        {/* Screen readers get the plain list once; the moving logos are just for show */}
        <ul className="sr-only">
          {companies.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Container>
      {/* Logos run the full width of the screen */}
      <div className="marquee w-full" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-x-14 pr-14">
              {oneSet.map((c, i) => (
                <CompanyMark key={i} name={c} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// One company: official logo file, or brand symbol + name, or a placeholder letter tile
function CompanyMark({ name }: { name: string }) {
  const logo = companyLogos[name] ?? {};
  if (logo.image) {
    return <Image src={logo.image} alt="" width={140} height={36} loading="eager" className="h-8 w-auto shrink-0 object-contain" />;
  }
  return (
    <span className="flex shrink-0 items-center gap-2.5" style={logo.color ? { color: logo.color } : undefined}>
      {logo.iconPath && (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
          <path d={logo.iconPath} />
        </svg>
      )}
      {/* No logo file yet: just the company name */}
      <span className={`text-xl font-semibold tracking-tight whitespace-nowrap sm:text-2xl ${logo.color ? "" : "text-ink"}`}>
        <Text>{name}</Text>
      </span>
    </span>
  );
}

// "Recent placements" section: only real clients who agreed to be listed
export function ClientsSection() {
  const visible = showClients || process.env.NODE_ENV === "development";
  if (!visible || clients.length === 0) return null;
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <p className="text-center text-sm font-medium text-muted">Recent placements</p>
        {clients.some((c) => c.name.startsWith("[")) && (
          <p className="mx-auto mt-2 w-fit rounded-full bg-amber-50 px-3 py-1 text-center text-xs font-medium text-amber-900 ring-1 ring-amber-200">
            Placeholder: client names coming soon
          </p>
        )}
        <ul className="mt-6 flex flex-wrap justify-center gap-4">
          {clients.map((client, i) => (
            <li key={i} className="w-full max-w-md">
              <ClientCard client={client} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

// One "Recent placements" card: company, the role we filled and a few facts.
// Only the company row links to their site (new tab) when `url` is set.
function ClientCard({ client }: { client: Client }) {
  const facts = [
    { icon: Rocket, text: client.stage },
    { icon: Scale, text: client.industry },
    { icon: MapPin, text: client.location },
  ].filter((f): f is { icon: typeof Rocket; text: string } => Boolean(f.text));
  const domain = client.url?.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  // Logo, name, website and ↗ (the only part that links to their site)
  const company = (
    <>
      {client.logo ? (
        <Image src={client.logo} alt="" width={112} height={112} className="h-14 w-14 flex-none rounded-xl object-cover" />
      ) : (
        <span className="btn-brand flex h-14 w-14 flex-none items-center justify-center rounded-xl text-xl font-semibold" aria-hidden="true">
          {client.name.charAt(0)}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-brand">
          <Text>{client.name}</Text>
        </span>
        {domain && <span className="block text-sm text-muted">{domain}</span>}
      </span>
      {client.url && (
        <ArrowUpRight
          className="h-5 w-5 flex-none text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
          aria-hidden="true"
        />
      )}
    </>
  );

  const inner = (
    <>
      {client.url ? (
        <a
          href={client.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${client.name} website (opens in a new tab)`}
          className="group -m-2 flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-mist"
        >
          {company}
        </a>
      ) : (
        <span className="flex items-center gap-4">{company}</span>
      )}

      {/* The role we filled */}
      {client.role && (
        <span className="mt-5 flex items-center gap-3 rounded-xl bg-brand-soft px-4 py-3">
          <UserCheck className="h-5 w-5 flex-none text-brand" aria-hidden="true" />
          <span>
            <span className="block text-xs font-medium tracking-wide text-brand-dark uppercase">Role filled</span>
            <span className="block font-semibold text-ink">{client.role}</span>
          </span>
        </span>
      )}

      {/* Stage, industry and location */}
      {facts.length > 0 && (
        <span className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-body">
          {facts.map((f) => (
            <span key={f.text} className="inline-flex items-center gap-1.5">
              <f.icon className="h-4 w-4 text-brand" aria-hidden="true" />
              <Text>{f.text}</Text>
            </span>
          ))}
        </span>
      )}
    </>
  );
  return <div className="block w-full max-w-md rounded-2xl border border-line bg-white p-5 text-left sm:p-6">{inner}</div>;
}
