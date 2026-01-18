// @vitest-environment happy-dom

import { afterEach, describe, expect, it } from "vitest";
import { h, render } from "preact";
import { DateStamp } from "../src/components/preact/DateStamp";

describe("DateStamp component", () => {
	afterEach(() => {
		document.body.innerHTML = "";
	});

	it("wraps ordinal suffixes in sup tags and renders a normalized datetime", () => {
		const container = document.createElement("div");
		render(
			<DateStamp
				datetime={new Date("2024-07-04T00:00:00Z")}
				label="July 4th, 2024"
				className="hero-date"
			/>,
			container,
		);

		const time = container.querySelector("time");
		expect(time?.getAttribute("datetime")).toBe("2024-07-04T00:00:00.000Z");
		expect(time?.innerHTML).toContain("4<sup>th</sup>");
		expect(time?.classList.contains("hero-date")).toBe(true);

		render(null, container);
	});

	it("keeps content empty when no label is provided but preserves the datetime string", () => {
		const container = document.createElement("div");
		render(
			<DateStamp datetime="2024-05-01" className="custom-date" />,
			container,
		);

		const time = container.querySelector("time");
		expect(time?.textContent).toBe("");
		expect(time?.getAttribute("datetime")).toBe("2024-05-01");
		expect(time?.className).toBe("date-stamp custom-date");

		render(null, container);
	});
});
