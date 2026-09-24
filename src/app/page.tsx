import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { TextLink } from "@/components/ui/text-link";
import { siteConfig } from "@/content/site";
import { withBasePath } from "@/lib/base-path";

export default function Home() {
  return (
    <>
      <section className="hero">
        <Container className="hero-grid">
          <div className="hero-copy reveal">
            <p className="eyebrow">Estudio digital</p>
            <h1>Ideas complejas. Experiencias claras.</h1>
            <p>Diseñamos y desarrollamos productos digitales claros, precisos y preparados para crecer.</p>
            <div className="hero-actions">
              <Link className="button" href="/contact">Iniciar un proyecto</Link>
              <TextLink href="/work">Ver trabajo</TextLink>
            </div>
          </div>
          <figure className="hero-art reveal delay-one">
            <Image src={withBasePath("/brand/nuvora-hero-art.png")} alt="Instalación abstracta de cintas azules inspirada en el gesto visual de Nuvora" fill priority sizes="(max-width: 767px) 100vw, 52vw" />
          </figure>
        </Container>
      </section>

      <section className="manifesto section-space view-reveal">
        <Container>
          <p className="manifesto-lead">Nuvora no vende complejidad. Demuestra control sobre ella.</p>
          <p className="manifesto-copy">Cada sistema se diseña para comunicar mejor, funcionar con precisión y seguir teniendo sentido cuando el proyecto crece.</p>
        </Container>
      </section>

      <section className="services-preview section-space view-reveal">
        <Container>
          <div className="section-heading">
            <h2>De la idea al sistema.</h2>
            <p>Unimos criterio visual, producto y desarrollo en una misma dirección.</p>
          </div>
          <div className="service-list">
            {siteConfig.services.map((service) => (
              <article key={service.title} className="service-row">
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </article>
            ))}
          </div>
          <TextLink href="/services">Explorar capacidades</TextLink>
        </Container>
      </section>

      <section className="work-preview section-space view-reveal">
        <Container>
          <div className="work-frame">
            <div className="work-copy">
              <p className="eyebrow">Trabajo seleccionado</p>
              <h2>Trabajo con contexto, decisiones y resultados.</h2>
              <p>Cada caso se publicará con material real y una explicación clara del proceso.</p>
              <TextLink href="/work">Ver el archivo</TextLink>
            </div>
            <figure className="work-visual">
              <Image src={withBasePath("/brand/nuvora-detail-art.png")} alt="Detalle material azul de la dirección visual de Nuvora" fill sizes="(max-width: 767px) 100vw, 58vw" />
            </figure>
          </div>
        </Container>
      </section>

      <section className="method section-space view-reveal">
        <Container>
          <div className="method-intro">
            <h2>Una dirección. De principio a fin.</h2>
            <p>Estrategia, diseño y desarrollo avanzan como partes del mismo sistema.</p>
          </div>
          <ol className="method-flow">
            <li><strong>Entender</strong><span>Objetivo, contexto y restricciones reales.</span></li>
            <li><strong>Definir</strong><span>Arquitectura, lenguaje y criterio de éxito.</span></li>
            <li><strong>Construir</strong><span>Diseño y código con la misma precisión.</span></li>
            <li><strong>Refinar</strong><span>Validación, rendimiento y detalle final.</span></li>
          </ol>
        </Container>
      </section>

      <section className="principles section-space view-reveal">
        <Container>
          <h2>Un método que elimina ruido.</h2>
          <div className="principle-grid">
            {siteConfig.principles.map((principle) => <p key={principle}>{principle}</p>)}
          </div>
        </Container>
      </section>

      <section className="closing-cta section-space view-reveal">
        <Container>
          <p>Una presencia digital debe demostrar el nivel que representa.</p>
          <h2>Construyamos algo que merezca permanecer.</h2>
          <Link className="button" href="/contact">Iniciar un proyecto</Link>
        </Container>
      </section>
    </>
  );
}
