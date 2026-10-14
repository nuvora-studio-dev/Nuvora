export const services = [
  {
    slug: "diseno-desarrollo-web",
    name: "Diseño y desarrollo web",
    short: "Una presencia propia, desde el principio.",
    title: "Una web pensada para tu negocio.",
    description:
      "Diseñamos y desarrollamos páginas web que explican lo que haces, reflejan tu identidad y facilitan que tus clientes contacten contigo.",
    context:
      "Para empresas y profesionales que necesitan una web nueva o una base más adecuada para su actividad. Empezamos por entender tu negocio, no por elegir una plantilla.",
    problem:
      "Tu oferta puede ser excelente y, aun así, resultar difícil de entender en internet. Una estructura clara, un diseño propio y una experiencia sencilla ayudan a presentar tu trabajo con el cuidado que merece.",
    includes: [
      "Estructura y organización de contenidos",
      "Dirección visual y diseño de las páginas",
      "Desarrollo adaptable a móvil, tablet y escritorio",
      "Formularios e integraciones acordados en el alcance",
      "Accesibilidad, rendimiento y SEO técnico",
      "Revisión conjunta y preparación de la publicación",
    ],
    approach:
      "Definimos contigo las páginas, los contenidos y las funcionalidades necesarias. Revisamos la dirección de diseño antes de desarrollar, para que las decisiones importantes estén claras desde el inicio.",
    outcome:
      "Una web coherente con tu identidad, con navegación clara y una base técnica que permita mantenerla y hacerla evolucionar. El contenido, las integraciones y las entregas se concretan en la propuesta.",
    note: "Web corporativa · Web de servicios · Portfolio · Página de campaña",
  },
  {
    slug: "rediseno-web",
    name: "Rediseño web",
    short: "Tu negocio ha evolucionado. Tu web también puede hacerlo.",
    title: "Tu web puede representar mejor lo que haces.",
    description:
      "Renovamos páginas web que han quedado atrás en diseño, contenido o funcionamiento. Conservamos lo que aporta valor y replanteamos lo que necesita mejorar.",
    context:
      "Para negocios que ya tienen una web, pero sienten que no refleja su nivel actual. También cuando navegar en móvil resulta incómodo, el contenido se ha desordenado o hacer cambios se ha vuelto difícil.",
    problem:
      "No siempre hace falta empezar de cero. Antes de decidir, revisamos la web actual, su contenido y su tecnología. Así podemos distinguir una mejora concreta de una renovación más profunda.",
    includes: [
      "Revisión de la web actual y definición de prioridades",
      "Reorganización de páginas, navegación y contenidos",
      "Actualización visual respetando la identidad del negocio",
      "Mejora de la experiencia móvil y la accesibilidad",
      "Revisión de carga, recursos y SEO técnico",
      "Plan de migración de URLs y comprobación antes de publicar",
    ],
    approach:
      "Te explicamos qué conservaríamos, qué cambiaríamos y por qué. Acordamos el alcance y una estructura antes de diseñar. La publicación se prepara para cuidar los contenidos, los enlaces existentes y las funcionalidades que siguen siendo útiles.",
    outcome:
      "Una presentación más clara y actual de tu negocio. Un rediseño puede mejorar la experiencia y la calidad técnica; no garantiza un aumento de ventas ni una posición concreta en Google.",
    note: "Diseño · Contenido · Navegación · Móvil · Base técnica",
  },
  {
    slug: "mantenimiento-web",
    name: "Mantenimiento y evolución web",
    short: "Cuidar lo que ya funciona. Mejorar lo que viene.",
    title: "Una buena web necesita continuidad.",
    description:
      "Te ayudamos a mantener tu web al día, corregir incidencias y desarrollar mejoras según las necesidades de tu negocio.",
    context:
      "Para empresas y profesionales con una web en marcha que necesitan apoyo técnico, cambios de contenido o una evolución ordenada. Revisamos primero la tecnología y el estado del proyecto.",
    problem:
      "Los contenidos cambian, las herramientas se actualizan y el negocio crece. Sin una revisión periódica, pequeños problemas pueden hacer que tu web deje de representar bien tu actividad.",
    includes: [
      "Revisión inicial del estado y la tecnología de la web",
      "Correcciones y actualizaciones compatibles con el proyecto",
      "Cambios de contenido y nuevas secciones",
      "Mejoras de rendimiento y accesibilidad",
      "Revisión de formularios, enlaces y funcionalidades",
      "Planificación de mejoras y documentación de los cambios",
    ],
    approach:
      "Acordamos qué tareas necesitas y cómo se atenderán. La frecuencia, los plazos de respuesta, las copias de seguridad y el soporte dependen del alcance y de la plataforma; no damos por incluido lo que no se ha acordado.",
    outcome:
      "Una forma clara de mantener y mejorar tu web, con prioridades compartidas y cambios revisados. Podemos valorar una intervención puntual o un trabajo continuado.",
    note: "Correcciones · Actualizaciones · Contenido · Nuevas funcionalidades",
  },
] as const;

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
