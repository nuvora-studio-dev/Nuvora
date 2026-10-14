import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { siteConfig } from "@/content/site";
import "@/styles/tokens.css";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-plex-mono", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Nuvora — Diseño y desarrollo web", template: "%s | Nuvora" },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Nuvora",
    title: "Nuvora — Diseño y desarrollo web",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuvora — Diseño y desarrollo web",
    description: siteConfig.description,
  },
  robots: { index: siteConfig.indexable, follow: siteConfig.indexable },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0B0D10",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        {children}
      </body>
    </html>
  );
}
