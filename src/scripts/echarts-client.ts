/*
 * ECharts hydrator.
 *
 * Walks every `[data-echart]` element on the page, parses its JSON `option`
 * payload, applies the requested theme (see chart-themes.ts) using live CSS
 * custom property values, and dynamic-imports the ECharts bundle to call
 * `init` + `setOption`. Tracks each instance so the masthead's `themechange`
 * event can re-tint without rebuilding the chart, and re-sizes on window
 * resize.
 *
 * The ECharts bundle itself is lazy-loaded so the ~540 KB chart code only
 * downloads on pages that actually contain a chart.
 */

import { applyTheme, type ThemeColors } from "./chart-themes.ts";

type EChartsBundle = typeof import("./echarts-bundle.ts");
type EChartsInstance = ReturnType<EChartsBundle["init"]>;

// Fallback only — at runtime we read --font-ia-writer from CSS, which Astro's
// Fonts API populates with the hashed family name + fallback stack. The plain
// string "iA Writer Duo" isn't a registered family in the browser; the canvas
// renderer needs the hashed name to find the loaded face.
const FONT_FALLBACK = '"Courier New", Courier, monospace';
const FONT_SIZE = 12;

function readThemeColors(): ThemeColors {
	const s = getComputedStyle(document.documentElement);
	const cssVar = (name: string, fallback: string) =>
		s.getPropertyValue(name).trim() || fallback;
	const ink = cssVar("--ink", "#000");
	const paper = cssVar("--paper", "#fff");
	const isDark = document.documentElement.dataset.theme === "dark";
	return {
		ink,
		paper,
		highlight: cssVar("--highlight", isDark ? "#ff2d8a" : "#ffe600"),
		accent: cssVar("--accent", "#0ea5e9"),
		accent2: cssVar("--accent-2", "#10b981"),
		accent3: cssVar("--accent-3", "#84cc16"),
		grid: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)",
		font: {
			family: cssVar("--font-ia-writer", FONT_FALLBACK),
			size: FONT_SIZE,
		},
	};
}

let echartsPromise: Promise<EChartsBundle> | null = null;
function loadECharts(): Promise<EChartsBundle> {
	if (!echartsPromise) echartsPromise = import("./echarts-bundle.ts");
	return echartsPromise;
}

type ChartRecord = {
	instance: EChartsInstance;
	baseOption: Record<string, unknown>;
	themeName: string;
};

const charts = new Map<HTMLElement, ChartRecord>();

async function hydrateChart(el: HTMLElement) {
	const raw = el.getAttribute("data-echart");
	if (!raw) return;
	const themeName = el.getAttribute("data-echart-theme") ?? "default";
	try {
		const baseOption = JSON.parse(raw) as Record<string, unknown>;
		el.removeAttribute("data-echart");

		const { init } = await loadECharts();
		const instance = init(el, null, { renderer: "canvas" });
		instance.setOption(applyTheme(baseOption, themeName, readThemeColors()));
		charts.set(el, { instance, baseOption, themeName });
	} catch (error) {
		console.error("Failed to initialize ECharts chart", error);
	}
}

function retintAll() {
	const colors = readThemeColors();
	for (const [, record] of charts) {
		try {
			record.instance.setOption(
				applyTheme(record.baseOption, record.themeName, colors),
				{ notMerge: true },
			);
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
