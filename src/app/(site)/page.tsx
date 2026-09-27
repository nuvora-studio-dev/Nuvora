import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { TextLink } from "@/components/ui/text-link";
import { templateList } from "@/templates/registry";
import { withBasePath } from "@/lib/base-path";

export default function Home() {
  return (
    <>
      <section className="hero">
        <Container className="hero-grid">
          <div className="hero-copy reveal">
            <p className="eyebrow">Estudio de diseño y desarrollo web</p>
            <h1>Una web a la altura de tu negocio.</h1>
            <p>Diseño con identidad. Desarrollo a medida. Creamos webs que explican lo que haces y facilitan que tus visitantes den el siguiente paso.</p>
            <Link className="button" href="/contact">Cuéntanos tu proyecto</Link>
            <div className="hero-actions"><TextLink href="/plantillas">Explora nuestros diseños</TextLink></div>
            <p className="hero-services">Diseño · Desarrollo · Optimización · Mantenimiento</p>
          </div>
          <figure className="hero-art reveal delay-one">
            <Image src={withBasePath("/brand/nuvora-hero-art.webp")} alt="Instalación abstracta de cintas azules inspirada en el gesto visual de Nuvora" fill priority sizes="(max-width: 1023px) 100vw, 52vw" />
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
            <h2>Todo lo necesario para construir una buena web.</h2>
            <p>Diseño, desarrollo y optimización trabajando como partes del mismo proyecto.</p>
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

      <section className="home-designs section-space view-reveal" aria-labelledby="home-designs-title">
        <Container>
          <div className="section-heading">
            <h2 id="home-designs-title">El diseño se entiende mejor cuando lo ves.</h2>
            <p>Tres sectores, tres identidades. Explora estas demos y comprueba cómo se sienten al navegar.</p>
          </div>
          <div className="home-demo-grid">
            {templateList.map((template) => <article key={template.slug}>
              <Link className="home-demo-preview" href={`/plantillas/${template.slug}/demo`} aria-label={`Explorar demo de ${template.name}`}>
                <Image src={withBasePath(`/templates/previews/${template.slug}.jpg`)} alt={`Captura de la demo ${template.name} para ${template.category.toLowerCase()}`} width={1400} height={800} sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" />
              </Link>
              <div className="home-demo-info"><p>{template.category}</p><h3>{template.name}</h3><p>Concepto Nuvora · Demo interactiva</p><p>{template.tagline}</p><TextLink href={`/plantillas/${template.slug}/demo`}>Explorar demo<span className="sr-only"> de {template.name}</span></TextLink></div>
            </article>)}
          </div>
        </Container>
      </section>
      <section className="why-nuvora section-space view-reveal">
        <Container>
          <p className="eyebrow">Por qué Nuvora</p>
          <h2>Menos ruido. Más criterio.</h2>
          <div className="why-grid">
            <article><h3><span>01</span> Diseño con intención</h3><p>Cada decisión visual tiene una función. Diseñamos para comunicar, no para decorar.</p></article>
            <article><h3><span>02</span> Desarrollo a medida</h3><p>Partimos de lo que necesita tu negocio para definir la estructura, el contenido y las funcionalidades de tu web.</p></article>
            <article><h3><span>03</span> Decisiones compartidas</h3><p>Te explicamos las propuestas y sus motivos para que puedas decidir con criterio durante el proyecto.</p></article>
            <article><h3><span>04</span> Comunicación directa</h3><p>Hablas directamente con las personas que diseñan y desarrollan tu proyecto. Sin intermediarios.</p></article>
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
            <li><strong>03 — Diseñar y desarrollar</strong><span>Damos forma a la dirección acordada y construimos las páginas y funcionalidades del proyecto.</span></li>
            <li><strong>04 — Lanzar y mejorar</strong><span>Comprobamos la web antes de publicarla. Después del lanzamiento, podemos mantenerla y mejorarla según las necesidades de tu negocio.</span></li>
          </ol>
        </Container>
      </section>

      <section className="standard section-space view-reveal" aria-labelledby="standard-title">
        <Container>
          <h2 id="standard-title">El estándar Nuvora.</h2>
          <div className="service-list large compact-top">
            <article className="service-row"><h3>Responsive</h3><p>Adaptamos la composición y la navegación a escritorio, tablet y móvil.</p></article>
            <article className="service-row"><h3>Rendimiento</h3><p>Optimizamos imágenes, recursos y carga de las páginas para reducir esperas.</p></article>
            <article className="service-row"><h3>Accesibilidad</h3><p>Cuidamos el contraste, la estructura semántica, la navegación por teclado y los estados de foco.</p></article>
            <article className="service-row"><h3>SEO técnico</h3><p>Preparamos títulos, metadatos, URLs y estructura para facilitar la indexación.</p></article>
            <article className="service-row"><h3>Mantenibilidad</h3><p>Organizamos el código para facilitar actualizaciones, correcciones y nuevas funcionalidades.</p></article>
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
