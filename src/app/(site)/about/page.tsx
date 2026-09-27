import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = { title: { absolute: "Sobre Nuvora | Estudio de diseño y desarrollo web" }, description: "Conoce a Gabi y Alex, desarrolladores web de Nuvora, y nuestra forma de trabajar." };

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="Nuvora" title="Un estudio digital pequeño por diseño." description="Nuvora es un estudio independiente de diseño y desarrollo web creado para trabajar de una forma más directa, cuidada y flexible." />
      <section className="section-space compact-top">
        <Container className="about-layout">
          <h2>Diseñamos y desarrollamos. Sin intermediarios.</h2>
          <div className="about-copy">
            <p>Trabajamos directamente en cada proyecto desde la primera conversación hasta el lanzamiento. Esto nos permite entender mejor el problema, tomar decisiones más rápido y mantener coherencia entre lo que se diseña y lo que finalmente se construye.</p>
          </div>
          <section className="about-principles" aria-labelledby="team-title">
            <h2 id="team-title">Quiénes están detrás de Nuvora</h2>
            <div className="why-grid">
              <article><h3>Gabi</h3><p>Desarrollador web</p></article>
              <article><h3>Alex</h3><p>Desarrollador web</p></article>
            </div>
          </section>
          <div className="about-principles">
            <h2>Nuestra forma de trabajar</h2>
            <div className="why-grid">
              <article><h3>Claridad antes que decoración</h3><p>Cada elemento debe tener una razón para existir.</p></article>
              <article><h3>Diseño y código juntos</h3><p>Lo que diseñamos debe poder construirse bien.</p></article>
              <article><h3>Tecnología cuando aporta valor</h3><p>Utilizamos las herramientas adecuadas para cada proyecto, no tecnología por utilizar tecnología.</p></article>
              <article><h3>Detalle hasta el lanzamiento</h3><p>Responsive, rendimiento y accesibilidad forman parte del producto final.</p></article>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
