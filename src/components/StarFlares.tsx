"use client";

import { useEffect, useRef } from "react";

/*
  Star flares for the Home hero: every few seconds (a random 3 to 7) one spot briefly flares into a
  four-point sparkle, turns a little and fades back, like a star catching the light.
  Random spot, size and colour (purple or blue) each time. Drawn above everything (so the illustration's
  glow can't hide them) but kept clear of text, buttons and pills. Off for people who turn off motion.
  The parent needs `relative overflow-hidden`.
*/
const between = (min: number, max: number) => min + Math.random() * (max - min);

// A four-point sparkle (✦ shape) drawn in a 24×24 box
const SPARKLE = "M12 0 C12.9 7.2 16.8 11.1 24 12 C16.8 12.9 12.9 16.8 12 24 C11.1 16.8 7.2 12.9 0 12 C7.2 11.1 11.1 7.2 12 0 Z";

export function StarFlares() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = layer.current;
    const section = el?.closest("section");
    if (!el || !section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;

    const flare = () => {
      const box = el.getBoundingClientRect();
      // Keep clear of anything people read or click: headline, subheading, badge, buttons and the illustration pills
      const avoid = [...section.querySelectorAll<HTMLElement>("[data-no-stars], h1, h1 ~ p, a, [data-magnify]")]
        .filter((n) => n.offsetParent)
        .map((n) => n.getBoundingClientRect());
      let x = 0;
      let y = 0;
      for (let tries = 0; tries < 12; tries++) {
        x = between(0.03, 0.97) * box.width;
        y = between(0.04, 0.96) * box.height;
        const px = box.left + x;
        const py = box.top + y;
        if (!avoid.some((r) => px > r.left - 16 && px < r.right + 16 && py > r.top - 16 && py < r.bottom + 16)) break;
      }
      const size = Math.round(between(10, 20));
      const purple = Math.random() < 0.5;
      const color = purple ? "#7a2ff5" : "#0d6efd";
      const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      star.setAttribute("viewBox", "0 0 24 24");
      star.setAttribute("class", "star-flare");
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.color = color;
      star.innerHTML = `<path d="${SPARKLE}" fill="currentColor"/>`;
      el.appendChild(star);
      star
        .animate(
          [
            { transform: "translate(-50%, -50%) scale(0) rotate(0deg)", opacity: 0 },
            { transform: "translate(-50%, -50%) scale(1) rotate(45deg)", opacity: 1, offset: 0.4 },
            { transform: "translate(-50%, -50%) scale(0) rotate(90deg)", opacity: 0 },
          ],
          { duration: between(1100, 1600), easing: "ease-in-out" },
        )
        .finished.then(
          () => star.remove(),
          () => star.remove(),
        );
      timer = window.setTimeout(flare, between(3000, 7000));
    };

    timer = window.setTimeout(flare, between(1500, 3000));
    return () => clearTimeout(timer);
  }, []);

  return <div ref={layer} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10" />;
}
