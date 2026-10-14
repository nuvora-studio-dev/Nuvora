import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...pageMetadata("/privacidad/", "Política de privacidad", "Información sobre los datos que compartes al consultar un proyecto con Nuvora."),
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return <>
    <PageIntro eyebrow="Legal" title="Política de privacidad" description="Información sobre los datos que compartes al consultar un proyecto." />
    <Container className="legal-copy">
      <p><strong>Borrador pendiente de completar antes del uso comercial.</strong> Falta confirmar la identidad del responsable, el plazo de conservación y las condiciones del servicio de correo.</p>
      <h2>Responsable y contacto</h2>
      <p>Nuvora es el nombre comercial del estudio. Nombre o razón social, NIF y domicilio del responsable: pendientes de confirmar. Contacto: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. Consulta también el <Link href="/aviso-legal">Aviso legal</Link>.</p>
      <h2>Datos y finalidad</h2>
      <p>El formulario recoge tu nombre, email, servicio de interés y descripción del proyecto. Puedes añadir empresa, web actual y configuración de una demo. La finalidad de la consulta es responderte y valorar el proyecto; no se solicita autorización para publicidad.</p>
      <h2>Cómo se envía tu consulta</h2>
      <p>Al enviar, los datos se transmiten por HTTPS a Web3Forms para entregar la consulta al buzón de Nuvora. La web no los guarda en una base de datos propia. Si el envío falla, los campos se conservan en la página para permitir el reintento.</p>
      <h2>Base del tratamiento</h2>
      <p>La base del tratamiento de las consultas y gestiones previas a una posible contratación debe concretarse con el responsable antes del uso comercial. La casilla del formulario confirma la lectura de esta información y no autoriza el envío de publicidad.</p>
      <h2>Conservación y proveedores</h2>
      <p>Plazo de conservación de las consultas y personas autorizadas a acceder al buzón: pendientes de confirmar. El envío del formulario utiliza Web3Forms y el correo de contacto utiliza Outlook; falta documentar las condiciones aplicables del proveedor, sus garantías y, en su caso, transferencias internacionales. También debe confirmarse el proveedor de alojamiento y el tratamiento de sus registros técnicos.</p>
      <h2>Tus derechos</h2>
      <p>Puedes solicitar acceso, rectificación, supresión, oposición, limitación y portabilidad cuando proceda, y retirar tu consentimiento, escribiendo al email de contacto. Retirarlo no afecta a la licitud del tratamiento anterior. Puedes presentar una reclamación ante la <a href="https://www.aepd.es">Agencia Española de Protección de Datos</a>.</p>
      <h2>Cookies</h2>
      <p>Consulta la información disponible en la <Link href="/cookies">página de Cookies</Link>.</p>
    </Container>
  </>;
}
