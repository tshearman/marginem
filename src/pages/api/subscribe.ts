import type { APIContext, APIRoute } from "astro";
import { checkSharedRateLimit } from "../../lib/rateLimitShared";
import {
	createPendingSubscription,
	getSubscriptionByEmail,
} from "../../lib/subscriptions/store";
import { sendConfirmationEmail } from "../../lib/subscriptions/mailer";

export const prerender = false;

const cacheControlHeader = { "cache-control": "no-store" };
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const invalid = (
	message: string,
	status = 400,
	extraHeaders: Record<string, string> = {},
) =>
	new Response(message, {
		status,
		headers: { ...cacheControlHeader, ...extraHeaders },
	});

const getClientAddress = (context: APIContext) => {
	const header = context.request.headers.get("x-forwarded-for");
	if (header) return header.split(",")[0].trim();
	return (context as { clientAddress?: string }).clientAddress ?? "";
};

const parsePositiveInt = (value: string | undefined, fallback: number) => {
	const parsed = Number.parseInt(value ?? "", 10);
	return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const RL_WINDOW_MS = parsePositiveInt(
	process.env.SUBSCRIPTIONS_RATE_LIMIT_WINDOW_MS,
	60_000,
);
const RL_MAX_REQUESTS = parsePositiveInt(
	process.env.SUBSCRIPTIONS_RATE_LIMIT_MAX_REQUESTS,
	12,
);

const enforceRateLimit = (context: APIContext, email: string) => {
	const key = `subscribe:${email}:${getClientAddress(context) || "unknown"}`;
	const verdict = checkSharedRateLimit(key, {
		windowMs: RL_WINDOW_MS,
		maxRequests: RL_MAX_REQUESTS,
	});
	if (!verdict.allowed) {
		return invalid("Rate limit exceeded", 429, {
			"Retry-After": `${verdict.retryAfterSeconds}`,
		});
	}
	return null;
};

const buildConfirmationUrl = (context: APIContext, token: string) => {
	const siteOrigin =
		process.env.SUBSCRIPTIONS_SITE_ORIGIN ||
		context.url.origin ||
		"https://example.com";
	const url = new URL("/api/subscribe/confirm", siteOrigin);
	url.searchParams.set("token", token);
	return url.toString();
};

export const POST: APIRoute = async (context) => {
	let body: unknown;
	try {
		body = await context.request.json();
	} catch {
		return invalid("Invalid JSON body");
	}

	const payload = body as Record<string, unknown>;
	const email =
		typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
	const honeypot =
		typeof payload.nickname === "string" ? payload.nickname.trim() : "";

	if (honeypot) {
		// Silently accept bots that fill the honeypot.
		return new Response(null, { status: 204, headers: cacheControlHeader });
	}

	if (!email || email.length > 320 || !emailRegex.test(email)) {
		return invalid("Please provide a valid email address");
	}

	const rateLimitResponse = enforceRateLimit(context, email);
	if (rateLimitResponse) return rateLimitResponse;

	try {
		const existing = getSubscriptionByEmail(email);
		if (existing?.status === "confirmed") {
			return Response.json(
				{ status: "already_confirmed" },
				{ headers: cacheControlHeader },
			);
		}

		const result = createPendingSubscription(email);
		if (!result.token) {
			return Response.json(
				{ status: "already_confirmed" },
				{ headers: cacheControlHeader },
			);
		}

		const confirmationUrl = buildConfirmationUrl(context, result.token);
		await sendConfirmationEmail(email, confirmationUrl);

		return Response.json(
			{ status: "pending", confirmationSent: true },
			{ headers: cacheControlHeader },
		);
	} catch (error) {
		console.error("[subscribe] error", { error });
		return invalid("Failed to process subscription", 500);
	}
};
