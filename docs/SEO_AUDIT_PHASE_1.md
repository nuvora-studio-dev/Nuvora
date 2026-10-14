# Nuvora — Auditoría SEO técnico, fase 1

Nota posterior: la preparación de commits y revisión remota pertenece a la [fase 1.2](SEO_INTEGRATION_PHASE_1_2.md). Las afirmaciones sobre ausencia de commits/publicación y pruebas no ejecutadas en este informe describen el cierre histórico de la fase 1; consultar el informe de integración para el estado actualizado.

Fecha: 14/10/2026. Dominio auditado: https://nuvora-studio.pages.dev.
Repositorio verificado en `origin`: `nuvora-studio-dev/Nuvora`.
Rama de trabajo: `seo/technical-foundation`. Base: `9a3ab88`, procedente de la rama activa `codex/nuvora-redesign-plan`.

**Estado: correcciones locales implementadas y verificadas; producción sigue pendiente de actualización autorizada.** No se ha realizado commit, push, PR, merge, despliegue ni cambio de variables remotas.

La base contiene tres commits anteriores respecto al `main` local (`493b33c`). Esos commits incluyen un rediseño previo a esta fase. Esta tarea conserva el diseño encontrado; integrar la rama completa con main incorporaría también esos cambios anteriores. No se ha actualizado ni verificado el estado remoto de main durante esta auditoría.

## 1. Alcance y método

Inventario del repositorio, configuración, workflow, contenido y rutas; revisión de la Metadata API y sus consumidores; build inicial sin cambios; inspección de los HTML exportados; pruebas de enlaces, imágenes, encabezados e indexación. Contraste HTTP directo con la web pública y muestra en Chromium mediante Python Playwright.

Se distingue el código de la rama de desarrollo del despliegue público: la web publicada conserva rutas inglesas y metadatos antiguos. Los resultados de pruebas locales no acreditan que las correcciones estén publicadas ni que Google las haya indexado.

No hubo acceso autenticado al panel de Cloudflare, a ejecuciones de GitHub Actions ni a Google Search Console. Sí hubo acceso HTTP y de navegador a producción. No se leyeron ni modificaron secretos.

## 2. Estado inicial y problemas confirmados

| Gravedad | Hallazgo y evidencia inicial | Archivo o superficie afectada | Resolución en esta fase |
| --- | --- | --- | --- |
| Crítica | El sitemap publicado devuelve 200 y contiene ocho URLs con `http://localhost:3000`, incluyendo `/services/`, `/about/` y `/contact/`. | Producción `/sitemap.xml`; `src/content/site.ts`, `src/app/sitemap.ts` | La rama ya tenía el dominio público por defecto y sitemap actualizado. Se centralizó su composición y se reforzó el rechazo de localhost en todo build de producción. El despliegue sigue pendiente. |
| Alta | Las fichas y demos publicadas tienen canonical localhost; OG publicado también apunta a localhost. La portada y las páginas inglesas publicadas no tienen canonical. | Producción; `src/app/layout.tsx`, páginas públicas y demos | Canonical y OG/Twitter completos por página, con origen público y basePath. No se ha corregido todavía el artefacto remoto. |
| Alta | `/servicios/`, `/proyectos/`, `/estudio/`, `/proceso/` y `/contacto/` devuelven 404 en producción. `/services/`, `/about/` y `/contact/` devuelven 200 e index/follow. | Diferencia entre despliegue y rutas del repositorio; `public/_redirects` | Las rutas españolas y los 301 ya existían en la rama. Se conservaron. Se necesita aprobar y verificar la publicación de esa base antes de tratar las rutas inglesas como migradas. |
| Alta | La protección anterior admitía localhost cuando `NEXT_PUBLIC_SITE_INDEXABLE=false`. Un build de producción de preview podía contener URLs locales. | `src/content/site.ts` | Producción requiere HTTPS y rechaza localhost, subdominios `.localhost`, loopback 127.*, IPv6 loopback y 0.0.0.0, incluso con noindex. |
| Alta, condicionada al hosting | El workflow local publica en GitHub Pages con `/Nuvora` pero usa por defecto el origen Cloudflare y permite indexación. Si se ejecuta, las canonicals señalan `pages.dev/Nuvora/`, que no representa el sitio Cloudflare en raíz. La existencia de un espejo GitHub activo no está comprobada. | `.github/workflows/deploy-pages.yml` | Sin cambios por la restricción de no modificar producción. Pendiente decidir si retirar el espejo o definir su política noindex y sus URLs antes de ejecutar ese workflow. |
| Media | Twitter hereda el título y descripción de portada en otras páginas. OG carece de URL; al reemplazar el objeto OG en detalles se pierden campos comunes y, en servicios, también la imagen. | `src/app/layout.tsx`, páginas estáticas y `[slug]` | Helper compartido `src/lib/metadata.ts` con todos los campos necesarios por página. |
| Media | Aviso legal, privacidad y cookies heredan la descripción comercial de portada. | `src/app/(site)/aviso-legal/page.tsx`, `privacidad/page.tsx`, `cookies/page.tsx` | Descripciones técnicas propias; se mantiene su exclusión del índice. Cookies pasa a noindex/nofollow explícito. |
| Media | `robots.txt` de preview bloquea todo: impide leer el noindex de HTML y rastrear recursos. | `src/app/robots.ts` | Allow `/` también en preview. El noindex sigue en HTML; sitemap vacío y sin anuncio de sitemap para preview. |
| Media | El HTML 404 inicial contiene dos directivas: noindex automático e index/follow heredado. El caso también se observa en producción. | `src/app/layout.tsx`; export `404.html`, `404/index.html`, `_not-found/index.html` | Se retira el opt-in de indexación del layout raíz; las páginas públicas lo declaran mediante el helper. Las tres salidas de error quedan noindex y sin canonical. |
| Media | En Windows, Next 16.3.8 escribe payloads de prefetch en carpetas `__next.*`, pero el navegador solicita archivos con puntos. Chromium reproduce 404 de RSC al cargar páginas del estudio. | Exportador de Next; `package.json`, nuevo `scripts/normalize-static-export.mjs` | El build copia 26 payloads a los nombres solicitados. Conserva originales y bytes. Chromium vuelve a probar las páginas sin errores. En exports planos el paso no copia nada. |
| Baja, oportunidad | No había JSON-LD de identidad del estudio o del sitio. Esto no impide indexar. | `src/app/(site)/page.tsx` | Un único bloque con Organization y WebSite en portada. Sin dirección, coordenadas, reseñas, calificaciones, clientes ni perfiles sociales inventados. |

### Configuración y aspectos sin defecto confirmado

- **Stack y renderizado:** Next.js 16.3.8, React 19.3.0, TypeScript, pnpm 11.19.0 y CSS existente. App Router con `output: "export"`, `trailingSlash: true`, páginas prerenderizadas y slugs resueltos mediante `generateStaticParams`. No necesita servidor Next en producción. `robots` y `sitemap` son `force-static`.
- **Cloudflare:** no hay configuración Wrangler ni workflow de Cloudflare en el repositorio. El build `pnpm build` produce `out`; no se confirma que el panel remoto tenga esos mismos valores ni qué SHA/rama está desplegando.
- **GitHub Actions:** único workflow `.github/workflows/deploy-pages.yml`, disparado por main o manualmente, Node 22, pnpm fijado, instalación frozen-lockfile y publicación de `out` en GitHub Pages. No ejecuta los tests SEO; no se ha cambiado ni ejecutado. La validación de esta fase usa Windows y Node 24.18.0, no el runner Node 22/Linux.
- **Titles y descriptions:** las páginas comerciales actuales ya tienen títulos y descripciones diferenciados; se conservaron, sin introducir Valencia como supuesta sede ni repetir palabras clave. El título de portada conserva su forma absoluta, sin duplicar la marca. Los casos se identifican como conceptos.
- **Semántica y lang:** los 28 HTML iniciales contienen un H1 y `lang="es"`; los niveles H1–H6 no presentan saltos descendentes de más de un nivel. Esto comprueba estructura, no sustituye una revisión editorial de cada encabezado. No existen versiones idiomáticas independientes que justifiquen hreflang.
- **Enlaces:** las 625 referencias locales a enlaces/anclas del export tienen destino; la navegación incluye servicios, proyectos, estudio, proceso, contacto y plantillas. No hay necesidad de añadir páginas o cambiar arquitectura de información en esta fase.
- **Imágenes:** todos los `img` del HTML tienen atributo alt; los conceptos usan descripciones ilustrativas. WebP 700/1400px, `picture`, dimensiones o contenedores reservados, lazy loading y prioridad en imágenes principales ya existen. Se preservan. La imagen social PNG pesa 1.931.421 bytes: oportunidad de compresión futura para compartir, no un recurso que por sí mismo determine el LCP de la página.
- **404 y slash:** hay `404.html` de nivel superior, además de las variantes generadas por Next. En producción una URL inexistente devuelve 404/noindex; `/index.html` devuelve 308 a `/`. `/services?servicio=rediseno-web` devuelve 308 a `/services/?servicio=rediseno-web`. Esto confirma conservación del query en ese redirect de slash, no en los 301 españoles pendientes.
- **Duplicados:** las tres rutas inglesas de compatibilidad ya son noindex y apuntan a sus equivalentes españoles en la rama. Las demos son noindex y canonical a su ficha, manteniendo la política existente. Casos `/proyectos/[slug]` y fichas `/plantillas/[slug]` tienen propósitos y contenido distintos; no se confirma duplicación que justifique consolidarlos. Los parámetros de contacto no crean canonicals nuevas.
- **Entornos:** `.env.example` usa el dominio público y noindex para previews. El gate existente considera producción Cloudflare únicamente `CF_PAGES_BRANCH=main`; otras ramas son noindex. Se conserva y se prueba, pero hay que confirmar la rama real en Cloudflare. BasePath sigue definido por `NEXT_PUBLIC_BASE_PATH`.

## 3. Cambios aplicados

1. `src/content/site.ts`: único origen y función `absoluteUrl`; validación de HTTPS público en producción y rechazo de credenciales, pathname, query o fragmento. Estos últimos valores antes se descartaban silenciosamente al usar `.origin`.
2. `src/lib/metadata.ts`: composición reutilizable de title, description, canonical, robots, OG y Twitter; imagen social y alt explícitos. Respeta basePath y slash de cada ruta.
3. Todas las páginas originales públicas, fichas, casos, servicios y demos consumen esa composición. Las rutas de compatibilidad reutilizan los metadatos españoles existentes. Se conservan títulos/descripciones comerciales y se añaden descripciones propias únicamente a páginas legales.
4. `src/app/layout.tsx`: evita heredar index/follow en 404. `robots.ts` y `sitemap.ts` comparten URLs absolutas; previews siguen sin entradas indexables y permiten leer noindex.
5. Portada: un solo JSON-LD, con nombre Nuvora, URL, email del proyecto y logo oficial; WebSite en español enlaza al Organization mediante `@id`. Se escapa `<` al serializar. No se duplica en layout, fichas ni demos.
6. `scripts/normalize-static-export.mjs` y comando build: compatibilidad con los nombres de prefetch esperados por el navegador en Windows. Sin tocar dependencias ni el contenido de payloads.
7. `scripts/check-site.mjs`: cobertura de las 16 URLs indexables, igualdad exacta con sitemap, robots, idioma, encabezados, alt, metadatos sociales, 404 y JSON-LD; 12 orígenes inválidos rechazados por la configuración de producción y tres escenarios de rama/indexación/basePath. Regresión del payload de prefetch de portada.
8. README: documentación del contrato de URL, noindex, rastreo y compatibilidad del export. Este informe recoge resultados y límites.

El sitemap normal contiene exactamente 16 URLs: portada; servicios y tres detalles; proyectos y tres casos; estudio; proceso; contacto; catálogo y tres fichas. No incluye demos, aliases ingleses, errores ni páginas legales noindex. Todas sus URLs y canonicals usan HTTPS, el origen configurado y slash final.

Robots del artefacto final:

```text
User-Agent: *
Allow: /

Sitemap: https://nuvora-studio.pages.dev/sitemap.xml
```

## 4. Validación ejecutada

| Comprobación | Resultado real |
| --- | --- |
| Build inicial y tests iniciales de sitio/plantillas | PASS antes de las modificaciones. Permitió distinguir problemas ya corregidos en desarrollo de los todavía desplegados. |
| `pnpm typecheck` final | PASS. |
| `pnpm lint` final | PASS, cero errores y cero warnings. Se corrigió un import sin uso detectado en un pase intermedio. |
| `pnpm build` final | PASS: Next informa 31 páginas estáticas; el normalizador copia 26 payloads anidados en Windows. |
| `pnpm test:site` final | PASS: 16 rutas indexables, 625 referencias locales/anclas, 58 referencias WebP; verificaciones ampliadas de los 28 HTML. |
| `pnpm test:templates` | PASS: tres fichas, demos, parser, metadata y assets. |
| `pnpm test:contact` | PASS: validación existente de datos, límites, URL opcional y selección segura. Formulario sin cambios. |
| Build `NEXT_PUBLIC_SITE_INDEXABLE=false`, tests de sitio y plantillas `--preview` | PASS: páginas corporativas noindex/nofollow y sitemap vacío. Tras añadir el normalizador también se ejecutó el test SEO sobre el export preview normalizado. |
| Build `NEXT_PUBLIC_BASE_PATH=/Nuvora`, tests de sitio y plantillas | PASS: canonicals, sitemap, imágenes sociales y referencias locales con prefijo. No acredita que exista hosting en ese subdirectorio. |
| Gate Cloudflare | PASS en pruebas de configuración: main/true indexable, rama preview/true noindex, main/false noindex; no es una ejecución de Cloudflare. |
| Orígenes inválidos | PASS: 12 importaciones de configuración bajo NODE_ENV=production y noindex fallan con el error esperado; incluye variantes localhost, loopback, HTTP y URL con partes no admitidas. |
| Preservación del contenido renderizado | PASS: hashes SHA-256 de los cuerpos de los 28 HTML coinciden con el build inicial al excluir scripts, incluyendo el nuevo JSON-LD y los scripts de hidratación. |
| Chromium local, 390 y 1440px | PASS en portada, detalle de diseño/desarrollo, contacto con servicio preseleccionado, ficha Atria y demo Atria: diez visitas, HTTP 200, un H1, sin overflow ni imágenes rotas ni errores de consola/runtime después de normalizar. |
| Funciones en navegador | PASS: servicio `rediseno-web` preseleccionado en contacto y cambio del nombre de empresa propagado al iframe de Atria en ambos anchos. No se envió ninguna consulta. |
| Chromium producción | Ejecutado: portada, services y ficha Atria en ambos anchos; seis visitas 200, sin errores registrados, sin imágenes rotas ni overflow. Sirven la versión antigua. |
| HTTP producción | Ejecutado: sitemap, robots, rutas españolas/inglesas, fichas, demo Atria, legales, inexistente y redirects de slash/index.html. Fallos SEO publicados confirmados en la sección 2. |
| `git diff --check` | PASS. Advertencias de conversión LF/CRLF de Git no son fallos SEO. |
| Lighthouse, PSI/CrUX, INP real, validadores externos de schema, Search Console | NOT RUN. No se presentan como aprobados. |
| Build/test Linux y Node 22, Actions y panel Cloudflare | NOT RUN. Requieren validación del entorno de entrega antes de publicación. |

Los tests de TypeScript nativo existentes emiten `MODULE_TYPELESS_PACKAGE_JSON`, también presente en el pase inicial. No se convirtió todo el paquete a ESM para eliminarlo.

Los 404 de prefetch encontrados durante la prueba inicial de navegador fueron un fallo real del export en Windows, no una prueba aprobada. Se investigó el exportador: construye nombres a partir de rutas Windows y sustituye únicamente `/`, manteniendo backslashes como carpetas. La corrección copia esos archivos a nombres planos; una segunda ejecución es idempotente respecto a contenido y destinos. Se repitieron las visitas de navegador y el fallo desapareció.

## 5. Rendimiento y Core Web Vitals

Muestra de laboratorio con Chromium headless, viewports de 390×900 y 1440×900, sin limitación de CPU/red y con caché reutilizada entre páginas de cada contexto. Observadores de LCP y CLS instalados antes de navegar; lectura después de networkidle. No representa un dispositivo móvil real ni el percentil 75 de usuarios. Los bytes de transferencia de recursos cross-origin o cacheados tampoco son un presupuesto completo de la página.

| Página | LCP local final, 390 / 1440px | LCP publicado, último pase, 390 / 1440px | CLS observado, último pase |
| --- | --- | --- | --- |
| Portada | 92 / 96 ms | 308 / 260 ms | 0 |
| Detalle diseño/desarrollo local; services publicado | 32 / 36 ms | 92 / 184 ms | 0 |
| Ficha Atria | 68 / 56 ms | 136 / 228 ms | 0 |

En el primer pase publicado, la portada a 390px registró LCP 3.132 ms y TTFB 2.852 ms; en el segundo, 308 ms y 112 ms. La variabilidad exige pruebas controladas y datos de campo: no se declara CWV aprobado ni una mejora porcentual frente a producción. Las páginas comparadas tampoco son idénticas entre la rama y el despliegue.

Se conservaron las optimizaciones existentes de export estático, fuentes locales mediante next/font, WebP responsive, prioridades y carga diferida. La mejora confirmada de esta fase elimina solicitudes de prefetch fallidas, sin atribuirle un ahorro de bytes o un aumento de posición. No se añadieron analítica, servicios de pago ni librerías de medición al sitio.

## 6. Pendientes en Cloudflare

- Confirmar proyecto conectado a `nuvora-studio-dev/Nuvora`, rama de producción, SHA desplegado, comando `pnpm build`, directorio `out` y versión Node/pnpm. La rama SEO deriva de una base de rediseño aún distinta de main; aprobar esa base o acordar una integración selectiva antes de publicar.
- Verificar que `NEXT_PUBLIC_SITE_URL` usa `https://nuvora-studio.pages.dev`, `NEXT_PUBLIC_BASE_PATH` está vacío para ese sitio y no existe un override falso de `NEXT_PUBLIC_SITE_INDEXABLE` en producción. Revisar previews por separado, sin exponer secretos.
- Antes de lanzar el workflow GitHub Pages, decidir la función del espejo y su política de canonical/indexación; comprobar si sigue activo. No publicar accidentalmente otro sitio indexable con URLs incompatibles.
- Tras una publicación autorizada, comprobar las 16 URLs del sitemap con 200, canonical autorreferente e index/follow; comprobar demos, aliases y legales noindex, y revisar si hay X-Robots-Tag añadido por el hosting.
- Comprobar `/services`→`/servicios/`, `/about`→`/estudio/` y `/contact`→`/contacto/` con 301 real, ausencia de cadenas/bucles y conservación de parámetros. La salida local de `_redirects` no demuestra su aplicación remota.
- Verificar redirects de slash, `.html`, HTTP→HTTPS y 404 real para rutas y slugs inexistentes. Evitar fallback SPA que convierta errores en 200.
- Revisar robots, sitemap y recursos RSC/JS/CSS/fuentes/imágenes bajo las reglas reales de caché, seguridad y bots. Confirmar que el build Linux no necesita copias del normalizador y que la navegación cliente no hace 404 de prefetch.
- Repetir laboratorio con condiciones móviles controladas en las páginas nuevas; revisar TTFB, LCP, CLS e interacciones. No extrapolar la muestra de esta fase a tráfico real.

## 7. Pendientes en Google Search Console

- Verificar la propiedad del prefijo `https://nuvora-studio.pages.dev/` con un método autorizado; no se añadió un token de verificación ficticio.
- Enviar `/sitemap.xml` corregido después de desplegar, sustituir el sitemap antiguo y revisar si Google lo procesa sin URLs localhost o errores de descarga.
- Inspeccionar portada, servicios, detalles y una ficha: acceso de Googlebot, HTML renderizado, canonical declarada/elegida e indexación. Solicitar indexación cuando estén publicados los HTML correctos.
- Revisar exclusiones deliberadas de demos, legales y aliases; monitorizar redirects y 404 después de la migración de rutas inglesas.
- Validar JSON-LD con Schema Markup Validator y la herramienta de resultados enriquecidos; Organization/WebSite no implica elegibilidad para reseñas ni garantiza un resultado enriquecido.
- Consultar informes CWV y CrUX cuando exista volumen suficiente. INP no se deduce de una carga de página sin una muestra representativa de interacciones.
- Monitorizar consultas de marca, servicios y ámbito Valencia/España como objetivo futuro, sin prometer posiciones ni inventar una sede física. Estrategia editorial/local y nuevas páginas quedan fuera de esta fase.

## 8. Riesgos, aprobación y preservación

**Requieren aprobación posterior:** integración de los tres commits previos de rediseño, commit/push/PR/merge, publicación, modificaciones del workflow/espejo y variables remotas, propiedad Search Console y eventual cambio a un dominio definitivo. Nada de ello se ha realizado.

**Riesgos técnicos:** una configuración remota con HTTP, localhost, pathname/query/fragmento fallará ahora deliberadamente en build; corregir el valor antes de desplegar. Noindex es una directiva de búsqueda, no protección de acceso: las previews siguen públicamente rastreables. El normalizador conserva copias de payloads hasta que se corrija el exportador upstream; revisar su retirada al actualizar Next. La imagen social general continúa siendo grande y su apariencia en cada plataforma no se ha validado con sus depuradores sociales.

**Diseño y funcionalidades:** CSS, componentes visuales, navegación, textos comerciales, imágenes, formularios y motor de demos no se modifican en esta fase. Los 28 cuerpos renderizados coinciden con la base excluyendo scripts; contacto y personalizador se comprueban en navegador. La única incorporación al cuerpo es JSON-LD no visual. La normalización del export corrige la carga de prefetch. No se afirma QA completo de todos los dispositivos ni entrega real de emails.

## Referencias técnicas consultadas

- [Next.js Metadata API: composición y herencia de objetos](https://nextjs.org/docs/app/api-reference/functions/generate-metadata).
- [Next.js: JSON-LD y serialización segura](https://nextjs.org/docs/app/guides/json-ld).
- [Google: noindex requiere que la URL pueda rastrearse](https://developers.google.com/search/docs/crawling-indexing/block-indexing).
- [Google: nombre del sitio y WebSite en portada](https://developers.google.com/search/docs/appearance/site-names).
- [Cloudflare Pages: serving pages y comportamiento de rutas](https://developers.cloudflare.com/pages/configuration/serving-pages/).
- [Next.js #92339: payloads de export estático anidados en Windows](https://github.com/vercel/next.js/issues/92339). El fallo de esta fase también se confirma leyendo el exportador instalado y en navegador, no solo por el issue.
