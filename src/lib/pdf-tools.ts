export type PdfTool = {
  slug: string;
  title: string;
  description: string;
  details: string;
  icon: string;
  action: string;
  inputLabel: string;
  inputAccept?: string;
  multiple?: boolean;
  controls: {
    pages?: boolean;
    rotation?: boolean;
    quality?: boolean;
    password?: boolean;
    format?: boolean;
  };
  relatedSlugs: string[];
  faq: Array<{ question: string; answer: string }>;
};

export const pdfTools: PdfTool[] = [
  {
    slug: "merge-pdf",
    title: "Merge PDF",
    description: "Combine multiple PDF files into a single document.",
    details: "Merge several PDF files locally in the browser and download one unified file.",
    icon: "🧩",
    action: "Merge",
    inputLabel: "Upload one or more PDF files",
    inputAccept: ".pdf",
    multiple: true,
    controls: { pages: true },
    relatedSlugs: ["split-pdf", "compress-pdf", "image-to-pdf"],
    faq: [
      { question: "Can I merge many PDFs at once?", answer: "Yes. Upload multiple PDF files and combine them in a single pass." },
      { question: "Does it work locally?", answer: "Yes. All processing happens in your browser." }
    ]
  },
  {
    slug: "split-pdf",
    title: "Split PDF",
    description: "Split a PDF into separate documents by page range.",
    details: "Upload one PDF and split it into smaller files based on the page numbers you enter.",
    icon: "✂️",
    action: "Split",
    inputLabel: "Upload a PDF file",
    inputAccept: ".pdf",
    controls: { pages: true },
    relatedSlugs: ["merge-pdf", "rotate-pdf", "extract-images"],
    faq: [
      { question: "How do I define the split?", answer: "Enter a page range such as 1-3 or 4-6 to create smaller PDF outputs." },
      { question: "Will the original PDF stay unchanged?", answer: "Yes. The tool creates new split files without altering the source file." }
    ]
  },
  {
    slug: "rotate-pdf",
    title: "Rotate PDF",
    description: "Rotate PDF pages clockwise or counterclockwise.",
    details: "Rotate one or more PDF pages in your browser and export a corrected document.",
    icon: "🔄",
    action: "Rotate",
    inputLabel: "Upload a PDF file",
    inputAccept: ".pdf",
    controls: { rotation: true },
    relatedSlugs: ["split-pdf", "compress-pdf", "password-protect-pdf"],
    faq: [
      { question: "Can I rotate all pages?", answer: "Yes. The rotation setting applies to every page in the document." },
      { question: "Does it preserve the content?", answer: "Yes. Orientation is updated without changing the underlying content." }
    ]
  },
  {
    slug: "compress-pdf",
    title: "Compress PDF",
    description: "Reduce the file size of PDFs without sacrificing too much quality.",
    details: "Compress PDF documents locally by lowering image quality and simplifying the output.",
    icon: "🗜️",
    action: "Compress",
    inputLabel: "Upload a PDF file",
    inputAccept: ".pdf",
    controls: { quality: true },
    relatedSlugs: ["merge-pdf", "rotate-pdf", "password-protect-pdf"],
    faq: [
      { question: "Will compression remove text quality?", answer: "Text remains intact while images may be lightly optimized for size." },
      { question: "Is the output smaller?", answer: "Yes. The goal is to deliver a smaller PDF file for sharing or uploading." }
    ]
  },
  {
    slug: "image-to-pdf",
    title: "Image to PDF",
    description: "Convert images to a PDF document.",
    details: "Upload one or more images and create a polished PDF document from them.",
    icon: "🖼️",
    action: "Create PDF",
    inputLabel: "Upload one or more images",
    inputAccept: "image/*",
    multiple: true,
    controls: { format: true },
    relatedSlugs: ["merge-pdf", "extract-images", "compress-pdf"],
    faq: [
      { question: "Can I convert multiple images?", answer: "Yes. Each uploaded image becomes a page in the generated PDF." },
      { question: "What image formats are supported?", answer: "Common formats such as JPEG, PNG, WebP, and AVIF are accepted." }
    ]
  },
  {
    slug: "extract-images",
    title: "Extract Images",
    description: "Extract embedded images from a PDF.",
    details: "Upload a PDF and export the images it contains into separate image files.",
    icon: "📸",
    action: "Extract",
    inputLabel: "Upload a PDF file",
    inputAccept: ".pdf",
    controls: {},
    relatedSlugs: ["image-to-pdf", "split-pdf", "merge-pdf"],
    faq: [
      { question: "Will the extracted images be high quality?", answer: "The browser extracts the images embedded in the PDF as-is." },
      { question: "Can I get all images?", answer: "Yes. The tool exports each embedded image it detects from the uploaded PDF." }
    ]
  },
  {
    slug: "password-protect-pdf",
    title: "Password Protect PDF",
    description: "Secure a PDF with a password.",
    details: "Protect PDF documents locally by adding a password for opening or editing.",
    icon: "🔐",
    action: "Protect",
    inputLabel: "Upload a PDF file",
    inputAccept: ".pdf",
    controls: { password: true },
    relatedSlugs: ["compress-pdf", "rotate-pdf", "merge-pdf"],
    faq: [
      { question: "Does this encrypt the file?", answer: "Yes. A password is added to help secure the PDF before sharing it." },
      { question: "Can I choose a custom password?", answer: "Yes. Enter your own password and use the protected file for sharing." }
    ]
  }
];

export function findPdfTool(slug: string) {
  return pdfTools.find((tool) => tool.slug === slug);
}

export function findRelatedPdfTools(slug: string) {
  const tool = findPdfTool(slug);
  if (!tool) return [];
  return pdfTools.filter((item) => tool.relatedSlugs.includes(item.slug));
}
