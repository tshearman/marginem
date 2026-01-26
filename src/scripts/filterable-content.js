(() => {
	const pageFilterStates = new Map();

	const getStateKey = (configKey) => {
		if (configKey) return configKey;
		return `${window.location.pathname}`;
	};

	const getSelectedFilters = (key) => {
		if (!pageFilterStates.has(key)) {
			pageFilterStates.set(key, { tags: new Set(), categories: new Set() });
		}
		return pageFilterStates.get(key);
	};

	const syncButtonStates = (buttons, selected, dataKey) => {
		for (const button of buttons) {
			const value = button.dataset[dataKey];
			if (!value) continue;
			const isSelected = selected.has(value);
			button.dataset.selected = isSelected ? "true" : "false";
			button.setAttribute("aria-pressed", isSelected ? "true" : "false");
		}
	};

	const updateCount = (config, visible, total, hasFilters) => {
		if (!config.countId) return;
		const countEl = document.getElementById(config.countId);
		if (countEl) {
			countEl.textContent = hasFilters
				? `Showing ${visible} of ${total} ${config.countLabel || "items"}`
				: `Showing all ${total} ${config.countLabel || "items"}`;
		}
		if (config.hintId) {
			const hintEl = document.getElementById(config.hintId);
			if (hintEl) {
				hintEl.hidden = !hasFilters;
			}
		}
	};

	const parseConfig = (node) => {
		const defaults = {
			filterSelector: ".tag--filter",
			categoryFilterSelector: null,
			itemSelector: ".filterable-item",
			itemTagSelector: ".tag--display",
			itemCategorySelector: null,
			countLabel: "items",
			groupSelector: null,
			groupItemSelector: null,
		};
		try {
			const data = node.dataset.filterConfig
				? JSON.parse(node.dataset.filterConfig)
				: {};
			return { ...defaults, ...data };
		} catch (error) {
			console.warn("Failed to parse filter config", error);
			return defaults;
		}
	};

	const initContainer = (node) => {
		if (!node || node.dataset.filterReady === "true") return;

		const config = parseConfig(node);
		const filterButtons = node.querySelectorAll(config.filterSelector);
		const categoryButtons = config.categoryFilterSelector
			? node.querySelectorAll(config.categoryFilterSelector)
			: [];
		const itemTagButtons = node.querySelectorAll(config.itemTagSelector);
		const itemCategoryButtons = config.itemCategorySelector
			? node.querySelectorAll(config.itemCategorySelector)
			: [];
		const items = node.querySelectorAll(config.itemSelector);
		const groups = config.groupSelector
			? node.querySelectorAll(config.groupSelector)
			: [];
		const tagCache = new WeakMap();
		const categoryCache = new WeakMap();

		if (!items.length) {
			node.dataset.filterReady = "true";
			return;
		}

		const stateKey = getStateKey(config.stateKey);
		const selected = getSelectedFilters(stateKey);
		const totalItems = items.length;

		const getTagsForItem = (item) => {
			if (tagCache.has(item)) return tagCache.get(item);
			let tags = [];
			try {
				const parsed = JSON.parse(item.dataset.tags || "[]");
				tags = Array.isArray(parsed)
					? parsed.filter((tag) => typeof tag === "string" && tag.length > 0)
					: [];
			} catch {
				tags = [];
			}
			tagCache.set(item, tags);
			return tags;
		};

		const getCategoriesForItem = (item) => {
			if (categoryCache.has(item)) return categoryCache.get(item);
			let categories = [];
			try {
				const parsed = JSON.parse(item.dataset.categories || "[]");
				categories = Array.isArray(parsed)
					? parsed.filter(
							(category) => typeof category === "string" && category.length > 0,
						)
					: [];
			} catch {
				categories = [];
			}
			categoryCache.set(item, categories);
			return categories;
		};

		const applyFilter = () => {
			let visible = 0;
			for (const item of items) {
				const tags = getTagsForItem(item);
				const categories = getCategoriesForItem(item);
				const tagMatch =
					selected.tags.size === 0 ||
					tags.some((tag) => tag && selected.tags.has(tag));
				const categoryMatch =
					selected.categories.size === 0 ||
					categories.some(
						(category) => category && selected.categories.has(category),
					);
				const shouldShow = tagMatch && categoryMatch;
				if (shouldShow) {
					item.classList.remove("hidden");
					visible += 1;
				} else {
					item.classList.add("hidden");
				}
			}

			if (groups.length) {
				const groupItemSelector =
					config.groupItemSelector || config.itemSelector;
				for (const group of groups) {
					const groupItems = group.querySelectorAll(groupItemSelector);
					const hasVisible = [...groupItems].some(
						(item) => !item.classList.contains("hidden"),
					);
					group.hidden = !hasVisible;
				}
			}

			syncButtonStates(
				[...filterButtons, ...itemTagButtons],
				selected.tags,
				"tag",
			);
			syncButtonStates(
				[...categoryButtons, ...itemCategoryButtons],
				selected.categories,
				"category",
			);
			updateCount(
				config,
				visible,
				totalItems,
				selected.tags.size > 0 || selected.categories.size > 0,
			);
		};

		const toggleTag = (tag) => {
			if (!tag) return;
			if (selected.tags.has(tag)) {
				selected.tags.delete(tag);
			} else {
				selected.tags.add(tag);
			}
			applyFilter();
		};

		const toggleCategory = (category) => {
			if (!category) return;
			if (selected.categories.has(category)) {
				selected.categories.delete(category);
			} else {
				selected.categories.add(category);
			}
			applyFilter();
		};

		const clearFilters = (event) => {
			if (event) event.preventDefault();
			selected.tags.clear();
			selected.categories.clear();
			applyFilter();
		};

		for (const button of filterButtons) {
			const tag = button.dataset.tag;
			if (!tag) continue;
			button.addEventListener("click", (event) => {
				event.preventDefault();
				toggleTag(tag);
			});
			button.addEventListener("contextmenu", clearFilters);
		}

		for (const button of categoryButtons) {
			const category = button.dataset.category;
			if (!category) continue;
			button.addEventListener("click", (event) => {
				event.preventDefault();
				toggleCategory(category);
			});
			button.addEventListener("contextmenu", clearFilters);
		}

		for (const button of itemTagButtons) {
			const tag = button.dataset.tag;
			if (!tag) continue;
			button.addEventListener("click", (event) => {
				event.preventDefault();
				toggleTag(tag);
			});
			button.addEventListener("contextmenu", clearFilters);
		}

		for (const button of itemCategoryButtons) {
			const category = button.dataset.category;
			if (!category) continue;
			button.addEventListener("click", (event) => {
				event.preventDefault();
				toggleCategory(category);
			});
			button.addEventListener("contextmenu", clearFilters);
		}

		node.dataset.filterReady = "true";
		applyFilter();
	};

	const initAll = () => {
		const containers = document.querySelectorAll("[data-filter-config]");
		for (const node of containers) {
			initContainer(node);
		}
	};

	document.addEventListener("DOMContentLoaded", initAll);
	document.addEventListener("astro:page-load", initAll);
})();
