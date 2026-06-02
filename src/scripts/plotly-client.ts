type PlotlyType = {
	newPlot: (...args: unknown[]) => unknown;
};

type Payload = {
	data?: unknown[];
	layout?: Record<string, unknown>;
	config?: Record<string, unknown>;
};

// Match the body font (iA Writer Duo) and ink color of the post page.
const DEFAULT_FONT = {
	family: '"iA Writer Duo", "Courier New", Courier, monospace',
	size: 12,
	color: "#0f172a",
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

		// Merge a default font into the layout so every chart picks up the
		// page's monospace face. Per-chart `layout.font` overrides win.
		const incomingFont =
			typeof layout.font === "object" && layout.font !== null
				? (layout.font as Record<string, unknown>)
				: {};
		layout.font = { ...DEFAULT_FONT, ...incomingFont };

		// Hover tooltips don't inherit from layout.font — they have their own
		// hoverlabel.font slot. Per-trace hoverlabel.font also has to be set
		// explicitly because traces don't fall back to layout.hoverlabel either.
		const incomingHover =
			typeof layout.hoverlabel === "object" && layout.hoverlabel !== null
				? (layout.hoverlabel as Record<string, unknown>)
				: {};
		const incomingHoverFont =
			typeof incomingHover.font === "object" && incomingHover.font !== null
				? (incomingHover.font as Record<string, unknown>)
				: {};
		layout.hoverlabel = {
			...incomingHover,
			font: { ...DEFAULT_FONT, ...incomingHoverFont },
		};

		for (const trace of data) {
			if (typeof trace !== "object" || trace === null) continue;
			const t = trace as Record<string, unknown>;
			const traceHover =
				typeof t.hoverlabel === "object" && t.hoverlabel !== null
					? (t.hoverlabel as Record<string, unknown>)
					: {};
			const traceHoverFont =
				typeof traceHover.font === "object" && traceHover.font !== null
					? (traceHover.font as Record<string, unknown>)
					: {};
			t.hoverlabel = {
				...traceHover,
				font: { ...DEFAULT_FONT, ...traceHoverFont },
			};
		}

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

export type {};
