import { h, render } from "preact";
import { SearchResults } from "../components/preact/SearchResults";
import type { SearchItem } from "./search/types";

// Temporary diagnostics to trace search initialization in build/preview.
const DEBUG =
	(typeof window !== "undefined" &&
		(window as typeof window & { __searchDebug?: boolean }).__searchDebug) ??
	true;
const log = (...args: unknown[]) => {
	if (!DEBUG) return;
	// Use info to surface in most consoles without being noisy.
	console.info("[search]", ...args);
};

const SEARCH_INDEX_URL = "/api/search.json";
const MAX_RESULTS = 20;

type SearchState = {
	data?: SearchItem[];
	loadPromise?: Promise<SearchItem[]>;
	error?: string;
	cleanup?: (() => void) | null;
};

const getGlobalSearchState = () => {
	if (typeof window === "undefined") return undefined;
	log("getGlobalSearchState");
	return (window as typeof window & { __siteSearchState?: SearchState })
		.__siteSearchState;
};

const SEARCH_STATE: SearchState = getGlobalSearchState() ?? {};
if (typeof window !== "undefined") {
	log("hydrating SEARCH_STATE on window");
	(
		window as typeof window & {
			__siteSearchState?: SearchState;
		}
	).__siteSearchState = SEARCH_STATE;
}

async function fetchSearchIndex() {
	log("fetchSearchIndex start", SEARCH_INDEX_URL);
	// Skip caches so deploys pick up fresh search data.
	const response = await fetch(SEARCH_INDEX_URL, { cache: "no-store" });
	if (!response.ok) {
		throw new Error(`Search index responded with ${response.status}`);
	}
	const payload = (await response.json()) as SearchItem[];
	return Array.isArray(payload) ? payload : [];
}

function loadSearchData(): Promise<SearchItem[]> {
	if (SEARCH_STATE.data) {
		return Promise.resolve(SEARCH_STATE.data);
	}
	if (!SEARCH_STATE.loadPromise) {
		SEARCH_STATE.loadPromise = fetchSearchIndex()
			.then((items) => {
				SEARCH_STATE.data = items;
				SEARCH_STATE.error = undefined;
				return items;
			})
			.catch((error) => {
				console.error("[search] Failed to load search data", error);
				SEARCH_STATE.error = "Search data failed to load.";
				return [];
			})
			.finally(() => {
				SEARCH_STATE.loadPromise = undefined;
			});
	}
	return SEARCH_STATE.loadPromise;
}

function renderPlaceholder(
	container: HTMLElement,
	message: string,
	className = "search-modal__placeholder",
) {
	render(null, container);
	container.innerHTML = "";
	const wrapper = document.createElement("div");
	wrapper.className = className;
	wrapper.textContent = message;
	container.appendChild(wrapper);
}

function renderResults(container: HTMLElement, results: SearchItem[]) {
	// Clear any placeholder content before rendering fresh results.
	render(null, container);
	container.innerHTML = "";
	render(h(SearchResults, { results }), container);
}

let searchRequestId = 0;
let lastQuery = "";

async function performSearch(query: string) {
	const container = document.getElementById("search-results");
	if (!(container instanceof HTMLElement)) return;
	const trimmed = query.trim();
	const dataLoaded = Boolean(SEARCH_STATE.data);
	if (trimmed === lastQuery && dataLoaded) return;
	lastQuery = trimmed;
	if (!trimmed) {
		log("performSearch: empty query");
		renderPlaceholder(container, "Type to search the entire archive.");
		return;
	}

	const currentRequest = ++searchRequestId;
	const term = trimmed.toLowerCase();
	if (!SEARCH_STATE.data && !SEARCH_STATE.error) {
		renderPlaceholder(container, "Loading search index…");
	}

	const data = await loadSearchData();
	log("performSearch: data loaded", {
		request: currentRequest,
		total: data.length,
		error: SEARCH_STATE.error,
	});
	if (currentRequest !== searchRequestId) {
		return;
	}

	if (SEARCH_STATE.error) {
		renderPlaceholder(
			container,
			"Search data failed to load. Please try again later.",
			"search-modal__empty",
		);
		return;
	}

	const matches = data
		.filter((item) => item.searchText.includes(term))
		.sort((a, b) => b.timestamp - a.timestamp)
		.slice(0, MAX_RESULTS);

	if (!matches.length) {
		renderPlaceholder(container, "No matches found.", "search-modal__empty");
		return;
	}

	renderResults(container, matches);
}

function openSearch() {
	const modal = document.getElementById("search-modal");
	const input = document.getElementById(
		"search-input",
	) as HTMLInputElement | null;
	if (!(modal instanceof HTMLElement) || !input) return;
	modal.classList.add("is-visible");
	modal.removeAttribute("hidden");
	modal.setAttribute("aria-hidden", "false");
	document.body.classList.add("search-locked");
	void loadSearchData();
	requestAnimationFrame(() => {
		input.focus({ preventScroll: true });
		input.select();
	});
}

function closeSearch() {
	const modal = document.getElementById("search-modal");
	const input = document.getElementById(
		"search-input",
	) as HTMLInputElement | null;
	const container = document.getElementById("search-results");
	if (
		!(modal instanceof HTMLElement) ||
		!input ||
		!(container instanceof HTMLElement)
	) {
		return;
	}
	if (document.activeElement instanceof HTMLElement) {
		document.activeElement.blur();
	}
	input.blur();
	modal.classList.remove("is-visible");
	modal.setAttribute("hidden", "true");
	modal.setAttribute("aria-hidden", "true");
	document.body.classList.remove("search-locked");
	input.value = "";
	lastQuery = "";
	renderPlaceholder(container, "Type to search the entire archive.");
}

function setupSearch() {
	if (SEARCH_STATE.cleanup) {
		SEARCH_STATE.cleanup();
		SEARCH_STATE.cleanup = null;
	}

	const modal = document.getElementById("search-modal");
	if (modal instanceof HTMLElement && modal.parentElement !== document.body) {
		document.body.appendChild(modal);
	}

	const trigger = document.getElementById("search-trigger");
	const overlay = document.getElementById("search-overlay");
	const closeButton = document.getElementById("search-close");
	const input = document.getElementById(
		"search-input",
	) as HTMLInputElement | null;
	const results = document.getElementById("search-results");
	if (
		!(trigger instanceof HTMLElement) ||
		!(overlay instanceof HTMLElement) ||
		!(closeButton instanceof HTMLElement) ||
		!input ||
		!(results instanceof HTMLElement)
	) {
		log("setupSearch: missing elements", {
			trigger: Boolean(trigger),
			overlay: Boolean(overlay),
			closeButton: Boolean(closeButton),
			input: Boolean(input),
			results: Boolean(results),
		});
		return;
	}

	log("setupSearch: attaching listeners");
	void loadSearchData();

	let debounce: number | undefined;

	const inputHandler = (event: Event) => {
		const target = event.target as HTMLInputElement | null;
		const query = target?.value ?? "";
		if (debounce) clearTimeout(debounce);
		debounce = window.setTimeout(() => {
			void performSearch(query);
		}, 220);
	};

	const keyHandler = (event: KeyboardEvent) => {
		const target = event.target;
		const isInputTarget =
			target instanceof HTMLElement &&
			(target.tagName === "INPUT" || target.tagName === "TEXTAREA");

		if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
			event.preventDefault();
			openSearch();
		} else if (
			event.key === "/" &&
			!event.metaKey &&
			!event.ctrlKey &&
			!event.altKey &&
			!isInputTarget
		) {
			event.preventDefault();
			log("keyHandler: slash trigger");
			openSearch();
		} else if (event.key === "Escape") {
			const modalEl = document.getElementById("search-modal");
			if (modalEl?.classList.contains("is-visible")) {
				event.preventDefault();
				log("keyHandler: escape close");
				closeSearch();
			}
		}
	};

	const triggerHandler = () => openSearch();
	const overlayHandler = () => closeSearch();
	const closeHandler = () => closeSearch();
	const resultClickHandler = (event: Event) => {
		const target = event.target as HTMLElement | null;
		const link = target?.closest<HTMLAnchorElement>("a[href]");
		if (!link) return;
		closeSearch();
	};

	trigger.addEventListener("click", triggerHandler);
	overlay.addEventListener("click", overlayHandler);
	closeButton.addEventListener("click", closeHandler);
	input.addEventListener("input", inputHandler);
	results.addEventListener("click", resultClickHandler);
	document.addEventListener("keydown", keyHandler);

	SEARCH_STATE.cleanup = () => {
		log("cleanup listeners");
		trigger.removeEventListener("click", triggerHandler);
		overlay.removeEventListener("click", overlayHandler);
		closeButton.removeEventListener("click", closeHandler);
		input.removeEventListener("input", inputHandler);
		results.removeEventListener("click", resultClickHandler);
		document.removeEventListener("keydown", keyHandler);
	};
}

function init() {
	log("init run; cleanup exists?", Boolean(SEARCH_STATE.cleanup));
	setupSearch();
}

const enableSearch = () => {
	if (typeof document === "undefined") return;
	log("enableSearch", document.readyState);
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init, { once: true });
	} else {
		init();
	}
	document.addEventListener("astro:page-load", init);
};

if (typeof window !== "undefined" && typeof document !== "undefined") {
	log("search script executing in browser");
	enableSearch();
}
