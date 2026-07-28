// Simple in-memory fixed-window rate limiter, keyed by IP.
//
// NOTE: this resets whenever the serverless function cold-starts and is
// per-instance, not global — fine for a single-region deploy or small
// traffic, but for real production scale swap this for a durable store
// (e.g. Upstash Redis + @upstash/ratelimit) so limits hold across
// instances and restarts.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 5; // 5 submissions per IP per minute

export function rateLimit(key: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSec: 0 };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}

// Periodically clear stale buckets so the map doesn't grow forever.
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (now > bucket.resetAt) buckets.delete(key);
  }
}, WINDOW_MS).unref?.();
