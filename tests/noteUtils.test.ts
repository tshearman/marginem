import { describe, expect, it } from "vitest";
import { generateNoteId } from "../src/lib/noteUtils";

describe("generateNoteId", () => {
	it("creates a deterministic identifier for the same metadata", () => {
		const meta = {
			content: "The limits of my language mean the limits of my world.",
			author: "Ludwig Wittgenstein",
			date: new Date("1950-01-01"),
		};
		const first = generateNoteId(meta);
		const second = generateNoteId({ ...meta });
		expect(first).toBe(second);
		expect(first).toMatch(/^[a-z0-9-]+-[a-z0-9-]+-[0-9a-f]{8}$/);
	});

	it("falls back to placeholder slugs when metadata is missing", () => {
		const id = generateNoteId({ content: "", author: "" });
		expect(id.endsWith("-00000000")).toBe(false);
		expect(id.includes("unknown")).toBe(true);
	});

	it("limits slug lengths for verbose content and author fields", () => {
		const id = generateNoteId({
			content: "A".repeat(80),
			author: "B".repeat(80),
		});
		const hash = id.slice(-8);
		expect(hash).toMatch(/^[0-9a-f]{8}$/);
		const withoutHash = id.slice(0, -9);
		const separator = withoutHash.lastIndexOf("-");
		const contentSlug = withoutHash.slice(0, separator);
		const authorSlug = withoutHash.slice(separator + 1);
		expect(contentSlug.length).toBeLessThanOrEqual(30);
		expect(authorSlug.length).toBeLessThanOrEqual(20);
	});
});
