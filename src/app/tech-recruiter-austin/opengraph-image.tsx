import { ogImage } from "@/lib/og";

export const alt = "Scalewrk: Tech recruiting for Austin startups.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Austin",
    title: "Tech recruiting for Austin startups.",
  });
}
