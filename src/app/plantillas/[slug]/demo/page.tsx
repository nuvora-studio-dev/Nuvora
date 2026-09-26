import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTemplate, templateList } from "@/templates/registry";
import { withBasePath } from "@/lib/base-path";
import dynamic from "next/dynamic";
const AtriaDemo = dynamic(() => import("@/templates/atria/demo").then(module => module.AtriaDemo));
const PulseDemo = dynamic(() => import("@/templates/pulse/demo").then(module => module.PulseDemo));
const AuraDemo = dynamic(() => import("@/templates/aura/demo").then(module => module.AuraDemo));
import "@/styles/demos.css";
import { DemoExperience } from "@/components/templates/demo-context";

export function generateStaticParams() { return templateList.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) return {};
  return { title: `${template.name} — demo`, description: `Demo de ${template.name}, dirección visual de Nuvora.`, robots: { index: false, follow: false, googleBot: { index: false, follow: false } }, alternates: { canonical: withBasePath(`/plantillas/${slug}`) } };
}

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getTemplate(slug)) notFound();
  const demo = slug === "atria" ? <AtriaDemo /> : slug === "pulse" ? <PulseDemo /> : slug === "aura" ? <AuraDemo /> : notFound();
  const template = getTemplate(slug);
  if (!template) notFound();
  return <DemoExperience slug={template.slug} name={template.name} headline={template.headline}>{demo}</DemoExperience>;
}
