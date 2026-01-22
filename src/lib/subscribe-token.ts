type TokenPayload = {
	email: string;
	name?: string;
	purpose: "subscribe" | "unsubscribe";
	iat: number;
	exp: number;
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const encodeBase64 = (data: Uint8Array) => {
	if (typeof Buffer !== "undefined") {
		return Buffer.from(data).toString("base64");
	}
	let binary = "";
	for (const byte of data) {
		binary += String.fromCharCode(byte);
	}
	return btoa(binary);
};

const decodeBase64 = (value: string) => {
	if (typeof Buffer !== "undefined") {
		return new Uint8Array(Buffer.from(value, "base64"));
	}
	const binary = atob(value);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i += 1) {
		bytes[i] = binary.charCodeAt(i);
	}
	return bytes;
};

const toBase64Url = (data: Uint8Array) =>
	encodeBase64(data).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const fromBase64Url = (value: string) => {
	const padded = value.replace(/-/g, "+").replace(/_/g, "/");
	const padLength = (4 - (padded.length % 4)) % 4;
	return decodeBase64(`${padded}${"=".repeat(padLength)}`);
};

const signValue = async (value: string, secret: string) => {
	const key = await crypto.subtle.importKey(
		"raw",
		encoder.encode(secret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign"],
	);
	const signature = await crypto.subtle.sign(
		"HMAC",
		key,
		encoder.encode(value),
	);
	return toBase64Url(new Uint8Array(signature));
};

export const createSubscribeToken = async (
	payload: Omit<TokenPayload, "iat" | "exp">,
	secret: string,
	maxAgeMs: number,
) => {
	const now = Date.now();
	const fullPayload: TokenPayload = {
		...payload,
		iat: now,
		exp: now + maxAgeMs,
	};
	const payloadBytes = encoder.encode(JSON.stringify(fullPayload));
	const payloadPart = toBase64Url(payloadBytes);
	const signature = await signValue(payloadPart, secret);
	return `${payloadPart}.${signature}`;
};

export const verifySubscribeToken = async (
	token: string,
	secret: string,
	purpose: TokenPayload["purpose"],
) => {
	const [payloadPart, signature] = token.split(".");
	if (!payloadPart || !signature) return null;
	const expectedSignature = await signValue(payloadPart, secret);
	if (signature !== expectedSignature) return null;
	const payloadBytes = fromBase64Url(payloadPart);
	const payload = JSON.parse(decoder.decode(payloadBytes)) as TokenPayload;
	if (!payload?.email || !payload.exp || payload.purpose !== purpose) return null;
	if (Date.now() > payload.exp) return null;
	return payload;
};
