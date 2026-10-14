import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

const { validateContact } = await import("../src/lib/contact.ts");
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
