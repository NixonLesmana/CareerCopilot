import { FeatureRail } from "@/components/marketing/feature-rail";
import { MarketingHero } from "@/components/marketing/hero";
import { SiteHeader } from "@/components/shared/site-header";
import { CtaSection } from "@/components/marketing/cta-section";

export default function MarketingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <MarketingHero />
        <FeatureRail />
        <CtaSection />
      </main>
    </>
  );
}
