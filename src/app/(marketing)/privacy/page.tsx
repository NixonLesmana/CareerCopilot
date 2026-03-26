import { SiteHeader } from "@/components/shared/site-header";

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader compact />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h1 className="section-title text-5xl font-semibold">Privacy</h1>
        <div className="mt-8 space-y-5 text-base leading-8 text-[var(--muted)]">
          <p>Career Copilot stores resumes, job descriptions, and generated artifacts only to operate the product features you explicitly use.</p>
        </div>
      </main>
    </>
  );
}
