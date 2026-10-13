"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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

  // While the phone menu is open, stop the page behind it from scrolling (the menu scrolls instead)
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.menu = "open"; // hides the phone "Book a call" bar (see globals.css)
    return () => {
      document.body.style.overflow = previous;
      delete document.body.dataset.menu;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Scalewrk home" className="rise -m-1 inline-block p-1">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = isActive(item, pathname);
            if (item.children) return <DropdownMenu key={item.href} item={item} pathname={pathname} active={active} />;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rise relative rounded-lg px-3 py-2 text-[15px] ${
                  active ? "font-medium text-brand" : "text-body hover:text-brand"
                }`}
              >
                {item.label}
                {active && <ActiveBar />}
              </Link>
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
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-line bg-white px-5 pb-6 lg:hidden"
        >
          <ul className="divide-y divide-line">
            {[{ href: "/", label: "Home" }, ...nav, { href: "/contact", label: "Contact" }].map((item: NavItem) => {
              // An item with sub-pages (About) is a label with its links underneath
              const links = item.children ?? [{ href: item.href, label: item.label }];
              return (
                <li key={item.href} className={item.children ? "py-3" : ""}>
                  {item.children && <p className="pt-1 pb-1 text-sm font-medium text-muted">{item.label}</p>}
                  {links.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpenOn(null)}
                        aria-current={active ? "page" : undefined}
                        className={`rise flex items-center justify-between text-lg font-medium ${item.children ? "py-2" : "py-4"} ${
                          active ? "text-brand" : "hover:text-brand"
                        }`}
                      >
                        {link.label}
                        {active && <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet to-blue" aria-hidden="true" />}
                      </Link>
                    );
                  })}
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

// Gradient bar under the menu item for the page you're on
function ActiveBar() {
  return <span aria-hidden="true" className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-gradient-to-r from-violet to-blue" />;
}

// A top-menu item with sub-pages (e.g. For Startups → How we work, Roles we hire, Pricing).
// Clicking or tapping opens the list (it doesn't go to a page itself). It also opens on hover with a mouse.
// Closes when you pick a page, click outside or press Escape.
function DropdownMenu({ item, pathname, active }: { item: NavItem; pathname: string; active: boolean }) {
  // Remembers which page it was opened on, so it closes itself after navigating
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpenOn(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenOn(null);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const menuId = `menu-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <div ref={box} className="group relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpenOn(open ? null : pathname)}
        className={`rise relative inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] ${
          active ? "font-medium text-brand" : "text-body hover:text-brand"
        }`}
      >
        {item.label}
        <ChevronDown className={`h-4 w-4 transition group-hover:rotate-180 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        {active && <ActiveBar />}
      </button>
      <div
        id={menuId}
        className={`absolute top-full left-1/2 z-50 w-52 -translate-x-1/2 pt-3 transition ${
          open ? "visible opacity-100" : "invisible opacity-0 group-hover:visible group-hover:opacity-100"
        }`}
      >
        <ul className="rounded-xl bg-white p-1.5 shadow-lg ring-1 ring-line">
          {item.children?.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={() => setOpenOn(null)}
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
}
