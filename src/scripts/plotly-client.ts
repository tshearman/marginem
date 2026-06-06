type PlotlyType = {
	newPlot: (...args: unknown[]) => unknown;
	react: (...args: unknown[]) => unknown;
};

type Payload = {
	data?: unknown[];
	layout?: Record<string, unknown>;
	config?: Record<string, unknown>;
};

// Match the body font (iA Writer Duo).
const DEFAULT_FONT_FAMILY =
	'"iA Writer Duo", "Courier New", Courier, monospace';
const DEFAULT_FONT_SIZE = 12;

/**
 * Read the current theme colors off the live CSS custom properties so
 * charts re-render against --ink / --paper instead of hardcoded values.
 * The toggle in Masthead flips data-theme on <html>, which updates these.
 */
function readThemeColors() {
	const styles = getComputedStyle(document.documentElement);
	const ink = styles.getPropertyValue("--ink").trim() || "#0f172a";
	const paper = styles.getPropertyValue("--paper").trim() || "#ffffff";
	const isDark = document.documentElement.dataset.theme === "dark";
	return {
		font: { family: DEFAULT_FONT_FAMILY, size: DEFAULT_FONT_SIZE, color: ink },
		paper,
		plot: paper,
		grid: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
		ink,
	};
}

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
			(module) => module.default as unknown as PlotlyType,
		);
	}
	return plotlyPromise;
}

type ChartRecord = {
	data: unknown[];
	layout: Record<string, unknown>;
	config: Record<string, unknown>;
};

// Track every hydrated chart so we can re-theme it when the toggle fires.
const charts = new Map<HTMLElement, ChartRecord>();

function applyThemeToLayout(
	layout: Record<string, unknown>,
	data: unknown[],
): Record<string, unknown> {
	const theme = readThemeColors();
	const next: Record<string, unknown> = { ...layout };

	const incomingFont =
		typeof layout.font === "object" && layout.font !== null
			? (layout.font as Record<string, unknown>)
			: {};
	// Always re-apply font color so it tracks the theme even if caller set
	// other font fields (family/size).
	next.font = { ...theme.font, ...incomingFont, color: theme.font.color };

	const incomingHover =
		typeof layout.hoverlabel === "object" && layout.hoverlabel !== null
			? (layout.hoverlabel as Record<string, unknown>)
			: {};
	const incomingHoverFont =
		typeof incomingHover.font === "object" && incomingHover.font !== null
			? (incomingHover.font as Record<string, unknown>)
			: {};
	next.hoverlabel = {
		...incomingHover,
		font: { ...theme.font, ...incomingHoverFont, color: theme.font.color },
	};

	next.paper_bgcolor = theme.paper;
	next.plot_bgcolor = theme.plot;

	// Light-touch axis theming: only set color/gridcolor where the chart
	// didn't already provide them, so per-chart overrides still win.
	for (const key of ["xaxis", "yaxis"]) {
		const axis =
			typeof layout[key] === "object" && layout[key] !== null
				? { ...(layout[key] as Record<string, unknown>) }
				: {};
		if (axis.color === undefined) axis.color = theme.ink;
		if (axis.gridcolor === undefined) axis.gridcolor = theme.grid;
		if (axis.zerolinecolor === undefined) axis.zerolinecolor = theme.grid;
		next[key] = axis;
	}

	// Per-trace hoverlabel font also needs the live color.
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
			font: { ...theme.font, ...traceHoverFont, color: theme.font.color },
		};
	}

	return next;
}

async function hydrateChart(el: HTMLElement) {
	const raw = el.getAttribute("data-plotly");
	if (!raw) return;
	try {
		const payload = JSON.parse(raw) as Payload;
		el.removeAttribute("data-plotly");
		const data = payload.data ?? [];
		const baseLayout = { ...(payload.layout ?? {}) };
		const config = payload.config ?? {};

		const Plotly = await loadPlotly();
		const layoutHeight = asNumber(baseLayout.height);
		const rect = el.getBoundingClientRect();
		const measuredHeight = Math.round(rect.height);

		if (layoutHeight === undefined && measuredHeight > 0) {
			baseLayout.height = measuredHeight;
		}
		if (layoutHeight === undefined) {
			baseLayout.autosize = true;
		}

		const themedLayout = applyThemeToLayout(baseLayout, data);
		charts.set(el, { data, layout: baseLayout, config });
		void Plotly.newPlot(el, data, themedLayout, config);
	} catch (error) {
		console.error("Failed to initialize Plotly chart", error);
	}
}

async function retintAll() {
	const Plotly = await loadPlotly();
	for (const [el, record] of charts) {
		const themed = applyThemeToLayout(record.layout, record.data);
		try {
			void Plotly.react(el, record.data, themed, record.config);
		} catch (error) {
			console.error("Failed to retint Plotly chart", error);
		}
	}
}

document.addEventListener("themechange", () => {
	void retintAll();
});

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
