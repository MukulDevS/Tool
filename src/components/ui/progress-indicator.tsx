export function ProgressIndicator({ value }: { value: number }) {
  return (
    <div className="rounded-xl border border-border bg-muted/60 p-3">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Progress</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    </div>
  );
}
