import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PdfToolPage } from "@/components/pages/pdf-tool-page";
import { pdfTools, findPdfTool } from "@/lib/pdf-tools";
import { siteConfig } from "@/lib/constants";

type Params = {
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const tool = findPdfTool(resolvedParams.slug);
  if (!tool) {
    return {
      title: "Tool not found",
      description: "The requested PDF tool could not be found.",
    };
  }

  return {
    title: `${tool.title} | ${siteConfig.name}`,
    description: tool.description,
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: `${siteConfig.url}/pdf-tools/${tool.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.description,
    },
  };
}

export function generateStaticParams() {
  return pdfTools.map((tool) => ({ slug: tool.slug }));
}

export default async function PdfToolRoute({
  params,
}: {
  params: Promise<Params>;
}) {
  const resolvedParams = await params;
  const tool = findPdfTool(resolvedParams.slug);
  if (!tool) notFound();
  return <PdfToolPage tool={tool} />;
}
