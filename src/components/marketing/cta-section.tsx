"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@clerk/nextjs";

export function CtaSection() {
  const { userId } = useAuth();

  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto grid max-w-[1300px] gap-8 rounded-[40px] bg-[var(--foreground)] p-12 text-white lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/55">The Copilot Advantage</p>
          <h2 className="section-title mt-4 text-4xl font-semibold leading-tight">
            Tailored for the role. <br />True to your story.
          </h2>
        </div>
        <div className="space-y-6 text-sm leading-7 text-white/75">
          <p>Forget generic AI prompts that hallucinate your experience. Career Copilot strictly uses your uploaded base resume to suggest truthful, highly targeted bullet rewrites.</p>
          <p>Everything is saved in your secure workspace. Keep track of multiple roles, export your tailored resumes to PDF or DOCX, and generate cover letters that actually sound like you, not a robot.</p>
          <div className="pt-4">
            <Link
              href={userId ? "/dashboard" : "/sign-up"}
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold transition hover:bg-white/90 shadow-xl"
              style={{ color: "var(--foreground)" }}
            >
              {userId ? "Go to Dashboard" : "Create your free workspace"}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
