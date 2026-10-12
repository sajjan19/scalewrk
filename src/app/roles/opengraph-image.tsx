import { ogImage } from "@/lib/og";

export const alt = "Scalewrk: Every type of engineer. Every kind of startup.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Roles we hire",
    title: "Every type of engineer. Every kind of startup.",
  });
}
