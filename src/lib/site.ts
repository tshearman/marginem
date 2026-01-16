export const SITE_NAME = "Notebook";

export const MAIN_PAGES = {
  writing: {
    label: "Writing",
    href: "/",
    pageTitle: "Writing",
    eyebrow: "Essays and field notes",
    description: "Essays, research notes, and experiments.",
  },
  commonplace: {
    label: "Commonplace",
    href: "/commonplace/",
    pageTitle: `Commonplace | ${SITE_NAME}`,
    eyebrow: "Collected fragments",
    description: "Collected passages, marginalia, and fragments.",
  },
  garden: {
    label: "Garden",
    href: "/garden/",
    pageTitle: `Garden | ${SITE_NAME}`,
    eyebrow: "Linked vault notes",
    description:
      "Notes are imported from the OBSIDIAN_VAULT path at build time, keeping Obsidian and the site in sync.",
  },
  archive: {
    label: "Archive",
    href: "/archive/",
    pageTitle: `Archive | ${SITE_NAME}`,
    eyebrow: "Full writing index",
    description: "Browse every note and essay, organized by year.",
  },
} as const;

export const MAIN_NAV = [
  MAIN_PAGES.writing,
  MAIN_PAGES.commonplace,
  MAIN_PAGES.garden,
  MAIN_PAGES.archive,
];
