import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { TemplateCatalog } from "@/components/templates/catalog";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "/plantillas/",
  "Demos y direcciones visuales",
  "Explora diseños base de Nuvora para gastronomía, fitness y bienestar. Cada dirección visual se adapta a tu negocio.",
);

export default function TemplatesPage() {
  return <>
    <section className="templates-intro"><Container><p className="eyebrow">Demos interactivas de Nuvora</p><h1>Una dirección clara para empezar algo propio.</h1><p>Atria, Pulse y Aura son conceptos demostrativos para restauración, fitness y belleza. Puedes recorrer cada demo y personalizarla como punto de partida para tu proyecto.</p></Container></section>
    <section className="section-space compact-top"><Container><TemplateCatalog /></Container></section>
  </>;
}
