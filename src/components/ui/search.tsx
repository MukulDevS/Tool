"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ToolCategory } from "@/lib/constants";

export function Search({ categories }: { categories: ToolCategory[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return categories.filter((category) =>
      `${category.title} ${category.description}`.toLowerCase().includes(normalized)
    );
  }, [categories, query]);

  return (
    <div className="relative max-w-xl">
      <label htmlFor="site-search" className="sr-only">
        Search categories
      </label>
      <input
        id="site-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search categories"
        className="focus-ring h-12 w-full rounded-md border border-border bg-background px-4 text-sm shadow-sm placeholder:text-muted-foreground"
        type="search"
      />
      {results.length > 0 ? (
        <div className="absolute left-0 right-0 top-14 z-20 overflow-hidden rounded-lg border border-border bg-card shadow-subtle">
          {results.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="focus-ring block px-4 py-3 text-sm hover:bg-muted"
            >
              <span className="font-medium">{category.title}</span>
              <span className="mt-1 block text-muted-foreground">{category.description}</span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
