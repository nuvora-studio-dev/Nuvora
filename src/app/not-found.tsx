import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return <main id="contenido" className="error-page"><Container><p className="eyebrow">Página no encontrada</p><h1>Este camino no lleva a ninguna parte.</h1><Link className="button" href="/">Volver al inicio</Link></Container></main>;
}
