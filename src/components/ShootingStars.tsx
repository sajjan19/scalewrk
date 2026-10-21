"use client";

import { useEffect, useRef } from "react";

/*
  Shooting stars for the Home hero: now and then (a random 40 to 70 seconds apart) a purple-to-blue
  streak with a glowing head shoots across. Each one gets a random direction (anything from down-right
  to down-left), length, starting spot, distance and speed, so no two look the same. Only one at a time.
  Styles: .shooting-star in globals.css. Off for people who turn off motion.
  The parent needs `relative overflow-hidden`.
*/
const between = (min: number, max: number) => min + Math.random() * (max - min);

export function ShootingStars() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = layer.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;

    const shoot = () => {
      const star = document.createElement("span");
      star.className = "shooting-star";
      // Direction of travel in degrees: 0 = right, 90 = straight down, 180 = left.
      // The streak's head is its left end, so turning it by (direction - 180) points the head that way.
      const direction = between(20, 160);
      const turn = direction - 180;
      star.style.width = `${Math.round(between(70, 220))}px`;
      star.style.top = `${between(0, 45)}%`;
      // Start on the side it's moving away from, so it crosses the hero instead of leaving right away
      star.style.left = direction < 90 ? `${between(0, 60)}%` : `${between(40, 100)}%`;
      el.appendChild(star);
      const distance = between(320, 640);
      const duration = between(700, 1300);
      star
        .animate(
          [
            { transform: `rotate(${turn}deg) translateX(0)`, opacity: 0 },
            { transform: `rotate(${turn}deg) translateX(-${distance * 0.15}px)`, opacity: 1, offset: 0.15 },
            { transform: `rotate(${turn}deg) translateX(-${distance}px)`, opacity: 0 },
          ],
          { duration, easing: "ease-in" },
        )
        .finished.then(
          () => star.remove(),
          () => star.remove(),
        );
      timer = window.setTimeout(shoot, between(40000, 70000));
    };

    // First one a few seconds after the page loads
    timer = window.setTimeout(shoot, between(2500, 5000));
    return () => clearTimeout(timer);
  }, []);

  return <div ref={layer} aria-hidden="true" className="pointer-events-none absolute inset-0" />;
}
