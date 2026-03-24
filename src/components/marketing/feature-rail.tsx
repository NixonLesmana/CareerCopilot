const features = [
  {
    eyebrow: "Parse",
    title: "Normalize resumes and job posts into structured data.",
    body: "Upload a PDF or DOCX, paste a job description or import from a URL, and get clean sections that power every downstream workflow.",
  },
  {
    eyebrow: "Analyze",
    title: "Score fit with explainable strengths, gaps, and priorities.",
    body: "Blend keyword coverage with role-aware AI reasoning so the result feels more like guidance than a black-box number.",
  },
  {
    eyebrow: "Rewrite",
    title: "Tailor bullets, summaries, and cover letters without faking anything.",
    body: "Keep the original facts, upgrade the framing, and save polished versions for every application.",
  },
];

export function FeatureRail() {
  return (
    <section id="workflow" className="px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[1300px] gap-8 lg:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="border-t border-[var(--border)] pt-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">{feature.eyebrow}</p>
            <h2 className="section-title mt-4 text-3xl font-semibold leading-tight">{feature.title}</h2>
            <p className="mt-4 max-w-sm text-base leading-7 text-[var(--muted)]">{feature.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
