import Link from "next/link";
import { FeatureRail } from "@/components/marketing/feature-rail";
import { MarketingHero } from "@/components/marketing/hero";
import { SiteHeader } from "@/components/shared/site-header";

export default function MarketingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <MarketingHero />
        <FeatureRail />
        <section className="px-4 pb-24 sm:px-6 lg:px-10">
          <div className="mx-auto grid max-w-[1300px] gap-8 rounded-[40px] bg-[var(--foreground)] p-10 text-white lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/55">Why it stands out</p>
              <h2 className="section-title mt-4 text-4xl font-semibold">
                Built like a real product, not a single-prompt demo.
              </h2>
            </div>
            <div className="space-y-5 text-sm leading-7 text-white/72">
              <p>Structured outputs, saved artifact history, quota tracking, exports, and privacy controls.</p>
              <p>Designed for early-career applicants who need honest improvements, not inflated claims.</p>
              <div>
                <Link
                  href="/sign-up"
                  className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-[var(--foreground)]"
                >
                  Create your workspace
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
