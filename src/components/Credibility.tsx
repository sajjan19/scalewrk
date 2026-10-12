import Image from "next/image";
import { Container, Text } from "./ui";
import { clients, showClients } from "@/content/clients";
import { founders } from "@/content/founders";
import { companyLogos } from "@/content/companyLogos";

// "Our founders have recruited for" strip: past employers in brand colors (or official logo files).
// The logos scroll right to left in a loop (see .marquee in globals.css).
export function FounderExperienceStrip() {
  const companies = [...new Set(founders.flatMap((f) => f.experienceAt))];
  if (companies.length === 0) return null;
  // Repeat the logos so one set is wider than the screen, then show that set twice for a seamless loop
  const oneSet = Array.from({ length: 4 }, () => companies).flat();
  return (
    <section className="border-b border-line py-8">
      <Container>
        {/* No visible label (the user's choice). Screen readers still hear what the logos mean,
            and get the plain list once; the moving logos are just for show. */}
        <p className="sr-only">Our founders have recruited for</p>
        <ul className="sr-only">
          {companies.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
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
      </Container>
    </section>
  );
}

// One company: official logo file, or brand symbol + name, or a placeholder letter tile
function CompanyMark({ name }: { name: string }) {
  const logo = companyLogos[name] ?? {};
  if (logo.image) {
    return <Image src={logo.image} alt="" width={140} height={36} className="h-8 w-auto shrink-0 object-contain" />;
  }
  return (
    <span className="flex shrink-0 items-center gap-2.5" style={logo.color ? { color: logo.color } : undefined}>
      {logo.iconPath ? (
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
          <path d={logo.iconPath} />
        </svg>
      ) : (
        <span
          className="flex h-7 w-7 items-center justify-center rounded-md border border-dashed border-ink/30 text-xs font-semibold text-ink/60"
          title="Placeholder logo"
        >
          {name.charAt(0)}
        </span>
      )}
      <span className={`text-xl font-semibold tracking-tight whitespace-nowrap sm:text-2xl ${logo.color ? "" : "text-ink/60"}`}>
        <Text>{name}</Text>
      </span>
    </span>
  );
}

// "Startups we've hired for" section: only real clients who agreed to be listed
export function ClientsSection() {
  const visible = showClients || process.env.NODE_ENV === "development";
  if (!visible || clients.length === 0) return null;
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <p className="text-center text-sm font-medium text-muted">Startups we&apos;ve hired for</p>
        {clients.some((c) => c.name.startsWith("[")) && (
          <p className="mx-auto mt-2 w-fit rounded-full bg-amber-50 px-3 py-1 text-center text-xs font-medium text-amber-900 ring-1 ring-amber-200">
            Placeholder: client names coming soon
          </p>
        )}
        <ul className="mt-6 flex flex-wrap justify-center gap-3">
          {clients.map((client, i) => (
            <li key={i} className="flex h-20 w-[calc(50%-0.375rem)] items-center justify-center rounded-2xl border border-line bg-white px-4 text-center sm:w-44">
              {client.logo ? (
                <Image src={client.logo} alt={client.name} width={140} height={40} className="max-h-10 w-auto object-contain" />
              ) : (
                <span className="text-sm font-semibold text-ink/70">
                  <Text>{client.name}</Text>
                </span>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
