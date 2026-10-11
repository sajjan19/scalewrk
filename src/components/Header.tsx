"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { bookingHref, nav } from "@/content/site";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  // The mobile menu remembers which page it was opened on, so it closes itself after navigating
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Scalewrk home" className="-m-1 p-1">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-lg px-3 py-2 text-[15px] transition-colors ${
                  active ? "font-medium text-brand" : "text-body hover:bg-brand-soft hover:text-brand"
                }`}
              >
                {item.label}
                {/* Gradient bar under the page you're on */}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-gradient-to-r from-violet to-blue"
                  />
                )}
              </Link>
            );
          })}
          <Link href={bookingHref} className="btn-brand ml-3 rounded-lg px-4 py-2 text-[15px] font-medium">
            Book a call
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpenOn(open ? null : pathname)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-line bg-white px-5 pb-6 lg:hidden">
          <ul className="divide-y divide-line">
            {[{ href: "/", label: "Home" }, ...nav, { href: "/contact", label: "Contact" }].map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpenOn(null)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between py-4 text-lg font-medium ${active ? "text-brand" : "hover:text-brand"}`}
                  >
                    {item.label}
                    {active && <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet to-blue" aria-hidden="true" />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href={bookingHref} onClick={() => setOpenOn(null)} className="btn-brand mt-4 flex min-h-12 items-center justify-center rounded-xl text-[15px] font-medium">
            Book a call
          </Link>
        </nav>
      )}
    </header>
  );
}
