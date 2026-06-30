import type { MetadataRoute } from "next";
import { siteConfig, toolCategories } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", ...toolCategories.map((category) => `/${category.slug}`)];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8
  }));
}
