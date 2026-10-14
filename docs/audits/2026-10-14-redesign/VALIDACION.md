# Nuvora — Entrega local del rediseño

Fecha: 14/10/2026. Rama: `codex/nuvora-redesign-plan`. Estado: web implementada y validada localmente; publicación comercial y envío desde la web pendientes. El usuario autoriza versionar y subir la entrega a GitHub en esta rama. Esta entrega no incluye merge ni despliegue de producción.

## Implementación

- Nueva home editorial con propuesta de valor, filosofía, servicios, conceptos, metodología, estudio y contacto. Retícula asimétrica, paleta oficial, motion CSS breve y reduced motion.
- Servicios en español y tres páginas de detalle; rediseño con revisión del estado actual y migración sin prometer resultados garantizados.
- Portfolio editorial y tres casos explicados, únicamente Atria/Pulse/Aura, etiquetados como conceptos. Contexto, reto, objetivos, solución, diseño, funcionalidades y resultado observable, sin clientes ni cifras inventadas.
- Estudio y proceso de seis etapas. Gabi/Alex y sus roles se conservan del contenido anterior; sin nuevas biografías, fotos o credenciales.
- Contacto de seis campos, web actual opcional, límites, errores asociados, resumen, foco al primer error y estado accesible estable. Conserva valores al fallar validación. La URL actualiza el contexto mediante `useSearchParams` con Suspense; navegar a otra consulta inicia otro formulario. Sin almacenamiento persistente.
- Preselección de servicio y transferencia de configuración desde demos, incluido el CTA final de los casos. Parser de plantillas ya no acepta propiedades heredadas como `__proto__` o `constructor`.
- Canonical por página, OG con origen público, sitemap actualizado y preview no indexable. Origen de publicación validado; no admite credenciales ni localhost indexable.
- Rutas inglesas conservadas como compatibilidad estática con canonical español/noindex. Archivo `_redirects` preparado; pendiente verificar 301 y parámetros en Cloudflare.
- Inter de fallback y IBM Plex Mono servidas localmente por Next. PNG oficiales intactos; sin Söhne de prueba ni recreación de logo. Veinte derivados WebP 700/1400px, originales conservados, selección responsive real mediante `picture`.
- Estados 404/error/loading con destino para el skip link; navegación y contacto directo disponibles sin JavaScript.

## Decisiones de alcance

La autorización «Aplica todo lo que veas necesario» permite ejecutar el plan completo en la rama actual. Se reutilizó la base y el motor de demos. No se hizo otro checkout, no se agregó framework de diseño, CMS, analítica ni proveedor de pago.

La actualización de seguridad pasó Next y eslint-config-next de 16.3.4 a 16.3.8. Se eliminó Geist, ya sin consumidores; el lockfile incorpora Sharp 0.35.5 y source-map-js 1.2.2. Se fijó el parche de brace-expansion en `pnpm-workspace.yaml` para que la resolución siga siendo reproducible. Se retiró `start`, que intentaba ejecutar un servidor Next incompatible con `output: export`; el README explica cómo servir `out`.

## Pruebas técnicas

| Comprobación | Evidencia |
| --- | --- |
| Instalación `pnpm install --frozen-lockfile` | PASS |
| Typecheck y lint | PASS, sin warnings de lint |
| `pnpm test:contact` | PASS: datos válidos, límites, URL opcional/protocolos/credenciales, servicio inválido y origen inseguro |
| `pnpm build` | PASS: 31 páginas estáticas generadas |
| `pnpm test:templates` | PASS: tres fichas/demos, parser, metadata y assets |
| `pnpm test:site` | PASS: 13 rutas principales, 625 referencias a enlaces/anclas y 58 referencias WebP |
| HTTP sobre el export local | PASS: 22 rutas 200; evidencia en [http-qa.json](http-qa.json) |
| Build `NEXT_PUBLIC_SITE_INDEXABLE=false` + tests `--preview` | PASS: noindex y sitemap sin entradas |
| Build con `NEXT_PUBLIC_BASE_PATH=/Nuvora` + tests | PASS: enlaces, canonicals y assets del export; no valida el hosting GitHub |
| `pnpm audit --prod` | PASS: sin vulnerabilidades conocidas en el árbol final de producción |
| `pnpm audit` completo | FAIL: un aviso alto de desarrollo pendiente, detallado abajo |

Los scripts que importan TypeScript nativo emiten `MODULE_TYPELESS_PACKAGE_JSON`, también presente en la base. No se convierte todo el paquete a ESM para eliminarlo. La instalación advierte que ESLint 9 está fuera de soporte; migrar de major no forma parte de este cambio. Mantener estas dos advertencias visibles.

## Navegador y accesibilidad

Pruebas sobre `out`, servido localmente en `http://localhost:3101`, en Chromium del navegador integrado. Evidencia: [browser-qa.json](browser-qa.json).

- 22 rutas revisadas a 320, 375, 390, 430, 768, 1024, 1280, 1440 y 1920px: sin overflow horizontal.
- Cero errores de consola registrados en el recorrido. No equivale a todos los escenarios posibles de navegador.
- axe-core, etiquetas WCAG 2/2.1/2.2 AA y best practice: cero violaciones detectadas en esas 22 páginas. Los resultados incomplete de contraste permanecen en el JSON y requieren juicio visual; no se afirma certificación WCAG completa.
- Menú móvil: expansión, cierre con Escape y retorno de foco comprobados.
- Contacto: servicio de rediseño preseleccionado, contexto de Atria transferido y actualización al retirar parámetros de la URL. Los errores conservan datos y sitúan el foco en el primer campo inválido. No se envió ninguna consulta ni se probó entrega de email.
- Personalizador: cambio de nombre reflejado en el iframe, copiar enlace con configuración y restablecer a Atria comprobados.
- Sin JavaScript: navegación alternativa visible, menú inoperativo oculto, email directo disponible y formulario oculto para evitar envíos GET involuntarios.
- Reduced motion: animation-name `none` en hero y transition-duration `0s` en imagen comprobados mediante emulación.
- Imagen de home en móvil: el navegador selecciona `atria-small.webp`, no el JPEG original.

Capturas de referencia: [home escritorio](home-desktop.png), [home móvil](home-mobile.png), [home completa](home-full.png), [rediseño](rediseno-desktop.png), [caso Atria](caso-atria-desktop.png), [contacto móvil](contacto-mobile.png).

Rendimiento: muestra local sin throttling en home móvil observada con PerformanceObserver: LCP 100ms y suma de layout shifts sin interacción 0. Es una muestra diagnóstica, no un benchmark representativo ni un resultado de campo. Lighthouse, INP de campo, dispositivos físicos, segundo motor, zoom real y lector de pantalla: NOT RUN. No se asignan puntuaciones inventadas.

## Seguridad: antes y después

La auditoría inicial de producción detectó nueve avisos (incluido uno crítico de Next). Tras Next 16.3.8, Sharp 0.35.5 y source-map-js 1.2.2, `pnpm audit --prod` no reporta vulnerabilidades conocidas. Se revisaron los avisos [Next ImageResponse](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j), [Sharp](https://github.com/advisories/GHSA-wq5f-xc86-pv6w) y [source-map-js](https://github.com/advisories/GHSA-68fv-2mgg-jv7q).

La revisión completa dejó un aviso alto en `braces` 3.0.3, transitivo de herramientas de lint mediante micromatch/fast-glob. [Advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). El audit anuncia parche >=3.0.4, pero `pnpm install` confirma que esa versión no está publicada en el registro consultado. Se retiró el override inválido, se comprobó instalación congelada y no se silencia el aviso. No se instala un fork ni se migra el major de ESLint. Revisar cuando exista un parche disponible. Resultado completo guardado en [dependency-audit.json](dependency-audit.json).

Este parser pertenece al tooling de desarrollo, no a un endpoint público del export. Su existencia sigue siendo un riesgo del entorno de desarrollo; procesar únicamente patrones/código de confianza. El audit completo se registra FAIL, aunque producción esté limpia.

## Contacto preparado, integración pendiente

Estado actual: mailto explícito, sin backend. El botón dice «Preparar email» y el estado aclara que el visitante todavía debe revisar y enviar. Los datos de formulario no se almacenan en web/backend/localStorage. La configuración compartida de demos sí viaja en la URL, como informa el visor.

Para recepción desde la web se recomienda una Pages Function independiente del export, en `/api/contact`, una vez elegido y autorizado un proveedor de correo o formularios. Reutilizar `validateContact` en servidor con la lista de servicios; limitar tamaño del cuerpo, admitir solo POST y origen esperado, validar URL sin obtenerla, añadir honeypot y limitación de frecuencia. Secretos únicamente en bindings del servidor, nunca `NEXT_PUBLIC_*`.

Contrato propuesto: respuesta de error por campo en validación; errores de proveedor con mensaje recuperable y datos conservados; aceptación solo después de la respuesta real del proveedor. Pruebas necesarias antes de activarlo: consulta válida recibida, campos inválidos, payload excesivo, spam, timeout, doble envío y ausencia de datos privados en logs. Turnstile se valora si el abuso lo requiere; no existe captcha ficticio.

Falta decidir identidad del remitente, buzón receptor, proveedor, retención y condiciones de tratamiento. No se han creado cuentas ni enviado datos a terceros para resolverlo.

## Puerta de publicación

1. Completar titular y privacidad, confirmar datos del estudio/email y derechos de proyectos/fotografías.
2. Disponer de Söhne web licenciada y SVG trazado oficial, o aprobar el fallback/PNG para esa publicación.
3. Confirmar integración y rama real de Cloudflare, origen público, estado del workflow GitHub Pages y variables. No se modificó esa configuración remota.
4. Verificar `_redirects`, parámetros y 404 personalizado en una preview Cloudflare autorizada. Python no certifica reglas del edge.
5. Medir Lighthouse móvil y completar QA manual pendiente. Revisar el aviso de desarrollo abierto.
6. Publicar únicamente con autorización expresa y un deployment anterior identificable para rollback.

El código y el artefacto anterior siguen recuperables desde Git; no se borraron originales ni se reescribió el historial. Estas comprobaciones locales no constituyen una aprobación de producción.
