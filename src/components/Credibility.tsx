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
