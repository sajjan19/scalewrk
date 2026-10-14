import { ogImage } from "@/lib/og";

export const alt = "Scalewrk: Built to Scale. Powered by Talent.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Tech recruiting for seed to Series C+",
    title: "Built to Scale.\nPowered by Talent.",
  });
}
