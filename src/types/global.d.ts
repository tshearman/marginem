declare module "plotly.js-dist-min" {
	const Plotly: unknown;
	export default Plotly;
}

declare global {
	interface Window {
		__siteSearchState?: Record<string, unknown>;
	}
}

export type {};
