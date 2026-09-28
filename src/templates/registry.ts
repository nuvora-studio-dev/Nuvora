export const templates = {
  atria: {
    slug: "atria", name: "Atria", category: "Restaurantes", status: "published", order: 1,
    headline: "El placer de estar aquí.",
    tagline: "Una mesa que merece tiempo.",
    description: "Dirección editorial para restaurantes que convierten la cocina, el espacio y la hospitalidad en una experiencia propia.",
    cover: "/templates/atria.jpg", detailImage: "/templates/atria_space.jpg",
    coverAlt: "Mesa de restaurante preparada para una experiencia gastronómica",
    detailAlt: "Comedor contemporáneo dispuesto para recibir comensales",
    tags: ["Editorial", "Gastronomía", "Reservas"],
    pages: ["Inicio", "La carta", "El espacio", "Reservas"],
    features: ["Carta organizada por momentos", "Galería fotográfica", "Enlaces de reserva y contacto", "Navegación adaptable"],
    theme: "editorial oscuro", seoTitle: "Atria — diseño para restaurantes",
  },
  pulse: {
    slug: "pulse", name: "Pulse", category: "Fitness", status: "published", order: 2,
    headline: "Más fuerte. Cada día.",
    tagline: "Entrena con intención.",
    description: "Una presencia directa y enérgica para espacios de entrenamiento con método, comunidad y una propuesta clara.",
    cover: "/templates/pulse.jpg", detailImage: "/templates/pulse_train.jpg",
    coverAlt: "Sala de entrenamiento equipada para sesiones de fuerza",
    detailAlt: "Entrenamiento de fuerza en gimnasio",
    tags: ["Energía", "Clases", "Inscripciones"],
    pages: ["Inicio", "Programas", "Equipo", "Visítanos"],
    features: ["Presentación de programas", "Equipo de entrenadores", "Horarios orientativos", "Contacto para inscripción"],
    theme: "alto contraste", seoTitle: "Pulse — diseño para fitness",
  },
  aura: {
    slug: "aura", name: "Aura", category: "Belleza", status: "published", order: 3,
    headline: "Sentirse bien se nota.",
    tagline: "El cuidado tiene su espacio.",
    description: "Una experiencia serena para estudios de bienestar y estética que quieren mostrar su criterio, sus tratamientos y su espacio.",
    cover: "/templates/aura.jpg", detailImage: "/templates/aura_space.jpg",
    coverAlt: "Tratamiento facial aplicado en un estudio de belleza",
    detailAlt: "Sesión de masaje en un estudio de bienestar",
    tags: ["Bienestar", "Tratamientos", "Citas"],
    pages: ["Inicio", "Tratamientos", "Estudio", "Citas"],
    features: ["Listado de tratamientos", "Presentación del estudio", "Información sobre el equipo", "Solicitud de cita"],
    theme: "serenidad mineral", seoTitle: "Aura — diseño para bienestar",
  },
} as const;

export type TemplateSlug = keyof typeof templates;
export const templateList = Object.values(templates).sort((a, b) => a.order - b.order);

export function getTemplate(slug: string) {
  return templates[slug as TemplateSlug];
}
