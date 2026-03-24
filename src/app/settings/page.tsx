import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { SiteHeader } from "@/components/shared/site-header";

export default async function SettingsPage() {
  const user = await requireUser();
  const clerkUser = await currentUser();
  const usage = await db.usageEvent.groupBy({
    by: ["eventType"],
    _count: { eventType: true },
    where: { userId: user.id },
  });

  return (
    <>
      <SiteHeader compact />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="glass rounded-[32px] p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Account</p>
            <h1 className="section-title mt-4 text-4xl font-semibold">Privacy and profile</h1>
            <div className="mt-6 space-y-3 text-sm text-[var(--muted)]">
              <p>Email: {clerkUser?.primaryEmailAddress?.emailAddress ?? user.email}</p>
              <p>Target role: {user.targetRole ?? "Not set yet"}</p>
              <p>Graduation year: {user.graduationYear ?? "Not set yet"}</p>
            </div>
          </section>
          <section className="rounded-[32px] border border-[var(--border)] bg-white/75 p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Usage</p>
            <div className="mt-6 space-y-4">
              {usage.map((event) => (
                <article key={event.eventType} className="rounded-[24px] border border-[var(--border)] p-5">
                  <h2 className="text-lg font-semibold capitalize">{event.eventType.replaceAll("_", " ")}</h2>
                  <p className="mt-2 text-sm text-[var(--muted)]">{event._count.eventType} events recorded</p>
                </article>
              ))}
              <form action="/api/account" method="post">
                <input type="hidden" name="_method" value="DELETE" />
                <button className="rounded-full border border-red-300 px-5 py-3 text-sm text-red-700">
                  Delete account data
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
