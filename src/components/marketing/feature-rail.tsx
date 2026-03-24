"use client";

import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function FeatureRail() {
  return (
    <section id="workflow" className="px-4 py-20 sm:px-6 lg:px-10">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mx-auto grid max-w-[1300px] gap-8 lg:grid-cols-3"
      >
        {features.map((feature) => (
          <motion.article 
            key={feature.title} 
            variants={itemVariants}
            className="border-t border-[var(--border)] pt-6"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">{feature.eyebrow}</p>
            <h2 className="section-title mt-4 text-3xl font-semibold leading-tight">{feature.title}</h2>
            <p className="mt-4 max-w-sm text-base leading-7 text-[var(--muted)]">{feature.body}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
