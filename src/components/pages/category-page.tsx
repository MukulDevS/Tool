import type { ToolCategory } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ToolCard } from "@/components/cards/tool-card";

export function CategoryPage({ category }: { category: ToolCategory }) {
  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: category.title }
        ]}
      />
      <section className="rounded-lg border border-border bg-card p-5 shadow-subtle sm:p-8">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
            {category.toolsPlanned} tools planned
          </span>
          <h1 className="text-3xl font-semibold sm:text-4xl">{category.title}</h1>
          <p className="text-base leading-7 text-muted-foreground">{category.description}</p>
        </div>
      </section>
      <section aria-labelledby="placeholder-heading" className="space-y-4">
        <h2 id="placeholder-heading" className="text-2xl font-semibold">
          Tools coming soon
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <ToolCard
            title={`${category.title} hub`}
            description="This route is ready for tool cards, filters, and upload-driven workflows."
            status="Planned"
            href={`/${category.slug}`}
          />
          <ToolCard
            title="Reusable workflow shell"
            description="Shared components are available for cards, upload areas, loading states, breadcrumbs, FAQ, and toast feedback."
            status="Ready"
            href="/"
          />
        </div>
      </section>
    </div>
  );
}
