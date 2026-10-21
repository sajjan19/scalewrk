"use client";

import { useEffect, useRef } from "react";

/*
  A comet for the Home hero: rarer and slower than the shooting stars, with a long glowing tail.
  Every 2 to 3 minutes (first one after 40 to 60 seconds) it drifts across the hero on a gentle curve,
  left to right or right to left at random, taking 3 to 4.5 seconds. The tail follows the curve
  (CSS motion path). Styles: .comet in globals.css. Off for people who turn off motion.
  The parent needs `relative overflow-hidden`.
*/
const between = (min: number, max: number) => min + Math.random() * (max - min);

export function Comet() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = layer.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!CSS.supports("offset-path", "path('M 0 0 L 1 1')")) return; // very old browsers: just skip the comet
    let timer = 0;

    const fly = () => {
      const { width: w, height: h } = el.getBoundingClientRect();
      const toRight = Math.random() < 0.5;
      const tail = Math.round(between(180, 280));
      // Start just outside one side near the top, end outside the other side lower down, bowing gently
      const sx = toRight ? -tail : w + tail;
      const ex = toRight ? w + tail : -tail;
      const sy = between(0.05, 0.3) * h;
      const ey = between(0.35, 0.7) * h;
      const cx = w / 2;
      const cy = Math.min(sy, ey) - between(0.05, 0.2) * h; // arcs up a little before dropping
      const comet = document.createElement("span");
      comet.className = "comet";
      comet.style.width = `${tail}px`;
      comet.style.offsetPath = `path('M ${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}')`;
      el.appendChild(comet);
      comet
        .animate(
          [
            { offsetDistance: "0%", opacity: 0 },
            { opacity: 1, offset: 0.12 },
            { opacity: 1, offset: 0.85 },
            { offsetDistance: "100%", opacity: 0 },
          ],
          { duration: between(3000, 4500), easing: "ease-in-out" },
        )
        .finished.then(
          () => comet.remove(),
          () => comet.remove(),
        );
      timer = window.setTimeout(fly, between(120000, 180000));
    };

    timer = window.setTimeout(fly, between(40000, 60000));
    return () => clearTimeout(timer);
  }, []);

  return <div ref={layer} aria-hidden="true" className="pointer-events-none absolute inset-0" />;
}
