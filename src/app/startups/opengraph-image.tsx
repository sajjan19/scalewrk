import { ogImage } from "@/lib/og";

export const alt = "Scalewrk: Your embedded hiring partner, from seed to scale.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "For founders and CEOs",
    title: "Your embedded hiring partner, from seed to scale.",
  });
}
