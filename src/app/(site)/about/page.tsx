export { default } from "../estudio/page";
import { metadata as currentMetadata } from "../estudio/page";
export const metadata = { ...currentMetadata, robots: { index: false, follow: true } };
