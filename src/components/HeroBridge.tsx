"use client";

import { useEffect, useState } from "react";
import {
  Boxes,
  Braces,
  BrainCircuit,
  ChartLine,
  Cloud,
  Code,
  Cpu,
  Database,
  Handshake,
  HeartHandshake,
  Layers,
  Megaphone,
  Monitor,
  Network,
  Phone,
  Presentation,
  Puzzle,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { LogoMark } from "./Logo";

/*
  Home hero option "bridge": people on the left (engineers and salespeople), startups on the right and
  Scalewrk in the middle. Every couple of seconds one person and one startup light up and a glowing line joins
  them through the S, with a "Matched" tag. When it moves on, those two cards swap in a new role and startup.
  Purely illustrative (no real people or companies). Styles: "Hero bridge" in globals.css.
  People who turn off motion see the first pair lit, standing still.
*/

// Roles that rotate through the left cards
const people: { icon: LucideIcon; title: string; detail: string }[] = [
  { icon: BrainCircuit, title: "AI Engineer", detail: "Engineering" },
  { icon: Code, title: "Backend Engineer", detail: "Engineering" },
  { icon: Handshake, title: "Account Executive", detail: "Sales" },
  { icon: TrendingUp, title: "Head of Sales", detail: "Sales" },
  { icon: Sparkles, title: "Founding Engineer", detail: "Engineering" },
  { icon: Phone, title: "Sales Manager", detail: "Sales" },
  { icon: Monitor, title: "Frontend Engineer", detail: "Engineering" },
  { icon: Wrench, title: "Solutions Engineer", detail: "Sales" },
  { icon: Layers, title: "Full-Stack Engineer", detail: "Engineering" },
  { icon: HeartHandshake, title: "Customer Success", detail: "Go-to-market" },
  { icon: Cloud, title: "DevOps Engineer", detail: "Engineering" },
  { icon: ChartLine, title: "VP of Sales", detail: "Sales" },
  { icon: Database, title: "Data Engineer", detail: "Engineering" },
  { icon: Smartphone, title: "Mobile Engineer", detail: "Engineering" },
  { icon: Users, title: "Engineering Manager", detail: "Engineering" },
  { icon: Presentation, title: "Sales Engineer", detail: "Sales" },
  { icon: ShieldCheck, title: "Security Engineer", detail: "Engineering" },
  { icon: Network, title: "Head of Engineering", detail: "Engineering" },
  { icon: Megaphone, title: "Head of Growth", detail: "Go-to-market" },
  { icon: Cpu, title: "ML Engineer", detail: "Engineering" },
  { icon: Braces, title: "Staff Engineer", detail: "Engineering" },
  { icon: Handshake, title: "Enterprise Sales", detail: "Sales" },
  { icon: Boxes, title: "Platform Engineer", detail: "Engineering" },
  { icon: Puzzle, title: "Product Engineer", detail: "Engineering" },
];
// Kinds of startups that rotate through the right cards: stage and industry
const startups = [
  { title: "Seed", detail: "AI startup" },
  { title: "Series A", detail: "Fintech" },
  { title: "Series B", detail: "Health tech" },
  { title: "Series A", detail: "Dev tools" },
  { title: "Pre-seed", detail: "Climate tech" },
  { title: "Series C", detail: "Cybersecurity" },
  { title: "Seed", detail: "Legal tech" },
  { title: "Series B", detail: "E-commerce" },
  { title: "Series A", detail: "Robotics" },
  { title: "Seed", detail: "Edtech" },
  { title: "Series C", detail: "Fintech" },
  { title: "Series A", detail: "Proptech" },
  { title: "Series B", detail: "Mortgage AI" },
  { title: "Seed", detail: "Insurtech" },
  { title: "Series C", detail: "Marketplace" },
  { title: "Series A", detail: "HR tech" },
  { title: "Pre-seed", detail: "Consumer AI" },
  { title: "Series B", detail: "Logistics" },
  { title: "Seed", detail: "Data infra" },
  { title: "Series A", detail: "Biotech" },
  { title: "Series C", detail: "Healthcare AI" },
  { title: "Seed", detail: "Gaming" },
  { title: "Series B", detail: "Supply chain" },
  { title: "Series A", detail: "Space tech" },
];
// Who meets whom, in order: [person, startup]
const pairs: [number, number][] = [
  [0, 0], [2, 1], [1, 3], [3, 2], [0, 1], [2, 0], [1, 2], [3, 3],
];
// Row centres, as % of the height (the lines are drawn to the same spots)
const rows = [12.5, 37.5, 62.5, 87.5];
const STEP_MS = 4000; // how long each match stays up

// Line from a person card (left) to the S, and from the S to a startup card (right), in a 0–100 box
const leftLine = (y: number) => `M 34 ${y} C 41 ${y}, 39 50, 45 50`;
const rightLine = (y: number) => `M 55 50 C 61 50, 59 ${y}, 66 ${y}`;

export function HeroBridge({ className = "" }: { className?: string }) {
  // Counts up every STEP_MS. People who turn off motion keep the first pair lit, with nothing moving.
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setStep((n) => n + 1), STEP_MS);
    return () => window.clearInterval(timer);
  }, []);

  const [p, s] = pairs[step % pairs.length];

  // What each card shows: the cards start with the first four of each list. Once a match is done and the
  // line moves on to the next pair, the two cards that were just matched swap in a new role and a new startup.
  // (The next pair is never on the same cards, so a card never changes while it is lit.)
  const shown = (side: 0 | 1, slot: number, pool: number) => {
    for (let n = step; n >= 1 && n > step - pairs.length; n--) {
      if (pairs[(n - 1) % pairs.length][side] === slot) return (3 + n) % pool;
    }
    return slot;
  };

  return (
    <div className={`hero-bridge relative mx-auto aspect-[5/4] w-full max-w-lg lg:mx-0 lg:justify-self-end ${className}`} aria-hidden="true">
      {/* Lines: faint for everyone, bright for the pair being matched */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        {rows.map((y, i) => (
          <path key={`l${i}`} d={leftLine(y)} vectorEffect="non-scaling-stroke" className={`bridge-line ${i === p ? "is-on is-left" : ""}`} />
        ))}
        {rows.map((y, i) => (
          <path key={`r${i}`} d={rightLine(y)} vectorEffect="non-scaling-stroke" className={`bridge-line ${i === s ? "is-on is-right" : ""}`} />
        ))}
      </svg>

      {/* People */}
      {rows.map((_, i) => {
        const at = shown(0, i, people.length);
        const person = people[at];
        return (
          <div
            key={`p${i}`}
            className={`bridge-card glass-dark absolute left-0 flex w-[34%] -translate-y-1/2 items-center gap-2 rounded-xl p-2 text-white sm:gap-2.5 sm:p-2.5 ${i === p ? "is-on is-person" : ""}`}
            style={{ top: `${rows[i]}%` }}
          >
            {/* key = which role, so a new one flips in. Very small phones (under 380px) hide the icon and the second line so the cards fit */}
            <span key={at} className="bridge-swap flex min-w-0 items-center gap-2 sm:gap-2.5">
              <span className="hidden h-7 w-7 flex-none items-center justify-center rounded-full bg-violet-400/20 text-violet-200 min-[380px]:flex sm:h-8 sm:w-8">
                <person.icon className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] leading-tight font-semibold sm:text-[13px]">{person.title}</span>
                <span className="hidden truncate text-[10px] text-white/55 min-[380px]:block sm:text-xs">{person.detail}</span>
              </span>
            </span>
          </div>
        );
      })}

      {/* Startups */}
      {rows.map((_, i) => {
        const at = shown(1, i, startups.length);
        const startup = startups[at];
        return (
          <div
            key={`s${i}`}
            className={`bridge-card glass-dark absolute right-0 flex w-[34%] -translate-y-1/2 items-center gap-2 rounded-xl p-2 text-white sm:gap-2.5 sm:p-2.5 ${i === s ? "is-on is-startup" : ""}`}
            style={{ top: `${rows[i]}%` }}
          >
            <span key={at} className="bridge-swap flex min-w-0 items-center gap-2 sm:gap-2.5">
              <span className="hidden h-7 w-7 flex-none items-center justify-center rounded-full bg-blue-400/20 text-blue-200 min-[380px]:flex sm:h-8 sm:w-8">
                <Rocket className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] leading-tight font-semibold sm:text-[13px]">{startup.title}</span>
                <span className="hidden truncate text-[10px] text-white/55 min-[380px]:block sm:text-xs">{startup.detail}</span>
              </span>
            </span>
          </div>
        );
      })}

      {/* Scalewrk in the middle, with a "Matched" tag for each new pair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span key={step} className="bridge-hub flex h-11 w-11 items-center justify-center rounded-2xl bg-white sm:h-14 sm:w-14">
          <LogoMark className="h-6 w-auto sm:h-7" />
        </span>
        <span
          key={`m${step}`}
          className="bridge-matched absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap text-emerald-200 ring-1 ring-emerald-300/30 sm:text-[11px]"
        >
          ✓ Matched
        </span>
      </div>
    </div>
  );
}
