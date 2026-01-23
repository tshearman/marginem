globalThis.process ??= {}; globalThis.process.env ??= {};
import { w as createVNode, F as Fragment, aF as __astro_tag_component__ } from './astro/server_BqNpRBsA.mjs';

const frontmatter = {
  "title": "Establishing the signal",
  "description": "A first note on what this newsletter will cover and how it will evolve.",
  "pubDate": "2025-02-01T00:00:00.000Z",
  "issueNumber": 0,
  "tags": ["newsletter", "issue-0"],
  "draft": false,
  "sent": true,
  "sentAt": "2026-01-22T22:46:50.344Z",
  "broadcast_id": "66f988b3-d88c-4b4d-b599-d81164fc2269"
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "what-youll-get",
    "text": "What you’ll get"
  }, {
    "depth": 2,
    "slug": "what-you-wont-get",
    "text": "What you won’t get"
  }, {
    "depth": 2,
    "slug": "next-up",
    "text": "Next up"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    blockquote: "blockquote",
    h2: "h2",
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Welcome to Issue 0. This is a short calibration note: what to expect, how often to expect it, and why it exists."
    }), "\n", createVNode(_components.h2, {
      id: "what-youll-get",
      children: "What you’ll get"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "New essays and research notes."
      }), "\n", createVNode(_components.li, {
        children: "Small experiments in visualization."
      }), "\n", createVNode(_components.li, {
        children: "Links to ideas worth keeping close."
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "what-you-wont-get",
      children: "What you won’t get"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Marketing fluff."
      }), "\n", createVNode(_components.li, {
        children: "Daily noise."
      }), "\n", createVNode(_components.li, {
        children: "Anything you didn’t ask for."
      }), "\n"]
    }), "\n", createVNode(_components.blockquote, {
      children: ["\n", createVNode(_components.p, {
        children: "If you made it this far, you’re already part of the rhythm. Thanks for reading."
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "next-up",
      children: "Next up"
    }), "\n", createVNode(_components.p, {
      children: ["The first full issue will cover a pair of essays on relaxed variational problems, plus a quick note on a visualization experiment from the garden. For now, here is the most recent post: ", createVNode(_components.a, {
        href: "/posts/feature-playground/",
        children: "Feature playground"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "Until then,"
    }), "\n", createVNode(_components.p, {
      children: "— Toby"
    })]
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

const url = "src/content/newsletter/issue-0.mdx";
const file = "/Users/toby/projects/blogupdate/src/content/newsletter/issue-0.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/toby/projects/blogupdate/src/content/newsletter/issue-0.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
