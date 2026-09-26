# Plantillas de Nuvora

El catálogo, las fichas y las demos viven en este proyecto Next.js. `src/templates/registry.ts` es la fuente de datos de las fichas; las rutas de `src/app/(site)/plantillas` generan el catálogo y las fichas. Las demos usan `src/app/plantillas/[slug]/demo` fuera del layout corporativo.

## Añadir una plantilla

1. Crear `src/templates/<slug>/demo.tsx` con la web demo, navegación propia y contenido de muestra claramente identificado. Sus enlaces internos deben funcionar.
2. Guardar fotografías optimizadas en `public/templates` y registrar su origen en este documento. Usar `next/image`, `sizes` y textos `alt` descriptivos.
3. Añadir una entrada a `src/templates/registry.ts` con slug, categoría, orden, descripción, imágenes, páginas, funciones, tema y título SEO. El catálogo, la ficha, las URLs y la metadata consumen esa entrada.
4. Registrar el componente de demo en `src/app/plantillas/[slug]/demo/page.tsx`. Añadir estilos acotados a `.demo-<slug>` en `src/styles/demos.css` o en una hoja específica cargada solo por esa ruta. No introducir estilos globales que afecten a Nuvora.
5. Ejecutar `pnpm typecheck`, `pnpm lint`, `pnpm build` y `pnpm test:templates`. Revisar catálogo, ficha, demo y formulario de contacto en escritorio y móvil. Comprobar `noindex` en la demo y canonical a la ficha.

La exportación estática requiere `generateStaticParams` para cada slug. El visor muestra la demo en un `iframe` con anchos de 1440, 768 y 390 píxeles; el desplazamiento ocurre dentro de la vista previa. La opción «Abrir demo completa» ofrece la experiencia sin marco.

El sitemap incluye únicamente el catálogo y las fichas. Configurar `NEXT_PUBLIC_SITE_URL` con la URL pública antes de desplegar para generar canonicals y URLs absolutas correctas; las demos conservan `noindex`.

## Contenido y assets de demostración

Los nombres, platos, programas, tratamientos, textos y testimonio son contenido conceptual, no datos de empresas reales. Sustituirlos antes de adaptar una plantilla a un cliente. El formulario principal abre la aplicación de correo del visitante: no hay backend de reservas, inscripciones ni citas.

Fotografías temporales procedentes de Unsplash (`images.unsplash.com`), descargadas a tamaño máximo de 1400 píxeles y calidad 78. Conviene sustituirlas por fotografías con derechos confirmados y acordes con cada cliente:

| Archivo | ID de fotografía Unsplash |
| --- | --- |
| `atria.jpg` | `photo-1414235077428-338989a2e8c0` |
| `atria_space.jpg` | `photo-1517248135467-4c7edcad34c4` |
| `atria_gallery.jpg` | `photo-1550966871-3ed3cdb5ed0c` |
| `pulse.jpg` | `photo-1534438327276-14e5300c3a48` |
| `pulse_train.jpg` | `photo-1517836357463-d25dfeac3438` |
| `aura.jpg` | `photo-1570172619644-dfd03ed5d881` |
| `aura_space.jpg` | `photo-1519823551278-64ac92734fb1` |

## Personalización interactiva
La ficha permite cambiar nombre, titular, paleta, acento, contacto, ubicación y una sección opcional. El visor actualiza la demo mediante mensajes del mismo origen sin recargar el iframe. La URL de demo conserva la configuración; el enlace compartido incluye los datos introducidos. No se almacenan datos en un servidor ni en localStorage.

Los parámetros se validan en `src/templates/personalization.ts`. Las paletas mantienen contraste y el acento usa tinta contrastada; si no es legible sobre el fondo se conserva un color seguro para texto. Cada demo consume `useDemoConfig()` y variables CSS de `DemoExperience`. Añade el titular al registry y las paletas correspondientes al crear una cuarta demo. El CTA transmite la configuración al contacto existente por correo. Las reservas son solicitudes de contacto, sin agenda ni confirmación ficticia.
