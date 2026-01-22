type StatusState = "loading" | "success" | "error";

const form = document.querySelector(".unsubscribe-form");
const statusEl = document.querySelector<HTMLElement>(
	".unsubscribe-form__status",
);

const setStatus = (message: string, state: StatusState) => {
	if (!statusEl) return;
	statusEl.textContent = message;
	statusEl.dataset.state = state;
};

const unsubscribeWithToken = async (token: string) => {
	setStatus("Unsubscribing...", "loading");
	try {
		const response = await fetch("/api/unsubscribe", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token }),
		});
		const message = await response.text();
		if (!response.ok) {
			throw new Error(message || "Unsubscribe failed.");
		}
		window.location.href = "/unsubscribe/confirmed";
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Unsubscribe failed.";
		setStatus(message, "error");
	}
};

const params = new URLSearchParams(window.location.search);
const token = params.get("token");
if (token) {
	unsubscribeWithToken(token);
}

if (form instanceof HTMLFormElement) {
	form.addEventListener("submit", async (event) => {
		event.preventDefault();
		setStatus("Sending unsubscribe link...", "loading");

		const formData = new FormData(form);
		const payload = {
			email: String(formData.get("email") || "").trim(),
		};

		try {
			const response = await fetch(
				form.dataset.action || "/api/unsubscribe-request",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				},
			);
			const result = await response.json();
			if (!response.ok) {
				throw new Error(result?.error || "Unsubscribe request failed");
			}
			window.location.href = "/unsubscribe/pending";
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: "Unsubscribe request failed.";
			setStatus(message, "error");
		}
	});
}

export type {};
