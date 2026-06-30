"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { FAQ } from "@/components/ui/faq";
import { DownloadButton } from "@/components/ui/download-button";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { useToast } from "@/components/ui/toast";
import type { ImageTool } from "@/lib/image-tools";
import {
  batchConvertImages,
  compressImage,
  convertImage,
  cropImage,
  flipImage,
  removeMetadata,
  resizeImage,
  rotateImage,
} from "@/lib/image-processing";
import {
  formatFileSize,
  getMimeTypeFromFile,
  readFileAsDataUrl,
} from "@/lib/image-utils";
import { findRelatedTools } from "@/lib/image-tools";

const qualityOptions = [100, 90, 80, 70, 60].map((value) => ({
  label: `${value}%`,
  value: value / 100,
}));

type FileResult = {
  url: string;
  name: string;
  size: number;
};

export function ImageToolPage({ tool }: { tool: ImageTool }) {
  const [inputFiles, setInputFiles] = useState<File[]>([]);
  const [outputFiles, setOutputFiles] = useState<FileResult[]>([]);
  const [quality, setQuality] = useState(0.92);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [rotate, setRotate] = useState(90);
  const [horizontalFlip, setHorizontalFlip] = useState(false);
  const [verticalFlip, setVerticalFlip] = useState(false);
  const [format, setFormat] = useState(tool.outputMime ?? "image/jpeg");
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { showToast } = useToast();

  const accept = tool.accept.join(",");
  const relatedTools = findRelatedTools(tool.slug);
  const isBatch = tool.multiple ?? false;
  const firstFile = useMemo(() => inputFiles[0] ?? null, [inputFiles]);
  const supportedMime = useMemo(
    () => (firstFile ? getMimeTypeFromFile(firstFile) : "Unknown"),
    [firstFile],
  );

  function resetOutput() {
    outputFiles.forEach((file) => URL.revokeObjectURL(file.url));
    setOutputFiles([]);
    setPreviewUrl(null);
    setProgress(0);
  }

  async function handleFileSelection(files: FileList | null) {
    resetOutput();
    const selectedFiles = files ? Array.from(files) : [];
    setInputFiles(selectedFiles);
    if (selectedFiles.length > 0) {
      setPreviewUrl(await readFileAsDataUrl(selectedFiles[0]));
    }
    setQuality(0.92);
    setProgress(0);
  }

  async function handleProcess() {
    if (inputFiles.length === 0) {
      showToast("Please upload at least one image first.");
      return;
    }

    setIsProcessing(true);
    setProgress(10);

    try {
      let results: File[] = [];

      if (tool.slug === "batch-converter") {
        results = await batchConvertImages(
          inputFiles,
          format,
          quality,
          setProgress,
        );
      } else {
        const source = inputFiles[0];
        let result: File;

        switch (tool.slug) {
          case "compress-image":
            result = await compressImage(source, quality);
            break;
          case "resize-image":
            result = await resizeImage(source, width, height, quality);
            break;
          case "crop-image":
            result = await cropImage(source, width, height, quality);
            break;
          case "rotate-image":
            result = await rotateImage(source, rotate, quality);
            break;
          case "flip-image":
            result = await flipImage(
              source,
              horizontalFlip,
              verticalFlip,
              quality,
            );
            break;
          case "remove-metadata":
            result = await removeMetadata(source, quality);
            break;
          default:
            result = await convertImage(
              source,
              tool.outputMime ?? format,
              quality,
            );
            break;
        }

        results = [result];
      }

      const fileResults = await Promise.all(
        results.map(async (result) => ({
          url: URL.createObjectURL(result),
          name: result.name,
          size: result.size,
        })),
      );

      setOutputFiles(fileResults);
      setPreviewUrl(await readFileAsDataUrl(results[0]));
      setProgress(100);
      showToast("Image processing completed.");
    } catch (error) {
      showToast((error as Error).message ?? "Unable to process image.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Image Tools", href: "/image-tools" },
          { label: tool.title },
        ]}
      />

      <section className="rounded-lg border border-border bg-card p-5 shadow-subtle sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
              {tool.icon} Image Tool
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
                  {relatedTools.map((related) => (
                    <li key={item.slug}>
                      <Link
                        href={`/pdf-tools/${item.slug}`}
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

          <div className="space-y-4 rounded-xl border border-border bg-muted/50 p-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold">Upload</p>
              <p className="text-sm text-muted-foreground">{tool.inputLabel}</p>
            </div>
            <input
              type="file"
              accept={accept}
              multiple={isBatch}
              onChange={(event) => handleFileSelection(event.target.files)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-ring"
            />
            {inputFiles.length > 0 ? (
              <div className="space-y-2 rounded-lg border border-border bg-background p-4">
                <p className="text-sm font-semibold">Selected files</p>
                {inputFiles.map((file) => (
                  <div
                    key={file.name}
                    className="text-sm text-muted-foreground"
                  >
                    <p>{file.name}</p>
                    <p>{formatFileSize(file.size)}</p>
                  </div>
                ))}
                <p className="text-sm text-muted-foreground">
                  Detected type: {supportedMime}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-lg border border-border bg-card p-5 shadow-subtle">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-semibold">Workspace</h2>
              <span className="rounded-full bg-muted px-2.5 py-1 text-sm text-muted-foreground">
                {tool.action}
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {tool.controls.quality ? (
                <label className="space-y-2 text-sm">
                  <span className="font-medium">Quality</span>
                  <select
                    className="focus-ring w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    value={quality}
                    onChange={(event) => setQuality(Number(event.target.value))}
                  >
                    {qualityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}

              {tool.controls.dimensions ? (
                <>
                  <label className="space-y-2 text-sm">
                    <span className="font-medium">Width</span>
                    <input
                      type="number"
                      min={1}
                      value={width}
                      onChange={(event) => setWidth(Number(event.target.value))}
                      className="focus-ring w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="font-medium">Height</span>
                    <input
                      type="number"
                      min={1}
                      value={height}
                      onChange={(event) =>
                        setHeight(Number(event.target.value))
                      }
                      className="focus-ring w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    />
                  </label>
                </>
              ) : null}

              {tool.controls.crop ? (
                <div className="space-y-2 text-sm">
                  <span className="font-medium">Crop size</span>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <input
                      type="number"
                      min={1}
                      value={width}
                      onChange={(event) => setWidth(Number(event.target.value))}
                      placeholder="Width"
                      className="focus-ring w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    />
                    <input
                      type="number"
                      min={1}
                      value={height}
                      onChange={(event) =>
                        setHeight(Number(event.target.value))
                      }
                      placeholder="Height"
                      className="focus-ring w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              ) : null}

              {tool.controls.rotate ? (
                <label className="space-y-2 text-sm">
                  <span className="font-medium">Rotate</span>
                  <select
                    value={rotate}
                    onChange={(event) => setRotate(Number(event.target.value))}
                    className="focus-ring w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  >
                    <option value={90}>90°</option>
                    <option value={180}>180°</option>
                    <option value={270}>270°</option>
                  </select>
                </label>
              ) : null}

              {tool.controls.flip ? (
                <div className="grid gap-2">
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={horizontalFlip}
                      onChange={(event) =>
                        setHorizontalFlip(event.target.checked)
                      }
                      className="focus-ring rounded border border-border bg-background"
                    />
                    Flip horizontal
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={verticalFlip}
                      onChange={(event) =>
                        setVerticalFlip(event.target.checked)
                      }
                      className="focus-ring rounded border border-border bg-background"
                    />
                    Flip vertical
                  </label>
                </div>
              ) : null}

              {tool.controls.format ? (
                <label className="space-y-2 text-sm">
                  <span className="font-medium">Output format</span>
                  <select
                    value={format}
                    onChange={(event) => setFormat(event.target.value)}
                    className="focus-ring w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  >
                    {tool.outputFormats?.map((option) => (
                      <option key={option.mime} value={option.mime}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleProcess}
                className="focus-ring inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isProcessing ? "Processing..." : tool.action}
              </button>
              <button
                type="button"
                onClick={resetOutput}
                className="focus-ring inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                Reset
              </button>
            </div>

            <div className="space-y-4">
              <ProgressIndicator value={progress} />

              {previewUrl ? (
                <div className="rounded-lg border border-border bg-background p-4">
                  <p className="text-sm font-semibold">Preview</p>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="mt-3 max-h-80 w-full rounded-md object-contain"
                  />
                </div>
              ) : null}

              {outputFiles.length > 0 ? (
                <div className="rounded-lg border border-border bg-background p-4">
                  <p className="text-sm font-semibold">Download result</p>
                  <div className="mt-3 space-y-3">
                    {outputFiles.map((file) => (
                      <div
                        key={file.url}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-muted/50 p-3"
                      >
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                        <DownloadButton href={file.url} fileName={file.name} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-5 shadow-subtle">
            <h2 className="text-lg font-semibold">Tool details</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {tool.details}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 shadow-subtle">
            <h2 className="text-lg font-semibold">
              Frequently asked questions
            </h2>
            <div className="mt-4">
              <FAQ items={tool.faq} />
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
