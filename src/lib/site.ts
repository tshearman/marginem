export const SITE_NAME = "Ad Marginem";

export const MAIN_PAGES = {
	writing: {
		label: "Writing",
		href: "/",
		icon: "writing",
		isCompact: false,
		pageTitle: `Writing | ${SITE_NAME}`,
		eyebrow: "Essays and field notes",
		description: "Essays, research notes, and experiments.",
	},
	commonplace: {
		label: "Commonplace",
		href: "/commonplace/",
		icon: "commonplace",
		isCompact: false,
		pageTitle: `Commonplace | ${SITE_NAME}`,
		eyebrow: "Collected fragments",
		description: "Collected passages, adversaria, and fragments.",
	},
	garden: {
		label: "Garden",
		href: "/garden/",
		icon: "garden",
		isCompact: false,
		pageTitle: `Garden | ${SITE_NAME}`,
		eyebrow: "Linked vault notes",
		description:
			"Notes are imported from the configured Obsidian vault path at build time, keeping Obsidian and the site in sync.",
	},
	archive: {
		label: "Archive",
		href: "/archive/",
		icon: "archive",
		isCompact: true,
		pageTitle: `Archive | ${SITE_NAME}`,
		eyebrow: "Full writing index",
		description: "Browse every note and essay, organized by year.",
	},
	newsletter: {
		label: "Newsletter",
		href: "/newsletter/",
		icon: "newsletter",
		isCompact: true,
		pageTitle: `Newsletter | ${SITE_NAME}`,
		eyebrow: "Email updates",
		description: "Newsletter issues and subscription.",
	},
} as const;

export const WRITING_PAGE_POST_LIMIT = 5;

export const MAIN_NAV = [
	MAIN_PAGES.writing,
	MAIN_PAGES.commonplace,
	MAIN_PAGES.garden,
	MAIN_PAGES.archive,
	MAIN_PAGES.newsletter,
];
