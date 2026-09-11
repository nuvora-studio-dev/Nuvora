import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = { title: "Trabajo", description: "Archivo de proyectos de Nuvora." };

export default function WorkPage() {
  return (
    <>
      <PageIntro eyebrow="Trabajo" title="El resultado habla antes que nosotros." description="Este archivo recibirá únicamente proyectos reales con contexto, proceso y resultados verificables." />
      <section className="section-space compact-top">
        <Container>
          <div className="work-empty-grid">
            <div className="empty-projects">
              <p className="eyebrow">Archivo en preparación</p>
              <h2>Los primeros casos se publicarán aquí.</h2>
              <p>Cada caso mostrará contexto, decisiones y resultados verificables.</p>
            </div>
            <figure className="empty-projects-art">
              <Image src="/brand/nuvora-detail-art.png" alt="Estudio abstracto de una cinta azul de Nuvora" fill sizes="(max-width: 767px) 100vw, 42vw" />
            </figure>
          </div>
        </Container>
      </section>
    </>
  );
}
