"use client";

import { useEffect, useRef } from "react";

/*
  Home hero background: an invisible grid of tiny star dots. Where the mouse goes, the dots
  light up in the logo colors (purple on the left, blue on the right) and a soft tail follows
  the pointer. Moving also sends out faint rings that fade away.
  Drawn on a canvas behind the hero text. Mouse only; off for people who turn off motion.
  It only draws while something is moving, so it costs nothing when the mouse is still.
*/
const GAP = 18; // distance between dots (px)
const TAIL = 14; // points in the tail that follows the mouse
const GLOW = 2600; // how wide the glow around the tail is (bigger = wider)
const RING_SPEED = 260; // px per second
const RING_LIFE = 1.3; // seconds
const RING_WIDTH = 26;
const VIOLET = [122, 47, 245];
const BLUE = [13, 110, 253];

type Point = { x: number; y: number };
type Ring = Point & { born: number };

export function HeroStarTrail() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const area = el?.parentElement;
    const ctx = el?.getContext("2d");
    if (!el || !area || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0;
    let h = 0;
    const resize = () => {
      const r = area.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      el.width = w * dpr;
      el.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(area);

    const target: Point = { x: -999, y: -999 };
    const head: Point = { x: -999, y: -999 };
    const tail: Point[] = [];
    const rings: Ring[] = [];
    let lastRing: Point = { x: -999, y: -999 };
    let inside = false;
    let fade = 0; // 0 to 1: the glow fades in when the mouse enters and out when it leaves
    let frame = 0;
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = area.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      inside = x >= 0 && y >= 0 && x <= w && y <= h;
      if (!inside) return wake(); // let the glow fade out
      target.x = x;
      target.y = y;
      // First time in: start the tail right at the mouse
      if (head.x < -900) {
        head.x = x;
        head.y = y;
        for (let i = 0; i < TAIL; i++) tail.push({ x, y });
        lastRing = { x, y };
      }
      if (Math.hypot(x - lastRing.x, y - lastRing.y) > 60) {
        rings.push({ x, y, born: performance.now() / 1000 });
        lastRing = { x, y };
        if (rings.length > 12) rings.shift();
      }
      wake();
    };
    const onLeavePage = () => {
      inside = false;
      wake();
    };

    function draw() {
      const now = performance.now() / 1000;
      // The head eases toward the mouse; each tail point eases toward the one in front of it
      const followX = inside ? target.x : head.x;
      const followY = inside ? target.y : head.y;
      head.x += (followX - head.x) * 0.25;
      head.y += (followY - head.y) * 0.25;
      let moving = Math.hypot(followX - head.x, followY - head.y) > 0.5;
      tail.forEach((p, i) => {
        const lead = i === 0 ? head : tail[i - 1];
        p.x += (lead.x - p.x) * 0.35;
        p.y += (lead.y - p.y) * 0.35;
        if (Math.hypot(lead.x - p.x, lead.y - p.y) > 0.5) moving = true;
      });
      for (let i = rings.length - 1; i >= 0; i--) if (now - rings[i].born > RING_LIFE) rings.splice(i, 1);

      fade = inside ? Math.min(1, fade + 0.15) : fade * 0.88;
      if (fade < 0.02) fade = 0;
      if (fade > 0 && fade < 1) moving = true;
      ctx!.clearRect(0, 0, w, h);
      const strength = fade;
      if (strength || rings.length) {
        // Only check dots near the tail or a ring
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        const grow = (x: number, y: number, pad: number) => {
          minX = Math.min(minX, x - pad);
          minY = Math.min(minY, y - pad);
          maxX = Math.max(maxX, x + pad);
          maxY = Math.max(maxY, y + pad);
        };
        if (strength) tail.forEach((p) => grow(p.x, p.y, 140));
        rings.forEach((r) => grow(r.x, r.y, (now - r.born) * RING_SPEED + RING_WIDTH));

        const c0 = Math.max(0, Math.floor(minX / GAP));
        const c1 = Math.min(Math.ceil(w / GAP), Math.ceil(maxX / GAP));
        const r0 = Math.max(0, Math.floor(minY / GAP));
        const r1 = Math.min(Math.ceil(h / GAP), Math.ceil(maxY / GAP));

        for (let row = r0; row <= r1; row++) {
          for (let col = c0; col <= c1; col++) {
            const x = col * GAP + GAP / 2;
            const y = row * GAP + GAP / 2;
            let light = 0;
            if (strength) {
              // Closest tail point (points further back count as a bit further away, so the tail thins out)
              let d = Infinity;
              tail.forEach((p, i) => {
                d = Math.min(d, Math.hypot(x - p.x, y - p.y) + i * 3);
              });
              light += Math.exp(-(d * d) / GLOW) * 0.9 * strength;
            }
            rings.forEach((r) => {
              const age = now - r.born;
              const off = Math.abs(Math.hypot(x - r.x, y - r.y) - age * RING_SPEED);
              if (off < RING_WIDTH) light += (1 - off / RING_WIDTH) * (1 - age / RING_LIFE) * 0.45;
            });
            if (light < 0.06) continue;
            light = Math.min(light, 1);
            const t = x / w; // purple on the left, blue on the right
            const rgb = VIOLET.map((v, k) => Math.round(v + (BLUE[k] - v) * t));
            ctx!.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${light * 0.85})`;
            ctx!.beginPath();
            ctx!.arc(x, y, 0.6 + light * 1.8, 0, Math.PI * 2);
            ctx!.fill();
          }
        }
      }

      // Keep drawing while anything moves; when the mouse is still the last picture just stays
      frame = moving || rings.length ? requestAnimationFrame(draw) : 0;
      if (!frame && !inside) {
        // Faded out: reset so the tail starts fresh next time the mouse comes in
        head.x = head.y = -999;
        tail.length = 0;
      }
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeavePage);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeavePage);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvas} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
