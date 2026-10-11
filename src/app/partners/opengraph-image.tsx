import { ogImage } from "@/lib/og";

export const alt = "Scalewrk: A tech recruiter you can send your founders to.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "For VCs, accelerators, lawyers, and CFOs",
    title: "A tech recruiter you can send your founders to.",
  });
}
