import type { Metadata } from "next";
import { site } from "@/content/site";

/*
  Page title, description and social sharing tags in one place.
  Usage in a page:  export const metadata = pageMetadata({ title, description, path: "/roles" });
  The social preview image comes from the page's opengraph-image.tsx file.
*/
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}
