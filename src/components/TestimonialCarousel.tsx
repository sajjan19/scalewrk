"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/content/testimonials";
import { Text } from "./ui";

/*
  Testimonials carousel. Swipe or scroll sideways, or use the arrows and dots.
  Shows 1 card on phones, 2 on tablets, 3 on desktop.
*/
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(items.length > 1);
  // Number of scroll stops (fewer than cards when several fit on screen)
  const [stops, setStops] = useState(items.length);

  // Width of one card plus the gap between cards
  const step = () => {
    const el = track.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    return first.offsetWidth + gap;
  };

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const s = step();
    if (s) {
      const visible = Math.max(1, Math.floor((el.clientWidth + 8) / s));
      const total = Math.max(1, items.length - visible + 1);
      setStops(total);
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      setActive(atEnd ? total - 1 : Math.min(total - 1, Math.round(el.scrollLeft / s)));
    }
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, [items.length]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const goTo = (i: number) => track.current?.scrollTo({ left: i * step(), behavior: "smooth" });
  const move = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * step(), behavior: "smooth" });

  return (
    <div aria-roledescription="carousel" aria-label="Testimonials">
      <ul
        ref={track}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto scroll-smooth px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8"
      >
        {items.map((t, i) => (
          <li
            key={i}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            className="flex w-[85%] flex-none snap-start flex-col rounded-2xl bg-white p-6 ring-1 ring-line sm:p-8 md:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
          >
            <div className="flex items-center justify-between">
              <Quote className="h-7 w-7 text-brand" aria-hidden="true" />
              <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand-dark">{t.type}</span>
            </div>
            <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
            <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
              {t.photo ? (
                <Image src={t.photo} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
              ) : (
                <span className="btn-brand flex h-12 w-12 flex-none items-center justify-center rounded-full font-semibold" aria-hidden="true">
                  {t.type.charAt(0)}
                </span>
              )}
              <div className="min-w-0">
                <p className="font-semibold">
                  <Text>{t.name}</Text>
                </p>
                <p className="text-sm text-body">
                  {t.title} · <Text>{t.company}</Text>
                </p>
              </div>
              {t.example && (
                <span className="ml-auto self-start rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800">
                  Example
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Previous arrow, dots, next arrow (centered) */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => move(-1)}
          disabled={!canPrev}
          aria-label="Previous testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand shadow-sm ring-1 ring-line transition hover:ring-brand/40 disabled:opacity-40"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex gap-2">
          {Array.from({ length: stops }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={active === i ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all ${active === i ? "btn-brand w-7" : "w-2.5 bg-line hover:bg-brand/40"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => move(1)}
          disabled={!canNext}
          aria-label="Next testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand shadow-sm ring-1 ring-line transition hover:ring-brand/40 disabled:opacity-40"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
