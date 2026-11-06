// @vitest-environment happy-dom

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { SearchItem } from "../src/scripts/search/types";
import {
	renderGardenNoteCard,
	renderNoteCard,
	renderPostPreview,
} from "../src/lib/card-html";

const setupDom = () => {
	document.body.innerHTML = `
    <button id="search-trigger" type="button">Search</button>
    <div id="search-modal" class="search-modal" hidden>
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
	document.body.innerHTML = "";
	vi.useFakeTimers();
	vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
	document.body.innerHTML = "";
	vi.useRealTimers();
	vi.restoreAllMocks();
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

		expect(modal.hidden).toBe(false);
		expect(document.body.classList.contains("search-locked")).toBe(true);
		expect(document.activeElement).toBe(input);

		input.value = "example";
		results.textContent = "temporary";

		overlay.dispatchEvent(new Event("click", { bubbles: true }));

		expect(modal.hidden).toBe(true);
		expect(document.body.classList.contains("search-locked")).toBe(false);
		expect(input.value).toBe("");
		expect(results.textContent?.trim()).toBe(
			"Type to search the entire archive.",
		);
	});

	it("renders matches for each content type and reuses the cached index", async () => {
		setupDom();
		const searchData: SearchItem[] = [
			{
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
		expect(
			results.querySelector(".post-preview__authors")?.textContent,
		).toContain("December 20th, 2023");

		input.value = "missing";
		input.dispatchEvent(new Event("input", { bubbles: true }));
		await flushSearchWork();

		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(results.textContent?.includes("No matches found.")).toBe(true);
	});

	it("drops a pending search when the modal closes", async () => {
		setupDom();
		mockFetchIndex([]);
		await importSearchScript();

		const trigger = document.getElementById("search-trigger") as HTMLElement;
		const input = document.getElementById("search-input") as HTMLInputElement;
		const results = document.getElementById("search-results") as HTMLElement;

		trigger.click();
		input.value = "note";
		input.dispatchEvent(new Event("input", { bubbles: true }));
		vi.advanceTimersByTime(220); // search starts, awaiting the index
		document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
		await flushSearchWork();

		expect(results.textContent?.trim()).toBe(
			"Type to search the entire archive.",
		);
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
