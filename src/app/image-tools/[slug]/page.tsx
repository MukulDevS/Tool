import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImageToolPage } from "@/components/pages/image-tool-page";
import { imageTools, findImageTool } from "@/lib/image-tools";
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
  const tool = findImageTool(resolvedParams.slug);
  if (!tool) {
    return {
      title: "Tool not found",
      description: "The requested image tool could not be found.",
    };
  }

  return {
    title: `${tool.title} | ${siteConfig.name}`,
    description: tool.description,
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: `${siteConfig.url}/image-tools/${tool.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.description,
    },
  };
}

export function generateStaticParams() {
  return imageTools.map((tool) => ({ slug: tool.slug }));
}

export default async function ToolPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const resolvedParams = await params;
  const tool = findImageTool(resolvedParams.slug);

  if (!tool) {
    notFound();
  }

  return <ImageToolPage tool={tool} />;
}
