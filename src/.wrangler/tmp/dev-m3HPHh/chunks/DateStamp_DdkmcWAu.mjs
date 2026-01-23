globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate } from './astro/server_BqNpRBsA.mjs';
import { D as DateStamp } from './DateStamp_XX4c57rd.mjs';
/* empty css                         */

const $$Astro = createAstro("https://marginem.io");
const $$DateStamp = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DateStamp;
  const { datetime, label = "", class: className } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "PreactDateStamp", DateStamp, { "datetime": datetime, "label": label, "className": className, "data-astro-cid-jvfoipnu": true })} `;
}, "/Users/toby/projects/blogupdate/src/components/DateStamp.astro", void 0);

export { $$DateStamp as $ };
