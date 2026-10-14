export type ContactErrors = Partial<
  Record<
    | "name"
    | "email"
    | "company"
    | "service"
    | "website"
    | "message"
    | "privacy",
    string
  >
>;

export function validateContact(
  data: FormData,
  allowedServices: readonly string[],
): ContactErrors {
  const value = (key: string) => String(data.get(key) ?? "").trim();
  const errors: ContactErrors = {};
  if (value("name").length < 2 || value("name").length > 100)
    errors.name = "Indica un nombre de entre 2 y 100 caracteres.";
  if (
    value("email").length > 150 ||
    !/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(value("email"))
  )
    errors.email = "Introduce un email válido.";
  if (value("company").length > 150)
    errors.company =
      "El nombre de empresa no puede superar los 150 caracteres.";
  if (!allowedServices.includes(value("service")))
    errors.service = "Selecciona el servicio que te interesa.";
  if (value("website")) {
    try {
      const url = new URL(value("website"));
      if (
        !["http:", "https:"].includes(url.protocol) ||
        url.username ||
        url.password ||
        value("website").length > 500
      )
        errors.website =
          "Indica una dirección http o https sin credenciales, de hasta 500 caracteres.";
    } catch {
      errors.website =
        "Introduce la dirección completa, por ejemplo https://tuempresa.es.";
    }
  }
  if (value("message").length < 20 || value("message").length > 1500)
    errors.message = "Describe el proyecto con entre 20 y 1.500 caracteres.";
  if (data.get("privacy") !== "on")
    errors.privacy = "Confirma que has leído la información sobre privacidad.";
  return errors;
}
