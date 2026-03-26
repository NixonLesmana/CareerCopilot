"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { isClerkClientConfigured } from "@/lib/env";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  const authEnabled = isClerkClientConfigured();

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "sticky top-0 z-50 mx-auto mt-6 flex w-[min(1300px,calc(100%-32px))] items-center justify-between gap-12 rounded-full border border-white/40 px-6 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-2xl transition-all duration-300",
        compact ? "bg-white/95" : "bg-white/70",
      )}
    >
      <Link href="/">
        <Logo />
      </Link>
      <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex">
        {NAV_LINKS.map((link) => {
          if (!authEnabled) {
            return (
              <Link key={link.href} href={link.href} className="rounded-full px-4 py-2 transition-all hover:bg-[var(--foreground)]/5 hover:text-[var(--foreground)] font-medium">
                {link.label}
              </Link>
            );
          }

          return (
            <div key={link.href}>
              <SignedIn>
                <Link href={link.href} className="rounded-full px-4 py-2 transition-all hover:bg-[var(--foreground)]/5 hover:text-[var(--foreground)] font-medium">
                  {link.label}
                </Link>
              </SignedIn>
              <SignedOut>
                <Link href="/sign-up" className="rounded-full px-4 py-2 transition-all hover:bg-[var(--foreground)]/5 hover:text-[var(--foreground)] font-medium">
                  {link.label}
                </Link>
              </SignedOut>
            </div>
          );
        })}
      </nav>
      <div className="flex items-center gap-3">
        {!authEnabled ? (
          <>
            <Link href="/sign-in" className="hidden text-sm text-[var(--muted)] sm:inline-flex">
              Demo auth setup
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-4 py-2 text-sm"
              style={{ color: "#ffffff" }}
            >
              Explore App
              <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        ) : null}
        {authEnabled ? (
          <SignedOut>
            <Link href="/sign-in" className="hidden text-sm font-medium text-[var(--foreground)] hover:text-[var(--foreground)]/70 sm:inline-flex">
              Log in
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-semibold transition hover:bg-[var(--foreground)]/90 shadow-sm"
              style={{ color: "#ffffff" }}
            >
              Get Started
            </Link>
          </SignedOut>
        ) : null}
        {authEnabled ? (
          <SignedIn>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-4 py-2 text-sm"
              style={{ color: "#ffffff" }}
            >
              Launch Copilot
              <ArrowRight className="h-4 w-4" />
            </Link>
            <UserButton />
          </SignedIn>
        ) : null}
      </div>
    </motion.header>
  );
}
