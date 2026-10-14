import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';

const { readDemoConfig, demoQuery, contrastInk, readableAccent } = await import('../src/templates/personalization.ts');
const preview = process.argv.includes('--preview');
const robotsPattern = preview ? /name="robots" content="noindex, nofollow"/ : /name="robots" content="index, follow"/;
const defaults = { business: 'Atria', headline: 'Una mesa propia' };
const config = readDemoConfig(new URLSearchParams('business=Mi+restaurante&palette=2&details=off&accent=%23abcdef'), defaults);
assert.equal(config.business, 'Mi restaurante');
assert.equal(config.showDetails, false);
assert.deepEqual(readDemoConfig(demoQuery(config), defaults), config);
const invalid = readDemoConfig(new URLSearchParams('palette=99&email=x@y.es%3Fbody=inject&accent=bad&phone=javascript:alert'), defaults);
assert.equal(invalid.palette, 0);
assert.equal(invalid.email, '');
assert.equal(invalid.phone, '');
assert.equal(invalid.accent, '');
assert.equal(contrastInk('#ffffff'), '#000000');
assert.equal(contrastInk('#000000'), '#ffffff');
assert.equal(readableAccent('#111111', '#111111', '#ffffff'), '#ffffff');

const catalog = await readFile('out/plantillas/index.html', 'utf8');
assert.match(catalog, robotsPattern);
const sitemap = await readFile('out/sitemap.xml', 'utf8');

const slugs = (await readdir('out/plantillas', { withFileTypes: true })).filter(entry => entry.isDirectory() && !entry.name.startsWith('__')).map(entry => entry.name);
assert.ok(slugs.length >= 3);

for (const slug of slugs) {
  const detail = await readFile(`out/plantillas/${slug}/index.html`, 'utf8');
  const demo = await readFile(`out/plantillas/${slug}/demo/index.html`, 'utf8');
  assert.match(detail, robotsPattern);
  assert.match(demo, /name="robots" content="noindex, nofollow"/);
  assert.match(demo, new RegExp(`<main id="contenido" class="demo-site demo-${slug}"`));
  assert.doesNotMatch(demo, /class="site-header"|class="site-footer"/);
  if (!preview) assert.match(sitemap, new RegExp(`/plantillas/${slug}/</loc>`));
  assert.doesNotMatch(sitemap, new RegExp(`/plantillas/${slug}/demo`));
  for (const image of new Set([...detail.matchAll(/\/templates\/[^" ]+\.(?:jpg|webp)/g), ...demo.matchAll(/\/templates\/[^" ]+\.(?:jpg|webp)/g)].map(match => match[0]))) await stat(`public${image}`);
}

console.log(`Plantillas: ${slugs.length} fichas, demos, metadata y assets OK`);
