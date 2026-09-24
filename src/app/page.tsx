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
            <p className="eyebrow">Estudio de diseño y desarrollo web</p>
            <h1>Creamos webs que hacen que tu negocio se vea tan profesional como realmente es.</h1>
            <p>Diseñamos y desarrollamos páginas web rápidas, modernas y pensadas para convertir visitas en clientes. Sin plantillas genéricas. Sin complicaciones innecesarias.</p>
            <div className="hero-actions">
              <Link className="button" href="/contact">Cuéntanos tu proyecto</Link>
              <TextLink href="/work">Ver proyectos</TextLink>
            </div>
            <p className="hero-services">Diseño · Desarrollo · Optimización · Mantenimiento</p>
          </div>
          <figure className="hero-art reveal delay-one">
            <Image src={withBasePath("/brand/nuvora-hero-art.png")} alt="Instalación abstracta de cintas azules inspirada en el gesto visual de Nuvora" fill priority sizes="(max-width: 767px) 100vw, 52vw" />
          </figure>
        </Container>
      </section>

      <section className="manifesto section-space view-reveal">
        <Container>
          <h2 className="manifesto-lead">Tu web no debería ser simplemente bonita.</h2>
          <div className="manifesto-copy">
            <p>Tiene que explicar qué haces, generar confianza y facilitar que alguien dé el siguiente paso.</p>
            <p>En Nuvora unimos diseño y desarrollo para construir webs con una identidad cuidada, una experiencia clara y una base técnica preparada para crecer.</p>
          </div>
        </Container>
      </section>

      <section className="services-preview section-space view-reveal">
        <Container>
          <div className="section-heading">
            <h2>De la idea al sistema.</h2>
            <p>Unimos criterio visual, producto y desarrollo en una misma dirección.</p>
          </div>
          <div className="service-list">
            <article className="service-row">
              <h3>Diseño y desarrollo web</h3>
              <div>
                <p>Creamos páginas web a medida para negocios, profesionales y marcas que necesitan una presencia digital seria, rápida y diferenciada.</p>
                <p className="service-types">Web corporativa · Portfolio · Landing page · Web de servicios</p>
              </div>
            </article>
            <article className="service-row">
              <h3>Rediseño y optimización</h3>
              <div>
                <p>Si tu web se ha quedado atrás, replanteamos su diseño, estructura y experiencia para convertirla en una herramienta que represente mejor tu negocio.</p>
                <p className="service-types">UX/UI · Responsive · Rendimiento · SEO técnico</p>
              </div>
            </article>
            <article className="service-row">
              <h3>Mantenimiento y evolución</h3>
              <div>
                <p>Una web no termina el día que se publica. Podemos encargarnos de mantenerla, mejorarla y adaptarla a medida que evoluciona tu negocio.</p>
                <p className="service-types">Actualizaciones · Mejoras · Soporte · Nuevas funcionalidades</p>
              </div>
            </article>
          </div>
          <TextLink href="/services">Ver todos los servicios</TextLink>
        </Container>
      </section>

      <section className="why-nuvora section-space view-reveal">
        <Container>
          <p className="eyebrow">Por qué Nuvora</p>
          <h2>Menos ruido. Más criterio.</h2>
          <div className="why-grid">
            <article><h3><span>01</span> Diseño con intención</h3><p>Cada decisión visual tiene una función. Diseñamos para comunicar, no para decorar.</p></article>
            <article><h3><span>02</span> Desarrollo a medida</h3><p>Construimos sobre una base técnica sólida, sin depender de plantillas que limiten el proyecto.</p></article>
            <article><h3><span>03</span> Rendimiento desde el principio</h3><p>Velocidad, responsive, accesibilidad y SEO técnico forman parte del proyecto, no son extras posteriores.</p></article>
            <article><h3><span>04</span> Comunicación directa</h3><p>Hablas directamente con las personas que diseñan y desarrollan tu proyecto. Sin intermediarios.</p></article>
          </div>
        </Container>
      </section>

      <section className="work-preview section-space view-reveal">
        <Container>
          <div className="work-frame">
            <div className="work-copy">
              <p className="eyebrow">Proyectos seleccionados</p>
              <h2>El diseño importa. El resultado también.</h2>
              <p>Una selección de productos y experiencias digitales donde diseño, tecnología y atención al detalle trabajan en la misma dirección.</p>
              <TextLink href="/work">Explorar proyectos</TextLink>
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
            <h2>Un proceso claro de principio a fin.</h2>
            <p>Sabes qué estamos haciendo, por qué lo estamos haciendo y qué viene después.</p>
          </div>
          <ol className="method-flow">
            <li><strong>01 — Descubrir</strong><span>Entendemos tu negocio, tus objetivos, tus usuarios y lo que necesita conseguir la nueva web.</span></li>
            <li><strong>02 — Definir</strong><span>Organizamos contenido, estructura, dirección visual y funcionalidades antes de empezar a construir.</span></li>
            <li><strong>03 — Diseñar y desarrollar</strong><span>Convertimos la dirección acordada en una experiencia responsive, rápida y cuidada hasta el detalle.</span></li>
            <li><strong>04 — Lanzar y mejorar</strong><span>Revisamos rendimiento, accesibilidad, SEO técnico y funcionamiento antes de publicar.</span></li>
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
          <h2>¿Tu web representa realmente el nivel de tu negocio?</h2>
          <p>Cuéntanos qué necesitas. Analizaremos tu proyecto y te diremos cómo podemos ayudarte.</p>
          <Link className="button" href="/contact">Cuéntanos tu proyecto</Link>
          <p className="closing-note">Sin compromiso</p>
        </Container>
      </section>
    </>
  );
}
