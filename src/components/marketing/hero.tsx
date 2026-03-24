"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function MarketingHero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-8 sm:px-6 lg:px-10">
      <div className="mx-auto grid min-h-[calc(100svh-120px)] w-full max-w-[1300px] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            <Sparkles className="h-3.5 w-3.5" />
            Built for internship season
          </div>
          <h1 className="section-title text-5xl font-semibold leading-[0.92] text-[var(--foreground)] sm:text-6xl lg:text-7xl">
            Turn one resume into a sharper application package for every role.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-[var(--muted)]">
            Career Copilot parses your resume, reads the job posting, explains your fit, and helps
            you rewrite bullets and cover letters without exaggerating what you have done.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-white"
            >
              Launch Your Copilot
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#workflow"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/65 px-5 py-3 text-sm font-medium"
            >
              See the workflow
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.12 }}
          className="glass relative rounded-[40px] p-5"
        >
          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[32px] bg-[linear-gradient(180deg,#13243d_0%,#0b1525_100%)] p-6 text-white">
              <p className="text-xs uppercase tracking-[0.22em] text-white/55">Match Analysis</p>
              <div className="mt-6 flex items-end gap-3">
                <p className="section-title text-7xl font-semibold leading-none">82</p>
                <p className="mb-2 text-sm text-white/70">Role fit score</p>
              </div>
              <div className="mt-8 space-y-3 text-sm text-white/75">
                <div className="rounded-2xl bg-white/10 p-4">
                  Strong overlap in React, TypeScript, APIs, and project ownership.
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  Biggest gap: your resume undersells metrics and backend depth.
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-[28px] bg-white p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Rewrite Studio</p>
                <p className="mt-4 text-sm font-medium text-[var(--foreground)]">Before</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  Worked on a full stack notes app using Next.js and state management.
                </p>
                <p className="mt-4 text-sm font-medium text-[var(--foreground)]">After</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">
                  Built a full-stack notes platform in Next.js with client-side state orchestration,
                  enabling faster note creation and cleaner workspace navigation.
                </p>
              </div>
              <div className="rounded-[28px] border border-[var(--border)] bg-[var(--accent-soft)] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Guidance</p>
                <ul className="mt-3 space-y-3 text-sm leading-6">
                  <li>Lead with your strongest project for internship roles.</li>
                  <li>Mirror role language when it is truthful and defensible.</li>
                  <li>Never claim tools or ownership you cannot discuss confidently.</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
