# Plantillas de Nuvora

El catálogo, las fichas y las demos viven en este proyecto Next.js. `src/templates/registry.ts` es la fuente de datos de las fichas; las rutas de `src/app/(site)/plantillas` generan el catálogo y las fichas. Las demos usan `src/app/plantillas/[slug]/demo` fuera del layout corporativo.

Desde el rediseño del 14/10/2026, los conceptos también tienen un caso explicado en `/proyectos/[slug]`, definido en `src/content/projects.ts`. Es una presentación del trabajo conceptual, no un cliente nuevo ni una atribución de resultados comerciales. Los enlaces de consulta usan `/contacto` y conservan `template` y la configuración.

## Añadir una plantilla

1. Crear `src/templates/<slug>/demo.tsx` con la web demo, navegación propia y contenido de muestra claramente identificado. Sus enlaces internos deben funcionar.
2. Guardar fotografías optimizadas en `public/templates` y registrar su origen en este documento. Generar `nombre.webp` (hasta 1400px) y `nombre-small.webp` (hasta 700px). Usar `TemplateImage`, `sizes` y textos `alt` descriptivos; sirve variantes mediante `picture` y `next/image` sin optimizador dinámico.
3. Añadir una entrada a `src/templates/registry.ts` con slug, categoría, orden, descripción, imágenes, páginas, funciones, tema y título SEO. El catálogo, la ficha, las URLs y la metadata consumen esa entrada.
4. Registrar el componente de demo en `src/app/plantillas/[slug]/demo/page.tsx`. Añadir estilos acotados a `.demo-<slug>` en `src/styles/demos.css` o en una hoja específica cargada solo por esa ruta. No introducir estilos globales que afecten a Nuvora.
5. Ejecutar `pnpm typecheck`, `pnpm lint`, `pnpm build`, `pnpm test:templates`, `pnpm test:contact` y `pnpm test:site`. Revisar catálogo, ficha, demo y formulario de contacto en escritorio y móvil. Comprobar `noindex` en la demo y canonical a la ficha. Para un build no indexable, las dos pruebas del export admiten `--preview`.

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

## Derivados de imágenes

Se conservan los diez JPEG originales. Se generaron veinte WebP (700/1400px, calidad 80, sin ampliar originales), incluidas las capturas de `previews`. `TemplateImage` utiliza `srcSet` en un elemento `source`; `sizes` por sí solo no genera variantes con `images.unoptimized`.

La regeneración puede hacerse con el Sharp que ya depende de Next, sin añadirlo como dependencia directa:

```js
const { createRequire } = require('node:module');
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
// Repetir para cada JPEG; preservar siempre el original.
await sharp('public/templates/atria.jpg')
  .resize({ width: 1400, withoutEnlargement: true })
  .webp({ quality: 80 }).toFile('public/templates/atria.webp');
await sharp('public/templates/atria.jpg')
  .resize({ width: 700, withoutEnlargement: true })
  .webp({ quality: 80 }).toFile('public/templates/atria-small.webp');
```

Ejecutar el ejemplo dentro de una función async de Node. Las capturas son de las demos existentes, y las fotografías siguen siendo ilustrativas con la procedencia indicada arriba.
