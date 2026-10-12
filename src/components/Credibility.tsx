import Image from "next/image";
import { Container, Text } from "./ui";
import { clients, showClients } from "@/content/clients";
import { founders } from "@/content/founders";
import { companyLogos } from "@/content/companyLogos";

// "Our founder has recruited for" strip: past employers, in brand colors (or official logo files)
export function FounderExperienceStrip() {
  const companies = [...new Set(founders.flatMap((f) => f.experienceAt))];
  if (companies.length === 0) return null;
  return (
    <section className="border-b border-line py-8">
      <Container className="flex flex-col items-center gap-5 text-center lg:flex-row lg:justify-between lg:text-left">
        <p className="text-sm font-medium text-muted lg:max-w-[14rem]">Our founder has recruited for</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {companies.map((c, i) => {
            const logo = companyLogos[c] ?? {};
            // Official logo file: shown on its own (it already includes the company's typography)
            if (logo.image) {
              return (
                <li key={i}>
                  <Image src={logo.image} alt={c} width={140} height={36} className="h-8 w-auto object-contain" />
                </li>
              );
            }
            return (
              <li key={i} className="flex items-center gap-2.5" style={logo.color ? { color: logo.color } : undefined}>
                {logo.iconPath ? (
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
                    <path d={logo.iconPath} />
                  </svg>
                ) : (
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-dashed border-ink/30 text-xs font-semibold text-ink/60"
                    title="Placeholder logo"
                    aria-hidden="true"
                  >
                    {c.charAt(0)}
                  </span>
                )}
                <span className={`text-xl font-semibold tracking-tight sm:text-2xl ${logo.color ? "" : "text-ink/60"}`}>
                  <Text>{c}</Text>
                </span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
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
