import { ogImage } from "@/lib/og";

export const alt = "Scalewrk: Tech recruiting for San Francisco startups.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "San Francisco",
    title: "Tech recruiting for San Francisco startups.",
  });
}
