import { ogImage } from "@/lib/og";

export const alt = "Scalewrk: AI/ML, backend, full-stack, frontend, and platform engineers.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Roles we hire",
    title: "AI/ML, backend, full-stack, frontend, and platform engineers.",
  });
}
