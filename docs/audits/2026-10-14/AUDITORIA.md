# Nuvora — Auditoría del repositorio y la web publicada

Fecha: 14 de octubre de 2026. Fase 0. Base: `493b33c2b78542605ad2fd2a281ea24ff1108e11`. Rama de trabajo: `codex/nuvora-redesign-plan`.

## Alcance y método

Inventario de archivos versionados, configuración, rutas, componentes, CSS, contenido, demos y comprobaciones existentes. Lectura de la guía oficial DOCX mediante OOXML y de la licencia del ZIP tipográfico externo. Inspección de la web pública en navegador, estilos calculados, capturas de home, menú móvil y validación vacía de contacto. Peticiones HTTP a 16 rutas existentes y una inexistente. Sin envío de consultas, cambios de producción, acceso a secretos, commits ni push.

El informe de septiembre `docs/AUDITORIA_Y_ROADMAP.md` describe una carpeta entonces vacía: es histórico, no representa el estado actual. No existe `AGENTS.md` dentro del checkout ni en su directorio padre; se aplican las instrucciones facilitadas en el chat. No hay `graphify-out` que reutilizar; no se incorpora tooling de grafos para este diagnóstico.

## Stack y arquitectura verificados

- Next.js 16.3.4, React/React DOM 19.3.0, TypeScript estricto, ESLint 9 y CSS nativo; Geist como dependencia tipográfica. pnpm 11.19.0 con lockfile.
- App Router; layout corporativo en `src/app/(site)/layout.tsx`. Demos fuera de este layout en `src/app/plantillas/[slug]/demo/page.tsx`.
- `next.config.ts`: exportación estática a `out`, `trailingSlash`, `basePath` configurable y optimización de imágenes desactivada. No hay backend de contacto ni API de envío.
- Componentes reutilizables: Container, PageIntro, Header, Footer, DesktopNav, MobileMenu, BrandMark, TextLink, ContactForm.
- Catálogo tipado en `src/templates/registry.ts`; Atria, Pulse y Aura tienen fichas, demos, personalizador e iframe. El intercambio de configuración comprueba origen y emisor; el parser limita textos y valida email, teléfono, paleta y acento.
- Metadata global, OG, favicon, robots y sitemap existen. Estados loading, error y 404 también.

## Arquitectura actual y huecos

| Existe | Carencia frente al encargo |
| --- | --- |
| `/` | Narrativa comercial ya próxima al brief; falta presentación del estudio y selección editorial de casos |
| `/services` | Sin URLs españolas ni páginas individuales; rediseño carece de recorrido propio |
| `/about` | Gabi y Alex figuran como desarrolladores; confirmar nombres, roles y autorización antes de ampliar biografías |
| `/contact` | Mailto explícito; falta web actual y envío desde la web |
| `/plantillas`, tres fichas y tres demos | Conceptos identificados; no acreditan clientes ni resultados comerciales |
| Tres rutas legales | Aviso y privacidad son borradores; cookies tiene texto breve |
| — | Faltan `/proyectos`, casos, `/proceso`, `/estudio`, `/contacto` y detalle de servicios |

La base técnica se conserva. El rediseño debe cambiar la jerarquía de contenido y la composición, no reiniciar el proyecto.

## Hallazgos por prioridad

| Prioridad | Evidencia y ubicación | Acción propuesta |
| --- | --- | --- |
| Alta | Sitemap público: ocho URLs `http://localhost:3000`; OG de home también usa localhost. Fallback en layout/sitemap; `.env.example` solo define localhost | Origen explícito por entorno, validación de URL en build de publicación, canonical por ruta y sitemap coherente |
| Alta | `.github/workflows/deploy-pages.yml` despliega en GitHub Pages al hacer push a main y usa `/Nuvora`; no define `NEXT_PUBLIC_SITE_URL` | Confirmar qué integración produce Cloudflare y si GitHub Pages sigue en uso. No tocar workflow sin autorización |
| Alta | ContactForm abre `mailto:nuvora.studio@outlook.com`; no existe servicio de recepción | Mantener email real como alternativa. Preparar formulario solo con entrega verificable, sin mensaje de éxito ficticio |
| Alta | Aviso legal y privacidad contienen identificación, conservación y proveedor pendientes | Completar con datos del titular y revisar con responsable competente antes de captación comercial |
| Media | Tokens declaran Geist; `.site-shell` sustituye display, cuerpo y mono por Inter. En producción h1 usa Inter y body usa Geist | Recuperar separación Söhne / Inter / IBM Plex Mono y asignar familia al contenedor correcto; evitar cargas redundantes |
| Media | Home y catálogo usan tres previews equivalentes; header prioriza Demos; no hay casos ni página de proceso | Priorizar Servicios, Proyectos, Estudio y Proceso; composición editorial de trabajo y explicación del rediseño |
| Media | `images.unoptimized: true`: `sizes` no crea derivados responsive; PNG de marca de 1,9 y 2,3 MB en public | Derivados reales WebP/AVIF y tamaños apropiados antes de publicación; conservar originales |
| Media | Formulario vacío marca cinco errores pero deja foco en Preparar email; role=status aparece condicionalmente. Presupuesto y plazo añaden preguntas | Resumen accesible estable, foco al primer error, límites y seis campos del brief; presupuesto/plazo fuera del primer contacto |
| Media | CSS compartido incluye templates en RootLayout; valores de spacing y gris fuera de tokens | Acotar CSS de catálogo a su layout cuando proceda y normalizar el shell sin alterar identidades de las demos |
| Baja | Test ejecuta TypeScript directamente y Node avisa MODULE_TYPELESS_PACKAGE_JSON; CI usa Node 22 y local 24.18.0 | Comprobar versión exacta de Node 22 compatible con esta ejecución. Evitar cambiar todo el package a ESM solo para suprimir aviso |

No se han corregido estos problemas: esta entrega es auditoría y propuesta.

## Identidad y activos

Fuente oficial reconsultada: `C:\Users\alexv\Downloads\Nuvora\Nuvora_Guia_de_Estilos.docx`, Brand System v3. La guía no está versionada en el proyecto; el informe anterior referencia esta ruta. Existe PDF vecino, no se ha comparado visualmente con el DOCX.

Paleta, retícula 4/8/12 columnas, container 1440px, spacing 4–128px, radios 8/12/20/28px, motion 160/240/450ms y logo como arte oficial son la referencia. Mantener originales y documentar cualquier excepción.

`public/brand/lockup-light.png` e `isotype.png` coinciden por SHA256 con los PNG oficiales externos. No reconstruir el wordmark. El SVG externo contiene texto dependiente de TestSohne-Halbfett y colores #4E6FFB/#66DAFB, distintos de los tokens oficiales. Solicitar SVG trazado aprobado; no recolorear silenciosamente. El ZIP incluye OTF de prueba y licencia Personal Use Only, sin WOFF2: no acredita uso web comercial. Inter está integrado; IBM Plex Mono no está incorporado como familia efectiva.

Las cintas abstractas son arte de marca generado, según README; no son proyectos. Las fotografías de demos proceden de Unsplash y tienen IDs en `docs/PLANTILLAS.md`; no certifican negocios reales ni autorizaciones de clientes. No hay material de casos comerciales verificado ni fotografías del equipo.

## Evidencia visual y comportamiento

Capturas: [home desktop](home-desktop.png), [home móvil](home-mobile.png). Viewports solicitados: 1440×900 y 390×844. La captura desktop guardada abarca la página; la móvil muestra el primer viewport. La primera operación de captura completa devolvió timeout; la repetición permitió guardar archivos e inspeccionarlos. No se usa este incidente para diagnosticar rendimiento del sitio.

Primera impresión: se entiende que es un estudio web y el contacto es claro. El hero concentra la atención en el titular y la cinta azul. La dirección es oscura y tipográfica, pero las demos y los bloques repetidos de principios/estándar sustituyen a una demostración editorial del trabajo. La home explica cualidades más veces de las que muestra decisiones concretas de proyecto. Propuesta: unir diferenciación y calidad a metodología y casos, sin multiplicar secciones equivalentes.

Estilos medidos: h1 usa Inter; body GeistSans; botón tiene texto rgb(11,13,16) sobre rgb(91,124,250). Esta combinación evita el problema del blanco sobre azul recogido en la guía: conservar tinta oscura en CTA y registrar la excepción accesible. No cambiar los colores de marca.

Home: sin overflow detectado a ambos anchos. Contacto: sin overflow en móvil. Menú: aria-expanded cambia correctamente, Escape cierra y devuelve foco a Menú. Consola de home: cero warnings/errores en el registro observado; no certifica todas las rutas. El envío vacío de contacto produce cinco errores y aviso, sin transmisión de datos. No se probó una consulta válida ni se abrió el cliente de correo.

## Despliegue y riesgos

Cloudflare sirve correctamente las rutas existentes (HTTP 200) y devuelve 404 para `/auditoria-ruta-inexistente/`. La configuración remota de Cloudflare, variables, ramas, DNS, secretos y SHA desplegado no se han inspeccionado. Coincidir en contenido no demuestra igualdad de commit.

No hay wrangler, Functions, `_headers` ni `_redirects` versionados. La exportación actual es compatible con Cloudflare Pages: conservar `out`, evitar introducir SSR, Server Actions o Route Handlers dinámicos como si funcionaran en hosting estático. El optimizador de imágenes por defecto tampoco está disponible en este modo. Fuentes técnicas consultadas el 14/10/2026: [Next.js static export](https://nextjs.org/docs/app/guides/static-exports), [Cloudflare Pages para Next estático](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/).

El riesgo principal es publicar una mejora visual que mantenga SEO inválido, contacto sin recepción y datos legales incompletos. Otros riesgos: romper URLs de correos antiguos, confundir conceptos con clientes, perder personalización de demos o redistribuir fuentes sin licencia. El plan asociado establece puertas de cierre para cada uno.

## Validación de la base

| Comprobación | Resultado real |
| --- | --- |
| `pnpm typecheck` | PASS |
| `pnpm lint` | PASS |
| `pnpm build` | PASS; 20 páginas estáticas generadas, sin cambio de variables |
| `pnpm test:templates`, repetido después del build | PASS; tres fichas/demos, metadata, assets y parser; warning de módulos ya descrito |
| HTTP público: home, servicios, estudio actual, contacto, catálogo, tres fichas, tres demos, tres legales, robots, sitemap | PASS de disponibilidad: 16 rutas 200; no significa contenido/SEO correcto |
| Ruta inexistente | PASS: HTTP 404 |
| Responsive inicial / Escape | PASS del alcance descrito |
| SEO de origen público | FAIL: localhost en sitemap y OG; sin canonical observado en home/contacto |
| WCAG completa, axe, zoom, lector de pantalla, todos los enlaces y controles | NOT RUN |
| Lighthouse, bundles comprimidos, CWV de campo, dispositivos físicos | NOT RUN |
| Entrega de email, seguridad de un futuro endpoint, configuración remota de hosting | NOT RUN / integración pendiente |

Conservar: stack, tokens correctos, logos PNG, utilidades de rutas, componentes semánticos, menú, demo parser y aislamiento de demos. Mejorar: asignación tipográfica, SEO, media, contacto y organización CSS. Sustituir: composición corporativa, arquitectura comercial y presentación uniforme del trabajo. Ninguna reescritura del motor de demos se justifica en esta fase.
