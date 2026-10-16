import { ogImage } from "@/lib/og";

export const alt = "Scalewrk: Tech recruiting for Los Angeles startups.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Los Angeles",
    title: "Tech recruiting for Los Angeles startups.",
  });
}
