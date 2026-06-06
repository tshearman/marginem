/*
 * ECharts visual themes. Each theme is a self-contained `option`-transform
 * that paints series + axes against the site's design tokens. The base theme
 * (font, axis ink, paper bg) is applied first; chart-aesthetic themes layer
 * on top.
 *
 * Add a theme by adding a key to `THEMES`. Use it from MDX via
 * `<EChart theme="newsprint" option={...} />`. Themes assume the chart payload
 * supplies only structure (names, types, data, yAxisIndex, smooth) — NOT
 * colors or styles. Anything the payload sets wins, so authors can override
 * per-chart by re-introducing itemStyle/lineStyle/etc.
 */

export type ThemeColors = {
	ink: string;
	paper: string;
	highlight: string;
	accent: string;
	accent2: string;
	accent3: string;
	grid: string;
	font: { family: string; size: number };
};

type Option = Record<string, unknown>;
type Series = Record<string, unknown>;

const mapSeries = (
	opt: Option,
	fn: (s: Series, i: number) => Series,
): Option => {
	if (!Array.isArray(opt.series)) return opt;
	return { ...opt, series: opt.series.map((s, i) => fn(s as Series, i)) };
};

const styleAxis = (
	axis: unknown,
	axisColor: string,
	gridColor: string,
	fontFamily: string,
): Record<string, unknown> => {
	const a =
		typeof axis === "object" && axis !== null
			? { ...(axis as Record<string, unknown>) }
			: {};
	a.axisLabel = {
		color: axisColor,
		fontFamily,
		...(a.axisLabel as object | undefined),
	};
	a.axisLine = {
		...(a.axisLine as object | undefined),
		lineStyle: { color: axisColor, width: 2 },
	};
	a.axisTick = {
		...(a.axisTick as object | undefined),
		lineStyle: { color: axisColor },
	};
	a.splitLine = {
		...(a.splitLine as object | undefined),
		lineStyle: { color: gridColor, width: 1 },
	};
	a.nameTextStyle = {
		color: axisColor,
		fontFamily,
		...(a.nameTextStyle as object | undefined),
	};
	return a;
};

const restyleAxes = (
	opt: Option,
	axisColor: string,
	gridColor: string,
	fontFamily: string,
): Option => {
	const next = { ...opt };
	for (const key of ["xAxis", "yAxis"] as const) {
		const val = next[key];
		if (Array.isArray(val))
			next[key] = val.map((a) =>
				styleAxis(a, axisColor, gridColor, fontFamily),
			);
		else if (val !== undefined)
			next[key] = styleAxis(val, axisColor, gridColor, fontFamily);
	}
	return next;
};

/** Always-applied base: font, paper background, default ink axes.
 *
 *  ECharts' title/legend/tooltip components each have their own `textStyle`
 *  defaults (e.g. title is `fontFamily: "sans-serif"`, `fontWeight: "bold"`)
 *  that do NOT inherit from the global `option.textStyle`. To keep every label
 *  in iA Writer Duo we have to inject `fontFamily` into each component.
 */
export function applyBaseTheme(option: Option, c: ThemeColors): Option {
	const family = c.font.family;
	const next = restyleAxes(option, c.ink, c.grid, family);
	next.backgroundColor = c.paper;
	next.textStyle = {
		fontFamily: family,
		fontSize: c.font.size,
		color: c.ink,
		...(next.textStyle as object | undefined),
	};

	const titleIn = (next.title ?? {}) as Record<string, unknown>;
	next.title = {
		...titleIn,
		textStyle: {
			fontFamily: family,
			fontWeight: 700,
			color: c.ink,
			...(titleIn.textStyle as object | undefined),
		},
		subtextStyle: {
			fontFamily: family,
			color: c.ink,
			...(titleIn.subtextStyle as object | undefined),
		},
	};

	const legendIn = (next.legend ?? {}) as Record<string, unknown>;
	next.legend = {
		...legendIn,
		textStyle: {
			fontFamily: family,
			color: c.ink,
			...(legendIn.textStyle as object | undefined),
		},
	};

	// Tooltip: ECharts defaults to a hard-coded white background regardless of
	// theme, so light-mode ink-on-white works but dark-mode ink-on-white is
	// unreadable. Pin it to the chart's paper/ink pair so it tracks dark/light.
	// `extraCssText` adds a hard offset shadow in the site's brutalist style —
	// the same `--paper-shadow` (= --highlight) idiom used on the banner / cards.
	const tooltipIn = (next.tooltip ?? {}) as Record<string, unknown>;
	next.tooltip = {
		backgroundColor: c.paper,
		borderColor: c.ink,
		borderWidth: 1,
		borderRadius: 0,
		extraCssText: `box-shadow: 4px 4px 0 ${c.highlight};`,
		...tooltipIn,
		textStyle: {
			fontFamily: family,
			color: c.ink,
			...(tooltipIn.textStyle as object | undefined),
		},
	};

	return next;
}

export type ChartTheme = (option: Option, c: ThemeColors) => Option;

/**
 * THEMES
 * Each takes the base-themed option and adds its own series + axis treatment.
 * Series indexing assumes the playground chart: 0=bar, 1=primary line, 2=secondary line.
 */
export const THEMES: Record<string, ChartTheme> = {
	// --- Default: keep base theme; series use ECharts' palette / payload colors.
	default: (opt) => opt,

	// --- Newsprint: pure monochrome. Differentiation by dash/marker, not color.
	newsprint: (opt, c) => {
		const out = mapSeries(opt, (s, i) => {
			if (s.type === "bar") {
				return {
					...s,
					itemStyle: {
						color: c.ink,
						borderWidth: 0,
						// Diagonal hatch — thin paper-colored lines layered over
						// the ink fill, evoking newsprint engraving / risograph
						// flood-fill. dashArrayY = [line_px, gap_px]; rotation
						// is in radians (-π/4 = top-right → bottom-left).
						decal: {
							color: c.paper,
							dashArrayX: [1, 0],
							dashArrayY: [1, 8],
							rotation: -Math.PI / 4,
						},
					},
					opacity: 1,
					barGap: "10%",
				};
			}
			if (s.type === "line") {
				// Solid lines take the highlight color; dashed stay ink. Keeps
				// the newsprint discipline (ink + one accent) while letting the
				// primary line pop the way the dashed/dotted reference lines
				// shouldn't.
				const solid = i === 1;
				const lineColor = solid ? c.highlight : c.ink;
				return {
					...s,
					lineStyle: {
						color: lineColor,
						width: 2.5,
						type: solid ? "solid" : "dashed",
					},
					itemStyle: { color: lineColor },
					symbol: solid ? "circle" : "none",
					showSymbol: solid,
					symbolSize: 8,
					areaStyle: undefined,
				};
			}
			return s;
		});
		// Disable split lines for a cleaner newsprint look.
		const axed = restyleAxes(out, c.ink, "transparent", c.font.family);

		// Paper-backed legend with a thin ink border — reads like a newspaper
		// "key" box, and guarantees the text stays legible no matter how tall
		// the bars get. Defaults spread first so any caller-supplied legend
		// fields (orient, position, textStyle) still win.
		const legendIn = (axed.legend ?? {}) as Record<string, unknown>;
		axed.legend = {
			backgroundColor: c.paper,
			borderColor: c.ink,
			borderWidth: 1,
			padding: [6, 10],
			...legendIn,
		};

		return axed;
	},
};

export function applyTheme(
	option: Option,
	themeName: string,
	colors: ThemeColors,
): Option {
	const base = applyBaseTheme(option, colors);
	const fn = THEMES[themeName] ?? THEMES.default;
	return fn(base, colors);
}
