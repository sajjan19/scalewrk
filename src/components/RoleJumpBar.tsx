"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { roles } from "@/content/roles";

/*
  Sticky row of role chips on the Roles page.
  - Arrows and faded edges show there's more to scroll.
  - The chip for the role you're reading is highlighted.
*/
export function RoleJumpBar() {
  const scroller = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const updateArrows = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  // Show or hide the arrows as the row scrolls or the window resizes
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  // Highlight the role currently in the middle of the screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    roles.forEach((r) => {
      const el = document.getElementById(r.slug);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Keep the highlighted chip visible in the row
  useEffect(() => {
    const el = scroller.current;
    const chip = active ? el?.querySelector<HTMLElement>(`[data-slug="${active}"]`) : null;
    if (!el || !chip) return;
    el.scrollTo({ left: chip.offsetLeft - (el.clientWidth - chip.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  const nudge = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <div className="sticky top-16 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="relative mx-auto w-full max-w-6xl">
        <div ref={scroller} className="no-scrollbar overflow-x-auto scroll-smooth">
          <nav aria-label="Roles" className="flex w-max gap-2 px-5 py-3 sm:px-8">
            {roles.map((role) => {
              const isActive = active === role.slug;
              return (
                <a
                  key={role.slug}
                  href={`#${role.slug}`}
                  data-slug={role.slug}
                  aria-current={isActive ? "true" : undefined}
                  className={`rise flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium ${
                    isActive
                      ? "btn-brand shadow-sm"
                      : "bg-brand-soft text-brand-dark ring-1 ring-brand/15 hover:bg-brand/15 hover:ring-brand/30"
                  }`}
                >
                  <role.icon className={`h-4 w-4 ${isActive ? "" : "text-brand"}`} strokeWidth={1.75} aria-hidden="true" />
                  {role.name}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Faded edges + arrows, only on the side that has more */}
        {canLeft && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex w-20 items-center bg-gradient-to-r from-white via-white/90 to-transparent pl-2">
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Scroll roles left"
              className="lift pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand shadow-md ring-1 ring-line hover:text-brand-dark"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
        {canRight && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex w-20 items-center justify-end bg-gradient-to-l from-white via-white/90 to-transparent pr-2">
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Scroll roles right"
              className="lift pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand shadow-md ring-1 ring-line hover:text-brand-dark"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
