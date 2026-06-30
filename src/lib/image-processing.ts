import { getOutputFileName, readFileAsDataUrl } from "@/lib/image-utils";

function createCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

async function loadImage(file: Blob): Promise<HTMLImageElement | ImageBitmap> {
  if (typeof createImageBitmap !== "undefined") {
    try {
      return await createImageBitmap(file);
    } catch {
      // fall through to image fallback
    }
  }

  const dataUrl = await readFileAsDataUrl(file);
  const img = new Image();
  img.src = dataUrl;
  await img.decode();
  return img;
}

async function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to generate output blob."));
      },
      type,
      quality
    );
  });
}

function bindImageSource(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, type: string) {
  if (type === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

async function createOutputFile(
  file: File,
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality: number,
  suffix: string
) {
  const blob = await canvasToBlob(canvas, mimeType, quality);
  const outputName = getOutputFileName(file, suffix, mimeType);
  return new File([blob], outputName, { type: mimeType });
}

export async function compressImage(file: File, quality = 0.8) {
  const source = await loadImage(file);
  const width = source.width;
  const height = source.height;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable.");
  bindImageSource(canvas, ctx, file.type || "image/jpeg");
  ctx.drawImage(source, 0, 0, width, height);
  return await createOutputFile(file, canvas, file.type || "image/jpeg", quality, "-compressed");
}

export async function resizeImage(file: File, width: number, height: number, quality = 0.92) {
  const source = await loadImage(file);
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable.");
  bindImageSource(canvas, ctx, file.type || "image/jpeg");
  ctx.drawImage(source, 0, 0, width, height);
  return await createOutputFile(file, canvas, file.type || "image/jpeg", quality, `-resized`);
}

export async function cropImage(file: File, width: number, height: number, quality = 0.92) {
  const source = await loadImage(file);
  const sourceWidth = source.width;
  const sourceHeight = source.height;
  const cropWidth = Math.min(width, sourceWidth);
  const cropHeight = Math.min(height, sourceHeight);
  const sx = Math.max(0, Math.round((sourceWidth - cropWidth) / 2));
  const sy = Math.max(0, Math.round((sourceHeight - cropHeight) / 2));
  const canvas = createCanvas(cropWidth, cropHeight);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable.");
  bindImageSource(canvas, ctx, file.type || "image/jpeg");
  ctx.drawImage(source, sx, sy, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
  return await createOutputFile(file, canvas, file.type || "image/jpeg", quality, "-cropped");
}

export async function rotateImage(file: File, degrees: number, quality = 0.92) {
  const source = await loadImage(file);
  const width = source.width;
  const height = source.height;
  const radians = (degrees * Math.PI) / 180;
  const rotatedWidth = Math.abs(Math.cos(radians) * width) + Math.abs(Math.sin(radians) * height);
  const rotatedHeight = Math.abs(Math.sin(radians) * width) + Math.abs(Math.cos(radians) * height);
  const canvas = createCanvas(Math.round(rotatedWidth), Math.round(rotatedHeight));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable.");
  bindImageSource(canvas, ctx, file.type || "image/jpeg");
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(radians);
  ctx.drawImage(source, -width / 2, -height / 2);
  return await createOutputFile(file, canvas, file.type || "image/jpeg", quality, `-rotated`);
}

export async function flipImage(file: File, horizontal: boolean, vertical: boolean, quality = 0.92) {
  const source = await loadImage(file);
  const canvas = createCanvas(source.width, source.height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable.");
  bindImageSource(canvas, ctx, file.type || "image/jpeg");
  ctx.translate(horizontal ? canvas.width : 0, vertical ? canvas.height : 0);
  ctx.scale(horizontal ? -1 : 1, vertical ? -1 : 1);
  ctx.drawImage(source, 0, 0);
  return await createOutputFile(file, canvas, file.type || "image/jpeg", quality, "-flipped");
}

export async function convertImage(file: File, outputMime: string, quality = 0.92) {
  const source = await loadImage(file);
  const canvas = createCanvas(source.width, source.height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable.");
  bindImageSource(canvas, ctx, outputMime);
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  return await createOutputFile(file, canvas, outputMime, quality, `-${outputMime.split("/").pop()}`);
}

export async function removeMetadata(file: File, quality = 0.92) {
  const source = await loadImage(file);
  const canvas = createCanvas(source.width, source.height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable.");
  bindImageSource(canvas, ctx, file.type || "image/jpeg");
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  return await createOutputFile(file, canvas, file.type || "image/jpeg", quality, "-clean");
}

export async function batchConvertImages(
  files: File[],
  outputMime: string,
  quality = 0.92,
  onProgress?: (progress: number) => void
) {
  const results: File[] = [];
  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    const converted = await convertImage(file, outputMime, quality);
    results.push(converted);
    onProgress?.(((index + 1) / files.length) * 100);
  }
  return results;
}
