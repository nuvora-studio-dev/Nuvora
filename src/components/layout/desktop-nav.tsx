"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="desktop-nav" aria-label="Navegación principal">
      {siteConfig.nav.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}>
            {item.label}
          </Link>
        );
      })}
      <Link className="button button-small" href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}>Cuéntanos tu proyecto</Link>
    </nav>
  );
}
