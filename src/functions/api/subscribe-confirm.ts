import { verifySubscribeToken } from "../../lib/subscribe-token";
import { getEnvValue, type Env } from "../env";

type FunctionContext = {
	request: Request;
	env: Env;
};

export const onRequestGet = async ({ request, env }: FunctionContext) => {
	const apiKey = getEnvValue(env, "RESEND_API_KEY");
	const audienceId = getEnvValue(env, "RESEND_AUDIENCE_ID");
	const hmacSecret = getEnvValue(env, "SUBSCRIBE_HMAC_SECRET");

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
