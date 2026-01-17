import type { APIRoute } from "astro";
import { confirmSubscription } from "../../../lib/subscriptions/store";

export const prerender = false;

const renderPage = (opts: { title: string; body: string }) => `<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>${opts.title}</title>
	<style>
		body { font-family: "Source Serif 4", "Iowan Old Style", Georgia, serif; padding: 3rem 1.5rem; color: #1a1a1a; background: #fff; }
		.card { max-width: 720px; margin: 0 auto; padding: 2rem; border: 1px solid rgba(0,0,0,0.12); border-radius: 0.75rem; box-shadow: 0 10px 45px rgba(0,0,0,0.05); }
		h1 { margin-top: 0; font-size: 1.8rem; }
		p { font-size: 1rem; line-height: 1.6; }
		a { color: #1b1b1d; }
	</style>
</head>
<body>
	<div class="card">
		<h1>${opts.title}</h1>
		<p>${opts.body}</p>
		<p><a href="/">Return home</a></p>
	</div>
</body>
</html>`;

export const GET: APIRoute = async ({ url }) => {
	const token = url.searchParams.get("token");
	if (!token) {
		return new Response(
			renderPage({
				title: "Missing token",
				body: "We couldn't find a confirmation token in your link.",
			}),
			{ status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } },
		);
	}

	try {
		const result = confirmSubscription(token);
		if (!result.ok) {
			return new Response(
				renderPage({
					title: "Already confirmed or invalid",
					body: "This confirmation link is invalid or has already been used.",
				}),
				{
					status: 400,
					headers: { "Content-Type": "text/html; charset=utf-8" },
				},
			);
		}

		return new Response(
			renderPage({
				title: "Subscription confirmed",
				body: "Thanks for confirming! You're all set to receive updates.",
			}),
			{ status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
		);
	} catch (error) {
		console.error("[subscribe.confirm] error", { error });
		return new Response(
			renderPage({
				title: "Something went wrong",
				body: "We couldn't confirm your email. Please try again later.",
			}),
			{ status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } },
		);
	}
};
