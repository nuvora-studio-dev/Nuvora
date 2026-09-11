# Nuvora — Auditoría y roadmap

Fecha: 11 de septiembre de 2026. Alcance: diagnóstico y propuesta; ninguna implementación de la web.

## 1. Conclusión y evidencia

La ruta `C:\Users\alexv\Documents\Desarrollo\GitHub\Nuvora` estaba vacía, incluidos archivos ocultos: `Get-ChildItem -Force` devolvió 0 entradas. `git status --short` y `git branch --show-current` devolvieron `fatal: not a git repository (or any of the parent directories): .git`.

No es todavía un repositorio inicializado. No existe una aplicación que conservar, refactorizar, ejecutar o medir. Esta auditoría cubre íntegramente la carpeta indicada; no presupone que exista otro checkout remoto.

| Área solicitada | Estado verificado |
| --- | --- |
| Stack y versiones | No hay framework, runtime declarado ni versiones fijadas |
| Arquitectura y estructura | Sin archivos ni directorios iniciales |
| Dependencias | Sin manifiesto, lockfile ni instalación local |
| Configuración | Sin TypeScript, lint, build, CI, variables de entorno ni configuración de hosting |
| Estilos y componentes | No existen CSS, tokens, layout ni componentes |
| Assets en el repositorio | Ninguno; los suministrados están en Downloads |
| Responsive | No evaluable: no existe interfaz |
| SEO | Sin páginas, metadata, canonical, sitemap ni robots |
| Accesibilidad | Sin DOM ni interacciones que comprobar; sí se revisaron combinaciones de marca |
| Performance | Sin build, bundles ni URL local; no se pueden afirmar métricas |
| Deuda técnica | Sin código heredado; pendientes de arranque e inconsistencias de assets |
| Conservar / refactorizar | No hay código. Conservar identidad y originales; preparar derivados aprobados |

No se inicializó Git, no se instalaron dependencias y no se controlaron aplicaciones externas. Este informe es el único archivo creado.

## 2. Fuentes y alcance de marca

Se extrajo el texto completo de párrafos y tablas del DOCX mediante OOXML. Se inspeccionaron los PNG suministrados visualmente y sus dimensiones, transparencia, colores y límites mediante Pillow. Se analizó la estructura del SVG y el inventario/licencia del ZIP. No se renderizó el DOCX ni se abrió el maestro Illustrator: no se certifican su maquetación o sus mesas de trabajo.

Fuente visual: `C:\Users\alexv\Downloads\Nuvora\Nuvora_Guia_de_Estilos.docx`, Brand System v3.0, septiembre de 2026. El documento describe un estudio digital de desarrollo, diseño y tecnología. Es contexto de marca; no confirma servicios comercializados, clientes, productos o claims públicos. La mención a Nuvora.com tampoco acredita el dominio de producción.

Las instrucciones operativas del encargo prevalecen sobre el documento. Su checklist no autoriza desarrollar páginas, publicar, usar herramientas externas ni incorporar dependencias automáticamente.

### Sistema que debe conservarse

- Dark-first, composición editorial predominantemente a izquierda, asimetría controlada y espacios amplios.
- Fondos: `#0B0D10`, `#151922`, `#232935`. Texto: `#F4F7FB`, `#A7B0BC`.
- Marca: azul `#5B7CFA`, cian `#7DE2FF`. Estados: success `#3DDC97`, warning `#F4C95D`, danger `#FF6B6B`.
- Modo claro documentado: fondo `#F4F7FB`, superficie `#FFFFFF`, texto `#0B0D10`, secundario `#5F6B7A`, borde `#DDE3EC`, acento `#4F70F6`. No implica implementar selector de tema.
- Gradiente autorizado: `linear-gradient(135deg, #5B7CFA 0%, #7DE2FF 100%)`; uso excepcional.
- Display Söhne, cuerpo/UI Inter, datos IBM Plex Mono. Wordmark como arte vectorial, nunca reconstruido con texto HTML.
- Display XL 3.75–8rem; H1 2.75–5.5rem; H2 2–3.75rem; H3 1.5–2rem; cuerpo 1–1.125rem. Máximo tres pesos visibles por composición. Escalas fluidas a validar con copy real, especialmente a 320px.
- Espaciado: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px. Radios: 8, 12, 20, 28px; pill 999px solo donde corresponda.
- Grid: 4 columnas bajo 768px, 8 entre 768 y 1279px, 12 desde 1280px; ancho máximo 1440px. Márgenes móviles 20–24px. Texto largo 65–75 caracteres.
- Motion base: 160/240/450ms; curvas `.2,.8,.2,1`, `.16,1,.3,1`, `.4,0,1,1`. Transform y opacity; hover máximo 1–2px; contenido legible sin animación.
- Lucide es la gramática de iconografía de la guía. Incorporar solo los iconos necesarios cuando exista un uso funcional; no instalar una biblioteca por anticipado.

### Inventario de assets externos

| Archivo | Evidencia | Aptitud actual |
| --- | --- | --- |
| Isotipo.png | 2172×724, RGBA, 20.530 bytes | Referencia transparente; símbolo ocupa solo parte del lienzo |
| Lockup horizontal.png | 2172×724, RGBA, 34.777 bytes | Isotipo en color y wordmark negro |
| Logo principal.png | 2172×724, RGBA, 22.848 bytes | Wordmark negro |
| Versión monocroma clara.png | 2172×725, RGBA, 33.505 bytes | Wordmark blanco e isotipo en dos colores; no es monocroma |
| Logotipo-principal.svg | 7.323 bytes; viewBox 0 0 1288.34 404.43 | Incluye paths y texto dependiente de TestSohne-Halbfett |
| Logos Nuvora.ai | 70.954 bytes | Maestro disponible; contenido interno no validado |
| sohne-font-family.zip | 451.651 bytes; variantes OTF TestSohne | Licencia incluida: Personal Use Only; sin WOFF2 |
| Nuvora_Guia_de_Estilos.docx | 78.772 bytes; una imagen embebida | Referencia oficial v3 |

### Hallazgos prioritarios

1. **Fuentes no listas para producción.** El ZIP no acredita licencia comercial/web. Obtener archivos web autorizados y comprobar pesos necesarios. La guía ya define Inter como fallback de display; puede usarse temporalmente, identificando esa limitación. No publicar las OTF de prueba. Inter e IBM Plex Mono tampoco se suministraron como archivos.
2. **SVG no autocontenido.** El wordmark depende de una fuente externa. Solicitar/exportar desde el maestro autorizado una versión trazada, conservando proporciones y kerning. No redibujarlo manualmente.
3. **Colores discrepantes.** PNG y SVG usan `#4E6FFB` y `#66DAFB`; la guía exige `#5B7CFA` y `#7DE2FF`. Aprobar la normalización en derivados o documentar una excepción de logo. No recolorear originales silenciosamente.
4. **Variante clara mal nombrada.** Separar color con wordmark claro de una auténtica versión de una tinta. No asumir que ya se dispone de todas las construcciones SVG.
5. **Lienzos amplios.** El isotipo visible ocupa `(868,183)–(1304,541)` dentro de 2172×724. El tamaño CSS del archivo no representa el tamaño visible. Preparar derivados con área de seguridad explícita: 25% de la altura del isotipo y 0,5X para lockups. Verificar favicon por separado.
6. **Conflicto de contraste en botones.** Blanco `#FFFFFF` sobre azul `#5B7CFA`: 3,68:1; Cloud `#F4F7FB`: 3,42:1. No alcanzan 4,5:1 para texto normal. Propuesta pendiente: texto `#0B0D10` sobre azul, 5,29:1, preservando paleta. Documentar la excepción a “texto blanco” en botones. Texto muted sobre fondo principal: 8,88:1. Estas mediciones no certifican toda la futura UI.
7. **Contenido pendiente.** Confirmar público, oferta, diferenciación, objetivo de conversión, proyectos publicables, contacto, idiomas y dominio. No inventar testimonios, cifras ni navegación hacia páginas inexistentes.

## 3. Arquitectura propuesta para aprobación

Recomiendo Next.js App Router, React y TypeScript estricto para el crecimiento previsto hacia una plataforma pública. Páginas prerenderizadas cuando el contenido lo permita; componentes de servidor por defecto y pequeñas fronteras cliente para interacciones reales. CSS Modules y variables CSS evitan sumar un framework visual y permiten traducir la guía directamente.

Es una elección propuesta, no un stack detectado. Si el producto se limita de forma duradera a contenido editorial estático, Astro merece preferencia por su arquitectura de islas y menor hidratación. Resolver este punto antes del scaffold; no desarrollar ambos caminos.

Referencias técnicas consultadas: [App Router](https://nextjs.org/docs/app), [Server y Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components), [metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), [islas de Astro](https://v6.docs.astro.build/en/concepts/islands/).

Propuesta de herramientas: pnpm con lockfile y versión fijada; runtime compatible declarado; ESLint, typecheck separado y build reproducible. Fijar versiones estables y compatibles al aprobar el arranque, verificando soporte y avisos de seguridad entonces. No se atribuyen números de versión a un proyecto inexistente.

Estructura inicial propuesta, creando cada pieza cuando se utilice:

```text
src/
  app/                 # routing, layout, metadata y límites de error
  components/
    layout/            # Container, Header, Navigation, Footer
    ui/                # Button, enlace y Logo
  content/             # configuración editorial y contenido tipado
  styles/
    tokens.css         # valores primitivos y semánticos oficiales
    globals.css        # reset mínimo, base, foco y reduced motion
  lib/                 # utilidades realmente compartidas
public/
  brand/               # derivados aprobados
  fonts/               # únicamente archivos autorizados
tests/                 # pruebas de comportamiento y responsive
docs/                  # decisiones, marca, QA y contenido pendiente
```

No crear aún ProjectPreview, Feature, CMS, backend, autenticación, tienda o WebGL. Añadirlos solo cuando exista un requisito confirmado. No montar un catálogo de componentes sobredimensionado.

### Contrato de foundations

- Tokens primitivos y semánticos: color de acción/texto/foco, tamaños, spacing, radios, container, capas y motion. Los z-index no están definidos en la guía: proponer una escala corta para header, overlay y menú, identificada como decisión técnica.
- Breakpoints documentados desde la retícula; los puntos de 1024 y 1440 ajustan márgenes. No confundir los ocho anchos de QA con ocho breakpoints obligatorios. Las variables CSS normales no se usan directamente en condiciones de media queries.
- Container con padding protegido; medidas de lectura separadas del ancho del grid; tipografía fluida sin forzar saltos de línea específicos de desktop.
- Button para acciones y enlaces para destinos reales; variantes pequeñas; focus-visible; estados hover, active, disabled y loading sin cambio de geometría.
- Header semántico con skip link y navegación corta. Menú móvil con nombre accesible, estado expandido, Escape y devolución del foco; contención de foco solo si se implementa como modal.
- Footer con información verificada. No fabricar dirección, razón social, enlaces legales o redes.
- Motion CSS primero, mejora progresiva y contenido visible si falla JavaScript; reduced motion desactiva desplazamientos y esperas innecesarias.
- Metadata base y por página; idioma correcto, títulos únicos, descripción real, canonical dependiente de dominio confirmado, OG y favicon aprobados. Sitemap solo con rutas públicas; entornos de prueba no indexables. Robots no sustituye control de acceso.
- Imágenes con dimensiones intrínsecas y tamaños responsive; prioridad solo para recurso LCP, lazy loading bajo el primer viewport. Fuentes locales autorizadas, subconjuntos y preload mínimo.

## 4. Roadmap ejecutable

| Fase | Entrega y alcance | Criterio de cierre |
| --- | --- | --- |
| 0 — Decisiones | Aprobar stack, objetivo de conversión, idioma inicial y tratamiento de discrepancias de marca | Decisiones registradas; faltantes identificados sin hechos inventados |
| 1 — Base técnica | Scaffold mínimo, TypeScript estricto, scripts, lockfile, configuración y README | typecheck, lint y build pasan; ejecución local reproducible |
| 2 — Marca y tokens | Tokens oficiales, fuentes autorizadas o fallback explícito, derivados de logo, containers, escala responsive | Contraste validado; assets sin fuentes externas; escala legible en ocho anchos |
| 3 — Shell y UI | Layout, header, navegación móvil, footer, botones/enlaces, foco y motion mínimo | Teclado, Escape, retorno de foco, reduced motion y targets verificados; sin destinos ficticios |
| 4 — SEO y puerta de calidad | Metadata, estados 404/error pertinentes, políticas de indexación, pruebas del shell y presupuesto de carga | Foundations verificadas antes de páginas completas; checks disponibles pasan |
| 5 — Narrativa y wireframes | Brief editorial, sitemap y secuencia continua de Home; composición móvil y desktop | Copy pendiente señalado; estructura aprobada antes de acabado visual |
| 6 — Home | Introducción y narrativa con contenido aprobado, sin patrón de secciones prefabricado | Comprensión clara de Nuvora, responsive completo y navegación funcional |
| 7 — Crecimiento | Servicios/capacidades, trabajo real, about y contacto, una ruta por iteración | Datos verificables, estados completos y pruebas relevantes por ruta |
| 8 — Revisión de producción | QA transversal, assets finales, SEO, seguridad de configuración y rendimiento | Evidencias registradas; publicación solo mediante autorización independiente |

Dependencias: no bloquear tokens y shell por copy de proyectos; sí bloquear el wordmark final por el vector correcto y la fuente comercial por licencia. Contacto puede prepararse visualmente antes de elegir envío; ningún formulario debe simular un envío real. La arquitectura no debe anticipar backend sin una necesidad concreta.

## 5. Validación prevista y estado actual

Actual: inventario de carpeta y Git comprobado; texto de guía leído; ocho archivos externos inventariados; PNG, SVG y licencia revisados; contraste calculado. Typecheck, lint, tests y build: **NO EJECUTABLES**, no existen proyecto ni scripts. Responsive, teclado, Lighthouse y Core Web Vitals: **NO EVALUABLES**, no existe interfaz. No se presentan como PASS.

En cada fase con código: typecheck, lint, tests existentes relevantes y build; corregir regresiones antes de avanzar. Añadir pruebas de comportamiento significativas para menú, foco y navegación; evitar tests que solo repitan tokens. Herramientas de test se incorporarán justificadas en la fase correspondiente.

Matriz obligatoria: 320, 375, 430, 768, 1024, 1280, 1440 y 1920px. Comprobar scroll horizontal, texto, menú, targets de al menos 44×44px como criterio del proyecto, foco, lectura y media. Añadir zoom 200%, cadenas largas, reduced motion y fallo/desactivación de JavaScript. Auditoría automática de accesibilidad complementada con teclado y revisión manual.

Presupuesto inicial propuesto: sin JS de animación en foundations; nada de fuentes completas o dependencias pesadas sin medición; evaluar bundles comprimidos y recursos por ruta en build de producción. Objetivos de experiencia: LCP ≤2,5s, INP ≤200ms y CLS ≤0,1. Son objetivos, no resultados. Las pruebas de laboratorio permiten detectar problemas; la confirmación con datos de campo necesitará tráfico real tras una publicación autorizada.

## 6. Próximo incremento

El siguiente trabajo es aprobar la arquitectura y resolver el contrato mínimo de marca para comenzar las fases 1–2. No hace falta cerrar todos los servicios para preparar foundations. Sí hace falta evitar que fuentes de prueba, logos discrepantes y combinaciones de contraste insuficiente se conviertan en decisiones permanentes.
