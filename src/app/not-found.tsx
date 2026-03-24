import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">404</p>
        <h1 className="section-title mt-4 text-5xl font-semibold">This page drifted out of the application flow.</h1>
        <p className="mt-5 text-base leading-7 text-[var(--muted)]">
          Head back to the dashboard and keep building your next internship-ready application package.
        </p>
        <Link
          href="/dashboard"
          className="mt-8 inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm text-white"
        >
          Return to dashboard
        </Link>
      </div>
    </main>
  );
}
