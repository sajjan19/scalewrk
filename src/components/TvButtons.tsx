"use client";

import { useEffect } from "react";

/*
  Apple TV remote-style buttons. Mounted once in the layout and works for every element with
  the `btn` class: while the mouse is on a button, it tilts toward the pointer, grows a little
  and a soft shine follows the mouse. Letting go springs it back.
  Mouse only (phones and touch screens are left alone) and off for people who turn off motion.
  Styles: .btn / .tv-on in globals.css.
*/
export function TvButtons() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let current: HTMLElement | null = null;

    const reset = (el: HTMLElement) => {
      el.classList.remove("tv-on");
      el.style.setProperty("--tx", "0");
      el.style.setProperty("--ty", "0");
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const btn = (e.target as Element | null)?.closest<HTMLElement>(".btn") ?? null;
      if (current && current !== btn) reset(current);
      current = btn;
      if (!btn) return;
      const b = btn.getBoundingClientRect();
      const x = (e.clientX - b.left) / b.width; // 0 to 1
      const y = (e.clientY - b.top) / b.height;
      btn.style.setProperty("--tx", String(x * 2 - 1));
      btn.style.setProperty("--ty", String(y * 2 - 1));
      btn.style.setProperty("--sx", `${x * 100}%`);
      btn.style.setProperty("--sy", `${y * 100}%`);
      btn.classList.add("tv-on");
    };
    const onLeaveWindow = () => {
      if (current) reset(current);
      current = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
    };
  }, []);

  return null;
}
