"use client";

import { TemplateImage as Image } from "@/components/templates/template-image";
import { useDemoConfig, DemoContact } from "@/components/templates/demo-context";
import { withBasePath } from "@/lib/base-path";

const menu = [
  { name: "Para empezar", items: ["Ostra, manzana verde y aceite de hierbas", "Tomate de temporada, almendra y albahaca", "Puerro asado, avellana y caldo tostado"] },
  { name: "En la mesa", items: ["Pescado del día, hinojo y cítricos", "Arroz meloso de setas de temporada", "Corte de vaca, patata y jugo reducido"] },
  { name: "El final", items: ["Pera, vainilla y crema ligera", "Chocolate, aceite de oliva y sal"] },
];

export function AtriaDemo() {
  const config = useDemoConfig();
  return <>
    <header className="atria-header"><a href="#inicio" className="atria-logo">{config.business}<span>RESTAURANTE</span></a><nav aria-label="Navegación de Atria"><a href="#concepto">El restaurante</a><a href="#carta">La carta</a><a href="#espacio">El espacio</a></nav><details className="demo-mobile-nav"><summary>Menú</summary><div><a href="#concepto">El restaurante</a><a href="#carta">La carta</a><a href="#espacio">El espacio</a><a href="#reservas">Reservas</a></div></details><a className="atria-reserve" href="#reservas">Reservar mesa ↗</a></header>
    <section className="atria-hero" id="inicio"><div className="atria-hero-image"><Image src={withBasePath("/templates/atria.webp")} alt="Ambiente de restaurante dispuesto para la cena" fill priority sizes="100vw" /></div><div className="atria-hero-content"><p>UNA COCINA PARA COMPARTIR EL TIEMPO</p><h1>{config.headline}</h1><a href="#carta">Descubre la carta <span aria-hidden="true">↓</span></a></div><span className="atria-side-note">UNA DEMOSTRACIÓN VISUAL · DATOS ILUSTRATIVOS</span></section>
    <section className="atria-intro demo-wrap" id="concepto"><div className="atria-intro-label">Cocina · Espacio · Encuentro</div><div><h2>Hay lugares que invitan a quedarse.</h2><p>En {config.business} encontramos una cocina que escucha a la estación y una mesa donde cada detalle tiene su momento. Producto, oficio y hospitalidad en equilibrio.</p><a href="#reservas">Ven a conocernos ↗</a></div></section>
    <section className="atria-menu" id="carta"><div className="demo-wrap"><div className="atria-section-heading"><div><span>LA CARTA</span><h2>Lo esencial,<br /><em>bien hecho.</em></h2></div><p>Nuestra carta sigue el ritmo de la temporada. Pregúntanos por las sugerencias del día y las opciones para compartir.</p></div><div className="atria-menu-grid">{menu.map((group) => <div key={group.name}><h3>{group.name}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div></div></section>
    <section className="atria-space" id="espacio"><div className="atria-space-image"><Image src={withBasePath("/templates/atria_space.webp")} alt="Comedor contemporáneo dispuesto para recibir comensales" fill sizes="(max-width: 767px) 100vw, 55vw" /></div><div className="atria-space-copy"><span>EL ESPACIO</span><h2>Una pausa para encontrarse.</h2><p>Luz natural, materiales honestos y una atmósfera pensada para conversaciones largas. La experiencia empieza antes del primer plato.</p><a href="#reservas">Planea tu visita ↗</a></div></section>
    {config.showDetails && <section className="atria-gallery demo-wrap" aria-label="Galería de Atria"><div><span>EN IMÁGENES</span><h2>El lugar también cuenta la historia.</h2></div><figure><Image src={withBasePath("/templates/atria_gallery.webp")} alt="Sala de restaurante preparada para el servicio" fill sizes="(max-width: 767px) 100vw, 60vw" /></figure><figure><Image src={withBasePath("/templates/atria.webp")} alt="Mesa de restaurante durante una comida" fill sizes="(max-width: 767px) 100vw, 35vw" /></figure></section>}
    <section className="atria-book demo-wrap" id="reservas"><span>TE ESPERAMOS</span><h2>La mejor ocasión es encontrarnos.</h2><p>Una cena especial, una comida entre amigos o una mesa para dos. Cuéntanos cuándo te gustaría venir y prepararemos tu visita.</p><DemoContact label="Consultar disponibilidad" /></section>
    <footer className="atria-footer"><span>{config.business}</span><p>Demo conceptual creada por Nuvora · Fotografía ilustrativa</p><a href="#inicio">Volver arriba ↑</a></footer>
  </>;
}
