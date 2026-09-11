import Link from "next/link";
import { BrandMark } from "@/components/ui/brand-mark";
import { DesktopNav } from "./desktop-nav";
import { MobileMenu } from "./mobile-menu";

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
    </header>
  );
}
