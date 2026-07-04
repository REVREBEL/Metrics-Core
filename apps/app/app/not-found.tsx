import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-background">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          404
        </h1>
        <h2 className="text-xl font-bold text-foreground">Page Not Found</h2>
        <p className="text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Return Home
      </Link>
    </div>
  );
}
