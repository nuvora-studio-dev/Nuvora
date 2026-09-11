import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = { title: "Servicios", description: "Capacidades digitales de Nuvora." };

export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="Capacidades" title="Pensamiento y ejecución en una misma dirección." description="Áreas iniciales pendientes de confirmar como oferta comercial definitiva." />
      <section className="section-space compact-top">
        <Container>
          <div className="service-list large">
            {siteConfig.services.map((service) => (
              <article key={service.title} className="service-row">
                <div><h2>{service.title}</h2></div>
                <p>{service.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
