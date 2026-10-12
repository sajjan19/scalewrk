import { ogImage } from "@/lib/og";

export const alt = "Scalewrk: Why Scalewrk exists.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Mission & Vision",
    title: "Why Scalewrk exists.",
  });
}
