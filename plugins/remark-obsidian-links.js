import { visit } from "unist-util-visit";

const OBSIDIAN_LINK_PATTERN = /(!)?\[\[([^[\]]+)\]\]/g;

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

const parseMatch = (matchArray) => {
	const [, embedFlag, targetText = ""] = matchArray;
	const [targetAndHeading = "", aliasPart] = targetText.split("|");
	const [target, heading] = targetAndHeading.split("#");
	return {
		target: target?.trim() ?? "",
		alias: aliasPart?.trim() || undefined,
		heading: heading?.trim(),
		isEmbed: Boolean(embedFlag),
	};
};

export default function remarkObsidianLinks(options = {}) {
	const { linkPrefix = "/garden", resolveLink } = options;
	const normalizedPrefix = linkPrefix.replace(/\/+$/, "");

	return (tree) => {
		visit(tree, "text", (node, index, parent) => {
			if (!parent || typeof node.value !== "string") return;
			const value = node.value;
			const newNodes = [];
			let lastIndex = 0;

			for (const match of value.matchAll(OBSIDIAN_LINK_PATTERN)) {
				const matchStart = match.index ?? 0;
				if (matchStart > lastIndex) {
					newNodes.push({
						type: "text",
						value: value.slice(lastIndex, matchStart),
					});
				}

				const parsed = parseMatch(match);
				const resolution = resolveLink?.(parsed);
				const customText =
					typeof resolution === "object" && resolution
						? resolution.text
						: undefined;
				const slugOrUrl =
					typeof resolution === "string"
						? resolution
						: resolution?.slug ?? resolution?.url;
				const linkText =
					customText || parsed.alias || parsed.target || slugOrUrl;
				const isLink =
					typeof resolution === "object" && resolution
						? resolution.isLink ?? Boolean(slugOrUrl)
						: Boolean(slugOrUrl);

				if (!isLink || !slugOrUrl) {
					newNodes.push({
						type: "text",
						value: linkText || "",
					});
					lastIndex = matchStart + match[0].length;
					continue;
				}

				const anchor = parsed.heading
					? `#${slugifyHeading(parsed.heading)}`
					: "";
				const url =
					slugOrUrl.startsWith("/") || slugOrUrl.startsWith("http")
						? `${slugOrUrl}${anchor}`
						: `${normalizedPrefix}/${slugOrUrl}/${anchor}`;

				newNodes.push({
					type: "link",
					url,
					data: { hProperties: { "data-obsidian-link": true } },
					children: [{ type: "text", value: linkText }],
				});

				lastIndex = matchStart + match[0].length;
			}

			if (!newNodes.length) return;
			if (lastIndex < value.length) {
				newNodes.push({
					type: "text",
					value: value.slice(lastIndex),
				});
			}

			parent.children.splice(index, 1, ...newNodes);
		});
	};
}
