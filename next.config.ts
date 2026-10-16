import type { NextConfig } from "next";

// Every page on this site is static (built once, served from Vercel's CDN),
// so we use the classic static rendering model without Cache Components.
const nextConfig: NextConfig = {
  // Allow higher-quality images for founder headshots (default is 75 only)
  images: { qualities: [75, 90] },
  // Mission & Vision moved onto the About page
  async redirects() {
    return [{ source: "/mission", destination: "/about#mission", permanent: true }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
