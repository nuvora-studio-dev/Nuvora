export const siteConfig = {
  name: "Nuvora",
  description:
    "Estudio digital que combina desarrollo, diseño y tecnología para crear experiencias y productos digitales.",
  nav: [
    { href: "/work", label: "Trabajo" },
    { href: "/services", label: "Servicios" },
    { href: "/about", label: "Nuvora" },
  ],
  services: [
    {
      title: "Dirección digital",
      body: "Estrategia, arquitectura y decisiones de producto para construir con intención.",
      status: "Ámbito por confirmar",
    },
    {
      title: "Diseño de producto",
      body: "Sistemas visuales e interfaces claras, coherentes y preparadas para evolucionar.",
      status: "Ámbito por confirmar",
    },
    {
      title: "Desarrollo web",
      body: "Implementaciones rápidas, accesibles y mantenibles con una base técnica sólida.",
      status: "Ámbito por confirmar",
    },
  ],
  principles: [
    "Claridad antes que decoración",
    "Espacio como material",
    "Tecnología sutil",
    "Consistencia estricta",
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
