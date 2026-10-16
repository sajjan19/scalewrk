import { ogImage } from "@/lib/og";

export const alt = "Scalewrk: Tech recruiting for Montreal startups.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Montreal",
    title: "Tech recruiting for Montreal startups.",
  });
}
