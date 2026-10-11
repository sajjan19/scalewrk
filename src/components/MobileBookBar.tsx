"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bookingHref } from "@/content/site";

// Sticky "Book a call" bar on phones, so booking is always one tap away.
// Hidden on pages that already have the calendar on screen, and on the engineers page.
const hiddenOn = ["/contact", "/meet", "/engineers"];

export function MobileBookBar() {
  const pathname = usePathname();
  if (hiddenOn.includes(pathname)) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <Link
        href={bookingHref}
        className="btn-brand flex min-h-12 items-center justify-center rounded-xl text-[15px] font-medium"
      >
        Book a 20-minute call
      </Link>
    </div>
  );
}
