const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nuvora-studio.pages.dev",
);
const indexable =
  process.env.NODE_ENV !== "development" &&
  process.env.NEXT_PUBLIC_SITE_INDEXABLE !== "false" &&
  (!process.env.CF_PAGES_BRANCH || process.env.CF_PAGES_BRANCH === "main");
if (
  !["https:", "http:"].includes(siteUrl.protocol) ||
  siteUrl.username ||
  siteUrl.password
)
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must be an http(s) URL without credentials.",
  );
if (indexable && ["localhost", "127.0.0.1", "[::1]"].includes(siteUrl.hostname))
  throw new Error("An indexable build requires a public NEXT_PUBLIC_SITE_URL.");

export const siteConfig = {
  name: "Nuvora",
  url: siteUrl.origin,
  indexable,
  email: "nuvora.studio@outlook.com",
  description:
    "Diseño, rediseño y mantenimiento web para empresas y profesionales. Diseño con intención, desarrollo con criterio y atención a cada detalle.",
  nav: [
    { href: "/servicios", label: "Servicios" },
    { href: "/proyectos", label: "Proyectos" },
    { href: "/estudio", label: "Estudio" },
    { href: "/proceso", label: "Proceso" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
