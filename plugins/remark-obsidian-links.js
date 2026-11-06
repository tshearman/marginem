import { visit } from "unist-util-visit";

export const OBSIDIAN_LINK_PATTERN = /(!)?\[\[([^[\]]+)\]\]/g;

export const slugifyObsidianTarget = (value = "") => {
	const cleaned = value.trim().replace(/\.mdx?$/i, "");
	return cleaned
		.replace(/\\/g, "/")
		.split("/")
		.filter(Boolean)
		.map((segment) =>
			segment
				.toLowerCase()
				.replace(/[^a-z0-9\s-]/g, "")
				.trim()
				.replace(/\s+/g, "-"),
		)
		.join("/");
};

export const slugifyHeading = (value = "") =>
	slugifyObsidianTarget(value.replace(/^#+/, ""));

/** Split an OBSIDIAN_LINK_PATTERN match: `![[target#heading|alias]]`. */
export const parseObsidianLink = (match) => {
	const [, embedFlag, targetText = ""] = match;
	const [targetAndHeading = "", aliasPart] = targetText.split("|");
	const [target, heading] = targetAndHeading.split("#");
	return {
		target: target?.trim() ?? "",
		alias: aliasPart?.trim() || undefined,
		heading: heading?.trim(),
		isEmbed: Boolean(embedFlag),
	};
};

/** Markdown link URLs that point outside the vault (or within the page). */
export const isExternalOrAbsolute = (url = "") =>
	/^(#|\/|https?:\/\/|mailto:|tel:)/.test(url);

const gardenUrl = (slug, heading) =>
	`/garden/${slug}/${heading ? `#${slugifyHeading(heading)}` : ""}`;

/**
 * Turn `[[wikilinks]]` and relative `[text](Note.md)` links into garden links.
 * `resolveLink({ target, alias, heading, isEmbed })` returns
 * `{ text, isLink, slug? }`; without it (blog posts) wikilinks become plain
 * text and markdown links are left alone.
 */
export default function remarkObsidianLinks({ resolveLink } = {}) {
	return (tree) => {
		visit(tree, "text", (node, index, parent) => {
			if (!parent) return;
			const { value } = node;
			const newNodes = [];
			let lastIndex = 0;

			for (const match of value.matchAll(OBSIDIAN_LINK_PATTERN)) {
				if (match.index > lastIndex) {
					newNodes.push({
						type: "text",
						value: value.slice(lastIndex, match.index),
					});
				}
				lastIndex = match.index + match[0].length;

				const link = parseObsidianLink(match);
				const resolution = resolveLink?.(link);
				const text = resolution?.text || link.alias || link.target;
				newNodes.push(
					resolution?.isLink && resolution.slug
						? {
								type: "link",
								url: gardenUrl(resolution.slug, link.heading),
								data: { hProperties: { "data-obsidian-link": true } },
								children: [{ type: "text", value: text }],
							}
						: { type: "text", value: text },
				);
			}

			if (!newNodes.length) return;
			if (lastIndex < value.length) {
				newNodes.push({ type: "text", value: value.slice(lastIndex) });
			}
			parent.children.splice(index, 1, ...newNodes);
			return index + newNodes.length;
		});

		if (!resolveLink) return;
		visit(tree, "link", (node) => {
			if (isExternalOrAbsolute(node.url)) return;
			const [target, heading] = node.url.split("#");
			const resolution = resolveLink({
				target: target.replace(/\.mdx?$/i, ""),
			});
			if (!resolution?.isLink || !resolution.slug) return;
			node.url = gardenUrl(resolution.slug, heading);
			node.data = node.data || {};
			node.data.hProperties = {
				...node.data.hProperties,
				"data-obsidian-link": true,
			};
		});
	};
}
