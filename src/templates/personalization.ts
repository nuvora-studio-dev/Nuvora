export const palettes = {
  atria: [
    { name: "Oliva editorial", background: "#191b19", surface: "#e5e2d8", text: "#f2eee6", ink: "#252720", accent: "#c2ac8c" },
    { name: "Azul noche", background: "#16212c", surface: "#e2e8ec", text: "#f3f6fa", ink: "#192c3c", accent: "#aec8d9" },
    { name: "Vino y piedra", background: "#2b1820", surface: "#eee4df", text: "#fff4ee", ink: "#39242b", accent: "#d7b199" },
  ],
  pulse: [
    { name: "Energía original", background: "#171a18", surface: "#e7ed58", text: "#f4f4ef", ink: "#171a18", accent: "#e7ed58" },
    { name: "Cobalto", background: "#151b26", surface: "#a8c6ff", text: "#f4f7ff", ink: "#151b26", accent: "#a8c6ff" },
    { name: "Terracota", background: "#231b19", surface: "#efad8b", text: "#fff4ec", ink: "#231b19", accent: "#efad8b" },
  ],
  aura: [
    { name: "Mineral", background: "#e7e9e2", surface: "#424c42", text: "#30352f", ink: "#f1f1e8", accent: "#424c42" },
    { name: "Mar y sal", background: "#e5edef", surface: "#304c58", text: "#263b43", ink: "#f2f7f8", accent: "#304c58" },
    { name: "Arcilla", background: "#efe6df", surface: "#654c42", text: "#45332d", ink: "#fff5ec", accent: "#654c42" },
  ],
} as const;

export type DemoConfig = {
  business: string; headline: string; email: string; phone: string; location: string;
  palette: number; accent: string; showDetails: boolean;
};

export function readDemoConfig(input: URLSearchParams, defaults: { business: string; headline: string }): DemoConfig {
  const text = (key: string, fallback = "", max = 90) => (input.get(key)?.trim() || fallback).slice(0, max);
  const palette = Number(input.get("palette") ?? 0);
  const email = text("email", "", 120);
  const phone = text("phone", "", 30);
  return {
    business: text("business", defaults.business, 45), headline: text("headline", defaults.headline),
    email: /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email) ? email : "",
    phone: /^[+\d\s().-]{6,30}$/.test(phone) ? phone : "", location: text("location", "", 100),
    palette: Number.isInteger(palette) && palette >= 0 && palette < 3 ? palette : 0,
    accent: /^#[0-9a-f]{6}$/i.test(input.get("accent") ?? "") ? input.get("accent")! : "",
    showDetails: input.get("details") !== "off",
  };
}

export function demoQuery(config: DemoConfig) {
  const query = new URLSearchParams();
  for (const key of ["business", "headline", "email", "phone", "location", "accent"] as const) if (config[key]) query.set(key, config[key]);
  query.set("palette", String(config.palette));
  if (!config.showDetails) query.set("details", "off");
  return query;
}

function luminanceOf(hex: string) {
  const values = hex.slice(1).match(/../g)!.map((value) => {
    const channel = parseInt(value, 16) / 255;
    return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
  });
  return values[0] * .2126 + values[1] * .7152 + values[2] * .0722;
}

export function contrastInk(hex: string) { return luminanceOf(hex) > .179 ? "#000000" : "#ffffff"; }
export function readableAccent(accent: string, background: string, fallback: string) {
  const values = [luminanceOf(accent), luminanceOf(background)].sort((a, b) => b - a);
  return (values[0] + .05) / (values[1] + .05) >= 4.5 ? accent : fallback;
}
