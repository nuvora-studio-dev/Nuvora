import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = { title: "Aviso legal", robots: { index: false } };

export default function LegalPage() {
  return <><PageIntro eyebrow="Legal" title="Aviso legal" description="Contenido pendiente de datos empresariales y revisión profesional." /><Container className="legal-copy"><p>No se han inventado titularidad, domicilio, identificación fiscal ni datos registrales.</p></Container></>;
}
