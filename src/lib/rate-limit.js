const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 6;

const store = new Map();

export function rateLimit(key) {
  const now = Date.now();
  const entry = store.get(key) || { count: 0, start: now };

  if (now - entry.start > RATE_LIMIT_WINDOW_MS) {
    entry.count = 0;
    entry.start = now;
  }

  entry.count += 1;
  store.set(key, entry);

  return {
    allowed: entry.count <= RATE_LIMIT_MAX,
    remaining: Math.max(RATE_LIMIT_MAX - entry.count, 0)
  };
}
