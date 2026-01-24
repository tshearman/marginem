import { describe, expect, it } from "vitest";
import { createGardenLinkResolver, type GardenNote } from "../src/lib/garden";
import {
	buildFolderGraphData,
	buildNeighborGraphData,
	getIncomingNeighborSlugs,
	getOutgoingNeighborSlugs,
} from "../src/lib/gardenPageUtils";
import { slugifyObsidianTarget } from "../plugins/remark-obsidian-links.js";

const buildNote = (
	overrides: Partial<GardenNote> & Pick<GardenNote, "slug" | "title">,
): GardenNote => ({
	content: "",
	relativePath: "Example.md",
	sourcePath: "/vault/Example.md",
	updatedAt: new Date("2024-01-01T00:00:00Z"),
	published: true,
	tags: [],
	...overrides,
});

describe("buildFolderGraphData", () => {
	it("builds nodes and links for folder and note relationships", () => {
		const notes = [
			buildNote({
				slug: "ideas-alpha",
				title: "Alpha",
				relativePath: "Ideas/Alpha.md",
				content: "Links [[Beta]] and [[Other]].",
			}),
			buildNote({
				slug: "ideas-beta",
				title: "Beta",
				relativePath: "Ideas/Sub/Beta.md",
				content: "Backlink to [[Alpha]].",
			}),
			buildNote({
				slug: "other-note",
				title: "Other",
				relativePath: "Other/Other.md",
				content: "",
			}),
		];
		const folderNotes = notes.filter((note) =>
			note.relativePath.startsWith("Ideas/"),
		);
		const resolveLink = createGardenLinkResolver(notes);
		const { nodes, links } = buildFolderGraphData({
			folderNotes,
			folderPath: "Ideas",
			resolveLink,
		});

		const nodeIds = new Set(nodes.map((node) => node.id));
		expect(nodeIds).toEqual(
			new Set([
				"ideas-alpha",
				"ideas-beta",
				`folder:${slugifyObsidianTarget("Ideas/Sub")}`,
			]),
		);

		const linkSet = new Set(links.map((link) => `${link.source}->${link.target}`));
		expect(linkSet).toEqual(
			new Set([
				"ideas-alpha->ideas-beta",
				"ideas-beta->ideas-alpha",
				`ideas-beta->folder:${slugifyObsidianTarget("Ideas/Sub")}`,
			]),
		);
	});
});

describe("buildNeighborGraphData", () => {
	it("includes incoming/outgoing neighbors and the parent folder node", () => {
		const notes = [
			buildNote({
				slug: "ideas-alpha",
				title: "Alpha",
				relativePath: "Ideas/Alpha.md",
				content: "[[Beta]]",
			}),
			buildNote({
				slug: "ideas-beta",
				title: "Beta",
				relativePath: "Ideas/Beta.md",
				content: "",
			}),
			buildNote({
				slug: "ideas-gamma",
				title: "Gamma",
				relativePath: "Ideas/Gamma.md",
				content: "See [[Alpha]]",
			}),
		];
		const resolveLink = createGardenLinkResolver(notes);
		const note = notes[0];
		const incomingNeighborSlugs = getIncomingNeighborSlugs(
			notes,
			note.slug,
			resolveLink,
		);
		const outgoingNeighborSlugs = getOutgoingNeighborSlugs(note, resolveLink);
		const { nodes, links } = buildNeighborGraphData({
			note,
			notes,
			resolveLink,
			incomingNeighborSlugs,
			outgoingNeighborSlugs,
		});

		const nodeIds = new Set(nodes.map((node) => node.id));
		expect(nodeIds).toEqual(
			new Set([
				"ideas-alpha",
				"ideas-beta",
				"ideas-gamma",
				`folder:${slugifyObsidianTarget("Ideas")}`,
			]),
		);

		const linkSet = new Set(links.map((link) => `${link.source}->${link.target}`));
		expect(linkSet).toEqual(
			new Set([
				"ideas-alpha->ideas-beta",
				"ideas-gamma->ideas-alpha",
				`ideas-alpha->folder:${slugifyObsidianTarget("Ideas")}`,
			]),
		);
	});
});
