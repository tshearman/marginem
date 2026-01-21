(() => {
	const pageFilterStates = new Map();

	const getStateKey = (configKey) => {
		if (configKey) return configKey;
		return `${window.location.pathname}`;
	};

	const getSelectedTags = (key) => {
		if (!pageFilterStates.has(key)) {
			pageFilterStates.set(key, new Set());
		}
		return pageFilterStates.get(key);
	};

	const syncButtonStates = (buttons, selected) => {
		for (const button of buttons) {
			const tag = button.dataset.tag;
			if (!tag) continue;
			button.dataset.selected = selected.has(tag) ? "true" : "false";
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
			itemSelector: ".filterable-item",
			itemTagSelector: ".tag--display",
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
		const itemTagButtons = node.querySelectorAll(config.itemTagSelector);
		const items = node.querySelectorAll(config.itemSelector);
		const groups = config.groupSelector
			? node.querySelectorAll(config.groupSelector)
			: [];
		const tagCache = new WeakMap();

		if (!items.length) {
			node.dataset.filterReady = "true";
			return;
		}

		const stateKey = getStateKey(config.stateKey);
		const selected = getSelectedTags(stateKey);
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

		const applyFilter = () => {
			let visible = 0;
			for (const item of items) {
				const tags = getTagsForItem(item);
				const shouldShow =
					selected.size === 0 || tags.some((tag) => tag && selected.has(tag));
				if (shouldShow) {
					item.classList.remove("hidden");
					visible += 1;
				} else {
					item.classList.add("hidden");
				}
			}

			if (groups.length) {
				const groupItemSelector = config.groupItemSelector || config.itemSelector;
				for (const group of groups) {
					const groupItems = group.querySelectorAll(groupItemSelector);
					const hasVisible = [...groupItems].some(
						(item) => !item.classList.contains("hidden"),
					);
					group.hidden = !hasVisible;
				}
			}

			syncButtonStates([...filterButtons, ...itemTagButtons], selected);
			updateCount(config, visible, totalItems, selected.size > 0);
		};

		const toggleTag = (tag) => {
			if (!tag) return;
			if (selected.has(tag)) {
				selected.delete(tag);
			} else {
				selected.add(tag);
			}
			applyFilter();
		};

		const clearTags = (event) => {
			if (event) event.preventDefault();
			selected.clear();
			applyFilter();
		};

		for (const button of filterButtons) {
			const tag = button.dataset.tag;
			if (!tag) continue;
			button.addEventListener("click", (event) => {
				event.preventDefault();
				toggleTag(tag);
			});
			button.addEventListener("contextmenu", clearTags);
		}

		for (const button of itemTagButtons) {
			const tag = button.dataset.tag;
			if (!tag) continue;
			button.addEventListener("click", (event) => {
				event.preventDefault();
				toggleTag(tag);
			});
			button.addEventListener("contextmenu", clearTags);
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
