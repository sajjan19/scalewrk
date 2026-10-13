import { ogImage } from "@/lib/og";

export const alt = "Scalewrk: Share your profile.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "For engineers",
    title: "Share your profile.",
  });
}
