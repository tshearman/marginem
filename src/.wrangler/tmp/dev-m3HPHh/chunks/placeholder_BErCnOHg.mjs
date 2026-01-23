globalThis.process ??= {}; globalThis.process.env ??= {};
import { w as createVNode, F as Fragment, aF as __astro_tag_component__ } from './astro/server_BqNpRBsA.mjs';

const frontmatter = {
  "draft": true
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    p: "p",
    ...props.components
  };
  return createVNode(_components.p, {
    children: "Placeholder snippet collection entry."
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
const url = "src/content/snippets/placeholder.mdx";
const file = "/Users/toby/projects/blogupdate/src/content/snippets/placeholder.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/toby/projects/blogupdate/src/content/snippets/placeholder.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
