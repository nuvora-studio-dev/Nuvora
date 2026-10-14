export { default } from "../servicios/page";
import { metadata as currentMetadata } from "../servicios/page";
export const metadata = { ...currentMetadata, robots: { index: false, follow: true } };
