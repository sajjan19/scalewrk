import type { CSSProperties } from "react";

/*
  A light sprinkle of tiny twinkling stars (purple and blue) behind a section's content.
  Same twinkle as the hero illustration (.net-twinkle in globals.css), off for people who turn off motion.
  Positions come from a fixed seed, so they're the same on the server and in the browser (and every visit).
  The parent needs `relative overflow-hidden`; put the content above it with `relative`.
*/
function random(seed: number) {
  // Small seeded random number generator (mulberry32)
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function StarField({ seed = 1, count = 50, className = "" }: { seed?: number; count?: number; className?: string }) {
  const rand = random(seed);
  const stars = Array.from({ length: count }, (_, i) => ({
    left: Math.round(rand() * 1000) / 10,
    top: Math.round(rand() * 1000) / 10,
    size: [2, 2, 3, 3, 4][Math.floor(rand() * 5)], // also decides how "far" the star is (see layers below)
    delay: Math.round(rand() * 30) / 10,
    purple: i % 2 === 0,
  }));
  // Scroll depth: small stars are "far" (drift slower than the page), big ones "near" (move a bit faster).
  // The section sets --scroll (ScrollDepth.tsx); each layer moves by --scroll × its --depth.
  const layers = [
    { size: 2, depth: 0.45 },
    { size: 3, depth: 0.2 },
    { size: 4, depth: -0.15 },
  ];
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 opacity-60 ${className}`}>
      {layers.map((layer) => (
        <div key={layer.size} className="star-depth" style={{ "--depth": layer.depth } as CSSProperties}>
          {stars
            .filter((s) => s.size === layer.size)
            .map((s, i) => (
              <span
                key={i}
                data-star
                className={`net-twinkle absolute rounded-full ${s.purple ? "bg-violet" : "bg-blue"}`}
                style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
              />
            ))}
        </div>
      ))}
    </div>
  );
}
