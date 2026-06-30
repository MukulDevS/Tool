type DownloadButtonProps = {
  href: string;
  fileName: string;
};

export function DownloadButton({ href, fileName }: DownloadButtonProps) {
  return (
    <a
      href={href}
      download={fileName}
      className="focus-ring inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
    >
      Download {fileName}
    </a>
  );
}
