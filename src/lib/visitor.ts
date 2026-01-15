import type { AstroCookies } from "astro";
import { randomUUID } from "node:crypto";

const VISITOR_COOKIE = "visitor_id";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

const COOKIE_OPTIONS = {
	httpOnly: true,
	sameSite: "lax" as const,
	path: "/",
	secure: import.meta.env.PROD,
	maxAge: ONE_YEAR_SECONDS,
};

export const ensureVisitorId = (cookies: AstroCookies) => {
	const existing = cookies.get(VISITOR_COOKIE)?.value;
	if (existing) return existing;

	const visitorId = randomUUID();
	cookies.set(VISITOR_COOKIE, visitorId, COOKIE_OPTIONS);
	return visitorId;
};

export const getVisitorCookieName = () => VISITOR_COOKIE;
