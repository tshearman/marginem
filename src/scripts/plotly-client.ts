import Plotly from "plotly.js-dist-min";

type Payload = {
	data?: unknown[];
	layout?: Record<string, unknown>;
	config?: Record<string, unknown>;
};

function hydrateChart(el: HTMLElement) {
	const raw = el.getAttribute("data-plotly");
	if (!raw) return;
	try {
		const payload = JSON.parse(raw) as Payload;
		el.removeAttribute("data-plotly");
		const data = payload.data ?? [];
		const layout = payload.layout ?? {};
		const config = payload.config ?? {};
		void Plotly.newPlot(el, data, layout, config);
	} catch (error) {
		console.error("Failed to initialize Plotly chart", error);
	}
}

function init() {
	const nodes = document.querySelectorAll<HTMLElement>("[data-plotly]");
	for (const el of nodes) {
		hydrateChart(el);
	}
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
	init();
}
