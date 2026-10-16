"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/*
  Apple-style scroll animation. Mounted once in the layout.
  Inside every <Section> (.reveal-group), each block, and each card in a grid or list,
  fades in and rises smoothly when it scrolls into view. Cards in the same row come in one after another.
  It plays again if you scroll back up past it and down again.
  Without JavaScript, or for people who turn off motion, everything simply shows.
  Timing lives in globals.css (.reveal / .reveal.is-visible).
*/
const SELECTOR = ".reveal-group > :not(.grid, ol, ul, .reveal-row), .reveal-group > :is(.grid, ol, ul, .reveal-row) > *";

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = [...document.querySelectorAll<HTMLElement>(SELECTOR)];

    items.forEach((el) => {
      // Cards in a grid or row come in one after another (small delay by position, capped)
      const parent = el.parentElement;
      const inRow = parent && !parent.classList.contains("reveal-group");
      const index = inRow ? [...parent.children].indexOf(el) : 0;
      el.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 90}ms`);
      el.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) el.classList.add("is-visible");
          // Reset only once it's back below the screen, so it plays again on the way down
          else if (entry.boundingClientRect.top > 0) el.classList.remove("is-visible");
        });
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    items.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      items.forEach((el) => {
        el.classList.remove("reveal", "is-visible");
        el.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}
