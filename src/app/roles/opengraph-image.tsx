import { ogImage } from "@/lib/og";

export const alt = "Scalewrk: The people who build and sell your product.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Roles we hire",
    title: "The people who build and sell your product.",
  });
}
