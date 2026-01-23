globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createAstro, c as createComponent, r as renderComponent, a as renderTemplate } from './astro/server_BqNpRBsA.mjs';
import { T as Tag } from './DateStamp_XX4c57rd.mjs';

const $$Astro = createAstro("https://marginem.io");
const $$Tag = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Tag;
  const props = Astro2.props;
  return renderTemplate`${renderComponent($$result, "PreactTag", Tag, { ...props })}`;
}, "/Users/toby/projects/blogupdate/src/components/Tag.astro", void 0);

export { $$Tag as $ };
