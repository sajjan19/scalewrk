"use client";

import { useEffect, useId, useState } from "react";
import { UserRound } from "lucide-react";
import { mapCities, mapDots, mapSize } from "@/content/mapDots";

/*
  Home hero option "map": the US and Canada as a field of dots at night. Every few seconds a glowing
  arc links a city where a person is (purple end) to a city where a startup is (blue end), and a small
  pill shows the role. Purely illustrative (no real placements). Styles: "Hero map" in globals.css.
  People who turn off motion see all the links drawn at once, with no moving parts.
*/

// Who goes where: [from city, to city, role]
const links: [string, string, string][] = [
  ["Toronto", "San Francisco", "AI Engineer"],
  ["Vancouver", "Austin", "Founding Engineer"],
  ["Chicago", "New York", "Account Executive"],
  ["Los Angeles", "Toronto", "Head of Sales"],
  ["Montreal", "Boston", "Backend Engineer"],
  ["Seattle", "New York", "Full-Stack Engineer"],
];

const STEP_MS = 3200;
const { width: W, height: H } = mapSize;

// A curved arc from A to B that bows upward (like a flight path)
function arcPath(from: string, to: string) {
  const [x1, y1] = mapCities[from];
  const [x2, y2] = mapCities[to];
  const lift = Math.hypot(x2 - x1, y2 - y1) * 0.35;
  const cx = (x1 + x2) / 2;
  const cy = Math.min(y1, y2) - lift;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

export function HeroMap({ className = "" }: { className?: string }) {
  // Each copy (phone and desktop) gets its own ids, so the hidden copy can't break the visible one
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [step, setStep] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setStill(reduce.matches);
    update();
    reduce.addEventListener("change", update);
    const timer = window.setInterval(() => setStep((s) => s + 1), STEP_MS);
    return () => {
      reduce.removeEventListener("change", update);
      window.clearInterval(timer);
    };
  }, []);

  const current = step % links.length;
  const previous = (step - 1 + links.length) % links.length;
  const [from, to, role] = links[current];
  const [tx, ty] = mapCities[to];
  const left = (tx / W) * 100;
  const top = (ty / H) * 100;
  // Keep the pill inside the map: near an edge it lines up with the edge instead of centering
  const align = left > 72 ? "-100%" : left < 28 ? "0%" : "-50%";
  // Arcs bow upward, so the pill goes just below the city (or above it when the city is near the bottom)
  const below = top < 70;

  return (
    <div className={`hero-map relative mx-auto w-full max-w-xl lg:mx-0 lg:justify-self-end ${className}`} aria-hidden="true">
      <svg viewBox={`-1 -1 ${W + 2} ${H + 2}`} className="block h-auto w-full overflow-visible">
        <defs>
          {/* Fade out the flat top edge of the map */}
          <linearGradient id={`${uid}-fade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.22" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <mask id={`${uid}-mask`}>
            <rect x="-1" y="-1" width={W + 2} height={H + 2} fill={`url(#${uid}-fade)`} />
          </mask>
          {links.map(([a, b], i) => {
            const [x1, y1] = mapCities[a];
            const [x2, y2] = mapCities[b];
            return (
              <linearGradient key={i} id={`${uid}-arc-${i}`} gradientUnits="userSpaceOnUse" x1={x1} y1={y1} x2={x2} y2={y2}>
                <stop offset="0" stopColor="#a78bfa" />
                <stop offset="1" stopColor="#60a5fa" />
              </linearGradient>
            );
          })}
        </defs>

        {/* Land */}
        <g mask={`url(#${uid}-mask)`}>
          {mapDots.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={0.3} className="map-dot" />
          ))}
        </g>

        {/* Links: all of them when motion is off; otherwise the current one draws in and the last one fades out */}
        {links.map(([a, b], i) => {
          const state = still ? "is-still" : i === current ? "is-current" : i === previous ? "is-previous" : "is-hidden";
          return (
            <g key={state === "is-current" ? `${i}-${step}` : i} className={`map-link ${state}`}>
              <path d={arcPath(a, b)} pathLength={1} stroke={`url(#${uid}-arc-${i})`} className="map-arc" />
              <path d={arcPath(a, b)} pathLength={1} className="map-arc-head" />
            </g>
          );
        })}

        {/* Cities: purple where the person is, blue where the startup is, soft white otherwise */}
        {Object.entries(mapCities).map(([name, [x, y]]) => {
          const kind = !still && name === from ? "is-from" : !still && name === to ? "is-to" : "";
          return (
            <g key={name} className={`map-city ${kind}`}>
              <circle cx={x} cy={y} r={1.6} className="map-city-ping" />
              <circle cx={x} cy={y} r={0.55} className="map-city-dot" />
            </g>
          );
        })}
      </svg>

      {/* The role for the current link, next to the startup's city */}
      {!still && (
        <div
          key={step}
          className="map-pill glass-dark pointer-events-none absolute flex items-center gap-1.5 rounded-full py-1 pr-3 pl-1 text-[11px] font-semibold whitespace-nowrap text-white sm:text-[13px]"
          style={{ left: `${left}%`, top: `${top}%`, translate: below ? `${align} 10px` : `${align} calc(-100% - 10px)` }}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 text-[#c4b5fd] sm:h-6 sm:w-6">
            <UserRound className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
          {role}{" "}
          <span className="font-normal text-white/60">
            · {from} → {to}
          </span>
        </div>
      )}
    </div>
  );
}
