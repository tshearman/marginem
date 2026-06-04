import { describe, expect, it } from "vitest";
import {
	renderDateStamp,
	renderGardenNoteCard,
	renderNoteCard,
	renderPostPreview,
	renderTag,
} from "../src/lib/card-html";

// card-html.ts is the single source of truth for the markup embedded via
// `set:html` (Astro) and `innerHTML` (the search modal). Because that markup is
// trusted by its consumers, the escaping here is the security boundary — these
// tests pin it down.

const XSS = '<script>alert("x")</script>';

describe("renderNoteCard escaping", () => {
	it("escapes user content, author, and source", () => {
		const html = renderNoteCard({
			content: XSS,
			author: 'A & B "quote"',
			source: "Source <em>x</em>",
		});
		expect(html).not.toContain("<script>");
		expect(html).toContain("&lt;script&gt;");
		expect(html).toContain("A &amp; B");
		expect(html).toContain("Source &lt;em&gt;x&lt;/em&gt;");
	});

	it("escapes attribute-bound values (style, id, data-tags)", () => {
		const html = renderNoteCard({
			content: "ok",
			id: 'x" onmouseover="evil()',
			style: 'color:red" onclick="evil()',
			dataTags: '["a"]" data-x="y',
		});
		expect(html).not.toContain('onmouseover="evil()"');
		expect(html).not.toContain('onclick="evil()"');
		expect(html).toContain("&quot;");
	});

	it("renders the search variant as an anchor with an escaped href", () => {
		const html = renderNoteCard({
			variant: "search",
			href: '/x"><img src=x>',
			content: "hi",
		});
		expect(html.startsWith("<a class=\"note-card note-card--interactive\"")).toBe(
			true,
		);
		expect(html).not.toContain("<img src=x>");
		expect(html).toContain("&quot;&gt;&lt;img");
	});
});

describe("renderTag", () => {
	it("returns an empty string for blank tags", () => {
		expect(renderTag({ tag: "   " })).toBe("");
	});

	it("escapes the label and derives a slugged href", () => {
		const html = renderTag({ tag: "C++ & Co" });
		expect(html).toContain("&amp;");
		expect(html).not.toContain("C++ & Co</");
		expect(html).toContain('href="/tags/c-co/"');
	});

	it("renders a button for the clickable filter variant", () => {
		const html = renderTag({ tag: "math", variant: "filter" });
		expect(html.startsWith("<button")).toBe(true);
		expect(html).toContain('data-tag="math"');
		expect(html).toContain('aria-pressed="false"');
	});
});

describe("renderPostPreview / renderGardenNoteCard escaping", () => {
	it("escapes the post title and url", () => {
		const html = renderPostPreview({
			title: XSS,
			url: '/p"><b>',
		});
		expect(html).not.toContain("<script>");
		expect(html).toContain("&lt;script&gt;");
		expect(html).not.toContain('"><b>');
	});

	it("escapes garden card title and excerpt", () => {
		const html = renderGardenNoteCard({
			title: XSS,
			excerpt: "a & b",
			href: "/garden/x/",
		});
		expect(html).not.toContain("<script>");
		expect(html).toContain("a &amp; b");
	});
});

describe("renderDateStamp", () => {
	it("wraps ordinal suffixes in <sup> and escapes the rest", () => {
		const html = renderDateStamp({
			datetime: new Date("2024-01-02T00:00:00Z"),
			label: "2nd of <Jan>",
		});
		expect(html).toContain("<span>2<sup>nd</sup></span>");
		expect(html).toContain("&lt;Jan&gt;");
		expect(html).toContain('datetime="2024-01-02T00:00:00.000Z"');
	});
});
