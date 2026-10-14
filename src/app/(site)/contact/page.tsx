export { default } from "../contacto/page";
import { metadata as currentMetadata } from "../contacto/page";
export const metadata = { ...currentMetadata, robots: { index: false, follow: true } };
