import { useId } from "react";

// The Scalewrk "S" ribbon mark, redrawn as SVG from the brand logo.
// Points are shared with the favicon and social images (src/lib/brand.ts).
import { markPoints, markViewBox } from "@/lib/brand";

export function LogoMark({ className = "h-7 w-auto" }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox={markViewBox} className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7a2ff5" />
          <stop offset="1" stopColor="#0d6efd" />
        </linearGradient>
      </defs>
      <polygon points={markPoints} fill={`url(#${id})`} />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className="h-7 w-auto" />
      <span className={`text-[1.35rem] leading-none tracking-tight ${light ? "text-white" : "text-ink"}`}>
        <span className="font-bold">scalewrk</span>{" "}
        <span className="font-light">talent</span>
      </span>
    </span>
  );
}
