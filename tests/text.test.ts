import { describe, expect, it } from "vitest";
import { ellipsizeText, normalizeWhitespace } from "../src/lib/text";

describe("normalizeWhitespace", () => {
	it("collapses consecutive whitespace and trims around punctuation", () => {
		const raw = "  Hello,   world !   This\tis\na   test. ";
		expect(normalizeWhitespace(raw)).toBe("Hello, world! This is a test.");
	});

	it("trims leading and trailing whitespace", () => {
		expect(normalizeWhitespace("\n\n  example phrase  \t")).toBe(
			"example phrase",
		);
	});
});

describe("ellipsizeText", () => {
	it("returns empty string when input is falsy", () => {
		expect(ellipsizeText("")).toBe("");
	});

	it("returns normalized text when within the limit", () => {
		const value = "Short sentence.";
		expect(ellipsizeText(value, 200)).toBe("Short sentence.");
	});

	it("appends ellipsis when trimmed to fit within the limit", () => {
		const value =
			"This description keeps going, with trailing punctuation that should be stripped!";
		const result = ellipsizeText(value, 48);
		expect(result.endsWith("…")).toBe(true);
		expect(result.slice(0, -1)).not.toMatch(/[.,;:!-]\s*$/);
	});

	it("forces an ellipsis when alwaysAppend is true", () => {
		expect(ellipsizeText("No trim needed", 200, { alwaysAppend: true })).toBe(
			"No trim needed…",
		);
	});
});
