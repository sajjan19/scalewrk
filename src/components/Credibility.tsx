import Image from "next/image";
import { Container, Text } from "./ui";
import { clients, showClients } from "@/content/clients";
import { founders } from "@/content/founders";

// "Our founders have recruited for" strip: past employers, as text (no logos)
export function FounderExperienceStrip() {
  const companies = [...new Set(founders.flatMap((f) => f.experienceAt))];
  if (companies.length === 0) return null;
  return (
    <section className="border-b border-line py-8">
      <Container className="flex flex-col items-center gap-4 text-center lg:flex-row lg:justify-between lg:text-left">
        <p className="text-sm font-medium text-muted lg:max-w-[14rem]">Our founders have recruited engineers for</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {companies.map((c, i) => (
            <li key={i} className="text-xl font-semibold tracking-tight text-ink/70 sm:text-2xl">
              <Text>{c}</Text>
            </li>
          ))}
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
        {!showClients && (
          <p className="mb-4 rounded-lg bg-amber-50 px-4 py-2 text-center text-sm text-amber-900">
            Preview only: this section is hidden on the live site until you add real clients in <code>src/content/clients.ts</code>.
          </p>
        )}
        <p className="text-center text-sm font-medium text-muted">Startups we&apos;ve hired for</p>
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
