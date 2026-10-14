# Nuvora — Integración y despliegue SEO, fase 1.3

Fecha: 14/10/2026. Producción: https://nuvora-studio.pages.dev/.
Repositorio: `nuvora-studio-dev/Nuvora`.

**Resultado: PR #1 fusionada con historial conservado, versión nueva desplegada en Cloudflare y validación de producción satisfactoria.** No se afirma que Google haya indexado las páginas.

## 1. PR, historial y main

- [PR #1](https://github.com/nuvora-studio-dev/Nuvora/pull/1): MERGED. Se encontró cerrada sin merge, se reabrió conforme a la autorización expresa de esta fase y se marcó lista para revisión.
- Merge commit: `5b5614f51734634d71b9b73b15245dbd73d0070c`.
- Padres del merge: main original `493b33c2b78542605ad2fd2a281ea24ff1108e11` y SEO `0c356f484d927001b79cdd4abc61c075adaa640d`.
- Los seis commits permanecen en el historial: `a53f002`, `ebf2e22`, `9a3ab88`, `95e09f7`, `d4ebac1` y `0c356f4`.
- Commit posterior de CI: `772bf72fabfb7faf3c351def4c6f6f655fca14e0`, `ci(site): replace GitHub Pages mirror with quality checks`.
- **SHA de main y de producción al validar el código:** `772bf72fabfb7faf3c351def4c6f6f655fca14e0`. El commit documental que contiene este informe y sus evidencias se añade después; su SHA final y despliegue se comunican en el cierre. No modifica el código de la web.

`git fetch origin` confirmó los SHA previstos antes de actuar. GitHub permitía merge commits; main no tenía protección y la lista de rulesets estaba vacía. No se usó bypass administrativo ni force push. El merge se condicionó al SHA exacto del head de la PR. El checkout se sincronizó mediante fast-forward y trabaja en main.

## 2. GitHub Pages, CI y Cloudflare

El antiguo workflow de GitHub Pages intentaba publicar un espejo con `/Nuvora` y origen Cloudflare por defecto. Se desactivó antes del merge para evitar ese despliegue y después se sustituyó por `.github/workflows/quality.yml`, sin permisos ni acciones de publicación de GitHub Pages. Los fallos históricos de ese workflow no se presentan como aprobados.

El nuevo workflow ejecuta instalación frozen-lockfile, typecheck, lint, build y los tests SEO, plantillas y contacto en Ubuntu con Node 22. La [ejecución 38602054497](https://github.com/nuvora-studio-dev/Nuvora/actions/runs/38602054497) terminó SUCCESS, con todos esos pasos exitosos, sobre `772bf72`.

Se accedió legítimamente al panel Cloudflare con la sesión disponible y se comprobó:

| Configuración | Valor observado |
| --- | --- |
| Proyecto | `nuvora-studio` |
| Repositorio conectado | `nuvora-studio-dev/Nuvora` |
| Rama de producción | `main` |
| Implementaciones automáticas | Habilitadas |
| Comando de build | `pnpm build` |
| Directorio de salida | `out` |
| Directorio raíz | Vacío, raíz del repositorio |
| Sistema de build | Versión 3 |
| NEXT_PUBLIC_SITE_URL, producción | Configurado como texto: `https://nuvora-studio.pages.dev` |
| NEXT_PUBLIC_BASE_PATH | Sin override remoto; vacío por defecto en el código |
| NEXT_PUBLIC_SITE_INDEXABLE | Sin override remoto falso; main indexable por el gate existente |

No se cambiaron DNS, dominios, secretos, permisos de acceso ni recursos ajenos. La única variable remota añadida es pública. El panel advierte que su valor entra en vigor en la siguiente implementación; el push documental posterior activa esa compilación. El build ya utilizaba el mismo origen público por defecto.

Cloudflare informó SUCCESS y el panel identificó `772bf72` como Production/main, con implementación `f0eb3d36-1ac5-4ce4-934e-7fb0b78b8423` y URL https://f0eb3d36.nuvora-studio.pages.dev/. También desplegó el merge `5b5614f` previamente. La URL pública principal se comprobó directamente, no solo por el check de GitHub.

La preview de revisión https://f63b5ef3.nuvora-studio.pages.dev/ devuelve 200, noindex/nofollow y sitemap sin entradas. No se considera equivalente a producción ni protección de acceso.

## 3. URLs y HTTP verificados

Todas las URLs siguientes pertenecen a `https://nuvora-studio.pages.dev`:

| Ruta indexable | HTTP | Canonical |
| --- | --- | --- |
| `/` | 200 | Autorreferente HTTPS |
| `/servicios/` | 200 | Autorreferente HTTPS |
| `/servicios/diseno-desarrollo-web/` | 200 | Autorreferente HTTPS |
| `/servicios/rediseno-web/` | 200 | Autorreferente HTTPS |
| `/servicios/mantenimiento-web/` | 200 | Autorreferente HTTPS |
| `/proyectos/` | 200 | Autorreferente HTTPS |
| `/proyectos/atria/` | 200 | Autorreferente HTTPS |
| `/proyectos/pulse/` | 200 | Autorreferente HTTPS |
| `/proyectos/aura/` | 200 | Autorreferente HTTPS |
| `/estudio/` | 200 | Autorreferente HTTPS |
| `/proceso/` | 200 | Autorreferente HTTPS |
| `/contacto/` | 200 | Autorreferente HTTPS |
| `/plantillas/` | 200 | Autorreferente HTTPS |
| `/plantillas/atria/` | 200 | Autorreferente HTTPS |
| `/plantillas/pulse/` | 200 | Autorreferente HTTPS |
| `/plantillas/aura/` | 200 | Autorreferente HTTPS |

Las 16 páginas declaran index/follow; sus URLs coinciden exactamente con las 16 entradas del sitemap, sin localhost ni `/Nuvora`. Se verificaron OG URL, título, descripción, locale, site_name, tipo e imágenes sociales accesibles, además de Twitter summary_large_image.

| Otras comprobaciones | Resultado |
| --- | --- |
| `/sitemap.xml` | 200, exactamente 16 URLs HTTPS del dominio público |
| `/robots.txt` | 200, Allow `/`, sin Disallow y con sitemap absoluto correcto |
| `/aviso-legal/`, `/privacidad/`, `/cookies/` | 200, noindex/nofollow |
| `/plantillas/atria/demo/`, `/plantillas/pulse/demo/`, `/plantillas/aura/demo/` | 200, noindex/nofollow; canonical hacia su ficha |
| `/seo-release-inexistente/` | 404 real, noindex |
| `/services` y `/services/` | 301 a `/servicios/` |
| `/about` y `/about/` | 301 a `/estudio/` |
| `/contact` y `/contact/` | 301 a `/contacto/` |

Los seis redirects se solicitaron con `?seo=release-test`; todos conservaron ese query en la respuesta Location. Se verificaron 51 recursos únicos de JS, CSS, imágenes, iconos y fuentes con 200, incluyendo referencias adicionales descubiertas dentro del CSS. El navegador tampoco registró errores de prefetch/RSC en el recorrido.

JSON-LD: la portada contiene un único script JSON válido, con Organization y WebSite, URL del sitio y referencia de publisher coherentes. No contiene datos de dirección, coordenadas, reseñas o calificaciones inventados. Esta comprobación de formato y contenido no equivale a una validación externa de resultados enriquecidos.

## 4. Pruebas y navegador

| Prueba | Resultado de esta fase |
| --- | --- |
| Typecheck, ESLint, build y tests SEO/plantillas/contacto locales | PASS, Windows/Node 24.18.0 |
| Mismas comprobaciones en GitHub Actions | PASS, Ubuntu/Node 22; instalación frozen-lockfile incluida |
| Export estático local | PASS: 31 páginas generadas; 16 URLs indexables y ningún localhost |
| HTTP/metadata de producción | PASS: 22 páginas, sitemap, robots, redirects, 404 y recursos |
| Navegador integrado Chromium | PASS: 22 páginas a 390×844 y 1440×900, 44 visitas |
| Responsive | Sin overflow horizontal en esas visitas; capturas móvil/escritorio revisadas |
| Imágenes y consola | Sin imágenes rotas detectadas ni errores de consola capturados |
| Menú móvil | Expansión, cierre con Escape y navegación a servicios comprobados |
| Contacto | Rediseño preseleccionado; email inválido rechazado; foco en email; valores conservados |
| Personalizador Atria | Nombre actualizado en iframe, query compartido y contexto Atria transferidos al formulario |
| Envío de correo | NOT RUN: no se envió ninguna consulta; el formulario sigue siendo mailto |
| Lighthouse, CrUX/INP de campo, Search Console, validadores externos de schema | NOT RUN |

Se corrigió una expectativa del test de personalizador: el resumen de contacto muestra «Partimos de Atria», no el nombre de empresa personalizado. Se comprobó el nombre en el query y el contexto/servicio en el formulario; no fue necesario modificar el producto. Las advertencias MODULE_TYPELESS_PACKAGE_JSON de los tests TS nativos siguen siendo preexistentes, sin fallo de pruebas.

Evidencias: [HTTP y metadata](audits/2026-10-14-release/http-qa.json), [navegador y funciones](audits/2026-10-14-release/browser-qa.json), [portada móvil](audits/2026-10-14-release/home-mobile.png), [portada escritorio](audits/2026-10-14-release/home-desktop.png), [variable pública de Cloudflare](audits/2026-10-14-release/cloudflare-settings.png).

## 5. Correcciones y límites

- Se reabrió la PR y se realizó el merge autorizado conservando historial.
- Se evitó el espejo indexable incorrecto y se sustituyó por CI de calidad.
- Se publicó la base de rediseño/SEO: desaparecen de producción el sitemap localhost y los 404 de las páginas españolas.
- Se confirmó la aplicación real de `_redirects`, canonical, OG, noindex, JSON-LD y recursos.
- Se configuró el origen público en Cloudflare sin tocar secretos ni DNS.
- No se añadieron cambios visuales, formularios nuevos ni funcionalidades comerciales durante esta fase.

No quedan bloqueos técnicos de integración o despliegue detectados en las comprobaciones realizadas. Permanecen fuera de esta validación los datos legales pendientes de completar, la recepción efectiva de emails, los derechos/licencias de activos que requieran revisión y el audit de dependencias no repetido. El sitio no obtiene por ello una certificación legal, de accesibilidad o de rendimiento de campo.

## 6. Google Search Console: próximos pasos

1. Verificar la propiedad del prefijo `https://nuvora-studio.pages.dev/` mediante un método autorizado.
2. Enviar https://nuvora-studio.pages.dev/sitemap.xml y sustituir el sitemap antiguo.
3. Inspeccionar portada, servicios y una ficha: acceso de Googlebot, HTML renderizado y canonical elegida; solicitar indexación de las URLs publicadas cuando proceda.
4. Revisar exclusiones deliberadas de demos, legales y aliases, y monitorizar los redirects de rutas inglesas.
5. Validar JSON-LD externamente y consultar CWV/CrUX cuando haya datos suficientes.

No se ha accedido a Search Console ni se asegura indexación o posición en Google. La fase siguiente queda pendiente de una nueva instrucción del usuario.
