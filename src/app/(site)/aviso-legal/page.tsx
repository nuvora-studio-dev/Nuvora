import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = { title: "Aviso legal", robots: { index: false, follow: false } };

export default function LegalPage() {
  return <>
    <PageIntro eyebrow="Legal" title="Aviso legal" description="Información sobre el titular y el contenido de esta web." />
    <Container className="legal-copy">
      <p><strong>Borrador pendiente de completar antes del uso comercial.</strong> Nuvora es un nombre comercial; la identificación legal del titular todavía no está confirmada.</p>
      <h2>Identificación del titular</h2>
      <ul>
        <li>Nombre o razón social: pendiente de confirmar.</li>
        <li>NIF o CIF: pendiente de confirmar.</li>
        <li>Domicilio profesional: pendiente de confirmar.</li>
        <li>Datos registrales, si corresponden: pendientes de confirmar.</li>
        <li>Email: <a href="mailto:nuvora.studio@outlook.com">nuvora.studio@outlook.com</a>.</li>
      </ul>
      <h2>Objeto de la web</h2>
      <p>Esta web presenta los servicios de diseño, desarrollo, optimización y mantenimiento de Nuvora y permite preparar consultas por email. El envío de una consulta no formaliza una contratación.</p>
      <h2>Demos y contenido ilustrativo</h2>
      <p>Atria, Pulse y Aura son conceptos de Nuvora y demos interactivas personalizables. La fotografía es ilustrativa; las solicitudes de reserva o cita de las demos no constituyen confirmaciones reales.</p>
      <h2>Contenido y derechos</h2>
      <p>La disponibilidad de imágenes, textos y diseños en esta web no concede derechos para reutilizarlos. Los recursos de terceros mantienen las condiciones de sus respectivas licencias.</p>
      <h2>Privacidad y cookies</h2>
      <p>Consulta la <Link href="/privacidad">Política de privacidad</Link> y la información sobre <Link href="/cookies">Cookies</Link>.</p>
    </Container>
  </>;
}
