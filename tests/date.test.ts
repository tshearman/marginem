import { describe, expect, it } from "vitest";
import { formatDate, formatDateLabelHtml } from "../src/lib/date";

describe("formatDate", () => {
	it("returns a formatted date with ordinal suffix", () => {
		expect(formatDate("2024-01-02")).toBe("January 2nd, 2024");
		expect(formatDate("2024-03-11")).toBe("March 11th, 2024");
	});

	it("omits the year when no year option is provided", () => {
		expect(formatDate("2024-07-04", { month: "long" })).toBe("July 4th");
	});

	it("returns empty string for invalid dates", () => {
		expect(formatDate("not-a-date")).toBe("");
	});
});

describe("formatDateLabelHtml", () => {
	it("wraps ordinal suffixes in sup tags", () => {
		expect(formatDateLabelHtml("July 4th, 2024")).toBe(
			"July 4<sup>th</sup>, 2024",
		);
	});
});
