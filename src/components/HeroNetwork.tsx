"use client";

import { useId, useRef, type MouseEvent } from "react";
import { Rocket, UserRound } from "lucide-react";
import { LogoMark } from "./Logo";

/*
  Home hero illustration (light style): Scalewrk as the connection between startups and people.
  - Startups (blue, rocket icon) on the left, talent (purple, person icon) on the right, the S in the middle.
  - Curved blue-to-purple lines join every startup and every person to the S; a thin spine runs down
    each side through the ports, and soft rings ripple out from the S (the hub).
  - "Matches": a blue pulse travels from a startup into the S, then a purple pulse carries on out to a person.
  - Tiny dots around it twinkle, alternating purple and blue.
  - Apple TV-style hover: the whole thing tilts toward the mouse and the layers shift by
    different amounts (glow least, lines a bit, pills more, the S most), so it feels 3D.
  - macOS Dock-style magnify: pills (and the S) near the mouse grow, the closest the most.
  Purely decorative, no claims. All motion is off for people who turn off motion.
  On phones the Home hero shows it between the subheading and the buttons.
*/

const PURPLE = "#7a2ff5";
const BLUE = "#0d6efd";

const round = (v: number) => Math.round(v * 100) / 100; // same numbers on the server and in the browser

// Rows from top to bottom. The middle rows sit a little further out so they clear the S.
const rows = [12, 34, 66, 88];
const inner = [37, 31, 31, 37]; // how close to the middle each row's pill reaches (% from the left, startup side)

// Startups: the pill's right edge sits at x (they extend to the left)
const startups = ["Seed", "Series A", "Series C", "Series E"].map((label, i) => ({ label, x: inner[i], y: rows[i] }));
// People: the pill's left edge sits at x (they extend to the right)
const people = ["Full-Stack Engineer", "AI Engineer", "Head of Sales", "Founding Engineer"].map((label, i) => ({
  label,
  x: 100 - inner[i],
  y: rows[i],
}));

// Curved line between a pill and the S. `dir` is -1 for the startup side, 1 for the people side.
// Startup paths run pill → S (pulses flow in), people paths run S → pill (pulses flow out).
function curve(x: number, y: number, dir: -1 | 1) {
  const sx = round(50 + dir * 9); // just outside the S
  const sy = round(50 + (y - 50) * 0.22);
  const ex = round(x - dir * 1.5); // just short of the pill edge
  const c1x = round(sx + dir * 9);
  const c2x = round(ex - dir * 9);
  return dir === 1
    ? `M ${sx} ${sy} C ${c1x} ${sy}, ${c2x} ${y}, ${ex} ${y}`
    : `M ${ex} ${y} C ${c2x} ${y}, ${c1x} ${sy}, ${sx} ${sy}`;
}

// A thin "spine" down each side joining the ports, so each side reads as one connected group
const spine = (side: { x: number; y: number }[], dx: number) =>
  `M ${side.map((n) => `${round(n.x + dx)} ${n.y}`).join(" L ")}`;

// Tiny dots around it, in a few small sizes (they twinkle, alternating purple and blue)
const dots: [number, number, number][] = [
  [6, 4, 0.5], [94, 6, 0.4], [4, 50, 0.6], [96, 52, 0.5], [30, 50, 0.35], [70, 50, 0.35],
  [8, 97, 0.5], [92, 96, 0.6], [50, 6, 0.4], [50, 95, 0.45], [20, 22, 0.35], [80, 78, 0.35],
];

// Dock-style magnify: how much the closest item grows, and how far (px) the effect reaches
const MAGNIFY = 0.18;
const REACH = 140;

// How far (in px) each layer shifts toward the mouse, for the 3D parallax feel
const depth = { glow: 4, lines: 8, pills: 16, center: 24 };
const layer = (px: number) => ({ transform: `translate(calc(var(--mx, 0) * ${px}px), calc(var(--my, 0) * ${px}px))` });

// One "match" takes CYCLE seconds: the blue pulse runs startup → S in the first half, the purple one S → person in the second
const CYCLE = 3.2;

// `className` decides where it shows (the Home hero renders one copy for phones and one for bigger screens)
export function HeroNetwork({ className = "" }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  // Each copy gets its own glow filter id, so a hidden copy can't break the other one's glow
  const glowId = `net-glow-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  // Mouse position inside the box, from -1 to 1 on each axis
  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", String(((e.clientX - r.left) / r.width) * 2 - 1));
    el.style.setProperty("--my", String(((e.clientY - r.top) / r.height) * 2 - 1));

    // Grow each item based on how close the mouse is to its center
    el.querySelectorAll<HTMLElement>("[data-magnify]").forEach((item) => {
      const b = item.getBoundingClientRect();
      const d = Math.hypot(e.clientX - (b.left + b.width / 2), e.clientY - (b.top + b.height / 2));
      const closeness = Math.max(0, 1 - d / REACH);
      item.style.scale = String(1 + MAGNIFY * closeness * closeness);
    });
  }
  function onLeave() {
    const el = box.current;
    if (!el) return;
    el.style.setProperty("--mx", "0");
    el.style.setProperty("--my", "0");
    el.querySelectorAll<HTMLElement>("[data-magnify]").forEach((item) => (item.style.scale = "1"));
  }

  const pill = (label: string, x: number, y: number, kind: "startup" | "person", i: number) => (
    <span
      key={label}
      data-magnify
      className={`net-float net-magnify absolute flex -translate-y-1/2 items-center gap-1 rounded-full bg-white py-1 pr-2.5 pl-1 text-[11px] font-semibold whitespace-nowrap text-ink max-[360px]:pr-2 max-[360px]:text-[10px] sm:gap-1.5 sm:py-1.5 sm:pr-3 sm:pl-1.5 sm:text-sm ${
        kind === "person"
          ? "theme-engineer shadow-[0_8px_24px_-8px_rgba(122,47,245,0.45)] ring-1 ring-[#7a2ff5]/30"
          : "theme-startup -translate-x-full shadow-[0_8px_24px_-10px_rgba(11,16,32,0.3)] ring-1 ring-line"
      }`}
      style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i * 4 + (kind === "person" ? 2 : 0)) / 10}s` }}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-soft text-brand sm:h-6 sm:w-6">
        {kind === "person" ? <UserRound className="h-3.5 w-3.5" strokeWidth={2} /> : <Rocket className="h-3.5 w-3.5" strokeWidth={2} />}
      </span>
      {label}
    </span>
  );

  return (
    <div
      ref={box}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`net-tilt relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-md lg:mx-0 lg:justify-self-end ${className}`}
      aria-hidden="true"
    >
      {/* Soft glow behind the middle */}
      <div className="net-layer absolute inset-[22%] rounded-full bg-gradient-to-br from-violet/20 to-blue/20 blur-2xl" style={layer(depth.glow)} />

      <svg viewBox="0 0 100 100" className="net-layer absolute inset-0 h-full w-full overflow-visible" style={layer(depth.lines)}>
        <defs>
          {/* Lines fade from blue (startups) to purple (talent) */}
          <linearGradient id={`${glowId}-line`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={BLUE} />
            <stop offset="1" stopColor={PURPLE} />
          </linearGradient>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Side labels */}
        <text x="18" y="2.5" textAnchor="middle" fontSize="2.4" fontWeight="600" letterSpacing="0.45" fill={BLUE} opacity="0.75">
          STARTUPS
        </text>
        <text x="82" y="2.5" textAnchor="middle" fontSize="2.4" fontWeight="600" letterSpacing="0.45" fill={PURPLE} opacity="0.75">
          TALENT
        </text>

        {/* Spines: one thin line down each side through the ports */}
        <path d={spine(startups, 1.5)} fill="none" stroke={BLUE} strokeOpacity="0.18" strokeWidth="0.4" />
        <path d={spine(people, -1.5)} fill="none" stroke={PURPLE} strokeOpacity="0.18" strokeWidth="0.4" />

        {/* Hub rings: soft circles that ripple out from the S */}
        {[0, 1.6].map((delay) => (
          <circle key={delay} cx="50" cy="50" r="11" fill="none" stroke={`url(#${glowId}-line)`} strokeWidth="0.5" opacity="0" className="net-particle">
            <animate attributeName="r" values="11;19" dur="3.2s" begin={`${delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0" dur="3.2s" begin={`${delay}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Every startup and every person is linked to the S: a soft wide line with a crisp thin one on top */}
        {[...startups.map((n) => curve(n.x, n.y, -1)), ...people.map((n) => curve(n.x, n.y, 1))].map((d, i) => (
          <g key={`c${i}`}>
            <path d={d} fill="none" stroke={`url(#${glowId}-line)`} strokeOpacity="0.14" strokeWidth="1.8" strokeLinecap="round" />
            <path d={d} fill="none" stroke={`url(#${glowId}-line)`} strokeOpacity="0.7" strokeWidth="0.45" strokeLinecap="round" />
          </g>
        ))}

        {/* Little "ports" where lines meet the pills */}
        {startups.map((n, i) => (
          <circle key={`sp${i}`} cx={n.x + 1.5} cy={n.y} r="0.9" fill={BLUE} />
        ))}
        {people.map((n, i) => (
          <circle key={`pp${i}`} cx={n.x - 1.5} cy={n.y} r="0.9" fill={PURPLE} />
        ))}

        {/* Matches: a blue pulse runs from a startup into the S, then a purple one carries on to a person */}
        {startups.map((s, i) => {
          const p = people[(i + 1) % people.length]; // each startup matches with a different person
          const begin = `${(i * CYCLE) / startups.length}s`;
          return (
            <g key={`match${i}`} className="net-particle">
              <circle r="1" fill={BLUE} filter={`url(#${glowId})`} opacity="0">
                <animateMotion dur={`${CYCLE}s`} begin={begin} repeatCount="indefinite" path={curve(s.x, s.y, -1)} keyPoints="0;1;1" keyTimes="0;0.5;1" calcMode="linear" />
                <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.05;0.45;0.5;1" dur={`${CYCLE}s`} begin={begin} repeatCount="indefinite" />
              </circle>
              <circle r="1.1" fill={PURPLE} filter={`url(#${glowId})`} opacity="0">
                <animateMotion dur={`${CYCLE}s`} begin={begin} repeatCount="indefinite" path={curve(p.x, p.y, 1)} keyPoints="0;0;1" keyTimes="0;0.5;1" calcMode="linear" />
                <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.55;0.95;1" dur={`${CYCLE}s`} begin={begin} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}

        {/* Twinkling dots, alternating purple and blue */}
        {dots.map(([x, y, r], i) => (
          <circle
            key={`d${i}`}
            cx={x}
            cy={y}
            r={r}
            fill={i % 2 === 0 ? PURPLE : BLUE}
            className="net-twinkle"
            style={{ animationDelay: `${(i * 45) / 100}s` }}
          />
        ))}
      </svg>

      {/* Pills: startups on the left (blue icon), people on the right (purple icon) */}
      <div className="net-layer absolute inset-0" style={layer(depth.pills)}>
        {startups.map((n, i) => pill(n.label, n.x, n.y, "startup", i))}
        {people.map((n, i) => pill(n.label, n.x, n.y, "person", i))}
      </div>

      {/* Scalewrk in the middle (moves the most) */}
      <div className="net-layer absolute inset-0" style={layer(depth.center)}>
        {/* Soft white circle behind the S that fades out into the background (no hard edge) */}
        <span className="absolute top-1/2 left-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#ffffff_0%,rgba(255,255,255,0.9)_38%,rgba(255,255,255,0)_70%)] sm:h-44 sm:w-44" />
        <span
          data-magnify
          className="net-magnify absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center drop-shadow-[0_10px_24px_rgba(77,80,249,0.45)]"
        >
          <LogoMark className="h-16 w-auto sm:h-20" />
        </span>
      </div>
    </div>
  );
}
