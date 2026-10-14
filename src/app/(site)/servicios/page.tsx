import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";
import { ContactCTA } from "@/components/layout/contact-cta";
import { TextLink } from "@/components/ui/text-link";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "/servicios/",
  "Servicios de diseño, rediseño y mantenimiento web",
  "Una web nueva, una renovación de tu web actual o apoyo para mantenerla al día. Conoce cómo trabaja Nuvora y qué puede incluir cada servicio.",
);

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Servicios"
        title="El siguiente paso para tu web."
        description="No todos los negocios necesitan lo mismo. Podemos crear tu web, renovar la que ya tienes o ayudarte a cuidarla y hacerla evolucionar."
      />
      <section className="section-space">
        <Container>
          <div className="service-list">
            {services.map((service, index) => (
              <article className="service-row" key={service.slug}>
                <span className="technical-label">0{index + 1}</span>
                <h2>
                  <Link href={`/servicios/${service.slug}`}>
                    {service.name}
                  </Link>
                </h2>
                <div>
                  <p className="lead">{service.short}</p>
                  <p>{service.description}</p>
                  <p>{service.context}</p>
                  <TextLink href={`/servicios/${service.slug}`}>
                    Conocer el servicio
                  </TextLink>
                </div>
              </article>
            ))}
          </div>
          <div className="content-row">
            <h2>Un alcance claro antes de empezar.</h2>
            <div>
              <p>
                Valoramos las páginas, el contenido, las funcionalidades y la
                tecnología que requiere tu proyecto. La propuesta concreta qué
                incluye el trabajo y cómo se organiza, para que puedas decidir
                con información.
              </p>
              <TextLink href="/proceso">Cómo trabajamos</TextLink>
            </div>
          </div>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}
