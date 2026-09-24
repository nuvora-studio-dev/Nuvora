import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = { title: "Privacidad", robots: { index: false } };

export default function PrivacyPage() {
  return <><PageIntro eyebrow="Legal" title="Privacidad" description="Contenido pendiente de definir el responsable y los tratamientos reales." /><Container className="legal-copy"><p>La web no envía formularios a un servidor ni instala analítica. Al preparar un correo desde la página de contacto, el envío depende de tu aplicación de correo. La política se completará cuando existan tratamientos de datos concretos.</p></Container></>;
}
