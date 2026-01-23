globalThis.process ??= {}; globalThis.process.env ??= {};
import { c as createComponent, e as createAstro, m as maybeRenderHead, d as addAttribute, b as renderScript, a as renderTemplate, h as renderSlot, w as createVNode, F as Fragment, aF as __astro_tag_component__ } from './astro/server_BqNpRBsA.mjs';
/* empty css                                                                   */
/* empty css                                                                  */
import { p as phasesImage } from './phases_7Ua7yBqL.mjs';

const $$Astro$2 = createAstro("https://marginem.io");
const $$PlotlyChart = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$PlotlyChart;
  const { data = [], layout = {}, config = {} } = Astro2.props;
  const layoutHeight = typeof layout.height === "number" && Number.isFinite(layout.height) ? layout.height : void 0;
  const chartStyle = [
    "width: 100%",
    layoutHeight !== void 0 ? `height: ${layoutHeight}px` : "min-height: 320px"
  ].join(" ");
  const chartId = `plotly-${globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;
  const combinedConfig = {
    displayModeBar: false,
    showTips: false,
    responsive: true,
    ...config
  };
  const payloadAttr = JSON.stringify({
    data,
    layout,
    config: combinedConfig
  }).replace(/</g, "\\u003c");
  return renderTemplate`${maybeRenderHead()}<div class="plotly-shell" data-astro-cid-ztg623zm> <div${addAttribute(chartId, "id")} class="plotly-chart"${addAttribute(chartStyle, "style")}${addAttribute(payloadAttr, "data-plotly")} data-astro-cid-ztg623zm></div> </div> ${renderScript($$result, "/Users/toby/projects/blogupdate/src/components/PlotlyChart.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/toby/projects/blogupdate/src/components/PlotlyChart.astro", void 0);

const $$Astro$1 = createAstro("https://marginem.io");
const $$MarginNote = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MarginNote;
  const { title = "Note" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<aside class="margin-note" data-astro-cid-w6f27h4z> <strong data-astro-cid-w6f27h4z>${title}</strong> ${renderSlot($$result, $$slots["default"])} </aside> `;
}, "/Users/toby/projects/blogupdate/src/components/MarginNote.astro", void 0);

const $$Astro = createAstro("https://marginem.io");
const $$ImageFigure = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ImageFigure;
  const { src, alt = "", caption, height } = Astro2.props;
  const heightValue = typeof height === "number" ? `${height}px` : height ?? void 0;
  return renderTemplate`${maybeRenderHead()}<figure> <img${addAttribute(src, "src")}${addAttribute(alt, "alt")} loading="lazy"${addAttribute(heightValue ? `height: ${heightValue};` : void 0, "style")}> ${caption ? renderTemplate`<figcaption>${caption}</figcaption>` : null} </figure>`;
}, "/Users/toby/projects/blogupdate/src/components/ImageFigure.astro", void 0);

const frontmatter = {
  "title": "Feature Playground: runnable code, math, notes, and media",
  "description": "A placeholder post that exercises runnable snippets, math, margin notes, responsive figures, and an embedded Plotly chart.",
  "abstract": "Demonstrates every blog affordance in one place: multi-language run blocks, KaTeX, margin notes/footnotes, images, and Plotly.",
  "pubDate": "2024-12-15",
  "heroImage": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80",
  "tags": ["demo", "playground", "testing"],
  "draft": false,
  "featured": false
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "why-this-exists",
    "text": "Why this exists"
  }, {
    "depth": 2,
    "slug": "runnable-snippets-across-languages",
    "text": "Runnable snippets across languages"
  }, {
    "depth": 2,
    "slug": "footnotes",
    "text": "Footnotes"
  }, {
    "depth": 2,
    "slug": "math",
    "text": "Math"
  }, {
    "depth": 2,
    "slug": "images-local--remote",
    "text": "Images (local + remote)"
  }, {
    "depth": 2,
    "slug": "plotly-sample-chart",
    "text": "Plotly sample chart"
  }, {
    "depth": 2,
    "slug": "markdown-preview-rendered-samples",
    "text": "Markdown preview (rendered samples)"
  }, {
    "depth": 3,
    "slug": "headings-emphasis-links",
    "text": "Headings, emphasis, links"
  }, {
    "depth": 3,
    "slug": "lists",
    "text": "Lists"
  }, {
    "depth": 3,
    "slug": "blockquote",
    "text": "Blockquote"
  }, {
    "depth": 3,
    "slug": "code-fence-static",
    "text": "Code fence (static)"
  }, {
    "depth": 3,
    "slug": "table",
    "text": "Table"
  }, {
    "depth": 3,
    "slug": "horizontal-rule",
    "text": "Horizontal rule"
  }, {
    "depth": 2,
    "slug": "footnote-label",
    "text": "Footnotes"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    annotation: "annotation",
    blockquote: "blockquote",
    code: "code",
    em: "em",
    h2: "h2",
    h3: "h3",
    hr: "hr",
    input: "input",
    li: "li",
    math: "math",
    mfrac: "mfrac",
    mi: "mi",
    mn: "mn",
    mo: "mo",
    mrow: "mrow",
    msqrt: "msqrt",
    msubsup: "msubsup",
    msup: "msup",
    mtext: "mtext",
    ol: "ol",
    p: "p",
    path: "path",
    pre: "pre",
    section: "section",
    semantics: "semantics",
    span: "span",
    strong: "strong",
    sup: "sup",
    svg: "svg",
    table: "table",
    tbody: "tbody",
    td: "td",
    th: "th",
    thead: "thead",
    tr: "tr",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h2, {
      id: "why-this-exists",
      children: "Why this exists"
    }), "\n", createVNode(_components.p, {
      children: ["This placeholder gathers every blog feature in one spot so you can sanity-check rendering, runnable code, and layout", createVNode(_components.sup, {
        children: createVNode(_components.a, {
          href: "#user-content-fn-why-now",
          id: "user-content-fnref-why-now",
          "data-footnote-ref": "",
          "aria-describedby": "footnote-label",
          children: "1"
        })
      }), ". It pairs inline math like ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.msup, {
                  children: [createVNode(_components.mi, {
                    children: "e"
                  }), createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "i"
                    }), createVNode(_components.mi, {
                      children: "π"
                    })]
                  })]
                }), createVNode(_components.mo, {
                  children: "+"
                }), createVNode(_components.mn, {
                  children: "1"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mn, {
                  children: "0"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "e^{i\\pi} + 1 = 0"
              })]
            })
          })
        }), createVNode(_components.span, {
          class: "katex-html",
          "aria-hidden": "true",
          children: [createVNode(_components.span, {
            class: "base",
            children: [createVNode(_components.span, {
              class: "strut",
              style: {
                height: "0.908em",
                verticalAlign: "-0.0833em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                children: "e"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t",
                  children: createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.8247em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-3.063em",
                          marginRight: "0.05em"
                        },
                        children: [createVNode(_components.span, {
                          class: "pstrut",
                          style: {
                            height: "2.7em"
                          }
                        }), createVNode(_components.span, {
                          class: "sizing reset-size6 size3 mtight",
                          children: createVNode(_components.span, {
                            class: "mord mtight",
                            children: createVNode(_components.span, {
                              class: "mord mathnormal mtight",
                              style: {
                                marginRight: "0.03588em"
                              },
                              children: "iπ"
                            })
                          })
                        })]
                      })
                    })
                  })
                })
              })]
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2222em"
              }
            }), createVNode(_components.span, {
              class: "mbin",
              children: "+"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2222em"
              }
            })]
          }), createVNode(_components.span, {
            class: "base",
            children: [createVNode(_components.span, {
              class: "strut",
              style: {
                height: "0.6444em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: "1"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2778em"
              }
            }), createVNode(_components.span, {
              class: "mrel",
              children: "="
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2778em"
              }
            })]
          }), createVNode(_components.span, {
            class: "base",
            children: [createVNode(_components.span, {
              class: "strut",
              style: {
                height: "0.6444em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: "0"
            })]
          })]
        })]
      }), " with margin notes, images, and an interactive Plotly chart for quick visual QA."]
    }), "\n", createVNode($$MarginNote, {
      title: "Quick check",
      children: createVNode(_components.p, {
        children: "Viewing on desktop floats this note into the margin; on mobile it stacks inline."
      })
    }), "\n", createVNode(_components.h2, {
      id: "runnable-snippets-across-languages",
      children: "Runnable snippets across languages"
    }), "\n", createVNode(_components.p, {
      children: "Code blocks are run at build time to verify their accuracy, allowing for tests and checks. Results are rendered into the page as well. Code that doesn’t compile, run, or pass tests will cause the build of the site to fail."
    }), "\n", createVNode(_components.p, {
      children: "JavaScript runs in a sandbox during the build, so you can surface small reproducible examples without shipping extra scripts."
    }), "\n", createVNode(_components.pre, {
      class: "language-js language-js",
      "data-language": "js",
      children: createVNode(_components.code, {
        "is:raw": "",
        class: "language-js code-highlight",
        children: [createVNode(_components.span, {
          class: "code-line line-number",
          line: "1",
          children: [createVNode(_components.span, {
            class: "token keyword",
            children: "const"
          }), " readings ", createVNode(_components.span, {
            class: "token operator",
            children: "="
          }), " ", createVNode(_components.span, {
            class: "token punctuation",
            children: "["
          }), createVNode(_components.span, {
            class: "token number",
            children: "3"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ","
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "4"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ","
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "6"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ","
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "8"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: "]"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ";"
          }), "\n"]
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "2",
          children: [createVNode(_components.span, {
            class: "token keyword",
            children: "const"
          }), " average ", createVNode(_components.span, {
            class: "token operator",
            children: "="
          }), " readings", createVNode(_components.span, {
            class: "token punctuation",
            children: "."
          }), createVNode(_components.span, {
            class: "token method function property-access",
            children: "reduce"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: "("
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: "("
          }), createVNode(_components.span, {
            class: "token parameter",
            children: ["sum", createVNode(_components.span, {
              class: "token punctuation",
              children: ","
            }), " n"]
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ")"
          }), " ", createVNode(_components.span, {
            class: "token arrow operator",
            children: "=>"
          }), " sum ", createVNode(_components.span, {
            class: "token operator",
            children: "+"
          }), " n", createVNode(_components.span, {
            class: "token punctuation",
            children: ","
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "0"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ")"
          }), " ", createVNode(_components.span, {
            class: "token operator",
            children: "/"
          }), " readings", createVNode(_components.span, {
            class: "token punctuation",
            children: "."
          }), createVNode(_components.span, {
            class: "token property-access",
            children: "length"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ";"
          }), "\n"]
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "3",
          children: [createVNode(_components.span, {
            class: "token console class-name",
            children: "console"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: "."
          }), createVNode(_components.span, {
            class: "token method function property-access",
            children: "log"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: "("
          }), createVNode(_components.span, {
            class: "token string",
            children: "\"mean reading\""
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ","
          }), " average", createVNode(_components.span, {
            class: "token punctuation",
            children: "."
          }), createVNode(_components.span, {
            class: "token method function property-access",
            children: "toFixed"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: "("
          }), createVNode(_components.span, {
            class: "token number",
            children: "2"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ")"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ")"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ";"
          }), "\n"]
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "4",
          children: "\n"
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "5",
          children: "\n"
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "6",
          children: [createVNode(_components.span, {
            class: "token operator",
            children: ">"
          }), " mean reading ", createVNode(_components.span, {
            class: "token number",
            children: "5.25"
          }), "\n"]
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "7",
          children: [createVNode(_components.span, {
            class: "token operator",
            children: ">"
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "1"
          }), "\n"]
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: "Python is supported too."
    }), "\n", createVNode(_components.pre, {
      class: "language-python language-python",
      "data-language": "python",
      children: createVNode(_components.code, {
        "is:raw": "",
        class: "language-python code-highlight",
        children: [createVNode(_components.span, {
          class: "code-line line-number",
          line: "1",
          children: [createVNode(_components.span, {
            class: "token keyword",
            children: "from"
          }), " statistics ", createVNode(_components.span, {
            class: "token keyword",
            children: "import"
          }), " mean", createVNode(_components.span, {
            class: "token punctuation",
            children: ","
          }), " median\n"]
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "2",
          children: "\n"
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "3",
          children: ["samples ", createVNode(_components.span, {
            class: "token operator",
            children: "="
          }), " ", createVNode(_components.span, {
            class: "token punctuation",
            children: "["
          }), createVNode(_components.span, {
            class: "token number",
            children: "1"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ","
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "3"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ","
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "5"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ","
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "7"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ","
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "9"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: "]"
          }), "\n"]
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "4",
          children: [createVNode(_components.span, {
            class: "token keyword",
            children: "print"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: "("
          }), createVNode(_components.span, {
            class: "token string-interpolation",
            children: [createVNode(_components.span, {
              class: "token string",
              children: "f\"mean="
            }), createVNode(_components.span, {
              class: "token interpolation",
              children: [createVNode(_components.span, {
                class: "token punctuation",
                children: "{"
              }), "mean", createVNode(_components.span, {
                class: "token punctuation",
                children: "("
              }), "samples", createVNode(_components.span, {
                class: "token punctuation",
                children: ")"
              }), createVNode(_components.span, {
                class: "token punctuation",
                children: ":"
              }), createVNode(_components.span, {
                class: "token format-spec",
                children: ".1f"
              }), createVNode(_components.span, {
                class: "token punctuation",
                children: "}"
              })]
            }), createVNode(_components.span, {
              class: "token string",
              children: ", median="
            }), createVNode(_components.span, {
              class: "token interpolation",
              children: [createVNode(_components.span, {
                class: "token punctuation",
                children: "{"
              }), "median", createVNode(_components.span, {
                class: "token punctuation",
                children: "("
              }), "samples", createVNode(_components.span, {
                class: "token punctuation",
                children: ")"
              }), createVNode(_components.span, {
                class: "token punctuation",
                children: "}"
              })]
            }), createVNode(_components.span, {
              class: "token string",
              children: "\""
            })]
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ")"
          }), "\n"]
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "5",
          children: [createVNode(_components.span, {
            class: "token keyword",
            children: "assert"
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "1"
          }), " ", createVNode(_components.span, {
            class: "token operator",
            children: "=="
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "1"
          }), "\n"]
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "6",
          children: "\n"
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "7",
          children: "\n"
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "8",
          children: [createVNode(_components.span, {
            class: "token operator",
            children: ">"
          }), " mean", createVNode(_components.span, {
            class: "token operator",
            children: "="
          }), createVNode(_components.span, {
            class: "token number",
            children: "5.0"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ","
          }), " median", createVNode(_components.span, {
            class: "token operator",
            children: "="
          }), createVNode(_components.span, {
            class: "token number",
            children: "5"
          }), "\n"]
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: "Haskell snippets compile and run during the build. Keep them self-contained:"
    }), "\n", createVNode(_components.pre, {
      class: "language-haskell language-haskell",
      "data-language": "haskell",
      children: createVNode(_components.code, {
        "is:raw": "",
        class: "language-haskell code-highlight",
        children: [createVNode(_components.span, {
          class: "code-line line-number",
          line: "1",
          children: [createVNode(_components.span, {
            class: "token hvariable",
            children: "fib"
          }), " ", createVNode(_components.span, {
            class: "token operator",
            children: "::"
          }), " ", createVNode(_components.span, {
            class: "token constant",
            children: "Int"
          }), " ", createVNode(_components.span, {
            class: "token operator",
            children: "->"
          }), " ", createVNode(_components.span, {
            class: "token constant",
            children: "Int"
          }), "\n"]
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "2",
          children: [createVNode(_components.span, {
            class: "token hvariable",
            children: "fib"
          }), " ", createVNode(_components.span, {
            class: "token hvariable",
            children: "n"
          }), "\n"]
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "3",
          children: ["  ", createVNode(_components.span, {
            class: "token operator",
            children: "|"
          }), " ", createVNode(_components.span, {
            class: "token hvariable",
            children: "n"
          }), " ", createVNode(_components.span, {
            class: "token operator",
            children: "<="
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "1"
          }), " ", createVNode(_components.span, {
            class: "token operator",
            children: "="
          }), " ", createVNode(_components.span, {
            class: "token hvariable",
            children: "n"
          }), "\n"]
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "4",
          children: ["  ", createVNode(_components.span, {
            class: "token operator",
            children: "|"
          }), " ", createVNode(_components.span, {
            class: "token builtin",
            children: "otherwise"
          }), " ", createVNode(_components.span, {
            class: "token operator",
            children: "="
          }), " ", createVNode(_components.span, {
            class: "token hvariable",
            children: "fib"
          }), " ", createVNode(_components.span, {
            class: "token punctuation",
            children: "("
          }), createVNode(_components.span, {
            class: "token hvariable",
            children: "n"
          }), " ", createVNode(_components.span, {
            class: "token operator",
            children: "-"
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "1"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ")"
          }), " ", createVNode(_components.span, {
            class: "token operator",
            children: "+"
          }), " ", createVNode(_components.span, {
            class: "token hvariable",
            children: "fib"
          }), " ", createVNode(_components.span, {
            class: "token punctuation",
            children: "("
          }), createVNode(_components.span, {
            class: "token hvariable",
            children: "n"
          }), " ", createVNode(_components.span, {
            class: "token operator",
            children: "-"
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "2"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ")"
          }), "\n"]
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "5",
          children: "\n"
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "6",
          children: [createVNode(_components.span, {
            class: "token hvariable",
            children: "main"
          }), " ", createVNode(_components.span, {
            class: "token operator",
            children: "::"
          }), " ", createVNode(_components.span, {
            class: "token constant",
            children: "IO"
          }), " ", createVNode(_components.span, {
            class: "token punctuation",
            children: "("
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ")"
          }), "\n"]
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "7",
          children: [createVNode(_components.span, {
            class: "token hvariable",
            children: "main"
          }), " ", createVNode(_components.span, {
            class: "token operator",
            children: "="
          }), " ", createVNode(_components.span, {
            class: "token builtin",
            children: "putStrLn"
          }), " ", createVNode(_components.span, {
            class: "token operator",
            children: "$"
          }), " ", createVNode(_components.span, {
            class: "token string",
            children: "\"fib 8 = \""
          }), " ", createVNode(_components.span, {
            class: "token operator",
            children: "++"
          }), " ", createVNode(_components.span, {
            class: "token builtin",
            children: "show"
          }), " ", createVNode(_components.span, {
            class: "token punctuation",
            children: "("
          }), createVNode(_components.span, {
            class: "token hvariable",
            children: "fib"
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "8"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ")"
          }), "\n"]
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "8",
          children: "\n"
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "9",
          children: "\n"
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "10",
          children: [createVNode(_components.span, {
            class: "token operator",
            children: ">"
          }), " ", createVNode(_components.span, {
            class: "token hvariable",
            children: "fib"
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "8"
          }), " ", createVNode(_components.span, {
            class: "token operator",
            children: "="
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "21"
          }), "\n"]
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: "Common Lisp works, too—use SBCL-compatible scripts:"
    }), "\n", createVNode(_components.pre, {
      class: "language-lisp language-lisp",
      "data-language": "lisp",
      children: createVNode(_components.code, {
        "is:raw": "",
        class: "language-lisp code-highlight",
        children: [createVNode(_components.span, {
          class: "code-line line-number",
          line: "1",
          children: [createVNode(_components.span, {
            class: "token punctuation",
            children: "("
          }), createVNode(_components.span, {
            class: "token defun",
            children: [createVNode(_components.span, {
              class: "token keyword",
              children: "defun"
            }), " ", createVNode(_components.span, {
              class: "token function",
              children: "rolling-sum"
            }), " ", createVNode(_components.span, {
              class: "token punctuation",
              children: "("
            }), createVNode(_components.span, {
              class: "token arguments",
              children: createVNode(_components.span, {
                class: "token argument variable",
                children: "xs"
              })
            }), createVNode(_components.span, {
              class: "token punctuation",
              children: ")"
            })]
          }), "\n"]
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "2",
          children: ["  ", createVNode(_components.span, {
            class: "token punctuation",
            children: "("
          }), createVNode(_components.span, {
            class: "token keyword",
            children: "let"
          }), " ", createVNode(_components.span, {
            class: "token punctuation",
            children: "("
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: "("
          }), createVNode(_components.span, {
            class: "token car",
            children: "sum"
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "0"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ")"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ")"
          }), "\n"]
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "3",
          children: ["    ", createVNode(_components.span, {
            class: "token punctuation",
            children: "("
          }), createVNode(_components.span, {
            class: "token car",
            children: "mapcar"
          }), " ", createVNode(_components.span, {
            class: "token punctuation",
            children: "("
          }), createVNode(_components.span, {
            class: "token lambda",
            children: [createVNode(_components.span, {
              class: "token keyword",
              children: "lambda"
            }), " ", createVNode(_components.span, {
              class: "token punctuation",
              children: "("
            }), createVNode(_components.span, {
              class: "token arguments",
              children: createVNode(_components.span, {
                class: "token argument variable",
                children: "x"
              })
            }), createVNode(_components.span, {
              class: "token punctuation",
              children: ")"
            })]
          }), "\n"]
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "4",
          children: ["              ", createVNode(_components.span, {
            class: "token punctuation",
            children: "("
          }), createVNode(_components.span, {
            class: "token car",
            children: "incf"
          }), " sum x", createVNode(_components.span, {
            class: "token punctuation",
            children: ")"
          }), "\n"]
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "5",
          children: ["              sum", createVNode(_components.span, {
            class: "token punctuation",
            children: ")"
          }), "\n"]
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "6",
          children: ["            xs", createVNode(_components.span, {
            class: "token punctuation",
            children: ")"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ")"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ")"
          }), "\n"]
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "7",
          children: "\n"
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "8",
          children: [createVNode(_components.span, {
            class: "token punctuation",
            children: "("
          }), createVNode(_components.span, {
            class: "token car",
            children: "format"
          }), " ", createVNode(_components.span, {
            class: "token boolean",
            children: "t"
          }), " ", createVNode(_components.span, {
            class: "token string",
            children: "\"Rolling sums: ~{~a~^, ~}~%\""
          }), " ", createVNode(_components.span, {
            class: "token punctuation",
            children: "("
          }), createVNode(_components.span, {
            class: "token car",
            children: "rolling-sum"
          }), " ", createVNode(_components.span, {
            class: "token punctuation",
            children: "'("
          }), createVNode(_components.span, {
            class: "token number",
            children: "1"
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "2"
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "3"
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "4"
          }), " ", createVNode(_components.span, {
            class: "token number",
            children: "5"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ")"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ")"
          }), createVNode(_components.span, {
            class: "token punctuation",
            children: ")"
          }), "\n"]
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "9",
          children: "\n"
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "10",
          children: "\n"
        }), createVNode(_components.span, {
          class: "code-line line-number",
          line: "11",
          children: ["> Rolling sums: 1, 3, 6, 10, ", createVNode(_components.span, {
            class: "token number",
            children: "15"
          }), "\n"]
        })]
      })
    }), "\n", createVNode(_components.h2, {
      id: "footnotes",
      children: "Footnotes"
    }), "\n", createVNode(_components.p, {
      children: ["Footnotes are rendered automatically at the end of the article.", createVNode(_components.sup, {
        children: createVNode(_components.a, {
          href: "#user-content-fn-foot-placement",
          id: "user-content-fnref-foot-placement",
          "data-footnote-ref": "",
          "aria-describedby": "footnote-label",
          children: "2"
        })
      }), " Reusing the same footnote is allowed for concise references.", createVNode(_components.sup, {
        children: createVNode(_components.a, {
          href: "#user-content-fn-foot-placement",
          id: "user-content-fnref-foot-placement-2",
          "data-footnote-ref": "",
          "aria-describedby": "footnote-label",
          children: "2"
        })
      }), " You can mix margin notes and footnotes without conflicts."]
    }), "\n", createVNode(_components.p, {
      children: ["You can call out detours with footnotes", createVNode(_components.sup, {
        children: createVNode(_components.a, {
          href: "#user-content-fn-footnote-demo",
          id: "user-content-fnref-footnote-demo",
          "data-footnote-ref": "",
          "aria-describedby": "footnote-label",
          children: "3"
        })
      }), " while keeping the main narrative clean."]
    }), "\n", createVNode(_components.h2, {
      id: "math",
      children: "Math"
    }), "\n", createVNode(_components.p, {
      children: "Block math renders via KaTeX:"
    }), "\n", createVNode(_components.span, {
      class: "katex-display",
      children: createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            display: "block",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.msubsup, {
                  children: [createVNode(_components.mo, {
                    children: "∫"
                  }), createVNode(_components.mn, {
                    children: "0"
                  }), createVNode(_components.mi, {
                    mathvariant: "normal",
                    children: "∞"
                  })]
                }), createVNode(_components.msup, {
                  children: [createVNode(_components.mi, {
                    children: "e"
                  }), createVNode(_components.mrow, {
                    children: [createVNode(_components.mo, {
                      children: "−"
                    }), createVNode(_components.msup, {
                      children: [createVNode(_components.mi, {
                        children: "x"
                      }), createVNode(_components.mn, {
                        children: "2"
                      })]
                    })]
                  })]
                }), createVNode(_components.mtext, {
                  children: " "
                }), createVNode(_components.mi, {
                  children: "d"
                }), createVNode(_components.mi, {
                  children: "x"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mfrac, {
                  children: [createVNode(_components.msqrt, {
                    children: createVNode(_components.mi, {
                      children: "π"
                    })
                  }), createVNode(_components.mn, {
                    children: "2"
                  })]
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "."
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\int_{0}^{\\infty} e^{-x^2} \\, dx = \\frac{\\sqrt{\\pi}}{2}."
              })]
            })
          })
        }), createVNode(_components.span, {
          class: "katex-html",
          "aria-hidden": "true",
          children: [createVNode(_components.span, {
            class: "base",
            children: [createVNode(_components.span, {
              class: "strut",
              style: {
                height: "2.3262em",
                verticalAlign: "-0.9119em"
              }
            }), createVNode(_components.span, {
              class: "mop",
              children: [createVNode(_components.span, {
                class: "mop op-symbol large-op",
                style: {
                  marginRight: "0.44445em",
                  position: "relative",
                  top: "-0.0011em"
                },
                children: "∫"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t vlist-t2",
                  children: [createVNode(_components.span, {
                    class: "vlist-r",
                    children: [createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "1.4143em"
                      },
                      children: [createVNode(_components.span, {
                        style: {
                          top: "-1.7881em",
                          marginLeft: "-0.4445em",
                          marginRight: "0.05em"
                        },
                        children: [createVNode(_components.span, {
                          class: "pstrut",
                          style: {
                            height: "2.7em"
                          }
                        }), createVNode(_components.span, {
                          class: "sizing reset-size6 size3 mtight",
                          children: createVNode(_components.span, {
                            class: "mord mtight",
                            children: createVNode(_components.span, {
                              class: "mord mtight",
                              children: "0"
                            })
                          })
                        })]
                      }), createVNode(_components.span, {
                        style: {
                          top: "-3.8129em",
                          marginRight: "0.05em"
                        },
                        children: [createVNode(_components.span, {
                          class: "pstrut",
                          style: {
                            height: "2.7em"
                          }
                        }), createVNode(_components.span, {
                          class: "sizing reset-size6 size3 mtight",
                          children: createVNode(_components.span, {
                            class: "mord mtight",
                            children: createVNode(_components.span, {
                              class: "mord mtight",
                              children: "∞"
                            })
                          })
                        })]
                      })]
                    }), createVNode(_components.span, {
                      class: "vlist-s",
                      children: "​"
                    })]
                  }), createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.9119em"
                      },
                      children: createVNode(_components.span, {})
                    })
                  })]
                })
              })]
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                children: "e"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t",
                  children: createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "1.0369em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-3.113em",
                          marginRight: "0.05em"
                        },
                        children: [createVNode(_components.span, {
                          class: "pstrut",
                          style: {
                            height: "2.7em"
                          }
                        }), createVNode(_components.span, {
                          class: "sizing reset-size6 size3 mtight",
                          children: createVNode(_components.span, {
                            class: "mord mtight",
                            children: [createVNode(_components.span, {
                              class: "mord mtight",
                              children: "−"
                            }), createVNode(_components.span, {
                              class: "mord mtight",
                              children: [createVNode(_components.span, {
                                class: "mord mathnormal mtight",
                                children: "x"
                              }), createVNode(_components.span, {
                                class: "msupsub",
                                children: createVNode(_components.span, {
                                  class: "vlist-t",
                                  children: createVNode(_components.span, {
                                    class: "vlist-r",
                                    children: createVNode(_components.span, {
                                      class: "vlist",
                                      style: {
                                        height: "0.8913em"
                                      },
                                      children: createVNode(_components.span, {
                                        style: {
                                          top: "-2.931em",
                                          marginRight: "0.0714em"
                                        },
                                        children: [createVNode(_components.span, {
                                          class: "pstrut",
                                          style: {
                                            height: "2.5em"
                                          }
                                        }), createVNode(_components.span, {
                                          class: "sizing reset-size3 size1 mtight",
                                          children: createVNode(_components.span, {
                                            class: "mord mtight",
                                            children: "2"
                                          })
                                        })]
                                      })
                                    })
                                  })
                                })
                              })]
                            })]
                          })
                        })]
                      })
                    })
                  })
                })
              })]
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "d"
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "x"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2778em"
              }
            }), createVNode(_components.span, {
              class: "mrel",
              children: "="
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2778em"
              }
            })]
          }), createVNode(_components.span, {
            class: "base",
            children: [createVNode(_components.span, {
              class: "strut",
              style: {
                height: "2.1633em",
                verticalAlign: "-0.686em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mopen nulldelimiter"
              }), createVNode(_components.span, {
                class: "mfrac",
                children: createVNode(_components.span, {
                  class: "vlist-t vlist-t2",
                  children: [createVNode(_components.span, {
                    class: "vlist-r",
                    children: [createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "1.4773em"
                      },
                      children: [createVNode(_components.span, {
                        style: {
                          top: "-2.314em"
                        },
                        children: [createVNode(_components.span, {
                          class: "pstrut",
                          style: {
                            height: "3em"
                          }
                        }), createVNode(_components.span, {
                          class: "mord",
                          children: createVNode(_components.span, {
                            class: "mord",
                            children: "2"
                          })
                        })]
                      }), createVNode(_components.span, {
                        style: {
                          top: "-3.23em"
                        },
                        children: [createVNode(_components.span, {
                          class: "pstrut",
                          style: {
                            height: "3em"
                          }
                        }), createVNode(_components.span, {
                          class: "frac-line",
                          style: {
                            borderBottomWidth: "0.04em"
                          }
                        })]
                      }), createVNode(_components.span, {
                        style: {
                          top: "-3.677em"
                        },
                        children: [createVNode(_components.span, {
                          class: "pstrut",
                          style: {
                            height: "3em"
                          }
                        }), createVNode(_components.span, {
                          class: "mord",
                          children: createVNode(_components.span, {
                            class: "mord sqrt",
                            children: createVNode(_components.span, {
                              class: "vlist-t vlist-t2",
                              children: [createVNode(_components.span, {
                                class: "vlist-r",
                                children: [createVNode(_components.span, {
                                  class: "vlist",
                                  style: {
                                    height: "0.8003em"
                                  },
                                  children: [createVNode(_components.span, {
                                    class: "svg-align",
                                    style: {
                                      top: "-3em"
                                    },
                                    children: [createVNode(_components.span, {
                                      class: "pstrut",
                                      style: {
                                        height: "3em"
                                      }
                                    }), createVNode(_components.span, {
                                      class: "mord",
                                      style: {
                                        paddingLeft: "0.833em"
                                      },
                                      children: createVNode(_components.span, {
                                        class: "mord mathnormal",
                                        style: {
                                          marginRight: "0.03588em"
                                        },
                                        children: "π"
                                      })
                                    })]
                                  }), createVNode(_components.span, {
                                    style: {
                                      top: "-2.7603em"
                                    },
                                    children: [createVNode(_components.span, {
                                      class: "pstrut",
                                      style: {
                                        height: "3em"
                                      }
                                    }), createVNode(_components.span, {
                                      class: "hide-tail",
                                      style: {
                                        minWidth: "0.853em",
                                        height: "1.08em"
                                      },
                                      children: createVNode(_components.svg, {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        width: "400em",
                                        height: "1.08em",
                                        viewBox: "0 0 400000 1080",
                                        preserveAspectRatio: "xMinYMin slice",
                                        children: createVNode(_components.path, {
                                          d: "M95,702\nc-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14\nc0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54\nc44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10\ns173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429\nc69,-144,104.5,-217.7,106.5,-221\nl0 -0\nc5.3,-9.3,12,-14,20,-14\nH400000v40H845.2724\ns-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7\nc-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z\nM834 80h400000v40h-400000z"
                                        })
                                      })
                                    })]
                                  })]
                                }), createVNode(_components.span, {
                                  class: "vlist-s",
                                  children: "​"
                                })]
                              }), createVNode(_components.span, {
                                class: "vlist-r",
                                children: createVNode(_components.span, {
                                  class: "vlist",
                                  style: {
                                    height: "0.2397em"
                                  },
                                  children: createVNode(_components.span, {})
                                })
                              })]
                            })
                          })
                        })]
                      })]
                    }), createVNode(_components.span, {
                      class: "vlist-s",
                      children: "​"
                    })]
                  }), createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.686em"
                      },
                      children: createVNode(_components.span, {})
                    })
                  })]
                })
              }), createVNode(_components.span, {
                class: "mclose nulldelimiter"
              })]
            }), createVNode(_components.span, {
              class: "mord",
              children: "."
            })]
          })]
        })]
      })
    }), "\n", createVNode(_components.h2, {
      id: "images-local--remote",
      children: "Images (local + remote)"
    }), "\n", createVNode($$ImageFigure, {
      src: phasesImage.src,
      alt: "Three equivalent distributions of phases.",
      caption: "Local figure to test sizing and captions."
    }), "\n", createVNode($$ImageFigure, {
      src: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Tissot_world_from_space.png",
      alt: "Tissot's indicatrix",
      caption: "Tissot's indicatrix: Equal-size circles on the surface of the globe.",
      height: "320px"
    }), "\n", createVNode(_components.h2, {
      id: "plotly-sample-chart",
      children: "Plotly sample chart"
    }), "\n", createVNode(_components.p, {
      children: "Below is a minimal Plotly chart rendered via the helper component. Resize the window to confirm responsiveness."
    }), "\n", createVNode($$PlotlyChart, {
      data: [{
        x: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        y: [120, 140, 135, 180, 210, 190, 160],
        type: "bar",
        name: "Visits",
        marker: {
          color: "#0ea5e9",
          line: {
            color: "#0284c7",
            width: 1
          }
        },
        opacity: 0.85
      }, {
        x: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        y: [95, 110, 115, 140, 170, 165, 140],
        type: "scatter",
        mode: "lines+markers",
        name: "Unique users",
        marker: {
          color: "#4f008b",
          size: 8
        },
        line: {
          shape: "spline",
          width: 3
        },
        fill: "tozeroy",
        fillcolor: "rgba(136, 64, 229, 0.15)"
      }, {
        x: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        y: [0.32, 0.34, 0.33, 0.35, 0.39, 0.36, 0.34],
        type: "scatter",
        mode: "lines",
        name: "Conversion rate",
        yaxis: "y2",
        line: {
          color: "#009f82",
          dash: "dash",
          width: 3
        }
      }],
      layout: {
        title: "Weekly traffic with uniques and conversion",
        height: 420,
        margin: {
          t: 60,
          l: 48,
          r: 48,
          b: 60
        },
        bargap: 0.2,
        yaxis: {
          title: "Count",
          zeroline: false,
          gridcolor: "rgba(0,0,0,0.08)"
        },
        yaxis2: {
          title: "Conversion",
          overlaying: "y",
          side: "right",
          tickformat: ",.0%",
          rangemode: "tozero"
        },
        legend: {
          orientation: "h",
          y: -0.2
        }
      }
    }), "\n", createVNode(_components.h2, {
      id: "markdown-preview-rendered-samples",
      children: "Markdown preview (rendered samples)"
    }), "\n", createVNode(_components.h3, {
      id: "headings-emphasis-links",
      children: "Headings, emphasis, links"
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Bold"
      }), ", ", createVNode(_components.em, {
        children: "italics"
      }), ", and ", createVNode(_components.code, {
        children: "inline code"
      }), " all work as expected. Link styles: ", createVNode(_components.a, {
        href: "/",
        children: "Marginem home"
      }), "."]
    }), "\n", createVNode(_components.h3, {
      id: "lists",
      children: "Lists"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Unordered list item one"
      }), "\n", createVNode(_components.li, {
        children: ["Item two with a nested list:\n", createVNode(_components.ul, {
          children: ["\n", createVNode(_components.li, {
            children: "Nested child A"
          }), "\n", createVNode(_components.li, {
            children: "Nested child B"
          }), "\n"]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: "Item three"
      }), "\n"]
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "Ordered step"
      }), "\n", createVNode(_components.li, {
        children: "Another step"
      }), "\n", createVNode(_components.li, {
        children: "Final step"
      }), "\n"]
    }), "\n", createVNode(_components.ul, {
      class: "contains-task-list",
      children: ["\n", createVNode(_components.li, {
        class: "task-list-item",
        children: [createVNode(_components.input, {
          type: "checkbox",
          checked: true,
          disabled: true
        }), " Checklist item done"]
      }), "\n", createVNode(_components.li, {
        class: "task-list-item",
        children: [createVNode(_components.input, {
          type: "checkbox",
          disabled: true
        }), " Checklist item todo"]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "blockquote",
      children: "Blockquote"
    }), "\n", createVNode(_components.blockquote, {
      children: ["\n", createVNode(_components.p, {
        children: ["“Simplicity is prerequisite for reliability.” — Edsger Dijkstra", createVNode(_components.sup, {
          children: createVNode(_components.a, {
            href: "#user-content-fn-quote",
            id: "user-content-fnref-quote",
            "data-footnote-ref": "",
            "aria-describedby": "footnote-label",
            children: "4"
          })
        })]
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "code-fence-static",
      children: "Code fence (static)"
    }), "\n", createVNode(_components.pre, {
      class: "language-bash language-bash",
      "data-language": "bash",
      children: createVNode(_components.code, {
        "is:raw": "",
        class: "language-bash code-highlight",
        children: createVNode(_components.span, {
          class: "code-line line-number",
          line: "1",
          children: [createVNode(_components.span, {
            class: "token function",
            children: "git"
          }), " status ", createVNode(_components.span, {
            class: "token parameter variable",
            children: "--short"
          }), "\n"]
        })
      })
    }), "\n", createVNode(_components.h3, {
      id: "table",
      children: "Table"
    }), "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", createVNode(_components.table, {
      children: [createVNode(_components.thead, {
        children: createVNode(_components.tr, {
          children: [createVNode(_components.th, {
            style: {
              textAlign: "center"
            },
            children: "Term"
          }), createVNode(_components.th, {
            style: {
              textAlign: "left"
            },
            children: "Definition"
          }), createVNode(_components.th, {
            style: {
              textAlign: "center"
            },
            children: "Symbol"
          })]
        })
      }), createVNode(_components.tbody, {
        children: [createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            style: {
              textAlign: "center"
            },
            children: "Alpha"
          }), createVNode(_components.td, {
            style: {
              textAlign: "left"
            },
            children: "First letter of the Greek alphabet"
          }), createVNode(_components.td, {
            style: {
              textAlign: "center"
            },
            children: createVNode(_components.span, {
              class: "katex",
              children: [createVNode(_components.span, {
                class: "katex-mathml",
                children: createVNode(_components.math, {
                  xmlns: "http://www.w3.org/1998/Math/MathML",
                  children: createVNode(_components.semantics, {
                    children: [createVNode(_components.mrow, {
                      children: createVNode(_components.mi, {
                        children: "α"
                      })
                    }), createVNode(_components.annotation, {
                      encoding: "application/x-tex",
                      children: "\\alpha"
                    })]
                  })
                })
              }), createVNode(_components.span, {
                class: "katex-html",
                "aria-hidden": "true",
                children: createVNode(_components.span, {
                  class: "base",
                  children: [createVNode(_components.span, {
                    class: "strut",
                    style: {
                      height: "0.4306em"
                    }
                  }), createVNode(_components.span, {
                    class: "mord mathnormal",
                    style: {
                      marginRight: "0.0037em"
                    },
                    children: "α"
                  })]
                })
              })]
            })
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            style: {
              textAlign: "center"
            },
            children: "Beta"
          }), createVNode(_components.td, {
            style: {
              textAlign: "left"
            },
            children: "Second letter of the Greek alphabet"
          }), createVNode(_components.td, {
            style: {
              textAlign: "center"
            },
            children: createVNode(_components.span, {
              class: "katex",
              children: [createVNode(_components.span, {
                class: "katex-mathml",
                children: createVNode(_components.math, {
                  xmlns: "http://www.w3.org/1998/Math/MathML",
                  children: createVNode(_components.semantics, {
                    children: [createVNode(_components.mrow, {
                      children: createVNode(_components.mi, {
                        children: "β"
                      })
                    }), createVNode(_components.annotation, {
                      encoding: "application/x-tex",
                      children: "\\beta"
                    })]
                  })
                })
              }), createVNode(_components.span, {
                class: "katex-html",
                "aria-hidden": "true",
                children: createVNode(_components.span, {
                  class: "base",
                  children: [createVNode(_components.span, {
                    class: "strut",
                    style: {
                      height: "0.8889em",
                      verticalAlign: "-0.1944em"
                    }
                  }), createVNode(_components.span, {
                    class: "mord mathnormal",
                    style: {
                      marginRight: "0.05278em"
                    },
                    children: "β"
                  })]
                })
              })]
            })
          })]
        }), createVNode(_components.tr, {
          children: [createVNode(_components.td, {
            style: {
              textAlign: "center"
            },
            children: "Gamma"
          }), createVNode(_components.td, {
            style: {
              textAlign: "left"
            },
            children: "Third letter of the Greek alphabet"
          }), createVNode(_components.td, {
            style: {
              textAlign: "center"
            },
            children: createVNode(_components.span, {
              class: "katex",
              children: [createVNode(_components.span, {
                class: "katex-mathml",
                children: createVNode(_components.math, {
                  xmlns: "http://www.w3.org/1998/Math/MathML",
                  children: createVNode(_components.semantics, {
                    children: [createVNode(_components.mrow, {
                      children: createVNode(_components.mi, {
                        children: "γ"
                      })
                    }), createVNode(_components.annotation, {
                      encoding: "application/x-tex",
                      children: "\\gamma"
                    })]
                  })
                })
              }), createVNode(_components.span, {
                class: "katex-html",
                "aria-hidden": "true",
                children: createVNode(_components.span, {
                  class: "base",
                  children: [createVNode(_components.span, {
                    class: "strut",
                    style: {
                      height: "0.625em",
                      verticalAlign: "-0.1944em"
                    }
                  }), createVNode(_components.span, {
                    class: "mord mathnormal",
                    style: {
                      marginRight: "0.05556em"
                    },
                    children: "γ"
                  })]
                })
              })]
            })
          })]
        })]
      })]
    }), "\n", createVNode(_components.h3, {
      id: "horizontal-rule",
      children: "Horizontal rule"
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.p, {
      children: "Use this section as a live visual check for Markdown rendering alongside the runnable snippets and components above."
    }), "\n", createVNode(_components.section, {
      "data-footnotes": "",
      class: "footnotes",
      children: [createVNode(_components.h2, {
        class: "sr-only",
        id: "footnote-label",
        children: "Footnotes"
      }), "\n", createVNode(_components.ol, {
        children: ["\n", createVNode(_components.li, {
          id: "user-content-fn-why-now",
          children: ["\n", createVNode(_components.p, {
            children: ["This post exists solely as a visual and functional checklist. ", createVNode(_components.a, {
              href: "#user-content-fnref-why-now",
              "data-footnote-backref": "",
              "aria-label": "Back to reference 1",
              class: "data-footnote-backref",
              children: "↩"
            })]
          }), "\n"]
        }), "\n", createVNode(_components.li, {
          id: "user-content-fn-foot-placement",
          children: ["\n", createVNode(_components.p, {
            children: ["This demonstrates a dedicated footnote section and repeated references. ", createVNode(_components.a, {
              href: "#user-content-fnref-foot-placement",
              "data-footnote-backref": "",
              "aria-label": "Back to reference 2",
              class: "data-footnote-backref",
              children: "↩"
            }), " ", createVNode(_components.a, {
              href: "#user-content-fnref-foot-placement-2",
              "data-footnote-backref": "",
              "aria-label": "Back to reference 2-2",
              class: "data-footnote-backref",
              children: ["↩", createVNode(_components.sup, {
                children: "2"
              })]
            })]
          }), "\n"]
        }), "\n", createVNode(_components.li, {
          id: "user-content-fn-footnote-demo",
          children: ["\n", createVNode(_components.p, {
            children: ["Footnotes stay inline in the Markdown source but render at the bottom automatically. ", createVNode(_components.a, {
              href: "#user-content-fnref-footnote-demo",
              "data-footnote-backref": "",
              "aria-label": "Back to reference 3",
              class: "data-footnote-backref",
              children: "↩"
            })]
          }), "\n"]
        }), "\n", createVNode(_components.li, {
          id: "user-content-fn-quote",
          children: ["\n", createVNode(_components.p, {
            children: ["Quoted for style verification only. ", createVNode(_components.a, {
              href: "#user-content-fnref-quote",
              "data-footnote-backref": "",
              "aria-label": "Back to reference 4",
              class: "data-footnote-backref",
              children: "↩"
            })]
          }), "\n"]
        }), "\n"]
      }), "\n"]
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

const url = "src/content/blog/feature-playground.mdx";
const file = "/Users/toby/projects/blogupdate/src/content/blog/feature-playground.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/toby/projects/blogupdate/src/content/blog/feature-playground.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
