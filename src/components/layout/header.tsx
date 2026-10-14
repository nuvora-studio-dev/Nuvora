import Link from "next/link";
import { BrandMark } from "@/components/ui/brand-mark";
import { DesktopNav } from "./desktop-nav";
import { MobileMenu } from "./mobile-menu";
import { siteConfig } from "@/content/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" aria-label="Nuvora, inicio" className="brand-link">
          <BrandMark priority />
        </Link>
        <DesktopNav />
        <MobileMenu />
      </div>
      <noscript><nav className="no-js-navigation" aria-label="Navegación sin JavaScript">{siteConfig.nav.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}<Link href="/contacto">Contacto</Link></nav></noscript>
    </header>
  );
}
