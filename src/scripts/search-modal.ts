import { formatDate, formatDateLabelHtml } from "../lib/date";

const SEARCH_INDEX_URL = "/api/search.json";
const MAX_RESULTS = 20;

type SearchItem = {
	id: string;
	title: string;
	snippet: string;
	tags?: string[];
	pubDate?: string;
	displayDate?: string;
	url: string;
	kind: "post" | "note" | "garden";
	author?: string;
	source?: string;
	searchText: string;
	timestamp: number;
};

type SearchState = {
	data?: SearchItem[];
	loadPromise?: Promise<SearchItem[]>;
	error?: string;
	cleanup?: (() => void) | null;
};

const SEARCH_STATE: SearchState =
	(window.__siteSearchState as SearchState | undefined) ?? {};
window.__siteSearchState = SEARCH_STATE;

async function fetchSearchIndex() {
	const response = await fetch(SEARCH_INDEX_URL, { cache: "force-cache" });
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
	container.innerHTML = "";
	const wrapper = document.createElement("div");
	wrapper.className = className;
	wrapper.textContent = message;
	container.appendChild(wrapper);
}

type TagVariant = "default" | "filter" | "display";
type TagSize = "small" | "medium" | "large" | "";

function createTag(
	label: string,
	variant: TagVariant = "default",
	size: TagSize = "",
) {
	const chip = document.createElement("span");
	const classes = ["tag"];
	if (size && size !== "medium") {
		classes.push(`tag--${size}`);
	}
	if (variant !== "default") {
		classes.push(`tag--${variant}`);
	}
	chip.className = classes.filter(Boolean).join(" ");
	chip.textContent = `#${label}`;
	chip.setAttribute("data-tag", label);
	return chip;
}

function renderPostResult(item: SearchItem) {
	const article = document.createElement("article");
	article.className = "post-preview";

	const body = document.createElement("div");
	body.className = "post-preview__body";

	const title = document.createElement("h3");
	title.className = "post-preview__title";
	const link = document.createElement("a");
	link.href = item.url;
	link.className = "post-preview__link";
	link.textContent = item.title;
	title.appendChild(link);
	body.appendChild(title);

	const authors = document.createElement("div");
	authors.className = "post-preview__authors";
	if (item.displayDate || item.pubDate) {
		const label = item.pubDate
			? formatDate(item.pubDate)
			: item.displayDate ?? "";
		const time = document.createElement("time");
		time.dateTime = item.pubDate ?? "";
		time.className = "date-stamp";
		time.innerHTML = formatDateLabelHtml(label);
		authors.appendChild(time);
	}
	const kind = document.createElement("span");
	kind.className = "search-kind";
	kind.textContent = "Writing";
	authors.appendChild(kind);
	body.appendChild(authors);

	const section = document.createElement("div");
	section.className = "post-preview__section";
	const excerpt = document.createElement("p");
	excerpt.className = "post-preview__excerpt";
	if (item.snippet) {
		excerpt.textContent = item.snippet;
		excerpt.hidden = false;
	} else {
		excerpt.hidden = true;
	}
	section.appendChild(excerpt);
	body.appendChild(section);

	const meta = document.createElement("div");
	meta.className = "post-preview__meta";
	if (item.tags?.length) {
		for (const tag of item.tags) {
			if (!tag) continue;
			meta.appendChild(createTag(tag));
		}
	} else {
		const placeholder = document.createElement("span");
		placeholder.className = "post-preview__meta-empty";
		placeholder.textContent = "Research Notes";
		meta.appendChild(placeholder);
	}
	body.appendChild(meta);

	article.appendChild(body);
	return article;
}

function renderNoteResult(item: SearchItem) {
	const link = document.createElement("a");
	link.className = "note-card note-card--interactive";
	link.href = item.url;

	const wrapper = document.createElement("div");
	wrapper.className = "note-content-wrapper";

	const content = document.createElement("div");
	content.className = "note-content";

	const blockquote = document.createElement("blockquote");
	blockquote.className = "note-text";
	blockquote.textContent = item.snippet || item.title || "";
	content.appendChild(blockquote);

	const attribution = document.createElement("div");
	attribution.className = "note-attribution";
	if (item.author) {
		const author = document.createElement("div");
		author.className = "note-author";
		author.textContent = item.author;
		attribution.appendChild(author);
	}
	if (item.source) {
		const source = document.createElement("div");
		source.className = "note-source";
		source.textContent = item.source;
		attribution.appendChild(source);
	}
	if (item.displayDate || item.pubDate) {
		const label = item.pubDate
			? formatDate(item.pubDate)
			: item.displayDate ?? "";
		const time = document.createElement("time");
		time.className = "date-stamp note-date";
		time.innerHTML = formatDateLabelHtml(label);
		if (item.pubDate) {
			time.dateTime = item.pubDate;
		}
		attribution.appendChild(time);
	}
	const kind = document.createElement("span");
	kind.className = "search-kind";
	kind.textContent = "Note";
	attribution.appendChild(kind);
	content.appendChild(attribution);
	wrapper.appendChild(content);

	if (item.tags?.length) {
		const tagList = document.createElement("div");
		tagList.className = "note-tags";
		for (const tag of item.tags) {
			if (!tag) continue;
			tagList.appendChild(createTag(tag, "filter", "small"));
		}
		wrapper.appendChild(tagList);
	}

	link.appendChild(wrapper);
	return link;
}

function renderGardenResult(item: SearchItem) {
	const link = document.createElement("a");
	link.className = "garden-search";
	link.href = item.url;

	const header = document.createElement("div");
	header.className = "garden-search__header";

	const title = document.createElement("h3");
	title.className = "garden-search__title";
	title.textContent = item.title;
	header.appendChild(title);

	if (item.displayDate || item.pubDate) {
		const label = item.pubDate
			? formatDate(item.pubDate)
			: item.displayDate ?? "";
		const time = document.createElement("time");
		time.className = "date-stamp garden-search__date";
		time.dateTime = item.pubDate ?? "";
		time.innerHTML = formatDateLabelHtml(label);
		header.appendChild(time);
	}
	const kind = document.createElement("span");
	kind.className = "search-kind";
	kind.textContent = "Garden";
	header.appendChild(kind);

	link.appendChild(header);

	if (item.snippet) {
		const excerpt = document.createElement("p");
		excerpt.className = "garden-search__excerpt";
		excerpt.textContent = item.snippet;
		link.appendChild(excerpt);
	}

	return link;
}

function renderResults(container: HTMLElement, results: SearchItem[]) {
	container.innerHTML = "";
	const fragment = document.createDocumentFragment();
	for (const item of results) {
		const node =
			item.kind === "note"
				? renderNoteResult(item)
				: item.kind === "garden"
					? renderGardenResult(item)
					: renderPostResult(item);
		fragment.appendChild(node);
	}
	container.appendChild(fragment);
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
		renderPlaceholder(container, "Type to search the entire archive.");
		return;
	}

	const currentRequest = ++searchRequestId;
	const term = trimmed.toLowerCase();
	if (!SEARCH_STATE.data && !SEARCH_STATE.error) {
		renderPlaceholder(container, "Loading search index…");
	}

	const data = await loadSearchData();
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
		return;
	}

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
		trigger.removeEventListener("click", triggerHandler);
		overlay.removeEventListener("click", overlayHandler);
		closeButton.removeEventListener("click", closeHandler);
		input.removeEventListener("input", inputHandler);
		results.removeEventListener("click", resultClickHandler);
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
