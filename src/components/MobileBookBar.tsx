"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bookingHref } from "@/content/site";

// Sticky bar on phones, so the main action is always one tap away.
// Job pages show "Apply for this role", the Jobs page shows "Share your profile". Hidden on pages that already show the calendar and on the engineers page.
const hiddenOn = ["/contact", "/meet", "/engineers"];

export function MobileBookBar() {
  const pathname = usePathname();
  if (hiddenOn.includes(pathname)) return null;

  // Engineers see engineer actions; everyone else sees "Book a call"
  const jobSlug = pathname.startsWith("/jobs/") ? pathname.split("/")[2] : null;
  const href = jobSlug ? `/engineers?job=${jobSlug}#apply` : pathname === "/jobs" ? "/engineers#apply" : bookingHref;
  const label = jobSlug ? "Apply for this role" : pathname === "/jobs" ? "Share your profile" : "Book a 20-minute call";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <Link href={href} className="btn-brand flex min-h-12 items-center justify-center rounded-xl text-[15px] font-medium">
        {label}
      </Link>
    </div>
  );
}
