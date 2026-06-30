import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoToolPage } from "@/components/pages/seo-tool-page";
import { seoTools, findSeoTool } from "@/lib/seo-tools";
import { siteConfig } from "@/lib/constants";

type Params = {
  slug: string;
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolvedParams = await params;
  const tool = findSeoTool(resolvedParams.slug);
  if (!tool) {
    return {
      title: "Tool not found",
      description: "The requested SEO tool could not be found."
    };
  }

  return {
    title: `${tool.title} | ${siteConfig.name}`,
    description: tool.description,
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: `${siteConfig.url}/seo-tools/${tool.slug}`
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.description
    }
  };
}

export function generateStaticParams() {
  return seoTools.map((tool) => ({ slug: tool.slug }));
}

export default async function SeoToolRoute({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params;
  const tool = findSeoTool(resolvedParams.slug);
  if (!tool) notFound();
  return <SeoToolPage tool={tool} />;
}
