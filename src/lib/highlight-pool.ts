/*
 * Shared highlight pool — used by both light and dark mode.
 *
 *   1. The inline bootstrap in HtmlHead.astro picks one entry per page
 *      load and pins it as --highlight / --highlight-fg on :root. The
 *      banner reads the pinned color once and stays that color until
 *      the next page load.
 *   2. highlight-hover.ts re-rolls per hover/focus by writing inline
 *      style onto the hovered element — every hover flashes a different
 *      accent without disturbing the banner.
 *
 * Each entry pairs a vivid highlight with a near-black `fg` chosen so
 * text painted on a highlight background stays readable in either theme.
 */
export interface HighlightEntry {
	highlight: string;
	fg: string;
}

export const HIGHLIGHT_POOL: readonly HighlightEntry[] = [
	{ highlight: "#ff2d8a", fg: "#0a0a0a" }, // neon pink
	{ highlight: "#ffe600", fg: "#0a0a0a" }, // lemon (light-mode brand yellow)
	// { highlight: "#ff6a00", fg: "#160a00" }, // tangerine
	{ highlight: "#84cc16", fg: "#0a1500" }, // lime
	// { highlight: "#00d4e6", fg: "#001518" }, // cyan
	// { highlight: "#b347e8", fg: "#15071c" }, // plum
	{ highlight: "#1ee0c8", fg: "#02201c" }, // tide
];
