import type { Metadata } from "next";
import { TemplateImage as Image } from "@/components/templates/template-image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { ContactCTA } from "@/components/layout/contact-cta";
import { TextLink } from "@/components/ui/text-link";
import { projects, getProject } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import { withBasePath } from "@/lib/base-path";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata(
    `/proyectos/${slug}/`, `${project.name} — caso conceptual`, project.intro,
    `/templates/previews/${slug}.webp`,
    `Captura de la interfaz conceptual de ${project.name}`,
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <>
      <section className="project-detail-hero">
        <Container>
          <TextLink href="/proyectos">Todos los proyectos</TextLink>
          <div className="project-detail-heading">
            <div>
              <p className="eyebrow">
                {project.category} · {project.kind}
              </p>
              <h1>{project.name}</h1>
            </div>
            <p className="lead">{project.intro}</p>
          </div>
          <div className="project-image">
            <Image
              src={withBasePath(`/templates/previews/${slug}.webp`)}
              alt={`Captura de la interfaz conceptual de ${project.name}`}
              width={1400}
              height={800}
              priority
              sizes="100vw"
            />
          </div>
        </Container>
      </section>
      <section className="section-space compact-top">
        <Container>
          <div className="content-row">
            <h2>Contexto</h2>
            <div>
              <p>{project.context}</p>
            </div>
          </div>
          <div className="content-row">
            <h2>El reto</h2>
            <div>
              <p>{project.challenge}</p>
            </div>
          </div>
          <div className="content-row">
            <h2>Objetivos del concepto</h2>
            <div>
              <ul>
                {project.objectives.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="content-row">
            <h2>La solución</h2>
            <div>
              <p>{project.solution}</p>
            </div>
          </div>
          <div className="content-row">
            <h2>Decisiones de diseño</h2>
            <div>
              <p>{project.design}</p>
            </div>
          </div>
          <figure className="case-photo">
            <Image
              src={withBasePath(project.detailImage)}
              alt={project.detailAlt}
              fill
              sizes="(max-width: 767px) 100vw, 80vw"
            />
          </figure>
          <p className="case-image-note">
            Fotografía ilustrativa utilizada en la demo. No corresponde a un
            cliente de Nuvora.
          </p>
          <div className="content-row">
            <h2>Desarrollo y funciones</h2>
            <div>
              <p>{project.development}</p>
            </div>
          </div>
          <div className="content-row">
            <h2>Resultado</h2>
            <div>
              <p>{project.result}</p>
              <p>
                No se atribuyen resultados comerciales ni métricas de clientes a
                este concepto.
              </p>
            </div>
          </div>
          <div className="service-contact">
            <Link
              className="button"
              href={`/plantillas/${slug}/demo/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explorar demo ↗
              <span className="sr-only"> (abre una pestaña nueva)</span>
            </Link>
            <TextLink href={`/plantillas/${slug}`}>
              Personalizar este concepto
            </TextLink>
          </div>
        </Container>
      </section>
      <ContactCTA href={`/contacto?template=${slug}`} />
    </>
  );
}
