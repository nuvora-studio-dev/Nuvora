import { copyFile, readdir } from "node:fs/promises";
import path from "node:path";

// shortcut: Next 16.3.8 exports nested segment filenames on Windows; remove once upstream fixes #92339.
let copied = 0;
for (const file of await readdir("out", { recursive: true })) {
  const parts = file.split(path.sep);
  const segment = parts.findIndex(part => part.startsWith("__next."));
  if (segment < 0 || segment === parts.length - 1 || !file.endsWith(".txt")) continue;
  const target = path.join("out", ...parts.slice(0, segment), parts.slice(segment).join("."));
  await copyFile(path.join("out", file), target);
  copied++;
}
console.log(`Static export: ${copied} nested prefetch payloads copied to browser paths`);
