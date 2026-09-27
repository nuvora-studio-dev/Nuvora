import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = { title: "Política de privacidad", robots: { index: false, follow: false } };

export default function PrivacyPage() {
  return <>
    <PageIntro eyebrow="Legal" title="Política de privacidad" description="Información sobre los datos que compartes al consultar un proyecto." />
    <Container className="legal-copy">
      <p><strong>Borrador pendiente de completar antes del uso comercial.</strong> Falta confirmar la identidad del responsable, el plazo de conservación y las condiciones del servicio de correo.</p>
      <h2>Responsable y contacto</h2>
      <p>Nuvora es el nombre comercial del estudio. Nombre o razón social, NIF y domicilio del responsable: pendientes de confirmar. Contacto: <a href="mailto:nuvora.studio@outlook.com">nuvora.studio@outlook.com</a>. Consulta también el <Link href="/aviso-legal">Aviso legal</Link>.</p>
      <h2>Datos y finalidad</h2>
      <p>El formulario recoge nombre, email y descripción del proyecto. Puedes añadir empresa, presupuesto, plazo y configuración de una demo. Se utilizan para responder a tu consulta y valorar el proyecto; este formulario no solicita autorización para publicidad.</p>
      <h2>Cómo se prepara tu consulta</h2>
      <p>El formulario prepara un enlace de correo con los datos introducidos. No los envía a un servidor de Nuvora ni los guarda en una base de datos de la web. Necesitas enviar el mensaje desde tu aplicación de correo para que llegue al buzón del estudio.</p>
      <h2>Base del tratamiento</h2>
      <p>El formulario solicita tu consentimiento para responder a la consulta. Si solicitas una propuesta o contratación, podrán tratarse los datos necesarios para realizar las gestiones previas que pidas.</p>
      <h2>Conservación y proveedores</h2>
      <p>Plazo de conservación de las consultas y personas autorizadas a acceder al buzón: pendientes de confirmar. El correo de contacto utiliza Outlook; falta documentar las condiciones aplicables del proveedor, sus garantías y, en su caso, transferencias internacionales. También debe confirmarse el proveedor de alojamiento y el tratamiento de sus registros técnicos.</p>
      <h2>Tus derechos</h2>
      <p>Puedes solicitar acceso, rectificación, supresión, oposición, limitación y portabilidad cuando proceda, y retirar tu consentimiento, escribiendo al email de contacto. Retirarlo no afecta a la licitud del tratamiento anterior. Puedes presentar una reclamación ante la <a href="https://www.aepd.es">Agencia Española de Protección de Datos</a>.</p>
      <h2>Cookies</h2>
      <p>Consulta la información disponible en la <Link href="/cookies">página de Cookies</Link>.</p>
    </Container>
  </>;
}
