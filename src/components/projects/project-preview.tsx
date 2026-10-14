import { TemplateImage } from "@/components/templates/template-image";
import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
import { withBasePath } from "@/lib/base-path";
import { projects } from "@/content/projects";

export function ProjectPreview({
  project,
  priority = false,
}: {
  project: (typeof projects)[number];
  priority?: boolean;
}) {
  return (
    <article className={`project-preview project-${project.slug}`}>
      <Link
        className="project-image"
        href={`/proyectos/${project.slug}`}
        aria-label={`Ver el caso conceptual de ${project.name}`}
      >
        <TemplateImage
          src={withBasePath(`/templates/previews/${project.slug}.webp`)}
          alt={`Interfaz de la demo ${project.name}: ${project.category.toLowerCase()}`}
          width={1400}
          height={800}
          priority={priority}
          sizes="(max-width: 767px) 100vw, 75vw"
        />
        <span className="project-image-link" aria-hidden="true">
          <Arrow />
        </span>
      </Link>
      <div className="project-caption">
        <div>
          <p className="eyebrow">
            {project.category} · {project.kind}
          </p>
          <h3>
            <Link href={`/proyectos/${project.slug}`}>{project.name}</Link>
          </h3>
        </div>
        <p>{project.intro}</p>
      </div>
    </article>
  );
}
