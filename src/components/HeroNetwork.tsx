import { Rocket, UserRound } from "lucide-react";
import { LogoMark } from "./Logo";

/*
  Home hero illustration (light style): Scalewrk in the middle, linked to candidate roles
  (purple) and startup stages (blue) around it.
  - Candidate lines are stronger, with purple pulses flowing out from the S.
  - Startup lines carry blue pulses into the S.
  - Tiny dots around it twinkle, alternating purple and blue.
  - Spots sit at different distances on a tilted oval, so it does not look like a perfect circle.
  Purely decorative, no claims. All motion is off for people who turn off motion.
*/

const PURPLE = "#7a2ff5";
const BLUE = "#0d6efd";

// Candidates sit top/right/bottom/left, startups on the diagonals
const candidateRoles = ["AI Engineer", "Backend", "Founding AE", "SDR"];
const startupStages = ["Seed", "Series A", "Series B", "Series C+"];

// Each spot gets its own distance and a small angle nudge, so the layout feels organic, not a perfect circle
const radii = [38, 27, 33, 34, 32, 25, 35, 30];
const nudges = [0, 6, -8, -5, 10, -6, 7, 4]; // degrees

const nodes = Array.from({ length: 8 }, (_, i) => {
  const angle = ((i / 8) * 360 - 90 + nudges[i]) * (Math.PI / 180);
  const radius = radii[i];
  const kind = i % 2 === 0 ? ("candidate" as const) : ("startup" as const);
  return {
    x: 50 + radius * Math.cos(angle),
    y: 50 + radius * Math.sin(angle),
    kind,
    label: kind === "candidate" ? candidateRoles[i / 2] : startupStages[(i - 1) / 2],
  };
});

// Tiny dots around it, in a few small sizes (they twinkle, alternating purple and blue)
const dots: [number, number, number][] = [
  [12, 14, 0.6], [88, 12, 0.4], [8, 86, 0.5], [90, 88, 0.7], [32, 6, 0.35], [68, 95, 0.5],
  [95, 46, 0.4], [5, 44, 0.6], [22, 70, 0.35], [80, 28, 0.45], [58, 4, 0.4], [40, 92, 0.6],
];

export function HeroNetwork() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-xs sm:max-w-md lg:mx-0 lg:justify-self-end" aria-hidden="true">
      {/* Soft glow behind the middle */}
      <div className="absolute inset-[22%] rounded-full bg-gradient-to-br from-violet/20 to-blue/20 blur-2xl" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <filter id="net-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dashed orbit: a tilted oval rather than a perfect circle */}
        <ellipse cx="50" cy="50" rx="38" ry="29" transform="rotate(-18 50 50)" fill="none" stroke="#d4d8ea" strokeWidth="0.4" strokeDasharray="1 1.5" />

        {/* Lines: candidates purple and stronger (dashes flow out), startups blue and lighter */}
        {nodes.map((n, i) =>
          n.kind === "candidate" ? (
            <g key={i}>
              <line x1="50" y1="50" x2={n.x} y2={n.y} stroke={PURPLE} strokeOpacity="0.18" strokeWidth="1.6" strokeLinecap="round" />
              <line
                x1="50"
                y1="50"
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
            <line
              key={i}
              x1="50"
              y1="50"
              x2={n.x}
              y2={n.y}
              stroke={BLUE}
              strokeOpacity="0.45"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeDasharray="2 2"
            />
          ),
        )}

        {/* Pulses: purple ones go out to candidates, blue ones come in from startups */}
        {nodes.map((n, i) => {
          const out = n.kind === "candidate";
          const [fromX, toX, fromY, toY] = out ? [50, n.x, 50, n.y] : [n.x, 50, n.y, 50];
          return (
            <circle key={`p${i}`} r={out ? 1.1 : 0.9} fill={out ? PURPLE : BLUE} filter="url(#net-glow)" className="net-particle">
              <animate attributeName="cx" from={fromX} to={toX} dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="cy" from={fromY} to={toY} dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
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
            style={{ animationDelay: `${i * 0.45}s` }}
          />
        ))}
      </svg>

      {/* Pills: white, with a purple (candidate) or blue (startup) icon */}
      {nodes.map((n, i) => (
        <span
          key={i}
          className={`net-float absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full bg-white py-1 pr-2.5 pl-1 text-[11px] font-semibold whitespace-nowrap text-ink sm:gap-1.5 sm:py-1.5 sm:pr-3 sm:pl-1.5 sm:text-sm ${
            n.kind === "candidate"
              ? "theme-engineer shadow-[0_8px_24px_-8px_rgba(122,47,245,0.45)] ring-1 ring-[#7a2ff5]/30"
              : "theme-startup shadow-[0_8px_24px_-10px_rgba(11,16,32,0.3)] ring-1 ring-line"
          }`}
          style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${i * 0.4}s` }}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-soft text-brand sm:h-6 sm:w-6">
            {n.kind === "candidate" ? <UserRound className="h-3.5 w-3.5" strokeWidth={2} /> : <Rocket className="h-3.5 w-3.5" strokeWidth={2} />}
          </span>
          {n.label}
        </span>
      ))}

      {/* Scalewrk in the middle */}
      <span className="absolute top-1/2 left-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-white shadow-[0_20px_50px_-15px_rgba(77,80,249,0.45)] ring-1 ring-line sm:h-24 sm:w-24">
        <LogoMark className="h-10 w-auto sm:h-12" />
      </span>
    </div>
  );
}
