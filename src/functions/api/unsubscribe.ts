import { verifySubscribeToken } from "../../lib/subscribe-token";
import { getEnvValue, type Env } from "../env";

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

type FunctionContext = {
	request: Request;
	env: Env;
};

const sleep = (ms: number) =>
	new Promise((resolve) => {
		setTimeout(resolve, ms);
	});

const fetchWithRetry = async (
	input: RequestInfo | URL,
	init: RequestInit,
	retries = 1,
) => {
	const response = await fetch(input, init);
	if (response.status !== 429 || retries <= 0) {
		return response;
	}
	const retryAfter = Number(response.headers.get("Retry-After"));
	const waitMs = Number.isFinite(retryAfter) ? retryAfter * 1000 : 750;
	await sleep(waitMs);
	return fetchWithRetry(input, init, retries - 1);
};

export const onRequestPost = async ({ request, env }: FunctionContext) => {
	const apiKey = getEnvValue(env, "RESEND_API_KEY");
	const audienceId = getEnvValue(env, "RESEND_AUDIENCE_ID");
	const hmacSecret = getEnvValue(env, "SUBSCRIBE_HMAC_SECRET");

	if (!apiKey || !audienceId || !hmacSecret) {
		return new Response("Missing Resend configuration.", { status: 500 });
	}

	const body = (await request.json()) as { token?: string };
	const token = String(body.token ?? "");
	const payload = await verifySubscribeToken(token, hmacSecret, "unsubscribe");
	if (!payload) {
		return new Response("Invalid or expired token.", { status: 400 });
	}

	const { contactId, error } = await getContactId(
		payload.email,
		audienceId,
		apiKey,
	);
	if (error) {
		return new Response(error, { status: 502 });
	}
	if (!contactId) {
		return new Response("Contact lookup failed.", { status: 404 });
	}

	const deleteResponse = await fetchWithRetry(
		`https://api.resend.com/audiences/${audienceId}/contacts/${contactId}`,
		{
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
		},
	);
	if (!deleteResponse.ok && deleteResponse.status !== 404) {
		const message = await deleteResponse.text();
		return new Response(
			message || "Resend delete failed. Please try again later.",
			{ status: 502 },
		);
	}

	await sleep(1200);

	const response = await fetchWithRetry(
		`https://api.resend.com/audiences/${audienceId}/contacts/${contactId}`,
		{
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				unsubscribed: true,
			}),
		},
	);
	if (!response.ok) {
		const message = await response.text();
		return new Response(
			message || "Resend request failed. Please try again later.",
			{ status: 502 },
		);
	}

	return new Response("Unsubscribed.", { status: 200 });
};
