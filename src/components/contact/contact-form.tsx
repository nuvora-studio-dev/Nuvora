"use client";

import { FormEvent, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { readDemoConfig, palettes } from "@/templates/personalization";
import { getTemplate } from "@/templates/registry";

type FieldErrors = Partial<Record<"name" | "email" | "project" | "message" | "privacy", string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState("");
  const search = useSyncExternalStore(() => () => {}, () => window.location.search, () => "");
  const params = new URLSearchParams(search);
  const selected = getTemplate(params.get("template") ?? "");
  const template = selected?.name ?? "";
  const configuration = selected ? readDemoConfig(params, { business: selected.name, headline: selected.headline }) : null;


  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors: FieldErrors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const project = String(data.get("project") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2) nextErrors.name = "Indica tu nombre.";
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Introduce un email válido.";
    if (!project) nextErrors.project = "Selecciona el tipo de proyecto.";
    if (message.length < 20) nextErrors.message = "Cuéntanos un poco más, al menos 20 caracteres.";
    if (data.get("privacy") !== "on") nextErrors.privacy = "Necesitamos tu consentimiento para continuar.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setNotice("Revisa los campos indicados.");
      return;
    }

    const body = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Empresa o proyecto: ${String(data.get("company") ?? "").trim()}`,
      `Qué necesitas: ${project}`,
      ...(selected && configuration ? [
        `Dirección visual de partida: ${template}`,
        `Marca en la demo: ${configuration.business}`,
        `Titular: ${configuration.headline}`,
        `Paleta: ${palettes[selected.slug][configuration.palette].name}`,
        `Acento: ${configuration.accent || palettes[selected.slug][configuration.palette].accent}`,
        `Contacto del negocio: ${configuration.email} ${configuration.phone}`,
        `Ubicación: ${configuration.location}`,
        `Sección adicional: ${configuration.showDetails ? "visible" : "oculta"}`,
      ] : []),
      `Presupuesto aproximado: ${String(data.get("budget") ?? "")}`,
      `Cuándo te gustaría tenerlo: ${String(data.get("timeline") ?? "")}`,
      "",
      message,
    ].join("\n");
    window.location.href = `mailto:nuvora.studio@outlook.com?subject=${encodeURIComponent(`Nuevo proyecto: ${project}`)}&body=${encodeURIComponent(body)}`;
    setNotice("Email preparado. Si tienes una aplicación de correo configurada, podrás revisar y enviar el mensaje desde allí. El proyecto todavía no se ha enviado.");
  }

  return (
    <>
    {template && <div className="contact-template-context"><strong>Partimos de {template}</strong><p>Incluiremos tu configuración de marca, colores y contenido como contexto de tu consulta.</p></div>}
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="field-grid">
        <FormField id="name" label="Nombre" error={errors.name}>
          <input id="name" name="name" placeholder="Tu nombre" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
        </FormField>
        <FormField id="email" label="Email" error={errors.email}>
          <input id="email" name="email" type="email" placeholder="tu@email.com" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
        </FormField>
      </div>
      <FormField id="company" label="Empresa o proyecto">
        <input id="company" name="company" placeholder="Nombre de tu empresa" autoComplete="organization" />
      </FormField>
      <FormField id="project" label="¿Qué necesitas?" error={errors.project}>
        <select id="project" name="project" key={template} defaultValue={template ? "Web basada en dirección visual" : ""} aria-invalid={Boolean(errors.project)} aria-describedby={errors.project ? "project-error" : undefined}>
          <option value="" disabled>Selecciona una opción</option>
          {template && <option value="Web basada en dirección visual" >Web basada en dirección visual</option>}
          <option>Diseño y desarrollo web</option>
          <option>Rediseño y optimización</option>
          <option>Mantenimiento y evolución</option>
          <option>Otro</option>
        </select>
      </FormField>
      <FormField id="message" label="Cuéntanos sobre el proyecto" error={errors.message}>
        <textarea id="message" name="message" rows={6} placeholder="Qué haces, qué necesitas, qué quieres mejorar y cualquier información que consideres importante." aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
      </FormField>
      <div className="field-grid">
        <FormField id="budget" label="Presupuesto aproximado">
          <select id="budget" name="budget" defaultValue="Todavía no lo sé">
            <option>Todavía no lo sé</option>
            <option>Menos de 500 €</option>
            <option>500–1.000 €</option>
            <option>1.000–2.500 €</option>
            <option>Más de 2.500 €</option>
          </select>
        </FormField>
        <FormField id="timeline" label="¿Cuándo te gustaría tenerlo?">
          <select id="timeline" name="timeline" defaultValue="Sin fecha definida">
            <option>Lo antes posible</option>
            <option>1 mes</option>
            <option>1–3 meses</option>
            <option>Sin fecha definida</option>
          </select>
        </FormField>
      </div>
      <label className="checkbox-field">
        <input type="checkbox" name="privacy" aria-invalid={Boolean(errors.privacy)} aria-describedby={errors.privacy ? "privacy-error" : undefined} />
        <span>Acepto el tratamiento de estos datos para responder a mi solicitud según la <Link href="/privacidad" className="privacy-link">Política de privacidad</Link>.</span>
      </label>
      {errors.privacy && <p className="field-error" id="privacy-error">{errors.privacy}</p>}
      <p className="form-notice">Prepararemos un email con tus datos para abrirlo en tu aplicación de correo. Necesitas tenerla configurada y enviar el mensaje desde allí.</p>
      <div className="form-actions">
        <button className="button" type="submit">Preparar email</button>
        {notice && <p className="form-notice" role="status">{notice}</p>}
      </div>
    </form>
    </>
  );
}

function FormField({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <p className="field-error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}
