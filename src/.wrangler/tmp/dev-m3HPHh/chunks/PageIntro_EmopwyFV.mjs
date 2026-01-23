globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createAstro, c as createComponent, m as maybeRenderHead, a as renderTemplate, h as renderSlot } from './astro/server_BqNpRBsA.mjs';
/* empty css                          */

const $$Astro = createAstro("https://marginem.io");
const $$PageIntro = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PageIntro;
  const { eyebrow = "", title, description = "" } = Astro2.props;
  const hasSlot = Astro2.slots.has("description");
  const hasDescription = description !== "";
  return renderTemplate`${maybeRenderHead()}<header class="page-intro" data-astro-cid-xdli4msg> ${eyebrow ? renderTemplate`<p class="page-intro__eyebrow eyebrow-text" data-astro-cid-xdli4msg>${eyebrow}</p>` : null} <h1 data-astro-cid-xdli4msg>${title}</h1> ${hasSlot ? renderTemplate`<div class="page-intro__lede" data-astro-cid-xdli4msg> ${renderSlot($$result, $$slots["description"])} </div>` : hasDescription ? renderTemplate`<p class="page-intro__lede" data-astro-cid-xdli4msg>${description}</p>` : null} </header> `;
}, "/Users/toby/projects/blogupdate/src/components/PageIntro.astro", void 0);

export { $$PageIntro as $ };
