"use client";

import { type FormEvent, type ReactNode, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { readDemoConfig, palettes } from "@/templates/personalization";
import { getTemplate } from "@/templates/registry";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";
import { submitContact, validateContact, type ContactErrors } from "@/lib/contact";

const allowedServices = [
  ...services.map((service) => service.slug),
  "concepto-web",
  "otro",
];

export function ContactFormWithQuery() {
  const params = useSearchParams();
  return <ContactForm search={params.toString()} />;
}

export function ContactForm({ search = "" }: { search?: string }) {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [notice, setNotice] = useState("");
  const [sending, setSending] = useState(false);
  const pending = useRef(false);
  const params = new URLSearchParams(search);
  const selected = getTemplate(params.get("template") ?? "");
  const configuration = selected
    ? readDemoConfig(params, {
        business: selected.name,
        headline: selected.headline,
      })
    : null;
  const requestedService = params.get("servicio") ?? "";
  const defaultService = allowedServices.includes(requestedService)
    ? requestedService
    : selected
      ? "concepto-web"
      : "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors = validateContact(data, allowedServices);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setNotice("Revisa los campos indicados antes de enviar el mensaje.");
      event.currentTarget
        .querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)
        ?.focus();
      return;
    }
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const service =
      services.find((service) => service.slug === value("service"))?.name ??
      (value("service") === "concepto-web"
        ? "Una web a partir de un concepto"
        : "Otro proyecto");
    const body = [
      `Nombre: ${value("name")}`,
      `Empresa: ${value("company") || "No indicada"}`,
      `Email: ${value("email")}`,
      `Servicio: ${service}`,
      `Web actual: ${value("website") || "No indicada"}`,
      ...(selected && configuration
        ? [
            `Concepto de partida: ${selected.name}`,
            `Marca: ${configuration.business}`,
            `Titular: ${configuration.headline}`,
            `Paleta: ${palettes[selected.slug][configuration.palette].name}`,
            `Acento: ${configuration.accent || palettes[selected.slug][configuration.palette].accent}`,
            `Contacto de la demo: ${configuration.email} ${configuration.phone}`,
            `Ubicación: ${configuration.location}`,
            `Sección adicional: ${configuration.showDetails ? "visible" : "oculta"}`,
          ]
        : []),
      "",
      value("message"),
    ].join("\n");
    data.set("subject", `Proyecto web: ${service}`);
    data.set("service", service);
    data.set("message", body);
    pending.current = true;
    setSending(true);
    setNotice("Enviando tu mensaje…");
    try {
      await submitContact(data, process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "");
      form.reset();
      setNotice("Hemos recibido tu mensaje. Nuvora revisará tu solicitud.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "No se ha podido enviar el mensaje. Escríbenos por email.");
    } finally {
      pending.current = false;
      setSending(false);
    }
  }

  return (
    <div>
      {selected && (
        <div className="contact-template-context">
          <strong>Partimos de {selected.name}</strong>
          <p>Tu configuración se incluirá como contexto en el email.</p>
        </div>
      )}
      <form className="contact-form" onSubmit={handleSubmit} noValidate aria-busy={sending}>
        <input type="checkbox" name="botcheck" style={{ display: "none" }} tabIndex={-1} aria-hidden="true" autoComplete="off" />
        <fieldset disabled={sending} style={{ border: 0, padding: 0, margin: 0, minWidth: 0, display: "contents" }}>
        {Object.keys(errors).length > 0 && (
          <div className="error-summary">
            <p>Revisa estos campos:</p>
            <ul>
              {Object.entries(errors).map(([field, error]) => (
                <li key={field}>
                  <a href={`#${field}`}>{error}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="field-grid">
          <FormField id="name" label="Nombre" error={errors.name}>
            <input
              id="name"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
          </FormField>
          <FormField
            id="company"
            label="Empresa (opcional)"
            error={errors.company}
          >
            <input
              id="company"
              name="company"
              autoComplete="organization"
              maxLength={150}
              aria-invalid={Boolean(errors.company)}
              aria-describedby={errors.company ? "company-error" : undefined}
            />
          </FormField>
        </div>
        <FormField id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={150}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </FormField>
        <FormField
          id="service"
          label="Servicio de interés"
          error={errors.service}
        >
          <select
            id="service"
            name="service"
            key={defaultService}
            defaultValue={defaultService}
            required
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "service-error" : undefined}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
            <option value="concepto-web">
              Una web a partir de un concepto
            </option>
            <option value="otro">Todavía no lo tengo claro</option>
          </select>
        </FormField>
        <FormField
          id="website"
          label="Web actual (opcional)"
          error={errors.website}
        >
          <input
            id="website"
            name="website"
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://tuempresa.es"
            maxLength={500}
            aria-invalid={Boolean(errors.website)}
            aria-describedby={errors.website ? "website-error" : undefined}
          />
        </FormField>
        <FormField
          id="message"
          label="Cuéntanos sobre el proyecto"
          error={errors.message}
        >
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            minLength={20}
            maxLength={1500}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={`message-hint${errors.message ? " message-error" : ""}`}
          />
          <p id="message-hint" className="field-hint">
            Qué hace tu negocio y qué te gustaría construir o mejorar. Entre 20
            y 1.500 caracteres.
          </p>
        </FormField>
        <div>
          <label className="checkbox-field">
            <input
              id="privacy"
              type="checkbox"
              name="privacy"
              required
              aria-invalid={Boolean(errors.privacy)}
              aria-describedby={errors.privacy ? "privacy-error" : undefined}
            />
            <span>
              He leído la{" "}
              <Link href="/privacidad" className="privacy-link">
                información sobre privacidad
              </Link>{" "}
              para esta consulta.
            </span>
          </label>
          {errors.privacy && (
            <p className="field-error" id="privacy-error">
              {errors.privacy}
            </p>
          )}
        </div>
        <p className="form-notice">
          Enviaremos tu consulta a Nuvora mediante Web3Forms para valorar tu proyecto.
        </p>
        <div className="form-actions">
          <button className="button" type="submit" disabled={sending}>
            {sending ? "Enviando…" : "Enviar mensaje →"}
          </button>
        </div>
        </fieldset>
        <p
          className="form-notice"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {notice}
        </p>
        <noscript>
          <p>
            Para enviar este formulario necesitas JavaScript.
            Puedes escribir directamente a{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </noscript>
      </form>
    </div>
  );
}

function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
