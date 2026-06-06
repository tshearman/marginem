import { createSubscribeToken } from "../../lib/subscribe-token";
import { getEnvValue, type Env } from "../env";

type SubscribePayload = {
	email: string;
	name?: string;
	company?: string;
	turnstileToken?: string;
};

const getPayload = async (request: Request): Promise<SubscribePayload> => {
	const contentType = request.headers.get("content-type") ?? "";
	if (contentType.includes("application/json")) {
		const body = (await request.json()) as Partial<SubscribePayload> & {
			"cf-turnstile-response"?: string;
		};
		return {
			email: String(body.email ?? "").trim(),
			name: body.name ? String(body.name).trim() : undefined,
			company: body.company ? String(body.company).trim() : undefined,
			turnstileToken: String(
				body["cf-turnstile-response"] ?? body.turnstileToken ?? "",
			),
		};
	}

	const form = await request.formData();
	return {
		email: String(form.get("email") ?? "").trim(),
		name: form.get("name") ? String(form.get("name")).trim() : undefined,
		company: form.get("company")
			? String(form.get("company")).trim()
			: undefined,
		turnstileToken: String(form.get("cf-turnstile-response") ?? ""),
	};
};

type FunctionContext = {
	request: Request;
	env: Env;
};

const verifyTurnstile = async (
	token: string,
	secret: string,
	clientIp: string | null,
): Promise<boolean> => {
	if (!token) return false;
	const body = new URLSearchParams();
	body.set("secret", secret);
	body.set("response", token);
	if (clientIp) body.set("remoteip", clientIp);
	try {
		const response = await fetch(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
			{
				method: "POST",
				body,
			},
		);
		if (!response.ok) return false;
		const data = (await response.json()) as { success?: boolean };
		return data.success === true;
	} catch {
		return false;
	}
};

// Same response a real success would give, so abusers can't distinguish a
// rejected request from an accepted one.
const fakeSuccess = () =>
	new Response(null, {
		status: 303,
		headers: { Location: "/subscribe/pending" },
	});

export const onRequestPost = async ({ request, env }: FunctionContext) => {
	const apiKey = getEnvValue(env, "RESEND_API_KEY");
	const audienceId = getEnvValue(env, "RESEND_AUDIENCE_ID");
	const fromEmail = getEnvValue(env, "RESEND_FROM_EMAIL");
	const fromName = getEnvValue(env, "RESEND_FROM_NAME");
	const siteUrl = getEnvValue(env, "NEWSLETTER_SITE_URL");
	const hmacSecret = getEnvValue(env, "SUBSCRIBE_HMAC_SECRET");
	const turnstileSecret = getEnvValue(env, "TURNSTILE_SECRET_KEY");

	if (
		!apiKey ||
		!audienceId ||
		!fromEmail ||
		!siteUrl ||
		!hmacSecret ||
		!turnstileSecret
	) {
		const configStatus = {
			RESEND_API_KEY: apiKey ? "set" : "missing (secret)",
			SUBSCRIBE_HMAC_SECRET: hmacSecret ? "set" : "missing (secret)",
			TURNSTILE_SECRET_KEY: turnstileSecret ? "set" : "missing (secret)",
			RESEND_AUDIENCE_ID: audienceId || "missing",
			RESEND_FROM_EMAIL: fromEmail || "missing",
			RESEND_FROM_NAME: fromName || "missing",
			NEWSLETTER_SITE_URL: siteUrl || "missing",
		};
		return new Response(
			`Missing Resend configuration.\n${JSON.stringify(configStatus, null, 2)}`,
			{ status: 500, headers: { "Content-Type": "text/plain" } },
		);
	}

	const { email, name, company, turnstileToken } = await getPayload(request);

	// Honeypot: silently accept and discard so bots can't probe the boundary.
	if (company) {
		return fakeSuccess();
	}

	if (!email) {
		return new Response("Email is required.", { status: 400 });
	}

	const clientIp = request.headers.get("CF-Connecting-IP");
	const verified = await verifyTurnstile(
		turnstileToken ?? "",
		turnstileSecret,
		clientIp,
	);
	if (!verified) {
		return new Response("Verification failed. Please try again.", {
			status: 400,
		});
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
