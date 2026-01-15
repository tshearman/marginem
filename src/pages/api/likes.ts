import type { APIContext, APIRoute } from "astro";
import { ensureVisitorId } from "../../lib/visitor";
import { likesBackend, type LikeTargetType } from "../../lib/likes/store";

export const prerender = false;

type LikeAction = "like" | "unlike" | "toggle";

const allowedTypes = new Set<LikeTargetType>(["post", "note"]);
const cacheControlHeader = { "cache-control": "no-store" };

const parseTargetType = (value: string | null): LikeTargetType | null =>
	allowedTypes.has(value as LikeTargetType) ? (value as LikeTargetType) : null;

const parseAction = (value: unknown, fallback: LikeAction): LikeAction => {
	if (value === "like" || value === "unlike" || value === "toggle") {
		return value;
	}
	return fallback;
};

const readSlug = (value: unknown) =>
	typeof value === "string" ? value.trim() : "";

const invalid = (message: string, status = 400) =>
	new Response(message, { status, headers: cacheControlHeader });

const runAction = (
	action: LikeAction,
	payload: { slug: string; targetType: LikeTargetType; visitorId: string },
) => {
	if (action === "unlike") return likesBackend.unlike(payload);
	if (action === "toggle") {
		const current = likesBackend.getStatus(payload);
		return current.liked
			? likesBackend.unlike(payload)
			: likesBackend.like(payload);
	}
	return likesBackend.like(payload);
};

export const GET: APIRoute = ({ url, cookies }) => {
	const slug = readSlug(url.searchParams.get("slug"));
	const targetType = parseTargetType(url.searchParams.get("type"));

	if (!slug || !targetType) {
		return invalid("Missing slug or type");
	}

	const visitorId = ensureVisitorId(cookies);
	try {
		const status = likesBackend.getStatus({ visitorId, targetType, slug });
		return Response.json(status, { headers: cacheControlHeader });
	} catch (error) {
		console.error("[likes] GET error", { error, slug, targetType });
		return invalid("Failed to read likes", 500);
	}
};

const handleWrite = async (
	context: APIContext,
	defaultAction: LikeAction,
) => {
	let body: unknown;
	try {
		body = await context.request.json();
	} catch {
		return invalid("Invalid JSON body");
	}

	const record = body as Record<string, unknown>;
	const slug = readSlug(record.slug);
	const targetType = parseTargetType(
		typeof record.type === "string" ? record.type : null,
	);
	const action = parseAction(record.action, defaultAction);

	if (!slug || !targetType) {
		return invalid("Missing slug or type");
	}

	try {
		const visitorId = ensureVisitorId(context.cookies);
		const status = runAction(action, { visitorId, targetType, slug });
		return Response.json(status, { headers: cacheControlHeader });
	} catch (error) {
		console.error("[likes] write error", { error, slug, targetType, action });
		return invalid("Failed to update likes", 500);
	}
};

export const POST: APIRoute = (context) => handleWrite(context, "like");
export const DELETE: APIRoute = (context) => handleWrite(context, "unlike");
