export type SeoTool = {
  slug: string;
  title: string;
  description: string;
  details: string;
  icon: string;
  action: string;
  inputs: Array<{
    label: string;
    placeholder?: string;
    type?: string;
    multiline?: boolean;
  }>;
  relatedSlugs: string[];
  faq: Array<{ question: string; answer: string }>;
};

export const seoTools: SeoTool[] = [
  {
    slug: "meta-tag-generator",
    title: "Meta Tag Generator",
    description: "Generate title and description tags for any page.",
    details: "Create standard meta tags for search engines and social previews quickly.",
    icon: "🏷️",
    action: "Generate",
    inputs: [
      { label: "Page title", placeholder: "Example: Best SEO Tools" },
      { label: "Meta description", placeholder: "Short summary of the page", multiline: true },
      { label: "Keywords", placeholder: "keyword one, keyword two" }
    ],
    relatedSlugs: ["open-graph-generator", "canonical-url-generator"],
    faq: [
      { question: "Can I copy the output?", answer: "Yes. Every generated result includes a copy button." },
      { question: "Is this suitable for blogs?", answer: "Yes. It is ideal for landing pages, blog posts, and product pages." }
    ]
  },
  {
    slug: "open-graph-generator",
    title: "Open Graph Generator",
    description: "Generate OG tags for Facebook, LinkedIn, and other social platforms.",
    details: "Create open graph metadata for better social sharing and previews.",
    icon: "📣",
    action: "Generate",
    inputs: [
      { label: "Title", placeholder: "Social title" },
      { label: "Description", placeholder: "Social description", multiline: true },
      { label: "Image URL", placeholder: "https://example.com/cover.jpg" }
    ],
    relatedSlugs: ["twitter-card-generator", "meta-tag-generator"],
    faq: [
      { question: "Will this help social previews?", answer: "Yes. OG tags improve how links appear when shared on social networks." },
      { question: "Can I copy the output?", answer: "Yes. The result can be copied instantly for use in your page head." }
    ]
  },
  {
    slug: "robots-txt-generator",
    title: "Robots.txt Generator",
    description: "Create a robots.txt file for search engine crawlers.",
    details: "Generate a custom robots.txt block for indexing and crawling rules.",
    icon: "🤖",
    action: "Generate",
    inputs: [
      { label: "Disallow paths", placeholder: "e.g. /private" },
      { label: "Allow paths", placeholder: "e.g. /public" },
      { label: "Sitemap URL", placeholder: "https://example.com/sitemap.xml" }
    ],
    relatedSlugs: ["sitemap-generator", "canonical-url-generator"],
    faq: [
      { question: "What does robots.txt do?", answer: "It tells crawlers which parts of your site to access or ignore." },
      { question: "Can I copy the output?", answer: "Yes. Copy the generated content directly." }
    ]
  },
  {
    slug: "sitemap-generator",
    title: "Sitemap Generator",
    description: "Generate a sitemap.xml list of your URLs.",
    details: "Create an XML sitemap from a list of page URLs for search engines.",
    icon: "🗺️",
    action: "Generate",
    inputs: [
      { label: "Site URL", placeholder: "https://example.com" },
      { label: "URLs", placeholder: "https://example.com/page-1\nhttps://example.com/page-2", multiline: true }
    ],
    relatedSlugs: ["robots-txt-generator", "canonical-url-generator"],
    faq: [
      { question: "Why use a sitemap?", answer: "It helps search engines discover and index your content more efficiently." },
      { question: "Can I copy the output?", answer: "Yes. The entire XML output can be copied with one click." }
    ]
  },
  {
    slug: "canonical-url-generator",
    title: "Canonical URL Generator",
    description: "Generate canonical link tags for preferred URLs.",
    details: "Create canonical tags that help avoid duplicate content issues.",
    icon: "🔗",
    action: "Generate",
    inputs: [
      { label: "Canonical URL", placeholder: "https://example.com/preferred-page" }
    ],
    relatedSlugs: ["meta-tag-generator", "sitemap-generator"],
    faq: [
      { question: "What is a canonical URL?", answer: "It identifies the preferred version of a page when duplicates exist." },
      { question: "Can I copy it?", answer: "Yes. The generated tag is ready to copy." }
    ]
  },
  {
    slug: "json-ld-generator",
    title: "JSON-LD Generator",
    description: "Generate structured data markup for rich results.",
    details: "Create JSON-LD snippets for articles, products, and organization pages.",
    icon: "🧩",
    action: "Generate",
    inputs: [
      { label: "Type", placeholder: "Article" },
      { label: "Name", placeholder: "Example Page" },
      { label: "Description", placeholder: "Short description", multiline: true }
    ],
    relatedSlugs: ["meta-tag-generator", "open-graph-generator"],
    faq: [
      { question: "What is JSON-LD?", answer: "It is structured data that helps search engines understand your content." },
      { question: "Can I copy the output?", answer: "Yes. The generated JSON-LD block can be copied instantly." }
    ]
  },
  {
    slug: "twitter-card-generator",
    title: "Twitter Card Generator",
    description: "Generate Twitter card metadata for engaging previews.",
    details: "Create the meta tags used for Twitter card previews on shared links.",
    icon: "🐦",
    action: "Generate",
    inputs: [
      { label: "Card type", placeholder: "summary_large_image" },
      { label: "Title", placeholder: "Twitter title" },
      { label: "Description", placeholder: "Short description", multiline: true },
      { label: "Image URL", placeholder: "https://example.com/card.jpg" }
    ],
    relatedSlugs: ["open-graph-generator", "meta-tag-generator"],
    faq: [
      { question: "What is a Twitter card?", answer: "It controls how your link preview appears when shared on X/Twitter." },
      { question: "Can I copy it?", answer: "Yes. The output is ready to copy and paste." }
    ]
  }
];

export function findSeoTool(slug: string) {
  return seoTools.find((tool) => tool.slug === slug);
}

export function findRelatedSeoTools(slug: string) {
  const tool = findSeoTool(slug);
  if (!tool) return [];
  return seoTools.filter((item) => tool.relatedSlugs.includes(item.slug));
}
