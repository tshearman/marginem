import type { AstroCookies } from "astro";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

const VISITOR_COOKIE = "visitor_id";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
const MAX_VISITOR_ID_LENGTH = 64;

const COOKIE_OPTIONS = {
	httpOnly: true,
	sameSite: "lax" as const,
	path: "/",
	secure: import.meta.env.PROD,
	maxAge: ONE_YEAR_SECONDS,
};

const VISITOR_COOKIE_SECRET = process.env.VISITOR_COOKIE_SECRET;

if (!VISITOR_COOKIE_SECRET) {
	throw new Error(
		"VISITOR_COOKIE_SECRET is required to sign visitor cookies securely",
	);
}

const signVisitorId = (visitorId: string) =>
	createHmac("sha256", VISITOR_COOKIE_SECRET).update(visitorId).digest("base64url");

const buildSignedCookieValue = (visitorId: string) =>
	`${visitorId}.${signVisitorId(visitorId)}`;

const parseSignedCookieValue = (value: string | undefined) => {
	if (!value) return null;
	const [visitorId, signature] = value.split(".");
	if (!visitorId || !signature || visitorId.length > MAX_VISITOR_ID_LENGTH) {
		return null;
	}
	const expected = signVisitorId(visitorId);
	const provided = Buffer.from(signature);
	const expectedBuf = Buffer.from(expected);
	if (provided.length !== expectedBuf.length) return null;
	return timingSafeEqual(provided, expectedBuf) ? visitorId : null;
};

export const readVisitorId = (cookies: AstroCookies) =>
	parseSignedCookieValue(cookies.get(VISITOR_COOKIE)?.value);

export const ensureVisitorId = (cookies: AstroCookies) => {
	const existing = readVisitorId(cookies);
	if (existing) return existing;

	const visitorId = randomUUID();
	const signedValue = buildSignedCookieValue(visitorId);
	cookies.set(VISITOR_COOKIE, signedValue, COOKIE_OPTIONS);
	return visitorId;
};

export const getVisitorCookieName = () => VISITOR_COOKIE;
