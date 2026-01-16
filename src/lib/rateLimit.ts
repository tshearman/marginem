const DEFAULT_WINDOW_MS = 60_000;
const DEFAULT_MAX_REQUESTS = 60;

const parsePositiveInt = (value: string | undefined, fallback: number) => {
	const parsed = Number.parseInt(value ?? "", 10);
	return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const WINDOW_MS = parsePositiveInt(
	process.env.RATE_LIMIT_WINDOW_MS,
	DEFAULT_WINDOW_MS,
);
const MAX_REQUESTS = parsePositiveInt(
	process.env.RATE_LIMIT_MAX_REQUESTS,
	DEFAULT_MAX_REQUESTS,
);

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
	allowed: boolean;
	remaining: number;
	retryAfterSeconds: number;
	resetAt: number;
}

export const checkRateLimit = (key: string): RateLimitResult => {
	const now = Date.now();
	const bucket = buckets.get(key);

	if (!bucket || bucket.resetAt <= now) {
		const resetAt = now + WINDOW_MS;
		buckets.set(key, { count: 1, resetAt });
		return {
			allowed: true,
			remaining: Math.max(0, MAX_REQUESTS - 1),
			retryAfterSeconds: Math.ceil(WINDOW_MS / 1000),
			resetAt,
		};
	}

	if (bucket.count >= MAX_REQUESTS) {
		return {
			allowed: false,
			remaining: 0,
			retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
			resetAt: bucket.resetAt,
		};
	}

	bucket.count += 1;
	return {
		allowed: true,
		remaining: Math.max(0, MAX_REQUESTS - bucket.count),
		retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
		resetAt: bucket.resetAt,
	};
};
