import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import type { LikeRequest, LikeStatus, LikesBackend } from "./types";

const dbPath =
	process.env.LIKES_DB_PATH ||
	join(process.cwd(), "data", import.meta.env.DEV ? "likes.dev.db" : "likes.db");
mkdirSync(dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.exec(`
	CREATE TABLE IF NOT EXISTS likes (
		visitor_id TEXT NOT NULL,
		target_type TEXT NOT NULL,
		slug TEXT NOT NULL,
		created_at INTEGER DEFAULT (strftime('%s','now')),
		PRIMARY KEY (visitor_id, target_type, slug)
	);
	CREATE INDEX IF NOT EXISTS idx_likes_target ON likes (target_type, slug);
`);

const likedStmt = db.prepare(
	"SELECT 1 FROM likes WHERE visitor_id = ? AND target_type = ? AND slug = ? LIMIT 1",
);
const countStmt = db.prepare(
	"SELECT COUNT(*) as count FROM likes WHERE target_type = ? AND slug = ?",
);
const insertStmt = db.prepare(
	"INSERT OR IGNORE INTO likes (visitor_id, target_type, slug) VALUES (?, ?, ?)",
);
const deleteStmt = db.prepare(
	"DELETE FROM likes WHERE visitor_id = ? AND target_type = ? AND slug = ?",
);

const getStatus = ({
	visitorId,
	targetType,
	slug,
}: LikeRequest): LikeStatus => {
	const liked = Boolean(likedStmt.get(visitorId, targetType, slug));
	const row = countStmt.get(targetType, slug) as { count?: number };
	return { liked, count: Number(row?.count ?? 0) };
};

const like = (request: LikeRequest): LikeStatus => {
	const runner = db.transaction((payload: LikeRequest) => {
		insertStmt.run(payload.visitorId, payload.targetType, payload.slug);
		return getStatus(payload);
	});
	return runner(request);
};

const unlike = (request: LikeRequest): LikeStatus => {
	const runner = db.transaction((payload: LikeRequest) => {
		deleteStmt.run(payload.visitorId, payload.targetType, payload.slug);
		return getStatus(payload);
	});
	return runner(request);
};

const sqliteBackend: LikesBackend = {
	getStatus,
	like,
	unlike,
};

export default sqliteBackend;
