import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const dbPath =
	process.env.SHARED_RATE_LIMIT_DB_PATH ||
	join(
		process.cwd(),
		"data",
		import.meta.env.DEV ? "rate-limit.dev.db" : "rate-limit.db",
	);

mkdirSync(dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.exec(`
	CREATE TABLE IF NOT EXISTS rate_limits (
		key TEXT PRIMARY KEY,
		count INTEGER NOT NULL DEFAULT 0,
		reset_at INTEGER NOT NULL
	);
`);

const selectStmt = db.prepare(
	"SELECT key, count, reset_at FROM rate_limits WHERE key = ? LIMIT 1",
);
const upsertStmt = db.prepare(`
	INSERT INTO rate_limits (key, count, reset_at)
	VALUES (?, ?, ?)
	ON CONFLICT(key) DO UPDATE SET
		count=excluded.count,
		reset_at=excluded.reset_at
`);
const updateCountStmt = db.prepare(
	"UPDATE rate_limits SET count = ?, reset_at = ? WHERE key = ?",
);

export interface SharedRateLimitResult {
	allowed: boolean;
	remaining: number;
	retryAfterSeconds: number;
	resetAt: number;
}

const nowSeconds = () => Math.floor(Date.now() / 1000);

export const checkSharedRateLimit = (
	key: string,
	options?: { windowMs?: number; maxRequests?: number },
): SharedRateLimitResult => {
	const windowMs = options?.windowMs ?? 60_000;
	const maxRequests = options?.maxRequests ?? 60;
	const windowSeconds = Math.max(1, Math.floor(windowMs / 1000));

	const now = nowSeconds();
	const row = selectStmt.get(key) as
		| { count?: number; reset_at?: number }
		| undefined;

	if (!row || (row.reset_at ?? 0) <= now) {
		const resetAt = now + windowSeconds;
		upsertStmt.run(key, 1, resetAt);
		return {
			allowed: true,
			remaining: Math.max(0, maxRequests - 1),
			retryAfterSeconds: windowSeconds,
			resetAt,
		};
	}

	const count = Number(row.count ?? 0);
	const resetAt = row.reset_at ?? now + windowSeconds;
	if (count >= maxRequests) {
		return {
			allowed: false,
			remaining: 0,
			retryAfterSeconds: Math.max(1, resetAt - now),
			resetAt,
		};
	}

	const nextCount = count + 1;
	updateCountStmt.run(nextCount, resetAt, key);
	return {
		allowed: true,
		remaining: Math.max(0, maxRequests - nextCount),
		retryAfterSeconds: Math.max(1, resetAt - now),
		resetAt,
	};
};
