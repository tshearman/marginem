// Signed, expiring tokens for the subscribe/unsubscribe confirmation links:
// base64url(JSON payload) + "." + base64url(HMAC-SHA256 of the first part).

type Purpose = "subscribe" | "unsubscribe";

type TokenPayload = {
	email: string;
	name?: string;
	purpose: Purpose;
	exp: number;
};

const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const encoder = new TextEncoder();

const toBase64Url = (bytes: Uint8Array) =>
	btoa(String.fromCharCode(...bytes))
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");

const fromBase64Url = (value: string) =>
	Uint8Array.from(atob(value.replace(/-/g, "+").replace(/_/g, "/")), (c) =>
		c.charCodeAt(0),
	);

const hmacKey = (secret: string) =>
	crypto.subtle.importKey(
		"raw",
		encoder.encode(secret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign", "verify"],
	);

export const createSubscribeToken = async (
	payload: Omit<TokenPayload, "exp">,
	secret: string,
) => {
	const body = toBase64Url(
		encoder.encode(
			JSON.stringify({ ...payload, exp: Date.now() + MAX_AGE_MS }),
		),
	);
	const signature = await crypto.subtle.sign(
		"HMAC",
		await hmacKey(secret),
		encoder.encode(body),
	);
	return `${body}.${toBase64Url(new Uint8Array(signature))}`;
};

// Returns the payload, or null if the token is malformed, forged, expired or
// for the other purpose. subtle.verify compares signatures in constant time.
export const verifySubscribeToken = async (
	token: string,
	secret: string,
	purpose: Purpose,
): Promise<TokenPayload | null> => {
	try {
		const [body, signature] = token.split(".");
		const valid = await crypto.subtle.verify(
			"HMAC",
			await hmacKey(secret),
			fromBase64Url(signature),
			encoder.encode(body),
		);
		if (!valid) return null;
		const payload: TokenPayload = JSON.parse(
			new TextDecoder().decode(fromBase64Url(body)),
		);
		return payload.purpose === purpose &&
			payload.email &&
			Date.now() <= payload.exp
			? payload
			: null;
	} catch {
		return null;
	}
};
