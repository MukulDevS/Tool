import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-start justify-center gap-4 px-4">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground">
        The requested page does not exist yet. Return home to browse the available categories.
      </p>
      <Link
        href="/"
        className="focus-ring inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground"
      >
        Go home
      </Link>
    </main>
  );
}
