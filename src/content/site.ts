export const siteConfig = {
  name: "Nuvora",
  description: "Diseñamos y desarrollamos páginas web rápidas, modernas y a medida para negocios, profesionales y marcas.",
  nav: [
    { href: "/work", label: "Proyectos" },
    { href: "/services", label: "Servicios" },
    { href: "/about", label: "Nosotros" },
    { href: "/contact", label: "Contacto" },
  ],
  principles: [
    "Claridad antes que decoración",
    "Espacio como material",
    "Tecnología sutil",
    "Consistencia estricta",
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
