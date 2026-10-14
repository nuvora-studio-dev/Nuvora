import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

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
  "/plantillas/atria/",
  "/plantillas/pulse/",
  "/plantillas/aura/",
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

const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
assert.deepEqual(sitemapUrls.sort(), preview ? [] : routes.map(route => `${origin}${basePath}${route}`).sort());
const robots = await readFile("out/robots.txt", "utf8");
assert.match(robots, /Allow: \//);
assert.doesNotMatch(robots, /Disallow:/);
if (preview) assert.doesNotMatch(robots, /Sitemap:/);
else assert.ok(robots.includes(`Sitemap: ${origin}${basePath}/sitemap.xml`));

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
  assert.match(html, /<html[^>]*lang="es"/, `${file}: Spanish document`);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${file}: one h1`);
  let previousHeading = 0;
  for (const [, level] of html.matchAll(/<h([1-6])\b/g)) {
    assert.ok(Number(level) <= previousHeading + 1, `${file}: skipped heading level`);
    previousHeading = Number(level);
  }
  for (const [img] of html.matchAll(/<img\b[^>]*>/g))
    assert.match(img, /\balt="[^"]*"/, `${file}: image alt`);
  assert.doesNotMatch(html, /https?:\/\/(?:localhost|127\.|\[::1\]|0\.0\.0\.0)/, `${file}: public URLs`);
  const is404 = /(?:^|[\\/])(?:404|_not-found)(?:[\\/]|\.html)/.test(path.relative(root, file));
  if (is404) {
    assert.match(html, /name="robots" content="noindex/);
    assert.doesNotMatch(html, /name="robots" content="index/);
    assert.doesNotMatch(html, /rel="canonical"/);
  } else {
    const value = (attribute, key) => html.match(new RegExp(`<meta ${attribute}="${key}" content="([^"]*)"`))?.[1];
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = value("name", "description");
    const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
    assert.ok(title && description && canonical, `${file}: metadata present`);
    assert.equal(value("property", "og:title"), title, `${file}: OG title`);
    assert.equal(value("name", "twitter:title"), title, `${file}: Twitter title`);
    assert.equal(value("property", "og:description"), description);
    assert.equal(value("name", "twitter:description"), description);
    assert.equal(value("property", "og:url"), canonical);
    assert.equal(value("property", "og:locale"), "es_ES");
    assert.equal(value("property", "og:site_name"), "Nuvora");
    assert.equal(value("property", "og:type"), "website");
    assert.equal(value("name", "twitter:card"), "summary_large_image");
    for (const [attribute, key] of [["property", "og:image"], ["name", "twitter:image"]]) {
      const image = new URL(value(attribute, key));
      assert.equal(image.origin, origin);
      assert.ok(image.pathname.startsWith(`${basePath}/`));
      await stat(path.join(root, image.pathname.slice(basePath.length)));
      assert.ok(value(attribute, `${key}:alt`), `${file}: social image alt`);
    }
    if (/\/(demo|privacidad|aviso-legal|cookies)\//.test(file.replaceAll(path.sep, "/")))
      assert.match(html, /name="robots" content="noindex, nofollow"/);
  }
  const structured = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.equal(structured.length, file === path.join(root, "index.html") ? 1 : 0, `${file}: JSON-LD only on homepage`);
  if (structured.length) {
    const data = JSON.parse(structured[0][1]);
    assert.equal(data["@context"], "https://schema.org");
    const [organization, website] = data["@graph"];
    assert.equal(organization["@type"], "Organization");
    assert.equal(website["@type"], "WebSite");
    assert.equal(website.publisher["@id"], organization["@id"]);
    assert.equal(organization.url, `${origin}${basePath}/`);
    assert.equal(website.url, organization.url);
    assert.equal(website.name, "Nuvora");
    assert.equal(website.inLanguage, "es");
    await stat(path.join(root, new URL(organization.logo).pathname.slice(basePath.length)));
    assert.doesNotMatch(structured[0][1], /"(?:address|geo|review|aggregateRating|sameAs)"/);
  }
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

for (const siteUrl of ["http://localhost:3000", "https://localhost", "https://localhost.", "https://preview.localhost", "https://127.0.0.2", "https://[::1]", "https://0.0.0.0", "http://example.com", "https://example.com/path", "https://example.com/?q=1", "https://example.com/#fragment", "https://user:pass@example.com"]) {
  const result = spawnSync(process.execPath, ["--input-type=module", "-e", 'await import("./src/content/site.ts")'], {
    encoding: "utf8",
    env: { ...process.env, NODE_ENV: "production", NEXT_PUBLIC_SITE_INDEXABLE: "false", NEXT_PUBLIC_SITE_URL: siteUrl },
  });
  assert.notEqual(result.status, 0, `${siteUrl}: rejected even in production previews`);
  assert.match(result.stderr, /NEXT_PUBLIC_SITE_URL/, `${siteUrl}: expected configuration failure`);
}
for (const [branch, flag, indexable] of [["main", "true", true], ["seo-preview", "true", false], ["main", "false", false]]) {
  const result = spawnSync(process.execPath, ["--input-type=module", "-e", 'const {siteConfig,absoluteUrl}=await import("./src/content/site.ts"); console.log(JSON.stringify({indexable:siteConfig.indexable,url:absoluteUrl("/servicios/")}))'], {
    encoding: "utf8",
    env: { ...process.env, NODE_ENV: "production", CF_PAGES_BRANCH: branch, NEXT_PUBLIC_SITE_INDEXABLE: flag, NEXT_PUBLIC_SITE_URL: "https://nuvora-studio.pages.dev", NEXT_PUBLIC_BASE_PATH: "/Nuvora" },
  });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), { indexable, url: "https://nuvora-studio.pages.dev/Nuvora/servicios/" });
}
// The homepage prefetch requests a flat filename, even when Windows exports a directory.
for (const entry of await readdir(root, { withFileTypes: true })) {
  if (!entry.isDirectory() || !entry.name.startsWith("__next.")) continue;
  assert.deepEqual(
    await readFile(path.join(root, `${entry.name}.__PAGE__.txt`)),
    await readFile(path.join(root, entry.name, "__PAGE__.txt")),
    "homepage: browser prefetch URL preserves payload bytes",
  );
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
