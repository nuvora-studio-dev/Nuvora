import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { TemplateCatalog } from "@/components/templates/catalog";
import { withBasePath } from "@/lib/base-path";

export const metadata: Metadata = {
  title: "Plantillas y direcciones visuales",
  description: "Explora diseños base de Nuvora para gastronomía, fitness y bienestar. Cada dirección visual se adapta a tu negocio.",
  alternates: { canonical: withBasePath("/plantillas") },
  robots: { index: true, follow: true },
};

export default function TemplatesPage() {
  return <>
    <section className="templates-intro"><Container><p className="eyebrow">Diseños base de Nuvora</p><h1>Una dirección clara para empezar algo propio.</h1><p>Explora experiencias diseñadas para sectores concretos. Cada una es un punto de partida: adaptamos contenido, identidad y funcionalidades a la realidad de tu proyecto.</p></Container></section>
    <section className="section-space compact-top"><Container><TemplateCatalog /></Container></section>
  </>;
}
