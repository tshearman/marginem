import type { createGardenLinkResolver, GardenNote } from "./garden";
import {
	isExternalOrAbsolute,
	OBSIDIAN_LINK_PATTERN,
	parseObsidianLink,
	slugifyObsidianTarget,
} from "../../plugins/remark-obsidian-links.js";
import { toPlainText } from "./text";

type LinkResolver = ReturnType<typeof createGardenLinkResolver>;

export const plainExcerpt = (content: string) => {
	const condensed = toPlainText(content);
	return condensed.length > 160 ? `${condensed.slice(0, 160)}…` : condensed;
};

/** Targets of the wikilinks and relative markdown links in raw markdown. */
export const extractTargets = (content: string) => {
	const wikiTargets = Array.from(
		content.matchAll(OBSIDIAN_LINK_PATTERN),
		(match) => parseObsidianLink(match).target,
	);
	const markdownTargets = Array.from(
		content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g),
		(match) => match[1].trim(),
	)
		.filter((url) => !isExternalOrAbsolute(url))
		.map((url) => url.split("#")[0].replace(/\.mdx?$/i, ""));
	return [...wikiTargets, ...markdownTargets].filter(Boolean);
};

const folderOf = (relativePath: string) =>
	relativePath.split("/").slice(0, -1).join("/");

const folderId = (folderPath: string) =>
	`folder:${slugifyObsidianTarget(folderPath)}`;

const folderUrl = (folderPath: string) =>
	`/garden/${slugifyObsidianTarget(folderPath)}/`;

/** Every folder, including ancestors, that contains at least one note. */
export const collectFolderPaths = (
	notes: Pick<GardenNote, "relativePath">[],
) => {
	const folders = new Set<string>();
	for (const note of notes) {
		const parts = note.relativePath.split("/").slice(0, -1);
		parts.forEach((_, index) => {
			folders.add(parts.slice(0, index + 1).join("/"));
		});
	}
	return Array.from(folders);
};

export const buildBreadcrumbs = (segments: string[]) =>
	segments.map((segment, index) => ({
		label: segment,
		href:
			index === segments.length - 1
				? undefined
				: folderUrl(segments.slice(0, index + 1).join("/")),
	}));

/** Unique slugs of the published notes that `note` links to. */
export const getOutgoingNeighborSlugs = (
	note: GardenNote,
	resolveLink: LinkResolver,
) =>
	Array.from(
		new Set(
			extractTargets(note.content).flatMap(
				(target) => resolveLink({ target }).slug || [],
			),
		),
	);

/** Slugs of the other notes that link to `currentSlug`. */
export const getIncomingNeighborSlugs = (
	notes: GardenNote[],
	currentSlug: string,
	resolveLink: LinkResolver,
) =>
	notes
		.filter(
			(item) =>
				item.slug !== currentSlug &&
				getOutgoingNeighborSlugs(item, resolveLink).includes(currentSlug),
		)
		.map((item) => item.slug);

/**
 * Force-graph data for a set of notes plus their folders: note→note links,
 * folder→parent links, and note→folder links. Pass `folderPath` to scope the
 * graph to that folder's subfolders; omit it for the whole garden.
 */
export const buildFolderGraphData = ({
	folderNotes,
	folderPath,
	resolveLink,
}: {
	folderNotes: GardenNote[];
	folderPath?: string;
	resolveLink: LinkResolver;
}) => {
	// Each folder gets a colour group shared with the notes directly inside it.
	const groups = new Map<string, number>();
	const groupFor = (folder: string) => {
		if (!groups.has(folder)) groups.set(folder, groups.size + 1);
		return groups.get(folder) as number;
	};

	const folderPaths = collectFolderPaths(folderNotes).filter(
		(path) => !folderPath || path.startsWith(`${folderPath}/`),
	);
	const folderIds = new Set(folderPaths.map(folderId));
	const noteSlugs = new Set(folderNotes.map((note) => note.slug));

	const nodes = [
		...folderPaths.map((path) => ({
			id: folderId(path),
			title: path.split("/").pop() || path,
			url: folderUrl(path),
			group: groupFor(path),
		})),
		...folderNotes.map((note) => ({
			id: note.slug,
			title: note.title,
			url: `/garden/${note.slug}/`,
			tooltipId: note.slug,
			group: groupFor(folderOf(note.relativePath) || "root"),
		})),
	];

	const noteLinks = folderNotes.flatMap((note) =>
		getOutgoingNeighborSlugs(note, resolveLink)
			.filter((slug) => noteSlugs.has(slug))
			.map((target) => ({ source: note.slug, target })),
	);
	const folderLinks = folderPaths
		.map((path) => ({
			source: folderId(path),
			target: folderId(folderOf(path)),
		}))
		.filter((link) => folderIds.has(link.target));
	const noteFolderLinks = folderNotes
		.map((note) => ({
			source: note.slug,
			target: folderId(folderOf(note.relativePath)),
		}))
		.filter((link) => folderIds.has(link.target));

	return { nodes, links: [...noteLinks, ...folderLinks, ...noteFolderLinks] };
};

/** Graph of a note, the notes it links to or from, and its parent folder. */
export const buildNeighborGraphData = ({
	note,
	notes,
	resolveLink,
	incomingNeighborSlugs,
	outgoingNeighborSlugs,
}: {
	note: GardenNote;
	notes: GardenNote[];
	resolveLink: LinkResolver;
	incomingNeighborSlugs: string[];
	outgoingNeighborSlugs: string[];
}) => {
	const noteBySlug = new Map(notes.map((item) => [item.slug, item]));
	const neighborSlugs = new Set([
		note.slug,
		...outgoingNeighborSlugs,
		...incomingNeighborSlugs,
	]);
	const neighbors = Array.from(neighborSlugs).flatMap(
		(slug) => noteBySlug.get(slug) ?? [],
	);

	const folder = folderOf(note.relativePath);
	const folderNode = folder
		? {
				id: folderId(folder),
				title: folder.split("/").pop() || "Folder",
				url: folderUrl(folder),
			}
		: { id: "folder:root", title: "Garden", url: "/garden/" };

	const links = neighbors.flatMap((item) =>
		getOutgoingNeighborSlugs(item, resolveLink)
			.filter((slug) => neighborSlugs.has(slug))
			.map((target) => ({ source: item.slug, target })),
	);
	links.push({ source: note.slug, target: folderNode.id });

	return {
		nodes: [
			...neighbors.map((item) => ({
				id: item.slug,
				title: item.title,
				url: `/garden/${item.slug}/`,
			})),
			folderNode,
		],
		links,
	};
};
