import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CategoryCard } from "@/components/cards/category-card";
import { FAQ } from "@/components/ui/faq";
import { Search } from "@/components/ui/search";
import { ToolCard } from "@/components/cards/tool-card";
import { UploadArea } from "@/components/ui/upload-area";
import { faqs, toolCategories } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Online Tools Directory",
  description:
    "Browse upcoming image, video, PDF, developer, and SEO utilities in a fast, mobile-first tools platform."
};

export default function HomePage() {
  const featured = toolCategories.slice(0, 3);

  return (
    <div className="space-y-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }]} />

      <section className="rounded-lg border border-border bg-card p-5 shadow-subtle sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-center">
          <div className="space-y-5">
            <div className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-sm text-muted-foreground">
              Production-ready tool directory starter
            </div>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
                Fast, organized online tools for modern workflows.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Explore the category shell for image, video, PDF, developer, and SEO utilities. The app foundation is ready for individual tools to be added.
              </p>
            </div>
            <Search categories={toolCategories} />
          </div>
          <UploadArea />
        </div>
      </section>

      <section aria-labelledby="categories-heading" className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="categories-heading" className="text-2xl font-semibold">
              Tool Categories
            </h2>
            <p className="text-sm text-muted-foreground">
              Category folders are ready. Tool implementation comes next.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {toolCategories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section aria-labelledby="planned-heading" className="space-y-4">
        <h2 id="planned-heading" className="text-2xl font-semibold">
          Planned Workspaces
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((category) => (
            <ToolCard
              key={category.slug}
              title={`${category.title} Workspace`}
              description={category.description}
              status="Coming soon"
              href={`/${category.slug}`}
            />
          ))}
        </div>
      </section>

      <FAQ items={faqs} />
    </div>
  );
}
