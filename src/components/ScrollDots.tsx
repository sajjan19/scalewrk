"use client";

import { useEffect, useState } from "react";

/*
  Dots under a swipeable row of cards (phones), so people know there's more to see.
  - `targetId`: the id of the scrolling row.
  - The active dot follows the scroll; tapping a dot scrolls to that card.
  - Hide it where the row turns into a grid by passing a class like "md:hidden".
*/
export function ScrollDots({ targetId, count, className = "" }: { targetId: string; count: number; className?: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const row = document.getElementById(targetId);
    if (!row) return;
    const onScroll = () => {
      const max = row.scrollWidth - row.clientWidth;
      setActive(max > 0 ? Math.round((row.scrollLeft / max) * (count - 1)) : 0);
    };
    row.addEventListener("scroll", onScroll, { passive: true });
    return () => row.removeEventListener("scroll", onScroll);
  }, [targetId, count]);

  function goTo(i: number) {
    const card = document.getElementById(targetId)?.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  return (
    <div className={`mt-4 flex justify-center gap-2 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => goTo(i)}
          aria-label={`Show card ${i + 1} of ${count}`}
          aria-current={i === active}
          className={`h-2 rounded-full transition-all ${i === active ? "w-5 bg-brand" : "w-2 bg-line hover:bg-muted"}`}
        />
      ))}
    </div>
  );
}
