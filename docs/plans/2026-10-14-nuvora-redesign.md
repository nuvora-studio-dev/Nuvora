# Nuvora — Plan de implementación del rediseño

> Para ejecución: aplicar executing-plans o el router local de especialistas. Toda delegación autorizada se ejecuta secuencialmente. Este documento es una propuesta para revisar antes de cambios importantes; no autoriza commits, push, despliegues ni servicios de pago.

**Objetivo:** que un negocio que llega desde un correo comprenda la oferta, evalúe el criterio del estudio y pueda iniciar una conversación real.

**Arquitectura:** conservar Next.js App Router con exportación estática a Cloudflare Pages, componentes de servidor por defecto y pequeñas interacciones cliente. Reutilizar shell y demos; reestructurar páginas corporativas y contenido verificable.

**Stack:** React, TypeScript estricto, CSS nativo, pnpm y ESLint existentes. Sin CMS, framework CSS, librería de motion o migración de hosting.

Diagnóstico y evidencia: [auditoría del 14 de octubre](../audits/2026-10-14/AUDITORIA.md). Estado: **planned**; únicamente auditoría y documentación implementadas.

## Dirección creativa: criterio visible

Una web editorial donde cada explicación se acompaña de una decisión de diseño o una interfaz real. Obsidian como lienzo, tipografía amplia a izquierda, líneas discretas, azul para acciones y cian para información puntual. Surface y Elevated separan información cuando aporta utilidad; no convertir cada bloque en tarjeta.

El hero abre con «Tu negocio merece una web que esté a su altura». Texto: «Diseñamos y desarrollamos páginas web que reflejan la identidad de tu negocio, transmiten confianza y facilitan conectar con tus clientes. Cuidamos el diseño y la tecnología para que tu web funcione tan bien como se ve». CTA principal «Cuéntanos tu proyecto»; secundario «Ver proyectos».

Desktop: retícula oficial de 12 columnas, titular ocupa 8 y contextualización 4; debajo, una captura amplia del trabajo seleccionado con etiqueta honesta. Sin panel de imagen decorativa que compita con la propuesta. Hasta tener casos comerciales aprobados, usar captura real de una demo y «Concepto de Nuvora», nunca fingir un cliente. El arte abstracto existente puede mantenerse como acento secundario, sin dominar el hero.

Alternar bloque editorial, filas de servicios y proyectos de tamaños distintos. Un proyecto ancho y un segundo desplazado aportan ritmo; cada ficha muestra nombre, naturaleza, alcance y enlace, sin cifras inventadas. En móvil, el orden es titular → explicación → contacto → trabajo; ninguna información depende de hover o animación.

Söhne para display si hay licencia web; Inter para cuerpo/UI; IBM Plex Mono para etiquetas. Si falta Söhne, utilizar Inter como fallback explícito permitido por la guía y mantener pendiente el cierre tipográfico definitivo. No usar OTF de prueba. Logo PNG oficial hasta disponer de SVG trazado autorizado; sin reinterpretación ni recoloreado.

Motion: CSS y mejora progresiva, transform/opacity, 160ms microinteracciones, 240ms UI, 450ms entradas selectivas. Contenido visible sin JavaScript y sin scroll hijacking. No introducir transiciones de página que retrasen navegación. Reduced motion elimina desplazamientos y animaciones persistentes.

## Arquitectura editorial y conversión

Header: Servicios · Proyectos · Estudio · Proceso y CTA de contacto. Demos accesibles desde proyectos y footer, conservando sus URLs. Logo enlaza a inicio. Menú móvil simple tipo disclosure con Escape y foco; no añadir modal si no es necesario.

| Ruta final | Contenido y propósito | Siguiente paso |
| --- | --- | --- |
| `/` | Hero, filosofía, tres servicios, trabajo destacado, metodología/diferenciación, estudio y cierre | Servicio, proyecto o contacto |
| `/servicios` | Qué problema resuelve cada servicio, alcance orientativo y destinatario | Elegir servicio |
| `/servicios/diseno-desarrollo-web` | Comprender negocio, estructura, diseño, implementación, contenido e integraciones acordadas | Consulta con servicio preseleccionado |
| `/servicios/rediseno-web` | Señales de web desactualizada; revisión de contenido, UX, móvil y técnica; qué conservar y renovar; cuidado de URLs y publicación | Compartir web actual para valorar el alcance |
| `/servicios/mantenimiento-web` | Correcciones, actualizaciones, mejoras y evolución según tecnología y necesidades; sin SLA ni disponibilidad inventados | Explicar web y necesidad |
| `/proyectos` | Selección editorial; separar encargos verificados de conceptos | Leer caso o demo |
| `/proyectos/[slug]` | Presentación, contexto, reto, objetivos, solución, diseño, desarrollo, resultado observable, imágenes y enlace autorizado | Contacto relacionado |
| `/estudio` | Motivación, implicación y calidad; personas únicamente con datos confirmados | Proceso/contacto |
| `/proceso` | Seis pasos del brief, entregable y participación del cliente por paso | Iniciar conversación |
| `/contacto` | Nombre, empresa, email, servicio, web opcional y descripción; privacidad y canal directo | Recepción real o preparación de email explícita |
| `/aviso-legal`, `/privacidad`, `/cookies` | Datos y prácticas reales revisados | Información accesible desde footer/formulario |
| `/plantillas` y rutas existentes | Demos y personalizador funcional actuales | Contacto conservando configuración |

Proceso: descubrimiento (contexto y materiales), estrategia (mapa y contenido), diseño (revisión de propuestas), desarrollo (implementación acordada), calidad (revisión conjunta y correcciones), publicación/evolución (autorización y alcance de mantenimiento). No inventar plazos o número de rondas: se acuerdan en presupuesto.

La home concentra siete bloques, sin añadir otra sección repetida de «estándar»; calidad técnica y comunicación se explican en metodología y casos. En rediseño el tono es respetuoso: «Tu negocio ha evolucionado. ¿Tu web también?»; sin desacreditar a proveedores anteriores ni prometer ventas/posiciones.

Antes de iniciar frontend, preparar en `src/content/services.ts` los tres servicios y sus alcances, y en `src/content/projects.ts` únicamente proyectos documentados con naturaleza `conceptual` o `commercial`. Generar casos estáticos con `generateStaticParams`. Para conceptos existentes pueden documentarse interfaces y funcionalidades observadas; no inventar una investigación de cliente ni objetivos históricos. Resultado significa lo construido, no métricas sin medición.

Estudio sin datos confirmados: publicar principios y forma de implicarse; mantener las biografías en documentación interna. No publicar placeholders de personas, retratos de stock ni perfiles ficticios.

## Migración de rutas y SEO

Crear `/servicios`, `/estudio`, `/contacto` y actualizar todos los callers: home, nav, footer, servicios, fichas, DemoViewer, DemoExperience, metadata, sitemap y tests. Preservar `template` y parámetros personalizados al trasladar contacto.

Proponer `public/_redirects` con 301 `/services` y `/services/` → `/servicios/`, `/about` y `/about/` → `/estudio/`, `/contact` y `/contact/` → `/contacto/`; comprobar conservación de query y ausencia de cadenas en una preview Cloudflare autorizada. No confiar en redirects de Next con export estático. La validación local de `out` no certifica reglas del edge. Mantener URLs de demos y no duplicar fichas bajo `/proyectos` sin contenido de caso diferenciado.

Metadatos únicos y canonical absoluto por página; OG con captura de caso autorizada o imagen corporativa existente verificada. Origen explícito por build; previews noindex y fuera del sitemap público. Robots incluye ubicación del sitemap; no se usa para proteger datos. Sin schema de reviews, dirección o LocalBusiness inventados. Enlazado entre servicios, proceso, casos y contacto; contenido natural orientado a diseño/rediseño web en España, sin páginas locales duplicadas.

## Componentes y archivos afectados

| Conservar/adaptar | Responsabilidad |
| --- | --- |
| `src/styles/tokens.css`, `globals.css` | Marca, familias, escala fluida, grid y estados; acotar reglas corporativas |
| `src/app/layout.tsx`, `(site)/layout.tsx` | Fuentes coherentes y metadata base; eliminar cargas redundantes solo tras medir |
| `src/components/layout/*` | Reutilizar Container/PageIntro y comportamiento de nav; nueva composición de shell |
| `src/components/ui/brand-mark.tsx`, `text-link.tsx`, `arrow.tsx` | Activos oficiales y enlaces; extender solo variantes utilizadas |
| `src/content/site.ts` | Navegación y contacto centralizados; evitar email duplicado |
| `src/app/(site)/page.tsx` | Home como referencia visual; no crear un constructor universal de secciones |
| `src/components/contact/contact-form.tsx` | Simplificar campos, web actual, validación y estado real del canal |
| `src/components/templates/*`, `src/templates/*` | Conservar motor/identidades; adaptar enlaces y presentación del catálogo |
| `src/app/sitemap.ts`, `robots.ts`, metadata de rutas | Origen, canonical, indexación y cobertura |
| `scripts/check-templates.mjs`, `docs/PLANTILLAS.md`, `README.md` | Regresiones de demos, flujo de contacto, ejecución y validación |

Crear según necesidad: rutas españolas y detalles de servicios, proyectos/casos, proceso, `src/content/services.ts`, `projects.ts`, un `ProjectPreview` compartido entre home/portfolio y `public/projects` con material verificado. No crear componentes para párrafos usados una sola vez. CSS nuevo debe quedar acotado; mover `templates.css` al ámbito corporativo solo si mantiene fichas y deja demos independientes.

## Contacto: decisión necesaria

Hoy el canal es un mailto honesto. Mantenerlo disponible durante el rediseño. No existe una integración que permita afirmar «mensaje enviado».

Opción propuesta para recepción web: una Pages Function independiente del export Next, endpoint mismo origen, envío a proveedor de correo seleccionado por el titular. Alternativa: proveedor de formularios con condiciones de privacidad/coste aprobadas. Ninguno se contrata o configura en esta fase. La elección no obliga a migrar el sitio a SSR.

Contrato: nombre y email válidos, servicio de lista cerrada, empresa opcional, URL actual http/https opcional y descripción con límites; comprobaciones en cliente y servidor. Endpoint rechaza cuerpos excesivos, formatos inválidos y solicitudes fuera del origen admitido; honeypot y limitación razonable, Turnstile solo si el abuso lo justifica. No confiar únicamente en validación cliente. No obtener automáticamente la URL de la empresa: evitar introducir SSRF.

Estados: reposo, validación, enviando (sin doble envío), recibido únicamente tras aceptación real del servicio, error conservando datos y alternativa email. Resumen de errores/foco, región viva estable y labels persistentes. Pruebas mínimas del futuro endpoint: válido, inválido, cuerpo excesivo, spam, fallo/timeout de proveedor y ausencia de secreto en bundle/logs. No registrar el mensaje completo. Retención, responsables y transferencias requieren decisión y revisión legal.

Si se decide aplazar backend, CTA «Preparar email», explicación visible de envío externo y enlace directo; no mostrar spinner o éxito de recepción. Ese estado permite validar diseño, pero no cierra el requisito de envío web.

## Responsive, accesibilidad y rendimiento

Retícula oficial 4 columnas móvil, 8 tablet, 12 desktop. Márgenes 20–24px en móvil, 32px tablet, 40–64px escritorio intermedio y 64–96px amplio. Texto largo 65–75ch, base 16px. Titulares fluidos sin saltos forzados que rompan móvil. Proyectos se apilan conservando orden semántico; imágenes con dimensiones y sin deformación.

QA a 320, 375, 390, 430, 768, 1024, 1280, 1440 y 1920px; zoom 200%, teclado, Escape, foco, reduced motion y navegación con JS desactivado. Objetivo WCAG 2.2 AA: contraste 4,5:1 texto normal / 3:1 grande, controles reconocibles y targets de proyecto 44px. Revisar con auditoría automática y manual; no afirmar conformidad únicamente por axe.

Optimizar media previamente para export estático, con variantes reales cuando aporten ahorro; `next/image` con unoptimized no basta. Prioridad solo a recurso LCP, lazy bajo fold, sin video autoplay imprescindible. Medir CSS/JS por ruta y limitar hidratación a menú/formulario/personalizador. Objetivos CWV de campo: LCP ≤2,5s, INP ≤200ms, CLS ≤0,1; pruebas de laboratorio no equivalen a resultados de campo. No añadir analytics ni banner sin inventario de servicios y consentimiento aplicable revisado.

## Ejecución por incrementos y criterios de aceptación

1. **Fases 0–1: diagnóstico y decisiones.** Revisar estos dos documentos y capturas. Cerrar dirección editorial, tratamiento de conceptos y contacto. Confirmar guía/activos y origen público. Cierre: decisiones registradas y dependencias asignadas; esta entrega llega hasta aquí.
2. **Fase 2: foundations y shell.** Ajustar tokens/familias, layouts, navegación y footer. Introducir solo las rutas necesarias para evitar destinos muertos. Verificar shell a 390/768/1440px, foco, Escape y reduced motion; ejecutar typecheck/lint/build. Cierre: identidad coherente y shell funcional sin regresión de demos.
3. **Fase 3: home completa.** Implementar siete bloques con el copy propuesto, ProjectPreview y material autorizado. Capturas desktop/móvil y revisión de ritmo/jerarquía, controles y lectura sin JS. Cierre: en la primera pantalla se entienden oferta y contacto; proyectos honestos; cero overflow y destinos vacíos. Revisar esta referencia con el usuario antes de propagar dirección a interiores.
4. **Fase 4a: servicios y proceso.** Crear overview y tres rutas de servicio; priorizar rediseño y su contexto para email de captación. Cada página explica problemas, alcance, destinatario y participación; servicio llega preseleccionado al contacto. Cierre: seis etapas del proceso y enlaces funcionales sin garantías de resultados.
5. **Fase 4b: portfolio y estudio.** Construir composición editorial y casos estáticos; enriquecer concepto solo con decisiones observables o confirmadas. Estudio usa principios y personas autorizadas. Cierre: cada proyecto publicado tiene evidencia/media/derechos, etiqueta y caso navegable; nada se presenta como encargo sin respaldo.
6. **Fase 4c: contacto.** Seis campos del brief, canal acordado, contexto de demo y privacidad. Implementar backend solo tras selección y autorización del proveedor. Cierre: pruebas de error/validación y entrega verificable en entorno autorizado, o mailto identificado como estado parcial. No cerrar envío web sin integración.
7. **Fase 5: optimización/migración.** Metadata, sitemap, robots, derivados, redirects, aislamiento CSS y revisión responsive/a11y. Cierre: ninguna URL localhost en metadata de publicación, demos noindex, sitemap solo rutas públicas, sin roturas de query de contacto.
8. **Fase 6: validación y entrega.** Validación transversal sobre build exportado; registrar PASS/FAIL/NOT RUN/BLOCKED por criterio. Preparar preview y recuperación sin publicar automáticamente. Cierre: sin errores introducidos, documentación de pendientes y aprobación separada para merge/publicación.

Comandos de base por incremento relevante: `pnpm typecheck`, `pnpm lint`, `pnpm build`, después `pnpm test:templates` (consume `out` del build). No ejecutar test del export antes de generar el artefacto. Añadir comprobaciones pequeñas para lógica nueva de contacto y cobertura de rutas/metadatos; no tests que simplemente repliquen los tokens.

Revisión final: HTTP 200 en todas las rutas finales, 404 real, todos los enlaces internos/externos pertinentes, menú y formulario en dos motores cuando estén disponibles, capturas de cada plantilla editorial, ausencia de errores de consola, responsive completo, teclado y Lighthouse móvil sobre producción local. Registrar condiciones de medición y repetir solo si cambios/fallos lo justifican. Umbral de laboratorio propuesto: Lighthouse accesibilidad/SEO ≥95 y performance móvil ≥90, con revisión de cada advertencia; no sustituye WCAG ni CWV.

## Preview, recuperación y límite de producción

Trabajar en `codex/nuvora-redesign-plan`, creada desde `493b33c2b78542605ad2fd2a281ea24ff1108e11` con árbol limpio. No merge, commit o push automáticos. La base `main` permanece disponible; no ejecutar reset ni borrar assets para recuperar.

Preview inicial: `pnpm dev` para revisar interacción, después servir `out` con un servidor estático local disponible y comprobar HTML/media reales. `next start` no sirve el proyecto exportado. Si se necesita tooling adicional, justificarlo primero. Las reglas `_redirects`, headers y Functions requieren preview de Cloudflare, no se dan por probadas por un servidor local.

Antes de cualquier push autorizado, verificar controles de ramas remotos y el workflow GitHub Pages: no asumir que subir una rama no afecta producción. Preview remota únicamente tras permiso explícito. Para publicación posterior: confirmar commit/artefacto anterior y deployment recuperable, comparar SHA, revisar variables/origen y autorizar publicación por separado. No tocar DNS, dominios, remoto ni secretos desde este plan.

## Riesgos y datos que faltan

| Necesidad | Momento de cierre | Alternativa honesta |
| --- | --- | --- |
| Aprobación de dirección creativa y arquitectura | Antes de cambios importantes | Mantener esta entrega como propuesta |
| Söhne WOFF2 y licencia web; SVG trazado oficial | Antes de cierre visual definitivo | Inter temporal documentada y PNG oficial |
| Proyectos, capturas, alcance real y permisos de publicación | Antes de casos comerciales | Atria/Pulse/Aura etiquetados como conceptos |
| Confirmación de Gabi/Alex, roles, bios y fotos opcionales | Antes de publicar perfiles | Filosofía del estudio sin personas inventadas |
| Email de recepción, canal de envío y proveedor | Antes de contacto web funcional | Mailto explícito al email confirmado |
| Titular, identificación, conservación y proveedores | Antes de captación comercial | Documentación interna pendiente; no certificar cumplimiento legal |
| Origen canónico y configuración Cloudflare/GitHub Pages | Antes de preview remota y migración | Revisión local; configuración remota sin tocar |

Puede avanzar la implementación local con dirección aprobada, Inter temporal y conceptos claramente identificados. La falta de fotos de equipo o clientes no obliga a inventarlos. No pueden darse por cerrados marca definitiva, recepción web, legal o release sin resolver sus dependencias.

Referencias técnicas: [Next.js export estático](https://nextjs.org/docs/app/guides/static-exports), [Cloudflare Pages estático](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/). La elección conserva capacidades verificadas del repositorio y evita una migración de stack innecesaria.
