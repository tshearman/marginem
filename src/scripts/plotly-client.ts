import Plotly from "plotly.js-dist-min";

type Payload = {
	data?: unknown[];
	layout?: Record<string, unknown>;
	config?: Record<string, unknown>;
};

function asNumber(value: unknown): number | undefined {
	return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function hydrateChart(el: HTMLElement) {
	const raw = el.getAttribute("data-plotly");
	if (!raw) return;
	try {
		const payload = JSON.parse(raw) as Payload;
		el.removeAttribute("data-plotly");
		const data = payload.data ?? [];
		const layout = { ...(payload.layout ?? {}) };
		const config = payload.config ?? {};
		const layoutHeight = asNumber(layout.height);
		const rect = el.getBoundingClientRect();
		const measuredHeight = Math.round(rect.height);

		if (layoutHeight === undefined && measuredHeight > 0) {
			layout.height = measuredHeight;
		}
		if (layoutHeight === undefined) {
			layout.autosize = true;
		}

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
