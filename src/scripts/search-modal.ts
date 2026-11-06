import type { SearchItem } from "./search/types";

const SEARCH_INDEX_URL = "/api/search.json";
const MAX_RESULTS = 20;
const PROMPT = "Type to search the entire archive.";

// The index is fetched on first use (opening the modal or typing) and kept
// for the page's lifetime, newest first. A failed fetch resolves to null and
// is retried on the next search.
let index: SearchItem[] | undefined;
let loading: Promise<SearchItem[] | null> | undefined;

function loadIndex(): Promise<SearchItem[] | null> {
	if (index) return Promise.resolve(index);
	// `no-cache` revalidates on every load, so a deploy is picked up at once.
	loading ??= fetch(SEARCH_INDEX_URL, { cache: "no-cache" })
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Search index responded with ${response.status}`);
			}
			return response.json();
		})
		.then((items: SearchItem[]) => {
			index = Array.isArray(items)
				? items.sort((a, b) => b.timestamp - a.timestamp)
				: [];
			return index;
		})
		.catch((error) => {
			console.error("[search] Failed to load search data", error);
			return null;
		})
		.finally(() => {
			loading = undefined;
		});
	return loading;
}

function setupSearch() {
	const modal = document.getElementById("search-modal");
	const trigger = document.getElementById("search-trigger");
	const overlay = document.getElementById("search-overlay");
	const closeButton = document.getElementById("search-close");
	const input = document.getElementById("search-input");
	const results = document.getElementById("search-results");
	if (
		!modal ||
		!trigger ||
		!overlay ||
		!closeButton ||
		!(input instanceof HTMLInputElement) ||
		!results
	) {
		return;
	}

	// Portal to <body> so no ancestor's stacking context can trap the overlay.
	document.body.appendChild(modal);

	let requestId = 0;
	let lastQuery = "";
	let debounce: number | undefined;

	const renderMessage = (
		message: string,
		className = "search-modal__placeholder",
	) => {
		const div = document.createElement("div");
		div.className = className;
		div.textContent = message;
		results.replaceChildren(div);
	};

	const search = async (query: string) => {
		const term = query.trim().toLowerCase();
		if (term === lastQuery && index) return;
		lastQuery = term;
		// Bumped on every call so a slower, older search can't overwrite this one.
		const id = ++requestId;
		if (!term) return renderMessage(PROMPT);

		if (!index) renderMessage("Loading search index…");
		const data = await loadIndex();
		if (id !== requestId) return;
		if (!data) {
			return renderMessage(
				"Search data failed to load. Please try again later.",
				"search-modal__empty",
			);
		}

		const matches = data
			.filter((item) => item.searchText.includes(term))
			.slice(0, MAX_RESULTS);
		if (!matches.length) {
			return renderMessage("No matches found.", "search-modal__empty");
		}
		// item.html is trusted markup prerendered server-side by /api/search.json.
		results.innerHTML = matches.map((item) => item.html).join("");
	};

	const open = () => {
		modal.hidden = false;
		document.body.classList.add("search-locked");
		void loadIndex();
		// Focus synchronously: iOS only raises the keyboard inside the gesture.
		input.focus({ preventScroll: true });
		input.select();
	};

	const close = () => {
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur();
		}
		modal.hidden = true;
		document.body.classList.remove("search-locked");
		// Invalidate any in-flight search so it can't repaint stale results.
		requestId++;
		input.value = "";
		lastQuery = "";
		renderMessage(PROMPT);
	};

	trigger.addEventListener("click", open);
	overlay.addEventListener("click", close);
	closeButton.addEventListener("click", close);
	input.addEventListener("input", () => {
		clearTimeout(debounce);
		debounce = window.setTimeout(() => void search(input.value), 220);
	});
	results.addEventListener("click", (event) => {
		if ((event.target as Element | null)?.closest("a[href]")) close();
	});
	document.addEventListener("keydown", (event) => {
		const target = event.target;
		const typing =
			target instanceof HTMLElement &&
			(target.tagName === "INPUT" || target.tagName === "TEXTAREA");
		if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
			event.preventDefault();
			open();
		} else if (
			event.key === "/" &&
			!event.metaKey &&
			!event.ctrlKey &&
			!event.altKey &&
			!typing
		) {
			event.preventDefault();
			open();
		} else if (event.key === "Escape" && !modal.hidden) {
			event.preventDefault();
			close();
		}
	});
}

// Module scripts run after the document is parsed, so the DOM is ready.
setupSearch();
