import type { MetadataRoute } from "next";
import { siteConfig, toolCategories } from "@/lib/constants";
import { imageTools } from "@/lib/image-tools";
import { pdfTools } from "@/lib/pdf-tools";
import { seoTools } from "@/lib/seo-tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    ...toolCategories.map((category) => `/${category.slug}`),
    ...imageTools.map((tool) => `/image-tools/${tool.slug}`),
    ...pdfTools.map((tool) => `/pdf-tools/${tool.slug}`),
    ...seoTools.map((tool) => `/seo-tools/${tool.slug}`)
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8
  }));
}
