# Nuvora

Web de estudio en español: diseño, rediseño y mantenimiento web. Next.js App Router, React, TypeScript estricto y CSS nativo, con exportación estática para Cloudflare Pages. No requiere un servidor Next en producción.

## Desarrollo y comprobaciones

Usa pnpm 11.19.0 y una versión de Node compatible con TypeScript nativo en los scripts de prueba (validado con Node 24.18.0).

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm lint
pnpm test:contact
pnpm build
pnpm test:templates
pnpm test:site
```

Las pruebas de sitio y demos leen `out`: ejecutar después del build. No utilizar `next start` para este export estático.

Para revisar el artefacto local con Python 3 disponible:

```sh
python -m http.server 3101 --bind 127.0.0.1 --directory out
```

Abrir `http://localhost:3101`. Este servidor no reproduce redirects ni headers de Cloudflare y usa su propia respuesta para rutas inexistentes; el diseño exportado de error puede inspeccionarse en `/404.html`.

## Entornos e indexación

El origen público por defecto es `https://nuvora-studio.pages.dev`; `NEXT_PUBLIC_SITE_URL` permite establecer el origen canónico. Debe ser http(s), sin credenciales. Un build indexable rechaza localhost. El subdirectorio lo define `NEXT_PUBLIC_BASE_PATH`, no el pathname de la URL de origen.

`.env.example` configura una preview no indexable. Copiarlo a `.env.local` solo si necesitas esos valores; antes de una publicación autorizada establecer `NEXT_PUBLIC_SITE_INDEXABLE=true` o retirar el override falso. En desarrollo, y en ramas Cloudflare distintas de `main`, las páginas corporativas son noindex. Confirmar la rama de producción real antes de publicar; no se han modificado las variables remotas.

Preview de producción local, en PowerShell:

```powershell
$env:NEXT_PUBLIC_SITE_INDEXABLE = 'false'
pnpm build
pnpm test:site --preview
pnpm test:templates --preview
Remove-Item Env:NEXT_PUBLIC_SITE_INDEXABLE
```

El build de preview omite entradas del sitemap. Las demos son siempre noindex. Las rutas antiguas `/services`, `/about` y `/contact` conservan una página estática de compatibilidad, con canonical español y noindex. `public/_redirects` prepara sus 301 para Cloudflare; comprobar allí la conservación de parámetros antes de publicar.

## Contenido, marca y contacto

- Navegación, origen y email: `src/content/site.ts`. Servicios, proceso y casos en sus archivos de `src/content`.
- Atria, Pulse y Aura son conceptos propios, no clientes ni resultados comerciales. Casos: `/proyectos/[slug]`; demos/personalizador: `/plantillas/[slug]`.
- Los nombres Gabi y Alex y el rol de desarrollador proceden del contenido preexistente. No se han añadido biografías, fotos ni credenciales.
- Inter es el fallback oficial mientras falta Söhne con licencia web. IBM Plex Mono acompaña etiquetas; las fuentes se sirven desde el propio build. Los logos PNG oficiales se conservan. No se utiliza la OTF de prueba ni se reconstruye el wordmark.
- Las variantes WebP de 700 y 1400px se sirven con `picture` porque el export no tiene optimizador dinámico. Los JPEG originales se conservan; procedencia en `docs/PLANTILLAS.md`.
- El formulario valida y prepara un email. No tiene backend ni confirma recepción. La alternativa directa funciona también sin JavaScript. No se guardan consultas en un servidor ni en almacenamiento del navegador.

## Entrega y pendientes

[Plan](docs/plans/2026-10-14-nuvora-redesign.md), [auditoría inicial](docs/audits/2026-10-14/AUDITORIA.md) y [validación del rediseño](docs/audits/2026-10-14-redesign/VALIDACION.md).

Para recepción web: elegir proveedor y condiciones de tratamiento, configurar secretos solo en un entorno autorizado y implementar la integración descrita en la validación. Aviso legal y privacidad siguen siendo borradores: necesitan datos del titular y revisión. No se añaden analítica, cookies comerciales, servicios de pago ni credenciales ficticias.

El workflow GitHub Pages sigue intacto. La entrega se revisa en la rama `codex/nuvora-redesign-plan`, que se sube a GitHub a petición del usuario. No fusionar en `main` o desplegar sin revisar qué automatismos activará y obtener autorización de publicación.
