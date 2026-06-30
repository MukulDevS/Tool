import type { Metadata } from "next";
import { CategoryPage } from "@/components/pages/category-page";
import { toolCategories } from "@/lib/constants";

const category = toolCategories.find((item) => item.slug === "seo-tools")!;

export const metadata: Metadata = {
  title: category.title,
  description: category.description
};

export default function SEOToolsPage() {
  return <CategoryPage category={category} />;
}
