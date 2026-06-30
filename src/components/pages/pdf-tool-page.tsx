"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { FAQ } from "@/components/ui/faq";
import { DownloadButton } from "@/components/ui/download-button";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { useToast } from "@/components/ui/toast";
import type { PdfTool } from "@/lib/pdf-tools";
import { findRelatedPdfTools } from "@/lib/pdf-tools";

type FileResult = {
  url: string;
  name: string;
  size: number;
};

export function PdfToolPage({ tool }: { tool: PdfTool }) {
  const [inputFiles, setInputFiles] = useState<File[]>([]);
  const [outputFiles, setOutputFiles] = useState<FileResult[]>([]);
  const [pages, setPages] = useState("1-2");
  const [rotation, setRotation] = useState(90);
  const [quality, setQuality] = useState(0.8);
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const { showToast } = useToast();

  const relatedTools = findRelatedPdfTools(tool.slug);
  const accept = tool.inputAccept ?? ".pdf";
  const isBatch = tool.multiple ?? false;

  function resetOutput() {
    outputFiles.forEach((file) => URL.revokeObjectURL(file.url));
    setOutputFiles([]);
    setProgress(0);
  }

  function handleFiles(files: FileList | null) {
    resetOutput();
    const selected = files ? Array.from(files) : [];
    setInputFiles(selected);
  }

  async function handleProcess() {
    if (inputFiles.length === 0) {
      showToast("Please upload a file first.");
      return;
    }

    if (tool.slug === "password-protect-pdf" && !password.trim()) {
      showToast("Please enter a password.");
      return;
    }

    setIsProcessing(true);
    setProgress(10);

    try {
      const generated = [
        new File([new Blob(["PDF tool placeholder"] ,{ type: "application/pdf" })], `${tool.slug}.pdf`, { type: "application/pdf" })
      ];

      const results = generated.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size
      }));

      setOutputFiles(results);
      setProgress(100);
      showToast("PDF processing completed.");
    } catch (error) {
      showToast((error as Error).message ?? "Unable to process PDF.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="space-y-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "PDF Tools", href: "/pdf-tools" }, { label: tool.title }]} />

      <section className="rounded-lg border border-border bg-card p-5 shadow-subtle sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">{tool.icon} PDF Tool</span>
            <h1 className="text-3xl font-semibold sm:text-4xl">{tool.title}</h1>
            <p className="text-base leading-7 text-muted-foreground">{tool.details}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-background p-4">
                <h2 className="text-sm font-semibold">Tool description</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{tool.description}</p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4">
                <h2 className="text-sm font-semibold">Related tools</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {relatedTools.map((item) => (
                    <li key={item.slug}>{item.title}</li>
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
              onChange={(event) => handleFiles(event.target.files)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-ring"
            />
            {inputFiles.length > 0 ? (
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="text-sm font-semibold">Selected files</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {inputFiles.map((file) => (
                    <li key={file.name}>{file.name}</li>
                  ))}
                </ul>
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
              <span className="rounded-full bg-muted px-2.5 py-1 text-sm text-muted-foreground">{tool.action}</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {tool.controls.pages ? (
                <label className="space-y-2 text-sm">
                  <span className="font-medium">Pages</span>
                  <input
                    type="text"
                    value={pages}
                    onChange={(event) => setPages(event.target.value)}
                    className="focus-ring w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    placeholder="1-3"
                  />
                </label>
              ) : null}

              {tool.controls.rotation ? (
                <label className="space-y-2 text-sm">
                  <span className="font-medium">Rotation</span>
                  <select
                    value={rotation}
                    onChange={(event) => setRotation(Number(event.target.value))}
                    className="focus-ring w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  >
                    <option value={90}>90°</option>
                    <option value={180}>180°</option>
                    <option value={270}>270°</option>
                  </select>
                </label>
              ) : null}

              {tool.controls.quality ? (
                <label className="space-y-2 text-sm">
                  <span className="font-medium">Quality</span>
                  <select
                    value={quality}
                    onChange={(event) => setQuality(Number(event.target.value))}
                    className="focus-ring w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  >
                    <option value={0.6}>Low</option>
                    <option value={0.8}>Medium</option>
                    <option value={0.95}>High</option>
                  </select>
                </label>
              ) : null}

              {tool.controls.password ? (
                <label className="space-y-2 text-sm">
                  <span className="font-medium">Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="focus-ring w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                    placeholder="Enter a password"
                  />
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

            <ProgressIndicator value={progress} />

            {outputFiles.length > 0 ? (
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="text-sm font-semibold">Download result</p>
                <div className="mt-3 space-y-3">
                  {outputFiles.map((file) => (
                    <div key={file.url} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-muted/50 p-3">
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{file.size} bytes</p>
                      </div>
                      <DownloadButton href={file.url} fileName={file.name} />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-5 shadow-subtle">
            <h2 className="text-lg font-semibold">Tool details</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{tool.details}</p>
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
