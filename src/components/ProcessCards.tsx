import type { LucideIcon } from "lucide-react";
import { ScrollDots } from "./ScrollDots";

export type ProcessStep = { icon: LucideIcon; title: string; body: string[] };

/*
  Numbered process cards joined by lines (Home "How it works" and For Startups "How a search works").
  - `cols`: cards per row on desktop (3 or 4). Tablets always show 2 per row.
  - `ongoingLast`: tint the last card and tag it "Ongoing".
  - Phones: a swipeable row (each card about 80% wide, so the next one peeks in), with dots underneath.
*/
export function ProcessCards({ steps, cols = 3, ongoingLast = false }: { steps: ProcessStep[]; cols?: 3 | 4; ongoingLast?: boolean }) {
  const grid = cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  const rowId = `process-${steps.map((s) => s.title).join("-").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <>
    <ol
      id={rowId}
      className={`no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:gap-x-10 md:overflow-visible md:px-0 md:pb-0 ${grid}`}
    >
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        const ongoing = ongoingLast && last;
        // Line to the next card in the same row
        const lineMd = i % 2 === 0 && !last ? "md:flex" : "md:hidden";
        const lineLg = i % cols !== cols - 1 && !last ? "lg:flex" : "lg:hidden";
        return (
          <li
            key={step.title}
            className={`relative w-[82%] shrink-0 snap-start rounded-2xl border p-5 transition sm:w-[60%] sm:p-6 md:w-auto hover:shadow-[0_10px_30px_-15px_rgba(79,70,229,0.35)] ${
              ongoing ? "border-brand/20 bg-brand-soft/60" : "border-line bg-white hover:border-brand/30"
            }`}
          >
            {/* Soft icon badge (with the step number) and the title beside it */}
            <div className="flex items-center gap-4">
              <span className="relative flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-brand-soft text-brand">
                <step.icon className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
                <span className="btn-brand absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold">
                  {i + 1}
                </span>
              </span>
              <p className="text-xl leading-tight font-semibold tracking-tight">{step.title}</p>
              {ongoing && (
                <span className="ml-auto rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-brand-dark ring-1 ring-brand/20">
                  Ongoing
                </span>
              )}
            </div>
            <ul className="mt-4 space-y-1.5">
              {step.body.map((point) => (
                <li key={point} className="flex gap-2 leading-snug text-body">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-r from-violet to-blue" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            {/* Connecting line across the gap, at the height of the icons */}
            <span
              aria-hidden="true"
              className={`absolute top-[52px] -right-[41px] hidden h-0.5 w-10 bg-gradient-to-r from-violet/50 to-blue/50 ${lineMd} ${lineLg}`}
            />
          </li>
        );
      })}
    </ol>
    <ScrollDots targetId={rowId} count={steps.length} className="md:hidden" />
    </>
  );
}
