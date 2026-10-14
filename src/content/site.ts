const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nuvora-studio.pages.dev",
);
const hostname = siteUrl.hostname.replace(/\.$/, "");
const indexable =
  process.env.NODE_ENV !== "development" &&
  process.env.NEXT_PUBLIC_SITE_INDEXABLE !== "false" &&
  (!process.env.CF_PAGES_BRANCH || process.env.CF_PAGES_BRANCH === "main");
if (
  !["https:", "http:"].includes(siteUrl.protocol) ||
  siteUrl.username ||
  siteUrl.password ||
  siteUrl.pathname !== "/" || siteUrl.search || siteUrl.hash
)
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must be an http(s) origin without credentials, path, query or fragment.",
  );
if (process.env.NODE_ENV === "production" && (
  siteUrl.protocol !== "https:" ||
  ["localhost", "[::1]", "0.0.0.0"].includes(hostname) ||
  hostname.endsWith(".localhost") || hostname.startsWith("127.")
))
  throw new Error("A production build requires a public HTTPS NEXT_PUBLIC_SITE_URL, including previews.");

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

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
