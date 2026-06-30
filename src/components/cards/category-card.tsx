import Link from "next/link";
import type { ToolCategory } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function CategoryCard({ category }: { category: ToolCategory }) {
  return (
    <Link
      href={`/${category.slug}`}
      className="focus-ring group rounded-lg border border-border bg-card p-5 shadow-subtle transition hover:-translate-y-0.5 hover:border-primary/40"
    >
      <article className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <span className={cn("grid size-12 place-items-center rounded-md text-xs font-bold text-white", category.accent)}>
            {category.icon}
          </span>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            {category.toolsPlanned} planned
          </span>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{category.title}</h3>
          <p className="text-sm leading-6 text-muted-foreground">{category.description}</p>
        </div>
        <p className="text-sm font-medium text-primary">View category</p>
      </article>
    </Link>
  );
}
