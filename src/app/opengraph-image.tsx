import { ogImage } from "@/lib/og";

export const alt = "Scalewrk: Tech hiring for growing startups.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Tech recruiting for seed to Series C+",
    title: "Tech hiring for\ngrowing startups.",
  });
}
