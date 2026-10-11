import { ogImage } from "@/lib/og";

export const alt = "Scalewrk: Startups hiring now.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Jobs",
    title: "Startups hiring now.",
  });
}
