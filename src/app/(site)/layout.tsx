import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <div className={`${inter.variable} site-shell`}><Header /><main id="contenido">{children}</main><Footer /></div>;
}
