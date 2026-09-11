# Nuvora web

Web institucional de Nuvora construida con Next.js, React, TypeScript estricto y CSS nativo. La dirección visual usa Geist con licencia SIL Open Font License mientras Söhne no esté disponible con licencia web.

## Desarrollo

```bash
pnpm install
pnpm dev
```

Copia `.env.example` a `.env.local` y sustituye `NEXT_PUBLIC_SITE_URL` por el dominio canónico antes de publicar.

## Comprobaciones

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Contenido pendiente

La propuesta de valor definitiva, proyectos, datos de contacto, dominio y textos legales deben confirmarse antes de publicar. El contenido provisional se centraliza en `src/content/site.ts`.

Söhne no está incorporada: los archivos facilitados indican una licencia limitada a uso personal. Geist se carga de forma local y actúa como sustituta temporal hasta disponer de archivos web con licencia adecuada.

Los assets `nuvora-hero-art.png` y `nuvora-detail-art.png` se generaron específicamente para esta web a partir del gesto y la paleta de marca. No representan productos ni proyectos reales.
