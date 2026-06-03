// @vitest-environment happy-dom

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { SearchItem } from "../src/scripts/search/types";
import {
	renderGardenNoteCard,
	renderNoteCard,
	renderPostPreview,
} from "../src/lib/card-html";

type SearchState = { cleanup?: () => void };

const setupDom = () => {
	document.body.innerHTML = `
    <button id="search-trigger" type="button">Search</button>
    <div id="search-modal" class="search-modal" hidden aria-hidden="true">
      <div id="search-overlay"></div>
      <div class="search-modal__panel">
        <div class="search-modal__header">
          <div class="search-modal__field">
            <input id="search-input" type="text" />
          </div>
          <button id="search-close" type="button">Close</button>
        </div>
        <div id="search-results" class="search-modal__results">
          <div class="search-modal__placeholder">Type to search the entire archive.</div>
        </div>
      </div>
    </div>
  `;
};

const flushSearchWork = async () => {
	await vi.runOnlyPendingTimersAsync();
	await Promise.resolve();
	await Promise.resolve();
};

const importSearchScript = async () => {
	vi.resetModules();
	await import("../src/scripts/search-modal");
	document.dispatchEvent(new Event("DOMContentLoaded"));
};

const mockFetchIndex = (items: SearchItem[] | Error) => {
	if (items instanceof Error) {
		return vi.spyOn(globalThis, "fetch").mockRejectedValue(items);
	}
	return vi
		.spyOn(globalThis, "fetch")
		.mockResolvedValue(new Response(JSON.stringify(items), { status: 200 }));
};

beforeEach(() => {
	const globalState = (window as typeof window & { __siteSearchState?: SearchState })
		.__siteSearchState;
	globalState?.cleanup?.();
	delete (window as typeof window & { __siteSearchState?: SearchState })
		.__siteSearchState;
	(window as typeof window & { __searchDebug?: boolean }).__searchDebug = false;
	document.body.innerHTML = "";
	vi.useFakeTimers();
	vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
		cb(performance.now());
		return 1;
	});
	vi.spyOn(console, "info").mockImplementation(() => {});
	vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
	document.body.innerHTML = "";
	vi.useRealTimers();
	vi.restoreAllMocks();
	vi.unstubAllGlobals();
});

describe("search modal script", () => {
	it("opens via the trigger and restores the placeholder when closed", async () => {
		setupDom();
		mockFetchIndex([]);
		await importSearchScript();

		const modal = document.getElementById("search-modal") as HTMLElement;
		const trigger = document.getElementById("search-trigger") as HTMLElement;
		const overlay = document.getElementById("search-overlay") as HTMLElement;
		const input = document.getElementById("search-input") as HTMLInputElement;
		const results = document.getElementById("search-results") as HTMLElement;

		trigger.click();

		expect(modal.classList.contains("is-visible")).toBe(true);
		expect(modal.hasAttribute("hidden")).toBe(false);
		expect(modal.getAttribute("aria-hidden")).toBe("false");
		expect(document.body.classList.contains("search-locked")).toBe(true);
		expect(document.activeElement).toBe(input);

		input.value = "example";
		results.textContent = "temporary";

		overlay.dispatchEvent(new Event("click", { bubbles: true }));

		expect(modal.classList.contains("is-visible")).toBe(false);
		expect(modal.getAttribute("hidden")).toBe("true");
		expect(modal.getAttribute("aria-hidden")).toBe("true");
		expect(document.body.classList.contains("search-locked")).toBe(false);
		expect(input.value).toBe("");
		expect(results.textContent?.trim()).toBe("Type to search the entire archive.");
	});

	it("renders matches for each content type and reuses the cached index", async () => {
		setupDom();
		const searchData: SearchItem[] = [
			{
				id: "note-1",
				title: "Note Match",
				snippet: "A quick note.",
				tags: ["notes"],
				pubDate: "2024-03-11",
				displayDate: "March 11th, 2024",
				url: "/notes/1",
				kind: "note",
				author: "Author",
				searchText: "note match alpha",
				timestamp: 200,
				html: renderNoteCard({
					variant: "search",
					href: "/notes/1",
					content: "A quick note.",
					author: "Author",
					tags: ["notes"],
					dateLabel: "March 11th, 2024",
					dateTime: "2024-03-11",
				}),
			},
			{
				id: "garden-1",
				title: "Garden Entry",
				snippet: "From the garden.",
				displayDate: "Updated today",
				url: "/garden/entry",
				kind: "garden",
				searchText: "note garden",
				timestamp: 150,
				html: renderGardenNoteCard({
					variant: "search",
					href: "/garden/entry",
					title: "Garden Entry",
					excerpt: "From the garden.",
					dateLabel: "Updated today",
				}),
			},
			{
				id: "post-1",
				title: "Post Match",
				snippet: "Post content.",
				tags: [],
				pubDate: "2023-12-20",
				url: "/posts/post-match",
				kind: "post",
				searchText: "note post",
				timestamp: 100,
				html: renderPostPreview({
					id: "post-1",
					title: "Post Match",
					url: "/posts/post-match",
					pubDate: "2023-12-20",
					displayDate: "December 20th, 2023",
					excerpt: "Post content.",
					tags: [],
				}),
			},
		];
		const fetchMock = mockFetchIndex(searchData);
		await importSearchScript();

		const input = document.getElementById("search-input") as HTMLInputElement;
		const results = document.getElementById("search-results") as HTMLElement;

		input.value = "note";
		input.dispatchEvent(new Event("input", { bubbles: true }));
		await flushSearchWork();

		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(results.querySelector(".search-modal__placeholder")).toBeNull();
		expect(results.querySelector(".search-modal__empty")).toBeNull();
		const renderedOrder = Array.from(results.children)
			.map((element) => {
				if (element.classList.contains("note-card")) return "note";
				if (element.classList.contains("garden-search")) return "garden";
				if (element.classList.contains("post-preview")) return "post";
				return null;
			})
			.filter(Boolean);
		expect(renderedOrder).toEqual(["note", "garden", "post"]);
		expect(results.querySelector(".note-date")?.textContent).toContain(
			"March 11th, 2024",
		);
		expect(results.querySelector(".garden-search__date")?.textContent).toBe(
			"Updated today",
		);
		expect(results.querySelector(".post-preview__authors")?.textContent).toContain(
			"December 20th, 2023",
		);

		input.value = "missing";
		input.dispatchEvent(new Event("input", { bubbles: true }));
		await flushSearchWork();

		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(results.textContent?.includes("No matches found.")).toBe(true);
	});

	it("shows an error placeholder when the index fails to load", async () => {
		setupDom();
		mockFetchIndex(new Error("network down"));
		await importSearchScript();

		const input = document.getElementById("search-input") as HTMLInputElement;
		const results = document.getElementById("search-results") as HTMLElement;

		input.value = "anything";
		input.dispatchEvent(new Event("input", { bubbles: true }));
		await flushSearchWork();

		expect(results.firstElementChild?.className).toContain(
			"search-modal__empty",
		);
		expect(results.textContent?.trim()).toBe(
			"Search data failed to load. Please try again later.",
		);
	});
});
