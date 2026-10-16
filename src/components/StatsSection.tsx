import { Container } from "./ui";
import { stats } from "@/content/stats";

// "By the numbers" on the Home page. Numbers live in src/content/stats.ts.
// Live site: only the stats that have a real value. Local preview: all of them, empty ones as amber placeholders.
export function StatsSection() {
  const filled = stats.filter((s) => s.value);
  const preview = process.env.NODE_ENV === "development";
  const shown = preview ? stats : filled;
  if (shown.length === 0) return null;
  return (
    <section className="border-y border-line py-12 sm:py-16">
      <Container>
        <p className="text-center text-xs font-semibold tracking-[0.14em] text-muted uppercase">By the numbers</p>
        {preview && filled.length < stats.length && (
          <p className="mx-auto mt-2 w-fit rounded-full bg-amber-50 px-3 py-1 text-center text-xs font-medium text-amber-900 ring-1 ring-amber-200">
            Placeholder: only filled-in numbers show on the live site (src/content/stats.ts)
          </p>
        )}
        <dl className={`mt-8 grid grid-cols-2 gap-x-4 gap-y-8 text-center ${shown.length >= 4 ? "lg:grid-cols-4" : shown.length === 3 ? "lg:grid-cols-3" : ""}`}>
          {shown.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                {s.value ? (
                  <span className="text-gradient text-4xl font-semibold tracking-tight sm:text-5xl">{s.value}</span>
                ) : (
                  <span className="placeholder text-3xl font-semibold sm:text-4xl">{s.placeholder}</span>
                )}
                <span className="mx-auto mt-2 block max-w-[16rem] text-sm leading-snug text-body">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
