# Nuvora — Preparación de integración SEO, fase 1.2

Fecha: 14/10/2026. Repositorio: `nuvora-studio-dev/Nuvora`.
Propuesta de revisión: `seo/technical-foundation` → `main`, mediante PR en borrador. No autoriza merge, despliegue ni siguiente fase.

## 1. Referencias actualizadas

`git fetch origin` completado antes de analizar y publicar. Las referencias coinciden con la situación proporcionada por el usuario:

| Referencia | SHA verificado |
| --- | --- |
| origin/main | `493b33c2b78542605ad2fd2a281ea24ff1108e11` |
| origin/codex/nuvora-redesign-plan | `9a3ab88e58ec554c86239d3eab5e0dec4eadcf4a` |
| codex/nuvora-redesign-plan local | `9a3ab88e58ec554c86239d3eab5e0dec4eadcf4a` |
| SEO al inicio | `9a3ab88`, con correcciones SEO todavía sin commit |

GitHub identifica el repositorio como PUBLIC y su rama por defecto como main. No se modificó su visibilidad. Antes de esta tarea no había una PR abierta en el repositorio.

Main es antecesor del rediseño: `git rev-list --left-right --count origin/main...codex/nuvora-redesign-plan` devuelve `0 3`; merge-base coincide con main. La simulación `git merge-tree --write-tree` termina sin conflictos y sin cambiar referencias. Las modificaciones SEO se aplican sobre ese mismo rediseño. No se ha efectuado ningún merge real.

## 2. Commits de la propuesta, por orden

| Grupo | Commit | Contenido |
| --- | --- | --- |
| Rediseño previo | `a53f002` — docs(redesign): add Nuvora audit and implementation plan | Auditoría inicial, capturas y plan. |
| Rediseño previo | `ebf2e22` — feat(site): redesign Nuvora and add Spanish service pages | Nueva presentación visual, navegación y páginas españolas; casos y proceso; formulario y mejoras de demos; WebP; redirects y primeras correcciones SEO. |
| Rediseño previo | `9a3ab88` — fix(deps): patch Next.js and document redesign validation | Next y eslint-config-next 16.3.8, retirada de Geist, resolución de dependencias y evidencias de validación. |
| SEO fase 1 | `95e09f7` — fix(seo): align canonical URLs and page metadata | URL centralizada, validación de origen, metadatos completos, indexación, sitemap/robots y JSON-LD. |
| Export estático | `d4ebac1` — fix(build): normalize static export prefetch payloads | Copias de payloads anidados a las URLs planas que solicita el navegador en Windows. No altera bytes ni elimina originales. |
| Pruebas/documentación | test(seo): verify metadata and document integration review | Script SEO ampliado, README, auditoría fase 1 e informe fase 1.2. Su SHA se identifica en el historial de la PR. |

La PR propuesta incorpora **los tres commits anteriores de rediseño y los tres nuevos de SEO/build/pruebas**. No es una PR exclusivamente SEO respecto a main. Se requiere aprobación explícita para incorporar `a53f002`, `ebf2e22` y `9a3ab88`, incluido su alcance visual, funcional y comercial.

## 3. Cambios que se incorporarían respecto a main

### Rediseño previo: requiere aprobación de integración

- Home editorial, retícula, tipografía Inter/IBM Plex Mono, tokens, estilos, navegación, footer, CTAs, estados de error y carga; identidad y logos oficiales conservados.
- Páginas españolas de servicios y tres detalles; proyectos y tres casos conceptuales; estudio, proceso y contacto. Rutas inglesas conservadas como aliases estáticos noindex y canonical español, con seis reglas 301 en `public/_redirects`.
- Contenido comercial distinto al main actual: presentación de servicios, proceso, estudio y casos. Atria, Pulse y Aura se declaran conceptos, no clientes reales.
- Formulario distinto al main actual: servicio y web actual opcional, límites, validación reutilizable, errores accesibles, preselección por query y actualización del contexto. Se retiran los campos anteriores de presupuesto y plazo. Sigue preparando un mailto, sin backend ni confirmación de entrega.
- Demos Atria/Pulse/Aura y personalizador conservados; mejoras de presentación, imágenes y contraste existentes en el rediseño. Derivados responsive WebP y fuentes servidas por el build.
- Next 16.3.4 → 16.3.8 y dependencias asociadas; retirada de `next start`, incompatible con export estático; nuevos tests de sitio/contacto y evidencias previas.

Estos cambios ya existían en desarrollo. Esta fase no los elimina ni modifica, pero comparados con main son cambios reales que necesitan aprobación de integración, especialmente el formulario y contenido comercial.

### SEO: preserva la base aprobada en desarrollo

- No cambia CSS, componentes visuales, contenido comercial, formulario, validación de contacto, redirects, Next config ni motor de demos respecto a `9a3ab88`.
- Composición de canonical, OG y Twitter mediante `src/lib/metadata.ts`, URLs absolutas centralizadas y bloqueo de orígenes locales en builds de producción. Las páginas legales obtienen descripciones propias.
- Mantiene exactamente 16 URLs indexables, slash final y soporte de basePath; sitemap excluye aliases, demos, legales noindex y errores. Robots permite leer noindex; preview conserva sitemap vacío.
- Añade un único JSON-LD Organization/WebSite en portada, sin datos comerciales inventados ni ubicación física.
- Normaliza payloads Windows después del build; en Linux no copia archivos. Sin nuevas dependencias.

## 4. Archivos, dependencias y conflictos

| Comparación | Nuevos | Modificados | Eliminados |
| --- | --- | --- | --- |
| origin/main → rediseño | 51 | 40 | 0 |
| rediseño → entrega SEO con este informe | 4 | 21 | 0 |

Los cuatro archivos nuevos SEO son `src/lib/metadata.ts`, `scripts/normalize-static-export.mjs`, `docs/SEO_AUDIT_PHASE_1.md` y este informe. El resto se detalla en el inventario al final.

**Dependencia de orden:** servicios/proyectos/proceso, sus registros y los tests de contacto/sitio proceden del rediseño. El SEO importa esas rutas y actualiza ese script de pruebas. Aplicar sus commits directamente al main antiguo no equivale a la entrega validada y puede causar conflictos o imports ausentes. Integrar primero el rediseño y después el SEO es coherente con el historial y no requiere resolver conflictos con las referencias actuales.

**Decisión:** propuesta técnicamente validada para revisión, pendiente de aprobación de los cambios de rediseño y de los requisitos de publicación. No se considera autorización de release. Un cambio futuro de main exige fetch, nueva comparación y validación.

## 5. Validación nueva de esta fase

| Comprobación | Windows, Node 24.18.0 | Ubuntu/WSL Linux, Node 22.23.3 |
| --- | --- | --- |
| Instalación frozen-lockfile | Dependencias existentes; no reinstalación | PASS, pnpm 11.19.0 |
| Typecheck | PASS | PASS |
| ESLint | PASS, sin errores/warnings | PASS, sin errores/warnings |
| Build de producción | PASS, 31 páginas; 26 copias de payloads | PASS, 31 páginas; 0 copias de payloads |
| Test SEO (`pnpm test:site`) | PASS | PASS |
| Test de plantillas | PASS | PASS |
| Test de contacto | PASS | PASS |

Linux se ejecutó en una copia temporal de los archivos del checkout, sin `.git`, node_modules Windows, out ni archivos de entorno privados. Node 22.23.3 se descargó de nodejs.org y se comprobó su SHA-256 contra SHASUMS256.txt antes de ejecutarlo. No se cambió la instalación de Node del usuario ni las dependencias del proyecto.

Un primer script temporal Linux añadió CRLF al nombre del comando final: contacto no llegó a ejecutarse. Se corrigieron los finales de línea del script temporal y se repitió toda la secuencia Linux, que finalizó con código 0. No se modificó código del proyecto para superar esa incidencia.

El test SEO verifica 16 canonicals y URLs de sitemap, exclusiones noindex, ausencia de localhost en los 28 HTML, OG/Twitter, robots, lang, encabezados, alt, JSON-LD y payloads. Valida 625 referencias internas/anclas y 58 referencias WebP. Sus casos de configuración cubren 12 orígenes inválidos y tres escenarios de rama/indexación/basePath. El build final usa el origen público sin prefijo.

Los tests TS nativos emiten `MODULE_TYPELESS_PACKAGE_JSON` en ambos sistemas; es una advertencia preexistente y no un error de prueba. No se ejecutaron nuevamente browser QA, Lighthouse, audit de dependencias, validadores externos de schema ni pruebas en el edge Cloudflare en esta fase; las evidencias anteriores quedan distinguidas en la auditoría fase 1.

## 6. Riesgos antes de integrar o publicar

1. **Alcance de aprobación:** aceptar la PR implica aceptar el rediseño, el contenido comercial y el formulario distintos al main actual. No basta con aprobar únicamente canonical/sitemap.
2. **Automatismos:** un push a main activaría el workflow GitHub Pages existente y podría activar la integración remota de Cloudflare. No se ha hecho push a main. Publicar una rama de revisión podría generar una preview si Cloudflare tiene previews automáticas habilitadas; no se configura ni solicita un despliegue desde esta tarea.
3. **Espejo GitHub Pages:** su workflow usa `/Nuvora` con origen Cloudflare por defecto e indexación habilitada. Debe resolverse la política de URLs/indexación o del propio espejo antes de merge/publicación. No se ha modificado el workflow.
4. **Cloudflare:** no se consultó su panel ni se cambiaron variables o configuración. Confirmar rama de producción, SHA, comando `pnpm build`, salida `out`, origen, basePath vacío e indexación; validar 301 con query, 404, caché y RSC en una preview autorizada.
5. **Producción:** mantiene los problemas documentados en fase 1 hasta una publicación posterior. Esta fase no vuelve a atribuir resultados locales al despliegue público ni a la indexación real de Google.
6. **Puertas previas del rediseño:** legales aún incompletos, decisiones de publicación sobre fuentes/activos y aviso de desarrollo de braces documentado en su validación anterior; no se ha repetido ese audit ni se asegura que su estado actual sea idéntico. Contacto mailto no acredita recepción.
7. **Temporalidad:** el normalizador mantiene copias de payloads hasta que se corrija el exportador de Windows upstream. Revisarlo al actualizar Next. La prueba Linux/Node 22 local no es una ejecución de GitHub Actions ni una certificación de Cloudflare.

## 7. Límites de esta entrega

Se preparan commits y una PR en borrador para revisión, manteniendo los dos grupos identificables. La URL y los SHA finales de revisión se entregan en la respuesta de cierre y en el historial de GitHub. No se hace merge ni se avanza a otra fase.

**Main local y remoto no se modifican. No se despliega producción ni se cambia configuración de Cloudflare.** La aprobación explícita del rediseño y cualquier autorización de merge/publicación son pasos posteriores.

## Inventario de archivos

### Main a rediseño

```text
M	.env.example
M	README.md
M	docs/PLANTILLAS.md
A	docs/audits/2026-10-14-redesign/VALIDACION.md
A	docs/audits/2026-10-14-redesign/browser-qa.json
A	docs/audits/2026-10-14-redesign/caso-atria-desktop.png
A	docs/audits/2026-10-14-redesign/contacto-mobile.png
A	docs/audits/2026-10-14-redesign/dependency-audit.json
A	docs/audits/2026-10-14-redesign/home-desktop.png
A	docs/audits/2026-10-14-redesign/home-full.png
A	docs/audits/2026-10-14-redesign/home-mobile.png
A	docs/audits/2026-10-14-redesign/http-qa.json
A	docs/audits/2026-10-14-redesign/rediseno-desktop.png
A	docs/audits/2026-10-14/AUDITORIA.md
A	docs/audits/2026-10-14/home-desktop.png
A	docs/audits/2026-10-14/home-mobile.png
A	docs/plans/2026-10-14-nuvora-redesign.md
M	package.json
M	pnpm-lock.yaml
M	pnpm-workspace.yaml
A	public/_redirects
A	public/templates/atria-small.webp
A	public/templates/atria.webp
A	public/templates/atria_gallery-small.webp
A	public/templates/atria_gallery.webp
A	public/templates/atria_space-small.webp
A	public/templates/atria_space.webp
A	public/templates/aura-small.webp
A	public/templates/aura.webp
A	public/templates/aura_space-small.webp
A	public/templates/aura_space.webp
A	public/templates/previews/atria-small.webp
A	public/templates/previews/atria.webp
A	public/templates/previews/aura-small.webp
A	public/templates/previews/aura.webp
A	public/templates/previews/pulse-small.webp
A	public/templates/previews/pulse.webp
A	public/templates/pulse-small.webp
A	public/templates/pulse.webp
A	public/templates/pulse_train-small.webp
A	public/templates/pulse_train.webp
A	scripts/check-contact.mjs
A	scripts/check-site.mjs
M	scripts/check-templates.mjs
M	src/app/(site)/about/page.tsx
M	src/app/(site)/aviso-legal/page.tsx
M	src/app/(site)/contact/page.tsx
A	src/app/(site)/contacto/page.tsx
M	src/app/(site)/cookies/page.tsx
A	src/app/(site)/estudio/page.tsx
M	src/app/(site)/layout.tsx
M	src/app/(site)/page.tsx
M	src/app/(site)/plantillas/[slug]/page.tsx
M	src/app/(site)/plantillas/page.tsx
M	src/app/(site)/privacidad/page.tsx
A	src/app/(site)/proceso/page.tsx
A	src/app/(site)/proyectos/[slug]/page.tsx
A	src/app/(site)/proyectos/page.tsx
M	src/app/(site)/services/page.tsx
A	src/app/(site)/servicios/[slug]/page.tsx
A	src/app/(site)/servicios/page.tsx
M	src/app/error.tsx
M	src/app/layout.tsx
M	src/app/loading.tsx
M	src/app/not-found.tsx
M	src/app/plantillas/[slug]/demo/page.tsx
M	src/app/robots.ts
M	src/app/sitemap.ts
M	src/components/contact/contact-form.tsx
A	src/components/layout/contact-cta.tsx
M	src/components/layout/desktop-nav.tsx
M	src/components/layout/footer.tsx
M	src/components/layout/header.tsx
M	src/components/layout/mobile-menu.tsx
A	src/components/projects/project-preview.tsx
M	src/components/templates/catalog.tsx
M	src/components/templates/demo-context.tsx
M	src/components/templates/demo-viewer.tsx
A	src/components/templates/template-image.tsx
A	src/content/process.ts
A	src/content/projects.ts
A	src/content/services.ts
M	src/content/site.ts
A	src/lib/contact.ts
M	src/styles/globals.css
M	src/styles/templates.css
M	src/styles/tokens.css
M	src/templates/atria/demo.tsx
M	src/templates/aura/demo.tsx
M	src/templates/pulse/demo.tsx
M	src/templates/registry.ts
```

### Rediseño a SEO

```text
M	README.md
M	package.json
M	scripts/check-site.mjs
A	scripts/normalize-static-export.mjs
M	src/app/(site)/aviso-legal/page.tsx
M	src/app/(site)/contacto/page.tsx
M	src/app/(site)/cookies/page.tsx
M	src/app/(site)/estudio/page.tsx
M	src/app/(site)/page.tsx
M	src/app/(site)/plantillas/[slug]/page.tsx
M	src/app/(site)/plantillas/page.tsx
M	src/app/(site)/privacidad/page.tsx
M	src/app/(site)/proceso/page.tsx
M	src/app/(site)/proyectos/[slug]/page.tsx
M	src/app/(site)/proyectos/page.tsx
M	src/app/(site)/servicios/[slug]/page.tsx
M	src/app/(site)/servicios/page.tsx
M	src/app/layout.tsx
M	src/app/plantillas/[slug]/demo/page.tsx
M	src/app/robots.ts
M	src/app/sitemap.ts
M	src/content/site.ts
A	src/lib/metadata.ts
A	docs/SEO_AUDIT_PHASE_1.md
A	docs/SEO_INTEGRATION_PHASE_1_2.md
```
