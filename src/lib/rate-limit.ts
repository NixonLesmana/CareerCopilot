const memory = new Map<string, { count: number; resetAt: number }>();

export function assertRateLimit(key: string, limit = 12, windowMs = 60_000) {
  const now = Date.now();
  const entry = memory.get(key);

  if (!entry || entry.resetAt < now) {
    memory.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  if (entry.count >= limit) {
    throw new Error("Rate limit exceeded. Please wait a minute and try again.");
  }

  entry.count += 1;
  memory.set(key, entry);
}
