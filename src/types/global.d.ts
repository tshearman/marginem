declare module "plotly.js/lib/core" {
	const Plotly: {
		register: (modules: unknown[]) => void;
		newPlot: (...args: unknown[]) => unknown;
	};
	export default Plotly;
}

declare module "plotly.js/lib/bar" {
	const bar: unknown;
	export default bar;
}

declare module "plotly.js/lib/scatter" {
	const scatter: unknown;
	export default scatter;
}

declare global {
	interface Window {
		__siteSearchState?: Record<string, unknown>;
	}
}

export type {};
