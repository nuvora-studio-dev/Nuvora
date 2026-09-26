"use client";

import Image from "next/image";
import { useDemoConfig, DemoContact } from "@/components/templates/demo-context";
import { withBasePath } from "@/lib/base-path";

const treatments = [
  { title: "Ritual facial", detail: "Cuidado personalizado para recuperar equilibrio, hidratación y luminosidad." },
  { title: "Cuerpo en calma", detail: "Técnicas manuales para soltar tensión y volver a sentir el cuerpo con atención." },
  { title: "Tiempo para ti", detail: "Una experiencia completa diseñada alrededor de lo que necesitas hoy." },
];

export function AuraDemo() {
  const config = useDemoConfig();
  return <>
    <header className="aura-header"><a href="#inicio" className="aura-logo">{config.business}<span>STUDIO</span></a><nav aria-label="Navegación de Aura"><a href="#tratamientos">Tratamientos</a><a href="#estudio">El estudio</a><a href="#filosofia">Filosofía</a></nav><details className="demo-mobile-nav"><summary>Menú</summary><div><a href="#tratamientos">Tratamientos</a><a href="#estudio">El estudio</a><a href="#filosofia">Filosofía</a><a href="#citas">Citas</a></div></details><a className="aura-book-link" href="#citas">Pide tu cita ↗</a></header>
    <section className="aura-hero" id="inicio"><div className="aura-hero-copy"><span>UN ESPACIO PARA VOLVER A TI</span><h1>{config.headline}</h1><p>Cuidado consciente, tiempo sin prisa y tratamientos que empiezan escuchándote.</p><a href="#tratamientos">Descubre nuestros cuidados ↗</a></div><div className="aura-hero-image"><Image src={withBasePath("/templates/aura.jpg")} alt="Tratamiento facial aplicado en un estudio de belleza" fill priority sizes="(max-width: 767px) 100vw, 55vw" /></div></section>
    <section className="aura-philosophy demo-wrap" id="filosofia"><span>LA FILOSOFÍA</span><h2>El verdadero lujo es dedicarte tiempo.</h2><p>En {config.business} cuidamos una forma de cuidado cercana y atenta. Cada visita es una pausa para reconectar, sin fórmulas iguales para todos.</p></section>
    <section className="aura-treatments" id="tratamientos"><div className="demo-wrap"><div className="aura-section-head"><span>TRATAMIENTOS</span><h2>Cuidado en cada detalle.</h2><p>Cada tratamiento empieza con una conversación. Elegimos el cuidado adecuado para tu piel, tu cuerpo y el momento en el que estás.</p></div><div className="aura-treatment-list">{treatments.map((treatment, index) => <article key={treatment.title}><span>0{index + 1}</span><div><h3>{treatment.title}</h3><p>{treatment.detail}</p></div><a href="#citas" aria-label={`Consultar ${treatment.title}`}>↗</a></article>)}</div></div></section>
    <section className="aura-studio" id="estudio"><div className="aura-studio-image"><Image src={withBasePath("/templates/aura_space.jpg")} alt="Sesión de masaje en un estudio de bienestar" fill sizes="(max-width: 767px) 100vw, 52vw" /></div><div className="aura-studio-copy"><span>EL ESTUDIO</span><h2>Respira. Estás en tu espacio.</h2><p>Tiempo, atención y un ritmo diferente. El equipo escucha antes de recomendar un tratamiento; cada sesión deja sitio para lo esencial: tú.</p><a href="#citas">Ven a conocernos ↗</a></div></section>
    {config.showDetails && <section className="aura-voices demo-wrap"><div><span>EL EQUIPO</span><h2>Personas que cuidan personas.</h2><p>Una atención cercana, un gesto preciso y tiempo para escuchar. El cuidado empieza en la relación con quien te acompaña.</p><ul><li><strong>Cuidado facial</strong><span>Escucha, diagnóstico y tratamientos adaptados.</span></li><li><strong>Bienestar corporal</strong><span>Técnicas manuales y tiempo para recuperar calma.</span></li></ul></div><blockquote><p>“Me sentí escuchada desde el primer momento. Salí con la sensación de haberme regalado tiempo de verdad.”</p><cite>Testimonio ilustrativo · contenido de muestra</cite></blockquote></section>}
    <section className="aura-close demo-wrap" id="citas"><span>HAZ UNA PAUSA</span><h2>Tu tiempo empieza aquí.</h2><p>Dinos qué necesitas y encontraremos el tratamiento y el momento adecuados. Tu primera visita empieza con una conversación.</p><DemoContact label="Consultar una cita" /></section>
    <footer className="aura-footer"><strong>{config.business}</strong><span>Demo conceptual creada por Nuvora · Fotografía ilustrativa</span><a href="#inicio">Volver arriba ↑</a></footer>
  </>;
}
