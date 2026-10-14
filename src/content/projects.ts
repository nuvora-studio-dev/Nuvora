import { templates } from "@/templates/registry";

export const projects = [
  {
    ...templates.atria,
    kind: "Concepto de Nuvora",
    intro:
      "Una web de restauración donde el espacio, la carta y el ritmo de lectura construyen una misma experiencia.",
    context:
      "Atria es una demo conceptual desarrollada por Nuvora. Su restaurante, carta y contenidos son ilustrativos; no representa un encargo de un cliente real.",
    challenge:
      "Mostrar una propuesta gastronómica con claridad, sin reducir la experiencia a una sucesión de fotografías. La carta y el contacto debían ser fáciles de encontrar.",
    objectives: [
      "Dar protagonismo al ambiente y a la propuesta gastronómica",
      "Organizar una carta legible por momentos",
      "Conectar presentación, espacio y solicitud de contacto",
    ],
    solution:
      "La página reúne una presentación amplia, una introducción al concepto, una carta organizada, el espacio y una zona de contacto. Los enlaces permiten recorrer cada sección directamente.",
    design:
      "Tipografía serif de gran escala, tonos oscuros y fotografía amplia. Las secciones alternan lectura y pausa visual; la carta utiliza columnas que se apilan en móvil.",
    development:
      "Navegación por secciones, galería y vista responsive. La demo permite personalizar nombre, titular, paleta, acento y contacto desde el visor de Nuvora.",
    result:
      "Una demo navegable y personalizable que permite evaluar esta dirección antes de adaptarla a un negocio. El contacto abre un correo cuando se configura; no hay sistema real de reservas.",
  },
  {
    ...templates.pulse,
    kind: "Concepto de Nuvora",
    intro:
      "Una dirección visual enérgica para presentar programas de entrenamiento sin perder claridad ni estructura.",
    context:
      "Pulse es un concepto de Nuvora para un centro de entrenamiento. Programas, equipo y horarios son datos de demostración, no información de un gimnasio real.",
    challenge:
      "Equilibrar una identidad expresiva con una lectura útil: entender la propuesta, distinguir programas y encontrar una forma de consultar.",
    objectives: [
      "Construir una jerarquía directa y reconocible",
      "Diferenciar los programas de entrenamiento",
      "Mantener una navegación sencilla en móvil",
    ],
    solution:
      "Un titular protagonista introduce el centro. Programas, método, equipo y contacto desarrollan la información a través de secciones enlazadas.",
    design:
      "Titulares compactos y de peso alto, contraste marcado y un acento energético. La fotografía contextualiza la actividad; los bloques de contenido conservan alineaciones claras.",
    development:
      "Enlaces directos a las secciones, presentación de programas y contactos configurables. El personalizador permite probar una identidad distinta y ver los cambios sin recargar la demo.",
    result:
      "Una experiencia de demostración que puede recorrerse y probarse con una identidad distinta. Las consultas son enlaces de contacto; no hay pagos, inscripciones ni gestión de plazas.",
  },
  {
    ...templates.aura,
    kind: "Concepto de Nuvora",
    intro:
      "Una experiencia serena que da espacio al contenido, a los tratamientos y a la identidad de un estudio de bienestar.",
    context:
      "Aura es una demo conceptual para belleza y bienestar. El estudio, sus tratamientos y los textos de ejemplo son ilustrativos; no representan una empresa real.",
    challenge:
      "Transmitir cuidado sin hacer que la información resulte distante. Los tratamientos y la consulta debían formar parte de un recorrido fácil de comprender.",
    objectives: [
      "Presentar tratamientos con una jerarquía legible",
      "Dar a la fotografía un papel de contexto",
      "Facilitar el paso de explorar a consultar",
    ],
    solution:
      "La composición combina una introducción, tratamientos, presentación del estudio y contacto. Los contenidos se ordenan en una narrativa vertical adaptable a distintos dispositivos.",
    design:
      "Una paleta mineral clara, tipografía ligera y márgenes amplios. La fotografía convive con bloques de texto contenidos, sin añadir elementos que compitan con la lectura.",
    development:
      "Secciones navegables, menú adaptable y contacto configurable. Nombre, titular y colores pueden probarse desde el visor; la URL compartida conserva la configuración introducida.",
    result:
      "Una demo funcional para explorar una dirección de bienestar. No se gestionan citas ni se confirman reservas; el enlace de contacto utiliza el email configurado.",
  },
] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
