"use client";

import { useEffect, useRef } from "react";

/*
  Constellations for the Home hero: every 7 to 12 seconds, 3 to 5 nearby background stars get linked
  by faint lines that draw in one after another, hold for a moment, then fade. Lines never cross text,
  buttons or the illustration pills. If you scroll while one is showing, it fades right away
  (the stars move with scroll depth, so the lines would no longer line up).
  Off for people who turn off motion. The parent needs `relative overflow-hidden`.
*/
const between = (min: number, max: number) => min + Math.random() * (max - min);
const SVG = "http://www.w3.org/2000/svg";

export function Constellations() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = layer.current;
    const section = el?.closest("section");
    if (!el || !section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    let current: SVGSVGElement | null = null;

    const fadeOut = (svg: SVGSVGElement, ms: number) =>
      svg.animate([{ opacity: 1 }, { opacity: 0 }], { duration: ms, fill: "forwards" }).finished.then(
        () => svg.remove(),
        () => svg.remove(),
      );

    const draw = () => {
      timer = window.setTimeout(draw, between(7000, 12000));
      if (current) return;
      const box = el.getBoundingClientRect();
      const avoid = [...section.querySelectorAll<HTMLElement>("[data-no-stars], h1, h1 ~ p, a, [data-magnify], .net-tilt svg ~ div span")]
        .filter((n) => n.offsetParent)
        .map((n) => n.getBoundingClientRect());
      const blocked = (x: number, y: number) => avoid.some((r) => x > r.left - 8 && x < r.right + 8 && y > r.top - 8 && y < r.bottom + 8);

      // Visible stars inside the hero, as screen points
      const stars = [...section.querySelectorAll<HTMLElement>("[data-star]")]
        .filter((s) => s.style.visibility !== "hidden")
        .map((s) => {
          const r = s.getBoundingClientRect();
          return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        })
        .filter((p) => p.x > box.left && p.x < box.right && p.y > box.top && p.y < box.bottom && !blocked(p.x, p.y));
      if (stars.length < 4) return;

      // Start from a random star and keep hopping to the nearest unused star close by
      const lineIsClear = (a: { x: number; y: number }, b: { x: number; y: number }) =>
        [0.25, 0.5, 0.75].every((t) => !blocked(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t));
      const chain = [stars[Math.floor(Math.random() * stars.length)]];
      const want = Math.round(between(3, 5));
      while (chain.length < want) {
        const last = chain[chain.length - 1];
        const next = stars
          .filter((s) => !chain.includes(s))
          .map((s) => ({ s, d: Math.hypot(s.x - last.x, s.y - last.y) }))
          .filter(({ s, d }) => d > 25 && d < 140 && lineIsClear(last, s))
          .sort((a, b) => a.d - b.d)[0];
        if (!next) break;
        chain.push(next.s);
      }
      if (chain.length < 3) return;

      const svg = document.createElementNS(SVG, "svg");
      svg.setAttribute("class", "constellation");
      svg.setAttribute("width", String(box.width));
      svg.setAttribute("height", String(box.height));
      svg.style.cssText = "position:absolute;inset:0;overflow:visible";
      el.appendChild(svg);
      current = svg;
      chain.slice(1).forEach((b, i) => {
        const a = chain[i];
        const line = document.createElementNS(SVG, "line");
        line.setAttribute("x1", String(a.x - box.left));
        line.setAttribute("y1", String(a.y - box.top));
        line.setAttribute("x2", String(b.x - box.left));
        line.setAttribute("y2", String(b.y - box.top));
        line.setAttribute("pathLength", "1");
        // Faint purple line; the dash trick lets it "draw in"
        line.setAttribute("stroke", "#7a2ff5");
        line.setAttribute("stroke-opacity", "0.55");
        line.setAttribute("stroke-width", "1.2");
        line.setAttribute("stroke-linecap", "round");
        line.setAttribute("stroke-dasharray", "1");
        line.setAttribute("stroke-dashoffset", "1");
        svg.appendChild(line);
        // Each line draws in after the one before it
        line.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
          duration: 500,
          delay: i * 380,
          easing: "ease-out",
          fill: "both",
        });
      });
      const hold = (chain.length - 1) * 380 + 500 + 2200;
      window.setTimeout(() => {
        if (current === svg) {
          current = null;
          fadeOut(svg, 900);
        }
      }, hold);
    };

    // Scrolling moves the stars (scroll depth), so drop any constellation that's showing
    const onScroll = () => {
      if (current) {
        const svg = current;
        current = null;
        fadeOut(svg, 250);
      }
    };

    timer = window.setTimeout(draw, between(3000, 5000));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <div ref={layer} aria-hidden="true" className="pointer-events-none absolute inset-0" />;
}
