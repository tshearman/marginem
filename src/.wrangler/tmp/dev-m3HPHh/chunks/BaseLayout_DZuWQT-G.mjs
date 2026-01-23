globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, m as maybeRenderHead, b as renderScript, a as renderTemplate, e as createAstro, r as renderComponent, d as addAttribute, q as renderHead, h as renderSlot } from './astro/server_BqNpRBsA.mjs';
/* empty css                          */

const $$Search = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="nav-search" data-astro-cid-otpdt6jm> <button id="search-trigger" class="nav-search__trigger" type="button" aria-label="Search articles and notes" data-astro-cid-otpdt6jm> <svg class="nav-search__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-astro-cid-otpdt6jm> <circle cx="11" cy="11" r="8" data-astro-cid-otpdt6jm></circle> <path d="m21 21-4.35-4.35" data-astro-cid-otpdt6jm></path> </svg> <span class="nav-search__text" data-astro-cid-otpdt6jm>Search</span> <span class="nav-search__shortcut" data-astro-cid-otpdt6jm>/</span> </button> </div> <div id="search-modal" class="search-modal" hidden aria-hidden="true" data-astro-cid-otpdt6jm> <div id="search-overlay" class="search-modal__overlay" tabindex="-1" data-astro-cid-otpdt6jm></div> <div class="search-modal__panel" role="dialog" aria-modal="true" aria-labelledby="search-heading" data-astro-cid-otpdt6jm> <div class="search-modal__header" data-astro-cid-otpdt6jm> <div class="search-modal__field" data-astro-cid-otpdt6jm> <svg class="search-modal__field-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-astro-cid-otpdt6jm> <circle cx="11" cy="11" r="8" data-astro-cid-otpdt6jm></circle> <path d="m21 21-4.35-4.35" data-astro-cid-otpdt6jm></path> </svg> <input id="search-input" class="search-modal__input" type="text" placeholder="Search posts, tags, and text…" autocomplete="off" aria-label="Search site content" data-astro-cid-otpdt6jm> </div> <button id="search-close" class="search-modal__close" type="button" aria-label="Close search" data-astro-cid-otpdt6jm> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-astro-cid-otpdt6jm> <line x1="18" y1="6" x2="6" y2="18" data-astro-cid-otpdt6jm></line> <line x1="6" y1="6" x2="18" y2="18" data-astro-cid-otpdt6jm></line> </svg> </button> </div> <div id="search-results" class="search-modal__results" aria-live="polite" data-astro-cid-otpdt6jm> <div class="search-modal__placeholder" data-astro-cid-otpdt6jm>
Type to search the entire archive.
</div> </div> </div> </div>  ${renderScript($$result, "/Users/toby/projects/blogupdate/src/components/Search.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/toby/projects/blogupdate/src/components/Search.astro", void 0);

const $$IconWriting = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"> <path d="M6 4h8l4 4v12H6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path> <path d="M14 4v4h4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path> <path d="M4.5 18.5l7-7 2.5 2.5-7 7H4.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path> </svg>`;
}, "/Users/toby/projects/blogupdate/src/components/icons/IconWriting.astro", void 0);

const $$IconCommonplace = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"> <g transform="scale(0.75)"> <path d="M6.67,26.06c.09,0,8.77-.14,8.77-11.89A7.22,7.22,0,1,0,5.67,20.9v4.16A1,1,0,0,0,6.67,26.06ZM3,14.17a5.22,5.22,0,1,1,10.44,0c0,7.5-3.88,9.31-5.77,9.75V20.17a1,1,0,0,0-.75-1A5.21,5.21,0,0,1,3,14.17Z"></path> <path d="M22.22,26.06c.09,0,8.78-.14,8.78-11.89a7.22,7.22,0,1,0-9.78,6.73v4.16A1,1,0,0,0,22.22,26.06ZM18.56,14.17a5.22,5.22,0,1,1,10.44,0c0,7.5-3.89,9.31-5.78,9.75V20.17a1,1,0,0,0-.75-1A5.21,5.21,0,0,1,18.56,14.17Z"></path> </g> </svg>`;
}, "/Users/toby/projects/blogupdate/src/components/icons/IconCommonplace.astro", void 0);

const $$IconGarden = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor" stroke-width="0.1"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.707,21.707,6.674,18.74a7.533,7.533,0,0,0,4.2,1.23,8.886,8.886,0,0,0,6.332-2.763C21.019,13.4,21.958,3.51,22,3.09a1,1,0,0,0-.289-.8,1.013,1.013,0,0,0-.8-.289,45.808,45.808,0,0,0-5.7.961,1,1,0,0,0-.714.64l-.649,1.834-.539-1.085a1,1,0,0,0-1.219-.5,13.782,13.782,0,0,0-5.295,2.94C3.224,10.362,3.579,14.857,5.26,17.326L2.293,20.293a1,1,0,0,0,1.414,1.414Zm4.5-13.5a10.7,10.7,0,0,1,3.705-2.164l1.192,2.4A.98.98,0,0,0,14.061,9a1,1,0,0,0,.881-.665L16.2,4.791c1.445-.318,2.758-.525,3.66-.647-.367,2.694-1.48,9.066-4.063,11.649-2.788,2.788-5.945,2.457-7.668,1.5l4.582-4.582a1,1,0,0,0-1.414-1.414L6.711,15.875C5.751,14.151,5.42,11,8.207,8.207Z"></path> </svg>`;
}, "/Users/toby/projects/blogupdate/src/components/icons/IconGarden.astro", void 0);

const $$IconArchive = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.66333L20.25 7.7398V17.01L12 21.0865L3.75 17.01V7.7398L12 3.66333ZM5.25 9.41292V16.078L11.25 19.0427V12.3776L5.25 9.41292ZM12.75 12.3776V19.0427L18.75 16.078V9.41292L16.5 10.5247V13.4999L15 14.2499V11.2659L12.75 12.3776ZM17.807 8.20577L15.8527 9.17139C15.8099 9.13606 15.7624 9.10498 15.7106 9.07908L10.1015 6.27454L12 5.33645L17.807 8.20577ZM8.41452 7.1081L14.1871 9.9944L12 11.0751L6.19304 8.20577L8.41452 7.1081Z"></path> </svg>`;
}, "/Users/toby/projects/blogupdate/src/components/icons/IconArchive.astro", void 0);

const $$IconNewsletter = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false"> <path d="M4 5.5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Z" fill="none" stroke="currentColor" stroke-width="1.5"></path> <path d="M4 7.5l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </svg>`;
}, "/Users/toby/projects/blogupdate/src/components/icons/IconNewsletter.astro", void 0);

const SITE_NAME = "Ad Marginem";
const MAIN_PAGES = {
  writing: {
    label: "Writing",
    href: "/",
    icon: "writing",
    isCompact: false,
    pageTitle: `Writing | ${SITE_NAME}`,
    eyebrow: "Essays and field notes",
    description: "Essays, research notes, and experiments."
  },
  commonplace: {
    label: "Commonplace",
    href: "/commonplace/",
    icon: "commonplace",
    isCompact: false,
    pageTitle: `Commonplace | ${SITE_NAME}`,
    eyebrow: "Collected fragments",
    description: "Collected passages, adversaria, and fragments."
  },
  garden: {
    label: "Garden",
    href: "/garden/",
    icon: "garden",
    isCompact: false,
    pageTitle: `Garden | ${SITE_NAME}`,
    eyebrow: "Linked vault notes",
    description: "Notes are imported from the configured Obsidian vault path at build time, keeping Obsidian and the site in sync."
  },
  archive: {
    label: "Archive",
    href: "/archive/",
    icon: "archive",
    isCompact: true,
    pageTitle: `Archive | ${SITE_NAME}`,
    eyebrow: "Full writing index",
    description: "Browse every note and essay, organized by year."
  },
  newsletter: {
    label: "Newsletter",
    href: "/newsletter/",
    icon: "newsletter",
    isCompact: true,
    pageTitle: `Newsletter | ${SITE_NAME}`,
    eyebrow: "Email updates",
    description: "Newsletter issues and subscription."
  }
};
const WRITING_PAGE_POST_LIMIT = 5;
const MAIN_NAV = [MAIN_PAGES.writing, MAIN_PAGES.commonplace, MAIN_PAGES.garden, MAIN_PAGES.archive, MAIN_PAGES.newsletter];

const $$Astro$1 = createAstro("https://marginem.io");
const $$SiteNav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SiteNav;
  const { activePage } = Astro2.props;
  const ICONS = {
    writing: $$IconWriting,
    commonplace: $$IconCommonplace,
    garden: $$IconGarden,
    archive: $$IconArchive,
    newsletter: $$IconNewsletter
  };
  return renderTemplate`${maybeRenderHead()}<nav class="site-nav" data-astro-cid-4lunwx2e> <div class="site-nav__links" data-astro-cid-4lunwx2e> ${MAIN_NAV.map((item) => {
    const isActive = activePage ? item.label.toLowerCase() === activePage.toLowerCase() : false;
    const Icon = ICONS[item.icon] ?? $$IconGarden;
    const linkClass = [
      isActive ? "is-active" : null,
      item.isCompact ? "is-compact" : null
    ].filter(Boolean).join(" ");
    return renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(linkClass || void 0, "class")} data-astro-cid-4lunwx2e> <span class="site-nav__text" data-astro-cid-4lunwx2e>${item.label}</span> <span class="site-nav__icon" data-astro-cid-4lunwx2e> ${renderComponent($$result, "Icon", Icon, { "data-astro-cid-4lunwx2e": true })} </span> </a>`;
  })} </div> <div class="site-nav__search" data-astro-cid-4lunwx2e> ${renderComponent($$result, "Search", $$Search, { "data-astro-cid-4lunwx2e": true })} </div> </nav> `;
}, "/Users/toby/projects/blogupdate/src/components/SiteNav.astro", void 0);

const favicon = new Proxy({"src":"/_astro/favicon.Cx45KcSk.png","width":192,"height":192,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/toby/projects/blogupdate/src/assets/favicon.png";
							}
							
							return target[name];
						}
					});

const $$Astro = createAstro("https://marginem.io");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title = SITE_NAME,
    description = "Explorations in math, code, and visualization",
    hero = SITE_NAME,
    showHero = true,
    includeFootnotes = false,
    activePage
  } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-37fxchfa> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="icon"${addAttribute(favicon.src, "href")} type="image/png">${renderHead()}</head> <body data-astro-cid-37fxchfa> ${renderComponent($$result, "SiteNav", $$SiteNav, { "activePage": activePage, "data-astro-cid-37fxchfa": true })} <main class="site-main" data-astro-cid-37fxchfa> ${showHero && renderTemplate`<header class="site-header" data-astro-cid-37fxchfa> <p class="eyebrow-text" data-astro-cid-37fxchfa>${description}</p> <h1 data-astro-cid-37fxchfa>${hero}</h1> </header>`} ${renderSlot($$result, $$slots["default"])} <footer class="site-footer" data-astro-cid-37fxchfa></footer> </main> ${includeFootnotes ? renderTemplate`${renderScript($$result, "/Users/toby/projects/blogupdate/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts")}` : null} </body> </html> `;
}, "/Users/toby/projects/blogupdate/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, MAIN_PAGES as M, SITE_NAME as S, WRITING_PAGE_POST_LIMIT as W };
