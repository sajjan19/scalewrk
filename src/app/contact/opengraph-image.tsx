import { ogImage } from "@/lib/og";

export const alt = "Contact Scalewrk";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Contact",
    title: "Get in touch with Scalewrk.",
  });
}
