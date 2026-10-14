import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const contact = await import("../src/lib/contact.ts");
const { validateContact, submitContact } = contact;
const { services, getService } = await import("../src/content/services.ts");
const { getTemplate } = await import("../src/templates/registry.ts");
const allowed = [
  ...services.map((service) => service.slug),
  "concepto-web",
  "otro",
];
const data = new FormData();
for (const [key, value] of Object.entries({
  name: "Empresa de prueba",
  email: "consulta@example.com",
  company: "",
  service: "rediseno-web",
  website: "https://example.com/web",
  message: "Queremos revisar el contenido y el diseño de nuestra web.",
  privacy: "on",
}))
  data.set(key, value);
assert.deepEqual(validateContact(data, allowed), {});
data.set("website", "javascript:alert(1)");
assert.ok(validateContact(data, allowed).website);
data.set("website", "https://user:password@example.com");
assert.ok(validateContact(data, allowed).website);
data.set("website", "");
assert.equal(validateContact(data, allowed).website, undefined);
data.set("service", "__proto__");
data.set("email", "consulta@example.com?body=inject");
data.set("message", "x".repeat(1501));
data.delete("privacy");
const errors = validateContact(data, allowed);
assert.ok(errors.service && errors.email && errors.message && errors.privacy);
assert.ok(validateContact(new FormData(), allowed).name);
assert.equal(getTemplate("__proto__"), undefined);
assert.equal(getTemplate("constructor"), undefined);
assert.equal(getTemplate("atria")?.slug, "atria");
assert.equal(getService("no-existe"), undefined);
assert.equal(getService("rediseno-web")?.slug, "rediseno-web");
for (const siteUrl of [
  "http://localhost:3000",
  "https://user:password@example.com",
  "file:///tmp/site",
]) {
  const result = spawnSync(
    process.execPath,
    ["--input-type=module", "-e", "await import('./src/content/site.ts')"],
    {
      env: {
        ...process.env,
        NODE_ENV: "production",
        NEXT_PUBLIC_SITE_INDEXABLE: "true",
        CF_PAGES_BRANCH: "main",
        NEXT_PUBLIC_SITE_URL: siteUrl,
      },
      encoding: "utf8",
    },
  );
  assert.equal(result.status, 1, `Reject unsafe public origin: ${siteUrl}`);
  assert.match(result.stderr, /NEXT_PUBLIC_SITE_URL/);
}
console.log(
  "Contacto: validación, URL opcional, límites y selección segura OK",
);

// Exercise the component's real submit handler without a browser or real emails.
const personalization = await import("../src/templates/personalization.ts");
const require = createRequire(import.meta.url);
const componentSource = ts.transpileModule(
  readFileSync(new URL("../src/components/contact/contact-form.tsx", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } },
).outputText;
const componentModule = { exports: {} };
const states = [];
const hooks = {
  useState(initial) {
    const index = states.length;
    states.push(initial);
    return [initial, (value) => { states[index] = value; }];
  },
  useRef: (current) => ({ current }),
};
const nativeFormData = globalThis.FormData;
class TestFormData extends nativeFormData {
  constructor(form) {
    super();
    for (const [key, value] of form?.data ?? []) this.set(key, value);
  }
}
runInNewContext(componentSource, {
  module: componentModule, exports: componentModule.exports,
  require: (name) => ({
    react: hooks,
    "next/link": { default: "a" },
    "next/navigation": {},
    "@/templates/personalization": personalization,
    "@/templates/registry": { getTemplate },
    "@/content/services": { services },
    "@/content/site": { siteConfig: { email: "contact@example.com" } },
    "@/lib/contact": contact,
  })[name] ?? require(name),
  FormData: TestFormData, URLSearchParams,
  process: { env: { NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: "test-only" } },
});
function find(element, type) {
  if (!element || typeof element !== "object") return;
  if (element.type === type) return element;
  const children = element.props?.children;
  for (const child of Array.isArray(children) ? children.flat() : [children]) {
    const result = find(child, type);
    if (result) return result;
  }
}
const originalFetch = globalThis.fetch;
try {
  const valid = new nativeFormData();
  for (const [key, value] of Object.entries({ name: "Alex", email: "alex@example.com", service: "concepto-web", message: "Necesitamos una nueva página para el negocio.", privacy: "on" })) valid.set(key, value);
  let requests = 0;
  let resolveRequest;
  let payload;
  globalThis.fetch = async (url, options) => {
    requests++;
    assert.equal(url, "https://api.web3forms.com/submit");
    assert.equal(options.method, "POST");
    payload = JSON.parse(options.body);
    return new Promise((resolve) => { resolveRequest = resolve; });
  };
  const tree = componentModule.exports.ContactForm({ search: "template=atria&business=Empresa&headline=Mi+proyecto&palette=1&details=off" });
  const handler = find(tree, "form").props.onSubmit;
  assert.equal(find(tree, "fieldset").props.disabled, false);
  let resets = 0;
  const form = { data: valid, reset: () => { resets++; valid.set("message", ""); }, querySelector: () => ({ focus() {} }) };
  const event = { preventDefault() {}, currentTarget: form };
  const first = handler(event);
  await handler(event);
  assert.equal(requests, 1, "Concurrent submit is ignored");
  assert.equal(states[2], true, "Sending state is active");
  assert.equal(resets, 0, "No premature reset");
  assert.equal(payload.access_key, "test-only");
  assert.equal(payload.email, "alex@example.com");
  assert.equal(payload.privacy, undefined);
  assert.match(payload.message, /Concepto de partida: Atria/);
  assert.match(payload.message, /Marca: Empresa/);
  assert.match(payload.message, /Paleta: Azul noche/);
  assert.match(payload.message, /Sección adicional: oculta/);
  resolveRequest(new Response(JSON.stringify({ success: true })));
  await first;
  assert.equal(resets, 1);
  assert.match(states[1], /Hemos recibido tu mensaje/);
  assert.equal(states[2], false);

  valid.set("message", "Necesitamos una nueva página para el negocio.");
  for (const failure of [
    () => new Response("error", { status: 500 }),
    () => new Response(JSON.stringify({ success: false })),
    () => { throw new TypeError("Offline"); },
    () => new Response("not JSON"),
    () => new Response(JSON.stringify({ success: "true" })),
    () => new Response("limited", { status: 429 }),
  ]) {
    globalThis.fetch = async () => failure();
    await handler(event);
    assert.equal(resets, 1, "Errors preserve form data");
    assert.equal(valid.get("message"), "Necesitamos una nueva página para el negocio.");
    assert.doesNotMatch(states[1], /Hemos recibido/);
    assert.equal(states[2], false, "Retry is available");
  }
  globalThis.fetch = async () => { throw new Error("Must not fetch"); };
  await assert.rejects(submitContact(valid, ""), /no está disponible/);
  valid.set("botcheck", "on");
  await assert.rejects(submitContact(valid, "test-only"), /No se ha podido/);
  console.log("Web3Forms: éxito, HTTP, respuesta negativa/inválida, conexión, doble envío, datos conservados y plantilla OK (sin correos reales)");
} finally {
  globalThis.fetch = originalFetch;
}
