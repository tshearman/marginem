import { describe, expect, it } from "vitest";
import { parseMetaOptions } from "../plugins/remark-run-code.js";

describe("parseMetaOptions", () => {
	it("parses multiple key/value pairs with quotes", () => {
		const result = parseMetaOptions('lang="python" src=\'snippets/code.py\'');
		expect(result).toEqual({
			lang: "python",
			src: "snippets/code.py",
		});
	});

	it("returns an empty object when metadata is missing", () => {
		expect(parseMetaOptions("")).toEqual({});
	});
});
