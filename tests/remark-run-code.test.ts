import { describe, expect, it } from "vitest";
import { parseMetaOptions } from "../plugins/remark-run-code.js";

describe("parseMetaOptions", () => {
	it("parses quoted and unquoted key/value pairs", () => {
		const result = parseMetaOptions(
			"run lang=\"python\" src='snippets/code.py' note=sample",
		);
		expect(result).toEqual({
			lang: "python",
			src: "snippets/code.py",
			note: "sample",
		});
	});

	it("returns an empty object when metadata is missing", () => {
		expect(parseMetaOptions("")).toEqual({});
	});
});
