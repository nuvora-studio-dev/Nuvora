import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = { title: "Contacto", description: "Cuéntanos tu proyecto web y descubre cómo Nuvora puede ayudarte a diseñarlo y desarrollarlo." };

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Contacto" title="Cuéntanos qué quieres construir." description="No necesitas tenerlo todo definido. Explícanos qué haces, qué necesitas y qué quieres conseguir. Nosotros te ayudaremos a convertirlo en un proyecto concreto." />
      <section className="section-space compact-top">
        <Container className="contact-layout">
          <div className="contact-context">
            <h2>Hablemos de tu proyecto.</h2>
            <p>Comparte el contexto, el objetivo y el plazo que tienes en mente.</p>
          </div>
          <div>
            <ContactForm />
            <p className="contact-alternative">¿Prefieres el email? <a href="mailto:nuvora.studio@outlook.com">nuvora.studio@outlook.com</a></p>
          </div>
        </Container>
      </section>
    </>
  );
}
