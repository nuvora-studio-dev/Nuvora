import Link from "next/link";
import { BrandMark } from "@/components/ui/brand-mark";
import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <BrandMark />
          <p className="footer-statement">Diseño con intención. Desarrollo con criterio. Atención a cada detalle.</p>
        </div>
        <nav aria-label="Navegación del pie">
          <strong>Explora Nuvora</strong>
          {siteConfig.nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          <Link href="/plantillas">Demos interactivas</Link>
        </nav>
        <nav aria-label="Contacto">
          <strong>Contacto</strong>
          <Link href="/contacto">Cuéntanos tu proyecto</Link>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </nav>
        <div className="footer-bottom"><p className="footer-meta">© {new Date().getFullYear()} Nuvora</p><nav className="footer-legal" aria-label="Información legal">
          <Link href="/privacidad">Política de privacidad</Link>
          <Link href="/aviso-legal">Aviso legal</Link>
          <Link href="/cookies">Cookies</Link>
        </nav></div>
      </div>
    </footer>
  );
}
