"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { glideTo } from "@/lib/glide";

/*
  Controls under a swipeable row of cards (phones and tablets): previous arrow, dots, next arrow.
  Same look as the testimonials carousel, so every carousel on the site matches.
  - `targetId`: the id of the scrolling row.
  - The active dot follows the scroll; tapping a dot or an arrow scrolls to that card.
  - Hide it where the row turns into a grid by passing a class like "md:hidden".
*/
export function ScrollDots({ targetId, count, className = "" }: { targetId: string; count: number; className?: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const row = document.getElementById(targetId);
    if (!row) return;
    // The active card is the one closest to the start of the row (or the last one once the row is scrolled to the end)
    const onScroll = () => {
      const max = row.scrollWidth - row.clientWidth;
      if (row.scrollLeft >= max - 4) return setActive(count - 1);
      const cards = [...row.children] as HTMLElement[];
      const start = cards[0]?.offsetLeft ?? 0;
      let best = 0;
      cards.forEach((c, i) => {
        if (Math.abs(c.offsetLeft - start - row.scrollLeft) < Math.abs(cards[best].offsetLeft - start - row.scrollLeft)) best = i;
      });
      setActive(best);
    };
    row.addEventListener("scroll", onScroll, { passive: true });
    return () => row.removeEventListener("scroll", onScroll);
  }, [targetId, count]);

  // Arrows and dots glide smoothly to the card (see src/lib/glide.ts)
  function goTo(i: number) {
    const row = document.getElementById(targetId);
    const cards = row ? ([...row.children] as HTMLElement[]) : [];
    const card = cards[Math.max(0, Math.min(count - 1, i))];
    if (row && card) glideTo(row, card.offsetLeft - cards[0].offsetLeft);
  }

  const arrow =
    "lift flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand shadow-sm ring-1 ring-line hover:ring-brand/40 disabled:pointer-events-none disabled:opacity-40";

  return (
    <div className={`mt-6 flex items-center justify-center gap-4 ${className}`}>
      <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous card" className={arrow}>
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <div className="flex gap-2">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show card ${i + 1} of ${count}`}
            aria-current={i === active ? "true" : undefined}
            className={`h-2.5 rounded-full transition-all ${i === active ? "btn-brand w-7" : "w-2.5 bg-line hover:bg-brand/40"}`}
          />
        ))}
      </div>
      <button type="button" onClick={() => goTo(active + 1)} disabled={active === count - 1} aria-label="Next card" className={arrow}>
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
