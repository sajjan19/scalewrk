"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { bookingHref } from "@/content/site";
import { Arrow, CalendarIcon } from "./ui";

// Sticky bar on phones, so the main action is always one tap away.
// It slides up once you start scrolling and hides again at the top of the page.
// Engineer pages show engineer actions: job pages "Apply for this role", the Jobs page "Share your profile",
// the Engineers page "View all jobs". Hidden on pages that already show the calendar.
const hiddenOn = ["/contact", "/meet", "/testimonial"];

// How far (in pixels) you scroll before the bar appears
const SHOW_AFTER = 40;

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const isScrolled = () => window.scrollY > SHOW_AFTER;

export function MobileBookBar() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribe, isScrolled, () => false);
  if (hiddenOn.includes(pathname)) return null;

  // Engineer pages get an engineer action; everyone else sees "Book a call"
  const jobSlug = pathname.startsWith("/jobs/") ? pathname.split("/")[2] : null;
  const action = jobSlug
    ? { href: `/engineers?job=${jobSlug}#apply`, label: "Apply for this role" }
    : pathname === "/jobs"
      ? { href: "/engineers#apply", label: "Share your profile" }
      : pathname === "/engineers"
        ? { href: "/jobs", label: "View all jobs" }
        : null;

  return (
    <div
      aria-hidden={!scrolled}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 ease-out motion-reduce:transition-none lg:hidden ${
        scrolled ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <Link
        href={action?.href ?? bookingHref}
        tabIndex={scrolled ? undefined : -1}
        className="btn-brand flex min-h-12 items-center justify-center gap-2 rounded-xl text-[15px] font-medium"
      >
        {action ? (
          <>
            {action.label} <Arrow />
          </>
        ) : (
          <>
            <CalendarIcon /> Book a call
          </>
        )}
      </Link>
    </div>
  );
}
