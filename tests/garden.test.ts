import { describe, expect, it } from "vitest";
import { createGardenLinkResolver, type GardenNote } from "../src/lib/garden";

const buildNote = (
	overrides: Partial<GardenNote> & Pick<GardenNote, "slug" | "title">,
): GardenNote => ({
	content: "",
	relativePath: "Example.md",
	updatedAt: new Date("2024-01-01T00:00:00Z"),
	published: true,
	tags: [],
	...overrides,
});

describe("createGardenLinkResolver", () => {
	const published = buildNote({
		slug: "alpha-note",
		title: "Alpha Note",
		relativePath: "Notes/Alpha Note.md",
		published: true,
	});
	const draft = buildNote({
		slug: "draft-note",
		title: "Draft Note",
		relativePath: "Drafts/Draft Note.md",
		published: false,
	});
	const resolver = createGardenLinkResolver([published, draft]);

	it("resolves links for published notes by relative path, file name, or title", () => {
		expect(resolver({ target: "Notes/Alpha Note" })).toEqual({
			slug: "alpha-note",
			text: "Alpha Note",
			isLink: true,
		});
		expect(resolver({ target: "Alpha Note.md" })).toEqual({
			slug: "alpha-note",
			text: "Alpha Note",
			isLink: true,
		});
		expect(resolver({ target: "alpha note" })).toEqual({
			slug: "alpha-note",
			text: "Alpha Note",
			isLink: true,
		});
	});

	it("prefers provided aliases for link text", () => {
		expect(
			resolver({ target: "notes/alpha-note.md", alias: "Custom Label" }),
		).toEqual({
			slug: "alpha-note",
			text: "Custom Label",
			isLink: true,
		});
	});

	it("blocks unpublished notes while still showing display text", () => {
		expect(resolver({ target: "Draft Note" })).toEqual({
			text: "Draft Note",
			isLink: false,
		});
		expect(
			resolver({ target: "Drafts/Draft Note.md", alias: "Hidden" }),
		).toEqual({
			text: "Hidden",
			isLink: false,
		});
	});

	it("returns plain text for unknown targets", () => {
		expect(resolver({ target: "Unknown Note" })).toEqual({
			text: "Unknown Note",
			isLink: false,
		});
	});
});
