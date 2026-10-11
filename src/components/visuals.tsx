/*
  Visual building blocks: icon badges, step timelines and check/cross lists.
  Icons come from lucide-react (browse them at lucide.dev/icons).
*/
import type { LucideIcon } from "lucide-react";
import { Check, X } from "lucide-react";

// A soft brand-colored square with an icon inside
export function IconBadge({ icon: Icon, size = "md" }: { icon: LucideIcon; size?: "sm" | "md" | "lg" }) {
  const box = { sm: "h-9 w-9 rounded-lg", md: "h-11 w-11 rounded-xl", lg: "h-14 w-14 rounded-2xl" }[size];
  const glyph = { sm: "h-4.5 w-4.5", md: "h-5.5 w-5.5", lg: "h-7 w-7" }[size];
  return (
    <span className={`flex flex-none items-center justify-center bg-brand-soft text-brand ${box}`}>
      <Icon className={glyph} strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}

export type Step = { icon: LucideIcon; title: string; body: string };

/*
  Numbered steps joined by a line.
  Phones: vertical, line down the left. Desktop: horizontal, line across the top.
*/
export function StepTimeline({ steps }: { steps: Step[] }) {
  const cols = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-6" }[steps.length] ?? "lg:grid-cols-4";
  return (
    <ol
      className={`relative grid gap-8 lg:gap-6 ${cols}`}
      style={{ "--inset": `${50 / steps.length}%` } as React.CSSProperties}
    >
      {/* connecting line, from the first icon to the last */}
      <span
        aria-hidden="true"
        className="absolute top-7 bottom-7 left-7 w-px bg-gradient-to-b from-violet/40 to-blue/40 lg:right-[var(--inset)] lg:bottom-auto lg:left-[var(--inset)] lg:h-px lg:w-auto lg:bg-gradient-to-r"
      />
      {steps.map((step, i) => (
        <li key={step.title} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
          <span className="relative flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-white text-brand shadow-sm ring-1 ring-line">
            <step.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
            <span className="btn-brand absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold">
              {i + 1}
            </span>
          </span>
          <div className="pt-1 lg:pt-0">
            <p className="text-lg font-semibold">{step.title}</p>
            <p className="mt-1 leading-relaxed text-body">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// A row with a green check or a gray cross, for quick comparisons
export function YesNo({ yes, children }: { yes: boolean; children: React.ReactNode }) {
  return (
    <span className="flex items-start gap-2.5">
      {yes ? (
        <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-label="Yes" />
        </span>
      ) : (
        <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <X className="h-3.5 w-3.5" strokeWidth={2.5} aria-label="No" />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}
