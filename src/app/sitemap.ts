import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// /meet is left out on purpose: it's the event QR-code page, not for search.
const routes = ["", "/startups", "/roles", "/partners", "/engineers", "/about", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : route === "/privacy" ? 0.3 : 0.8,
  }));
}
