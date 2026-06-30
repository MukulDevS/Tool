"use client";

import { useRef, useState } from "react";
import { useToast } from "@/components/ui/toast";

export function UploadArea() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const { showToast } = useToast();

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setFileName(file.name);
    showToast("Upload area is ready. Tool processing will be added later.");
  }

  return (
    <div
      className="rounded-lg border border-dashed border-border bg-muted/50 p-6 text-center"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        handleFiles(event.dataTransfer.files);
      }}
    >
      <input
        ref={inputRef}
        className="sr-only"
        type="file"
        onChange={(event) => handleFiles(event.target.files)}
      />
      <div className="mx-auto grid size-12 place-items-center rounded-md bg-background text-lg font-semibold">
        ↑
      </div>
      <div className="mt-4 space-y-2">
        <p className="text-sm font-semibold">Drop a file to test the upload shell</p>
        <p className="text-sm text-muted-foreground">
          File handling is wired for the interface only. Tool logic comes later.
        </p>
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="focus-ring mt-5 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
      >
        Choose file
      </button>
      {fileName ? <p className="mt-3 text-xs text-muted-foreground">{fileName}</p> : null}
    </div>
  );
}
