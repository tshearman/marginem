globalThis.process ??= {}; globalThis.process.env ??= {};
import { w as createVNode, F as Fragment, aF as __astro_tag_component__ } from './astro/server_BqNpRBsA.mjs';

const frontmatter = {
  "author": "Toby Shearman",
  "title": "Concentration of Volume in High Dimensional Spheres: A Dice Thrower's Interpretation",
  "tags": ["math/PR"],
  "description": "A review and proof of the mathematics of concentration of volume to near the surface in high-dimensional spheres. In particular, an intuitive probabilistic perspective based on collections of dice.",
  "abstract": "A review and proof of the mathematics of concentration of volume to near the surface in high-dimensional spheres. In particular, an intuitive probabilistic perspective based on collections of dice.",
  "featured": false,
  "pubDate": "2024-12-01",
  "draft": false,
  "heroImage": "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=80"
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "introduction",
    "text": "Introduction"
  }, {
    "depth": 2,
    "slug": "the-dice-throwers-perspective",
    "text": "The Dice Thrower’s Perspective"
  }, {
    "depth": 3,
    "slug": "extension-to-nnn-dice-with-kkk-sides",
    "text": "Extension to nnn dice with kkk sides"
  }, {
    "depth": 2,
    "slug": "rigor",
    "text": "Rigor"
  }];
}
function _createMdxContent(props) {
  const _components = {
    annotation: "annotation",
    em: "em",
    h2: "h2",
    h3: "h3",
    li: "li",
    math: "math",
    mfrac: "mfrac",
    mi: "mi",
    mn: "mn",
    mo: "mo",
    mrow: "mrow",
    msqrt: "msqrt",
    mstyle: "mstyle",
    msub: "msub",
    msup: "msup",
    mtable: "mtable",
    mtd: "mtd",
    mtext: "mtext",
    mtr: "mtr",
    munder: "munder",
    p: "p",
    path: "path",
    semantics: "semantics",
    span: "span",
    svg: "svg",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h2, {
      id: "introduction",
      children: "Introduction"
    }), "\n", createVNode(_components.h2, {
      id: "the-dice-throwers-perspective",
      children: "The Dice Thrower’s Perspective"
    }), "\n", createVNode(_components.p, {
      children: ["Let’s explore this concept from a dice thrower’s perspective. The probabilistic interpretation of rolling pools of dice and examining the highest result: roll ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "n"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "n"
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
              children: "n"
            })]
          })
        })]
      }), " six-sided dice ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mi, {
                  children: "n"
                }), createVNode(_components.mtext, {
                  children: "d"
                }), createVNode(_components.mn, {
                  children: "6"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "n\\textrm{d}6"
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
                height: "0.6944em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "n"
            }), createVNode(_components.span, {
              class: "mord text",
              children: createVNode(_components.span, {
                class: "mord textrm",
                children: "d"
              })
            }), createVNode(_components.span, {
              class: "mord",
              children: "6"
            })]
          })
        })]
      }), " and consider the roll a success if any die shows the high possible value: a six. We intuitively know that rolling more dice, increasing ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "n"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "n"
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
              children: "n"
            })]
          })
        })]
      }), ". Mathematically we write this as:"]
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
                children: [createVNode(_components.mi, {
                  children: "p"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mtext, {
                  children: "success"
                }), createVNode(_components.mo, {
                  separator: "true",
                  children: ";"
                }), createVNode(_components.mi, {
                  children: "n"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mn, {
                  children: "1"
                }), createVNode(_components.mo, {
                  children: "−"
                }), createVNode(_components.msup, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mo, {
                      fence: "true",
                      children: "("
                    }), createVNode(_components.mfrac, {
                      children: [createVNode(_components.mn, {
                        children: "5"
                      }), createVNode(_components.mn, {
                        children: "6"
                      })]
                    }), createVNode(_components.mo, {
                      fence: "true",
                      children: ")"
                    })]
                  }), createVNode(_components.mi, {
                    children: "n"
                  })]
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "."
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "p(\\textrm{success}; n) = 1 - \\left(\\frac{5}{6}\\right)^n."
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
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "p"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord text",
              children: createVNode(_components.span, {
                class: "mord textrm",
                children: "success"
              })
            }), createVNode(_components.span, {
              class: "mpunct",
              children: ";"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "n"
            }), createVNode(_components.span, {
              class: "mclose",
              children: ")"
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
                height: "0.7278em",
                verticalAlign: "-0.0833em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: "1"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2222em"
              }
            }), createVNode(_components.span, {
              class: "mbin",
              children: "−"
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
                height: "2.4543em",
                verticalAlign: "-0.95em"
              }
            }), createVNode(_components.span, {
              class: "minner",
              children: [createVNode(_components.span, {
                class: "minner",
                children: [createVNode(_components.span, {
                  class: "mopen delimcenter",
                  style: {
                    top: "0em"
                  },
                  children: createVNode(_components.span, {
                    class: "delimsizing size3",
                    children: "("
                  })
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
                            height: "1.3214em"
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
                                children: "6"
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
                                class: "mord",
                                children: "5"
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
                  class: "mclose delimcenter",
                  style: {
                    top: "0em"
                  },
                  children: createVNode(_components.span, {
                    class: "delimsizing size3",
                    children: ")"
                  })
                })]
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t",
                  children: createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "1.5043em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-3.9029em",
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
                            class: "mord mathnormal mtight",
                            children: "n"
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
              class: "mord",
              children: "."
            })]
          })]
        })]
      })
    }), "\n", createVNode(_components.h3, {
      id: "extension-to-nnn-dice-with-kkk-sides",
      children: ["Extension to ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "n"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "n"
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
              children: "n"
            })]
          })
        })]
      }), " dice with ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "k"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "k"
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
                height: "0.6944em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.03148em"
              },
              children: "k"
            })]
          })
        })]
      }), " sides"]
    }), "\n", createVNode(_components.p, {
      children: ["More generally roll ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "n"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "n"
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
              children: "n"
            })]
          })
        })]
      }), " ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "k"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "k"
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
                height: "0.6944em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.03148em"
              },
              children: "k"
            })]
          })
        })]
      }), "-sided dice and consider the roll a success if at least one die shows a ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "k"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "k"
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
                height: "0.6944em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.03148em"
              },
              children: "k"
            })]
          })
        })]
      }), "."]
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
                children: [createVNode(_components.mi, {
                  children: "p"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mtext, {
                  children: "success"
                }), createVNode(_components.mo, {
                  separator: "true",
                  children: ";"
                }), createVNode(_components.mi, {
                  children: "n"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mn, {
                  children: "1"
                }), createVNode(_components.mo, {
                  children: "−"
                }), createVNode(_components.msup, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mo, {
                      fence: "true",
                      children: "("
                    }), createVNode(_components.mfrac, {
                      children: [createVNode(_components.mrow, {
                        children: [createVNode(_components.mi, {
                          children: "k"
                        }), createVNode(_components.mo, {
                          children: "−"
                        }), createVNode(_components.mn, {
                          children: "1"
                        })]
                      }), createVNode(_components.mi, {
                        children: "k"
                      })]
                    }), createVNode(_components.mo, {
                      fence: "true",
                      children: ")"
                    })]
                  }), createVNode(_components.mi, {
                    children: "n"
                  })]
                }), createVNode(_components.mo, {
                  separator: "true",
                  children: ","
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "p(\\textrm{success}; n) = 1 - \\left(\\frac{k - 1}{k}\\right)^n,"
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
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "p"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord text",
              children: createVNode(_components.span, {
                class: "mord textrm",
                children: "success"
              })
            }), createVNode(_components.span, {
              class: "mpunct",
              children: ";"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "n"
            }), createVNode(_components.span, {
              class: "mclose",
              children: ")"
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
                height: "0.7278em",
                verticalAlign: "-0.0833em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: "1"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2222em"
              }
            }), createVNode(_components.span, {
              class: "mbin",
              children: "−"
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
                height: "2.4543em",
                verticalAlign: "-0.95em"
              }
            }), createVNode(_components.span, {
              class: "minner",
              children: [createVNode(_components.span, {
                class: "minner",
                children: [createVNode(_components.span, {
                  class: "mopen delimcenter",
                  style: {
                    top: "0em"
                  },
                  children: createVNode(_components.span, {
                    class: "delimsizing size3",
                    children: "("
                  })
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
                            height: "1.3714em"
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
                                class: "mord mathnormal",
                                style: {
                                  marginRight: "0.03148em"
                                },
                                children: "k"
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
                              children: [createVNode(_components.span, {
                                class: "mord mathnormal",
                                style: {
                                  marginRight: "0.03148em"
                                },
                                children: "k"
                              }), createVNode(_components.span, {
                                class: "mspace",
                                style: {
                                  marginRight: "0.2222em"
                                }
                              }), createVNode(_components.span, {
                                class: "mbin",
                                children: "−"
                              }), createVNode(_components.span, {
                                class: "mspace",
                                style: {
                                  marginRight: "0.2222em"
                                }
                              }), createVNode(_components.span, {
                                class: "mord",
                                children: "1"
                              })]
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
                  class: "mclose delimcenter",
                  style: {
                    top: "0em"
                  },
                  children: createVNode(_components.span, {
                    class: "delimsizing size3",
                    children: ")"
                  })
                })]
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t",
                  children: createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "1.5043em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-3.9029em",
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
                            class: "mord mathnormal mtight",
                            children: "n"
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
              class: "mpunct",
              children: ","
            })]
          })]
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: ["which can be envisioned as an ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "n"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "n"
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
              children: "n"
            })]
          })
        })]
      }), "-dimensional cube of side length ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "k"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "k"
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
                height: "0.6944em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.03148em"
              },
              children: "k"
            })]
          })
        })]
      }), ". Highlight the shell of the cube: where ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "x"
                  }), createVNode(_components.mi, {
                    children: "i"
                  })]
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mi, {
                  children: "k"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "x_i=k"
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
                height: "0.5806em",
                verticalAlign: "-0.15em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                children: "x"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t vlist-t2",
                  children: [createVNode(_components.span, {
                    class: "vlist-r",
                    children: [createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.3117em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-2.55em",
                          marginLeft: "0em",
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
                            class: "mord mathnormal mtight",
                            children: "i"
                          })
                        })]
                      })
                    }), createVNode(_components.span, {
                      class: "vlist-s",
                      children: "​"
                    })]
                  }), createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.15em"
                      },
                      children: createVNode(_components.span, {})
                    })
                  })]
                })
              })]
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
                height: "0.6944em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.03148em"
              },
              children: "k"
            })]
          })]
        })]
      }), ", for some ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mi, {
                  children: "i"
                }), createVNode(_components.mo, {
                  children: "∈"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "{"
                }), createVNode(_components.mn, {
                  children: "1"
                }), createVNode(_components.mo, {
                  separator: "true",
                  children: ","
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "."
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "."
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "."
                }), createVNode(_components.mo, {
                  separator: "true",
                  children: ","
                }), createVNode(_components.mi, {
                  children: "n"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "}"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "i\\in\\{1, ..., n\\}"
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
                height: "0.6986em",
                verticalAlign: "-0.0391em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "i"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2778em"
              }
            }), createVNode(_components.span, {
              class: "mrel",
              children: "∈"
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
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mopen",
              children: "{"
            }), createVNode(_components.span, {
              class: "mord",
              children: "1"
            }), createVNode(_components.span, {
              class: "mpunct",
              children: ","
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: "..."
            }), createVNode(_components.span, {
              class: "mpunct",
              children: ","
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "n"
            }), createVNode(_components.span, {
              class: "mclose",
              children: "}"
            })]
          })]
        })]
      }), ". With two parameters we can consider multiple limits:"]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: [createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: createVNode(_components.mi, {
                    children: "n"
                  })
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "n"
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
                children: "n"
              })]
            })
          })]
        }), " fixed and ", createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: [createVNode(_components.mi, {
                    children: "k"
                  }), createVNode(_components.mo, {
                    children: "→"
                  }), createVNode(_components.mi, {
                    mathvariant: "normal",
                    children: "∞"
                  })]
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "k \\to \\infty"
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
                  height: "0.6944em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.03148em"
                },
                children: "k"
              }), createVNode(_components.span, {
                class: "mspace",
                style: {
                  marginRight: "0.2778em"
                }
              }), createVNode(_components.span, {
                class: "mrel",
                children: "→"
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
                  height: "0.4306em"
                }
              }), createVNode(_components.span, {
                class: "mord",
                children: "∞"
              })]
            })]
          })]
        }), ","]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: createVNode(_components.mi, {
                    children: "k"
                  })
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "k"
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
                  height: "0.6944em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.03148em"
                },
                children: "k"
              })]
            })
          })]
        }), " fixed and ", createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: [createVNode(_components.mi, {
                    children: "n"
                  }), createVNode(_components.mo, {
                    children: "→"
                  }), createVNode(_components.mi, {
                    mathvariant: "normal",
                    children: "∞"
                  })]
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "n \\to \\infty"
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
                  height: "0.4306em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                children: "n"
              }), createVNode(_components.span, {
                class: "mspace",
                style: {
                  marginRight: "0.2778em"
                }
              }), createVNode(_components.span, {
                class: "mrel",
                children: "→"
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
                  height: "0.4306em"
                }
              }), createVNode(_components.span, {
                class: "mord",
                children: "∞"
              })]
            })]
          })]
        }), ","]
      }), "\n", createVNode(_components.li, {
        children: ["the multi-scale limit of ", createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: [createVNode(_components.mi, {
                    children: "k"
                  }), createVNode(_components.mo, {
                    children: ":"
                  }), createVNode(_components.mo, {
                    children: "="
                  }), createVNode(_components.mi, {
                    children: "k"
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: "("
                  }), createVNode(_components.mi, {
                    children: "m"
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: ")"
                  })]
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "k := k(m)"
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
                  height: "0.6944em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.03148em"
                },
                children: "k"
              }), createVNode(_components.span, {
                class: "mspace",
                style: {
                  marginRight: "0.2778em"
                }
              }), createVNode(_components.span, {
                class: "mrel",
                children: ":="
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
                  height: "1em",
                  verticalAlign: "-0.25em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.03148em"
                },
                children: "k"
              }), createVNode(_components.span, {
                class: "mopen",
                children: "("
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                children: "m"
              }), createVNode(_components.span, {
                class: "mclose",
                children: ")"
              })]
            })]
          })]
        }), " and ", createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: [createVNode(_components.mi, {
                    children: "n"
                  }), createVNode(_components.mo, {
                    children: ":"
                  }), createVNode(_components.mo, {
                    children: "="
                  }), createVNode(_components.mi, {
                    children: "n"
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: "("
                  }), createVNode(_components.mi, {
                    children: "m"
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: ")"
                  })]
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "n:=n(m)"
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
                  height: "0.4306em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                children: "n"
              }), createVNode(_components.span, {
                class: "mspace",
                style: {
                  marginRight: "0.2778em"
                }
              }), createVNode(_components.span, {
                class: "mrel",
                children: ":="
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
                  height: "1em",
                  verticalAlign: "-0.25em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                children: "n"
              }), createVNode(_components.span, {
                class: "mopen",
                children: "("
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                children: "m"
              }), createVNode(_components.span, {
                class: "mclose",
                children: ")"
              })]
            })]
          })]
        }), " while ", createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: [createVNode(_components.mi, {
                    children: "m"
                  }), createVNode(_components.mo, {
                    children: "→"
                  }), createVNode(_components.mi, {
                    mathvariant: "normal",
                    children: "∞"
                  })]
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "m\\to\\infty"
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
                  height: "0.4306em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                children: "m"
              }), createVNode(_components.span, {
                class: "mspace",
                style: {
                  marginRight: "0.2778em"
                }
              }), createVNode(_components.span, {
                class: "mrel",
                children: "→"
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
                  height: "0.4306em"
                }
              }), createVNode(_components.span, {
                class: "mord",
                children: "∞"
              })]
            })]
          })]
        }), "."]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["For fixed ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "k"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "k"
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
                height: "0.6944em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.03148em"
              },
              children: "k"
            })]
          })
        })]
      }), " as ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mi, {
                  children: "n"
                }), createVNode(_components.mo, {
                  children: "→"
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "∞"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "n\\to\\infty"
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
                height: "0.4306em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "n"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2778em"
              }
            }), createVNode(_components.span, {
              class: "mrel",
              children: "→"
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
                height: "0.4306em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: "∞"
            })]
          })]
        })]
      }), ":"]
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
                children: [createVNode(_components.msup, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mo, {
                      fence: "true",
                      children: "("
                    }), createVNode(_components.mfrac, {
                      children: [createVNode(_components.mrow, {
                        children: [createVNode(_components.mi, {
                          children: "k"
                        }), createVNode(_components.mo, {
                          children: "−"
                        }), createVNode(_components.mn, {
                          children: "1"
                        })]
                      }), createVNode(_components.mi, {
                        children: "k"
                      })]
                    }), createVNode(_components.mo, {
                      fence: "true",
                      children: ")"
                    })]
                  }), createVNode(_components.mi, {
                    children: "n"
                  })]
                }), createVNode(_components.mo, {
                  children: "→"
                }), createVNode(_components.mn, {
                  children: "0."
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\left(\\frac{k - 1}{k}\\right)^n \\to 0."
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
                height: "2.4543em",
                verticalAlign: "-0.95em"
              }
            }), createVNode(_components.span, {
              class: "minner",
              children: [createVNode(_components.span, {
                class: "minner",
                children: [createVNode(_components.span, {
                  class: "mopen delimcenter",
                  style: {
                    top: "0em"
                  },
                  children: createVNode(_components.span, {
                    class: "delimsizing size3",
                    children: "("
                  })
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
                            height: "1.3714em"
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
                                class: "mord mathnormal",
                                style: {
                                  marginRight: "0.03148em"
                                },
                                children: "k"
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
                              children: [createVNode(_components.span, {
                                class: "mord mathnormal",
                                style: {
                                  marginRight: "0.03148em"
                                },
                                children: "k"
                              }), createVNode(_components.span, {
                                class: "mspace",
                                style: {
                                  marginRight: "0.2222em"
                                }
                              }), createVNode(_components.span, {
                                class: "mbin",
                                children: "−"
                              }), createVNode(_components.span, {
                                class: "mspace",
                                style: {
                                  marginRight: "0.2222em"
                                }
                              }), createVNode(_components.span, {
                                class: "mord",
                                children: "1"
                              })]
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
                  class: "mclose delimcenter",
                  style: {
                    top: "0em"
                  },
                  children: createVNode(_components.span, {
                    class: "delimsizing size3",
                    children: ")"
                  })
                })]
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t",
                  children: createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "1.5043em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-3.9029em",
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
                            class: "mord mathnormal mtight",
                            children: "n"
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
                marginRight: "0.2778em"
              }
            }), createVNode(_components.span, {
              class: "mrel",
              children: "→"
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
              children: "0."
            })]
          })]
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: ["For fixed ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "n"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "n"
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
              children: "n"
            })]
          })
        })]
      }), " as ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mi, {
                  children: "k"
                }), createVNode(_components.mo, {
                  children: "→"
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "∞"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "k\\to\\infty"
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
                height: "0.6944em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.03148em"
              },
              children: "k"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2778em"
              }
            }), createVNode(_components.span, {
              class: "mrel",
              children: "→"
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
                height: "0.4306em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: "∞"
            })]
          })]
        })]
      }), ":"]
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
                children: [createVNode(_components.msup, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mo, {
                      fence: "true",
                      children: "("
                    }), createVNode(_components.mfrac, {
                      children: [createVNode(_components.mrow, {
                        children: [createVNode(_components.mi, {
                          children: "k"
                        }), createVNode(_components.mo, {
                          children: "−"
                        }), createVNode(_components.mn, {
                          children: "1"
                        })]
                      }), createVNode(_components.mi, {
                        children: "k"
                      })]
                    }), createVNode(_components.mo, {
                      fence: "true",
                      children: ")"
                    })]
                  }), createVNode(_components.mi, {
                    children: "n"
                  })]
                }), createVNode(_components.mo, {
                  children: "→"
                }), createVNode(_components.mn, {
                  children: "1."
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\left(\\frac{k - 1}{k}\\right)^n \\to 1."
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
                height: "2.4543em",
                verticalAlign: "-0.95em"
              }
            }), createVNode(_components.span, {
              class: "minner",
              children: [createVNode(_components.span, {
                class: "minner",
                children: [createVNode(_components.span, {
                  class: "mopen delimcenter",
                  style: {
                    top: "0em"
                  },
                  children: createVNode(_components.span, {
                    class: "delimsizing size3",
                    children: "("
                  })
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
                            height: "1.3714em"
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
                                class: "mord mathnormal",
                                style: {
                                  marginRight: "0.03148em"
                                },
                                children: "k"
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
                              children: [createVNode(_components.span, {
                                class: "mord mathnormal",
                                style: {
                                  marginRight: "0.03148em"
                                },
                                children: "k"
                              }), createVNode(_components.span, {
                                class: "mspace",
                                style: {
                                  marginRight: "0.2222em"
                                }
                              }), createVNode(_components.span, {
                                class: "mbin",
                                children: "−"
                              }), createVNode(_components.span, {
                                class: "mspace",
                                style: {
                                  marginRight: "0.2222em"
                                }
                              }), createVNode(_components.span, {
                                class: "mord",
                                children: "1"
                              })]
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
                  class: "mclose delimcenter",
                  style: {
                    top: "0em"
                  },
                  children: createVNode(_components.span, {
                    class: "delimsizing size3",
                    children: ")"
                  })
                })]
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t",
                  children: createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "1.5043em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-3.9029em",
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
                            class: "mord mathnormal mtight",
                            children: "n"
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
                marginRight: "0.2778em"
              }
            }), createVNode(_components.span, {
              class: "mrel",
              children: "→"
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
              children: "1."
            })]
          })]
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: ["Next, we can learn a lot about our system by considering the multi-scale limit: ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mi, {
                  children: "k"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mi, {
                  children: "k"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "m"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "k = k(m)"
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
                height: "0.6944em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.03148em"
              },
              children: "k"
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
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.03148em"
              },
              children: "k"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            }), createVNode(_components.span, {
              class: "mclose",
              children: ")"
            })]
          })]
        })]
      }), " and ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mi, {
                  children: "n"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mi, {
                  children: "n"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "m"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "n = n(m)"
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
                height: "0.4306em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "n"
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
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "n"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            }), createVNode(_components.span, {
              class: "mclose",
              children: ")"
            })]
          })]
        })]
      }), " as ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mi, {
                  children: "m"
                }), createVNode(_components.mo, {
                  children: "→"
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "∞"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "m\\to\\infty"
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
                height: "0.4306em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2778em"
              }
            }), createVNode(_components.span, {
              class: "mrel",
              children: "→"
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
                height: "0.4306em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: "∞"
            })]
          })]
        })]
      }), ". By continuity of the exponential, let’s first transform the problem:"]
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
              children: [createVNode(_components.mtable, {
                rowspacing: "0.25em",
                columnalign: "right left",
                columnspacing: "0em",
                children: [createVNode(_components.mtr, {
                  children: [createVNode(_components.mtd, {
                    children: createVNode(_components.mstyle, {
                      scriptlevel: "0",
                      displaystyle: "true",
                      children: createVNode(_components.mrow, {
                        children: [createVNode(_components.munder, {
                          children: [createVNode(_components.mrow, {
                            children: [createVNode(_components.mi, {
                              children: "lim"
                            }), createVNode(_components.mo, {
                              children: "⁡"
                            })]
                          }), createVNode(_components.mrow, {
                            children: [createVNode(_components.mi, {
                              children: "m"
                            }), createVNode(_components.mo, {
                              children: "→"
                            }), createVNode(_components.mi, {
                              mathvariant: "normal",
                              children: "∞"
                            })]
                          })]
                        }), createVNode(_components.msup, {
                          children: [createVNode(_components.mrow, {
                            children: [createVNode(_components.mo, {
                              fence: "true",
                              children: "("
                            }), createVNode(_components.mfrac, {
                              children: [createVNode(_components.mrow, {
                                children: [createVNode(_components.mi, {
                                  children: "k"
                                }), createVNode(_components.mo, {
                                  stretchy: "false",
                                  children: "("
                                }), createVNode(_components.mi, {
                                  children: "m"
                                }), createVNode(_components.mo, {
                                  stretchy: "false",
                                  children: ")"
                                }), createVNode(_components.mo, {
                                  children: "−"
                                }), createVNode(_components.mn, {
                                  children: "1"
                                })]
                              }), createVNode(_components.mrow, {
                                children: [createVNode(_components.mi, {
                                  children: "k"
                                }), createVNode(_components.mo, {
                                  stretchy: "false",
                                  children: "("
                                }), createVNode(_components.mi, {
                                  children: "m"
                                }), createVNode(_components.mo, {
                                  stretchy: "false",
                                  children: ")"
                                })]
                              })]
                            }), createVNode(_components.mo, {
                              fence: "true",
                              children: ")"
                            })]
                          }), createVNode(_components.mrow, {
                            children: [createVNode(_components.mi, {
                              children: "n"
                            }), createVNode(_components.mo, {
                              stretchy: "false",
                              children: "("
                            }), createVNode(_components.mi, {
                              children: "m"
                            }), createVNode(_components.mo, {
                              stretchy: "false",
                              children: ")"
                            })]
                          })]
                        }), createVNode(_components.mo, {
                          children: "="
                        })]
                      })
                    })
                  }), createVNode(_components.mtd, {
                    children: createVNode(_components.mstyle, {
                      scriptlevel: "0",
                      displaystyle: "true",
                      children: createVNode(_components.mrow, {
                        children: [createVNode(_components.mrow, {}), createVNode(_components.munder, {
                          children: [createVNode(_components.mrow, {
                            children: [createVNode(_components.mi, {
                              children: "lim"
                            }), createVNode(_components.mo, {
                              children: "⁡"
                            })]
                          }), createVNode(_components.mrow, {
                            children: [createVNode(_components.mi, {
                              children: "m"
                            }), createVNode(_components.mo, {
                              children: "→"
                            }), createVNode(_components.mi, {
                              mathvariant: "normal",
                              children: "∞"
                            })]
                          })]
                        }), createVNode(_components.mi, {
                          children: "exp"
                        }), createVNode(_components.mo, {
                          children: "⁡"
                        }), createVNode(_components.mrow, {
                          children: [createVNode(_components.mo, {
                            fence: "true",
                            children: "("
                          }), createVNode(_components.mi, {
                            children: "log"
                          }), createVNode(_components.mo, {
                            children: "⁡"
                          }), createVNode(_components.msup, {
                            children: [createVNode(_components.mrow, {
                              children: [createVNode(_components.mo, {
                                fence: "true",
                                children: "("
                              }), createVNode(_components.mfrac, {
                                children: [createVNode(_components.mrow, {
                                  children: [createVNode(_components.mi, {
                                    children: "k"
                                  }), createVNode(_components.mo, {
                                    stretchy: "false",
                                    children: "("
                                  }), createVNode(_components.mi, {
                                    children: "m"
                                  }), createVNode(_components.mo, {
                                    stretchy: "false",
                                    children: ")"
                                  }), createVNode(_components.mo, {
                                    children: "−"
                                  }), createVNode(_components.mn, {
                                    children: "1"
                                  })]
                                }), createVNode(_components.mrow, {
                                  children: [createVNode(_components.mi, {
                                    children: "k"
                                  }), createVNode(_components.mo, {
                                    stretchy: "false",
                                    children: "("
                                  }), createVNode(_components.mi, {
                                    children: "m"
                                  }), createVNode(_components.mo, {
                                    stretchy: "false",
                                    children: ")"
                                  })]
                                })]
                              }), createVNode(_components.mo, {
                                fence: "true",
                                children: ")"
                              })]
                            }), createVNode(_components.mrow, {
                              children: [createVNode(_components.mi, {
                                children: "n"
                              }), createVNode(_components.mo, {
                                stretchy: "false",
                                children: "("
                              }), createVNode(_components.mi, {
                                children: "m"
                              }), createVNode(_components.mo, {
                                stretchy: "false",
                                children: ")"
                              })]
                            })]
                          }), createVNode(_components.mo, {
                            fence: "true",
                            children: ")"
                          })]
                        })]
                      })
                    })
                  })]
                }), createVNode(_components.mtr, {
                  children: [createVNode(_components.mtd, {
                    children: createVNode(_components.mstyle, {
                      scriptlevel: "0",
                      displaystyle: "true",
                      children: createVNode(_components.mo, {
                        lspace: "0em",
                        rspace: "0em",
                        children: "="
                      })
                    })
                  }), createVNode(_components.mtd, {
                    children: createVNode(_components.mstyle, {
                      scriptlevel: "0",
                      displaystyle: "true",
                      children: createVNode(_components.mrow, {
                        children: [createVNode(_components.mrow, {}), createVNode(_components.mi, {
                          children: "exp"
                        }), createVNode(_components.mo, {
                          children: "⁡"
                        }), createVNode(_components.munder, {
                          children: [createVNode(_components.mrow, {
                            children: [createVNode(_components.mi, {
                              children: "lim"
                            }), createVNode(_components.mo, {
                              children: "⁡"
                            })]
                          }), createVNode(_components.mrow, {
                            children: [createVNode(_components.mi, {
                              children: "m"
                            }), createVNode(_components.mo, {
                              children: "→"
                            }), createVNode(_components.mi, {
                              mathvariant: "normal",
                              children: "∞"
                            })]
                          })]
                        }), createVNode(_components.mi, {
                          children: "n"
                        }), createVNode(_components.mo, {
                          stretchy: "false",
                          children: "("
                        }), createVNode(_components.mi, {
                          children: "m"
                        }), createVNode(_components.mo, {
                          stretchy: "false",
                          children: ")"
                        }), createVNode(_components.mo, {
                          children: "⋅"
                        }), createVNode(_components.mi, {
                          children: "log"
                        }), createVNode(_components.mo, {
                          children: "⁡"
                        }), createVNode(_components.mrow, {
                          children: [createVNode(_components.mo, {
                            fence: "true",
                            children: "("
                          }), createVNode(_components.mfrac, {
                            children: [createVNode(_components.mrow, {
                              children: [createVNode(_components.mi, {
                                children: "k"
                              }), createVNode(_components.mo, {
                                stretchy: "false",
                                children: "("
                              }), createVNode(_components.mi, {
                                children: "m"
                              }), createVNode(_components.mo, {
                                stretchy: "false",
                                children: ")"
                              }), createVNode(_components.mo, {
                                children: "−"
                              }), createVNode(_components.mn, {
                                children: "1"
                              })]
                            }), createVNode(_components.mrow, {
                              children: [createVNode(_components.mi, {
                                children: "k"
                              }), createVNode(_components.mo, {
                                stretchy: "false",
                                children: "("
                              }), createVNode(_components.mi, {
                                children: "m"
                              }), createVNode(_components.mo, {
                                stretchy: "false",
                                children: ")"
                              })]
                            })]
                          }), createVNode(_components.mo, {
                            fence: "true",
                            children: ")"
                          })]
                        }), createVNode(_components.mo, {
                          separator: "true",
                          children: ","
                        })]
                      })
                    })
                  })]
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\begin{align*}\n\\lim_{m\\to\\infty} \\left(\\frac{k(m) - 1}{k(m)}\\right)^{n(m)} =& \\lim_{m\\to\\infty} \\exp\\left(\\log\\left(\\frac{k(m) - 1}{k(m)} \\right)^{n(m)} \\right) \\\\\n=& \\exp\\lim_{m\\to\\infty} n(m) \\cdot \\log\\left(\\frac{k(m) - 1}{k(m)} \\right),\n\\end{align*}"
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
                height: "6.0001em",
                verticalAlign: "-2.75em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: createVNode(_components.span, {
                class: "mtable",
                children: [createVNode(_components.span, {
                  class: "col-align-r",
                  children: createVNode(_components.span, {
                    class: "vlist-t vlist-t2",
                    children: [createVNode(_components.span, {
                      class: "vlist-r",
                      children: [createVNode(_components.span, {
                        class: "vlist",
                        style: {
                          height: "3.25em"
                        },
                        children: [createVNode(_components.span, {
                          style: {
                            top: "-5.25em"
                          },
                          children: [createVNode(_components.span, {
                            class: "pstrut",
                            style: {
                              height: "3.75em"
                            }
                          }), createVNode(_components.span, {
                            class: "mord",
                            children: [createVNode(_components.span, {
                              class: "mop op-limits",
                              children: createVNode(_components.span, {
                                class: "vlist-t vlist-t2",
                                children: [createVNode(_components.span, {
                                  class: "vlist-r",
                                  children: [createVNode(_components.span, {
                                    class: "vlist",
                                    style: {
                                      height: "0.6944em"
                                    },
                                    children: [createVNode(_components.span, {
                                      style: {
                                        top: "-2.4em",
                                        marginLeft: "0em"
                                      },
                                      children: [createVNode(_components.span, {
                                        class: "pstrut",
                                        style: {
                                          height: "3em"
                                        }
                                      }), createVNode(_components.span, {
                                        class: "sizing reset-size6 size3 mtight",
                                        children: createVNode(_components.span, {
                                          class: "mord mtight",
                                          children: [createVNode(_components.span, {
                                            class: "mord mathnormal mtight",
                                            children: "m"
                                          }), createVNode(_components.span, {
                                            class: "mrel mtight",
                                            children: "→"
                                          }), createVNode(_components.span, {
                                            class: "mord mtight",
                                            children: "∞"
                                          })]
                                        })
                                      })]
                                    }), createVNode(_components.span, {
                                      style: {
                                        top: "-3em"
                                      },
                                      children: [createVNode(_components.span, {
                                        class: "pstrut",
                                        style: {
                                          height: "3em"
                                        }
                                      }), createVNode(_components.span, {
                                        children: createVNode(_components.span, {
                                          class: "mop",
                                          children: "lim"
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
                                      height: "0.7em"
                                    },
                                    children: createVNode(_components.span, {})
                                  })
                                })]
                              })
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.1667em"
                              }
                            }), createVNode(_components.span, {
                              class: "minner",
                              children: [createVNode(_components.span, {
                                class: "minner",
                                children: [createVNode(_components.span, {
                                  class: "mopen delimcenter",
                                  style: {
                                    top: "0em"
                                  },
                                  children: createVNode(_components.span, {
                                    class: "delimsizing size3",
                                    children: "("
                                  })
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
                                            height: "1.427em"
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
                                              children: [createVNode(_components.span, {
                                                class: "mord mathnormal",
                                                style: {
                                                  marginRight: "0.03148em"
                                                },
                                                children: "k"
                                              }), createVNode(_components.span, {
                                                class: "mopen",
                                                children: "("
                                              }), createVNode(_components.span, {
                                                class: "mord mathnormal",
                                                children: "m"
                                              }), createVNode(_components.span, {
                                                class: "mclose",
                                                children: ")"
                                              })]
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
                                              children: [createVNode(_components.span, {
                                                class: "mord mathnormal",
                                                style: {
                                                  marginRight: "0.03148em"
                                                },
                                                children: "k"
                                              }), createVNode(_components.span, {
                                                class: "mopen",
                                                children: "("
                                              }), createVNode(_components.span, {
                                                class: "mord mathnormal",
                                                children: "m"
                                              }), createVNode(_components.span, {
                                                class: "mclose",
                                                children: ")"
                                              }), createVNode(_components.span, {
                                                class: "mspace",
                                                style: {
                                                  marginRight: "0.2222em"
                                                }
                                              }), createVNode(_components.span, {
                                                class: "mbin",
                                                children: "−"
                                              }), createVNode(_components.span, {
                                                class: "mspace",
                                                style: {
                                                  marginRight: "0.2222em"
                                                }
                                              }), createVNode(_components.span, {
                                                class: "mord",
                                                children: "1"
                                              })]
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
                                            height: "0.936em"
                                          },
                                          children: createVNode(_components.span, {})
                                        })
                                      })]
                                    })
                                  }), createVNode(_components.span, {
                                    class: "mclose nulldelimiter"
                                  })]
                                }), createVNode(_components.span, {
                                  class: "mclose delimcenter",
                                  style: {
                                    top: "0em"
                                  },
                                  children: createVNode(_components.span, {
                                    class: "delimsizing size3",
                                    children: ")"
                                  })
                                })]
                              }), createVNode(_components.span, {
                                class: "msupsub",
                                children: createVNode(_components.span, {
                                  class: "vlist-t",
                                  children: createVNode(_components.span, {
                                    class: "vlist-r",
                                    children: createVNode(_components.span, {
                                      class: "vlist",
                                      style: {
                                        height: "1.7279em"
                                      },
                                      children: createVNode(_components.span, {
                                        style: {
                                          top: "-3.9029em",
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
                                              class: "mord mathnormal mtight",
                                              children: "n"
                                            }), createVNode(_components.span, {
                                              class: "mopen mtight",
                                              children: "("
                                            }), createVNode(_components.span, {
                                              class: "mord mathnormal mtight",
                                              children: "m"
                                            }), createVNode(_components.span, {
                                              class: "mclose mtight",
                                              children: ")"
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
                                marginRight: "0.2778em"
                              }
                            }), createVNode(_components.span, {
                              class: "mrel",
                              children: "="
                            })]
                          })]
                        }), createVNode(_components.span, {
                          style: {
                            top: "-2.25em"
                          },
                          children: [createVNode(_components.span, {
                            class: "pstrut",
                            style: {
                              height: "3.75em"
                            }
                          }), createVNode(_components.span, {
                            class: "mord",
                            children: createVNode(_components.span, {
                              class: "mrel",
                              children: "="
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
                          height: "2.75em"
                        },
                        children: createVNode(_components.span, {})
                      })
                    })]
                  })
                }), createVNode(_components.span, {
                  class: "col-align-l",
                  children: createVNode(_components.span, {
                    class: "vlist-t vlist-t2",
                    children: [createVNode(_components.span, {
                      class: "vlist-r",
                      children: [createVNode(_components.span, {
                        class: "vlist",
                        style: {
                          height: "3.25em"
                        },
                        children: [createVNode(_components.span, {
                          style: {
                            top: "-5.25em"
                          },
                          children: [createVNode(_components.span, {
                            class: "pstrut",
                            style: {
                              height: "3.75em"
                            }
                          }), createVNode(_components.span, {
                            class: "mord",
                            children: [createVNode(_components.span, {
                              class: "mord"
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.1667em"
                              }
                            }), createVNode(_components.span, {
                              class: "mop op-limits",
                              children: createVNode(_components.span, {
                                class: "vlist-t vlist-t2",
                                children: [createVNode(_components.span, {
                                  class: "vlist-r",
                                  children: [createVNode(_components.span, {
                                    class: "vlist",
                                    style: {
                                      height: "0.6944em"
                                    },
                                    children: [createVNode(_components.span, {
                                      style: {
                                        top: "-2.4em",
                                        marginLeft: "0em"
                                      },
                                      children: [createVNode(_components.span, {
                                        class: "pstrut",
                                        style: {
                                          height: "3em"
                                        }
                                      }), createVNode(_components.span, {
                                        class: "sizing reset-size6 size3 mtight",
                                        children: createVNode(_components.span, {
                                          class: "mord mtight",
                                          children: [createVNode(_components.span, {
                                            class: "mord mathnormal mtight",
                                            children: "m"
                                          }), createVNode(_components.span, {
                                            class: "mrel mtight",
                                            children: "→"
                                          }), createVNode(_components.span, {
                                            class: "mord mtight",
                                            children: "∞"
                                          })]
                                        })
                                      })]
                                    }), createVNode(_components.span, {
                                      style: {
                                        top: "-3em"
                                      },
                                      children: [createVNode(_components.span, {
                                        class: "pstrut",
                                        style: {
                                          height: "3em"
                                        }
                                      }), createVNode(_components.span, {
                                        children: createVNode(_components.span, {
                                          class: "mop",
                                          children: "lim"
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
                                      height: "0.7em"
                                    },
                                    children: createVNode(_components.span, {})
                                  })
                                })]
                              })
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.1667em"
                              }
                            }), createVNode(_components.span, {
                              class: "mop",
                              children: "exp"
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.1667em"
                              }
                            }), createVNode(_components.span, {
                              class: "minner",
                              children: [createVNode(_components.span, {
                                class: "mopen delimcenter",
                                style: {
                                  top: "0em"
                                },
                                children: createVNode(_components.span, {
                                  class: "delimsizing size4",
                                  children: "("
                                })
                              }), createVNode(_components.span, {
                                class: "mop",
                                children: ["lo", createVNode(_components.span, {
                                  style: {
                                    marginRight: "0.01389em"
                                  },
                                  children: "g"
                                })]
                              }), createVNode(_components.span, {
                                class: "mspace",
                                style: {
                                  marginRight: "0.1667em"
                                }
                              }), createVNode(_components.span, {
                                class: "minner",
                                children: [createVNode(_components.span, {
                                  class: "minner",
                                  children: [createVNode(_components.span, {
                                    class: "mopen delimcenter",
                                    style: {
                                      top: "0em"
                                    },
                                    children: createVNode(_components.span, {
                                      class: "delimsizing size3",
                                      children: "("
                                    })
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
                                              height: "1.427em"
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
                                                children: [createVNode(_components.span, {
                                                  class: "mord mathnormal",
                                                  style: {
                                                    marginRight: "0.03148em"
                                                  },
                                                  children: "k"
                                                }), createVNode(_components.span, {
                                                  class: "mopen",
                                                  children: "("
                                                }), createVNode(_components.span, {
                                                  class: "mord mathnormal",
                                                  children: "m"
                                                }), createVNode(_components.span, {
                                                  class: "mclose",
                                                  children: ")"
                                                })]
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
                                                children: [createVNode(_components.span, {
                                                  class: "mord mathnormal",
                                                  style: {
                                                    marginRight: "0.03148em"
                                                  },
                                                  children: "k"
                                                }), createVNode(_components.span, {
                                                  class: "mopen",
                                                  children: "("
                                                }), createVNode(_components.span, {
                                                  class: "mord mathnormal",
                                                  children: "m"
                                                }), createVNode(_components.span, {
                                                  class: "mclose",
                                                  children: ")"
                                                }), createVNode(_components.span, {
                                                  class: "mspace",
                                                  style: {
                                                    marginRight: "0.2222em"
                                                  }
                                                }), createVNode(_components.span, {
                                                  class: "mbin",
                                                  children: "−"
                                                }), createVNode(_components.span, {
                                                  class: "mspace",
                                                  style: {
                                                    marginRight: "0.2222em"
                                                  }
                                                }), createVNode(_components.span, {
                                                  class: "mord",
                                                  children: "1"
                                                })]
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
                                              height: "0.936em"
                                            },
                                            children: createVNode(_components.span, {})
                                          })
                                        })]
                                      })
                                    }), createVNode(_components.span, {
                                      class: "mclose nulldelimiter"
                                    })]
                                  }), createVNode(_components.span, {
                                    class: "mclose delimcenter",
                                    style: {
                                      top: "0em"
                                    },
                                    children: createVNode(_components.span, {
                                      class: "delimsizing size3",
                                      children: ")"
                                    })
                                  })]
                                }), createVNode(_components.span, {
                                  class: "msupsub",
                                  children: createVNode(_components.span, {
                                    class: "vlist-t",
                                    children: createVNode(_components.span, {
                                      class: "vlist-r",
                                      children: createVNode(_components.span, {
                                        class: "vlist",
                                        style: {
                                          height: "1.7279em"
                                        },
                                        children: createVNode(_components.span, {
                                          style: {
                                            top: "-3.9029em",
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
                                                class: "mord mathnormal mtight",
                                                children: "n"
                                              }), createVNode(_components.span, {
                                                class: "mopen mtight",
                                                children: "("
                                              }), createVNode(_components.span, {
                                                class: "mord mathnormal mtight",
                                                children: "m"
                                              }), createVNode(_components.span, {
                                                class: "mclose mtight",
                                                children: ")"
                                              })]
                                            })
                                          })]
                                        })
                                      })
                                    })
                                  })
                                })]
                              }), createVNode(_components.span, {
                                class: "mclose delimcenter",
                                style: {
                                  top: "0em"
                                },
                                children: createVNode(_components.span, {
                                  class: "delimsizing size4",
                                  children: ")"
                                })
                              })]
                            })]
                          })]
                        }), createVNode(_components.span, {
                          style: {
                            top: "-2.25em"
                          },
                          children: [createVNode(_components.span, {
                            class: "pstrut",
                            style: {
                              height: "3.75em"
                            }
                          }), createVNode(_components.span, {
                            class: "mord",
                            children: [createVNode(_components.span, {
                              class: "mord"
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.1667em"
                              }
                            }), createVNode(_components.span, {
                              class: "mop",
                              children: "exp"
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.1667em"
                              }
                            }), createVNode(_components.span, {
                              class: "mop op-limits",
                              children: createVNode(_components.span, {
                                class: "vlist-t vlist-t2",
                                children: [createVNode(_components.span, {
                                  class: "vlist-r",
                                  children: [createVNode(_components.span, {
                                    class: "vlist",
                                    style: {
                                      height: "0.6944em"
                                    },
                                    children: [createVNode(_components.span, {
                                      style: {
                                        top: "-2.4em",
                                        marginLeft: "0em"
                                      },
                                      children: [createVNode(_components.span, {
                                        class: "pstrut",
                                        style: {
                                          height: "3em"
                                        }
                                      }), createVNode(_components.span, {
                                        class: "sizing reset-size6 size3 mtight",
                                        children: createVNode(_components.span, {
                                          class: "mord mtight",
                                          children: [createVNode(_components.span, {
                                            class: "mord mathnormal mtight",
                                            children: "m"
                                          }), createVNode(_components.span, {
                                            class: "mrel mtight",
                                            children: "→"
                                          }), createVNode(_components.span, {
                                            class: "mord mtight",
                                            children: "∞"
                                          })]
                                        })
                                      })]
                                    }), createVNode(_components.span, {
                                      style: {
                                        top: "-3em"
                                      },
                                      children: [createVNode(_components.span, {
                                        class: "pstrut",
                                        style: {
                                          height: "3em"
                                        }
                                      }), createVNode(_components.span, {
                                        children: createVNode(_components.span, {
                                          class: "mop",
                                          children: "lim"
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
                                      height: "0.7em"
                                    },
                                    children: createVNode(_components.span, {})
                                  })
                                })]
                              })
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.1667em"
                              }
                            }), createVNode(_components.span, {
                              class: "mord mathnormal",
                              children: "n"
                            }), createVNode(_components.span, {
                              class: "mopen",
                              children: "("
                            }), createVNode(_components.span, {
                              class: "mord mathnormal",
                              children: "m"
                            }), createVNode(_components.span, {
                              class: "mclose",
                              children: ")"
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2222em"
                              }
                            }), createVNode(_components.span, {
                              class: "mbin",
                              children: "⋅"
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2222em"
                              }
                            }), createVNode(_components.span, {
                              class: "mop",
                              children: ["lo", createVNode(_components.span, {
                                style: {
                                  marginRight: "0.01389em"
                                },
                                children: "g"
                              })]
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.1667em"
                              }
                            }), createVNode(_components.span, {
                              class: "minner",
                              children: [createVNode(_components.span, {
                                class: "mopen delimcenter",
                                style: {
                                  top: "0em"
                                },
                                children: createVNode(_components.span, {
                                  class: "delimsizing size3",
                                  children: "("
                                })
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
                                          height: "1.427em"
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
                                            children: [createVNode(_components.span, {
                                              class: "mord mathnormal",
                                              style: {
                                                marginRight: "0.03148em"
                                              },
                                              children: "k"
                                            }), createVNode(_components.span, {
                                              class: "mopen",
                                              children: "("
                                            }), createVNode(_components.span, {
                                              class: "mord mathnormal",
                                              children: "m"
                                            }), createVNode(_components.span, {
                                              class: "mclose",
                                              children: ")"
                                            })]
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
                                            children: [createVNode(_components.span, {
                                              class: "mord mathnormal",
                                              style: {
                                                marginRight: "0.03148em"
                                              },
                                              children: "k"
                                            }), createVNode(_components.span, {
                                              class: "mopen",
                                              children: "("
                                            }), createVNode(_components.span, {
                                              class: "mord mathnormal",
                                              children: "m"
                                            }), createVNode(_components.span, {
                                              class: "mclose",
                                              children: ")"
                                            }), createVNode(_components.span, {
                                              class: "mspace",
                                              style: {
                                                marginRight: "0.2222em"
                                              }
                                            }), createVNode(_components.span, {
                                              class: "mbin",
                                              children: "−"
                                            }), createVNode(_components.span, {
                                              class: "mspace",
                                              style: {
                                                marginRight: "0.2222em"
                                              }
                                            }), createVNode(_components.span, {
                                              class: "mord",
                                              children: "1"
                                            })]
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
                                          height: "0.936em"
                                        },
                                        children: createVNode(_components.span, {})
                                      })
                                    })]
                                  })
                                }), createVNode(_components.span, {
                                  class: "mclose nulldelimiter"
                                })]
                              }), createVNode(_components.span, {
                                class: "mclose delimcenter",
                                style: {
                                  top: "0em"
                                },
                                children: createVNode(_components.span, {
                                  class: "delimsizing size3",
                                  children: ")"
                                })
                              })]
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.1667em"
                              }
                            }), createVNode(_components.span, {
                              class: "mpunct",
                              children: ","
                            })]
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
                          height: "2.75em"
                        },
                        children: createVNode(_components.span, {})
                      })
                    })]
                  })
                })]
              })
            })]
          })
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: "and we’ll focus on the limit:"
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
                children: [createVNode(_components.munder, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "lim"
                    }), createVNode(_components.mo, {
                      children: "⁡"
                    })]
                  }), createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "m"
                    }), createVNode(_components.mo, {
                      children: "→"
                    }), createVNode(_components.mi, {
                      mathvariant: "normal",
                      children: "∞"
                    })]
                  })]
                }), createVNode(_components.mi, {
                  mathvariant: "script",
                  children: "L"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "k"
                }), createVNode(_components.mo, {
                  separator: "true",
                  children: ","
                }), createVNode(_components.mi, {
                  children: "n"
                }), createVNode(_components.mo, {
                  separator: "true",
                  children: ";"
                }), createVNode(_components.mi, {
                  children: "m"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.munder, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "lim"
                    }), createVNode(_components.mo, {
                      children: "⁡"
                    })]
                  }), createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "m"
                    }), createVNode(_components.mo, {
                      children: "→"
                    }), createVNode(_components.mi, {
                      mathvariant: "normal",
                      children: "∞"
                    })]
                  })]
                }), createVNode(_components.mi, {
                  children: "n"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "m"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "⋅"
                }), createVNode(_components.mi, {
                  children: "log"
                }), createVNode(_components.mo, {
                  children: "⁡"
                }), createVNode(_components.mrow, {
                  children: [createVNode(_components.mo, {
                    fence: "true",
                    children: "("
                  }), createVNode(_components.mfrac, {
                    children: [createVNode(_components.mrow, {
                      children: [createVNode(_components.mi, {
                        children: "k"
                      }), createVNode(_components.mo, {
                        stretchy: "false",
                        children: "("
                      }), createVNode(_components.mi, {
                        children: "m"
                      }), createVNode(_components.mo, {
                        stretchy: "false",
                        children: ")"
                      }), createVNode(_components.mo, {
                        children: "−"
                      }), createVNode(_components.mn, {
                        children: "1"
                      })]
                    }), createVNode(_components.mrow, {
                      children: [createVNode(_components.mi, {
                        children: "k"
                      }), createVNode(_components.mo, {
                        stretchy: "false",
                        children: "("
                      }), createVNode(_components.mi, {
                        children: "m"
                      }), createVNode(_components.mo, {
                        stretchy: "false",
                        children: ")"
                      })]
                    })]
                  }), createVNode(_components.mo, {
                    fence: "true",
                    children: ")"
                  })]
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "."
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\lim_{m\\to\\infty}{\\mathcal L}(k, n; m) = \\lim_{m\\to\\infty} n(m) \\cdot \\log\\left(\\frac{k(m) - 1}{k(m)} \\right)."
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
                height: "1.45em",
                verticalAlign: "-0.7em"
              }
            }), createVNode(_components.span, {
              class: "mop op-limits",
              children: createVNode(_components.span, {
                class: "vlist-t vlist-t2",
                children: [createVNode(_components.span, {
                  class: "vlist-r",
                  children: [createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.6944em"
                    },
                    children: [createVNode(_components.span, {
                      style: {
                        top: "-2.4em",
                        marginLeft: "0em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "sizing reset-size6 size3 mtight",
                        children: createVNode(_components.span, {
                          class: "mord mtight",
                          children: [createVNode(_components.span, {
                            class: "mord mathnormal mtight",
                            children: "m"
                          }), createVNode(_components.span, {
                            class: "mrel mtight",
                            children: "→"
                          }), createVNode(_components.span, {
                            class: "mord mtight",
                            children: "∞"
                          })]
                        })
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-3em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        children: createVNode(_components.span, {
                          class: "mop",
                          children: "lim"
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
                      height: "0.7em"
                    },
                    children: createVNode(_components.span, {})
                  })
                })]
              })
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: createVNode(_components.span, {
                class: "mord mathcal",
                children: "L"
              })
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.03148em"
              },
              children: "k"
            }), createVNode(_components.span, {
              class: "mpunct",
              children: ","
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "n"
            }), createVNode(_components.span, {
              class: "mpunct",
              children: ";"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            }), createVNode(_components.span, {
              class: "mclose",
              children: ")"
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
                height: "1.45em",
                verticalAlign: "-0.7em"
              }
            }), createVNode(_components.span, {
              class: "mop op-limits",
              children: createVNode(_components.span, {
                class: "vlist-t vlist-t2",
                children: [createVNode(_components.span, {
                  class: "vlist-r",
                  children: [createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.6944em"
                    },
                    children: [createVNode(_components.span, {
                      style: {
                        top: "-2.4em",
                        marginLeft: "0em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "sizing reset-size6 size3 mtight",
                        children: createVNode(_components.span, {
                          class: "mord mtight",
                          children: [createVNode(_components.span, {
                            class: "mord mathnormal mtight",
                            children: "m"
                          }), createVNode(_components.span, {
                            class: "mrel mtight",
                            children: "→"
                          }), createVNode(_components.span, {
                            class: "mord mtight",
                            children: "∞"
                          })]
                        })
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-3em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        children: createVNode(_components.span, {
                          class: "mop",
                          children: "lim"
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
                      height: "0.7em"
                    },
                    children: createVNode(_components.span, {})
                  })
                })]
              })
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "n"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            }), createVNode(_components.span, {
              class: "mclose",
              children: ")"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2222em"
              }
            }), createVNode(_components.span, {
              class: "mbin",
              children: "⋅"
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
                height: "2.4em",
                verticalAlign: "-0.95em"
              }
            }), createVNode(_components.span, {
              class: "mop",
              children: ["lo", createVNode(_components.span, {
                style: {
                  marginRight: "0.01389em"
                },
                children: "g"
              })]
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "minner",
              children: [createVNode(_components.span, {
                class: "mopen delimcenter",
                style: {
                  top: "0em"
                },
                children: createVNode(_components.span, {
                  class: "delimsizing size3",
                  children: "("
                })
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
                          height: "1.427em"
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
                            children: [createVNode(_components.span, {
                              class: "mord mathnormal",
                              style: {
                                marginRight: "0.03148em"
                              },
                              children: "k"
                            }), createVNode(_components.span, {
                              class: "mopen",
                              children: "("
                            }), createVNode(_components.span, {
                              class: "mord mathnormal",
                              children: "m"
                            }), createVNode(_components.span, {
                              class: "mclose",
                              children: ")"
                            })]
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
                            children: [createVNode(_components.span, {
                              class: "mord mathnormal",
                              style: {
                                marginRight: "0.03148em"
                              },
                              children: "k"
                            }), createVNode(_components.span, {
                              class: "mopen",
                              children: "("
                            }), createVNode(_components.span, {
                              class: "mord mathnormal",
                              children: "m"
                            }), createVNode(_components.span, {
                              class: "mclose",
                              children: ")"
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2222em"
                              }
                            }), createVNode(_components.span, {
                              class: "mbin",
                              children: "−"
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2222em"
                              }
                            }), createVNode(_components.span, {
                              class: "mord",
                              children: "1"
                            })]
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
                          height: "0.936em"
                        },
                        children: createVNode(_components.span, {})
                      })
                    })]
                  })
                }), createVNode(_components.span, {
                  class: "mclose nulldelimiter"
                })]
              }), createVNode(_components.span, {
                class: "mclose delimcenter",
                style: {
                  top: "0em"
                },
                children: createVNode(_components.span, {
                  class: "delimsizing size3",
                  children: ")"
                })
              })]
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: "."
            })]
          })]
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: ["The previously considered limits: constant ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "k"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "k"
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
                height: "0.6944em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.03148em"
              },
              children: "k"
            })]
          })
        })]
      }), " and constant ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "n"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "n"
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
              children: "n"
            })]
          })
        })]
      }), " are special cases of this limit and provides an interesting nugget of intuition. For constant ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mi, {
                  children: "k"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "m"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: ":"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.msup, {
                  children: [createVNode(_components.mi, {
                    children: "k"
                  }), createVNode(_components.mo, {
                    children: "∗"
                  })]
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "k(m) := k^*"
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
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.03148em"
              },
              children: "k"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            }), createVNode(_components.span, {
              class: "mclose",
              children: ")"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2778em"
              }
            }), createVNode(_components.span, {
              class: "mrel",
              children: ":="
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
                height: "0.6944em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.03148em"
                },
                children: "k"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t",
                  children: createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.6887em"
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
                            class: "mbin mtight",
                            children: "∗"
                          })
                        })]
                      })
                    })
                  })
                })
              })]
            })]
          })]
        })]
      }), " and ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mi, {
                  children: "n"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "m"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: ":"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mi, {
                  children: "m"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "n(m) := m"
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
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "n"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            }), createVNode(_components.span, {
              class: "mclose",
              children: ")"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2778em"
              }
            }), createVNode(_components.span, {
              class: "mrel",
              children: ":="
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
                height: "0.4306em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            })]
          })]
        })]
      }), ", ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.msub, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "lim"
                    }), createVNode(_components.mo, {
                      children: "⁡"
                    })]
                  }), createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "m"
                    }), createVNode(_components.mo, {
                      children: "→"
                    }), createVNode(_components.mi, {
                      mathvariant: "normal",
                      children: "∞"
                    })]
                  })]
                }), createVNode(_components.mrow, {
                  children: [createVNode(_components.mi, {
                    mathvariant: "script",
                    children: "L"
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: "("
                  }), createVNode(_components.msup, {
                    children: [createVNode(_components.mi, {
                      children: "k"
                    }), createVNode(_components.mo, {
                      children: "∗"
                    })]
                  }), createVNode(_components.mo, {
                    separator: "true",
                    children: ","
                  }), createVNode(_components.mi, {
                    children: "m"
                  }), createVNode(_components.mo, {
                    separator: "true",
                    children: ";"
                  }), createVNode(_components.mi, {
                    children: "m"
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: ")"
                  })]
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "∞"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\lim_{m\\to\\infty}{\\mathcal{L}(k^*, m; m)} = \\infty"
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
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mop",
              children: [createVNode(_components.span, {
                class: "mop",
                children: "lim"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t vlist-t2",
                  children: [createVNode(_components.span, {
                    class: "vlist-r",
                    children: [createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.1514em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-2.55em",
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
                              class: "mord mathnormal mtight",
                              children: "m"
                            }), createVNode(_components.span, {
                              class: "mrel mtight",
                              children: "→"
                            }), createVNode(_components.span, {
                              class: "mord mtight",
                              children: "∞"
                            })]
                          })
                        })]
                      })
                    }), createVNode(_components.span, {
                      class: "vlist-s",
                      children: "​"
                    })]
                  }), createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.15em"
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
                class: "mord mathcal",
                children: "L"
              }), createVNode(_components.span, {
                class: "mopen",
                children: "("
              }), createVNode(_components.span, {
                class: "mord",
                children: [createVNode(_components.span, {
                  class: "mord mathnormal",
                  style: {
                    marginRight: "0.03148em"
                  },
                  children: "k"
                }), createVNode(_components.span, {
                  class: "msupsub",
                  children: createVNode(_components.span, {
                    class: "vlist-t",
                    children: createVNode(_components.span, {
                      class: "vlist-r",
                      children: createVNode(_components.span, {
                        class: "vlist",
                        style: {
                          height: "0.6887em"
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
                              class: "mbin mtight",
                              children: "∗"
                            })
                          })]
                        })
                      })
                    })
                  })
                })]
              }), createVNode(_components.span, {
                class: "mpunct",
                children: ","
              }), createVNode(_components.span, {
                class: "mspace",
                style: {
                  marginRight: "0.1667em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                children: "m"
              }), createVNode(_components.span, {
                class: "mpunct",
                children: ";"
              }), createVNode(_components.span, {
                class: "mspace",
                style: {
                  marginRight: "0.1667em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                children: "m"
              }), createVNode(_components.span, {
                class: "mclose",
                children: ")"
              })]
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
                height: "0.4306em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: "∞"
            })]
          })]
        })]
      }), ", but we don’t learn how quickly this limit diverges. Of course, a quick look at the definition of ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mi, {
                  mathvariant: "script",
                  children: "L"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "k"
                }), createVNode(_components.mo, {
                  separator: "true",
                  children: ","
                }), createVNode(_components.mi, {
                  children: "n"
                }), createVNode(_components.mo, {
                  separator: "true",
                  children: ";"
                }), createVNode(_components.mi, {
                  children: "m"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "{\\mathcal L}(k, n; m)"
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
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: createVNode(_components.span, {
                class: "mord mathcal",
                children: "L"
              })
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.03148em"
              },
              children: "k"
            }), createVNode(_components.span, {
              class: "mpunct",
              children: ","
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "n"
            }), createVNode(_components.span, {
              class: "mpunct",
              children: ";"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            }), createVNode(_components.span, {
              class: "mclose",
              children: ")"
            })]
          })
        })]
      }), " shows that it diverges linearly. To show this rigorously, one considers not ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.msub, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "lim"
                    }), createVNode(_components.mo, {
                      children: "⁡"
                    })]
                  }), createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "m"
                    }), createVNode(_components.mo, {
                      children: "→"
                    }), createVNode(_components.mi, {
                      mathvariant: "normal",
                      children: "∞"
                    })]
                  })]
                }), createVNode(_components.mi, {
                  mathvariant: "script",
                  children: "L"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\lim_{m\\to\\infty}{\\mathcal L}"
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
                height: "0.8444em",
                verticalAlign: "-0.15em"
              }
            }), createVNode(_components.span, {
              class: "mop",
              children: [createVNode(_components.span, {
                class: "mop",
                children: "lim"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t vlist-t2",
                  children: [createVNode(_components.span, {
                    class: "vlist-r",
                    children: [createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.1514em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-2.55em",
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
                              class: "mord mathnormal mtight",
                              children: "m"
                            }), createVNode(_components.span, {
                              class: "mrel mtight",
                              children: "→"
                            }), createVNode(_components.span, {
                              class: "mord mtight",
                              children: "∞"
                            })]
                          })
                        })]
                      })
                    }), createVNode(_components.span, {
                      class: "vlist-s",
                      children: "​"
                    })]
                  }), createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.15em"
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
              children: createVNode(_components.span, {
                class: "mord mathcal",
                children: "L"
              })
            })]
          })
        })]
      }), ", but instead:"]
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
                children: [createVNode(_components.munder, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "lim"
                    }), createVNode(_components.mo, {
                      children: "⁡"
                    })]
                  }), createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "m"
                    }), createVNode(_components.mo, {
                      children: "→"
                    }), createVNode(_components.mi, {
                      mathvariant: "normal",
                      children: "∞"
                    })]
                  })]
                }), createVNode(_components.mfrac, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      mathvariant: "script",
                      children: "L"
                    }), createVNode(_components.mo, {
                      stretchy: "false",
                      children: "("
                    }), createVNode(_components.msup, {
                      children: [createVNode(_components.mi, {
                        children: "k"
                      }), createVNode(_components.mo, {
                        children: "∗"
                      })]
                    }), createVNode(_components.mo, {
                      separator: "true",
                      children: ","
                    }), createVNode(_components.mi, {
                      children: "m"
                    }), createVNode(_components.mo, {
                      separator: "true",
                      children: ";"
                    }), createVNode(_components.mi, {
                      children: "m"
                    }), createVNode(_components.mo, {
                      stretchy: "false",
                      children: ")"
                    })]
                  }), createVNode(_components.mi, {
                    children: "m"
                  })]
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mi, {
                  children: "log"
                }), createVNode(_components.mo, {
                  children: "⁡"
                }), createVNode(_components.mfrac, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.msup, {
                      children: [createVNode(_components.mi, {
                        children: "k"
                      }), createVNode(_components.mo, {
                        children: "∗"
                      })]
                    }), createVNode(_components.mo, {
                      children: "−"
                    }), createVNode(_components.mn, {
                      children: "1"
                    })]
                  }), createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "k"
                    }), createVNode(_components.mo, {
                      children: "∗"
                    })]
                  })]
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mi, {
                  children: "C"
                }), createVNode(_components.mtext, {
                  children: " (a constant)"
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "."
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\lim_{m\\to\\infty}\\frac{\\mathcal L(k^*, m; m)}{m} = \\log\\frac{k^* - 1}{k*} = C \\textrm{ (a constant)}."
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
                height: "2.127em",
                verticalAlign: "-0.7em"
              }
            }), createVNode(_components.span, {
              class: "mop op-limits",
              children: createVNode(_components.span, {
                class: "vlist-t vlist-t2",
                children: [createVNode(_components.span, {
                  class: "vlist-r",
                  children: [createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.6944em"
                    },
                    children: [createVNode(_components.span, {
                      style: {
                        top: "-2.4em",
                        marginLeft: "0em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "sizing reset-size6 size3 mtight",
                        children: createVNode(_components.span, {
                          class: "mord mtight",
                          children: [createVNode(_components.span, {
                            class: "mord mathnormal mtight",
                            children: "m"
                          }), createVNode(_components.span, {
                            class: "mrel mtight",
                            children: "→"
                          }), createVNode(_components.span, {
                            class: "mord mtight",
                            children: "∞"
                          })]
                        })
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-3em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        children: createVNode(_components.span, {
                          class: "mop",
                          children: "lim"
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
                      height: "0.7em"
                    },
                    children: createVNode(_components.span, {})
                  })
                })]
              })
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
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
                        height: "1.427em"
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
                            class: "mord mathnormal",
                            children: "m"
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
                          children: [createVNode(_components.span, {
                            class: "mord mathcal",
                            children: "L"
                          }), createVNode(_components.span, {
                            class: "mopen",
                            children: "("
                          }), createVNode(_components.span, {
                            class: "mord",
                            children: [createVNode(_components.span, {
                              class: "mord mathnormal",
                              style: {
                                marginRight: "0.03148em"
                              },
                              children: "k"
                            }), createVNode(_components.span, {
                              class: "msupsub",
                              children: createVNode(_components.span, {
                                class: "vlist-t",
                                children: createVNode(_components.span, {
                                  class: "vlist-r",
                                  children: createVNode(_components.span, {
                                    class: "vlist",
                                    style: {
                                      height: "0.6887em"
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
                                          class: "mbin mtight",
                                          children: "∗"
                                        })
                                      })]
                                    })
                                  })
                                })
                              })
                            })]
                          }), createVNode(_components.span, {
                            class: "mpunct",
                            children: ","
                          }), createVNode(_components.span, {
                            class: "mspace",
                            style: {
                              marginRight: "0.1667em"
                            }
                          }), createVNode(_components.span, {
                            class: "mord mathnormal",
                            children: "m"
                          }), createVNode(_components.span, {
                            class: "mpunct",
                            children: ";"
                          }), createVNode(_components.span, {
                            class: "mspace",
                            style: {
                              marginRight: "0.1667em"
                            }
                          }), createVNode(_components.span, {
                            class: "mord mathnormal",
                            children: "m"
                          }), createVNode(_components.span, {
                            class: "mclose",
                            children: ")"
                          })]
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
                height: "2.0574em",
                verticalAlign: "-0.686em"
              }
            }), createVNode(_components.span, {
              class: "mop",
              children: ["lo", createVNode(_components.span, {
                style: {
                  marginRight: "0.01389em"
                },
                children: "g"
              })]
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
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
                        height: "1.3714em"
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
                          children: [createVNode(_components.span, {
                            class: "mord mathnormal",
                            style: {
                              marginRight: "0.03148em"
                            },
                            children: "k"
                          }), createVNode(_components.span, {
                            class: "mord",
                            children: "∗"
                          })]
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
                          children: [createVNode(_components.span, {
                            class: "mord",
                            children: [createVNode(_components.span, {
                              class: "mord mathnormal",
                              style: {
                                marginRight: "0.03148em"
                              },
                              children: "k"
                            }), createVNode(_components.span, {
                              class: "msupsub",
                              children: createVNode(_components.span, {
                                class: "vlist-t",
                                children: createVNode(_components.span, {
                                  class: "vlist-r",
                                  children: createVNode(_components.span, {
                                    class: "vlist",
                                    style: {
                                      height: "0.6887em"
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
                                          class: "mbin mtight",
                                          children: "∗"
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
                            children: "−"
                          }), createVNode(_components.span, {
                            class: "mspace",
                            style: {
                              marginRight: "0.2222em"
                            }
                          }), createVNode(_components.span, {
                            class: "mord",
                            children: "1"
                          })]
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
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.07153em"
              },
              children: "C"
            }), createVNode(_components.span, {
              class: "mord text",
              children: createVNode(_components.span, {
                class: "mord textrm",
                children: " (a constant)"
              })
            }), createVNode(_components.span, {
              class: "mord",
              children: "."
            })]
          })]
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: ["Similarly for the constant ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "n"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "n"
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
              children: "n"
            })]
          })
        })]
      }), " case: ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mi, {
                  children: "n"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "m"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.msup, {
                  children: [createVNode(_components.mi, {
                    children: "n"
                  }), createVNode(_components.mo, {
                    children: "∗"
                  })]
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "n(m) = n^*"
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
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "n"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            }), createVNode(_components.span, {
              class: "mclose",
              children: ")"
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
                height: "0.6887em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                children: "n"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t",
                  children: createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.6887em"
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
                            class: "mbin mtight",
                            children: "∗"
                          })
                        })]
                      })
                    })
                  })
                })
              })]
            })]
          })]
        })]
      }), " and ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mi, {
                  children: "k"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "m"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mi, {
                  children: "m"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "k(m) = m"
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
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.03148em"
              },
              children: "k"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            }), createVNode(_components.span, {
              class: "mclose",
              children: ")"
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
                height: "0.4306em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            })]
          })]
        })]
      }), ", ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.msub, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "lim"
                    }), createVNode(_components.mo, {
                      children: "⁡"
                    })]
                  }), createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "m"
                    }), createVNode(_components.mo, {
                      children: "→"
                    }), createVNode(_components.mi, {
                      mathvariant: "normal",
                      children: "∞"
                    })]
                  })]
                }), createVNode(_components.mrow, {
                  children: [createVNode(_components.mi, {
                    mathvariant: "script",
                    children: "L"
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: "("
                  }), createVNode(_components.mi, {
                    children: "m"
                  }), createVNode(_components.mo, {
                    separator: "true",
                    children: ","
                  }), createVNode(_components.msup, {
                    children: [createVNode(_components.mi, {
                      children: "n"
                    }), createVNode(_components.mo, {
                      children: "∗"
                    })]
                  }), createVNode(_components.mo, {
                    separator: "true",
                    children: ";"
                  }), createVNode(_components.mi, {
                    children: "m"
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: ")"
                  })]
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mn, {
                  children: "0"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\lim_{m\\to\\infty}{\\mathcal{L}(m, n^*; m)} = 0"
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
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mop",
              children: [createVNode(_components.span, {
                class: "mop",
                children: "lim"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t vlist-t2",
                  children: [createVNode(_components.span, {
                    class: "vlist-r",
                    children: [createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.1514em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-2.55em",
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
                              class: "mord mathnormal mtight",
                              children: "m"
                            }), createVNode(_components.span, {
                              class: "mrel mtight",
                              children: "→"
                            }), createVNode(_components.span, {
                              class: "mord mtight",
                              children: "∞"
                            })]
                          })
                        })]
                      })
                    }), createVNode(_components.span, {
                      class: "vlist-s",
                      children: "​"
                    })]
                  }), createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.15em"
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
                class: "mord mathcal",
                children: "L"
              }), createVNode(_components.span, {
                class: "mopen",
                children: "("
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                children: "m"
              }), createVNode(_components.span, {
                class: "mpunct",
                children: ","
              }), createVNode(_components.span, {
                class: "mspace",
                style: {
                  marginRight: "0.1667em"
                }
              }), createVNode(_components.span, {
                class: "mord",
                children: [createVNode(_components.span, {
                  class: "mord mathnormal",
                  children: "n"
                }), createVNode(_components.span, {
                  class: "msupsub",
                  children: createVNode(_components.span, {
                    class: "vlist-t",
                    children: createVNode(_components.span, {
                      class: "vlist-r",
                      children: createVNode(_components.span, {
                        class: "vlist",
                        style: {
                          height: "0.6887em"
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
                              class: "mbin mtight",
                              children: "∗"
                            })
                          })]
                        })
                      })
                    })
                  })
                })]
              }), createVNode(_components.span, {
                class: "mpunct",
                children: ";"
              }), createVNode(_components.span, {
                class: "mspace",
                style: {
                  marginRight: "0.1667em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                children: "m"
              }), createVNode(_components.span, {
                class: "mclose",
                children: ")"
              })]
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
      }), ", the philosophical counterpart to ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "∞"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\infty"
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
              class: "mord",
              children: "∞"
            })]
          })
        })]
      }), "; again, hiding the convergence rate in the sinkhole of information that is ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mn, {
                  children: "0"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "0"
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
                height: "0.6444em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: "0"
            })]
          })
        })]
      }), " (or ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "∞"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\infty"
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
              class: "mord",
              children: "∞"
            })]
          })
        })]
      }), "):"]
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
                children: [createVNode(_components.munder, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "lim"
                    }), createVNode(_components.mo, {
                      children: "⁡"
                    })]
                  }), createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "m"
                    }), createVNode(_components.mo, {
                      children: "→"
                    }), createVNode(_components.mi, {
                      mathvariant: "normal",
                      children: "∞"
                    })]
                  })]
                }), createVNode(_components.mi, {
                  children: "m"
                }), createVNode(_components.mo, {
                  children: "⋅"
                }), createVNode(_components.mrow, {
                  children: [createVNode(_components.mi, {
                    mathvariant: "script",
                    children: "L"
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: "("
                  }), createVNode(_components.msup, {
                    children: [createVNode(_components.mi, {
                      children: "n"
                    }), createVNode(_components.mo, {
                      children: "∗"
                    })]
                  }), createVNode(_components.mo, {
                    separator: "true",
                    children: ","
                  }), createVNode(_components.mi, {
                    children: "m"
                  }), createVNode(_components.mo, {
                    separator: "true",
                    children: ";"
                  }), createVNode(_components.mi, {
                    children: "m"
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: ")"
                  })]
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.msup, {
                  children: [createVNode(_components.mi, {
                    children: "n"
                  }), createVNode(_components.mo, {
                    children: "∗"
                  })]
                }), createVNode(_components.munder, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "lim"
                    }), createVNode(_components.mo, {
                      children: "⁡"
                    })]
                  }), createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "m"
                    }), createVNode(_components.mo, {
                      children: "→"
                    }), createVNode(_components.mi, {
                      mathvariant: "normal",
                      children: "∞"
                    })]
                  })]
                }), createVNode(_components.mi, {
                  children: "m"
                }), createVNode(_components.mi, {
                  children: "log"
                }), createVNode(_components.mo, {
                  children: "⁡"
                }), createVNode(_components.mrow, {
                  children: [createVNode(_components.mo, {
                    fence: "true",
                    children: "("
                  }), createVNode(_components.mfrac, {
                    children: [createVNode(_components.mrow, {
                      children: [createVNode(_components.mi, {
                        children: "m"
                      }), createVNode(_components.mo, {
                        children: "−"
                      }), createVNode(_components.mn, {
                        children: "1"
                      })]
                    }), createVNode(_components.mi, {
                      children: "m"
                    })]
                  }), createVNode(_components.mo, {
                    fence: "true",
                    children: ")"
                  })]
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mo, {
                  children: "−"
                }), createVNode(_components.msup, {
                  children: [createVNode(_components.mi, {
                    children: "n"
                  }), createVNode(_components.mo, {
                    children: "∗"
                  })]
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.msup, {
                  children: [createVNode(_components.mi, {
                    children: "C"
                  }), createVNode(_components.mo, {
                    mathvariant: "normal",
                    lspace: "0em",
                    rspace: "0em",
                    children: "′"
                  })]
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "."
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\lim_{m\\to\\infty} m \\cdot {\\mathcal L(n^*, m; m)} = n^* \\lim_{m\\to\\infty} m \\log\\left(\\frac{m - 1}{m}\\right) = -n^* = C'."
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
                height: "1.3944em",
                verticalAlign: "-0.7em"
              }
            }), createVNode(_components.span, {
              class: "mop op-limits",
              children: createVNode(_components.span, {
                class: "vlist-t vlist-t2",
                children: [createVNode(_components.span, {
                  class: "vlist-r",
                  children: [createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.6944em"
                    },
                    children: [createVNode(_components.span, {
                      style: {
                        top: "-2.4em",
                        marginLeft: "0em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "sizing reset-size6 size3 mtight",
                        children: createVNode(_components.span, {
                          class: "mord mtight",
                          children: [createVNode(_components.span, {
                            class: "mord mathnormal mtight",
                            children: "m"
                          }), createVNode(_components.span, {
                            class: "mrel mtight",
                            children: "→"
                          }), createVNode(_components.span, {
                            class: "mord mtight",
                            children: "∞"
                          })]
                        })
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-3em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        children: createVNode(_components.span, {
                          class: "mop",
                          children: "lim"
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
                      height: "0.7em"
                    },
                    children: createVNode(_components.span, {})
                  })
                })]
              })
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2222em"
              }
            }), createVNode(_components.span, {
              class: "mbin",
              children: "⋅"
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
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathcal",
                children: "L"
              }), createVNode(_components.span, {
                class: "mopen",
                children: "("
              }), createVNode(_components.span, {
                class: "mord",
                children: [createVNode(_components.span, {
                  class: "mord mathnormal",
                  children: "n"
                }), createVNode(_components.span, {
                  class: "msupsub",
                  children: createVNode(_components.span, {
                    class: "vlist-t",
                    children: createVNode(_components.span, {
                      class: "vlist-r",
                      children: createVNode(_components.span, {
                        class: "vlist",
                        style: {
                          height: "0.7387em"
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
                              class: "mbin mtight",
                              children: "∗"
                            })
                          })]
                        })
                      })
                    })
                  })
                })]
              }), createVNode(_components.span, {
                class: "mpunct",
                children: ","
              }), createVNode(_components.span, {
                class: "mspace",
                style: {
                  marginRight: "0.1667em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                children: "m"
              }), createVNode(_components.span, {
                class: "mpunct",
                children: ";"
              }), createVNode(_components.span, {
                class: "mspace",
                style: {
                  marginRight: "0.1667em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                children: "m"
              }), createVNode(_components.span, {
                class: "mclose",
                children: ")"
              })]
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
                height: "2.4em",
                verticalAlign: "-0.95em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                children: "n"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t",
                  children: createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.7387em"
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
                            class: "mbin mtight",
                            children: "∗"
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
              class: "mop op-limits",
              children: createVNode(_components.span, {
                class: "vlist-t vlist-t2",
                children: [createVNode(_components.span, {
                  class: "vlist-r",
                  children: [createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.6944em"
                    },
                    children: [createVNode(_components.span, {
                      style: {
                        top: "-2.4em",
                        marginLeft: "0em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "sizing reset-size6 size3 mtight",
                        children: createVNode(_components.span, {
                          class: "mord mtight",
                          children: [createVNode(_components.span, {
                            class: "mord mathnormal mtight",
                            children: "m"
                          }), createVNode(_components.span, {
                            class: "mrel mtight",
                            children: "→"
                          }), createVNode(_components.span, {
                            class: "mord mtight",
                            children: "∞"
                          })]
                        })
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-3em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        children: createVNode(_components.span, {
                          class: "mop",
                          children: "lim"
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
                      height: "0.7em"
                    },
                    children: createVNode(_components.span, {})
                  })
                })]
              })
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mop",
              children: ["lo", createVNode(_components.span, {
                style: {
                  marginRight: "0.01389em"
                },
                children: "g"
              })]
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "minner",
              children: [createVNode(_components.span, {
                class: "mopen delimcenter",
                style: {
                  top: "0em"
                },
                children: createVNode(_components.span, {
                  class: "delimsizing size3",
                  children: "("
                })
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
                          height: "1.3214em"
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
                              class: "mord mathnormal",
                              children: "m"
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
                            children: [createVNode(_components.span, {
                              class: "mord mathnormal",
                              children: "m"
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2222em"
                              }
                            }), createVNode(_components.span, {
                              class: "mbin",
                              children: "−"
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2222em"
                              }
                            }), createVNode(_components.span, {
                              class: "mord",
                              children: "1"
                            })]
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
                class: "mclose delimcenter",
                style: {
                  top: "0em"
                },
                children: createVNode(_components.span, {
                  class: "delimsizing size3",
                  children: ")"
                })
              })]
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
                height: "0.822em",
                verticalAlign: "-0.0833em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: "−"
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                children: "n"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t",
                  children: createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.7387em"
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
                            class: "mbin mtight",
                            children: "∗"
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
                height: "0.8019em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.07153em"
                },
                children: "C"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t",
                  children: createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.8019em"
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
                            children: createVNode(_components.span, {
                              class: "mord mtight",
                              children: "′"
                            })
                          })
                        })]
                      })
                    })
                  })
                })
              })]
            }), createVNode(_components.span, {
              class: "mord",
              children: "."
            })]
          })]
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: ["This all guides us to selecting a multi-scale limit procedure for ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "k"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "k"
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
                height: "0.6944em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.03148em"
              },
              children: "k"
            })]
          })
        })]
      }), " and ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "n"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "n"
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
              children: "n"
            })]
          })
        })]
      }), " simultaneously, and if we choose the correct relative scaling. Let ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mi, {
                  children: "k"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "m"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mi, {
                  children: "m"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "k(m) = m"
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
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.03148em"
              },
              children: "k"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            }), createVNode(_components.span, {
              class: "mclose",
              children: ")"
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
                height: "0.4306em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            })]
          })]
        })]
      }), " and ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mi, {
                  children: "n"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "m"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mi, {
                  children: "m"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "n(m) = m"
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
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "n"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            }), createVNode(_components.span, {
              class: "mclose",
              children: ")"
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
                height: "0.4306em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            })]
          })]
        })]
      }), ". Let’s temporarily detour returning directly to the dice-rolling setting with a numerical experiment. For"]
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["a single (", createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: [createVNode(_components.mi, {
                    children: "n"
                  }), createVNode(_components.mo, {
                    children: "="
                  }), createVNode(_components.mn, {
                    children: "1"
                  })]
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "n=1"
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
                  height: "0.4306em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                children: "n"
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
                children: "1"
              })]
            })]
          })]
        }), ") six-sided die (", createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: [createVNode(_components.mi, {
                    children: "k"
                  }), createVNode(_components.mo, {
                    children: "="
                  }), createVNode(_components.mn, {
                    children: "6"
                  })]
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "k=6"
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
                  height: "0.6944em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.03148em"
                },
                children: "k"
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
                children: "6"
              })]
            })]
          })]
        }), "), the probability of success is ", createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: createVNode(_components.mfrac, {
                    children: [createVNode(_components.mn, {
                      children: "1"
                    }), createVNode(_components.mn, {
                      children: "6"
                    })]
                  })
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "\\frac{1}{6}"
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
                  height: "1.1901em",
                  verticalAlign: "-0.345em"
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
                          height: "0.8451em"
                        },
                        children: [createVNode(_components.span, {
                          style: {
                            top: "-2.655em"
                          },
                          children: [createVNode(_components.span, {
                            class: "pstrut",
                            style: {
                              height: "3em"
                            }
                          }), createVNode(_components.span, {
                            class: "sizing reset-size6 size3 mtight",
                            children: createVNode(_components.span, {
                              class: "mord mtight",
                              children: createVNode(_components.span, {
                                class: "mord mtight",
                                children: "6"
                              })
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
                            top: "-3.394em"
                          },
                          children: [createVNode(_components.span, {
                            class: "pstrut",
                            style: {
                              height: "3em"
                            }
                          }), createVNode(_components.span, {
                            class: "sizing reset-size6 size3 mtight",
                            children: createVNode(_components.span, {
                              class: "mord mtight",
                              children: createVNode(_components.span, {
                                class: "mord mtight",
                                children: "1"
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
                          height: "0.345em"
                        },
                        children: createVNode(_components.span, {})
                      })
                    })]
                  })
                }), createVNode(_components.span, {
                  class: "mclose nulldelimiter"
                })]
              })]
            })
          })]
        }), "."]
      }), "\n", createVNode(_components.li, {
        children: [createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: [createVNode(_components.mi, {
                    children: "n"
                  }), createVNode(_components.mo, {
                    children: "="
                  }), createVNode(_components.mn, {
                    children: "2"
                  })]
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "n=2"
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
                  height: "0.4306em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                children: "n"
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
                children: "2"
              })]
            })]
          })]
        }), ", ", createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: [createVNode(_components.mi, {
                    children: "k"
                  }), createVNode(_components.mo, {
                    children: "="
                  }), createVNode(_components.mn, {
                    children: "6"
                  })]
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "k=6"
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
                  height: "0.6944em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.03148em"
                },
                children: "k"
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
                children: "6"
              })]
            })]
          })]
        }), " dice, the probability of a success is ", createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: [createVNode(_components.mo, {
                    children: "≈"
                  }), createVNode(_components.mn, {
                    children: "0.3"
                  })]
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "\\approx 0.3"
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
                  height: "0.4831em"
                }
              }), createVNode(_components.span, {
                class: "mrel",
                children: "≈"
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
                children: "0.3"
              })]
            })]
          })]
        })]
      }), "\n", createVNode(_components.li, {
        children: ["… ", createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: [createVNode(_components.mo, {
                    children: "→"
                  }), createVNode(_components.mn, {
                    children: "1"
                  })]
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "\\to 1"
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
                  height: "0.3669em"
                }
              }), createVNode(_components.span, {
                class: "mrel",
                children: "→"
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
                children: "1"
              })]
            })]
          })]
        })]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "However, how many sides to the dice would give us approximately the same rate of success? We can answer this by solving"
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
                children: [createVNode(_components.mn, {
                  children: "1"
                }), createVNode(_components.mo, {
                  children: "−"
                }), createVNode(_components.msup, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mo, {
                      fence: "true",
                      children: "("
                    }), createVNode(_components.mfrac, {
                      children: [createVNode(_components.mrow, {
                        children: [createVNode(_components.mi, {
                          children: "k"
                        }), createVNode(_components.mo, {
                          children: "−"
                        }), createVNode(_components.mn, {
                          children: "1"
                        })]
                      }), createVNode(_components.mi, {
                        children: "k"
                      })]
                    }), createVNode(_components.mo, {
                      fence: "true",
                      children: ")"
                    })]
                  }), createVNode(_components.mn, {
                    children: "2"
                  })]
                }), createVNode(_components.mo, {
                  children: "≈"
                }), createVNode(_components.mfrac, {
                  children: [createVNode(_components.mn, {
                    children: "1"
                  }), createVNode(_components.mn, {
                    children: "6"
                  })]
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "."
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "1 - \\left(\\frac{k - 1}{k}\\right)^2 \\approx \\frac{1}{6}."
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
                height: "0.7278em",
                verticalAlign: "-0.0833em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: "1"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2222em"
              }
            }), createVNode(_components.span, {
              class: "mbin",
              children: "−"
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
                height: "2.604em",
                verticalAlign: "-0.95em"
              }
            }), createVNode(_components.span, {
              class: "minner",
              children: [createVNode(_components.span, {
                class: "minner",
                children: [createVNode(_components.span, {
                  class: "mopen delimcenter",
                  style: {
                    top: "0em"
                  },
                  children: createVNode(_components.span, {
                    class: "delimsizing size3",
                    children: "("
                  })
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
                            height: "1.3714em"
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
                                class: "mord mathnormal",
                                style: {
                                  marginRight: "0.03148em"
                                },
                                children: "k"
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
                              children: [createVNode(_components.span, {
                                class: "mord mathnormal",
                                style: {
                                  marginRight: "0.03148em"
                                },
                                children: "k"
                              }), createVNode(_components.span, {
                                class: "mspace",
                                style: {
                                  marginRight: "0.2222em"
                                }
                              }), createVNode(_components.span, {
                                class: "mbin",
                                children: "−"
                              }), createVNode(_components.span, {
                                class: "mspace",
                                style: {
                                  marginRight: "0.2222em"
                                }
                              }), createVNode(_components.span, {
                                class: "mord",
                                children: "1"
                              })]
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
                  class: "mclose delimcenter",
                  style: {
                    top: "0em"
                  },
                  children: createVNode(_components.span, {
                    class: "delimsizing size3",
                    children: ")"
                  })
                })]
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t",
                  children: createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "1.654em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-3.9029em",
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
                            children: "2"
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
                marginRight: "0.2778em"
              }
            }), createVNode(_components.span, {
              class: "mrel",
              children: "≈"
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
                height: "2.0074em",
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
                        height: "1.3214em"
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
                            children: "6"
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
                            class: "mord",
                            children: "1"
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
    }), "\n", createVNode(_components.p, {
      children: ["This may not have an integer solution, so we will take the integer valued ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "k"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "k"
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
                height: "0.6944em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.03148em"
              },
              children: "k"
            })]
          })
        })]
      }), " which gives ", createVNode(_components.em, {
        children: "at least"
      }), " ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mfrac, {
                  children: [createVNode(_components.mn, {
                    children: "1"
                  }), createVNode(_components.mn, {
                    children: "6"
                  })]
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\frac{1}{6}"
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
                height: "1.1901em",
                verticalAlign: "-0.345em"
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
                        height: "0.8451em"
                      },
                      children: [createVNode(_components.span, {
                        style: {
                          top: "-2.655em"
                        },
                        children: [createVNode(_components.span, {
                          class: "pstrut",
                          style: {
                            height: "3em"
                          }
                        }), createVNode(_components.span, {
                          class: "sizing reset-size6 size3 mtight",
                          children: createVNode(_components.span, {
                            class: "mord mtight",
                            children: createVNode(_components.span, {
                              class: "mord mtight",
                              children: "6"
                            })
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
                          top: "-3.394em"
                        },
                        children: [createVNode(_components.span, {
                          class: "pstrut",
                          style: {
                            height: "3em"
                          }
                        }), createVNode(_components.span, {
                          class: "sizing reset-size6 size3 mtight",
                          children: createVNode(_components.span, {
                            class: "mord mtight",
                            children: createVNode(_components.span, {
                              class: "mord mtight",
                              children: "1"
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
                        height: "0.345em"
                      },
                      children: createVNode(_components.span, {})
                    })
                  })]
                })
              }), createVNode(_components.span, {
                class: "mclose nulldelimiter"
              })]
            })]
          })
        })]
      }), " rate of success. This gives us"]
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
              children: [createVNode(_components.mtable, {
                rowspacing: "0.25em",
                columnalign: "right left",
                columnspacing: "0em",
                children: [createVNode(_components.mtr, {
                  children: [createVNode(_components.mtd, {
                    children: createVNode(_components.mstyle, {
                      scriptlevel: "0",
                      displaystyle: "true",
                      children: createVNode(_components.mrow, {})
                    })
                  }), createVNode(_components.mtd, {
                    children: createVNode(_components.mstyle, {
                      scriptlevel: "0",
                      displaystyle: "true",
                      children: createVNode(_components.mrow, {
                        children: [createVNode(_components.mrow, {}), createVNode(_components.msqrt, {
                          children: createVNode(_components.mfrac, {
                            children: [createVNode(_components.mn, {
                              children: "5"
                            }), createVNode(_components.mn, {
                              children: "6"
                            })]
                          })
                        }), createVNode(_components.mo, {
                          children: "="
                        }), createVNode(_components.mfrac, {
                          children: [createVNode(_components.mrow, {
                            children: [createVNode(_components.mi, {
                              children: "k"
                            }), createVNode(_components.mo, {
                              children: "−"
                            }), createVNode(_components.mn, {
                              children: "1"
                            })]
                          }), createVNode(_components.mi, {
                            children: "k"
                          })]
                        })]
                      })
                    })
                  })]
                }), createVNode(_components.mtr, {
                  children: [createVNode(_components.mtd, {
                    children: createVNode(_components.mstyle, {
                      scriptlevel: "0",
                      displaystyle: "true",
                      children: createVNode(_components.mrow, {})
                    })
                  }), createVNode(_components.mtd, {
                    children: createVNode(_components.mstyle, {
                      scriptlevel: "0",
                      displaystyle: "true",
                      children: createVNode(_components.mrow, {
                        children: [createVNode(_components.mrow, {}), createVNode(_components.mtext, {
                          children: "  "
                        }), createVNode(_components.mo, {
                          children: "⟹"
                        }), createVNode(_components.mtext, {
                          children: "  "
                        }), createVNode(_components.mn, {
                          children: "1"
                        }), createVNode(_components.mo, {
                          children: "="
                        }), createVNode(_components.mrow, {
                          children: [createVNode(_components.mo, {
                            fence: "true",
                            children: "("
                          }), createVNode(_components.mn, {
                            children: "1"
                          }), createVNode(_components.mo, {
                            children: "−"
                          }), createVNode(_components.msup, {
                            children: [createVNode(_components.mrow, {
                              children: [createVNode(_components.mo, {
                                fence: "true",
                                children: "("
                              }), createVNode(_components.mfrac, {
                                children: [createVNode(_components.mn, {
                                  children: "5"
                                }), createVNode(_components.mn, {
                                  children: "6"
                                })]
                              }), createVNode(_components.mo, {
                                fence: "true",
                                children: ")"
                              })]
                            }), createVNode(_components.mfrac, {
                              children: [createVNode(_components.mn, {
                                children: "1"
                              }), createVNode(_components.mn, {
                                children: "2"
                              })]
                            })]
                          }), createVNode(_components.mo, {
                            fence: "true",
                            children: ")"
                          })]
                        }), createVNode(_components.mi, {
                          children: "k"
                        })]
                      })
                    })
                  })]
                }), createVNode(_components.mtr, {
                  children: [createVNode(_components.mtd, {
                    children: createVNode(_components.mstyle, {
                      scriptlevel: "0",
                      displaystyle: "true",
                      children: createVNode(_components.mrow, {})
                    })
                  }), createVNode(_components.mtd, {
                    children: createVNode(_components.mstyle, {
                      scriptlevel: "0",
                      displaystyle: "true",
                      children: createVNode(_components.mrow, {
                        children: [createVNode(_components.mrow, {}), createVNode(_components.mtext, {
                          children: "  "
                        }), createVNode(_components.mo, {
                          children: "⟹"
                        }), createVNode(_components.mtext, {
                          children: "  "
                        }), createVNode(_components.mi, {
                          children: "k"
                        }), createVNode(_components.mo, {
                          children: "="
                        }), createVNode(_components.mfrac, {
                          children: [createVNode(_components.mn, {
                            children: "1"
                          }), createVNode(_components.mrow, {
                            children: [createVNode(_components.mn, {
                              children: "1"
                            }), createVNode(_components.mo, {
                              children: "−"
                            }), createVNode(_components.msup, {
                              children: [createVNode(_components.mrow, {
                                children: [createVNode(_components.mo, {
                                  fence: "true",
                                  children: "("
                                }), createVNode(_components.mfrac, {
                                  children: [createVNode(_components.mn, {
                                    children: "5"
                                  }), createVNode(_components.mn, {
                                    children: "6"
                                  })]
                                }), createVNode(_components.mo, {
                                  fence: "true",
                                  children: ")"
                                })]
                              }), createVNode(_components.mfrac, {
                                children: [createVNode(_components.mn, {
                                  children: "1"
                                }), createVNode(_components.mn, {
                                  children: "2"
                                })]
                              })]
                            })]
                          })]
                        }), createVNode(_components.mo, {
                          children: "≈"
                        }), createVNode(_components.mn, {
                          children: "11.48"
                        })]
                      })
                    })
                  })]
                }), createVNode(_components.mtr, {
                  children: [createVNode(_components.mtd, {
                    children: createVNode(_components.mstyle, {
                      scriptlevel: "0",
                      displaystyle: "true",
                      children: createVNode(_components.mrow, {})
                    })
                  }), createVNode(_components.mtd, {
                    children: createVNode(_components.mstyle, {
                      scriptlevel: "0",
                      displaystyle: "true",
                      children: createVNode(_components.mrow, {
                        children: [createVNode(_components.mrow, {}), createVNode(_components.mtext, {
                          children: "  "
                        }), createVNode(_components.mo, {
                          children: "⟹"
                        }), createVNode(_components.mtext, {
                          children: "  "
                        }), createVNode(_components.msup, {
                          children: [createVNode(_components.mi, {
                            children: "k"
                          }), createVNode(_components.mo, {
                            children: "∗"
                          })]
                        }), createVNode(_components.mo, {
                          children: "="
                        }), createVNode(_components.mrow, {
                          children: [createVNode(_components.mo, {
                            fence: "true",
                            children: "⌊"
                          }), createVNode(_components.mfrac, {
                            children: [createVNode(_components.mn, {
                              children: "1"
                            }), createVNode(_components.mrow, {
                              children: [createVNode(_components.mn, {
                                children: "1"
                              }), createVNode(_components.mo, {
                                children: "−"
                              }), createVNode(_components.msup, {
                                children: [createVNode(_components.mrow, {
                                  children: [createVNode(_components.mo, {
                                    fence: "true",
                                    children: "("
                                  }), createVNode(_components.mfrac, {
                                    children: [createVNode(_components.mn, {
                                      children: "5"
                                    }), createVNode(_components.mn, {
                                      children: "6"
                                    })]
                                  }), createVNode(_components.mo, {
                                    fence: "true",
                                    children: ")"
                                  })]
                                }), createVNode(_components.mfrac, {
                                  children: [createVNode(_components.mn, {
                                    children: "1"
                                  }), createVNode(_components.mn, {
                                    children: "2"
                                  })]
                                })]
                              })]
                            })]
                          }), createVNode(_components.mo, {
                            fence: "true",
                            children: "⌋"
                          })]
                        }), createVNode(_components.mo, {
                          children: "="
                        }), createVNode(_components.mn, {
                          children: "11."
                        })]
                      })
                    })
                  })]
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\begin{split}\n& \\sqrt{\\frac{5}{6}} = \\frac{k - 1}{k} \\\\\n&\\implies 1 = \\left(1 - \\left(\\frac{5}{6}\\right)^{\\frac{1}{2}}\\right) k \\\\\n&\\implies k = \\frac{1}{1 - \\left(\\frac{5}{6}\\right)^{\\frac{1}{2}}} \\approx 11.48 \\\\\n&\\implies k^* = \\left\\lfloor{\\frac{1}{1 - \\left(\\frac{5}{6}\\right)^{\\frac{1}{2}}} }\\right\\rfloor = 11.\n\\end{split}"
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
                height: "13.0393em",
                verticalAlign: "-6.2697em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: createVNode(_components.span, {
                class: "mtable",
                children: [createVNode(_components.span, {
                  class: "col-align-r",
                  children: createVNode(_components.span, {
                    class: "vlist-t vlist-t2",
                    children: [createVNode(_components.span, {
                      class: "vlist-r",
                      children: [createVNode(_components.span, {
                        class: "vlist",
                        style: {
                          height: "6.7697em"
                        },
                        children: [createVNode(_components.span, {
                          style: {
                            top: "-9.168em"
                          },
                          children: [createVNode(_components.span, {
                            class: "pstrut",
                            style: {
                              height: "4.05em"
                            }
                          }), createVNode(_components.span, {
                            class: "mord"
                          })]
                        }), createVNode(_components.span, {
                          style: {
                            top: "-6.2857em"
                          },
                          children: [createVNode(_components.span, {
                            class: "pstrut",
                            style: {
                              height: "4.05em"
                            }
                          }), createVNode(_components.span, {
                            class: "mord"
                          })]
                        }), createVNode(_components.span, {
                          style: {
                            top: "-3.4142em"
                          },
                          children: [createVNode(_components.span, {
                            class: "pstrut",
                            style: {
                              height: "4.05em"
                            }
                          }), createVNode(_components.span, {
                            class: "mord"
                          })]
                        }), createVNode(_components.span, {
                          style: {
                            top: "0.3697em"
                          },
                          children: [createVNode(_components.span, {
                            class: "pstrut",
                            style: {
                              height: "4.05em"
                            }
                          }), createVNode(_components.span, {
                            class: "mord"
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
                          height: "6.2697em"
                        },
                        children: createVNode(_components.span, {})
                      })
                    })]
                  })
                }), createVNode(_components.span, {
                  class: "col-align-l",
                  children: createVNode(_components.span, {
                    class: "vlist-t vlist-t2",
                    children: [createVNode(_components.span, {
                      class: "vlist-r",
                      children: [createVNode(_components.span, {
                        class: "vlist",
                        style: {
                          height: "6.7697em"
                        },
                        children: [createVNode(_components.span, {
                          style: {
                            top: "-9.168em"
                          },
                          children: [createVNode(_components.span, {
                            class: "pstrut",
                            style: {
                              height: "4.05em"
                            }
                          }), createVNode(_components.span, {
                            class: "mord",
                            children: [createVNode(_components.span, {
                              class: "mord"
                            }), createVNode(_components.span, {
                              class: "mord sqrt",
                              children: createVNode(_components.span, {
                                class: "vlist-t vlist-t2",
                                children: [createVNode(_components.span, {
                                  class: "vlist-r",
                                  children: [createVNode(_components.span, {
                                    class: "vlist",
                                    style: {
                                      height: "1.6516em"
                                    },
                                    children: [createVNode(_components.span, {
                                      class: "svg-align",
                                      style: {
                                        top: "-4.4em"
                                      },
                                      children: [createVNode(_components.span, {
                                        class: "pstrut",
                                        style: {
                                          height: "4.4em"
                                        }
                                      }), createVNode(_components.span, {
                                        class: "mord",
                                        style: {
                                          paddingLeft: "1em"
                                        },
                                        children: createVNode(_components.span, {
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
                                                    height: "1.3214em"
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
                                                        children: "6"
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
                                                        class: "mord",
                                                        children: "5"
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
                                        })
                                      })]
                                    }), createVNode(_components.span, {
                                      style: {
                                        top: "-3.6116em"
                                      },
                                      children: [createVNode(_components.span, {
                                        class: "pstrut",
                                        style: {
                                          height: "4.4em"
                                        }
                                      }), createVNode(_components.span, {
                                        class: "hide-tail",
                                        style: {
                                          minWidth: "1.02em",
                                          height: "2.48em"
                                        },
                                        children: createVNode(_components.svg, {
                                          xmlns: "http://www.w3.org/2000/svg",
                                          width: "400em",
                                          height: "2.48em",
                                          viewBox: "0 0 400000 2592",
                                          preserveAspectRatio: "xMinYMin slice",
                                          children: createVNode(_components.path, {
                                            d: "M424,2478\nc-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514\nc0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20\ns-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121\ns209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081\nl0 -0c4,-6.7,10,-10,18,-10 H400000\nv40H1014.6\ns-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185\nc-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2z M1001 80\nh400000v40h-400000z"
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
                                      height: "0.7884em"
                                    },
                                    children: createVNode(_components.span, {})
                                  })
                                })]
                              })
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
                                        height: "1.3714em"
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
                                            class: "mord mathnormal",
                                            style: {
                                              marginRight: "0.03148em"
                                            },
                                            children: "k"
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
                                          children: [createVNode(_components.span, {
                                            class: "mord mathnormal",
                                            style: {
                                              marginRight: "0.03148em"
                                            },
                                            children: "k"
                                          }), createVNode(_components.span, {
                                            class: "mspace",
                                            style: {
                                              marginRight: "0.2222em"
                                            }
                                          }), createVNode(_components.span, {
                                            class: "mbin",
                                            children: "−"
                                          }), createVNode(_components.span, {
                                            class: "mspace",
                                            style: {
                                              marginRight: "0.2222em"
                                            }
                                          }), createVNode(_components.span, {
                                            class: "mord",
                                            children: "1"
                                          })]
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
                            })]
                          })]
                        }), createVNode(_components.span, {
                          style: {
                            top: "-6.2857em"
                          },
                          children: [createVNode(_components.span, {
                            class: "pstrut",
                            style: {
                              height: "4.05em"
                            }
                          }), createVNode(_components.span, {
                            class: "mord",
                            children: [createVNode(_components.span, {
                              class: "mord"
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2778em"
                              }
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2778em"
                              }
                            }), createVNode(_components.span, {
                              class: "mrel",
                              children: "⟹"
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2778em"
                              }
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2778em"
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
                            }), createVNode(_components.span, {
                              class: "minner",
                              children: [createVNode(_components.span, {
                                class: "mopen delimcenter",
                                style: {
                                  top: "0em"
                                },
                                children: createVNode(_components.span, {
                                  class: "delimsizing size4",
                                  children: "("
                                })
                              }), createVNode(_components.span, {
                                class: "mord",
                                children: "1"
                              }), createVNode(_components.span, {
                                class: "mspace",
                                style: {
                                  marginRight: "0.2222em"
                                }
                              }), createVNode(_components.span, {
                                class: "mbin",
                                children: "−"
                              }), createVNode(_components.span, {
                                class: "mspace",
                                style: {
                                  marginRight: "0.2222em"
                                }
                              }), createVNode(_components.span, {
                                class: "minner",
                                children: [createVNode(_components.span, {
                                  class: "minner",
                                  children: [createVNode(_components.span, {
                                    class: "mopen delimcenter",
                                    style: {
                                      top: "0em"
                                    },
                                    children: createVNode(_components.span, {
                                      class: "delimsizing size3",
                                      children: "("
                                    })
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
                                              height: "1.3214em"
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
                                                  children: "6"
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
                                                  class: "mord",
                                                  children: "5"
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
                                    class: "mclose delimcenter",
                                    style: {
                                      top: "0em"
                                    },
                                    children: createVNode(_components.span, {
                                      class: "delimsizing size3",
                                      children: ")"
                                    })
                                  })]
                                }), createVNode(_components.span, {
                                  class: "msupsub",
                                  children: createVNode(_components.span, {
                                    class: "vlist-t",
                                    children: createVNode(_components.span, {
                                      class: "vlist-r",
                                      children: createVNode(_components.span, {
                                        class: "vlist",
                                        style: {
                                          height: "1.7939em"
                                        },
                                        children: createVNode(_components.span, {
                                          style: {
                                            top: "-4.2029em",
                                            marginRight: "0.05em"
                                          },
                                          children: [createVNode(_components.span, {
                                            class: "pstrut",
                                            style: {
                                              height: "3em"
                                            }
                                          }), createVNode(_components.span, {
                                            class: "sizing reset-size6 size3 mtight",
                                            children: createVNode(_components.span, {
                                              class: "mord mtight",
                                              children: createVNode(_components.span, {
                                                class: "mord mtight",
                                                children: [createVNode(_components.span, {
                                                  class: "mopen nulldelimiter sizing reset-size3 size6"
                                                }), createVNode(_components.span, {
                                                  class: "mfrac",
                                                  children: createVNode(_components.span, {
                                                    class: "vlist-t vlist-t2",
                                                    children: [createVNode(_components.span, {
                                                      class: "vlist-r",
                                                      children: [createVNode(_components.span, {
                                                        class: "vlist",
                                                        style: {
                                                          height: "0.8443em"
                                                        },
                                                        children: [createVNode(_components.span, {
                                                          style: {
                                                            top: "-2.656em"
                                                          },
                                                          children: [createVNode(_components.span, {
                                                            class: "pstrut",
                                                            style: {
                                                              height: "3em"
                                                            }
                                                          }), createVNode(_components.span, {
                                                            class: "sizing reset-size3 size1 mtight",
                                                            children: createVNode(_components.span, {
                                                              class: "mord mtight",
                                                              children: createVNode(_components.span, {
                                                                class: "mord mtight",
                                                                children: "2"
                                                              })
                                                            })
                                                          })]
                                                        }), createVNode(_components.span, {
                                                          style: {
                                                            top: "-3.2255em"
                                                          },
                                                          children: [createVNode(_components.span, {
                                                            class: "pstrut",
                                                            style: {
                                                              height: "3em"
                                                            }
                                                          }), createVNode(_components.span, {
                                                            class: "frac-line mtight",
                                                            style: {
                                                              borderBottomWidth: "0.049em"
                                                            }
                                                          })]
                                                        }), createVNode(_components.span, {
                                                          style: {
                                                            top: "-3.384em"
                                                          },
                                                          children: [createVNode(_components.span, {
                                                            class: "pstrut",
                                                            style: {
                                                              height: "3em"
                                                            }
                                                          }), createVNode(_components.span, {
                                                            class: "sizing reset-size3 size1 mtight",
                                                            children: createVNode(_components.span, {
                                                              class: "mord mtight",
                                                              children: createVNode(_components.span, {
                                                                class: "mord mtight",
                                                                children: "1"
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
                                                          height: "0.344em"
                                                        },
                                                        children: createVNode(_components.span, {})
                                                      })
                                                    })]
                                                  })
                                                }), createVNode(_components.span, {
                                                  class: "mclose nulldelimiter sizing reset-size3 size6"
                                                })]
                                              })
                                            })
                                          })]
                                        })
                                      })
                                    })
                                  })
                                })]
                              }), createVNode(_components.span, {
                                class: "mclose delimcenter",
                                style: {
                                  top: "0em"
                                },
                                children: createVNode(_components.span, {
                                  class: "delimsizing size4",
                                  children: ")"
                                })
                              })]
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.1667em"
                              }
                            }), createVNode(_components.span, {
                              class: "mord mathnormal",
                              style: {
                                marginRight: "0.03148em"
                              },
                              children: "k"
                            })]
                          })]
                        }), createVNode(_components.span, {
                          style: {
                            top: "-3.4142em"
                          },
                          children: [createVNode(_components.span, {
                            class: "pstrut",
                            style: {
                              height: "4.05em"
                            }
                          }), createVNode(_components.span, {
                            class: "mord",
                            children: [createVNode(_components.span, {
                              class: "mord"
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2778em"
                              }
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2778em"
                              }
                            }), createVNode(_components.span, {
                              class: "mrel",
                              children: "⟹"
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2778em"
                              }
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2778em"
                              }
                            }), createVNode(_components.span, {
                              class: "mord mathnormal",
                              style: {
                                marginRight: "0.03148em"
                              },
                              children: "k"
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
                                        height: "1.3214em"
                                      },
                                      children: [createVNode(_components.span, {
                                        style: {
                                          top: "-2.11em"
                                        },
                                        children: [createVNode(_components.span, {
                                          class: "pstrut",
                                          style: {
                                            height: "3.1939em"
                                          }
                                        }), createVNode(_components.span, {
                                          class: "mord",
                                          children: [createVNode(_components.span, {
                                            class: "mord",
                                            children: "1"
                                          }), createVNode(_components.span, {
                                            class: "mspace",
                                            style: {
                                              marginRight: "0.2222em"
                                            }
                                          }), createVNode(_components.span, {
                                            class: "mbin",
                                            children: "−"
                                          }), createVNode(_components.span, {
                                            class: "mspace",
                                            style: {
                                              marginRight: "0.2222em"
                                            }
                                          }), createVNode(_components.span, {
                                            class: "minner",
                                            children: [createVNode(_components.span, {
                                              class: "minner",
                                              children: [createVNode(_components.span, {
                                                class: "mopen delimcenter",
                                                style: {
                                                  top: "0em"
                                                },
                                                children: createVNode(_components.span, {
                                                  class: "delimsizing size1",
                                                  children: "("
                                                })
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
                                                          height: "0.8451em"
                                                        },
                                                        children: [createVNode(_components.span, {
                                                          style: {
                                                            top: "-2.655em"
                                                          },
                                                          children: [createVNode(_components.span, {
                                                            class: "pstrut",
                                                            style: {
                                                              height: "3em"
                                                            }
                                                          }), createVNode(_components.span, {
                                                            class: "sizing reset-size6 size3 mtight",
                                                            children: createVNode(_components.span, {
                                                              class: "mord mtight",
                                                              children: createVNode(_components.span, {
                                                                class: "mord mtight",
                                                                children: "6"
                                                              })
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
                                                            top: "-3.394em"
                                                          },
                                                          children: [createVNode(_components.span, {
                                                            class: "pstrut",
                                                            style: {
                                                              height: "3em"
                                                            }
                                                          }), createVNode(_components.span, {
                                                            class: "sizing reset-size6 size3 mtight",
                                                            children: createVNode(_components.span, {
                                                              class: "mord mtight",
                                                              children: createVNode(_components.span, {
                                                                class: "mord mtight",
                                                                children: "5"
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
                                                          height: "0.345em"
                                                        },
                                                        children: createVNode(_components.span, {})
                                                      })
                                                    })]
                                                  })
                                                }), createVNode(_components.span, {
                                                  class: "mclose nulldelimiter"
                                                })]
                                              }), createVNode(_components.span, {
                                                class: "mclose delimcenter",
                                                style: {
                                                  top: "0em"
                                                },
                                                children: createVNode(_components.span, {
                                                  class: "delimsizing size1",
                                                  children: ")"
                                                })
                                              })]
                                            }), createVNode(_components.span, {
                                              class: "msupsub",
                                              children: createVNode(_components.span, {
                                                class: "vlist-t",
                                                children: createVNode(_components.span, {
                                                  class: "vlist-r",
                                                  children: createVNode(_components.span, {
                                                    class: "vlist",
                                                    style: {
                                                      height: "1.1939em"
                                                    },
                                                    children: createVNode(_components.span, {
                                                      style: {
                                                        top: "-3.6029em",
                                                        marginRight: "0.05em"
                                                      },
                                                      children: [createVNode(_components.span, {
                                                        class: "pstrut",
                                                        style: {
                                                          height: "3em"
                                                        }
                                                      }), createVNode(_components.span, {
                                                        class: "sizing reset-size6 size3 mtight",
                                                        children: createVNode(_components.span, {
                                                          class: "mord mtight",
                                                          children: createVNode(_components.span, {
                                                            class: "mord mtight",
                                                            children: [createVNode(_components.span, {
                                                              class: "mopen nulldelimiter sizing reset-size3 size6"
                                                            }), createVNode(_components.span, {
                                                              class: "mfrac",
                                                              children: createVNode(_components.span, {
                                                                class: "vlist-t vlist-t2",
                                                                children: [createVNode(_components.span, {
                                                                  class: "vlist-r",
                                                                  children: [createVNode(_components.span, {
                                                                    class: "vlist",
                                                                    style: {
                                                                      height: "0.8443em"
                                                                    },
                                                                    children: [createVNode(_components.span, {
                                                                      style: {
                                                                        top: "-2.656em"
                                                                      },
                                                                      children: [createVNode(_components.span, {
                                                                        class: "pstrut",
                                                                        style: {
                                                                          height: "3em"
                                                                        }
                                                                      }), createVNode(_components.span, {
                                                                        class: "sizing reset-size3 size1 mtight",
                                                                        children: createVNode(_components.span, {
                                                                          class: "mord mtight",
                                                                          children: createVNode(_components.span, {
                                                                            class: "mord mtight",
                                                                            children: "2"
                                                                          })
                                                                        })
                                                                      })]
                                                                    }), createVNode(_components.span, {
                                                                      style: {
                                                                        top: "-3.2255em"
                                                                      },
                                                                      children: [createVNode(_components.span, {
                                                                        class: "pstrut",
                                                                        style: {
                                                                          height: "3em"
                                                                        }
                                                                      }), createVNode(_components.span, {
                                                                        class: "frac-line mtight",
                                                                        style: {
                                                                          borderBottomWidth: "0.049em"
                                                                        }
                                                                      })]
                                                                    }), createVNode(_components.span, {
                                                                      style: {
                                                                        top: "-3.384em"
                                                                      },
                                                                      children: [createVNode(_components.span, {
                                                                        class: "pstrut",
                                                                        style: {
                                                                          height: "3em"
                                                                        }
                                                                      }), createVNode(_components.span, {
                                                                        class: "sizing reset-size3 size1 mtight",
                                                                        children: createVNode(_components.span, {
                                                                          class: "mord mtight",
                                                                          children: createVNode(_components.span, {
                                                                            class: "mord mtight",
                                                                            children: "1"
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
                                                                      height: "0.344em"
                                                                    },
                                                                    children: createVNode(_components.span, {})
                                                                  })
                                                                })]
                                                              })
                                                            }), createVNode(_components.span, {
                                                              class: "mclose nulldelimiter sizing reset-size3 size6"
                                                            })]
                                                          })
                                                        })
                                                      })]
                                                    })
                                                  })
                                                })
                                              })
                                            })]
                                          })]
                                        })]
                                      }), createVNode(_components.span, {
                                        style: {
                                          top: "-3.4239em"
                                        },
                                        children: [createVNode(_components.span, {
                                          class: "pstrut",
                                          style: {
                                            height: "3.1939em"
                                          }
                                        }), createVNode(_components.span, {
                                          class: "frac-line",
                                          style: {
                                            borderBottomWidth: "0.04em"
                                          }
                                        })]
                                      }), createVNode(_components.span, {
                                        style: {
                                          top: "-3.8709em"
                                        },
                                        children: [createVNode(_components.span, {
                                          class: "pstrut",
                                          style: {
                                            height: "3.1939em"
                                          }
                                        }), createVNode(_components.span, {
                                          class: "mord",
                                          children: createVNode(_components.span, {
                                            class: "mord",
                                            children: "1"
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
                                        height: "1.4339em"
                                      },
                                      children: createVNode(_components.span, {})
                                    })
                                  })]
                                })
                              }), createVNode(_components.span, {
                                class: "mclose nulldelimiter"
                              })]
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2778em"
                              }
                            }), createVNode(_components.span, {
                              class: "mrel",
                              children: "≈"
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2778em"
                              }
                            }), createVNode(_components.span, {
                              class: "mord",
                              children: "11.48"
                            })]
                          })]
                        }), createVNode(_components.span, {
                          style: {
                            top: "0.3697em"
                          },
                          children: [createVNode(_components.span, {
                            class: "pstrut",
                            style: {
                              height: "4.05em"
                            }
                          }), createVNode(_components.span, {
                            class: "mord",
                            children: [createVNode(_components.span, {
                              class: "mord"
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2778em"
                              }
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2778em"
                              }
                            }), createVNode(_components.span, {
                              class: "mrel",
                              children: "⟹"
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2778em"
                              }
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2778em"
                              }
                            }), createVNode(_components.span, {
                              class: "mord",
                              children: [createVNode(_components.span, {
                                class: "mord mathnormal",
                                style: {
                                  marginRight: "0.03148em"
                                },
                                children: "k"
                              }), createVNode(_components.span, {
                                class: "msupsub",
                                children: createVNode(_components.span, {
                                  class: "vlist-t",
                                  children: createVNode(_components.span, {
                                    class: "vlist-r",
                                    children: createVNode(_components.span, {
                                      class: "vlist",
                                      style: {
                                        height: "0.7387em"
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
                                            class: "mbin mtight",
                                            children: "∗"
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
                            }), createVNode(_components.span, {
                              class: "minner",
                              children: [createVNode(_components.span, {
                                class: "mopen",
                                children: createVNode(_components.span, {
                                  class: "delimsizing mult",
                                  children: createVNode(_components.span, {
                                    class: "vlist-t vlist-t2",
                                    children: [createVNode(_components.span, {
                                      class: "vlist-r",
                                      children: [createVNode(_components.span, {
                                        class: "vlist",
                                        style: {
                                          height: "2.05em"
                                        },
                                        children: createVNode(_components.span, {
                                          style: {
                                            top: "-4.05em"
                                          },
                                          children: [createVNode(_components.span, {
                                            class: "pstrut",
                                            style: {
                                              height: "5.6em"
                                            }
                                          }), createVNode(_components.span, {
                                            style: {
                                              width: "0.667em",
                                              height: "3.600em"
                                            },
                                            children: createVNode(_components.svg, {
                                              xmlns: "http://www.w3.org/2000/svg",
                                              width: "0.667em",
                                              height: "3.600em",
                                              viewBox: "0 0 667 3600",
                                              children: createVNode(_components.path, {
                                                d: "M319 602 V0 H403 V602 v1200 v1715 h263 v84 H319z\nM319 602 V0 H403 V602 v1200 v1715 H319z"
                                              })
                                            })
                                          })]
                                        })
                                      }), createVNode(_components.span, {
                                        class: "vlist-s",
                                        children: "​"
                                      })]
                                    }), createVNode(_components.span, {
                                      class: "vlist-r",
                                      children: createVNode(_components.span, {
                                        class: "vlist",
                                        style: {
                                          height: "1.55em"
                                        },
                                        children: createVNode(_components.span, {})
                                      })
                                    })]
                                  })
                                })
                              }), createVNode(_components.span, {
                                class: "mord",
                                children: createVNode(_components.span, {
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
                                            height: "1.3214em"
                                          },
                                          children: [createVNode(_components.span, {
                                            style: {
                                              top: "-2.11em"
                                            },
                                            children: [createVNode(_components.span, {
                                              class: "pstrut",
                                              style: {
                                                height: "3.1939em"
                                              }
                                            }), createVNode(_components.span, {
                                              class: "mord",
                                              children: [createVNode(_components.span, {
                                                class: "mord",
                                                children: "1"
                                              }), createVNode(_components.span, {
                                                class: "mspace",
                                                style: {
                                                  marginRight: "0.2222em"
                                                }
                                              }), createVNode(_components.span, {
                                                class: "mbin",
                                                children: "−"
                                              }), createVNode(_components.span, {
                                                class: "mspace",
                                                style: {
                                                  marginRight: "0.2222em"
                                                }
                                              }), createVNode(_components.span, {
                                                class: "minner",
                                                children: [createVNode(_components.span, {
                                                  class: "minner",
                                                  children: [createVNode(_components.span, {
                                                    class: "mopen delimcenter",
                                                    style: {
                                                      top: "0em"
                                                    },
                                                    children: createVNode(_components.span, {
                                                      class: "delimsizing size1",
                                                      children: "("
                                                    })
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
                                                              height: "0.8451em"
                                                            },
                                                            children: [createVNode(_components.span, {
                                                              style: {
                                                                top: "-2.655em"
                                                              },
                                                              children: [createVNode(_components.span, {
                                                                class: "pstrut",
                                                                style: {
                                                                  height: "3em"
                                                                }
                                                              }), createVNode(_components.span, {
                                                                class: "sizing reset-size6 size3 mtight",
                                                                children: createVNode(_components.span, {
                                                                  class: "mord mtight",
                                                                  children: createVNode(_components.span, {
                                                                    class: "mord mtight",
                                                                    children: "6"
                                                                  })
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
                                                                top: "-3.394em"
                                                              },
                                                              children: [createVNode(_components.span, {
                                                                class: "pstrut",
                                                                style: {
                                                                  height: "3em"
                                                                }
                                                              }), createVNode(_components.span, {
                                                                class: "sizing reset-size6 size3 mtight",
                                                                children: createVNode(_components.span, {
                                                                  class: "mord mtight",
                                                                  children: createVNode(_components.span, {
                                                                    class: "mord mtight",
                                                                    children: "5"
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
                                                              height: "0.345em"
                                                            },
                                                            children: createVNode(_components.span, {})
                                                          })
                                                        })]
                                                      })
                                                    }), createVNode(_components.span, {
                                                      class: "mclose nulldelimiter"
                                                    })]
                                                  }), createVNode(_components.span, {
                                                    class: "mclose delimcenter",
                                                    style: {
                                                      top: "0em"
                                                    },
                                                    children: createVNode(_components.span, {
                                                      class: "delimsizing size1",
                                                      children: ")"
                                                    })
                                                  })]
                                                }), createVNode(_components.span, {
                                                  class: "msupsub",
                                                  children: createVNode(_components.span, {
                                                    class: "vlist-t",
                                                    children: createVNode(_components.span, {
                                                      class: "vlist-r",
                                                      children: createVNode(_components.span, {
                                                        class: "vlist",
                                                        style: {
                                                          height: "1.1939em"
                                                        },
                                                        children: createVNode(_components.span, {
                                                          style: {
                                                            top: "-3.6029em",
                                                            marginRight: "0.05em"
                                                          },
                                                          children: [createVNode(_components.span, {
                                                            class: "pstrut",
                                                            style: {
                                                              height: "3em"
                                                            }
                                                          }), createVNode(_components.span, {
                                                            class: "sizing reset-size6 size3 mtight",
                                                            children: createVNode(_components.span, {
                                                              class: "mord mtight",
                                                              children: createVNode(_components.span, {
                                                                class: "mord mtight",
                                                                children: [createVNode(_components.span, {
                                                                  class: "mopen nulldelimiter sizing reset-size3 size6"
                                                                }), createVNode(_components.span, {
                                                                  class: "mfrac",
                                                                  children: createVNode(_components.span, {
                                                                    class: "vlist-t vlist-t2",
                                                                    children: [createVNode(_components.span, {
                                                                      class: "vlist-r",
                                                                      children: [createVNode(_components.span, {
                                                                        class: "vlist",
                                                                        style: {
                                                                          height: "0.8443em"
                                                                        },
                                                                        children: [createVNode(_components.span, {
                                                                          style: {
                                                                            top: "-2.656em"
                                                                          },
                                                                          children: [createVNode(_components.span, {
                                                                            class: "pstrut",
                                                                            style: {
                                                                              height: "3em"
                                                                            }
                                                                          }), createVNode(_components.span, {
                                                                            class: "sizing reset-size3 size1 mtight",
                                                                            children: createVNode(_components.span, {
                                                                              class: "mord mtight",
                                                                              children: createVNode(_components.span, {
                                                                                class: "mord mtight",
                                                                                children: "2"
                                                                              })
                                                                            })
                                                                          })]
                                                                        }), createVNode(_components.span, {
                                                                          style: {
                                                                            top: "-3.2255em"
                                                                          },
                                                                          children: [createVNode(_components.span, {
                                                                            class: "pstrut",
                                                                            style: {
                                                                              height: "3em"
                                                                            }
                                                                          }), createVNode(_components.span, {
                                                                            class: "frac-line mtight",
                                                                            style: {
                                                                              borderBottomWidth: "0.049em"
                                                                            }
                                                                          })]
                                                                        }), createVNode(_components.span, {
                                                                          style: {
                                                                            top: "-3.384em"
                                                                          },
                                                                          children: [createVNode(_components.span, {
                                                                            class: "pstrut",
                                                                            style: {
                                                                              height: "3em"
                                                                            }
                                                                          }), createVNode(_components.span, {
                                                                            class: "sizing reset-size3 size1 mtight",
                                                                            children: createVNode(_components.span, {
                                                                              class: "mord mtight",
                                                                              children: createVNode(_components.span, {
                                                                                class: "mord mtight",
                                                                                children: "1"
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
                                                                          height: "0.344em"
                                                                        },
                                                                        children: createVNode(_components.span, {})
                                                                      })
                                                                    })]
                                                                  })
                                                                }), createVNode(_components.span, {
                                                                  class: "mclose nulldelimiter sizing reset-size3 size6"
                                                                })]
                                                              })
                                                            })
                                                          })]
                                                        })
                                                      })
                                                    })
                                                  })
                                                })]
                                              })]
                                            })]
                                          }), createVNode(_components.span, {
                                            style: {
                                              top: "-3.4239em"
                                            },
                                            children: [createVNode(_components.span, {
                                              class: "pstrut",
                                              style: {
                                                height: "3.1939em"
                                              }
                                            }), createVNode(_components.span, {
                                              class: "frac-line",
                                              style: {
                                                borderBottomWidth: "0.04em"
                                              }
                                            })]
                                          }), createVNode(_components.span, {
                                            style: {
                                              top: "-3.8709em"
                                            },
                                            children: [createVNode(_components.span, {
                                              class: "pstrut",
                                              style: {
                                                height: "3.1939em"
                                              }
                                            }), createVNode(_components.span, {
                                              class: "mord",
                                              children: createVNode(_components.span, {
                                                class: "mord",
                                                children: "1"
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
                                            height: "1.4339em"
                                          },
                                          children: createVNode(_components.span, {})
                                        })
                                      })]
                                    })
                                  }), createVNode(_components.span, {
                                    class: "mclose nulldelimiter"
                                  })]
                                })
                              }), createVNode(_components.span, {
                                class: "mclose",
                                children: createVNode(_components.span, {
                                  class: "delimsizing mult",
                                  children: createVNode(_components.span, {
                                    class: "vlist-t vlist-t2",
                                    children: [createVNode(_components.span, {
                                      class: "vlist-r",
                                      children: [createVNode(_components.span, {
                                        class: "vlist",
                                        style: {
                                          height: "2.05em"
                                        },
                                        children: createVNode(_components.span, {
                                          style: {
                                            top: "-4.05em"
                                          },
                                          children: [createVNode(_components.span, {
                                            class: "pstrut",
                                            style: {
                                              height: "5.6em"
                                            }
                                          }), createVNode(_components.span, {
                                            style: {
                                              width: "0.667em",
                                              height: "3.600em"
                                            },
                                            children: createVNode(_components.svg, {
                                              xmlns: "http://www.w3.org/2000/svg",
                                              width: "0.667em",
                                              height: "3.600em",
                                              viewBox: "0 0 667 3600",
                                              children: createVNode(_components.path, {
                                                d: "M319 602 V0 H403 V602 v1200 v1799 H0 v-84 H319z\nM319 602 V0 H403 V602 v1200 v1715 H319z"
                                              })
                                            })
                                          })]
                                        })
                                      }), createVNode(_components.span, {
                                        class: "vlist-s",
                                        children: "​"
                                      })]
                                    }), createVNode(_components.span, {
                                      class: "vlist-r",
                                      children: createVNode(_components.span, {
                                        class: "vlist",
                                        style: {
                                          height: "1.55em"
                                        },
                                        children: createVNode(_components.span, {})
                                      })
                                    })]
                                  })
                                })
                              })]
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
                            }), createVNode(_components.span, {
                              class: "mord",
                              children: "11."
                            })]
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
                          height: "6.2697em"
                        },
                        children: createVNode(_components.span, {})
                      })
                    })]
                  })
                })]
              })
            })]
          })
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: "Generally, we have"
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
                children: [createVNode(_components.msup, {
                  children: [createVNode(_components.mi, {
                    children: "k"
                  }), createVNode(_components.mo, {
                    children: "∗"
                  })]
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mrow, {
                  children: [createVNode(_components.mo, {
                    fence: "true",
                    children: "⌊"
                  }), createVNode(_components.mfrac, {
                    children: [createVNode(_components.mn, {
                      children: "1"
                    }), createVNode(_components.mrow, {
                      children: [createVNode(_components.mn, {
                        children: "1"
                      }), createVNode(_components.mo, {
                        children: "−"
                      }), createVNode(_components.msup, {
                        children: [createVNode(_components.mrow, {
                          children: [createVNode(_components.mo, {
                            fence: "true",
                            children: "("
                          }), createVNode(_components.mfrac, {
                            children: [createVNode(_components.mn, {
                              children: "5"
                            }), createVNode(_components.mn, {
                              children: "6"
                            })]
                          }), createVNode(_components.mo, {
                            fence: "true",
                            children: ")"
                          })]
                        }), createVNode(_components.mrow, {
                          children: [createVNode(_components.mn, {
                            children: "1"
                          }), createVNode(_components.mi, {
                            mathvariant: "normal",
                            children: "/"
                          }), createVNode(_components.mi, {
                            children: "n"
                          })]
                        })]
                      })]
                    })]
                  }), createVNode(_components.mo, {
                    fence: "true",
                    children: "⌋"
                  })]
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "k^* = \\left\\lfloor \\frac{1}{1 - \\left(\\frac{5}{6}\\right)^{1/n}} \\right\\rfloor"
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
                height: "0.7387em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.03148em"
                },
                children: "k"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t",
                  children: createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.7387em"
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
                            class: "mbin mtight",
                            children: "∗"
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
                height: "3.1179em",
                verticalAlign: "-1.3679em"
              }
            }), createVNode(_components.span, {
              class: "minner",
              children: [createVNode(_components.span, {
                class: "mopen delimcenter",
                style: {
                  top: "0em"
                },
                children: createVNode(_components.span, {
                  class: "delimsizing size4",
                  children: "⌊"
                })
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
                          height: "1.3214em"
                        },
                        children: [createVNode(_components.span, {
                          style: {
                            top: "-2.11em"
                          },
                          children: [createVNode(_components.span, {
                            class: "pstrut",
                            style: {
                              height: "3.1279em"
                            }
                          }), createVNode(_components.span, {
                            class: "mord",
                            children: [createVNode(_components.span, {
                              class: "mord",
                              children: "1"
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2222em"
                              }
                            }), createVNode(_components.span, {
                              class: "mbin",
                              children: "−"
                            }), createVNode(_components.span, {
                              class: "mspace",
                              style: {
                                marginRight: "0.2222em"
                              }
                            }), createVNode(_components.span, {
                              class: "minner",
                              children: [createVNode(_components.span, {
                                class: "minner",
                                children: [createVNode(_components.span, {
                                  class: "mopen delimcenter",
                                  style: {
                                    top: "0em"
                                  },
                                  children: createVNode(_components.span, {
                                    class: "delimsizing size1",
                                    children: "("
                                  })
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
                                            height: "0.8451em"
                                          },
                                          children: [createVNode(_components.span, {
                                            style: {
                                              top: "-2.655em"
                                            },
                                            children: [createVNode(_components.span, {
                                              class: "pstrut",
                                              style: {
                                                height: "3em"
                                              }
                                            }), createVNode(_components.span, {
                                              class: "sizing reset-size6 size3 mtight",
                                              children: createVNode(_components.span, {
                                                class: "mord mtight",
                                                children: createVNode(_components.span, {
                                                  class: "mord mtight",
                                                  children: "6"
                                                })
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
                                              top: "-3.394em"
                                            },
                                            children: [createVNode(_components.span, {
                                              class: "pstrut",
                                              style: {
                                                height: "3em"
                                              }
                                            }), createVNode(_components.span, {
                                              class: "sizing reset-size6 size3 mtight",
                                              children: createVNode(_components.span, {
                                                class: "mord mtight",
                                                children: createVNode(_components.span, {
                                                  class: "mord mtight",
                                                  children: "5"
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
                                            height: "0.345em"
                                          },
                                          children: createVNode(_components.span, {})
                                        })
                                      })]
                                    })
                                  }), createVNode(_components.span, {
                                    class: "mclose nulldelimiter"
                                  })]
                                }), createVNode(_components.span, {
                                  class: "mclose delimcenter",
                                  style: {
                                    top: "0em"
                                  },
                                  children: createVNode(_components.span, {
                                    class: "delimsizing size1",
                                    children: ")"
                                  })
                                })]
                              }), createVNode(_components.span, {
                                class: "msupsub",
                                children: createVNode(_components.span, {
                                  class: "vlist-t",
                                  children: createVNode(_components.span, {
                                    class: "vlist-r",
                                    children: createVNode(_components.span, {
                                      class: "vlist",
                                      style: {
                                        height: "1.1279em"
                                      },
                                      children: createVNode(_components.span, {
                                        style: {
                                          top: "-3.3029em",
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
                                              children: "1/"
                                            }), createVNode(_components.span, {
                                              class: "mord mathnormal mtight",
                                              children: "n"
                                            })]
                                          })
                                        })]
                                      })
                                    })
                                  })
                                })
                              })]
                            })]
                          })]
                        }), createVNode(_components.span, {
                          style: {
                            top: "-3.3579em"
                          },
                          children: [createVNode(_components.span, {
                            class: "pstrut",
                            style: {
                              height: "3.1279em"
                            }
                          }), createVNode(_components.span, {
                            class: "frac-line",
                            style: {
                              borderBottomWidth: "0.04em"
                            }
                          })]
                        }), createVNode(_components.span, {
                          style: {
                            top: "-3.8049em"
                          },
                          children: [createVNode(_components.span, {
                            class: "pstrut",
                            style: {
                              height: "3.1279em"
                            }
                          }), createVNode(_components.span, {
                            class: "mord",
                            children: createVNode(_components.span, {
                              class: "mord",
                              children: "1"
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
                          height: "1.3679em"
                        },
                        children: createVNode(_components.span, {})
                      })
                    })]
                  })
                }), createVNode(_components.span, {
                  class: "mclose nulldelimiter"
                })]
              }), createVNode(_components.span, {
                class: "mclose delimcenter",
                style: {
                  top: "0em"
                },
                children: createVNode(_components.span, {
                  class: "delimsizing size4",
                  children: "⌋"
                })
              })]
            })]
          })]
        })]
      })
    }), "\n", createVNode(_components.h2, {
      id: "rigor",
      children: "Rigor"
    }), "\n", createVNode(_components.p, {
      children: ["If this is the correct relative scaling, ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.msub, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "lim"
                    }), createVNode(_components.mo, {
                      children: "⁡"
                    })]
                  }), createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "m"
                    }), createVNode(_components.mo, {
                      children: "→"
                    }), createVNode(_components.mi, {
                      mathvariant: "normal",
                      children: "∞"
                    })]
                  })]
                }), createVNode(_components.mi, {
                  mathvariant: "script",
                  children: "L"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "m"
                }), createVNode(_components.mo, {
                  separator: "true",
                  children: ","
                }), createVNode(_components.mi, {
                  children: "m"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mi, {
                  children: "C"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\lim_{m\\to\\infty}{\\mathcal L}(m, m) = C"
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
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mop",
              children: [createVNode(_components.span, {
                class: "mop",
                children: "lim"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t vlist-t2",
                  children: [createVNode(_components.span, {
                    class: "vlist-r",
                    children: [createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.1514em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-2.55em",
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
                              class: "mord mathnormal mtight",
                              children: "m"
                            }), createVNode(_components.span, {
                              class: "mrel mtight",
                              children: "→"
                            }), createVNode(_components.span, {
                              class: "mord mtight",
                              children: "∞"
                            })]
                          })
                        })]
                      })
                    }), createVNode(_components.span, {
                      class: "vlist-s",
                      children: "​"
                    })]
                  }), createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.15em"
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
              children: createVNode(_components.span, {
                class: "mord mathcal",
                children: "L"
              })
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            }), createVNode(_components.span, {
              class: "mpunct",
              children: ","
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            }), createVNode(_components.span, {
              class: "mclose",
              children: ")"
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
                height: "0.6833em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.07153em"
              },
              children: "C"
            })]
          })]
        })]
      }), " with ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mn, {
                  children: "0"
                }), createVNode(_components.mo, {
                  children: "<"
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "∣"
                }), createVNode(_components.mi, {
                  children: "C"
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "∣"
                }), createVNode(_components.mo, {
                  children: "<"
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "∞"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "0 < |C| < \\infty"
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
                height: "0.6835em",
                verticalAlign: "-0.0391em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: "0"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2778em"
              }
            }), createVNode(_components.span, {
              class: "mrel",
              children: "<"
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
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: "∣"
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.07153em"
              },
              children: "C"
            }), createVNode(_components.span, {
              class: "mord",
              children: "∣"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2778em"
              }
            }), createVNode(_components.span, {
              class: "mrel",
              children: "<"
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
                height: "0.4306em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: "∞"
            })]
          })]
        })]
      })]
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
                children: [createVNode(_components.munder, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "lim"
                    }), createVNode(_components.mo, {
                      children: "⁡"
                    })]
                  }), createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "m"
                    }), createVNode(_components.mo, {
                      children: "→"
                    }), createVNode(_components.mi, {
                      mathvariant: "normal",
                      children: "∞"
                    })]
                  })]
                }), createVNode(_components.mi, {
                  mathvariant: "script",
                  children: "L"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "m"
                }), createVNode(_components.mo, {
                  separator: "true",
                  children: ","
                }), createVNode(_components.mi, {
                  children: "m"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.munder, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "lim"
                    }), createVNode(_components.mo, {
                      children: "⁡"
                    })]
                  }), createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "m"
                    }), createVNode(_components.mo, {
                      children: "→"
                    }), createVNode(_components.mi, {
                      mathvariant: "normal",
                      children: "∞"
                    })]
                  })]
                }), createVNode(_components.mi, {
                  children: "m"
                }), createVNode(_components.mo, {
                  children: "⋅"
                }), createVNode(_components.mi, {
                  children: "log"
                }), createVNode(_components.mo, {
                  children: "⁡"
                }), createVNode(_components.mfrac, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "m"
                    }), createVNode(_components.mo, {
                      children: "−"
                    }), createVNode(_components.mn, {
                      children: "1"
                    })]
                  }), createVNode(_components.mi, {
                    children: "m"
                  })]
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mo, {
                  children: "−"
                }), createVNode(_components.mn, {
                  children: "1"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\lim_{m\\to\\infty} {\\mathcal L}(m , m) = \\lim_{m\\to\\infty} m \\cdot \\log\\frac{m - 1}{m}  = -1"
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
                height: "1.45em",
                verticalAlign: "-0.7em"
              }
            }), createVNode(_components.span, {
              class: "mop op-limits",
              children: createVNode(_components.span, {
                class: "vlist-t vlist-t2",
                children: [createVNode(_components.span, {
                  class: "vlist-r",
                  children: [createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.6944em"
                    },
                    children: [createVNode(_components.span, {
                      style: {
                        top: "-2.4em",
                        marginLeft: "0em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "sizing reset-size6 size3 mtight",
                        children: createVNode(_components.span, {
                          class: "mord mtight",
                          children: [createVNode(_components.span, {
                            class: "mord mathnormal mtight",
                            children: "m"
                          }), createVNode(_components.span, {
                            class: "mrel mtight",
                            children: "→"
                          }), createVNode(_components.span, {
                            class: "mord mtight",
                            children: "∞"
                          })]
                        })
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-3em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        children: createVNode(_components.span, {
                          class: "mop",
                          children: "lim"
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
                      height: "0.7em"
                    },
                    children: createVNode(_components.span, {})
                  })
                })]
              })
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: createVNode(_components.span, {
                class: "mord mathcal",
                children: "L"
              })
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            }), createVNode(_components.span, {
              class: "mpunct",
              children: ","
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            }), createVNode(_components.span, {
              class: "mclose",
              children: ")"
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
                height: "1.3944em",
                verticalAlign: "-0.7em"
              }
            }), createVNode(_components.span, {
              class: "mop op-limits",
              children: createVNode(_components.span, {
                class: "vlist-t vlist-t2",
                children: [createVNode(_components.span, {
                  class: "vlist-r",
                  children: [createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.6944em"
                    },
                    children: [createVNode(_components.span, {
                      style: {
                        top: "-2.4em",
                        marginLeft: "0em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "sizing reset-size6 size3 mtight",
                        children: createVNode(_components.span, {
                          class: "mord mtight",
                          children: [createVNode(_components.span, {
                            class: "mord mathnormal mtight",
                            children: "m"
                          }), createVNode(_components.span, {
                            class: "mrel mtight",
                            children: "→"
                          }), createVNode(_components.span, {
                            class: "mord mtight",
                            children: "∞"
                          })]
                        })
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-3em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        children: createVNode(_components.span, {
                          class: "mop",
                          children: "lim"
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
                      height: "0.7em"
                    },
                    children: createVNode(_components.span, {})
                  })
                })]
              })
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "m"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2222em"
              }
            }), createVNode(_components.span, {
              class: "mbin",
              children: "⋅"
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
                height: "2.0074em",
                verticalAlign: "-0.686em"
              }
            }), createVNode(_components.span, {
              class: "mop",
              children: ["lo", createVNode(_components.span, {
                style: {
                  marginRight: "0.01389em"
                },
                children: "g"
              })]
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
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
                        height: "1.3214em"
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
                            class: "mord mathnormal",
                            children: "m"
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
                          children: [createVNode(_components.span, {
                            class: "mord mathnormal",
                            children: "m"
                          }), createVNode(_components.span, {
                            class: "mspace",
                            style: {
                              marginRight: "0.2222em"
                            }
                          }), createVNode(_components.span, {
                            class: "mbin",
                            children: "−"
                          }), createVNode(_components.span, {
                            class: "mspace",
                            style: {
                              marginRight: "0.2222em"
                            }
                          }), createVNode(_components.span, {
                            class: "mord",
                            children: "1"
                          })]
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
                height: "0.7278em",
                verticalAlign: "-0.0833em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: "−"
            }), createVNode(_components.span, {
              class: "mord",
              children: "1"
            })]
          })]
        })]
      })
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

const url = "src/content/blog/concentration-of-volume-n-d-sphere-dice-throwers-interpretation.mdx";
const file = "/Users/toby/projects/blogupdate/src/content/blog/concentration-of-volume-n-d-sphere-dice-throwers-interpretation.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/toby/projects/blogupdate/src/content/blog/concentration-of-volume-n-d-sphere-dice-throwers-interpretation.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
