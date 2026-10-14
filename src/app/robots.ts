import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Crawlers must access previews and demos to read their noindex metadata.
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: siteConfig.indexable ? absoluteUrl("/sitemap.xml") : undefined,
  };
}
