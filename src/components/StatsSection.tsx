import { Container } from "./ui";
import { CountUp } from "./CountUp";
import { StarField } from "./StarField";
import { showExampleStats, stats } from "@/content/stats";

// "By the numbers" on the Home page. Numbers live in src/content/stats.ts.
// Stats without a real value show their example number (tagged "Example") while showExampleStats is on.
export function StatsSection() {
  const filled = stats.filter((s) => s.value);
  const preview = showExampleStats || process.env.NODE_ENV === "development";
  const shown = preview ? stats : filled;
  if (shown.length === 0) return null;
  return (
    <section className="relative overflow-hidden border-b border-line py-12 sm:py-16">
      <StarField seed={11} count={30} />
      <Container className="relative">
        <p className="text-center text-sm font-medium text-brand">By the numbers</p>
        {preview && filled.length < stats.length && (
          <p className="mx-auto mt-2 w-fit rounded-full bg-amber-50 px-3 py-1 text-center text-xs font-medium text-amber-900 ring-1 ring-amber-200">
            Placeholder: these are example numbers, not real results yet
          </p>
        )}
        <dl className={`mt-8 grid grid-cols-2 gap-x-4 gap-y-8 text-center ${shown.length >= 4 ? "lg:grid-cols-4" : shown.length === 3 ? "lg:grid-cols-3" : ""}`}>
          {shown.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <CountUp value={s.value || s.example} className="text-gradient text-4xl font-semibold tracking-tight sm:text-5xl" />
                {!s.value && (
                  <span className="mx-auto mt-1 block w-fit rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-900 ring-1 ring-amber-200">
                    Example
                  </span>
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
