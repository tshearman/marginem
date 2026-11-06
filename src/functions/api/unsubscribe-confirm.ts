import { verifySubscribeToken } from "../../lib/subscribe-token";
import {
	type Context,
	contactPath,
	missingEnv,
	redirect,
	resend,
	upstreamError,
} from "../shared";

export const onRequestGet = async ({ request, env, waitUntil }: Context) => {
	const misconfigured = missingEnv(env);
	if (misconfigured) return misconfigured;

	const token = new URL(request.url).searchParams.get("token") ?? "";
	const payload = await verifySubscribeToken(
		token,
		env.SUBSCRIBE_HMAC_SECRET,
		"unsubscribe",
	);
	if (!payload) {
		return new Response("Invalid or expired token.", { status: 400 });
	}

	// Mark unsubscribed first so broadcasts stop even if the delete fails.
	const path = contactPath(env, payload.email);
	const res = await resend(env, path, {
		method: "PATCH",
		body: JSON.stringify({ unsubscribed: true }),
	});
	// 404: already removed (e.g. the link was opened twice).
	if (res.status === 404) return redirect("/unsubscribe/confirmed");
	if (!res.ok) return upstreamError(res);

	// Then remove the contact entirely, after responding.
	waitUntil(
		resend(env, path, { method: "DELETE" }).then((del) => {
			if (!del.ok && del.status !== 404) {
				console.error(`Resend contact delete failed: ${del.status}`);
			}
		}),
	);
	return redirect("/unsubscribe/confirmed");
};
