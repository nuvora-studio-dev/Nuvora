import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = { title: "Contacto", description: "Iniciar una conversación con Nuvora." };

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Contacto" title="Todo buen proyecto empieza entendiendo el problema." description="Comparte el contexto, la necesidad y el punto en el que se encuentra tu proyecto." />
      <section className="section-space compact-top">
        <Container className="contact-layout">
          <div className="contact-context">
            <h2>Empecemos por lo esencial.</h2>
            <p>Describe el objetivo, el alcance y cualquier restricción relevante. Ese contexto nos permitirá valorar mejor el siguiente paso.</p>
          </div>
          <ContactForm />
        </Container>
      </section>
    </>
  );
}
