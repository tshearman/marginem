import { describe, expect, it } from "vitest";
import { hasPublishedTag } from "../src/lib/obsidian-utils.js";

describe("hasPublishedTag", () => {
	it("returns true for a tags array containing published", () => {
		expect(hasPublishedTag({ tags: ["published"] })).toBe(true);
		expect(hasPublishedTag({ tags: ["Draft", "Published"] })).toBe(true);
	});

	it("returns true for a comma-separated tags string", () => {
		expect(hasPublishedTag({ tags: "published, foo" })).toBe(true);
		expect(hasPublishedTag({ tags: "foo, PUBLISHED" })).toBe(true);
	});

	it("returns false when tags do not include published", () => {
		expect(hasPublishedTag({ tags: ["public", "draft"] })).toBe(false);
		expect(hasPublishedTag({ tags: "public, draft" })).toBe(false);
	});

	it("returns false when tags are missing or unsupported", () => {
		expect(hasPublishedTag({})).toBe(false);
		expect(hasPublishedTag({ tags: 123 })).toBe(false);
		expect(hasPublishedTag({ tags: [null, "draft"] })).toBe(false);
	});
});
