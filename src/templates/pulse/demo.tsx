"use client";

import { TemplateImage as Image } from "@/components/templates/template-image";
import { useDemoConfig, DemoContact } from "@/components/templates/demo-context";
import { withBasePath } from "@/lib/base-path";

const programs = [
  { title: "Fuerza", description: "Construye una base sólida con sesiones progresivas y una técnica que se nota." },
  { title: "Conditioning", description: "Resistencia y movimiento con intensidad medida. Cada minuto tiene un propósito." },
  { title: "Personal", description: "Un camino ajustado a tus objetivos, tu ritmo y tu punto de partida." },
];

export function PulseDemo() {
  const config = useDemoConfig();
  return <>
    <header className="pulse-header"><a className="pulse-logo" href="#inicio">{config.business}<span> / TRAINING CLUB</span></a><nav aria-label="Navegación de Pulse"><a href="#programas">Programas</a><a href="#metodo">Método</a><a href="#espacio">Espacio</a></nav><details className="demo-mobile-nav"><summary>Menú</summary><div><a href="#programas">Programas</a><a href="#metodo">Método</a><a href="#espacio">Espacio</a><a href="#empezar">Contacto</a></div></details><a className="pulse-header-cta" href="#empezar">Empieza aquí ↗</a></header>
    <section className="pulse-hero" id="inicio"><div className="pulse-hero-copy"><p>ENTRENAMIENTO CON DIRECCIÓN</p><h1>{config.headline}</h1><p>Un espacio para trabajar de verdad: método claro, atención cercana y energía compartida.</p><a href="#programas">Explora los programas <span aria-hidden="true">↘</span></a></div><div className="pulse-hero-image"><Image src={withBasePath("/templates/pulse.webp")} alt="Zona de entrenamiento de fuerza" fill priority sizes="(max-width: 767px) 100vw, 58vw" /></div><div className="pulse-hero-bottom"><span>FUERZA / MOVIMIENTO / COMUNIDAD</span><span>DEMO CONCEPTUAL · DATOS ILUSTRATIVOS</span></div></section>
    <section className="pulse-statement demo-wrap" id="metodo"><p>El método</p><h2>Sin atajos.<br />Con sentido.</h2><div><p>Creemos en el progreso que se construye sesión a sesión. Adaptamos la intensidad, cuidamos la técnica y hacemos que cada entrenamiento cuente.</p><a href="#empezar">Conoce el siguiente paso ↗</a></div></section>
    <section className="pulse-programs" id="programas"><div className="demo-wrap"><div className="pulse-section-head"><h2>Elige tu forma de avanzar.</h2><p>Entrenamiento en grupo o atención individual. Encuentra el programa que encaja con tu ritmo y tus objetivos.</p></div><div className="pulse-program-list">{programs.map((program, index) => <article key={program.title}><span>0{index + 1}</span><h3>{program.title}</h3><p>{program.description}</p><a href="#empezar" aria-label={`Consultar programa ${program.title}`}>↗</a></article>)}</div></div></section>
    <section className="pulse-space" id="espacio"><div className="pulse-space-image"><Image src={withBasePath("/templates/pulse_train.webp")} alt="Sesión de entrenamiento de fuerza" fill sizes="(max-width: 767px) 100vw, 54vw" /></div><div className="pulse-space-copy"><span>EL ESPACIO</span><h2>Ven por el entrenamiento.<br />Quédate por la energía.</h2><p>Equipamiento, amplitud y una comunidad que empuja en la misma dirección. Aquí cada persona encuentra su lugar.</p><a href="#empezar">Quiero conocerlo ↗</a></div></section>
    {config.showDetails && <section className="pulse-coaches demo-wrap"><span>EL EQUIPO</span><h2>La técnica empieza con quien te guía.</h2><div><p>Te acompañamos desde la primera sesión. Aprender la técnica y entender tu progreso forman parte del entrenamiento.</p><ul><li><strong>Fuerza</strong><span>Técnica, progresión y confianza bajo la barra.</span></li><li><strong>Movimiento</strong><span>Movilidad y capacidad física para entrenar mejor.</span></li><li><strong>Acompañamiento</strong><span>Sesiones individuales según cada objetivo.</span></li></ul></div><a href="#empezar">Habla con el equipo ↗</a></section>}
    <section className="pulse-close demo-wrap" id="empezar"><span>TU SIGUIENTE SESIÓN EMPIEZA AQUÍ</span><h2>Haz que cuente.</h2><p>Cuéntanos cómo entrenas y qué quieres conseguir. Te ayudaremos a encontrar tu punto de partida y a preparar tu primera visita.</p><DemoContact label="Solicitar una primera visita" /></section>
    <footer className="pulse-footer"><strong>{config.business}</strong><span>Demo conceptual creada por Nuvora · Fotografía ilustrativa</span><a href="#inicio">Arriba ↑</a></footer>
  </>;
}
