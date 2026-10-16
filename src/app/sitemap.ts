import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { hasOpenJobs, jobs } from "@/content/jobs";
import { showRolesPage } from "@/content/roles";

// /meet is left out on purpose: it's the event QR-code page, not for search.
const routes = ["", "/startups", ...(hasOpenJobs ? ["/jobs"] : []), ...(showRolesPage ? ["/roles"] : []), "/engineers", "/share-profile", "/about", "/tech-recruiter-new-york", "/tech-recruiter-san-francisco", "/tech-recruiter-vancouver", "/tech-recruiter-toronto", "/tech-recruiter-seattle", "/book-a-call", "/contact", "/privacy"];

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
