type SearchItem = {
	id: string;
	title: string;
	description?: string;
	abstract?: string;
	content?: string;
	tags?: string[];
	pubDate?: string;
	displayDate?: string;
	url?: string;
	kind?: "post" | "note";
	author?: string;
	source?: string;
};

type SearchState = {
	data?: SearchItem[];
	cardMap?: Map<string, HTMLElement>;
	cleanup?: (() => void) | null;
};

const SEARCH_STATE: SearchState =
	(window.__siteSearchState as SearchState | undefined) ?? {};
window.__siteSearchState = SEARCH_STATE;

function loadSearchData(): SearchItem[] {
	if (SEARCH_STATE.data) {
		return SEARCH_STATE.data;
	}
	const el = document.getElementById("search-data");
	if (!el) return [];
	const raw = el.getAttribute("data-search-data");
	if (!raw) return [];
	try {
		const parsed = JSON.parse(raw) as SearchItem[];
		SEARCH_STATE.data = Array.isArray(parsed) ? parsed : [];
	} catch (error) {
		console.error("[search] Failed to parse search data", error);
		SEARCH_STATE.data = [];
	}
	return SEARCH_STATE.data;
}

function formatDate(value?: string) {
	if (!value) return "";
	try {
		return new Intl.DateTimeFormat("en", {
			month: "short",
			day: "numeric",
			year: "numeric",
		}).format(new Date(value));
	} catch {
		return value;
	}
}

function ellipsize(text: string, limit = 220) {
	if (!text) return "";
	const normalized = text.replace(/\s+/g, " ").trim();
	if (!normalized) return "";
	const truncated =
		normalized.length > limit ? normalized.slice(0, limit) : normalized;
	return `${truncated.replace(/[\s.,;:!-]+$/g, "")}…`;
}

function getSnippet(item: SearchItem) {
	if (item.abstract) return ellipsize(item.abstract);
	if (item.description) return ellipsize(item.description);
	if (item.content) {
		const sanitized = item.content
			.replace(/[#>*_`[\]\\]/g, " ")
			.replace(/\s+/g, " ");
		return ellipsize(sanitized);
	}
	return "";
}

function renderPlaceholder(
	container: HTMLElement,
	message: string,
	className = "search-modal__placeholder",
) {
	container.innerHTML = "";
	const wrapper = document.createElement("div");
	wrapper.className = className;
	wrapper.textContent = message;
	container.appendChild(wrapper);
}

function ensureCardStore() {
	if (SEARCH_STATE.cardMap) return;
	const store = document.getElementById("search-result-store");
	const map = new Map<string, HTMLElement>();
	if (store) {
		for (const node of store.querySelectorAll<HTMLElement>(
			"[data-search-id]",
		)) {
			const id = node.getAttribute("data-search-id");
			if (id) map.set(id, node);
		}
	}
	SEARCH_STATE.cardMap = map;
}

function cloneCard(id: string) {
	ensureCardStore();
	const source = SEARCH_STATE.cardMap?.get(id);
	if (!source) return null;
	return source.cloneNode(true) as HTMLElement;
}

function hydrateCard(node: HTMLElement | null, item: SearchItem) {
	if (!node) return null;
	const meta = node.querySelector<HTMLElement>(".post-preview__meta");
	if (meta) {
		if (item.pubDate) {
			meta.setAttribute("datetime", item.pubDate);
		} else {
			meta.removeAttribute("datetime");
		}
		const defaultDisplay = meta.getAttribute("data-default-display") || "";
		const displayText = defaultDisplay || formatDate(item.pubDate);
		meta.textContent = displayText;
		meta.style.fontStyle = "italic";
	}
	const excerpt = node.querySelector<HTMLElement>(".post-preview__excerpt");
	if (excerpt) {
		const defaultSnippet = excerpt.getAttribute("data-default-excerpt") || "";
		const snippet = getSnippet(item) || defaultSnippet;
		if (snippet) {
			excerpt.textContent = snippet;
			excerpt.hidden = false;
		} else {
			excerpt.textContent = "";
			excerpt.hidden = true;
		}
	}
	return node;
}

function renderResults(container: HTMLElement, results: SearchItem[]) {
	container.innerHTML = "";
	const fragment = document.createDocumentFragment();
	for (const item of results) {
		const card = hydrateCard(cloneCard(item.id), item);
		if (card) {
			fragment.appendChild(card);
		}
	}
	container.appendChild(fragment);
}

function activateNoteCard(card: HTMLElement) {
	const url = card.getAttribute("data-search-url");
	if (!url) return;
	closeSearch();
	window.location.href = url;
}

function ensureNoteCardDelegation(container: HTMLElement) {
	if (container.dataset.noteDelegation === "true") {
		return;
	}

	const clickHandler = (event: Event) => {
		const target = event.target as HTMLElement | null;
		const card = target?.closest<HTMLElement>(".note-card[data-search-url]");
		if (!card) return;
		event.preventDefault();
		activateNoteCard(card);
	};

	const keyHandler = (event: Event) => {
		if (!(event instanceof KeyboardEvent)) return;
		if (event.key !== "Enter" && event.key !== " ") return;
		const target = event.target as HTMLElement | null;
		const card = target?.closest<HTMLElement>(".note-card[data-search-url]");
		if (!card) return;
		event.preventDefault();
		activateNoteCard(card);
	};

	container.addEventListener("click", clickHandler);
	container.addEventListener("keydown", keyHandler);
	container.dataset.noteDelegation = "true";
}

function performSearch(query: string) {
	const container = document.getElementById("search-results");
	if (!(container instanceof HTMLElement)) return;
	if (!query.trim()) {
		renderPlaceholder(container, "Type to search the entire archive.");
		return;
	}

	const data = loadSearchData();
	if (!data.length) {
		renderPlaceholder(container, "Search data is still loading…");
		return;
	}

	const term = query.toLowerCase();
	const matches = data
		.filter((item) => {
			const haystacks = [
				item.title,
				item.description,
				item.content,
				...(item.tags || []),
			]
				.filter(Boolean)
				.map((value) => String(value).toLowerCase());
			return haystacks.some((haystack) => haystack.includes(term));
		})
		.sort((a, b) => {
			const aDate = a.pubDate ? new Date(a.pubDate).getTime() : 0;
			const bDate = b.pubDate ? new Date(b.pubDate).getTime() : 0;
			return bDate - aDate;
		});

	if (!matches.length) {
		renderPlaceholder(container, "No matches found.", "search-modal__empty");
		return;
	}

	renderResults(container, matches.slice(0, 20));
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
	loadSearchData();
	requestAnimationFrame(() => {
		input.focus();
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
	modal.classList.remove("is-visible");
	modal.setAttribute("hidden", "true");
	modal.setAttribute("aria-hidden", "true");
	document.body.classList.remove("search-locked");
	input.value = "";
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
		return;
	}

	ensureNoteCardDelegation(results);
	loadSearchData();
	ensureCardStore();

	let debounce: number | undefined;

	const inputHandler = (event: Event) => {
		const target = event.target as HTMLInputElement | null;
		const query = target?.value ?? "";
		if (debounce) clearTimeout(debounce);
		debounce = window.setTimeout(() => performSearch(query), 220);
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
			openSearch();
		} else if (event.key === "Escape") {
			const modalEl = document.getElementById("search-modal");
			if (modalEl?.classList.contains("is-visible")) {
				event.preventDefault();
				closeSearch();
			}
		}
	};

	const triggerHandler = () => openSearch();
	const overlayHandler = () => closeSearch();
	const closeHandler = () => closeSearch();

	trigger.addEventListener("click", triggerHandler);
	overlay.addEventListener("click", overlayHandler);
	closeButton.addEventListener("click", closeHandler);
	input.addEventListener("input", inputHandler);
	document.addEventListener("keydown", keyHandler);

	SEARCH_STATE.cleanup = () => {
		trigger.removeEventListener("click", triggerHandler);
		overlay.removeEventListener("click", overlayHandler);
		closeButton.removeEventListener("click", closeHandler);
		input.removeEventListener("input", inputHandler);
		document.removeEventListener("keydown", keyHandler);
	};
}

function init() {
	setupSearch();
	const shortcut = document.querySelector<HTMLElement>(".nav-search__shortcut");
	if (shortcut) {
		const platform = navigator.userAgent.toLowerCase();
		const isMac = platform.includes("mac");
		shortcut.textContent = isMac ? "⌘K" : "Ctrl+K";
	}
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
	init();
}

document.addEventListener("astro:page-load", init);
