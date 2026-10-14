import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ContactCTA } from "@/components/layout/contact-cta";
import { ProjectPreview } from "@/components/projects/project-preview";
import { TextLink } from "@/components/ui/text-link";
import { Arrow } from "@/components/ui/arrow";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { withBasePath } from "@/lib/base-path";

export const metadata: Metadata = {
  alternates: { canonical: withBasePath("/") },
};

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <Container>
          <div className="hero-topline">
            <p className="eyebrow">Estudio de diseño y desarrollo web</p>
            <span className="technical-label">
              Diseño con intención. Desarrollo con criterio.
            </span>
          </div>
          <h1>
            Tu negocio merece una web <span>a su altura.</span>
          </h1>
          <div className="hero-bottom">
            <p>
              Diseñamos y desarrollamos webs que reflejan tu identidad,
              transmiten confianza y facilitan conectar con tus clientes.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/contacto">
                Cuéntanos tu proyecto <Arrow />
              </Link>
              <TextLink href="/proyectos">Ver proyectos</TextLink>
            </div>
          </div>
          <div className="hero-work">
            <h2 className="sr-only">Trabajo destacado</h2>
            <div className="work-strip">
              <span className="technical-label">
                Una muestra de nuestro criterio
              </span>
              <span className="technical-label">
                Atria / Concepto de Nuvora
              </span>
            </div>
            <ProjectPreview project={projects[0]} priority />
          </div>
        </Container>
      </section>
      <section className="manifesto section-space">
        <Container className="editorial-split">
          <div>
            <p className="eyebrow">Nuestra forma de entender una web</p>
            <h2>
              Que se vea bien.
              <br />
              Que tenga sentido.
              <br />
              <span className="muted">Que funcione.</span>
            </h2>
          </div>
          <div className="editorial-copy">
            <p className="lead">
              Una buena web no empieza por el diseño. Empieza por entender lo
              que hace especial a tu negocio.
            </p>
            <p>
              Por eso cuidamos lo que cuentas, cómo lo presentas y cómo se
              utiliza. Diseño y tecnología trabajan juntos para construir una
              presencia clara, propia y fácil de recorrer.
            </p>
            <TextLink href="/estudio">Conoce el estudio</TextLink>
          </div>
        </Container>
      </section>
      <section className="section-space service-section">
        <Container>
          <div className="section-heading">
            <p className="eyebrow">En qué podemos ayudarte</p>
            <h2>
              Una web nueva.
              <br />
              Una web mejor.
              <br />
              Una web al día.
            </h2>
          </div>
          <div className="service-list">
            {services.map((service, index) => (
              <article className="service-row" key={service.slug}>
                <span className="technical-label">0{index + 1}</span>
                <h3>
                  <Link href={`/servicios/${service.slug}`}>
                    {service.name}
                  </Link>
                </h3>
                <div>
                  <p>{service.short}</p>
                  <TextLink href={`/servicios/${service.slug}`}>
                    Conocer el servicio
                  </TextLink>
                </div>
              </article>
            ))}
          </div>
          <TextLink href="/servicios">Todos los servicios</TextLink>
        </Container>
      </section>
      <section className="section-space selected-work">
        <Container>
          <div className="section-heading section-heading-split">
            <div>
              <p className="eyebrow">Diseño que puedes explorar</p>
              <h2>
                Distintos negocios.
                <br />
                Un mismo cuidado.
              </h2>
            </div>
            <p>
              Estos conceptos muestran nuestra forma de diseñar y desarrollar.
              Son demos propias, no encargos de clientes.
            </p>
          </div>
          <div className="project-selection">
            {projects.slice(1).map((project) => (
              <ProjectPreview key={project.slug} project={project} />
            ))}
          </div>
          <TextLink href="/proyectos">Ver proyectos</TextLink>
        </Container>
      </section>
      <section className="section-space method-preview">
        <Container className="editorial-split">
          <div>
            <p className="eyebrow">Criterio también en el proceso</p>
            <h2>
              Sabes qué hacemos.
              <br />Y por qué.
            </h2>
          </div>
          <div className="editorial-copy">
            <p className="lead">
              Conversaciones directas, decisiones explicadas y una dirección
              compartida.
            </p>
            <p>
              Definimos contigo el alcance, revisamos el diseño antes de
              desarrollar y comprobamos la web antes de publicar. Los detalles
              técnicos y la experiencia móvil forman parte del trabajo desde el
              principio.
            </p>
            <TextLink href="/proceso">Cómo trabajamos</TextLink>
          </div>
        </Container>
      </section>
      <section className="section-space studio-preview">
        <Container>
          <p className="eyebrow">Nuvora, de cerca</p>
          <div className="editorial-split">
            <h2>
              Nos importa
              <br />
              hacerlo bien.
            </h2>
            <div className="editorial-copy">
              <p className="lead">
                Nos mueve el equilibrio entre una idea bien diseñada y una web
                bien construida.
              </p>
              <p>
                Nos implicamos en el contenido, en el diseño y en el desarrollo.
                Preferimos explicar las decisiones y cuidar la entrega a
                prometer resultados que no podemos garantizar.
              </p>
              <TextLink href="/estudio">Conoce el estudio</TextLink>
            </div>
          </div>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}
