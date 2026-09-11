export default function Loading() {
  return (
    <div className="page-loading" role="status" aria-live="polite">
      <span className="sr-only">Cargando contenido</span>
      <div className="loading-line" />
      <div className="loading-line loading-line-short" />
    </div>
  );
}
