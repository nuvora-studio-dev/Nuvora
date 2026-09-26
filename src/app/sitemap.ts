import type { MetadataRoute } from "next";
import { withBasePath } from "@/lib/base-path";
import { templateList } from "@/templates/registry";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return ["/plantillas", ...templateList.map(({ slug }) => `/plantillas/${slug}`)].map((path) => ({
    url: new URL(withBasePath(`${path}/`), origin).toString(),
  }));
}
