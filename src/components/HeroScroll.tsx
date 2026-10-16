"use client";

import { useEffect, useRef } from "react";

/*
  Scroll effect for a photo hero (city pages). Drop it inside the hero <section>.
  It sets --hero-p on that section: 0 at the top of the page, 1 once the hero has scrolled away.
  The hero uses it to make the photo drift and zoom slowly and the text fade out (see CityPage.tsx).
  Off for people who turn off motion (--hero-p just stays 0).
*/
export function HeroScroll() {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = marker.current?.parentElement;
    if (!hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const r = hero.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / r.height));
      hero.style.setProperty("--hero-p", p.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <span ref={marker} hidden />;
}
