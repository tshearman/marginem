import { describe, expect, it } from "vitest";
import { formatDate } from "../src/lib/date";

describe("formatDate", () => {
	it("returns a formatted date with ordinal suffix", () => {
		expect(formatDate("2024-01-02")).toBe("January 2nd, 2024");
		expect(formatDate("2024-03-11")).toBe("March 11th, 2024");
	});

	it("formats frontmatter dates (UTC midnight) on their UTC day", () => {
		expect(formatDate(new Date("2024-01-02T00:00:00Z"))).toBe(
			"January 2nd, 2024",
		);
	});

	it("omits the year when options are given without a year", () => {
		expect(formatDate("2024-07-04", { month: "long" })).toBe("July 4th");
	});

	it("returns empty string for invalid dates", () => {
		expect(formatDate("not-a-date")).toBe("");
	});
});
