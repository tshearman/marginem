import type { APIContext, APIRoute } from "astro";
import { getAllowedSlugs } from "../../lib/likes/slugAllowlist";
import { likesBackend, type LikeTargetType } from "../../lib/likes/store";
import { checkRateLimit } from "../../lib/rateLimit";
import { ensureVisitorId } from "../../lib/visitor";

export const prerender = false;

type LikeAction = "like" | "unlike" | "toggle";

const allowedTypes = new Set<LikeTargetType>(["post", "note"]);
const MAX_SLUG_LENGTH = 120;
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

const invalid = (
	message: string,
	status = 400,
	extraHeaders: Record<string, string> = {},
) =>
	new Response(message, {
		status,
		headers: { ...cacheControlHeader, ...extraHeaders },
	});

const isSlugAllowed = async (slug: string) => {
	const allowlist = await getAllowedSlugs();
	return allowlist.has(slug);
};

const isValidSlug = (slug: string) =>
	Boolean(slug) && slug.length <= MAX_SLUG_LENGTH;

const getClientAddress = (context: APIContext) => {
	const header = context.request.headers.get("x-forwarded-for");
	if (header) return header.split(",")[0].trim();
	// Astro exposes clientAddress in some adapters; fall back to host if present.
	return (context as { clientAddress?: string }).clientAddress ?? "";
};

const enforceRateLimit = (context: APIContext, visitorId: string) => {
	const key = `${visitorId}:${getClientAddress(context) || "unknown"}`;
	const verdict = checkRateLimit(key);
	if (!verdict.allowed) {
		return invalid("Rate limit exceeded", 429, {
			"Retry-After": `${verdict.retryAfterSeconds}`,
		});
	}
	return null;
};

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

export const GET: APIRoute = async ({ url, cookies }) => {
	const slug = readSlug(url.searchParams.get("slug"));
	const targetType = parseTargetType(url.searchParams.get("type"));

	if (!isValidSlug(slug) || !targetType) {
		return invalid("Missing or invalid slug or type");
	}

	if (!(await isSlugAllowed(slug))) {
		return invalid("Unknown slug", 404);
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

const handleWrite = async (context: APIContext, defaultAction: LikeAction) => {
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

	if (!isValidSlug(slug) || !targetType) {
		return invalid("Missing or invalid slug or type");
	}

	if (!(await isSlugAllowed(slug))) {
		return invalid("Unknown slug", 404);
	}

	try {
		const visitorId = ensureVisitorId(context.cookies);
		const rateLimitResponse = enforceRateLimit(context, visitorId);
		if (rateLimitResponse) return rateLimitResponse;

		const status = runAction(action, { visitorId, targetType, slug });
		return Response.json(status, { headers: cacheControlHeader });
	} catch (error) {
		console.error("[likes] write error", { error, slug, targetType, action });
		return invalid("Failed to update likes", 500);
	}
};

export const POST: APIRoute = (context) => handleWrite(context, "like");
export const DELETE: APIRoute = (context) => handleWrite(context, "unlike");
