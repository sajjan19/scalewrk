import { ogImage } from "@/lib/og";

export const alt = "Scalewrk: Find your next startup role.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "For candidates",
    title: "Find your next startup role.",
  });
}
