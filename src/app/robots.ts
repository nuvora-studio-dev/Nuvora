import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { withBasePath } from "@/lib/base-path";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return siteConfig.indexable
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: new URL(withBasePath("/sitemap.xml"), siteConfig.url).toString() }
    : { rules: { userAgent: "*", disallow: "/" } };
}
