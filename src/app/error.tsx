"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <section className="error-page"><div className="container"><p className="eyebrow">Error</p><h1>Algo no ha funcionado.</h1><button className="button" type="button" onClick={reset}>Intentarlo de nuevo</button></div></section>;
}
