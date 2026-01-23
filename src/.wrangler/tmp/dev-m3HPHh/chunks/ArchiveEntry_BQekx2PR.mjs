globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, r as renderComponent, a as renderTemplate } from './astro/server_BqNpRBsA.mjs';
import { $ as $$Tag } from './Tag_D7vQK9ZA.mjs';
import { $ as $$DateStamp } from './DateStamp_DdkmcWAu.mjs';
import { e as ellipsizeText } from './text_PA2R3DHY.mjs';
import { f as formatDate } from './date_BrhOgWe1.mjs';
/* empty css                         */

const $$Astro = createAstro("https://marginem.io");
const $$ArchiveEntry = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ArchiveEntry;
  const {
    title,
    url,
    date,
    description = "",
    abstract = "",
    tags = [],
    class: className = ""
  } = Astro2.props;
  const dateLabel = formatDate(date, { month: "long"});
  const preview = ellipsizeText(abstract || description || "", 220);
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(`archive-entry ${className}`, "class")}${addAttribute(JSON.stringify(tags), "data-tags")} data-astro-cid-hp32yzb2> <div class="archive-entry__meta" data-astro-cid-hp32yzb2> ${renderComponent($$result, "DateStamp", $$DateStamp, { "datetime": date, "label": dateLabel, "data-astro-cid-hp32yzb2": true })} </div> <div class="archive-entry__body" data-astro-cid-hp32yzb2> <h3 class="archive-entry__title" data-astro-cid-hp32yzb2> <a${addAttribute(url, "href")} data-astro-cid-hp32yzb2>${title}</a> </h3> ${preview ? renderTemplate`<p class="archive-entry__excerpt" data-astro-cid-hp32yzb2>${preview}</p>` : null} ${tags.length ? renderTemplate`<div class="archive-entry__tags" data-astro-cid-hp32yzb2> ${tags.map((tag) => renderTemplate`${renderComponent($$result, "Tag", $$Tag, { "tag": tag, "variant": "filter", "size": "small", "data-astro-cid-hp32yzb2": true })}`)} </div>` : null} </div> </article> `;
}, "/Users/toby/projects/blogupdate/src/components/ArchiveEntry.astro", void 0);

export { $$ArchiveEntry as $ };
