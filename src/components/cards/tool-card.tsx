import Link from "next/link";

type ToolCardProps = {
  title: string;
  description: string;
  status: string;
  href: string;
};

export function ToolCard({ title, description, status, href }: ToolCardProps) {
  return (
    <article className="rounded-lg border border-border bg-card p-5 shadow-subtle">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold">{title}</h3>
          <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
            {status}
          </span>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        <Link href={href} className="focus-ring inline-flex rounded-md text-sm font-medium text-primary">
          Open workspace
        </Link>
      </div>
    </article>
  );
}
