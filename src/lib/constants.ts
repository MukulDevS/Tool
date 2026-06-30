export const siteConfig = {
  name: "Saaa Tools",
  description:
    "A curated workspace for image, video, PDF, developer, and SEO tools.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://saas-tools.vercel.app",
  navItems: [
    { label: "Image Tools", href: "/image-tools" },
    { label: "Video Tools", href: "/video-tools" },
    { label: "PDF Tools", href: "/pdf-tools" },
    { label: "Developer Tools", href: "/developer-tools" },
    { label: "SEO Tools", href: "/seo-tools" }
  ]
};

export type ToolCategory = {
  title: string;
  slug: string;
  description: string;
  icon: string;
  toolsPlanned: number;
  accent: string;
};

export const toolCategories: ToolCategory[] = [
  {
    title: "Image Tools",
    slug: "image-tools",
    description: "Optimize, convert, resize, and prepare images for modern web workflows.",
    icon: "IMG",
    toolsPlanned: 15,
    accent: "bg-emerald-500"
  },
  {
    title: "Video Tools",
    slug: "video-tools",
    description: "Utilities for video conversion, compression, trimming, and metadata.",
    icon: "VID",
    toolsPlanned: 6,
    accent: "bg-rose-500"
  },
  {
    title: "PDF Tools",
    slug: "pdf-tools",
    description: "Merge, split, compress, protect, and transform PDF documents.",
    icon: "PDF",
    toolsPlanned: 7,
    accent: "bg-amber-500"
  },
  {
    title: "Developer Tools",
    slug: "developer-tools",
    description: "Formatters, encoders, generators, validators, and debugging helpers.",
    icon: "DEV",
    toolsPlanned: 10,
    accent: "bg-sky-500"
  },
  {
    title: "SEO Tools",
    slug: "seo-tools",
    description: "Audit metadata, keywords, SERP snippets, redirects, and technical SEO.",
    icon: "SEO",
    toolsPlanned: 9,
    accent: "bg-violet-500"
  }
];

export const faqs = [
  {
    question: "Are the tools available now?",
    answer:
      "This starter sets up the production application shell and category structure. Individual tools can be added next."
  },
  {
    question: "Is this ready for Vercel?",
    answer:
      "Yes. The project uses the standard Next.js App Router structure and includes production metadata, robots, and sitemap routes."
  },
  {
    question: "Does the app support dark mode?",
    answer:
      "Yes. A lightweight client theme controller persists the selected color mode and respects system preference by default."
  }
];
