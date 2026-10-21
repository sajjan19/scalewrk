"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
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
  // True for a moment while the menu plays its closing animation (then it's removed)
  const [closing, setClosing] = useState(false);
  const iconOpen = open && !closing;

  // Close with an animation (the X button and Escape). Tapping a link closes right away since the page changes.
  const closeMenu = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setOpenOn(null);
    setClosing(true);
    window.setTimeout(() => {
      setOpenOn(null);
      setClosing(false);
    }, 300); // matches the closing animation in globals.css
  }, []);

  // While the phone menu is open, stop the page behind it from scrolling (the menu scrolls instead)
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.menu = "open"; // hides the phone "Book a call" bar (see globals.css)
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      delete document.body.dataset.menu;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeMenu]);

  return (
    // Floating liquid glass bar (.glass-bar in globals.css) that floats over the page. Pages leave room for it
    // with padding on <main> (--header-space). While the phone menu is open it turns into a plain white
    // full-width bar: blur would trap the full-screen menu inside the header
    <header
      className={`fixed z-40 ${
        open ? "inset-x-0 top-0 border-b border-transparent bg-white" : "glass-bar inset-x-3 top-3 mx-auto max-w-6xl rounded-2xl"
      }`}
    >
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
                className={`rise relative rounded-lg px-3 py-2 text-[15px] ${item.theme ?? ""} ${
                  active ? "font-medium text-brand" : "text-ink hover:text-brand"
                }`}
              >
                {item.label}
                {active && <ActiveBar />}
              </Link>
            );
          })}
          <Link href={bookingHref} className="btn btn-brand lift ml-3 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[15px] font-medium">
            <CalendarIcon /> Book a call
          </Link>
        </nav>

        <button
          type="button"
          className="rise -mr-2 flex h-11 w-11 items-center justify-center rounded-lg lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => (open ? closeMenu() : setOpenOn(pathname))}
        >
          {/* Three lines: the middle one fades out and the other two turn into an X */}
          <span className="relative block h-4 w-[18px]" aria-hidden="true">
            <span className={`absolute left-0 h-[1.5px] w-full rounded-full bg-ink transition-all duration-300 ${iconOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[2px]"}`} />
            <span className={`absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 rounded-full bg-ink transition-opacity duration-200 ${iconOpen ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-[1.5px] w-full rounded-full bg-ink transition-all duration-300 ${iconOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-[13px]"}`} />
          </span>
        </button>
      </div>

      {/* Phone menu, like apple.com: fills the screen below the header, big bold links that drop in one after another */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className={`menu-sheet ${closing ? "menu-closing" : ""} fixed inset-x-0 top-16 bottom-0 flex flex-col overflow-y-auto overscroll-contain bg-white px-8 pt-4 pb-10 lg:hidden`}
        >
          {/* Links spread evenly over the screen height */}
          <ul className="flex flex-1 flex-col justify-evenly">
            {[{ href: "/", label: "Home" }, ...nav]
              .flatMap((item: NavItem) => (item.children ?? [item]).map((link) => ({ ...link, theme: item.theme })))
              .map((link, i) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href} className={`menu-item ${link.theme ?? ""}`} style={{ animationDelay: `${i * 35 + 60}ms` }}>
                    <Link
                      href={link.href}
                      onClick={() => setOpenOn(null)}
                      aria-current={active ? "page" : undefined}
                      className={`block py-1.5 text-[28px] leading-tight font-semibold tracking-tight transition-colors ${
                        active ? "text-brand" : "text-ink hover:text-brand"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
          </ul>
          <div className="menu-item mt-8" style={{ animationDelay: `${(nav.length + 1) * 35 + 60}ms` }}>
            <Link href={bookingHref} onClick={() => setOpenOn(null)} className="btn btn-brand lift flex min-h-12 items-center justify-center gap-2 rounded-xl text-[15px] font-medium">
              <CalendarIcon /> Book a call
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

// Gradient bar under the menu item for the page you're on
function ActiveBar() {
  return <span aria-hidden="true" className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-gradient-to-r from-violet to-blue" />;
}

// A top-menu item with sub-pages (e.g. For Startups → How we work, Roles we hire).
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
    <div ref={box} className={`group relative ${item.theme ?? ""}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpenOn(open ? null : pathname)}
        className={`rise relative inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] ${
          active ? "font-medium text-brand" : "text-ink hover:text-brand"
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
