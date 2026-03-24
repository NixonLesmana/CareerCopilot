import { SiteHeader } from "@/components/shared/site-header";

export default function TermsPage() {
  return (
    <>
      <SiteHeader compact />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h1 className="section-title text-5xl font-semibold">Terms</h1>
        <div className="mt-8 space-y-5 text-base leading-8 text-[var(--muted)]">
          <p>Career Copilot provides guidance and drafting assistance. Users remain responsible for reviewing all generated output before sending applications.</p>
          <p>The service must not be used to fabricate qualifications, certifications, ownership, or work history.</p>
          <p>For production launch, replace this placeholder with legally reviewed terms and acceptable-use language.</p>
        </div>
      </main>
    </>
  );
}
