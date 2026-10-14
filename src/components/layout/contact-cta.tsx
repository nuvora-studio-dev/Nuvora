import Link from "next/link";
import { Container } from "./container";
import { Arrow } from "@/components/ui/arrow";

export function ContactCTA({ href = "/contacto" }: { href?: string }) {
  return (
    <section className="contact-cta section-space">
      <Container>
        <p className="eyebrow">La próxima conversación</p>
        <div className="cta-layout">
          <h2>Hablemos de lo que tu web puede hacer mejor.</h2>
          <div>
            <p>
              No necesitas tenerlo todo definido. Cuéntanos dónde estás y qué te
              gustaría cambiar.
            </p>
            <Link className="button" href={href}>
              Cuéntanos tu proyecto <Arrow />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
