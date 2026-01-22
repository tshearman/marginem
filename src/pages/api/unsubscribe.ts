import type { APIRoute } from "astro";
import { verifySubscribeToken } from "../../lib/subscribe-token";

const getContactId = async (
	email: string,
	audienceId: string,
	apiKey: string,
) => {
	const searchUrl = new URL(
		`https://api.resend.com/audiences/${audienceId}/contacts`,
	);
	searchUrl.searchParams.set("email", email);
	const response = await fetch(searchUrl.toString(), {
		headers: {
			Authorization: `Bearer ${apiKey}`,
		},
	});
	if (!response.ok) {
		return null;
	}
	const data = (await response.json()) as {
		data?: Array<{ id: string; email: string }>;
	};
	const contact = data?.data?.find((item) => item.email === email);
	return contact?.id ?? null;
};

export const POST: APIRoute = async ({ request, locals }) => {
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

	const body = (await request.json()) as { token?: string };
	const token = String(body.token ?? "");
	const payload = await verifySubscribeToken(token, hmacSecret, "unsubscribe");
	if (!payload) {
		return new Response("Invalid or expired token.", { status: 400 });
	}

	const contactId = await getContactId(payload.email, audienceId, apiKey);
	if (contactId) {
		const response = await fetch(
			`https://api.resend.com/audiences/${audienceId}/contacts/${contactId}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${apiKey}`,
				},
			},
		);
		if (!response.ok && response.status !== 404) {
			const message = await response.text();
			return new Response(
				message || "Resend request failed. Please try again later.",
				{ status: 502 },
			);
		}
	}

	return new Response("Unsubscribed.", { status: 200 });
};
