import Link from "next/link";
import { BrandMark } from "@/components/ui/brand-mark";
import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <BrandMark />
          <p className="footer-statement">Diseño y desarrollo web para negocios y marcas que quieren hacer las cosas bien.</p>
        </div>
        <nav aria-label="Navegación del pie">
          <strong>Navegación</strong>
          {siteConfig.nav.map((item) => <Link key={item.href} href={item.href}>{item.href === "/about" ? "Nuvora" : item.label}</Link>)}
        </nav>
        <nav aria-label="Contacto">
          <strong>Contacto</strong>
          <a href="mailto:nuvora.studio@outlook.com">nuvora.studio@outlook.com</a>
        </nav>
        <p className="footer-meta">© {new Date().getFullYear()} Nuvora. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
