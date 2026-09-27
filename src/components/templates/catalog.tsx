import Image from "next/image";
import Link from "next/link";
import { templateList } from "@/templates/registry";
import { withBasePath } from "@/lib/base-path";

export function TemplateCatalog() {
  return <div className="template-grid">
      {templateList.map((template) => <article className="template-card" key={template.slug}>
        <Link href={`/plantillas/${template.slug}`} aria-label={`Ver diseño ${template.name}`} className={`template-card-media template-${template.slug}`}>
          <Image src={withBasePath(template.cover)} alt={template.coverAlt} fill sizes="(max-width: 767px) 100vw, 50vw" />
          <span className="template-card-mark">{template.name}</span>
        </Link>
        <div className="template-card-meta"><div><p>{template.category} · {template.tags.slice(0, 2).join(" / ")}</p><h2>{template.name}</h2><p>Concepto Nuvora · Demo interactiva</p></div><Link href={`/plantillas/${template.slug}`} className="text-link">Ver diseño <span aria-hidden="true">↗</span></Link></div>
      </article>)}
    </div>;
}
