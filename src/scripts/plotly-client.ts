type PlotlyType = {
	newPlot: (...args: unknown[]) => unknown;
};

type Payload = {
	data?: unknown[];
	layout?: Record<string, unknown>;
	config?: Record<string, unknown>;
};

function asNumber(value: unknown): number | undefined {
	return typeof value === "number" && Number.isFinite(value)
		? value
		: undefined;
}

let plotlyPromise: Promise<PlotlyType> | null = null;

function ensureGlobalShim() {
	const g = globalThis as typeof globalThis & { global?: typeof globalThis };
	if (!g.global) {
		g.global = g;
	}
}

function loadPlotly(): Promise<PlotlyType> {
	if (!plotlyPromise) {
		ensureGlobalShim();
		plotlyPromise = import("./plotly-bundle.ts").then(
			(module) => module.default as PlotlyType,
		);
	}
	return plotlyPromise;
}

async function hydrateChart(el: HTMLElement) {
	const raw = el.getAttribute("data-plotly");
	if (!raw) return;
	try {
		const payload = JSON.parse(raw) as Payload;
		el.removeAttribute("data-plotly");
		const data = payload.data ?? [];
		const layout = { ...(payload.layout ?? {}) };
		const config = payload.config ?? {};
		const Plotly = await loadPlotly();
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
		void hydrateChart(el);
	}
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
	init();
}

export type { };
