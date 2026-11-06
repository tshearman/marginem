import { verifySubscribeToken } from "../../lib/subscribe-token";
import {
	type Context,
	contactPath,
	missingEnv,
	redirect,
	resend,
	upstreamError,
} from "../shared";

export const onRequestGet = async ({ request, env }: Context) => {
	const misconfigured = missingEnv(env);
	if (misconfigured) return misconfigured;

	const token = new URL(request.url).searchParams.get("token") ?? "";
	const payload = await verifySubscribeToken(
		token,
		env.SUBSCRIBE_HMAC_SECRET,
		"subscribe",
	);
	if (!payload) {
		return new Response("Invalid or expired token.", { status: 400 });
	}

	const res = await resend(env, contactPath(env), {
		method: "POST",
		body: JSON.stringify({ email: payload.email, first_name: payload.name }),
	});
	// 409: already subscribed.
	return res.ok || res.status === 409
		? redirect("/subscribe/confirmed")
		: upstreamError(res);
};
