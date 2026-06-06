/*
 * ECharts hydrator.
 *
 * Walks every `[data-echart]` element on the page, parses its JSON `option`
 * payload, applies a theme overlay derived from live CSS custom properties
 * (--ink / --paper), and dynamic-imports the ECharts bundle to call `init` +
 * `setOption`. Tracks each instance so the masthead's `themechange` event can
 * re-tint without rebuilding the chart.
 *
 * The ECharts module itself is lazy-loaded so the ~300 KB chart bundle only
 * downloads on pages that actually contain a chart.
 */

type EChartsBundle = typeof import("./echarts-bundle.ts");
type EChartsInstance = ReturnType<EChartsBundle["init"]>;

const DEFAULT_FONT_FAMILY =
	'"iA Writer Duo", "Courier New", Courier, monospace';
const DEFAULT_FONT_SIZE = 12;

type ThemeColors = {
	ink: string;
	paper: string;
	grid: string;
	font: { family: string; size: number; color: string };
};

function readThemeColors(): ThemeColors {
	const styles = getComputedStyle(document.documentElement);
	const ink = styles.getPropertyValue("--ink").trim() || "#0f172a";
	const paper = styles.getPropertyValue("--paper").trim() || "#ffffff";
	const isDark = document.documentElement.dataset.theme === "dark";
	return {
		ink,
		paper,
		grid: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
		font: { family: DEFAULT_FONT_FAMILY, size: DEFAULT_FONT_SIZE, color: ink },
	};
}

/** Merge theme-derived colors into an ECharts option without clobbering any
 *  caller-set values. Per-series and per-axis fields the user supplied win. */
function applyThemeToOption(
	option: Record<string, unknown>,
	theme: ThemeColors,
): Record<string, unknown> {
	const next = { ...option };

	next.backgroundColor = theme.paper;
	next.textStyle = {
		...(next.textStyle as object | undefined),
		fontFamily: theme.font.family,
		fontSize: theme.font.size,
		color: theme.ink,
	};

	const themeAxis = (axis: unknown): Record<string, unknown> => {
		const a =
			typeof axis === "object" && axis !== null
				? { ...(axis as Record<string, unknown>) }
				: {};
		const al = (a.axisLabel ?? {}) as Record<string, unknown>;
		a.axisLabel = { color: theme.ink, ...al };
		const aline = (a.axisLine ?? {}) as Record<string, unknown>;
		const alineStyle = (aline.lineStyle ?? {}) as Record<string, unknown>;
		a.axisLine = {
			...aline,
			lineStyle: { color: theme.ink, ...alineStyle },
		};
		const sl = (a.splitLine ?? {}) as Record<string, unknown>;
		const slStyle = (sl.lineStyle ?? {}) as Record<string, unknown>;
		a.splitLine = {
			...sl,
			lineStyle: { color: theme.grid, ...slStyle },
		};
		return a;
	};

	for (const key of ["xAxis", "yAxis"] as const) {
		const val = next[key];
		if (Array.isArray(val)) next[key] = val.map(themeAxis);
		else if (val !== undefined) next[key] = themeAxis(val);
	}

	return next;
}

let echartsPromise: Promise<EChartsBundle> | null = null;
function loadECharts(): Promise<EChartsBundle> {
	if (!echartsPromise) echartsPromise = import("./echarts-bundle.ts");
	return echartsPromise;
}

type ChartRecord = {
	instance: EChartsInstance;
	baseOption: Record<string, unknown>;
};

const charts = new Map<HTMLElement, ChartRecord>();

async function hydrateChart(el: HTMLElement) {
	const raw = el.getAttribute("data-echart");
	if (!raw) return;
	try {
		const baseOption = JSON.parse(raw) as Record<string, unknown>;
		el.removeAttribute("data-echart");

		const { init } = await loadECharts();
		const instance = init(el, null, { renderer: "canvas" });
		const themed = applyThemeToOption(baseOption, readThemeColors());
		instance.setOption(themed);
		charts.set(el, { instance, baseOption });
	} catch (error) {
		console.error("Failed to initialize ECharts chart", error);
	}
}

function retintAll() {
	const theme = readThemeColors();
	for (const [, record] of charts) {
		const themed = applyThemeToOption(record.baseOption, theme);
		try {
			record.instance.setOption(themed, { notMerge: true });
		} catch (error) {
			console.error("Failed to retint ECharts chart", error);
		}
	}
}

function resizeAll() {
	for (const [, record] of charts) record.instance.resize();
}

document.addEventListener("themechange", retintAll);
window.addEventListener("resize", resizeAll);

function init() {
	const nodes = document.querySelectorAll<HTMLElement>("[data-echart]");
	for (const el of nodes) void hydrateChart(el);
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
	init();
}

export type {};
