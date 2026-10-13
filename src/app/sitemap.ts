import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { jobs } from "@/content/jobs";

// /meet is left out on purpose: it's the event QR-code page, not for search.
const routes = ["", "/startups", "/jobs", "/roles", "/partners", "/engineers", "/share-profile", "/about", "/mission", "/tech-recruiter-new-york", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  // Real job listings only (example listings are hidden from Google)
  const jobRoutes = jobs.filter((j) => !j.example).map((j) => `/jobs/${j.slug}`);
  return [...routes, ...jobRoutes].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : route === "/privacy" ? 0.3 : 0.8,
  }));
}
