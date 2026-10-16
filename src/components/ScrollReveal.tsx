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
    // What to watch for each item: usually the item itself. Cards inside a sideways-swiping row
    // (phones) watch the row instead, so they all come in together and swiping doesn't replay them.
    const groups = new Map<Element, HTMLElement[]>();

    items.forEach((el) => {
      // Cards in a grid or row come in one after another (small delay by position, capped)
      const parent = el.parentElement;
      const inRow = parent && !parent.classList.contains("reveal-group");
      const index = inRow ? [...parent.children].indexOf(el) : 0;
      el.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 70}ms`);
      // A swiping row cuts off anything that moves outside it, so those cards only fade (no rise)
      const swipeRow = inRow && getComputedStyle(parent).overflowX !== "visible";
      el.classList.add("reveal");
      if (swipeRow) el.classList.add("reveal-fade");
      const target = swipeRow ? parent : el;
      groups.set(target, [...(groups.get(target) ?? []), el]);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const els = groups.get(entry.target) ?? [];
          if (entry.isIntersecting) els.forEach((el) => el.classList.add("is-visible"));
          // Reset only once it's back below the screen, so it plays again on the way down
          else if (entry.boundingClientRect.top > 0) els.forEach((el) => el.classList.remove("is-visible"));
        });
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    groups.forEach((_, target) => observer.observe(target));

    return () => {
      observer.disconnect();
      items.forEach((el) => {
        el.classList.remove("reveal", "reveal-fade", "is-visible");
        el.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}
