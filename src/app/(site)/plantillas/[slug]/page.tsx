import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { DemoViewer } from "@/components/templates/demo-viewer";
import { withBasePath } from "@/lib/base-path";
import { getTemplate, templateList, type TemplateSlug } from "@/templates/registry";

export function generateStaticParams() { return templateList.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) return {};
  return { title: template.seoTitle, description: template.description, robots: { index: true, follow: true }, alternates: { canonical: withBasePath(`/plantillas/${slug}`) }, openGraph: { title: template.seoTitle, description: template.description, images: [withBasePath(template.cover)] } };
}

export default async function TemplatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();
  return <>
    <section className="template-detail-hero"><Container className="template-detail-heading"><div><Link href="/plantillas" className="template-back">← Todos los diseños</Link><p className="eyebrow">{template.category} · Concepto Nuvora · Demo interactiva</p><h1>{template.name}</h1><p className="template-tagline">{template.tagline}</p><p className="template-description">{template.description}</p><div className="template-actions"><Link className="button" href={`/plantillas/${slug}/demo`} target="_blank">Explorar demo ↗</Link><Link className="text-link" href={`/contact?template=${slug}`}>Usar como punto de partida <span aria-hidden="true">↗</span></Link></div></div><div className="template-detail-image"><Image src={withBasePath(template.cover)} alt={template.coverAlt} fill priority sizes="(max-width: 767px) 100vw, 52vw" /></div></Container></section>
    <section className="template-viewer-section section-space"><Container><div className="section-heading"><h2>Explora la experiencia.</h2><p>Una demo navegable, diseñada para escritorio, tablet y móvil.</p></div><DemoViewer slug={slug as TemplateSlug} name={template.name} /></Container></section>
    <section className="template-specs section-space"><Container><div className="template-specs-intro"><h2>Una base con dirección. Abierta a tu negocio.</h2><p>Esta demo muestra una posibilidad visual y funcional. La versión final se ajusta a tu marca, contenido y necesidades reales.</p></div><div className="template-specs-grid"><div><h3>Páginas incluidas</h3><ul>{template.pages.map((page) => <li key={page}>{page}</li>)}</ul></div><div><h3>Funcionalidades</h3><ul>{template.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div><div><h3>Personalización</h3><p>Fotografía, textos, colores, secciones y estructura pueden evolucionar con el proyecto. La composición se adapta a cada tamaño de pantalla.</p></div></div><div className="template-secondary-image"><Image src={withBasePath(template.detailImage)} alt={template.detailAlt} fill sizes="(max-width: 767px) 100vw, 80vw" /></div></Container></section>
    <section className="template-closing section-space"><Container><h2>Hagamos que esta dirección sea tuya.</h2><p>Cuéntanos qué necesitas y partiremos de {template.name} para construir una experiencia propia.</p><Link className="button" href={`/contact?template=${slug}`}>Usar como punto de partida</Link></Container></section>
  </>;
}
