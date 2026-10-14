import type { MetadataRoute } from "next";
import { withBasePath } from "@/lib/base-path";
import { templateList } from "@/templates/registry";
import { siteConfig } from "@/content/site";
import { services } from "@/content/services";
import { projects } from "@/content/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.indexable) return [];
  return ["/", "/servicios", "/proyectos", "/estudio", "/proceso", "/contacto", "/plantillas", ...services.map(({ slug }) => `/servicios/${slug}`), ...projects.map(({ slug }) => `/proyectos/${slug}`), ...templateList.map(({ slug }) => `/plantillas/${slug}`)].map((path) => ({
    url: new URL(withBasePath(path === "/" ? path : `${path}/`), siteConfig.url).toString(),
  }));
}
