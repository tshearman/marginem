import type { APIRoute } from "astro";
import { createSubscribeToken } from "../../lib/subscribe-token";

type SubscribePayload = {
	email: string;
	name?: string;
};

const getPayload = async (request: Request): Promise<SubscribePayload> => {
	const contentType = request.headers.get("content-type") ?? "";
	if (contentType.includes("application/json")) {
		const body = (await request.json()) as Partial<SubscribePayload>;
		return {
			email: String(body.email ?? "").trim(),
			name: body.name ? String(body.name).trim() : undefined,
		};
	}

	const form = await request.formData();
	return {
		email: String(form.get("email") ?? "").trim(),
		name: form.get("name") ? String(form.get("name")).trim() : undefined,
	};
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
	const fromEmail =
		runtimeEnv?.RESEND_FROM_EMAIL ||
		import.meta.env.RESEND_FROM_EMAIL ||
		process.env.RESEND_FROM_EMAIL ||
		"";
	const fromName =
		runtimeEnv?.RESEND_FROM_NAME ||
		import.meta.env.RESEND_FROM_NAME ||
		process.env.RESEND_FROM_NAME ||
		"";
	const siteUrl =
		runtimeEnv?.NEWSLETTER_SITE_URL ||
		import.meta.env.NEWSLETTER_SITE_URL ||
		process.env.NEWSLETTER_SITE_URL ||
		"";
	const hmacSecret =
		runtimeEnv?.SUBSCRIBE_HMAC_SECRET ||
		import.meta.env.SUBSCRIBE_HMAC_SECRET ||
		process.env.SUBSCRIBE_HMAC_SECRET ||
		"";

	if (!apiKey || !audienceId || !fromEmail || !siteUrl || !hmacSecret) {
		return new Response("Missing Resend configuration.", { status: 500 });
	}

	const { email, name } = await getPayload(request);
	if (!email) {
		return new Response("Email is required.", { status: 400 });
	}

	const token = await createSubscribeToken(
		{ email, name: name || undefined, purpose: "subscribe" },
		hmacSecret,
		1000 * 60 * 60 * 24 * 7,
	);
	const confirmUrl = new URL("/api/subscribe-confirm", siteUrl);
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
			subject: "Confirm your subscription",
			html: `
				<p>Confirm your subscription by clicking the link below:</p>
				<p><a href="${confirmUrl.toString()}">Confirm subscription</a></p>
				<p>If you did not request this, you can ignore this email.</p>
			`,
			text: `Confirm your subscription: ${confirmUrl.toString()}`,
		}),
	});

	if (!response.ok) {
		const message = await response.text();
		return new Response(
			message || "Resend request failed. Please try again later.",
			{ status: 502 },
		);
	}

	return new Response(null, {
		status: 303,
		headers: {
			Location: "/subscribe/pending",
		},
	});
};

export type { SubscribePayload };
