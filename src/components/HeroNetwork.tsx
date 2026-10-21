"use client";

import { useId, useRef, type CSSProperties, type MouseEvent } from "react";
import { Rocket, UserRound } from "lucide-react";
import { LogoMark } from "./Logo";

/*
  Home hero illustration (light style): Scalewrk in the middle, linked to candidate roles
  (purple) and startup stages (blue) around it.
  - Candidate lines are stronger, with purple pulses flowing out from the S.
  - Startup lines carry blue pulses into the S.
  - Tiny dots around it twinkle, alternating purple and blue.
  - Spots sit at different distances from the S, so it does not look like a perfect circle.
  - Apple TV-style hover: the whole thing tilts toward the mouse and the layers shift by
    different amounts (glow least, lines a bit, pills more, the S most), so it feels 3D.
  - macOS Dock-style magnify: pills (and the S) near the mouse grow, the closest the most.
  Purely decorative, no claims. All motion is off for people who turn off motion.
  The pills, lines and pulses slowly orbit the S together (one turn every 2 minutes).
  On phones the Home hero shows it between the subheading and the buttons (max 340px wide).
*/

// How far from the middle the lines start (leaves a clear space around the S)
const GAP = 13;

const PURPLE = "#7a2ff5";
const BLUE = "#0d6efd";

// Candidates sit top/right/bottom/left, startups on the diagonals
// The long names sit at the top and bottom so they never run off the side edges
const candidateRoles = ["Full-Stack Engineer", "AI Engineer", "Founding Engineer", "Head of Sales"];
const startupStages = ["Seed", "Series A", "Series C", "Series E"];

// Each spot gets its own distance and a small angle nudge, so the layout feels organic, not a perfect circle
const radii = [38, 27, 33, 34, 32, 27, 35, 30];
// degrees. Series A and Founding Engineer are spread apart so they never touch on small phones;
// Series C sits further left so it stays clear of Founding Engineer's purple line
const nudges = [0, 6, -8, -9, 13, 6, 7, 4];

const nodes = Array.from({ length: 8 }, (_, i) => {
  const angle = ((i / 8) * 360 - 90 + nudges[i]) * (Math.PI / 180);
  const radius = radii[i];
  const kind = i % 2 === 0 ? ("candidate" as const) : ("startup" as const);
  const round = (v: number) => Math.round(v * 100) / 100; // same numbers on the server and in the browser
  return {
    x: round(50 + radius * Math.cos(angle)),
    y: round(50 + radius * Math.sin(angle)),
    // Where the line starts: just outside the S, so lines don't run underneath it
    sx: round(50 + GAP * Math.cos(angle)),
    sy: round(50 + GAP * Math.sin(angle)),
    kind,
    label: kind === "candidate" ? candidateRoles[i / 2] : startupStages[(i - 1) / 2],
  };
});

// Tiny dots around it, in a few small sizes (they twinkle, alternating purple and blue)
const dots: [number, number, number][] = [
  [12, 14, 0.6], [88, 12, 0.4], [8, 86, 0.5], [90, 88, 0.7], [32, 6, 0.35], [68, 95, 0.5],
  [95, 46, 0.4], [5, 44, 0.6], [22, 70, 0.35], [80, 28, 0.45], [58, 4, 0.4], [40, 92, 0.6],
  // more stars, scattered around the edges and between the pills
  [3, 4, 0.3], [20, 3, 0.4], [45, 2, 0.3], [75, 3, 0.35], [97, 4, 0.3], [2, 24, 0.4], [98, 22, 0.35],
  [16, 32, 0.3], [84, 40, 0.3], [2, 64, 0.35], [98, 62, 0.4], [14, 56, 0.3], [87, 70, 0.3], [4, 97, 0.3],
  [26, 97, 0.35], [52, 98, 0.3], [82, 97, 0.35], [97, 76, 0.3], [30, 26, 0.25], [70, 74, 0.25],
  [64, 18, 0.3], [36, 82, 0.3], [18, 44, 0.25], [76, 58, 0.25],
];

// Dock-style magnify: how much the closest item grows, and how far (px) the effect reaches
const MAGNIFY = 0.18;
const REACH = 140;

// Orbit: everything slowly circles the S together (one full turn every ORBIT seconds), so the pills keep
// their spacing and never bump into each other. The pill, its line and its pulse share the same timing.
const ORBIT = 120;
const orbit = { animationDuration: `${ORBIT}s` } as CSSProperties;

// How far (in px) each layer shifts toward the mouse, for the 3D parallax feel
const depth = { glow: 4, lines: 8, pills: 16, center: 8 }; // the S moves only a little, so it stays steady in the middle
const layer = (px: number) => ({ transform: `translate(calc(var(--mx, 0) * ${px}px), calc(var(--my, 0) * ${px}px))` });

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

  return (
    <div
      ref={box}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-md lg:mx-0 lg:justify-self-end ${className}`}
      aria-hidden="true"
    >
      {/* Twinkling stars, alternating purple and blue. Outside the tilting layer, so they stay still on hover */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
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

      {/* Everything that reacts to the mouse (tilts and shifts) */}
      <div className="net-tilt absolute inset-0">
      {/* Soft glow behind the middle */}
      <div className="net-layer absolute inset-[22%] rounded-full bg-gradient-to-br from-violet/20 to-blue/20 blur-2xl" style={layer(depth.glow)} />

      <svg viewBox="0 0 100 100" className="net-layer absolute inset-0 h-full w-full overflow-visible" style={layer(depth.lines)}>
        <defs>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Lines: candidates purple and stronger (dashes flow out), startups blue and lighter */}
        {nodes.map((n, i) =>
          n.kind === "candidate" ? (
            <g key={i} className="net-drift" style={orbit}>
              <line x1={n.sx} y1={n.sy} x2={n.x} y2={n.y} stroke={PURPLE} strokeOpacity="0.18" strokeWidth="1.6" strokeLinecap="round" />
              <line
                x1={n.sx}
                y1={n.sy}
                x2={n.x}
                y2={n.y}
                stroke={PURPLE}
                strokeWidth="0.7"
                strokeLinecap="round"
                strokeDasharray="1.5 1.5"
                className="net-flow-out"
              />
            </g>
          ) : (
            <g key={i} className="net-drift" style={orbit}>
              <line
                x1={n.sx}
                y1={n.sy}
                x2={n.x}
                y2={n.y}
                stroke={BLUE}
                strokeOpacity="0.45"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeDasharray="2 2"
              />
            </g>
          ),
        )}

        {/* Pulses: purple ones go out to candidates, blue ones come in from startups */}
        {nodes.map((n, i) => {
          const out = n.kind === "candidate";
          const [fromX, toX, fromY, toY] = out ? [n.sx, n.x, n.sy, n.y] : [n.x, n.sx, n.y, n.sy];
          return (
            <g key={`p${i}`} className="net-drift" style={orbit}>
              <circle r={out ? 1.1 : 0.9} fill={out ? PURPLE : BLUE} filter={`url(#${glowId})`} className="net-particle">
                <animate attributeName="cx" from={fromX} to={toX} dur="2.4s" begin={`${(i * 3) / 10}s`} repeatCount="indefinite" />
                <animate attributeName="cy" from={fromY} to={toY} dur="2.4s" begin={`${(i * 3) / 10}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" begin={`${(i * 3) / 10}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}

      </svg>

      {/* Pills: white, with a purple (candidate) or blue (startup) icon */}
      <div className="net-layer absolute inset-0" style={layer(depth.pills)}>
      {nodes.map((n, i) => (
        // Drift wrapper swings around the S; the anchor turns back the other way so the pill stays upright
        <div key={i} className="net-drift pointer-events-none absolute inset-0" style={orbit}>
        <span className="net-drift-counter absolute h-0 w-0" style={{ left: `${n.x}%`, top: `${n.y}%`, ...orbit }}>
        <span
          data-magnify
          className={`net-float net-magnify pointer-events-auto absolute top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full bg-white py-1 pr-2.5 pl-1 text-[11px] font-semibold whitespace-nowrap text-ink max-[360px]:pr-2 max-[360px]:text-[10px] sm:gap-1.5 sm:py-1.5 sm:pr-3 sm:pl-1.5 sm:text-sm ${
            n.kind === "candidate"
              ? "theme-engineer shadow-[0_8px_24px_-8px_rgba(122,47,245,0.45)] ring-1 ring-[#7a2ff5]/30"
              : "theme-startup shadow-[0_8px_24px_-10px_rgba(11,16,32,0.3)] ring-1 ring-line"
          }`}
          style={{ animationDelay: `${(i * 4) / 10}s` }}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-soft text-brand sm:h-6 sm:w-6">
            {n.kind === "candidate" ? <UserRound className="h-3.5 w-3.5" strokeWidth={2} /> : <Rocket className="h-3.5 w-3.5" strokeWidth={2} />}
          </span>
          {n.label}
        </span>
        </span>
        </div>
      ))}

      </div>

      {/* Scalewrk in the middle (moves the most) */}
      <div className="net-layer absolute inset-0" style={layer(depth.center)}>
      {/* Soft white circle behind the S that fades out into the background (no hard edge) */}
      <span className="net-halo absolute top-1/2 left-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#ffffff_0%,rgba(255,255,255,0.9)_38%,rgba(255,255,255,0)_70%)] sm:h-44 sm:w-44" />
      <span
        data-magnify
        className="net-magnify absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center drop-shadow-[0_10px_24px_rgba(77,80,249,0.45)]"
      >
        <LogoMark className="h-16 w-auto sm:h-20" />
      </span>
      </div>
      </div>
    </div>
  );
}
