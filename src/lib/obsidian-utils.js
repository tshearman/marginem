export const isIgnoredDirName = (dirName) =>
	dirName.startsWith(".") ||
	dirName.startsWith("_") ||
	dirName.startsWith("archive") ||
	dirName === "node_modules";

export const isIgnoredFileName = (fileName) =>
	fileName.startsWith("_") || fileName.startsWith("archive");

export const hasPublishedTag = (frontmatter) => {
	const tags = frontmatter?.tags;
	if (!tags) return false;
	if (Array.isArray(tags)) {
		return tags.some(
			(tag) => typeof tag === "string" && tag.toLowerCase() === "published",
		);
	}
	if (typeof tags === "string") {
		return tags
			.split(",")
			.map((tag) => tag.trim().toLowerCase())
			.includes("published");
	}
	return false;
};

export const isGardenPublished = (frontmatter) =>
	frontmatter?.published === true || hasPublishedTag(frontmatter);
