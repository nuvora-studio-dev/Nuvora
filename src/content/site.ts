export const siteConfig = {
  name: "Nuvora",
  description: "Diseñamos y desarrollamos páginas web rápidas, modernas y a medida para negocios, profesionales y marcas.",
  nav: [
    { href: "/plantillas", label: "Plantillas" },
    { href: "/services", label: "Servicios" },
    { href: "/about", label: "Nosotros" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
