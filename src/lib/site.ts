export const SITE_NAME = "Marginem";
export const CONTENT_DIR = "content";

export const MAIN_PAGES = {
	writing: {
		label: "Writing",
		href: "/writing",
		isCompact: false,
		pageTitle: `Writing | ${SITE_NAME}`,
		eyebrow: "Essays, Experiments, and Explorations",
		description:
			"Longer form writing on mathematics, computing, learning, games, and anything else.",
	},
	commonplace: {
		label: "Commonplace",
		href: "/commonplace/",
		isCompact: false,
		pageTitle: `Commonplace | ${SITE_NAME}`,
		eyebrow: "Adversaria",
		description: "Collected passages, quotations, and fragments.",
	},
	garden: {
		label: "Garden",
		href: "/garden/",
		isCompact: true,
		pageTitle: `Garden | ${SITE_NAME}`,
		eyebrow: "Personal Wikipedia",
		description:
			"Live view of the published notes in my personal Obsidian Vault.",
	},
	archive: {
		label: "Archive",
		href: "/archive/",
		isCompact: true,
		pageTitle: `Archive | ${SITE_NAME}`,
		eyebrow: "Full site index",
		description: "Browse every note, quote, and essay, organized by year.",
	},
	newsletter: {
		label: "Newsletter",
		href: "/newsletter/",
		isCompact: true,
		pageTitle: `Newsletters | ${SITE_NAME}`,
		eyebrow: "Back Catalog",
		description: "Previous issues available to browse at any time.",
	},
} as const;

export const WRITING_PAGE_POST_LIMIT = 5;

export const MAIN_NAV = [
	MAIN_PAGES.writing,
	MAIN_PAGES.commonplace,
	MAIN_PAGES.garden,
	MAIN_PAGES.newsletter,
	MAIN_PAGES.archive,
];
