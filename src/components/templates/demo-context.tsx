"use client";

import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { palettes, readDemoConfig, demoQuery, contrastInk, readableAccent, type DemoConfig } from "@/templates/personalization";
import type { TemplateSlug } from "@/templates/registry";

const DemoContext = createContext<DemoConfig | null>(null);
const subscribe = () => () => {};

export function DemoExperience({ slug, name, headline, children }: { slug: TemplateSlug; name: string; headline: string; children: ReactNode }) {
  const search = useSyncExternalStore(subscribe, () => window.location.search, () => "");
  const defaults = useMemo(() => ({ business: name, headline }), [name, headline]);
  const initial = useMemo(() => readDemoConfig(new URLSearchParams(search), defaults), [search, defaults]);
  const [override, setOverride] = useState<DemoConfig | null>(null);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== window.parent || event.data?.type !== "nuvora:configure" || typeof event.data.query !== "string") return;
      setOverride(readDemoConfig(new URLSearchParams(event.data.query), defaults));
    };
    window.addEventListener("message", receive);
    if (window.parent !== window) window.parent.postMessage({ type: "nuvora:ready" }, window.location.origin);
    return () => window.removeEventListener("message", receive);
  }, [defaults]);
  const config = override ?? initial;
  const theme = palettes[slug][config.palette];
  const accent = config.accent || theme.accent;
  const style = { "--demo-bg": theme.background, "--demo-surface": theme.surface, "--demo-text": theme.text, "--demo-ink": theme.ink, "--demo-accent": accent, "--demo-readable-accent": readableAccent(accent, theme.background, theme.text), "--demo-accent-ink": contrastInk(accent) } as CSSProperties;
  return <DemoContext.Provider value={config}><main id="contenido" className={`demo-site demo-${slug}`} style={style}>{children}<aside className="demo-nuvora-cta"><p>Demo conceptual creada por Nuvora · {name}</p><Link href={`/contacto?template=${slug}&${demoQuery(config)}`}>Quiero una web como esta ↗</Link></aside></main></DemoContext.Provider>;
}

export function useDemoConfig() {
  const config = useContext(DemoContext);
  if (!config) throw new Error("La demo necesita DemoExperience");
  return config;
}

export function DemoContact({ label }: { label: string }) {
  const config = useDemoConfig();
  const [notice, setNotice] = useState("");
  return <div className="demo-contact-details">
    {config.location && <p>{config.location}</p>}
    {config.phone && <a href={`tel:${config.phone.replace(/[^+\d]/g, "")}`}>{config.phone}</a>}
    {config.email ? <a href={`mailto:${config.email}?subject=${encodeURIComponent(`Consulta para ${config.business}`)}`}>{label} ↗</a> : <button type="button" onClick={() => setNotice("Así se abriría una consulta para tu negocio. Añade tu email en el personalizador para probar el enlace real.")}>{label} ↗</button>}
    {notice && <p className="demo-contact-notice" role="status">{notice}</p>}
  </div>;
}
