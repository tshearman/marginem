import Database from "better-sqlite3";
import { createHash, randomBytes } from "node:crypto";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

export type SubscriptionStatus = "pending" | "confirmed";

export interface SubscriptionRecord {
	id: number;
	email: string;
	status: SubscriptionStatus;
	token_hash: string | null;
	created_at: number;
	updated_at: number;
	confirmed_at: number | null;
	last_sent_at: number | null;
	unsubscribe_token_hash?: string | null;
	token_expires_at?: number | null;
	unsubscribe_token_expires_at?: number | null;
}

const dbPath =
	process.env.SUBSCRIPTIONS_DB_PATH ||
	join(
		process.cwd(),
		"data",
		import.meta.env.DEV ? "subscriptions.dev.db" : "subscriptions.db",
	);

mkdirSync(dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.exec(`
	CREATE TABLE IF NOT EXISTS subscriptions (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		email TEXT NOT NULL UNIQUE,
		status TEXT NOT NULL CHECK(status IN ('pending','confirmed')),
		token_hash TEXT,
		created_at INTEGER DEFAULT (strftime('%s','now')),
		updated_at INTEGER DEFAULT (strftime('%s','now')),
		confirmed_at INTEGER,
		last_sent_at INTEGER
	);
	CREATE INDEX IF NOT EXISTS idx_subscriptions_token_hash ON subscriptions (token_hash);
`);

// Add columns if missing for backwards compatibility.
const ensureColumn = (name: string, definition: string) => {
	const columns = db
		.prepare("PRAGMA table_info(subscriptions)")
		.all() as Array<{
		name: string;
	}>;
	if (!columns.some((col) => col.name === name)) {
		db.exec(`ALTER TABLE subscriptions ADD COLUMN ${definition};`);
	}
};

ensureColumn("unsubscribe_token_hash", "unsubscribe_token_hash TEXT");
ensureColumn("token_expires_at", "token_expires_at INTEGER");
ensureColumn(
	"unsubscribe_token_expires_at",
	"unsubscribe_token_expires_at INTEGER",
);
db.exec(
	"CREATE INDEX IF NOT EXISTS idx_subscriptions_unsub_hash ON subscriptions (unsubscribe_token_hash)",
);

const normalizeEmail = (email: string) => email.trim().toLowerCase();
const nowSeconds = () => Math.floor(Date.now() / 1000);
const hashToken = (token: string) =>
	createHash("sha256").update(token).digest("hex");
const createToken = () => randomBytes(32).toString("base64url");
const parsePositiveInt = (value: string | undefined, fallback: number) => {
	const parsed = Number.parseInt(value ?? "", 10);
	return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const TOKEN_TTL_SECONDS = parsePositiveInt(
	process.env.SUBSCRIPTIONS_TOKEN_TTL_SECONDS,
	2 * 24 * 60 * 60,
);
const UNSUB_TOKEN_TTL_SECONDS = parsePositiveInt(
	process.env.SUBSCRIPTIONS_UNSUB_TOKEN_TTL_SECONDS,
	2 * 24 * 60 * 60,
);

const findByEmailStmt = db.prepare(
	"SELECT * FROM subscriptions WHERE email = ? LIMIT 1",
);
const upsertPendingStmt = db.prepare(`
	INSERT INTO subscriptions (email, status, token_hash, created_at, updated_at, last_sent_at, token_expires_at)
	VALUES (?, 'pending', ?, ?, ?, ?, ?)
	ON CONFLICT(email) DO UPDATE SET
		status='pending',
		token_hash=excluded.token_hash,
		updated_at=excluded.updated_at,
		last_sent_at=excluded.last_sent_at,
		token_expires_at=excluded.token_expires_at
`);
const findByTokenHashStmt = db.prepare(
	"SELECT * FROM subscriptions WHERE token_hash = ? LIMIT 1",
);
const confirmStmt = db.prepare(`
	UPDATE subscriptions
	SET status='confirmed',
		token_hash=NULL,
		updated_at=?,
		confirmed_at=COALESCE(confirmed_at, ?)
	WHERE token_hash = ?
`);
const setUnsubscribeTokenStmt = db.prepare(`
	UPDATE subscriptions
	SET unsubscribe_token_hash = ?, updated_at = ?, unsubscribe_token_expires_at = ?
	WHERE email = ? AND status IN ('pending','confirmed')
`);
const findByUnsubscribeTokenStmt = db.prepare(
	"SELECT * FROM subscriptions WHERE unsubscribe_token_hash = ? LIMIT 1",
);
const deleteByEmailStmt = db.prepare(
	"DELETE FROM subscriptions WHERE email = ?",
);

export const createPendingSubscription = (rawEmail: string) => {
	const email = normalizeEmail(rawEmail);
	const existing = findByEmailStmt.get(email) as SubscriptionRecord | undefined;
	if (existing?.status === "confirmed") {
		return { status: "confirmed" as SubscriptionStatus, email, token: null };
	}

	const token = createToken();
	const tokenHash = hashToken(token);
	const timestamp = nowSeconds();
	upsertPendingStmt.run(
		email,
		tokenHash,
		timestamp,
		timestamp,
		timestamp,
		timestamp + TOKEN_TTL_SECONDS,
	);
	return { status: "pending" as SubscriptionStatus, email, token };
};

export const confirmSubscription = (token: string) => {
	const tokenHash = hashToken(token);
	const record = findByTokenHashStmt.get(tokenHash) as
		| SubscriptionRecord
		| undefined;
	const now = nowSeconds();
	if (!record || (record.token_expires_at && record.token_expires_at < now)) {
		return { ok: false as const, email: null };
	}

	const timestamp = nowSeconds();
	confirmStmt.run(timestamp, timestamp, tokenHash);
	return { ok: true as const, email: record.email };
};

export const getSubscriptionByEmail = (rawEmail: string) => {
	const email = normalizeEmail(rawEmail);
	return findByEmailStmt.get(email) as SubscriptionRecord | undefined;
};

export const createUnsubscribeToken = (rawEmail: string) => {
	const email = normalizeEmail(rawEmail);
	const existing = findByEmailStmt.get(email) as SubscriptionRecord | undefined;
	if (!existing) return { found: false as const, email };

	const token = createToken();
	const tokenHash = hashToken(token);
	const timestamp = nowSeconds();
	setUnsubscribeTokenStmt.run(
		tokenHash,
		timestamp,
		timestamp + UNSUB_TOKEN_TTL_SECONDS,
		email,
	);
	return { found: true as const, email, token };
};

export const unsubscribeWithToken = (token: string) => {
	const tokenHash = hashToken(token);
	const record = findByUnsubscribeTokenStmt.get(tokenHash) as
		| SubscriptionRecord
		| undefined;
	const now = nowSeconds();
	if (
		!record ||
		(record.unsubscribe_token_expires_at &&
			record.unsubscribe_token_expires_at < now)
	) {
		return { ok: false as const, email: null };
	}

	deleteByEmailStmt.run(record.email);
	return { ok: true as const, email: record.email };
};

export const getDbPath = () => dbPath;
