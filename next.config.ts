import type { NextConfig } from "next";

// Every page on this site is static (built once, served from Vercel's CDN),
// so we use the classic static rendering model without Cache Components.
const nextConfig: NextConfig = {
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
