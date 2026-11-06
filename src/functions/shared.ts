// Helpers shared by the subscribe/unsubscribe functions in ./api. Not a route:
// Pages only routes files that export onRequest* handlers.
import { createSubscribeToken } from "../lib/subscribe-token";

export type Env = {
	RESEND_API_KEY: string;
	RESEND_AUDIENCE_ID: string;
	RESEND_FROM_EMAIL: string;
	RESEND_FROM_NAME?: string;
	NEWSLETTER_SITE_URL: string;
	SUBSCRIBE_HMAC_SECRET: string;
	TURNSTILE_SECRET_KEY: string;
};

export type Context = {
	request: Request;
	env: Env;
	waitUntil: (promise: Promise<unknown>) => void;
};

const REQUIRED_ENV = [
	"RESEND_API_KEY",
	"RESEND_AUDIENCE_ID",
	"RESEND_FROM_EMAIL",
	"NEWSLETTER_SITE_URL",
	"SUBSCRIBE_HMAC_SECRET",
	"TURNSTILE_SECRET_KEY",
] as const;

// A 500 if any required binding is unset (which ones stays in the logs).
export const missingEnv = (env: Env) => {
	const missing = REQUIRED_ENV.filter((key) => !env[key]);
	if (!missing.length) return null;
	console.error(`Missing env: ${missing.join(", ")}`);
	return new Response("Server misconfigured.", { status: 500 });
};

export const redirect = (location: string) =>
	new Response(null, { status: 303, headers: { Location: location } });

// Clients get a generic 502; Resend's error body only goes to the logs.
export const upstreamError = async (res: Response) => {
	console.error(`Resend ${res.status}: ${await res.text()}`);
	return new Response("Something went wrong. Please try again later.", {
		status: 502,
	});
};

export const isEmail = (value: string) =>
	value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// Calls the Resend API, retrying once on a 429 (rate limit).
export const resend = async (
	env: Env,
	path: string,
	init: RequestInit = {},
	retry = true,
): Promise<Response> => {
	const res = await fetch(`https://api.resend.com${path}`, {
		...init,
		headers: {
			Authorization: `Bearer ${env.RESEND_API_KEY}`,
			"Content-Type": "application/json",
		},
	});
	if (res.status !== 429 || !retry) return res;
	const waitSeconds = Math.min(Number(res.headers.get("Retry-After")) || 1, 2);
	await new Promise((resolve) => setTimeout(resolve, waitSeconds * 1000));
	return resend(env, path, init, false);
};

// Resend accepts the email in place of a contact id.
export const contactPath = (env: Env, email?: string) =>
	`/audiences/${env.RESEND_AUDIENCE_ID}/contacts${
		email ? `/${encodeURIComponent(email)}` : ""
	}`;

const CONFIRM_COPY = {
	subscribe: {
		subject: "Confirm your subscription",
		link: "Confirm subscription",
	},
	unsubscribe: {
		subject: "Confirm your unsubscribe request",
		link: "Confirm unsubscribe",
	},
};

// Emails a signed, 7-day link to /api/subscribe-confirm or
// /api/unsubscribe-confirm.
export const sendConfirmEmail = async (
	env: Env,
	purpose: "subscribe" | "unsubscribe",
	email: string,
	name?: string,
) => {
	const url = new URL(`/api/${purpose}-confirm`, env.NEWSLETTER_SITE_URL);
	url.searchParams.set(
		"token",
		await createSubscribeToken(
			{ email, name, purpose },
			env.SUBSCRIBE_HMAC_SECRET,
		),
	);
	const { subject, link } = CONFIRM_COPY[purpose];
	return resend(env, "/emails", {
		method: "POST",
		body: JSON.stringify({
			from: env.RESEND_FROM_NAME
				? `${env.RESEND_FROM_NAME} <${env.RESEND_FROM_EMAIL}>`
				: env.RESEND_FROM_EMAIL,
			to: [email],
			subject,
			html: `<p>${subject} by clicking the link below:</p>
<p><a href="${url}">${link}</a></p>
<p>If you did not request this, you can ignore this email.</p>`,
			text: `${subject}: ${url}`,
		}),
	});
};
