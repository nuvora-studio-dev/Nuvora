import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...pageMetadata("/cookies/", "Cookies", "Información sobre el uso de cookies en la web de Nuvora."),
  robots: { index: false, follow: false },
};

export default function CookiesPage() {
  return <><PageIntro eyebrow="Legal" title="Cookies" description="Información sobre el uso de cookies en esta web." /><Container className="legal-copy"><p>Esta web no configura cookies propias ni integra servicios de analítica. Si esto cambia, actualizaremos esta página antes de activarlos.</p></Container></>;
}
