import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";
import { ContactCTA } from "@/components/layout/contact-cta";
import { TextLink } from "@/components/ui/text-link";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "/estudio/",
  "El estudio",
  "Conoce la forma de trabajar de Nuvora: diseño y desarrollo juntos, comunicación directa y atención al detalle desde la primera conversación.",
);

export default function StudioPage() {
  return (
    <>
      <PageIntro
        eyebrow="El estudio"
        title="Nos importa cómo se ve. Y cómo está hecho."
        description="Nuvora nace de una forma compartida de entender el trabajo: diseñar con intención, desarrollar con criterio e implicarnos en cada detalle."
      />
      <section className="section-space">
        <Container>
          <div className="editorial-split">
            <h2>
              Diseño y desarrollo,
              <br />
              en la misma conversación.
            </h2>
            <div className="editorial-copy">
              <p className="lead">
                Una decisión visual tiene consecuencias en la experiencia. Una
                decisión técnica también.
              </p>
              <p>
                Por eso trabajamos las dos partes juntas. Nos interesa entender
                lo que necesitas, dar orden al contenido y construir una web que
                represente bien a tu negocio.
              </p>
              <p>
                El trato directo nos permite hablar de las propuestas, sus
                motivos y sus límites. Queremos que puedas decidir con claridad
                durante todo el proyecto.
              </p>
            </div>
          </div>
          <div className="studio-principles">
            <div className="content-row">
              <h2>Claridad</h2>
              <div>
                <p>
                  Una web debe ayudar a entender. Organizamos el contenido y la
                  navegación para que el visitante pueda encontrar lo que
                  necesita sin esfuerzo innecesario.
                </p>
              </div>
            </div>
            <div className="content-row">
              <h2>Cuidado</h2>
              <div>
                <p>
                  La calidad también está en lo pequeño: una lectura cómoda, una
                  imagen bien preparada, un formulario comprensible y una
                  navegación que funciona con teclado.
                </p>
              </div>
            </div>
            <div className="content-row">
              <h2>Honestidad</h2>
              <div>
                <p>
                  Explicamos qué podemos hacer y qué depende del contexto de tu
                  negocio. No prometemos ventas, posiciones en Google o
                  funcionalidades que no se han acordado.
                </p>
              </div>
            </div>
            <div className="content-row">
              <h2>Implicación</h2>
              <div>
                <p>
                  Diseñamos y desarrollamos con una dirección compartida.
                  Revisamos el trabajo contigo y cuidamos la coherencia desde el
                  inicio hasta la entrega.
                </p>
                <TextLink href="/proceso">Cómo trabajamos</TextLink>
              </div>
            </div>
          </div>
          <section className="studio-principles" aria-labelledby="team-title">
            <p className="eyebrow">Las personas detrás</p>
            <h2 id="team-title">Gabi y Alex.</h2>
            <div className="team-list">
              <div>
                <h3>Gabi</h3>
                <p>Desarrollador web</p>
              </div>
              <div>
                <h3>Alex</h3>
                <p>Desarrollador web</p>
              </div>
            </div>
          </section>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}
