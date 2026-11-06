import {
	type Context,
	isEmail,
	missingEnv,
	redirect,
	sendConfirmEmail,
	upstreamError,
} from "../shared";

const verifyTurnstile = async (
	token: string,
	secret: string,
	ip: string | null,
) => {
	if (!token) return false;
	const body = new URLSearchParams({ secret, response: token });
	if (ip) body.set("remoteip", ip);
	try {
		const res = await fetch(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
			{ method: "POST", body },
		);
		const data = (await res.json()) as { success?: boolean };
		return res.ok && data.success === true;
	} catch {
		return false;
	}
};

export const onRequestPost = async ({ request, env }: Context) => {
	const misconfigured = missingEnv(env);
	if (misconfigured) return misconfigured;

	const form = await request.formData().catch(() => new FormData());
	const field = (key: string) => String(form.get(key) ?? "").trim();
	const email = field("email");

	// Honeypot: answer exactly like a success so bots can't tell.
	if (field("company")) return redirect("/subscribe/pending");

	if (!isEmail(email)) {
		return new Response("A valid email is required.", { status: 400 });
	}

	const verified = await verifyTurnstile(
		field("cf-turnstile-response"),
		env.TURNSTILE_SECRET_KEY,
		request.headers.get("CF-Connecting-IP"),
	);
	if (!verified) {
		return new Response("Verification failed. Please try again.", {
			status: 400,
		});
	}

	const name = field("name").slice(0, 100) || undefined;
	const res = await sendConfirmEmail(env, "subscribe", email, name);
	return res.ok ? redirect("/subscribe/pending") : upstreamError(res);
};
