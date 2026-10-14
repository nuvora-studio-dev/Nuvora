import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/content/site";

export function pageMetadata(
  path: string,
  title: string,
  description: string,
  image = "/opengraph-image.png",
  imageAlt = "Composición abstracta de cintas azules de Nuvora sobre un espacio oscuro",
): Metadata {
  const socialTitle = path === "/" ? title : `${title} | Nuvora`;
  const images = [{ url: absoluteUrl(image), alt: imageAlt }];
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    robots: { index: siteConfig.indexable, follow: siteConfig.indexable },
    openGraph: {
      type: "website", locale: "es_ES", siteName: siteConfig.name,
      url: absoluteUrl(path), title: socialTitle, description, images,
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images },
  };
}
