/**
 * Client-side wiring for subscribe forms. Finds every
 * `form[data-subscribe-form]` on the page and:
 *
 *   1. Lazy-loads Cloudflare Turnstile on first focus of an input.
 *   2. Renders the widget into the form's `.cf-turnstile-mount` element.
 *   3. On submit, waits up to ~8s for a token if one isn't ready yet.
 *
 * The form already includes a hidden honeypot field server-side, so this
 * file is purely about producing a valid Turnstile token for real users.
 */
import { renderTurnstile } from "./turnstile-loader";

const wireForm = (form: HTMLFormElement) => {
	const sitekey = form.dataset.turnstileSitekey ?? "";
	const mount = form.querySelector<HTMLElement>(".cf-turnstile-mount");
	if (!sitekey || !mount) return;

	let token = "";
	let loading: Promise<void> | null = null;

	const ensureWidget = () => {
		if (loading) return loading;
		loading = renderTurnstile({
			container: mount,
			sitekey,
			onToken: (t) => {
				token = t;
			},
			onError: () => {
				token = "";
			},
		})
			.then(() => undefined)
			.catch(() => {
				loading = null;
			});
		return loading;
	};

	const inputs = form.querySelectorAll<HTMLInputElement>(
		'input[name="email"], input[name="name"]',
	);
	for (const el of inputs) {
		el.addEventListener("focus", ensureWidget, { once: true });
	}

	form.addEventListener("submit", async (event) => {
		if (token) return;
		event.preventDefault();
		await ensureWidget();
		const start = Date.now();
		while (!token && Date.now() - start < 8000) {
			await new Promise((r) => setTimeout(r, 100));
		}
		if (token) {
			form.submit();
		} else {
			alert("Verification failed. Please try again.");
		}
	});
};

const forms = document.querySelectorAll<HTMLFormElement>(
	"form[data-subscribe-form]",
);
for (const form of forms) {
	wireForm(form);
}
