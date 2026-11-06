/**
 * Client-side wiring for every `form[data-subscribe-form]`. Cloudflare
 * Turnstile (~30KB) is only loaded on first focus of an input, then rendered
 * into the form's `.cf-turnstile-mount`. On submit, waits up to ~8s for a
 * token before posting. (The honeypot field needs no client code.)
 */

type Turnstile = {
	render: (container: HTMLElement, options: object) => string;
};

declare global {
	interface Window {
		turnstile?: Turnstile;
	}
}

let scriptLoad: Promise<Turnstile> | null = null;

const loadTurnstile = () => {
	scriptLoad ??= new Promise<Turnstile>((resolve, reject) => {
		const script = document.createElement("script");
		script.src =
			"https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
		script.async = true;
		script.onload = () =>
			window.turnstile
				? resolve(window.turnstile)
				: reject(new Error("Turnstile failed to initialise."));
		script.onerror = () => reject(new Error("Failed to load Turnstile."));
		document.head.append(script);
	}).catch((error) => {
		scriptLoad = null; // let the next focus/submit retry
		throw error;
	});
	return scriptLoad;
};

const wireForm = (form: HTMLFormElement) => {
	const sitekey = form.dataset.turnstileSitekey;
	const mount = form.querySelector<HTMLElement>(".cf-turnstile-mount");
	if (!sitekey || !mount) return;

	let token = "";
	let widget: Promise<void> | null = null;
	const clearToken = () => {
		token = "";
	};

	const ensureWidget = () => {
		widget ??= loadTurnstile().then(
			(turnstile) => {
				turnstile.render(mount, {
					sitekey,
					appearance: "interaction-only",
					size: "flexible",
					// The iframe can't see our CSS, so match the site toggle rather
					// than the OS ("auto"), which shows a white box in dark mode.
					theme:
						document.documentElement.dataset.theme === "dark"
							? "dark"
							: "light",
					callback: (t: string) => {
						token = t;
					},
					"error-callback": clearToken,
					"expired-callback": clearToken,
				});
			},
			() => {
				widget = null;
			},
		);
		return widget;
	};

	for (const input of form.querySelectorAll(
		"input[name=email], input[name=name]",
	)) {
		input.addEventListener("focus", ensureWidget, { once: true });
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

for (const form of document.querySelectorAll<HTMLFormElement>(
	"form[data-subscribe-form]",
)) {
	wireForm(form);
}

export type {};
