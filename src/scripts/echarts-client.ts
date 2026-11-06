/*
 * ECharts hydrator for EChart.astro. Renders every `[data-echart]` element
 * from its JSON `option`, themed from the site's CSS custom properties (see
 * chart-themes.ts), and re-tints on the `themechange` event. The ECharts
 * bundle is dynamic-imported so its download doesn't hold up the page.
 */

import { applyTheme, type ThemeColors } from "./chart-themes.ts";

type EChartsInstance = ReturnType<typeof import("./echarts-bundle.ts")["init"]>;

// Fallback only: --font-ia-writer (from Astro's Fonts API) holds the hashed
// family name the canvas renderer needs to find the loaded face.
const FONT_FALLBACK = '"Courier New", Courier, monospace';

function readThemeColors(): ThemeColors {
	const style = getComputedStyle(document.documentElement);
	const cssVar = (name: string) => style.getPropertyValue(name).trim();
	const isDark = document.documentElement.dataset.theme === "dark";
	return {
		ink: cssVar("--ink"),
		paper: cssVar("--paper"),
		highlight: cssVar("--highlight"),
		grid: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)",
		font: { family: cssVar("--font-ia-writer") || FONT_FALLBACK, size: 12 },
	};
}

const charts: Array<{
	instance: EChartsInstance;
	option: Record<string, unknown>;
	theme: string;
}> = [];

async function init() {
	const els = document.querySelectorAll<HTMLElement>("[data-echart]");
	if (!els.length) return;
	const { init: initChart } = await import("./echarts-bundle.ts");
	const colors = readThemeColors();
	for (const el of els) {
		try {
			const option = JSON.parse(el.dataset.echart ?? "{}");
			const theme = el.dataset.echartTheme ?? "default";
			const instance = initChart(el);
			instance.setOption(applyTheme(option, theme, colors));
			charts.push({ instance, option, theme });
		} catch (error) {
			console.error("Failed to initialize ECharts chart", error);
		}
	}
}

document.addEventListener("themechange", () => {
	const colors = readThemeColors();
	for (const { instance, option, theme } of charts) {
		instance.setOption(applyTheme(option, theme, colors), { notMerge: true });
	}
});
window.addEventListener("resize", () => {
	for (const { instance } of charts) instance.resize();
});

void init();
