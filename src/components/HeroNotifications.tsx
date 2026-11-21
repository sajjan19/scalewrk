"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";

/*
  Home hero option "notifications": phone-style updates slide in one after another, newest on top,
  following a search from kickoff to signed offer. The older ones move down and fade, so three show at
  a time. Purely illustrative (no real candidates or companies). Styles: "Hero notifications" in globals.css.
  People who turn off motion see three still cards.
*/

const updates = [
  { title: "New search kicked off", body: "Founding Engineer · Series A AI startup" },
  { title: "Shortlist sent", body: "4 candidates for Founding Engineer" },
  { title: "Interview booked", body: "Senior Backend Engineer · Series B" },
  { title: "Feedback is in", body: "Account Executive · second round" },
  { title: "Offer accepted 🎉", body: "Head of Sales · Seed fintech" },
  { title: "Candidate matched", body: "AI/ML Engineer · Series A" },
];

const SHOWN = 3;
const STEP_MS = 2600;
// Small "time ago" for each slot, newest first
const ages = ["now", "2m ago", "9m ago", "1h ago"];

export function HeroNotifications({ className = "" }: { className?: string }) {
  // How many updates have arrived so far; the newest is updates[count % length]
  const [count, setCount] = useState(SHOWN);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setCount((c) => c + 1), STEP_MS);
    return () => window.clearInterval(timer);
  }, []);

  // The last SHOWN + 1 arrivals: the extra one is the oldest, fading out at the bottom
  const visible = Array.from({ length: SHOWN + 1 }, (_, slot) => count - 1 - slot).filter((n) => n >= 0);

  return (
    <div className={`hero-notes relative mx-auto w-full max-w-sm lg:mx-0 lg:justify-self-end ${className}`} aria-hidden="true">
      <p className="mb-3 text-center text-xs font-medium tracking-wide text-white/50 lg:text-left">Updates from your search</p>
      <ul className="hero-notes-stack relative">
        {visible.map((n, slot) => {
          const u = updates[n % updates.length];
          return (
            <li
              key={n}
              className={`hero-note glass-dark absolute inset-x-0 flex items-center gap-3 rounded-2xl p-3 text-white sm:p-3.5 ${slot === 0 ? "is-new" : ""} ${slot >= SHOWN ? "is-leaving" : ""}`}
              style={{ "--slot": slot } as React.CSSProperties}
            >
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white shadow-sm">
                <LogoMark className="h-5 w-auto" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-sm font-semibold">{u.title}</span>
                  <span className="flex-none text-[11px] text-white/50">{ages[slot]}</span>
                </span>
                <span className="block truncate text-[13px] text-white/70">{u.body}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
