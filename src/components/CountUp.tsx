"use client";

import { useEffect, useRef, useState } from "react";

/*
  A number that counts up from 0 when it scrolls into view ("28 days", "95%", "120+").
  The text around the number (like "days" or "%") stays put; only the number counts.
  It plays again if you scroll back above it and down again.
  The page first shows the final value (so it reads right without JavaScript); people who turn off motion just see that.
*/
const DURATION = 1600; // ms

export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? parseFloat(match[2]) : 0;
  const decimals = match?.[2].includes(".") ? match[2].split(".")[1].length : 0;
  const [shown, setShown] = useState(target);
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const run = () => {
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION);
        const eased = 1 - Math.pow(1 - t, 3); // fast at first, slows down at the end
        setShown(target * eased);
        if (t < 1) frame = requestAnimationFrame(step);
      };
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(step);
    };

    // Start at 0 if it's still below the screen, so it counts up when it arrives
    if (node.getBoundingClientRect().top > window.innerHeight) setShown(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) run();
        else if (entry.boundingClientRect.top > 0) {
          // Back below the screen: reset so it counts up again next time
          cancelAnimationFrame(frame);
          setShown(0);
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!match) return <span className={className}>{value}</span>;
  return (
    <span ref={el} className={`tabular-nums ${className}`}>
      {match[1]}
      {shown.toFixed(decimals)}
      {match[3]}
    </span>
  );
}
