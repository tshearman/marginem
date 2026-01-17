import { describe, expect, it, vi } from "vitest";

const withRateLimitModule = async (
	env: Record<string, string>,
	run: (mod: typeof import("../src/lib/rateLimit")) => Promise<void> | void,
) => {
	const previous: Record<string, string | undefined> = {};
	for (const [key, value] of Object.entries(env)) {
		previous[key] = process.env[key];
		process.env[key] = value;
	}
	vi.resetModules();
	try {
		const mod = await import("../src/lib/rateLimit");
		await run(mod);
	} finally {
		for (const [key, value] of Object.entries(previous)) {
			if (value === undefined) {
				delete process.env[key];
			} else {
				process.env[key] = value;
			}
		}
		vi.useRealTimers();
	}
};

describe("checkRateLimit", () => {
	it("enforces max requests per window and resets after the window expires", async () => {
		await withRateLimitModule(
			{ RATE_LIMIT_MAX_REQUESTS: "2", RATE_LIMIT_WINDOW_MS: "1000" },
			({ checkRateLimit }) => {
				vi.useFakeTimers();
				vi.setSystemTime(new Date("2024-01-01T00:00:00Z"));

				const first = checkRateLimit("client-a");
				expect(first.allowed).toBe(true);
				expect(first.remaining).toBe(1);

				const second = checkRateLimit("client-a");
				expect(second.allowed).toBe(true);
				expect(second.remaining).toBe(0);

				const blocked = checkRateLimit("client-a");
				expect(blocked.allowed).toBe(false);
				expect(blocked.retryAfterSeconds).toBeGreaterThan(0);

				vi.advanceTimersByTime(1000);
				const reset = checkRateLimit("client-a");
				expect(reset.allowed).toBe(true);
				expect(reset.remaining).toBe(1);
			},
		);
	});

	it("tracks separate buckets per key", async () => {
		await withRateLimitModule(
			{ RATE_LIMIT_MAX_REQUESTS: "1", RATE_LIMIT_WINDOW_MS: "5000" },
			({ checkRateLimit }) => {
				vi.useFakeTimers();
				vi.setSystemTime(new Date("2024-01-01T00:00:00Z"));

				const a1 = checkRateLimit("alpha");
				expect(a1.allowed).toBe(true);

				const b1 = checkRateLimit("beta");
				expect(b1.allowed).toBe(true);

				const aBlocked = checkRateLimit("alpha");
				expect(aBlocked.allowed).toBe(false);
				expect(aBlocked.retryAfterSeconds).toBeGreaterThanOrEqual(4);

				const bBlocked = checkRateLimit("beta");
				expect(bBlocked.allowed).toBe(false);
				expect(bBlocked.retryAfterSeconds).toBeGreaterThanOrEqual(4);
			},
		);
	});
});
