import { Rocket, UserRound } from "lucide-react";
import { LogoMark } from "./Logo";

/*
  Home hero illustration: Scalewrk in the middle, linked to startups (blue rockets)
  and candidates (purple people) around it. Purely decorative, no claims.
  The lines gently "flow" toward the middle (off for people who turn off motion).
*/

// 8 spots around a circle, alternating candidate / startup
const nodes = Array.from({ length: 8 }, (_, i) => {
  const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
  const radius = i % 2 === 0 ? 38 : 30; // two rings so it doesn't look too perfect
  return {
    x: 50 + radius * Math.cos(angle),
    y: 50 + radius * Math.sin(angle),
    kind: i % 2 === 0 ? ("candidate" as const) : ("startup" as const),
  };
});

// Small background dots for texture
const dots = [
  [8, 12], [92, 8], [6, 88], [94, 92], [28, 6], [72, 96], [96, 44], [4, 40],
];

export function HeroNetwork() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-xs sm:max-w-md lg:mx-0 lg:justify-self-end" aria-hidden="true">
      {/* Soft glow behind the middle */}
      <div className="absolute inset-[20%] rounded-full bg-gradient-to-br from-violet/15 to-blue/15 blur-2xl" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="net-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7a2ff5" />
            <stop offset="1" stopColor="#0d6efd" />
          </linearGradient>
        </defs>
        {/* Outer ring */}
        <circle cx="50" cy="50" r="38" fill="none" stroke="#d4d8ea" strokeWidth="0.4" strokeDasharray="1 1.5" />
        {/* Lines from the middle to each node */}
        {nodes.map((n, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="url(#net-line)"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeDasharray="2 2"
            className="net-flow"
            opacity="0.9"
          />
        ))}
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="0.8" fill="#c7cbe0" />
        ))}
      </svg>

      {/* Nodes */}
      {nodes.map((n, i) => (
        <span
          key={i}
          className={`net-float absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white shadow-[0_8px_24px_-10px_rgba(11,16,32,0.3)] ring-1 ring-line sm:h-14 sm:w-14 ${
            n.kind === "candidate" ? "theme-engineer" : "theme-startup"
          }`}
          style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${i * 0.4}s` }}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-brand sm:h-10 sm:w-10">
            {n.kind === "candidate" ? (
              <UserRound className="h-5 w-5" strokeWidth={1.75} />
            ) : (
              <Rocket className="h-5 w-5" strokeWidth={1.75} />
            )}
          </span>
        </span>
      ))}

      {/* Scalewrk in the middle */}
      <span className="absolute top-1/2 left-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-white shadow-[0_20px_50px_-15px_rgba(77,80,249,0.45)] ring-1 ring-line sm:h-28 sm:w-28">
        <LogoMark className="h-12 w-auto sm:h-14" />
      </span>
    </div>
  );
}
