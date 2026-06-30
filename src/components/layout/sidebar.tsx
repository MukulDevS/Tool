import Link from "next/link";
import { toolCategories } from "@/lib/constants";

export function Sidebar() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 space-y-3">
        <p className="px-2 text-xs font-semibold uppercase text-muted-foreground">
          Categories
        </p>
        <nav className="space-y-1" aria-label="Tool categories">
          {toolCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="focus-ring flex items-center justify-between rounded-md px-2 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <span>{category.title}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                {category.toolsPlanned}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
