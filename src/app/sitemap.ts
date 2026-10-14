import type { MetadataRoute } from "next";
import { templateList } from "@/templates/registry";
import { absoluteUrl, siteConfig } from "@/content/site";
import { services } from "@/content/services";
import { projects } from "@/content/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.indexable) return [];
  return ["/", "/servicios", "/proyectos", "/estudio", "/proceso", "/contacto", "/plantillas", ...services.map(({ slug }) => `/servicios/${slug}`), ...projects.map(({ slug }) => `/proyectos/${slug}`), ...templateList.map(({ slug }) => `/plantillas/${slug}`)].map((path) => ({
    url: absoluteUrl(path === "/" ? path : `${path}/`),
  }));
}
