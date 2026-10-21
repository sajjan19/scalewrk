"use client";

import { useEffect, useRef } from "react";

/*
  Scroll depth for the hero stars. Sets --scroll (px scrolled, up to the section's height) on the
  section it sits in; StarField's layers move by --scroll × their depth, so near and far stars move
  at different speeds as you scroll. Off for people who turn off motion.
*/
export function ScrollDepth() {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = marker.current?.closest("section");
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrolled = Math.min(Math.max(-section.getBoundingClientRect().top, 0), section.offsetHeight);
      section.style.setProperty("--scroll", `${scrolled}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <span ref={marker} hidden />;
}
