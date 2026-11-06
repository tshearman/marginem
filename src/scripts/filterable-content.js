// Tag/category filtering for list pages. Each `[data-filter-config]` container
// holds filter buttons (`data-tag` / `data-category`) and items carrying JSON
// `data-tags` / `data-categories`. An item shows when it has any selected tag
// and any selected category (an empty selection matches everything).
// Right-clicking a filter button clears every filter.

const DEFAULTS = {
	filterSelector: ".tag--filter", // tag buttons in the filter panel
	categoryFilterSelector: null, // category buttons (optional)
	itemSelector: ".filterable-item", // elements to show/hide
	itemTagSelector: ".tag--display", // tag buttons inside items; also toggle
	groupSelector: null, // wrappers hidden once all their items are
	countId: null, // element for the "Showing N of M" text
	hintId: null, // element shown only while filters are active
	countLabel: "items",
};

const parseList = (json) => {
	try {
		const list = JSON.parse(json || "[]");
		return Array.isArray(list) ? list : [];
	} catch {
		return [];
	}
};

function initContainer(node) {
	const config = { ...DEFAULTS, ...JSON.parse(node.dataset.filterConfig) };
	const items = [...node.querySelectorAll(config.itemSelector)].map((el) => ({
		el,
		tags: parseList(el.dataset.tags),
		categories: parseList(el.dataset.categories),
	}));
	if (!items.length) return;

	const tagButtons = [
		...node.querySelectorAll(config.filterSelector),
		...node.querySelectorAll(config.itemTagSelector),
	];
	const categoryButtons = config.categoryFilterSelector
		? [...node.querySelectorAll(config.categoryFilterSelector)]
		: [];
	const groups = config.groupSelector
		? node.querySelectorAll(config.groupSelector)
		: [];
	const countEl = config.countId && document.getElementById(config.countId);
	const hintEl = config.hintId && document.getElementById(config.hintId);
	const selectedTags = new Set();
	const selectedCategories = new Set();

	const matches = (values, selected) =>
		selected.size === 0 || values.some((value) => selected.has(value));

	const syncButtons = (buttons, selected, key) => {
		for (const button of buttons) {
			const pressed = String(selected.has(button.dataset[key]));
			button.dataset.selected = pressed;
			button.setAttribute("aria-pressed", pressed);
		}
	};

	const apply = () => {
		let visible = 0;
		for (const { el, tags, categories } of items) {
			const show =
				matches(tags, selectedTags) && matches(categories, selectedCategories);
			el.classList.toggle("hidden", !show);
			if (show) visible += 1;
		}
		for (const group of groups) {
			group.hidden = !group.querySelector(
				`${config.itemSelector}:not(.hidden)`,
			);
		}
		syncButtons(tagButtons, selectedTags, "tag");
		syncButtons(categoryButtons, selectedCategories, "category");

		const filtered = selectedTags.size > 0 || selectedCategories.size > 0;
		const total = items.length;
		if (countEl) {
			countEl.textContent = filtered
				? `Showing ${visible} of ${total} ${config.countLabel}`
				: `Showing all ${total} ${config.countLabel}`;
		}
		if (hintEl) hintEl.hidden = !filtered;
	};

	const bind = (buttons, selected, key) => {
		for (const button of buttons) {
			const value = button.dataset[key];
			if (!value) continue;
			button.addEventListener("click", (event) => {
				event.preventDefault();
				if (!selected.delete(value)) selected.add(value);
				apply();
			});
			button.addEventListener("contextmenu", (event) => {
				event.preventDefault();
				selectedTags.clear();
				selectedCategories.clear();
				apply();
			});
		}
	};
	bind(tagButtons, selectedTags, "tag");
	bind(categoryButtons, selectedCategories, "category");
	apply();
}

// Module scripts run after the document is parsed, so the DOM is ready.
for (const node of document.querySelectorAll("[data-filter-config]")) {
	initContainer(node);
}
