import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

import "@/styles/templates.css";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <div className="site-shell"><Header /><main id="contenido">{children}</main><Footer /></div>;
}
