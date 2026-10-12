import { ogImage } from "@/lib/og";

export const alt = "Scalewrk: Meet the team that matches startups and engineers.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "About Scalewrk",
    title: "Meet the team that matches startups and engineers.",
  });
}
