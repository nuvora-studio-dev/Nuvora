import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: { absolute: "Servicios de diseño y desarrollo web | Nuvora" },
  description: "Diseño web, desarrollo, landing pages, rediseño, optimización y mantenimiento de páginas web.",
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="Servicios" title="Todo lo necesario para construir una presencia digital profesional." description="Desde una landing page hasta una web corporativa completa. Diseñamos y desarrollamos cada proyecto en función de sus objetivos, con una dirección visual propia o una base adaptable." />
      <section className="section-space compact-top">
        <Container>
          <div className="service-list large">
            <article className="service-row">
              <h2>Diseño y desarrollo web</h2>
              <div>
                <p>Diseñamos y desarrollamos webs completas desde cero, combinando dirección visual, experiencia de usuario y desarrollo frontend.</p>
                <p className="service-detail-label">Incluye:</p>
                <ul className="service-includes">
                  <li>Arquitectura y estructura de contenidos</li>
                  <li>Diseño UX/UI</li>
                  <li>Desarrollo responsive</li>
                  <li>Formularios y funcionalidades</li>
                  <li>Optimización de rendimiento</li>
                  <li>SEO técnico básico</li>
                  <li>Accesibilidad</li>
                  <li>Configuración para publicación</li>
                </ul>
              </div>
            </article>
            <article className="service-row">
              <h2>Landing pages</h2>
              <div>
                <p>Páginas enfocadas en presentar una oferta concreta y conseguir una acción: contactar, reservar, solicitar información o comprar.</p>
                <p className="service-detail-label">Ideal para:</p>
                <p className="service-types">Campañas · Lanzamientos · Servicios · Captación de leads</p>
              </div>
            </article>
            <article className="service-row">
              <h2>Rediseño web</h2>
              <div>
                <p>Replanteamos webs que han quedado desactualizadas visual, técnica o estratégicamente.</p>
                <p className="service-detail-label">Trabajamos sobre:</p>
                <p className="service-types">Diseño · Jerarquía · Navegación · Mobile · Rendimiento · Conversión</p>
              </div>
            </article>
            <article className="service-row">
              <h2>Mantenimiento y evolución</h2>
              <div>
                <p>Seguimos trabajando en tu web después del lanzamiento para que continúe funcionando, evolucionando y representando correctamente a tu negocio.</p>
                <p className="service-detail-label">Servicios:</p>
                <p className="service-types">Actualizaciones · Correcciones · Nuevas secciones · Rendimiento · Mejoras continuas</p>
              </div>
            </article>
          </div>
        </Container>
      </section>
      <section className="budget-section section-space">
        <Container>
          <p className="eyebrow">Presupuestos</p>
          <h2>Cada proyecto necesita algo diferente.</h2>
          <p>Trabajamos con presupuestos cerrados según alcance, funcionalidades y complejidad. Antes de comenzar tendrás claro qué incluye el proyecto, cuánto cuesta y qué plazos manejamos.</p>
          <Link className="button" href="/contact">Solicitar presupuesto</Link>
        </Container>
      </section>
    </>
  );
}
