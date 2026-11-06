import {
	type Context,
	contactPath,
	isEmail,
	missingEnv,
	redirect,
	resend,
	sendConfirmEmail,
	upstreamError,
} from "../shared";

export const onRequestPost = async ({ request, env }: Context) => {
	const misconfigured = missingEnv(env);
	if (misconfigured) return misconfigured;

	const form = await request.formData().catch(() => new FormData());
	const email = String(form.get("email") ?? "").trim();
	if (!isEmail(email)) {
		return new Response("A valid email is required.", { status: 400 });
	}

	// Only subscribers are emailed, but everyone lands on the same page so the
	// form can't be used to find out who is subscribed.
	const contact = await resend(env, contactPath(env, email));
	if (contact.status === 404) return redirect("/unsubscribe/pending");
	if (!contact.ok) return upstreamError(contact);

	const res = await sendConfirmEmail(env, "unsubscribe", email);
	return res.ok ? redirect("/unsubscribe/pending") : upstreamError(res);
};
