import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ToolCard } from "@/components/cards/tool-card";
import { imageTools } from "@/lib/image-tools";
import { toolCategories } from "@/lib/constants";

const category = toolCategories.find((item) => item.slug === "image-tools")!;

export const metadata: Metadata = {
  title: category.title,
  description: category.description,
};

export default function ImageToolsPage() {
  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: category.title }]}
      />

      <section className="rounded-lg border border-border bg-card p-5 shadow-subtle sm:p-8">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
            {category.toolsPlanned} tools available
          </span>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            {category.title}
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            {category.description}
          </p>
        </div>
      </section>

      <section aria-labelledby="image-tools-heading" className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="image-tools-heading" className="text-2xl font-semibold">
              Image tools
            </h2>
            <p className="text-sm text-muted-foreground">
              Real browser-based image utilities with upload, conversion, and
              download workflows.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {imageTools.map((tool) => (
            <ToolCard
              key={tool.slug}
              title={tool.title}
              description={tool.description}
              status="Live"
              href={`/image-tools/${tool.slug}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
