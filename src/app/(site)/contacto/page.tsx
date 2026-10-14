import type { Metadata } from "next";
import { Suspense } from "react";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";
import {
  ContactForm,
  ContactFormWithQuery,
} from "@/components/contact/contact-form";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "/contacto/",
  "Cuéntanos tu proyecto",
  "¿Necesitas una web nueva, renovar la actual o mantenerla al día? Cuéntanos tu negocio y lo que quieres mejorar. Contacta con Nuvora.",
);

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Empecemos una conversación"
        title="Cuéntanos tu proyecto."
        description="Una web nueva, una renovación o una mejora concreta. Nos interesa saber qué haces, dónde estás y qué necesitas."
      />
      <section className="section-space">
        <Container className="contact-layout">
          <div className="contact-context">
            <p className="eyebrow">El primer paso</p>
            <h2>No hace falta tenerlo todo resuelto.</h2>
            <p>
              Con un poco de contexto podemos valorar qué necesita tu web y cómo
              abordarlo.
            </p>
            <p>
              Si ya tienes una página, incluye su dirección. Nos ayudará a
              entender mejor el punto de partida.
            </p>
            <p>Puedes escribir directamente a:</p>
            <a className="text-link" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            <p className="form-notice">
              El formulario prepara un email para que lo revises y lo envíes
              desde tu aplicación de correo. No envía datos a un servidor de
              Nuvora.
            </p>
          </div>
          <Suspense fallback={<ContactForm />}>
            <ContactFormWithQuery />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
