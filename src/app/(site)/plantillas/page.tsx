import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { TemplateCatalog } from "@/components/templates/catalog";
import { withBasePath } from "@/lib/base-path";

export const metadata: Metadata = {
  title: "Demos y direcciones visuales",
  description: "Explora diseños base de Nuvora para gastronomía, fitness y bienestar. Cada dirección visual se adapta a tu negocio.",
  alternates: { canonical: withBasePath("/plantillas") },
  robots: { index: true, follow: true },
};

export default function TemplatesPage() {
  return <>
    <section className="templates-intro"><Container><p className="eyebrow">Demos interactivas de Nuvora</p><h1>Una dirección clara para empezar algo propio.</h1><p>Atria, Pulse y Aura son conceptos demostrativos para restauración, fitness y belleza. Puedes recorrer cada demo y personalizarla como punto de partida para tu proyecto.</p></Container></section>
    <section className="section-space compact-top"><Container><TemplateCatalog /></Container></section>
  </>;
}
