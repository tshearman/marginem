import sqliteBackend from "./sqliteStore";

export { type LikeRequest, type LikeStatus, type LikeTargetType } from "./types";

export const likesBackend = sqliteBackend;
