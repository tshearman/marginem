import type { APIRoute } from "astro";
import { verifySubscribeToken } from "../../lib/subscribe-token";

export const GET: APIRoute = async ({ request, locals }) => {
	const runtimeEnv = (locals as { runtime?: { env?: Record<string, string> } }).runtime
		?.env;
	const apiKey =
		runtimeEnv?.RESEND_API_KEY ||
		import.meta.env.RESEND_API_KEY ||
		process.env.RESEND_API_KEY ||
		"";
	const audienceId =
		runtimeEnv?.RESEND_AUDIENCE_ID ||
		import.meta.env.RESEND_AUDIENCE_ID ||
		process.env.RESEND_AUDIENCE_ID ||
		"";
	const hmacSecret =
		runtimeEnv?.SUBSCRIBE_HMAC_SECRET ||
		import.meta.env.SUBSCRIBE_HMAC_SECRET ||
		process.env.SUBSCRIBE_HMAC_SECRET ||
		"";

	if (!apiKey || !audienceId || !hmacSecret) {
		return new Response("Missing Resend configuration.", { status: 500 });
	}

	const url = new URL(request.url);
	const token = url.searchParams.get("token") ?? "";
	const payload = await verifySubscribeToken(token, hmacSecret, "subscribe");
	if (!payload) {
		return new Response("Invalid or expired token.", { status: 400 });
	}

	const response = await fetch(
		`https://api.resend.com/audiences/${audienceId}/contacts`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: payload.email,
				first_name: payload.name || undefined,
			}),
		},
	);

	if (!response.ok && response.status !== 409) {
		const message = await response.text();
		return new Response(
			message || "Resend request failed. Please try again later.",
			{ status: 502 },
		);
	}

	return new Response(null, {
		status: 303,
		headers: {
			Location: "/subscribe/confirmed",
		},
	});
};
