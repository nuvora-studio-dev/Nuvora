import Link from "next/link";
import { BrandMark } from "@/components/ui/brand-mark";
import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <BrandMark />
          <p className="footer-statement">Diseño y tecnología con criterio.</p>
        </div>
        <nav aria-label="Navegación del pie">
          {siteConfig.nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          <Link href="/contact">Contacto</Link>
        </nav>
        <nav aria-label="Información legal">
          <Link href="/legal">Aviso legal</Link>
          <Link href="/privacy">Privacidad</Link>
        </nav>
        <p className="footer-meta">© {new Date().getFullYear()} Nuvora</p>
      </div>
    </footer>
  );
}
