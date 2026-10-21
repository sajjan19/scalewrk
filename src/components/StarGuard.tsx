"use client";

import { useEffect, useRef } from "react";

/*
  Hides any background star (StarField) that sits behind an element marked `data-no-stars` in the
  same section, so that text stays clean. Re-checks when the window size changes and while scrolling.
  Drop it anywhere inside the section.
*/
export function StarGuard({ padding = 6 }: { padding?: number }) {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = marker.current?.closest("section");
    if (!section) return;
    const check = () => {
      const keepClear = [...section.querySelectorAll<HTMLElement>("[data-no-stars]")].map((el) => el.getBoundingClientRect());
      section.querySelectorAll<HTMLElement>("[data-star]").forEach((star) => {
        const s = star.getBoundingClientRect();
        const behind = keepClear.some(
          (r) => s.right > r.left - padding && s.left < r.right + padding && s.bottom > r.top - padding && s.top < r.bottom + padding,
        );
        star.style.visibility = behind ? "hidden" : "";
      });
    };
    // Re-check on resize and while scrolling (the stars move with scroll depth)
    let frame = 0;
    const later = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          check();
        });
    };
    check();
    window.addEventListener("resize", later);
    window.addEventListener("scroll", later, { passive: true });
    return () => {
      window.removeEventListener("resize", later);
      window.removeEventListener("scroll", later);
      cancelAnimationFrame(frame);
    };
  }, [padding]);

  return <span ref={marker} hidden />;
}
