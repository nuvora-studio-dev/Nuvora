import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";
import { ContactCTA } from "@/components/layout/contact-cta";
import { processSteps } from "@/content/process";
import { withBasePath } from "@/lib/base-path";

export const metadata: Metadata = {
  title: "Cómo trabajamos",
  description:
    "Del primer contacto a la publicación: conoce el proceso de Nuvora, qué revisamos y cómo participas en las decisiones de tu proyecto web.",
  alternates: { canonical: withBasePath("/proceso/") },
};

export default function ProcessPage() {
  return (
    <>
      <PageIntro
        eyebrow="Cómo trabajamos"
        title="Una dirección clara. De principio a fin."
        description="Cada proyecto tiene su contexto. Este es el recorrido que seguimos para entenderlo, darle forma y construirlo contigo, con decisiones explicadas y revisiones compartidas."
      />
      <section className="section-space">
        <Container>
          <div className="process-list">
            {processSteps.map((step, index) => (
              <article className="process-step" key={step.name}>
                <span className="technical-label">0{index + 1}</span>
                <div>
                  <p className="eyebrow">{step.name}</p>
                  <h2>{step.title}</h2>
                </div>
                <div>
                  <p>{step.text}</p>
                  <p>
                    <strong>Qué tendrás:</strong> {step.deliverable}
                  </p>
                  <p>
                    <strong>Tu participación:</strong> {step.participation}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="content-row">
            <h2>Comunicación sin rodeos.</h2>
            <div>
              <p>
                Acordamos al inicio cómo compartiremos avances y comentarios.
                Las decisiones, los materiales necesarios y las revisiones se
                ordenan según el alcance del proyecto.
              </p>
              <p>
                Si aparece una necesidad nueva, la valoramos contigo antes de
                incorporarla. Así puedes entender qué cambia y cómo afecta al
                trabajo.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}
