// @vitest-environment happy-dom

import { afterEach, describe, expect, it } from "vitest";
import { renderDateStamp } from "../src/lib/card-html";

describe("renderDateStamp", () => {
	afterEach(() => {
		document.body.innerHTML = "";
	});

	it("wraps ordinal suffixes in sup tags and normalizes the datetime", () => {
		const container = document.createElement("div");
		container.innerHTML = renderDateStamp({
			datetime: new Date("2024-07-04T00:00:00Z"),
			label: "July 4th, 2024",
			className: "hero-date",
		});

		const time = container.querySelector("time");
		expect(time?.getAttribute("datetime")).toBe("2024-07-04T00:00:00.000Z");
		expect(time?.innerHTML).toContain("4<sup>th</sup>");
		expect(time?.classList.contains("hero-date")).toBe(true);
	});

	it("keeps content empty when no label is provided but preserves the datetime string", () => {
		const container = document.createElement("div");
		container.innerHTML = renderDateStamp({
			datetime: "2024-05-01",
			className: "custom-date",
		});

		const time = container.querySelector("time");
		expect(time?.textContent).toBe("");
		expect(time?.getAttribute("datetime")).toBe("2024-05-01");
		expect(time?.className).toBe("date-stamp custom-date");
	});
});
