import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const preview = process.argv.includes("--preview");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const origin = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nuvora-studio.pages.dev",
).origin;
const routes = [
  "/",
  "/servicios/",
  "/servicios/diseno-desarrollo-web/",
  "/servicios/rediseno-web/",
  "/servicios/mantenimiento-web/",
  "/proyectos/",
  "/proyectos/atria/",
  "/proyectos/pulse/",
  "/proyectos/aura/",
  "/estudio/",
  "/proceso/",
  "/contacto/",
  "/plantillas/",
];
const sitemap = await readFile("out/sitemap.xml", "utf8");
for (const route of routes) {
  const html = await readFile(path.join(root, route, "index.html"), "utf8");
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${route}: one h1`);
  assert.ok(
    html.includes(`rel="canonical" href="${origin}${basePath}${route}"`),
    `${route}: canonical`,
  );
  assert.match(
    html,
    new RegExp(
      `name="robots" content="${preview ? "noindex, nofollow" : "index, follow"}"`,
    ),
    `${route}: robots`,
  );
  assert.doesNotMatch(
    html,
    /https?:\/\/(?:localhost|127\.0\.0\.1)/,
    `${route}: no local metadata`,
  );
  if (!preview)
    assert.ok(
      sitemap.includes(`${origin}${basePath}${route}</loc>`),
      `${route}: sitemap`,
    );
}
if (preview) assert.doesNotMatch(sitemap, /<loc>/);
else
  assert.doesNotMatch(
    sitemap,
    /\/demo\/|localhost|\/services\/|\/about\/|\/contact\//,
  );

async function htmlFiles(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === "_next") continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await htmlFiles(file)));
    else if (entry.name.endsWith(".html")) files.push(file);
  }
  return files;
}

let links = 0;
let images = 0;
for (const file of await htmlFiles(root)) {
  const html = await readFile(file, "utf8");
  const route =
    "/" +
    path
      .relative(root, file)
      .replaceAll(path.sep, "/")
      .replace(/index\.html$/, "");
  for (const [, href] of html.matchAll(/<a\b[^>]*href="([^" ]+)"/g)) {
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    const url = new URL(
      href.replaceAll("&amp;", "&"),
      `https://preview.example${basePath}${route}`,
    );
    const localPath = decodeURIComponent(url.pathname).slice(basePath.length);
    const target = path.join(root, localPath);
    let targetStat;
    try {
      targetStat = await stat(target);
    } catch {
      assert.fail(`${route}: broken link ${href}`);
    }
    const targetHtml = targetStat.isDirectory()
      ? await readFile(path.join(target, "index.html"), "utf8")
      : target.endsWith(".html")
        ? await readFile(target, "utf8")
        : "";
    if (url.hash && targetHtml)
      assert.ok(
        targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
        `${route}: missing anchor ${href}`,
      );
    links++;
  }
  for (const [, src] of html.matchAll(/(?:src|srcSet)="([^" ]+\.webp)/g)) {
    const localPath = decodeURIComponent(src).slice(basePath.length);
    await stat(path.join(root, localPath));
    images++;
  }
}

for (const [old, current] of [
  ["services", "servicios"],
  ["about", "estudio"],
  ["contact", "contacto"],
]) {
  const legacy = await readFile(`out/${old}/index.html`, "utf8");
  assert.ok(
    legacy.includes(`rel="canonical" href="${origin}${basePath}/${current}/"`),
  );
  assert.match(legacy, /name="robots" content="noindex, follow"/);
}
console.log(
  `Site: ${routes.length} principal routes, ${links} internal links/anchors and ${images} image references OK (${preview ? "preview" : "indexable"})`,
);
