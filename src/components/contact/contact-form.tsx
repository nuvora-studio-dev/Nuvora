"use client";

import { FormEvent, useState } from "react";

type FieldErrors = Partial<Record<"name" | "email" | "project" | "message" | "privacy", string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState("");

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
    setNotice(Object.keys(nextErrors).length === 0
      ? "El formulario está validado. Falta configurar el destinatario antes de activar el envío."
      : "Revisa los campos indicados.");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="field-grid">
        <FormField id="name" label="Nombre" error={errors.name}>
          <input id="name" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
        </FormField>
        <FormField id="email" label="Email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
        </FormField>
      </div>
      <FormField id="project" label="Tipo de proyecto" error={errors.project}>
        <select id="project" name="project" defaultValue="" aria-invalid={Boolean(errors.project)} aria-describedby={errors.project ? "project-error" : undefined}>
          <option value="" disabled>Selecciona una opción</option>
          <option value="web">Web o experiencia digital</option>
          <option value="product">Producto digital</option>
          <option value="other">Otro ámbito</option>
        </select>
      </FormField>
      <FormField id="message" label="Cuéntanos qué necesitas" error={errors.message}>
        <textarea id="message" name="message" rows={6} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
      </FormField>
      <label className="checkbox-field">
        <input type="checkbox" name="privacy" aria-invalid={Boolean(errors.privacy)} aria-describedby={errors.privacy ? "privacy-error" : undefined} />
        <span>Acepto el tratamiento de estos datos para responder a mi solicitud.</span>
      </label>
      {errors.privacy && <p className="field-error" id="privacy-error">{errors.privacy}</p>}
      <div className="form-actions">
        <button className="button" type="submit">Revisar solicitud</button>
        {notice && <p className="form-notice" role="status">{notice}</p>}
      </div>
    </form>
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
