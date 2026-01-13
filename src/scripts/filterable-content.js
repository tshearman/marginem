(function () {
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
    buttons.forEach((button) => {
      const tag = button.dataset.tag;
      if (!tag) return;
      button.dataset.selected = selected.has(tag) ? "true" : "false";
    });
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

    if (!items.length) {
      node.dataset.filterReady = "true";
      return;
    }

    const stateKey = getStateKey(config.stateKey);
    const selected = getSelectedTags(stateKey);
    const totalItems = items.length;

    const applyFilter = () => {
      let visible = 0;
      items.forEach((item) => {
        const tags = JSON.parse(item.dataset.tags || "[]");
        const shouldShow =
          selected.size === 0 ||
          tags.some((tag) => tag && selected.has(tag));
        if (shouldShow) {
          item.classList.remove("hidden");
          visible += 1;
        } else {
          item.classList.add("hidden");
        }
      });

      syncButtonStates(
        [...filterButtons, ...itemTagButtons],
        selected
      );
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

    filterButtons.forEach((button) => {
      const tag = button.dataset.tag;
      if (!tag) return;
      button.addEventListener("click", (event) => {
        event.preventDefault();
        toggleTag(tag);
      });
      button.addEventListener("contextmenu", clearTags);
    });

    itemTagButtons.forEach((button) => {
      const tag = button.dataset.tag;
      if (!tag) return;
      button.addEventListener("click", (event) => {
        event.preventDefault();
        toggleTag(tag);
      });
      button.addEventListener("contextmenu", clearTags);
    });

    node.dataset.filterReady = "true";
    applyFilter();
  };

  const initAll = () => {
    document
      .querySelectorAll("[data-filter-config]")
      .forEach((node) => initContainer(node));
  };

  document.addEventListener("DOMContentLoaded", initAll);
  document.addEventListener("astro:page-load", initAll);
})();
