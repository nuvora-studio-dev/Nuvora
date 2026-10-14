export default function Loading() {
  return (
    <main id="contenido" className="page-loading" role="status" aria-live="polite">
      <span className="sr-only">Cargando contenido</span>
      <div className="loading-line" />
      <div className="loading-line loading-line-short" />
    </main>
  );
}
