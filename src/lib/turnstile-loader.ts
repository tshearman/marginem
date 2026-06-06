/**
 * Lazy loader for Cloudflare Turnstile. The script (~30KB) is only injected
 * the first time `loadTurnstile()` is called — typically when a user focuses
 * a subscribe form input — so visitors who never interact pay zero cost.
 */

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

type TurnstileGlobal = {
	render: (
		container: HTMLElement,
		options: {
			sitekey: string;
			callback?: (token: string) => void;
			"error-callback"?: () => void;
			"expired-callback"?: () => void;
			appearance?: "always" | "execute" | "interaction-only";
			size?: "normal" | "flexible" | "compact" | "invisible";
			theme?: "light" | "dark" | "auto";
		},
	) => string;
	reset: (widgetId?: string) => void;
	getResponse: (widgetId?: string) => string | undefined;
};

declare global {
	interface Window {
		turnstile?: TurnstileGlobal;
	}
}

let loadPromise: Promise<TurnstileGlobal> | null = null;

const loadTurnstile = (): Promise<TurnstileGlobal> => {
	if (typeof window === "undefined") {
		return Promise.reject(new Error("Turnstile requires a browser."));
	}
	if (window.turnstile) {
		return Promise.resolve(window.turnstile);
	}
	if (loadPromise) {
		return loadPromise;
	}
	loadPromise = new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = SCRIPT_SRC;
		script.async = true;
		script.defer = true;
		script.onload = () => {
			if (window.turnstile) {
				resolve(window.turnstile);
			} else {
				reject(new Error("Turnstile loaded but window.turnstile is missing."));
			}
		};
		script.onerror = () => reject(new Error("Failed to load Turnstile."));
		document.head.appendChild(script);
	});
	return loadPromise;
};

type RenderOpts = {
	container: HTMLElement;
	sitekey: string;
	onToken: (token: string) => void;
	onError?: () => void;
};

const renderTurnstile = async ({
	container,
	sitekey,
	onToken,
	onError,
}: RenderOpts): Promise<string> => {
	const turnstile = await loadTurnstile();
	return turnstile.render(container, {
		sitekey,
		appearance: "interaction-only",
		size: "flexible",
		callback: onToken,
		"error-callback": onError,
		"expired-callback": onError,
	});
};

export { loadTurnstile, renderTurnstile };
export type { TurnstileGlobal };
