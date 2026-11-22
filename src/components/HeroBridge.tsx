"use client";

import { useEffect, useState } from "react";
import {
  Bot,
  Boxes,
  Braces,
  BrainCircuit,
  ChartLine,
  ClipboardList,
  Cloud,
  Code,
  Cog,
  Compass,
  Cpu,
  Database,
  FlaskConical,
  Handshake,
  HeartHandshake,
  Layers,
  Megaphone,
  Monitor,
  Lightbulb,
  Magnet,
  Network,
  Newspaper,
  Palette,
  PenTool,
  Phone,
  Presentation,
  Puzzle,
  Rocket,
  Radio,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { LogoMark } from "./Logo";

/*
  Home hero option "bridge": people on the left (engineering, product, design, sales and marketing), startups on the right and
  Scalewrk in the middle. Every couple of seconds one person and one startup light up and a glowing line joins
  them through the S, with a "Matched" tag. When it moves on, those two cards swap in a new role and startup.
  Purely illustrative (no real people or companies). Styles: "Hero bridge" in globals.css.
  People who turn off motion see the first pair lit, standing still.
*/

// Roles that rotate through the left cards
// Startup stages, youngest first
const stages = ["Pre-seed", "Seed", "Series A", "Series B", "Series C"] as const;
type Stage = (typeof stages)[number];
// Which stages hire each kind of role (so a Founding Engineer never meets a Series C company)
const early: Stage[] = ["Pre-seed", "Seed"]; // first hires
const any: Stage[] = [...stages];
const funded: Stage[] = ["Seed", "Series A", "Series B", "Series C"];
const headOf: Stage[] = ["Seed", "Series A", "Series B"]; // first leader for a team
const scaling: Stage[] = ["Series A", "Series B", "Series C"]; // roles that come once a team is growing
const late: Stage[] = ["Series B", "Series C"]; // big-team and big-customer roles

// Industries on the startup cards
const industries = [
  "AI startup", "Fintech", "Health tech", "Dev tools", "Climate tech", "Cybersecurity", "Legal tech",
  "E-commerce", "Robotics", "Edtech", "Proptech", "Mortgage AI", "Insurtech", "Marketplace", "HR tech",
  "Consumer AI", "Logistics", "Data infra", "Biotech", "Healthcare AI", "Gaming", "Supply chain",
  "Space tech", "AI agents", "Defense tech", "AI infra", "Energy", "Bio AI",
  // Newer industries growing out of AI
  "AI coding", "Voice AI", "AI security", "Humanoids", "Autonomy", "AI chips", "Nuclear", "Drug discovery",
];
// Specialist roles only meet the industries that hire them (everyone else can meet any industry)
const robotics = ["Robotics", "Defense tech", "Space tech", "Energy", "Logistics", "Supply chain", "Humanoids", "Autonomy"];
const aiApps = ["AI agents", "AI startup", "Legal tech", "Healthcare AI", "Fintech", "Mortgage AI", "Consumer AI", "HR tech", "Insurtech", "AI coding", "Voice AI"];
const aiModels = ["AI agents", "AI startup", "AI infra", "Consumer AI", "Healthcare AI", "Legal tech", "Bio AI", "Mortgage AI", "AI coding", "Voice AI", "AI security", "Drug discovery"];
const aiInfra = ["AI infra", "AI startup", "AI agents", "Data infra", "Dev tools", "AI chips", "AI coding"];
const deployed = ["AI agents", "AI startup", "Defense tech", "Healthcare AI", "Fintech", "Data infra", "Supply chain", "Voice AI", "AI security"];
const consumer = ["Consumer AI", "Fintech", "Health tech", "E-commerce", "Edtech", "Gaming", "Proptech", "Marketplace", "Insurtech", "Logistics", "Voice AI"];

// Picks an item for match number m, stepping through the list in a scattered order that still reaches
// every item (the step size shares no factor with the list length, so it never gets stuck on one item)
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const pick = <T,>(list: readonly T[], m: number) => {
  const jump = [7, 11, 13, 17, 19].find((k) => gcd(k, list.length) === 1) ?? 1;
  return list[(m * jump + 1) % list.length];
};

type Role = { icon: LucideIcon; title: string; detail: string; at: Stage[]; in?: string[] };
const people: Role[] = [
  { icon: BrainCircuit, title: "AI Engineer", detail: "Engineering", at: funded },
  { icon: Code, title: "Backend Engineer", detail: "Engineering", at: funded },
  { icon: Handshake, title: "Account Executive", detail: "Sales", at: funded },
  { icon: Target, title: "Head of Marketing", detail: "Marketing", at: headOf },
  { icon: TrendingUp, title: "Head of Sales", detail: "Sales", at: headOf },
  { icon: Sparkles, title: "Founding Engineer", detail: "Engineering", at: early },
  { icon: ClipboardList, title: "Product Manager", detail: "Product", at: scaling },
  { icon: Phone, title: "Sales Manager", detail: "Sales", at: scaling },
  { icon: Monitor, title: "Frontend Engineer", detail: "Engineering", at: funded },
  { icon: Wrench, title: "Solutions Engineer", detail: "Sales", at: scaling },
  { icon: Radio, title: "Product Marketer", detail: "Marketing", at: scaling },
  { icon: Layers, title: "Full-Stack Engineer", detail: "Engineering", at: any },
  { icon: HeartHandshake, title: "Customer Success", detail: "Go-to-market", at: scaling },
  { icon: Palette, title: "Product Designer", detail: "Design", at: funded },
  { icon: Cloud, title: "DevOps Engineer", detail: "Engineering", at: scaling },
  { icon: ChartLine, title: "VP of Sales", detail: "Sales", at: scaling },
  { icon: Database, title: "Data Engineer", detail: "Engineering", at: scaling },
  { icon: Magnet, title: "Demand Gen Manager", detail: "Marketing", at: scaling },
  { icon: Smartphone, title: "Mobile Engineer", detail: "Engineering", at: funded, in: consumer },
  { icon: Users, title: "Engineering Manager", detail: "Engineering", at: scaling },
  { icon: Lightbulb, title: "Head of Product", detail: "Product", at: headOf },
  { icon: Newspaper, title: "Content Marketer", detail: "Marketing", at: scaling },
  { icon: Presentation, title: "Sales Engineer", detail: "Sales", at: scaling },
  { icon: ShieldCheck, title: "Security Engineer", detail: "Engineering", at: scaling },
  { icon: Network, title: "Head of Engineering", detail: "Engineering", at: headOf },
  { icon: Megaphone, title: "Head of Growth", detail: "Go-to-market", at: headOf },
  { icon: Cpu, title: "ML Engineer", detail: "Engineering", at: funded },
  { icon: Braces, title: "Staff Engineer", detail: "Engineering", at: late },
  { icon: PenTool, title: "Head of Design", detail: "Design", at: scaling },
  { icon: Handshake, title: "Enterprise Sales", detail: "Sales", at: late },
  { icon: Boxes, title: "Platform Engineer", detail: "Engineering", at: late },
  { icon: TrendingUp, title: "Growth Marketer", detail: "Marketing", at: funded },
  { icon: Puzzle, title: "Product Engineer", detail: "Engineering", at: funded },
  // Newer roles that are growing fast
  { icon: Bot, title: "AI Agent Engineer", detail: "Engineering", at: funded, in: aiApps },
  { icon: Compass, title: "Forward Deployed", detail: "Engineer", at: funded, in: deployed }, // full title is too long for the card
  { icon: Workflow, title: "GTM Engineer", detail: "Go-to-market", at: headOf },
  { icon: FlaskConical, title: "Evals Engineer", detail: "Engineering", at: funded, in: aiModels },
  { icon: Server, title: "AI Infra Engineer", detail: "Engineering", at: funded, in: aiInfra },
  { icon: Cog, title: "Robotics Engineer", detail: "Engineering", at: funded, in: robotics },
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
  // Returns a running count (0, 1, 2, ...) that picks the role; `at` is the step to work it out for.
  const roleCount = (slot: number, at: number) => {
    for (let n = at; n >= 1 && n > at - pairs.length; n--) {
      if (pairs[(n - 1) % pairs.length][0] === slot) return 3 + n;
    }
    return slot;
  };
  // A startup card shows a company that fits the person it will be matched with next (the right stage and,
  // for specialist roles, the right industry). That next match doesn't change until the card is lit, so the
  // card stays the same until then and swaps right after, like the people cards.
  const startupFor = (slot: number) => {
    let m = step;
    while (pairs[m % pairs.length][1] !== slot) m++;
    const role = people[roleCount(pairs[m % pairs.length][0], m) % people.length];
    const pool = role.in ?? industries;
    return { match: m, title: pick(role.at, m), detail: pick(pool, m) };
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
        const at = roleCount(i, step);
        const person = people[at % people.length];
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
        const startup = startupFor(i);
        return (
          <div
            key={`s${i}`}
            className={`bridge-card glass-dark absolute right-0 flex w-[34%] -translate-y-1/2 items-center gap-2 rounded-xl p-2 text-white sm:gap-2.5 sm:p-2.5 ${i === s ? "is-on is-startup" : ""}`}
            style={{ top: `${rows[i]}%` }}
          >
            <span key={startup.match} className="bridge-swap flex min-w-0 items-center gap-2 sm:gap-2.5">
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
