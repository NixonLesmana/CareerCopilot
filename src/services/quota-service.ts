import { db } from "@/lib/db";
import { FREE_TIER_LIMITS } from "@/lib/constants";

function monthStart() {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export async function assertUsageAvailable(userId: string, type: "analysis" | "generation") {
  const events = await db.usageEvent.aggregate({
    _sum: { amount: true },
    where: {
      userId,
      eventType: type,
      createdAt: { gte: monthStart() },
    },
  });

  const used = events._sum.amount ?? 0;
  const limit =
    type === "analysis" ? FREE_TIER_LIMITS.analysesPerMonth : FREE_TIER_LIMITS.generationsPerMonth;

  if (used >= limit) {
    throw new Error(`Free tier limit reached for ${type}.`);
  }
}

export async function trackUsage(userId: string, eventType: string, metadata?: Record<string, unknown>) {
  await db.usageEvent.create({
    data: {
      userId,
      eventType,
      metadata: metadata as never,
    },
  });
}
