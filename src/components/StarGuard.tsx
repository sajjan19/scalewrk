"use client";

import { useEffect, useRef } from "react";

/*
  Hides any background star (StarField) that sits behind an element marked `data-no-stars` in the
  same section, so that text stays clean. Re-checks when the window size changes.
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
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [padding]);

  return <span ref={marker} hidden />;
}
