import { ogImage } from "@/lib/og";

export const alt = "Scalewrk: Great meeting you. Let's talk hiring.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Scalewrk",
    title: "Great meeting you. Let's talk hiring.",
  });
}
