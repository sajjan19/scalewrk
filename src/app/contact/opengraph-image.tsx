import { ogImage } from "@/lib/og";

export const alt = "Scalewrk: Let's talk about your next hire or your next role.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Book a call",
    title: "Let's talk about your next hire or your next role.",
  });
}
