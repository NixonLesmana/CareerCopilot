import { SiteHeader } from "@/components/shared/site-header";

export default function PricingPage() {
  return (
    <>
      <SiteHeader compact />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h1 className="section-title text-5xl font-semibold">Pricing-ready architecture</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="glass rounded-[32px] p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Free now</p>
            <p className="section-title mt-4 text-4xl font-semibold">$0</p>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">Enough room for early users to upload resumes, run analyses, and generate tailored drafts.</p>
          </div>
          <div className="glass rounded-[32px] p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Pro later</p>
            <p className="section-title mt-4 text-4xl font-semibold">Usage-based</p>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">The codebase already tracks quotas and can be extended with Stripe for further improvements.</p>
          </div>
        </div>
      </main>
    </>
  );
}
