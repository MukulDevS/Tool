export type FAQItem = {
  question: string;
  answer: string;
};

export type ImageTool = {
  slug: string;
  title: string;
  description: string;
  details: string;
  icon: string;
  action: string;
  inputLabel: string;
  accept: string[];
  multiple?: boolean;
  outputMime?: string;
  outputFormats?: { label: string; mime: string }[];
  controls: {
    quality?: boolean;
    dimensions?: boolean;
    crop?: boolean;
    rotate?: boolean;
    flip?: boolean;
    format?: boolean;
  };
  relatedSlugs: string[];
  faq: FAQItem[];
};

export const imageTools: ImageTool[] = [
  {
    slug: "compress-image",
    title: "Compress Image",
    description: "Shrink image files with browser-based compression and a live preview.",
    details:
      "Compress images in the browser without uploading them to a server. Adjust quality and download the optimized result instantly.",
    icon: "🗜️",
    action: "Compress",
    inputLabel: "Upload a JPEG, PNG, WebP, or AVIF image",
    accept: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    controls: { quality: true },
    relatedSlugs: ["remove-metadata", "resize-image", "crop-image"],
    faq: [
      {
        question: "Will image quality drop?",
        answer:
          "Compression re-encodes the image at a lower quality level. You can preview the result and choose the right balance between file size and clarity."
      },
      {
        question: "Does compression happen locally?",
        answer: "Yes. The entire process runs in your browser, so your image never leaves your computer."
      }
    ]
  },
  {
    slug: "resize-image",
    title: "Resize Image",
    description: "Scale images to custom dimensions while preserving sharpness and layout.",
    details:
      "Resize any supported image to a specific width and height. The browser resamples and regenerates the result on the fly.",
    icon: "📐",
    action: "Resize",
    inputLabel: "Upload a JPEG, PNG, WebP, or AVIF image",
    accept: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    controls: { quality: true, dimensions: true },
    relatedSlugs: ["crop-image", "compress-image", "batch-converter"],
    faq: [
      {
        question: "Can I resize to specific pixel dimensions?",
        answer: "Yes. Enter a width and height and the browser will resize the image to the requested size."
      },
      {
        question: "Will the browser preserve aspect ratio?",
        answer:
          "The tool resizes to the exact dimensions provided, so choose values that preserve the image’s aspect ratio if that is important."
      }
    ]
  },
  {
    slug: "crop-image",
    title: "Crop Image",
    description: "Crop images by width and height to remove unwanted edges or focus on a central subject.",
    details:
      "Crop images directly in your browser by specifying the output frame. The tool centers the crop area for a quick, precise result.",
    icon: "✂️",
    action: "Crop",
    inputLabel: "Upload a JPEG, PNG, WebP, or AVIF image",
    accept: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    controls: { quality: true, crop: true },
    relatedSlugs: ["resize-image", "compress-image", "rotate-image"],
    faq: [
      {
        question: "How is the crop area chosen?",
        answer:
          "The tool centers the crop region inside the image. For custom crops, specify the width and height you want to keep."
      },
      {
        question: "Can I crop and then resize?",
        answer:
          "Yes. Use crop first to tighten the image, then use Resize Image for exact export dimensions."
      }
    ]
  },
  {
    slug: "rotate-image",
    title: "Rotate Image",
    description: "Rotate photos and graphics by 90, 180, or 270 degrees in the browser.",
    details:
      "Rotate images instantly using HTML canvas. Choose from standard rotation angles and download the corrected version.",
    icon: "🔄",
    action: "Rotate",
    inputLabel: "Upload a JPEG, PNG, WebP, or AVIF image",
    accept: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    controls: { quality: true, rotate: true },
    relatedSlugs: ["flip-image", "crop-image", "remove-metadata"],
    faq: [
      {
        question: "Does rotation change the image quality?",
        answer:
          "The tool re-encodes the rotated image. Quality remains high, and the result is optimized for download."
      },
      {
        question: "Can I rotate photos by 180 degrees?",
        answer: "Yes. Choose 90, 180, or 270 degrees for common rotation needs."
      }
    ]
  },
  {
    slug: "flip-image",
    title: "Flip Image",
    description: "Flip images horizontally or vertically to mirror or invert the image.",
    details:
      "Flip images in the browser with a single click. Choose horizontal or vertical inversion and download the mirrored result.",
    icon: "↔️",
    action: "Flip",
    inputLabel: "Upload a JPEG, PNG, WebP, or AVIF image",
    accept: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    controls: { quality: true, flip: true },
    relatedSlugs: ["rotate-image", "crop-image", "compress-image"],
    faq: [
      {
        question: "Can I flip an image both horizontally and vertically?",
        answer: "Yes. Activate one or both flip directions to create mirrored or inverted versions of the image."
      },
      {
        question: "Is the process local?",
        answer: "Yes. All flipping is handled locally in your browser without uploading the file."
      }
    ]
  },
  {
    slug: "jpg-to-png",
    title: "JPG to PNG",
    description: "Convert JPEG images to PNG for lossless transparency support and better editing.",
    details:
      "Convert JPEG photos to PNG format instantly. The browser creates a new PNG file that preserves the original image content.",
    icon: "🖼️",
    action: "Convert",
    inputLabel: "Upload a JPEG image",
    accept: ["image/jpeg"],
    outputMime: "image/png",
    controls: { quality: true },
    relatedSlugs: ["png-to-jpg", "png-to-webp", "batch-converter"],
    faq: [
      {
        question: "Will the converted PNG be lossless?",
        answer:
          "Yes. PNG is a lossless format. Conversion from JPEG preserves the visible image while encoding it in PNG."
      }
    ]
  },
  {
    slug: "png-to-jpg",
    title: "PNG to JPG",
    description: "Convert PNG images to JPEG for smaller downloads and broad compatibility.",
    details:
      "Convert PNG files to JPEG in the browser and control output quality for a smaller image footprint.",
    icon: "📷",
    action: "Convert",
    inputLabel: "Upload a PNG image",
    accept: ["image/png"],
    outputMime: "image/jpeg",
    controls: { quality: true },
    relatedSlugs: ["jpg-to-png", "jpg-to-webp", "batch-converter"],
    faq: [
      {
        question: "Can I preserve transparency?",
        answer:
          "JPEG does not support transparency. Transparent areas will be flattened against a white background during conversion."
      }
    ]
  },
  {
    slug: "png-to-webp",
    title: "PNG to WebP",
    description: "Convert PNG to WebP for modern browser delivery and smaller file sizes.",
    details:
      "Create WebP images from PNG files in the browser. This is ideal for faster loading and modern web optimization.",
    icon: "🌐",
    action: "Convert",
    inputLabel: "Upload a PNG image",
    accept: ["image/png"],
    outputMime: "image/webp",
    controls: { quality: true },
    relatedSlugs: ["jpg-to-webp", "webp-to-png", "batch-converter"],
    faq: [
      {
        question: "Is WebP supported in browsers?",
        answer:
          "Most modern browsers support WebP. The tool generates a WebP file that is smaller than PNG for typical images."
      }
    ]
  },
  {
    slug: "jpg-to-webp",
    title: "JPG to WebP",
    description: "Convert JPEG files to WebP for smaller downloads and modern web delivery.",
    details:
      "Convert JPEG images to WebP in the browser while preserving quality and reducing file size.",
    icon: "🟦",
    action: "Convert",
    inputLabel: "Upload a JPEG image",
    accept: ["image/jpeg"],
    outputMime: "image/webp",
    controls: { quality: true },
    relatedSlugs: ["png-to-webp", "webp-to-jpg", "batch-converter"],
    faq: [
      {
        question: "Does WebP reduce file size?",
        answer:
          "Yes. WebP is usually smaller than JPEG at similar quality levels, especially for photographs and detailed images."
      }
    ]
  },
  {
    slug: "webp-to-png",
    title: "WebP to PNG",
    description: "Convert WebP images to PNG for compatibility with editors and legacy systems.",
    details:
      "Convert WebP files to PNG locally in your browser. Use this when you need a widely supported, lossless image format.",
    icon: "🟩",
    action: "Convert",
    inputLabel: "Upload a WebP image",
    accept: ["image/webp"],
    outputMime: "image/png",
    controls: { quality: true },
    relatedSlugs: ["webp-to-jpg", "png-to-webp", "batch-converter"],
    faq: [
      {
        question: "Why convert WebP to PNG?",
        answer:
          "PNG is widely compatible with editors and legacy systems. Converting from WebP lets you work with image formats that support transparency and editing."
      }
    ]
  },
  {
    slug: "webp-to-jpg",
    title: "WebP to JPG",
    description: "Convert WebP images to JPEG for maximum compatibility and smaller delivery.",
    details:
      "Convert WebP files to JPEG in the browser. This is useful when you need a format that is supported everywhere.",
    icon: "🟨",
    action: "Convert",
    inputLabel: "Upload a WebP image",
    accept: ["image/webp"],
    outputMime: "image/jpeg",
    controls: { quality: true },
    relatedSlugs: ["webp-to-png", "jpg-to-webp", "batch-converter"],
    faq: [
      {
        question: "Will the conversion keep quality?",
        answer:
          "Yes. You can choose an output quality level and preview the result before downloading."
      }
    ]
  },
  {
    slug: "avif-to-jpg",
    title: "AVIF to JPG",
    description: "Convert AVIF images to JPEG natively in the browser.",
    details:
      "Convert AVIF images to JPEG for compatibility while preserving a high-quality result.",
    icon: "🟧",
    action: "Convert",
    inputLabel: "Upload an AVIF image",
    accept: ["image/avif"],
    outputMime: "image/jpeg",
    controls: { quality: true },
    relatedSlugs: ["heic-to-jpg", "jpg-to-webp", "batch-converter"],
    faq: [
      {
        question: "Does the browser need AVIF support?",
        answer:
          "Yes. Modern browsers can decode AVIF. If your browser does not support AVIF, the tool will show a compatibility message."
      }
    ]
  },
  {
    slug: "heic-to-jpg",
    title: "HEIC to JPG",
    description: "Convert HEIC images to JPEG for broader compatibility and easy sharing.",
    details:
      "Convert HEIC files to JPEG using browser decoding when available. This is useful for images exported from Apple devices.",
    icon: "🟥",
    action: "Convert",
    inputLabel: "Upload a HEIC image",
    accept: ["image/heic", "image/heif"],
    outputMime: "image/jpeg",
    controls: { quality: true },
    relatedSlugs: ["avif-to-jpg", "remove-metadata", "batch-converter"],
    faq: [
      {
        question: "Is HEIC conversion supported in all browsers?",
        answer:
          "HEIC support varies across browsers. If the file cannot be decoded locally, the tool provides a compatibility warning."
      }
    ]
  },
  {
    slug: "remove-metadata",
    title: "Remove Metadata",
    description: "Strip EXIF and metadata from images for privacy and smaller file sizes.",
    details:
      "Remove metadata by re-encoding the image in your browser. The result retains the visual content while dropping hidden EXIF data.",
    icon: "🗂️",
    action: "Clean",
    inputLabel: "Upload a JPEG, PNG, WebP, or AVIF image",
    accept: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    outputMime: undefined,
    controls: { quality: true },
    relatedSlugs: ["compress-image", "crop-image", "batch-converter"],
    faq: [
      {
        question: "What metadata is removed?",
        answer:
          "The tool removes EXIF and other embedded metadata by re-encoding the visible image data. Captions, camera settings, and GPS tags are stripped."
      }
    ]
  },
  {
    slug: "batch-converter",
    title: "Batch Converter",
    description: "Convert multiple image files to a single format in one browser session.",
    details:
      "Select multiple source files and convert them all to the same output format with a single action. This is ideal for bulk workflow preparation.",
    icon: "📦",
    action: "Convert batch",
    inputLabel: "Upload multiple images",
    accept: ["image/jpeg", "image/png", "image/webp", "image/avif", "image/heic", "image/heif"],
    multiple: true,
    outputFormats: [
      { label: "JPEG", mime: "image/jpeg" },
      { label: "PNG", mime: "image/png" },
      { label: "WebP", mime: "image/webp" }
    ],
    controls: { quality: true, format: true },
    relatedSlugs: ["compress-image", "jpg-to-webp", "png-to-jpg"],
    faq: [
      {
        question: "Can I convert many images at once?",
        answer:
          "Yes. Upload multiple supported images and choose a single output format for all files. The browser will process each one locally."
      }
    ]
  }
];

export function findImageTool(slug: string) {
  return imageTools.find((tool) => tool.slug === slug);
}

export function findRelatedTools(slug: string) {
  const tool = findImageTool(slug);
  if (!tool) return [];
  return imageTools.filter((item) => tool.relatedSlugs.includes(item.slug));
}
