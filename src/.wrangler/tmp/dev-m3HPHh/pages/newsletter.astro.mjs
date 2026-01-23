globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BqNpRBsA.mjs';
import { $ as $$BaseLayout, S as SITE_NAME } from '../chunks/BaseLayout_DZuWQT-G.mjs';
import { $ as $$PageIntro } from '../chunks/PageIntro_EmopwyFV.mjs';
import { $ as $$ArchiveEntry } from '../chunks/ArchiveEntry_BQekx2PR.mjs';
import { $ as $$SubscribeForm } from '../chunks/SubscribeForm_DdE-_i99.mjs';
import { g as getCollection } from '../chunks/_astro_content_B52p1QOJ.mjs';
/* empty css                                 */
export { r as renderers } from '../chunks/_@astro-renderers_CVR09bb6.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const title = `Newsletter | ${SITE_NAME}`;
  const newsletters = (await getCollection("newsletter", ({ data }) => !data.draft)).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": "Newsletter archive", "hero": "Newsletter", "showHero": false, "activePage": "Newsletter", "data-astro-cid-4ptckbda": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PageIntro", $$PageIntro, { "eyebrow": "Newsletter", "title": "Newsletter archive", "description": "Every issue, with MDX formatting, available to browse at any time.", "data-astro-cid-4ptckbda": true })} ${maybeRenderHead()}<section class="newsletter-archive" data-astro-cid-4ptckbda> <div class="newsletter-archive__list" data-astro-cid-4ptckbda> ${newsletters.length ? newsletters.map((entry) => renderTemplate`${renderComponent($$result2, "ArchiveEntry", $$ArchiveEntry, { "title": `Issue ${entry.data.issueNumber}: ${entry.data.title}`, "url": `/newsletter/${entry.slug}/`, "date": entry.data.pubDate, "description": entry.data.description, "tags": entry.data.tags, "data-astro-cid-4ptckbda": true })}`) : renderTemplate`<p class="newsletter-archive__empty" data-astro-cid-4ptckbda>
No newsletters yet. Subscribe to get the first issue.
</p>`} </div> <div class="newsletter-archive__subscribe" data-astro-cid-4ptckbda> <h2 data-astro-cid-4ptckbda>Stay in the loop</h2> ${renderComponent($$result2, "SubscribeForm", $$SubscribeForm, { "variant": "compact", "redirectUrl": "/subscribe/confirmed", "data-astro-cid-4ptckbda": true })} </div> </section> ` })} `;
}, "/Users/toby/projects/blogupdate/src/pages/newsletter/index.astro", void 0);

const $$file = "/Users/toby/projects/blogupdate/src/pages/newsletter/index.astro";
const $$url = "/newsletter";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
