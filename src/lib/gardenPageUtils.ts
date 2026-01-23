import type { GardenNote } from "./garden";
import { slugifyObsidianTarget } from "../../plugins/remark-obsidian-links.js";

type GraphNode = {
	id: string;
	title: string;
	url: string;
	group?: number;
	tooltipId?: string;
};

type GraphLink = {
	source: string;
	target: string;
};

export const plainExcerpt = (content: string) => {
	const withoutObsidianLinks = content.replace(/!?\[\[[^\]]+\]\]/g, " ");
	const withoutMarkdownLinks = withoutObsidianLinks.replace(
		/\[([^\]]+)\]\([^)]+\)/g,
		"$1",
	);
	const condensed = withoutMarkdownLinks
		.replace(/[`#>*]/g, " ")
		.replace(/\s+/g, " ")
		.trim();
	return condensed.length > 160 ? `${condensed.slice(0, 160)}…` : condensed;
};

export const extractTargets = (content: string) => {
	const targets: string[] = [];

	const obsidianPattern = /\[\[([^\]]+)\]\]/g;
	let match = obsidianPattern.exec(content);
	while (match) {
		const raw = match[1]?.trim();
		if (raw) {
			targets.push(raw.split("|")[0]?.trim() ?? raw);
		}
		match = obsidianPattern.exec(content);
	}

	const markdownPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
	let mdMatch = markdownPattern.exec(content);
	while (mdMatch) {
		const rawTarget = mdMatch[2]?.trim();
		if (rawTarget) {
			if (
				rawTarget.startsWith("#") ||
				rawTarget.startsWith("/") ||
				rawTarget.startsWith("http://") ||
				rawTarget.startsWith("https://") ||
				rawTarget.startsWith("mailto:") ||
				rawTarget.startsWith("tel:")
			) {
				mdMatch = markdownPattern.exec(content);
				continue;
			}
			const normalized = rawTarget.replace(/\.md$/i, "");
			targets.push(normalized || rawTarget);
		}
		mdMatch = markdownPattern.exec(content);
	}

	return targets;
};

export const buildBreadcrumbs = (segments: string[]) =>
	segments.map((segment, index) => {
		const href =
			index === segments.length - 1
				? undefined
				: `/garden/${slugifyObsidianTarget(
						segments.slice(0, index + 1).join("/"),
					)}/`;
		return { label: segment, href };
	});

export const getIncomingNeighborSlugs = (
	notes: GardenNote[],
	currentSlug: string,
	resolveLink: (link: { target: string }) => { slug?: string; isLink: boolean },
) =>
	notes
		.filter((item) => item.slug !== currentSlug)
		.filter((item) =>
			extractTargets(item.content).some(
				(target) => resolveLink({ target }).slug === currentSlug,
			),
		)
		.map((item) => item.slug);

export const getOutgoingNeighborSlugs = (
	note: GardenNote,
	resolveLink: (link: { target: string }) => { slug?: string; isLink: boolean },
) =>
	extractTargets(note.content)
		.map((target) => resolveLink({ target }).slug)
		.filter((slug): slug is string => Boolean(slug));

export const buildFolderGraphData = ({
	folderNotes,
	folderPath,
	resolveLink,
}: {
	folderNotes: GardenNote[];
	folderPath: string;
	resolveLink: (link: { target: string }) => { slug?: string; isLink: boolean };
}) => {
	const groupByFolder = new Map<string, number>();
	let groupIndex = 1;
	const groupFor = (relativePath: string) => {
		const folder = relativePath.split("/").slice(0, -1).join("/") || "root";
		const existing = groupByFolder.get(folder);
		if (existing) return existing;
		const next = groupIndex++;
		groupByFolder.set(folder, next);
		return next;
	};

	const folderNodeSlugs = new Set(folderNotes.map((item) => item.slug));

	const folderPaths = new Set<string>();
	for (const note of folderNotes) {
		const parts = note.relativePath.split("/");
		parts.pop();
		for (let index = 0; index < parts.length; index += 1) {
			const pathValue = parts.slice(0, index + 1).join("/");
			if (pathValue.startsWith(`${folderPath}/`)) {
				folderPaths.add(pathValue);
			}
		}
	}

	const folderNodes = Array.from(folderPaths).map((pathValue) => {
		const slug = slugifyObsidianTarget(pathValue);
		return {
			id: `folder:${slug}`,
			title: pathValue.split("/").slice(-1)[0] || pathValue,
			url: `/garden/${slug}/`,
			group: groupFor(`${pathValue}/_folder`),
		} satisfies GraphNode;
	});

	const folderGraphNodes = folderNotes.map((item) => ({
		id: item.slug,
		title: item.title,
		url: `/garden/${item.slug}/`,
		tooltipId: item.slug,
		group: groupFor(item.relativePath),
	})) satisfies GraphNode[];

	const folderLinkKeys = new Set<string>();
	const noteLinks = folderNotes.flatMap((item) => {
		const targets = extractTargets(item.content);
		return targets.flatMap((target) => {
			const resolved = resolveLink({ target });
			if (!resolved.isLink || !resolved.slug) return [];
			if (!folderNodeSlugs.has(resolved.slug)) return [];
			const key = `${item.slug}->${resolved.slug}`;
			if (folderLinkKeys.has(key)) return [];
			folderLinkKeys.add(key);
			return [{ source: item.slug, target: resolved.slug }];
		});
	});

	const folderIds = new Set(folderNodes.map((node) => node.id));
	const folderLinks = Array.from(folderPaths).flatMap((pathValue) => {
		const parts = pathValue.split("/");
		if (parts.length < 2) return [];
		const parentPath = parts.slice(0, -1).join("/");
		const source = `folder:${slugifyObsidianTarget(pathValue)}`;
		const target = `folder:${slugifyObsidianTarget(parentPath)}`;
		if (!folderIds.has(source) || !folderIds.has(target)) return [];
		const key = `${source}->${target}`;
		if (folderLinkKeys.has(key)) return [];
		folderLinkKeys.add(key);
		return [{ source, target }];
	});

	const noteFolderLinks = folderNotes.flatMap((item) => {
		const parts = item.relativePath.split("/");
		parts.pop();
		if (!parts.length) return [];
		const pathValue = parts.join("/");
		const source = item.slug;
		const target = `folder:${slugifyObsidianTarget(pathValue)}`;
		if (!folderIds.has(target)) return [];
		const key = `${source}->${target}`;
		if (folderLinkKeys.has(key)) return [];
		folderLinkKeys.add(key);
		return [{ source, target }];
	});

	return {
		nodes: [...folderNodes, ...folderGraphNodes],
		links: [...noteLinks, ...folderLinks, ...noteFolderLinks],
	} satisfies { nodes: GraphNode[]; links: GraphLink[] };
};

export const buildNeighborGraphData = ({
	note,
	notes,
	resolveLink,
	incomingNeighborSlugs,
	outgoingNeighborSlugs,
}: {
	note: GardenNote;
	notes: GardenNote[];
	resolveLink: (link: { target: string }) => { slug?: string; isLink: boolean };
	incomingNeighborSlugs?: string[];
	outgoingNeighborSlugs?: string[];
}) => {
	const noteBySlug = new Map(notes.map((item) => [item.slug, item]));
	const currentSlug = note.slug;
	const outgoing =
		outgoingNeighborSlugs ?? getOutgoingNeighborSlugs(note, resolveLink);
	const incoming =
		incomingNeighborSlugs ??
		getIncomingNeighborSlugs(notes, currentSlug, resolveLink);

	const neighborNoteSlugs = new Set([currentSlug, ...outgoing, ...incoming]);

	const neighborNotes = Array.from(neighborNoteSlugs)
		.map((slug) => noteBySlug.get(slug))
		.filter((item): item is GardenNote => Boolean(item))
		.map((item) => ({
			id: item.slug,
			title: item.title,
			url: `/garden/${item.slug}/`,
		}));

	const currentFolderPath =
		note.relativePath.split("/").slice(0, -1).join("/") ?? "";
	const folderNode = {
		id: currentFolderPath
			? `folder:${slugifyObsidianTarget(currentFolderPath)}`
			: "folder:root",
		title: currentFolderPath
			? currentFolderPath.split("/").slice(-1)[0] || "Folder"
			: "Garden",
		url: currentFolderPath
			? `/garden/${slugifyObsidianTarget(currentFolderPath)}/`
			: "/garden/",
	};

	const neighborNodes = [...neighborNotes, folderNode];

	const neighborLinks = new Set<string>();
	const neighborEdges = neighborNotes.flatMap((node) => {
		const sourceNote = noteBySlug.get(node.id);
		if (!sourceNote) return [];
		const targets = extractTargets(sourceNote.content)
			.map((target) => resolveLink({ target }).slug)
			.filter((slug): slug is string => Boolean(slug))
			.filter((slug) => neighborNoteSlugs.has(slug));
		return targets.flatMap((target) => {
			const key = `${node.id}->${target}`;
			if (neighborLinks.has(key)) return [];
			neighborLinks.add(key);
			return [{ source: node.id, target }];
		});
	});

	const key = `${currentSlug}->${folderNode.id}`;
	if (!neighborLinks.has(key)) {
		neighborLinks.add(key);
		neighborEdges.push({ source: currentSlug, target: folderNode.id });
	}

	return {
		nodes: neighborNodes,
		links: neighborEdges,
	} satisfies { nodes: GraphNode[]; links: GraphLink[] };
};
