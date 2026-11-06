import { describe, expect, it } from "vitest";
import { createGardenLinkResolver, type GardenNote } from "../src/lib/garden";
import {
	buildFolderGraphData,
	buildNeighborGraphData,
	collectFolderPaths,
	extractTargets,
	getIncomingNeighborSlugs,
	getOutgoingNeighborSlugs,
} from "../src/lib/gardenPageUtils";
import { slugifyObsidianTarget } from "../plugins/remark-obsidian-links.js";

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

describe("extractTargets", () => {
	it("returns wikilink and relative markdown-link targets without headings", () => {
		expect(
			extractTargets(
				"[[Alpha#Intro|a]] [b](Notes/Beta.md#part) [c](https://x.y) [d](#top)",
			),
		).toEqual(["Alpha", "Notes/Beta"]);
	});
});

describe("collectFolderPaths", () => {
	it("lists every folder and ancestor folder once", () => {
		expect(
			collectFolderPaths([
				{ relativePath: "Root.md" },
				{ relativePath: "A/B/One.md" },
				{ relativePath: "A/Two.md" },
				{ relativePath: "C/Three.md" },
			]),
		).toEqual(["A", "A/B", "C"]);
	});
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

		const linkSet = new Set(
			links.map((link) => `${link.source}->${link.target}`),
		);
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

		const linkSet = new Set(
			links.map((link) => `${link.source}->${link.target}`),
		);
		expect(linkSet).toEqual(
			new Set([
				"ideas-alpha->ideas-beta",
				"ideas-gamma->ideas-alpha",
				`ideas-alpha->folder:${slugifyObsidianTarget("Ideas")}`,
			]),
		);
	});
});

describe("buildFolderGraphData without folderPath", () => {
	it("graphs the whole garden, including top-level folders", () => {
		const notes = [
			buildNote({
				slug: "root",
				title: "Root",
				relativePath: "Root.md",
				content: "[[Alpha]]",
			}),
			buildNote({
				slug: "ideas/alpha",
				title: "Alpha",
				relativePath: "Ideas/Alpha.md",
			}),
		];
		const { nodes, links } = buildFolderGraphData({
			folderNotes: notes,
			resolveLink: createGardenLinkResolver(notes),
		});

		expect(nodes.map((node) => [node.id, node.group])).toEqual([
			["folder:ideas", 1],
			["root", 2],
			["ideas/alpha", 1],
		]);
		expect(links).toEqual([
			{ source: "root", target: "ideas/alpha" },
			{ source: "ideas/alpha", target: "folder:ideas" },
		]);
	});
});
