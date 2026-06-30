"use client";

import Link from "next/link";
import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { FAQ } from "@/components/ui/faq";
import { useToast } from "@/components/ui/toast";
import type { SeoTool } from "@/lib/seo-tools";
import { findRelatedSeoTools } from "@/lib/seo-tools";

type FieldValue = string;

export function SeoToolPage({ tool }: { tool: SeoTool }) {
  const [values, setValues] = useState<FieldValue[]>(tool.inputs.map(() => ""));
  const [output, setOutput] = useState("");
  const { showToast } = useToast();

  const relatedTools = findRelatedSeoTools(tool.slug);

  function updateValue(index: number, value: string) {
    const next = [...values];
    next[index] = value;
    setValues(next);
  }

  function handleGenerate() {
    const content = generateOutput(tool, values);
    setOutput(content);
    showToast("Output generated.");
  }

  async function handleCopy() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      showToast("Copied to clipboard.");
    } catch {
      showToast("Clipboard access denied.");
    }
  }

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "SEO Tools", href: "/seo-tools" },
          { label: tool.title },
        ]}
      />

      <section className="rounded-lg border border-border bg-card p-5 shadow-subtle sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
              {tool.icon} SEO Utility
            </span>
            <h1 className="text-3xl font-semibold sm:text-4xl">{tool.title}</h1>
            <p className="text-base leading-7 text-muted-foreground">
              {tool.details}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-background p-4">
                <h2 className="text-sm font-semibold">Tool description</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {tool.description}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <h2 className="text-sm font-semibold">Related tools</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {relatedTools.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/seo-tools/${item.slug}`}
                        className="hover:underline hover:text-foreground"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/50 p-4">
            <div className="space-y-4">
              {tool.inputs.map((input, index) => (
                <label key={input.label} className="block space-y-2 text-sm">
                  <span className="font-medium">{input.label}</span>
                  {input.multiline ? (
                    <textarea
                      value={values[index]}
                      onChange={(event) =>
                        updateValue(index, event.target.value)
                      }
                      placeholder={input.placeholder}
                      className="focus-ring min-h-24 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    />
                  ) : (
                    <input
                      type={input.type ?? "text"}
                      value={values[index]}
                      onChange={(event) =>
                        updateValue(index, event.target.value)
                      }
                      placeholder={input.placeholder}
                      className="focus-ring w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    />
                  )}
                </label>
              ))}

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="focus-ring inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  {tool.action}
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!output}
                  className="focus-ring inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Copy output
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-lg border border-border bg-card p-5 shadow-subtle">
          <h2 className="text-xl font-semibold">Generated output</h2>
          {output ? (
            <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-background p-4 text-sm leading-6 text-foreground">
              {output}
            </pre>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              Generated output will appear here after you create content.
            </p>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-5 shadow-subtle">
            <h2 className="text-lg font-semibold">Tool details</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {tool.details}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 shadow-subtle">
            <h2 className="text-lg font-semibold">FAQ</h2>
            <div className="mt-4">
              <FAQ items={tool.faq} />
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function generateOutput(tool: SeoTool, values: string[]) {
  const [first, second, third, fourth] = values;

  switch (tool.slug) {
    case "meta-tag-generator": {
      const title = first || "Example Page";
      const description = second || "A concise page summary.";
      const keywords = third || "seo, tools";
      return `<title>${title}</title>\n<meta name="description" content="${description}" />\n<meta name="keywords" content="${keywords}" />`;
    }
    case "open-graph-generator": {
      const title = first || "Shared title";
      const description = second || "Short description";
      const image = third || "https://example.com/cover.jpg";
      return `<meta property="og:title" content="${title}" />\n<meta property="og:description" content="${description}" />\n<meta property="og:image" content="${image}" />`;
    }
    case "robots-txt-generator": {
      const disallow = first || "";
      const allow = second || "";
      const sitemap = third || "https://example.com/sitemap.xml";
      return [
        `User-agent: *`,
        disallow ? `Disallow: ${disallow}` : null,
        allow ? `Allow: ${allow}` : null,
        `Sitemap: ${sitemap}`,
      ]
        .filter(Boolean)
        .join("\n");
    }
    case "sitemap-generator": {
      const siteUrl = first || "https://example.com";
      const urls = second
        ? second.split(/\n+/).filter(Boolean)
        : ["https://example.com/home"];
      return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
        .map(
          (url) =>
            `\n  <url><loc>${siteUrl}${url.startsWith("http") ? "" : "/"}${url}</loc></url>`,
        )
        .join("")}\n</urlset>`;
    }
    case "canonical-url-generator": {
      return `<link rel="canonical" href="${first || "https://example.com/page"}" />`;
    }
    case "json-ld-generator": {
      const type = first || "Article";
      const name = second || "Example";
      const description = third || "A short description.";
      return `{"@context":"https://schema.org","@type":"${type}","name":"${name}","description":"${description}"}`;
    }
    case "twitter-card-generator": {
      const card = first || "summary_large_image";
      const title = second || "Twitter title";
      const description = third || "Short description";
      const image = fourth || "https://example.com/card.jpg";
      return `<meta name="twitter:card" content="${card}" />\n<meta name="twitter:title" content="${title}" />\n<meta name="twitter:description" content="${description}" />\n<meta name="twitter:image" content="${image}" />`;
    }
    default:
      return "";
  }
}
