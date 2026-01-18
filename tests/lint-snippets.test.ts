import { describe, expect, it } from "vitest";
import {
	extractCodeBlocks,
	normalizeLanguage,
	parseMeta,
} from "../scripts/lint-snippets.mjs";

describe("normalizeLanguage", () => {
	it("maps aliases to canonical language identifiers", () => {
		expect(normalizeLanguage("JS")).toBe("javascript");
		expect(normalizeLanguage("ts")).toBe("typescript");
		expect(normalizeLanguage("TSX")).toBe("typescript");
		expect(normalizeLanguage("py")).toBe("python");
		expect(normalizeLanguage("Hs")).toBe("haskell");
		expect(normalizeLanguage("unknown")).toBeNull();
	});
});

describe("parseMeta", () => {
	it("parses quoted and unquoted metadata attributes", () => {
		const options = parseMeta('run="true" src=\'./code.ts\' note=sample');
		expect(options).toEqual({
			run: "true",
			src: "./code.ts",
			note: "sample",
		});
	});
});

describe("extractCodeBlocks", () => {
	it("returns metadata about fenced code blocks", () => {
		const source = [
			"# Title",
			"",
			"```js run=true",
			"console.log('hello');",
			"```",
			"",
			"```python title=\"Example\"",
			"print('hi')",
			"```",
		].join("\n");

		const blocks = extractCodeBlocks(source);
		expect(blocks).toHaveLength(2);
		expect(blocks[0]).toMatchObject({
			lang: "js",
			meta: "run=true",
			line: 3,
		});
		expect(blocks[1]).toMatchObject({
			lang: "python",
			meta: 'title="Example"',
			line: 7,
		});
	});
});
