export function Arrow({ direction = "right" }: { direction?: "right" | "up-right" }) {
  return <span aria-hidden="true">{direction === "up-right" ? "↗" : "→"}</span>;
}
