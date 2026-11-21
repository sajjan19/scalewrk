"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";

/*
  Home hero option "tracker": a card with a few roles moving through Planning → Shortlist → Interviews → Offer.
  Every couple of seconds one role moves up a step and its progress bar fills; after "Hired" it starts a new
  search. Purely illustrative (not real searches). People who turn off motion see it standing still.
*/

const steps = ["Planning", "Shortlist", "Interviews", "Offer"];
// What the chip says at each step (the last one is the hire), with its colours on the dark hero
const stages = [
  { label: "Planning the role", tone: "bg-white/10 text-slate-200" },
  { label: "Shortlist sent", tone: "bg-violet-400/20 text-violet-200" },
  { label: "Interviewing", tone: "bg-amber-300/15 text-amber-200" },
  { label: "Offer out", tone: "bg-emerald-300/15 text-emerald-200" },
  { label: "Hired 🎉", tone: "bg-emerald-400/25 text-emerald-100" },
];

const roles = ["Full-Stack Engineer", "Founding AI Engineer", "Senior Backend Engineer", "Account Executive"];
// Where each role starts (0 = Planning … 4 = Hired)
const startAt = [0, 1, 2, 3];
const STEP_MS = 1900;

export function HeroTracker({ className = "" }: { className?: string }) {
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setTicks((t) => t + 1), STEP_MS);
    return () => window.clearInterval(timer);
  }, []);

  // Each tick moves the next role (in turn) up one step; after Hired it goes back to Planning
  const stageOf = (row: number) => {
    const moves = Math.floor(ticks / roles.length) + (ticks % roles.length > row ? 1 : 0);
    return (startAt[row] + moves) % stages.length;
  };

  return (
    <div className={`relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end ${className}`} aria-hidden="true">
      <div className="glass-dark rounded-2xl p-4 text-white sm:p-5">
        <p className="font-semibold">Every role, from plan to offer</p>

        {/* Step names */}
        <div className="mt-4 grid grid-cols-4 gap-1 text-center text-[11px] font-medium text-white/50">
          {steps.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <ul className="mt-1 divide-y divide-white/10">
          {roles.map((role, row) => {
            const stage = stageOf(row);
            return (
              // Phones show three roles (the fourth from tablets up), so the card stays short
              <li key={role} className={`py-3 ${row === roles.length - 1 ? "hidden sm:block" : ""}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate text-sm font-medium sm:text-[15px]">{role}</span>
                  <span key={stage} className={`tracker-chip shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${stages[stage].tone}`}>
                    {stages[stage].label}
                  </span>
                </div>
                {/* Progress: one segment per step, filling left to right */}
                <div className="mt-2 grid grid-cols-4 gap-1">
                  {steps.map((label, i) => (
                    <span key={label} className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <span
                        className="block h-full rounded-full bg-gradient-to-r from-violet to-blue transition-[width] duration-700 ease-out"
                        style={{ width: i <= Math.min(stage, 3) ? "100%" : "0%" }}
                      />
                    </span>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>

        {/* Hidden on phones to keep the card short, so the hero buttons stay on screen */}
        <div className="mt-2 hidden items-center gap-3 rounded-xl bg-white/5 p-3 text-sm text-white/70 ring-1 ring-white/10 sm:flex">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white">
            <LogoMark className="h-4 w-auto" />
          </span>
          One recruiting partner for every tech and sales role.
        </div>
      </div>
    </div>
  );
}
