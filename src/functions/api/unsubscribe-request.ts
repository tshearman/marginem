import { createSubscribeToken } from "../../lib/subscribe-token";
import { getEnvValue, type Env } from "../env";

type UnsubscribePayload = {
	email: string;
};

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
		return {
			contactId: null,
			error: `Resend lookup failed (${response.status}).`,
		};
	}
	const data = (await response.json()) as {
		data?: Array<{ id: string; email?: string }>;
	} | {
		data?: { data?: Array<{ id: string; email?: string }> };
	};
	const candidates = Array.isArray(data?.data)
		? data.data
		: Array.isArray(data?.data?.data)
			? data.data.data
			: [];
	const normalized = email.toLowerCase();
	const contact = candidates.find(
		(item) => item.email?.toLowerCase() === normalized,
	);
	return { contactId: contact?.id ?? null };
};

const getPayload = async (request: Request): Promise<UnsubscribePayload> => {
	const contentType = request.headers.get("content-type") ?? "";
	if (contentType.includes("application/json")) {
		const body = (await request.json()) as Partial<UnsubscribePayload>;
		return {
			email: String(body.email ?? "").trim(),
		};
	}

	const form = await request.formData();
	return {
		email: String(form.get("email") ?? "").trim(),
	};
};

type FunctionContext = {
	request: Request;
	env: Env;
};

export const onRequestPost = async ({ request, env }: FunctionContext) => {
	const apiKey = getEnvValue(env, "RESEND_API_KEY");
	const audienceId = getEnvValue(env, "RESEND_AUDIENCE_ID");
	const fromEmail = getEnvValue(env, "RESEND_FROM_EMAIL");
	const fromName = getEnvValue(env, "RESEND_FROM_NAME");
	const siteUrl = getEnvValue(env, "NEWSLETTER_SITE_URL");
	const hmacSecret = getEnvValue(env, "SUBSCRIBE_HMAC_SECRET");

	if (!apiKey || !audienceId || !fromEmail || !siteUrl || !hmacSecret) {
		return new Response("Missing Resend configuration.", { status: 500 });
	}

	const { email } = await getPayload(request);
	if (!email) {
		return new Response("Email is required.", { status: 400 });
	}

	const lookup = await getContactId(email, audienceId, apiKey);
	if (lookup.error) {
		return new Response(JSON.stringify({ error: lookup.error }), {
			status: 502,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
	if (!lookup.contactId) {
		return new Response(JSON.stringify({ error: "Contact lookup failed." }), {
			status: 404,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	const token = await createSubscribeToken(
		{ email, purpose: "unsubscribe" },
		hmacSecret,
		1000 * 60 * 60 * 24 * 7,
	);
	const confirmUrl = new URL("/api/unsubscribe-confirm", siteUrl);
	confirmUrl.searchParams.set("token", token);
	const fromLabel = fromName ? `${fromName} <${fromEmail}>` : fromEmail;

	const response = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			from: fromLabel,
			to: [email],
			subject: "Confirm your unsubscribe request",
			html: `
				<p>Confirm your unsubscribe request by clicking the link below:</p>
				<p><a href="${confirmUrl.toString()}">Confirm unsubscribe</a></p>
				<p>If you did not request this, you can ignore this email.</p>
			`,
			text: `Confirm your unsubscribe request: ${confirmUrl.toString()}`,
		}),
	});

	if (!response.ok) {
		const message = await response.text();
		return new Response(
			message || "Resend request failed. Please try again later.",
			{ status: 502 },
		);
	}

	return new Response(
		JSON.stringify({ message: "Check your inbox to confirm." }),
		{
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		},
	);
};
