import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";
import { ContactCTA } from "@/components/layout/contact-cta";
import { ProjectPreview } from "@/components/projects/project-preview";
import { TextLink } from "@/components/ui/text-link";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "/proyectos/",
  "Proyectos y conceptos web",
  "Explora Atria, Pulse y Aura: conceptos de Nuvora para restauración, fitness y bienestar, con casos explicados y demos navegables.",
);

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Trabajo seleccionado"
        title="El criterio se ve en los detalles."
        description="Tres conceptos propios, tres formas de comunicar. Puedes conocer las decisiones de cada diseño y recorrer su demo. Son trabajos demostrativos, no encargos de clientes."
      />
      <section className="section-space">
        <Container>
          <h2 className="sr-only">Conceptos seleccionados</h2>
          <div className="project-selection">
            {projects.map((project, index) => (
              <ProjectPreview
                key={project.slug}
                project={project}
                priority={index === 0}
              />
            ))}
          </div>
          <TextLink href="/plantillas">
            Explorar y personalizar las demos
          </TextLink>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}
