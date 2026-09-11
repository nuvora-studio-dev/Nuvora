import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = { title: "Sobre Nuvora", description: "Principios y dirección de Nuvora." };

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="Nuvora" title="Tecnología diseñada con intención." description="Nuvora combina desarrollo, diseño y tecnología para crear productos y experiencias digitales de alto nivel." />
      <section className="section-space compact-top">
        <Container className="about-layout">
          <h2>La claridad es una decisión de diseño.</h2>
          <div className="about-copy">
            <p>Trabajamos desde el sistema completo: qué debe comunicar, cómo debe funcionar y qué necesita para evolucionar con coherencia.</p>
            <p>La identidad aparece en el ritmo, la jerarquía, el detalle técnico y la forma de reducir fricción.</p>
          </div>
          <div className="principle-grid about-principles">
            {siteConfig.principles.map((principle) => <p key={principle}>{principle}</p>)}
          </div>
        </Container>
      </section>
    </>
  );
}
