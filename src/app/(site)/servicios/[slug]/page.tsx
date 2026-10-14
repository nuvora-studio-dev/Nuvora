import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";
import { ContactCTA } from "@/components/layout/contact-cta";
import { TextLink } from "@/components/ui/text-link";
import { services, getService } from "@/content/services";
import { withBasePath } from "@/lib/base-path";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.description,
    alternates: { canonical: withBasePath(`/servicios/${slug}/`) },
    openGraph: {
      title: `${service.name} | Nuvora`,
      description: service.description,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return (
    <>
      <PageIntro
        eyebrow={service.name}
        title={service.title}
        description={service.description}
      />
      <section className="section-space">
        <Container>
          <div className="service-lead">
            <p className="eyebrow">¿Es lo que necesitas?</p>
            <h2>{service.short}</h2>
            <p className="lead">{service.context}</p>
          </div>
          <div className="content-row">
            <h2>El punto de partida</h2>
            <div>
              <p>{service.problem}</p>
            </div>
          </div>
          <div className="content-row">
            <h2>Qué puede incluir</h2>
            <div>
              <ul>
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                El alcance concreto se acuerda según tu web, tus contenidos y
                tus necesidades.
              </p>
            </div>
          </div>
          <div className="content-row">
            <h2>Cómo lo abordamos</h2>
            <div>
              <p>{service.approach}</p>
              <TextLink href="/proceso">Cómo trabajamos</TextLink>
            </div>
          </div>
          <div className="content-row">
            <h2>Qué puedes esperar</h2>
            <div>
              <p>{service.outcome}</p>
              <p className="technical-label">{service.note}</p>
            </div>
          </div>
          <div className="service-contact">
            <Link
              className="button"
              href={`/contacto?servicio=${service.slug}`}
            >
              Cuéntanos tu proyecto
            </Link>
            <TextLink href="/servicios">Todos los servicios</TextLink>
          </div>
        </Container>
      </section>
      <ContactCTA href={`/contacto?servicio=${service.slug}`} />
    </>
  );
}
