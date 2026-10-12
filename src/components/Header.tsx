"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { bookingHref, nav, type NavItem } from "@/content/site";
import { Logo } from "./Logo";
import { CalendarIcon } from "./ui";

// True when the page you're on is this menu item (or one of its sub-pages)
function isActive(item: NavItem, pathname: string) {
  const hrefs = [item.href, ...(item.children ?? []).map((c) => c.href)];
  return hrefs.some((href) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`)));
}

export function Header() {
  const pathname = usePathname();
  // The mobile menu remembers which page it was opened on, so it closes itself after navigating
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Scalewrk home" className="rise -m-1 inline-block p-1">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = isActive(item, pathname);
            const link = (
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`rise relative inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] ${
                  active ? "font-medium text-brand" : "text-body hover:text-brand"
                }`}
              >
                {item.label}
                {item.children && (
                  <ChevronDown className="h-4 w-4 transition group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
                )}
                {/* Gradient bar under the page you're on */}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-gradient-to-r from-violet to-blue"
                  />
                )}
              </Link>
            );
            if (!item.children) return <span key={item.href}>{link}</span>;
            // Dropdown: opens on hover or keyboard focus
            return (
              <div key={item.href} className="group relative">
                {link}
                <div className="invisible absolute top-full left-1/2 z-50 w-52 -translate-x-1/2 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="rounded-xl bg-white p-1.5 shadow-lg ring-1 ring-line">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          aria-current={pathname === child.href ? "page" : undefined}
                          className={`block rounded-lg px-3 py-2 text-[15px] hover:bg-brand-soft hover:text-brand-dark ${
                            pathname === child.href ? "font-medium text-brand" : "text-body"
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
          <Link href={bookingHref} className="btn-brand lift ml-3 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[15px] font-medium">
            <CalendarIcon /> Book a call
          </Link>
        </nav>

        <button
          type="button"
          className="rise -mr-2 flex h-11 w-11 items-center justify-center rounded-lg lg:hidden"
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
            {[{ href: "/", label: "Home" }, ...nav, { href: "/contact", label: "Contact" }].map((item: NavItem) => {
              const active = pathname === item.href;
              // Sub-links (e.g. Mission & Vision under About), skipping the one that repeats the main link
              const subLinks = (item.children ?? []).filter((c) => c.href !== item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpenOn(null)}
                    aria-current={active ? "page" : undefined}
                    className={`rise flex items-center justify-between py-4 text-lg font-medium ${active ? "text-brand" : "hover:text-brand"}`}
                  >
                    {item.label}
                    {active && <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet to-blue" aria-hidden="true" />}
                  </Link>
                  {subLinks.length > 0 && (
                    <ul className="-mt-2 mb-3 space-y-1 border-l-2 border-brand/20 pl-4">
                      {subLinks.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setOpenOn(null)}
                            aria-current={pathname === child.href ? "page" : undefined}
                            className={`rise flex items-center justify-between py-1.5 text-base ${
                              pathname === child.href ? "font-medium text-brand" : "text-body hover:text-brand"
                            }`}
                          >
                            {child.label}
                            {pathname === child.href && (
                              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet to-blue" aria-hidden="true" />
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
          <Link href={bookingHref} onClick={() => setOpenOn(null)} className="btn-brand lift mt-4 flex min-h-12 items-center justify-center gap-2 rounded-xl text-[15px] font-medium">
            <CalendarIcon /> Book a call
          </Link>
        </nav>
      )}
    </header>
  );
}
