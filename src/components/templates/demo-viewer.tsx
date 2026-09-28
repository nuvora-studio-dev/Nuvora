"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { withBasePath } from "@/lib/base-path";
import { templates, type TemplateSlug } from "@/templates/registry";
import { demoQuery, palettes, readDemoConfig, type DemoConfig } from "@/templates/personalization";

const devices = { Desktop: 1440, Tablet: 768, Mobile: 390 } as const;

export function DemoViewer({ slug, name }: { slug: TemplateSlug; name: string }) {
  const defaults = { business: name, headline: templates[slug].headline };
  const [config, setConfig] = useState(() => readDemoConfig(new URLSearchParams(), defaults));
  const [device, setDevice] = useState<keyof typeof devices>("Desktop");
  const [notice, setNotice] = useState("");
  const frame = useRef<HTMLIFrameElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 650 });
  useEffect(() => {
    if (!viewport.current) return;
    const observer = new ResizeObserver(([entry]) => setSize({ width: entry.contentRect.width, height: entry.contentRect.height }));
    observer.observe(viewport.current);
    return () => observer.disconnect();
  }, []);
  const scale = size.width ? Math.min(1, size.width / devices[device]) : 1;
  const path = `/plantillas/${slug}/demo`;
  const query = demoQuery(config).toString();
  function update(key: keyof DemoConfig, value: string | number | boolean) { setConfig(current => ({ ...current, [key]: value })); }
  function sendConfig() { frame.current?.contentWindow?.postMessage({ type: "nuvora:configure", query }, window.location.origin); }
  useEffect(() => {
    const send = () => frame.current?.contentWindow?.postMessage({ type: "nuvora:configure", query }, window.location.origin);
    const ready = (event: MessageEvent) => { if (event.origin === window.location.origin && event.source === frame.current?.contentWindow && event.data?.type === "nuvora:ready") send(); };
    window.addEventListener("message", ready);
    send();
    return () => window.removeEventListener("message", ready);
  }, [query]);
  async function share() {
    try { await navigator.clipboard.writeText(new URL(withBasePath(`${path}?${query}`), window.location.origin).href); setNotice("Enlace copiado con tu configuración."); }
    catch { setNotice("No se pudo copiar. Abre la demo completa y copia su dirección."); }
  }
  return <div className="demo-viewer">
    <details className="viewer-customizer" open>
      <summary>Hazla tuya <span>Prueba tu identidad en tiempo real</span></summary>
      <div className="customizer-fields">
        <label>Nombre de empresa<input value={config.business} maxLength={45} onChange={event => update("business", event.target.value)} /></label>
        <label>Titular principal<input value={config.headline} maxLength={90} onChange={event => update("headline", event.target.value)} /></label>
        <fieldset className="palette-selector"><legend>Dirección de color</legend><div>{palettes[slug].map((palette, index) => <label key={palette.name} className={config.palette === index ? "is-selected" : ""}><input type="radio" name={`palette-${slug}`} value={index} checked={config.palette === index} onChange={() => setConfig(current => ({ ...current, palette: index, accent: "" }))} /><span className="palette-swatches" aria-hidden="true">{[palette.background, palette.surface, palette.accent].map((color, position) => <span key={position} style={{ background: color }} />)}</span><span>{palette.name}</span><span className="palette-check" aria-hidden="true">{config.palette === index ? "✓" : ""}</span></label>)}</div></fieldset>
        <label className="customizer-color">Acento personalizado<span className="color-input-wrap"><input type="color" value={config.accent || palettes[slug][config.palette].accent} onChange={event => update("accent", event.target.value)} /><span>{config.accent || palettes[slug][config.palette].accent}</span></span></label>
        <label>Email del negocio<input type="email" value={config.email} maxLength={120} placeholder="hola@tuempresa.com" onChange={event => update("email", event.target.value)} /></label>
        <label>Teléfono<input type="tel" value={config.phone} maxLength={30} placeholder="+34 600 000 000" onChange={event => update("phone", event.target.value)} /></label>
        <label>Ubicación<input value={config.location} maxLength={100} placeholder="Ciudad o dirección" onChange={event => update("location", event.target.value)} /></label>
        <label className="customizer-checkbox"><input type="checkbox" checked={config.showDetails} onChange={event => update("showDetails", event.target.checked)} />Mostrar {slug === "atria" ? "galería" : "equipo"}</label>
      </div>
      <div className="customizer-actions"><button type="button" onClick={() => setConfig(readDemoConfig(new URLSearchParams(), defaults))}>Restablecer</button><button type="button" onClick={share}>Copiar enlace</button><Link className="button" href={`/contact?template=${slug}&${query}`}>Usar esta configuración como punto de partida</Link></div>
      <p className="viewer-note">El enlace incluye los datos introducidos. El contraste del texto se ajusta al acento elegido. Fotografías y contenido de ejemplo se adaptan durante el proyecto.</p>
      {notice && <p role="status">{notice}</p>}
    </details>
    <div className="viewer-toolbar"><div role="group" aria-label="Ancho de vista previa">{(Object.keys(devices) as Array<keyof typeof devices>).map(item => <button key={item} type="button" aria-pressed={device === item} onClick={() => setDevice(item)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{item === "Desktop" ? <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></> : <rect x={item === "Tablet" ? 5 : 7} y="2" width={item === "Tablet" ? 14 : 10} height="20" rx="2" />}</svg>{item}<span className="device-size">{devices[item]}</span></button>)}</div><Link href={`${path}?${query}`} target="_blank" rel="noopener noreferrer">Abrir demo completa ↗</Link></div>
    <div className="viewer-stage"><div ref={viewport} className="viewer-frame" style={{ width: devices[device], maxWidth: "100%" }}><iframe style={{ width: devices[device], height: size.height / scale, transform: `scale(${scale})`, transformOrigin: "top left" }} ref={frame} src={withBasePath(path)} onLoad={sendConfig} title={`Vista previa de ${name} en ${device.toLowerCase()}`} loading="lazy" /></div></div>
    <p className="viewer-note">Vista interactiva. Desplázate dentro de la demo o ábrela en una pestaña para verla sin marco.</p>
    <div className="viewer-contact"><p>¿Te imaginas una web así para tu negocio?</p><Link className="button" href={`/contact?template=${slug}&${query}`}>Quiero una web como esta</Link></div>
  </div>;
}
