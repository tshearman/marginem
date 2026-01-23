globalThis.process ??= {}; globalThis.process.env ??= {};
import { w as createVNode, F as Fragment, aF as __astro_tag_component__ } from './astro/server_BqNpRBsA.mjs';
import { $ as $$Image } from './_astro_assets_DTWjcLhc.mjs';
import { t as thermoImage, p as phasesImage } from './phases_7Ua7yBqL.mjs';

const frontmatter = {
  "title": "Understanding oscillations through Young measures. Pt 1. Motivation and Regularization",
  "description": "We review oscillations and an introduction to Young measures as a means of encoding this behavior. Moreover, we explore simple examples which highlight the need for such an encoding, their role in real-world applications and in the solutions of interesting physical problems.",
  "abstract": "We review oscillations and an introduction to Young measures as a means of encoding this behavior. Moreover, we explore simple examples which highlight the need for such an encoding, their role in real-world applications and in the solutions of interesting physical problems.",
  "pubDate": "2017-02-19",
  "tags": ["mathematics", "analysis", "calculus-of-variations"],
  "draft": false
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "motivation",
    "text": "Motivation"
  }, {
    "depth": 2,
    "slug": "the-direct-method",
    "text": "The Direct Method"
  }, {
    "depth": 3,
    "slug": "theorem",
    "text": "Theorem"
  }, {
    "depth": 2,
    "slug": "nonconvexity-and-oscillations",
    "text": "Nonconvexity and oscillations"
  }, {
    "depth": 3,
    "slug": "example-bolza-young",
    "text": "Example (Bolza, Young)"
  }, {
    "depth": 3,
    "slug": "example-phase-mixtures",
    "text": "Example (Phase mixtures)"
  }, {
    "depth": 3,
    "slug": "example-phase-mixtures-distributions",
    "text": "Example (Phase mixtures, distributions)"
  }, {
    "depth": 2,
    "slug": "relaxation",
    "text": "Relaxation"
  }, {
    "depth": 2,
    "slug": "references",
    "text": "References"
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
    em: "em",
    h2: "h2",
    h3: "h3",
    li: "li",
    math: "math",
    mfrac: "mfrac",
    mi: "mi",
    mn: "mn",
    mo: "mo",
    mover: "mover",
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
    ol: "ol",
    p: "p",
    path: "path",
    section: "section",
    semantics: "semantics",
    span: "span",
    sup: "sup",
    svg: "svg",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h2, {
      id: "motivation",
      children: "Motivation"
    }), "\n", createVNode(_components.p, {
      children: "Variational principles provide insight into many physical phenomena: mechanics blossomed with the description of an action functional, such that motion is described by a principle of least action. Many fields including materials science, optics, control theory, image analysis and machine learning have benefited from recasting questions in terms of an appropriate “energy functional,” and exploring its optimizers or equilibrium states."
    }), "\n", createVNode(_components.p, {
      children: ["In general limits of sequences, and as a direct result minimizers of optimization problems, may not exist. This has been a common theme in mathematics since the time of the Babylonian mathematicians Pythagoras and rational or continued fractions approximations to ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.msqrt, {
                  children: createVNode(_components.mn, {
                    children: "2"
                  })
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\sqrt{2}"
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
                height: "1.04em",
                verticalAlign: "-0.1328em"
              }
            }), createVNode(_components.span, {
              class: "mord sqrt",
              children: createVNode(_components.span, {
                class: "vlist-t vlist-t2",
                children: [createVNode(_components.span, {
                  class: "vlist-r",
                  children: [createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.9072em"
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
                          class: "mord",
                          children: "2"
                        })
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-2.8672em"
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
                      height: "0.1328em"
                    },
                    children: createVNode(_components.span, {})
                  })
                })]
              })
            })]
          })
        })]
      }), ". For a fun discussion of continued fractions see ", createVNode(_components.sup, {
        children: createVNode(_components.a, {
          href: "#user-content-fn-cadlag-continuedfractions",
          id: "user-content-fnref-cadlag-continuedfractions",
          "data-footnote-ref": "",
          "aria-describedby": "footnote-label",
          children: "1"
        })
      }), ". Unfortunately our sequence “runs out of the space.” Or similarly, consider the sequence of smooth functions"]
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
                children: [createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "f"
                  }), createVNode(_components.mi, {
                    children: "n"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "x"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mfrac, {
                  children: [createVNode(_components.mi, {
                    children: "n"
                  }), createVNode(_components.msqrt, {
                    children: createVNode(_components.mi, {
                      children: "π"
                    })
                  })]
                }), createVNode(_components.msup, {
                  children: [createVNode(_components.mi, {
                    children: "e"
                  }), createVNode(_components.mrow, {
                    children: [createVNode(_components.mo, {
                      children: "−"
                    }), createVNode(_components.msup, {
                      children: [createVNode(_components.mrow, {
                        children: [createVNode(_components.mo, {
                          fence: "true",
                          children: "("
                        }), createVNode(_components.mfrac, {
                          children: [createVNode(_components.mi, {
                            children: "x"
                          }), createVNode(_components.mi, {
                            children: "n"
                          })]
                        }), createVNode(_components.mo, {
                          fence: "true",
                          children: ")"
                        })]
                      }), createVNode(_components.mn, {
                        children: "2"
                      })]
                    })]
                  })]
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "."
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "f_{n}(x) = \\frac{n}{\\sqrt{\\pi}} e^{-\\left(\\frac{x}{n}\\right)^2}."
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
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.10764em"
                },
                children: "f"
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
                          marginLeft: "-0.1076em",
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
                              children: "n"
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
                        height: "0.15em"
                      },
                      children: createVNode(_components.span, {})
                    })
                  })]
                })
              })]
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "x"
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
                height: "2.1157em",
                verticalAlign: "-0.93em"
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
                        height: "1.1076em"
                      },
                      children: [createVNode(_components.span, {
                        style: {
                          top: "-2.3097em"
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
                            class: "mord mathnormal",
                            children: "n"
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
                        height: "0.93em"
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
                        height: "1.1857em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-3.413em",
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
                            children: [createVNode(_components.span, {
                              class: "mord mtight",
                              children: "−"
                            }), createVNode(_components.span, {
                              class: "minner mtight",
                              children: [createVNode(_components.span, {
                                class: "minner mtight",
                                children: [createVNode(_components.span, {
                                  class: "mopen sizing reset-size3 size6 mtight delimcenter",
                                  style: {
                                    top: "0.075em"
                                  },
                                  children: createVNode(_components.span, {
                                    class: "mtight",
                                    children: "("
                                  })
                                }), createVNode(_components.span, {
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
                                            height: "0.6915em"
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
                                                  class: "mord mathnormal mtight",
                                                  children: "n"
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
                                                  class: "mord mathnormal mtight",
                                                  children: "x"
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
                                }), createVNode(_components.span, {
                                  class: "mclose sizing reset-size3 size6 mtight delimcenter",
                                  style: {
                                    top: "0.075em"
                                  },
                                  children: createVNode(_components.span, {
                                    class: "mtight",
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
                                        height: "1.1039em"
                                      },
                                      children: createVNode(_components.span, {
                                        style: {
                                          top: "-3.1436em",
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
              class: "mord",
              children: "."
            })]
          })]
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: ["The “limit” is well known to be the “", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "δ"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\delta"
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
                marginRight: "0.03785em"
              },
              children: "δ"
            })]
          })
        })]
      }), "-function,” properly interpreted as a distribution on the set of smooth functions or alternatively as a measure. Similarly, minima of variational principles may introduce irregularities, the study of which can be a delicate subject ", createVNode(_components.sup, {
        children: createVNode(_components.a, {
          href: "#user-content-fn-darkside",
          id: "user-content-fnref-darkside",
          "data-footnote-ref": "",
          "aria-describedby": "footnote-label",
          children: "2"
        })
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "Throughout the discussion, we will be considering very general problems of the form:"
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
                children: [createVNode(_components.mtext, {
                  children: "Find "
                }), createVNode(_components.mi, {
                  children: "u"
                }), createVNode(_components.mo, {
                  children: "∈"
                }), createVNode(_components.mi, {
                  mathvariant: "script",
                  children: "A"
                }), createVNode(_components.mtext, {
                  children: " such that "
                }), createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "I"
                  }), createVNode(_components.mn, {
                    children: "0"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "["
                }), createVNode(_components.mi, {
                  children: "u"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "]"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mi, {
                  children: "inf"
                }), createVNode(_components.mo, {
                  children: "⁡"
                }), createVNode(_components.mrow, {
                  children: [createVNode(_components.mo, {
                    fence: "true",
                    children: "{"
                  }), createVNode(_components.msub, {
                    children: [createVNode(_components.mi, {
                      children: "I"
                    }), createVNode(_components.mn, {
                      children: "0"
                    })]
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: "["
                  }), createVNode(_components.mi, {
                    children: "v"
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: "]"
                  }), createVNode(_components.mo, {
                    children: ":"
                  }), createVNode(_components.mi, {
                    children: "v"
                  }), createVNode(_components.mo, {
                    children: "∈"
                  }), createVNode(_components.mi, {
                    mathvariant: "script",
                    children: "A"
                  }), createVNode(_components.mo, {
                    fence: "true",
                    children: "}"
                  })]
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\textrm{Find } u\\in{\\mathcal A} \\textrm{ such that } I_0[u] = \\inf\\left\\{ I_0[v] : v\\in{\\mathcal A} \\right\\}"
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
                height: "0.7335em",
                verticalAlign: "-0.0391em"
              }
            }), createVNode(_components.span, {
              class: "mord text",
              children: createVNode(_components.span, {
                class: "mord textrm",
                children: "Find "
              })
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "u"
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
              class: "mord",
              children: createVNode(_components.span, {
                class: "mord mathcal",
                children: "A"
              })
            }), createVNode(_components.span, {
              class: "mord text",
              children: createVNode(_components.span, {
                class: "mord textrm",
                children: " such that "
              })
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.07847em"
                },
                children: "I"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t vlist-t2",
                  children: [createVNode(_components.span, {
                    class: "vlist-r",
                    children: [createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.3011em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-2.55em",
                          marginLeft: "-0.0785em",
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
                            children: "0"
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
              class: "mopen",
              children: "["
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "u"
            }), createVNode(_components.span, {
              class: "mclose",
              children: "]"
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
              class: "mop",
              children: ["in", createVNode(_components.span, {
                style: {
                  marginRight: "0.07778em"
                },
                children: "f"
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
                children: "{"
              }), createVNode(_components.span, {
                class: "mord",
                children: [createVNode(_components.span, {
                  class: "mord mathnormal",
                  style: {
                    marginRight: "0.07847em"
                  },
                  children: "I"
                }), createVNode(_components.span, {
                  class: "msupsub",
                  children: createVNode(_components.span, {
                    class: "vlist-t vlist-t2",
                    children: [createVNode(_components.span, {
                      class: "vlist-r",
                      children: [createVNode(_components.span, {
                        class: "vlist",
                        style: {
                          height: "0.3011em"
                        },
                        children: createVNode(_components.span, {
                          style: {
                            top: "-2.55em",
                            marginLeft: "-0.0785em",
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
                              children: "0"
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
                class: "mopen",
                children: "["
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.03588em"
                },
                children: "v"
              }), createVNode(_components.span, {
                class: "mclose",
                children: "]"
              }), createVNode(_components.span, {
                class: "mspace",
                style: {
                  marginRight: "0.2778em"
                }
              }), createVNode(_components.span, {
                class: "mrel",
                children: ":"
              }), createVNode(_components.span, {
                class: "mspace",
                style: {
                  marginRight: "0.2778em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.03588em"
                },
                children: "v"
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
              }), createVNode(_components.span, {
                class: "mord",
                children: createVNode(_components.span, {
                  class: "mord mathcal",
                  children: "A"
                })
              }), createVNode(_components.span, {
                class: "mclose delimcenter",
                style: {
                  top: "0em"
                },
                children: "}"
              })]
            })]
          })]
        })]
      })
    }), "\n", createVNode(_components.h2, {
      id: "the-direct-method",
      children: "The Direct Method"
    }), "\n", createVNode(_components.p, {
      children: ["Hilbert introduced a set of criterion under which minimizers to the problem above are guaranteed: ", createVNode(_components.em, {
        children: "The Direct Method."
      })]
    }), "\n", createVNode(_components.p, {
      children: ["Let ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "u"
                  }), createVNode(_components.mi, {
                    children: "n"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "(u_n)"
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
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                children: "u"
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
                            children: "n"
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
              class: "mclose",
              children: ")"
            })]
          })
        })]
      }), " be a minimizing sequence, ", createVNode(_components.em, {
        children: "i.e."
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
                      children: "n"
                    }), createVNode(_components.mo, {
                      children: "→"
                    }), createVNode(_components.mi, {
                      mathvariant: "normal",
                      children: "∞"
                    })]
                  })]
                }), createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "I"
                  }), createVNode(_components.mn, {
                    children: "0"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "["
                }), createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "u"
                  }), createVNode(_components.mi, {
                    children: "n"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "]"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mi, {
                  children: "inf"
                }), createVNode(_components.mo, {
                  children: "⁡"
                }), createVNode(_components.mrow, {
                  children: [createVNode(_components.mo, {
                    fence: "true",
                    children: "{"
                  }), createVNode(_components.msub, {
                    children: [createVNode(_components.mi, {
                      children: "I"
                    }), createVNode(_components.mn, {
                      children: "0"
                    })]
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: "["
                  }), createVNode(_components.mi, {
                    children: "v"
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: "]"
                  }), createVNode(_components.mo, {
                    children: ":"
                  }), createVNode(_components.mi, {
                    children: "v"
                  }), createVNode(_components.mo, {
                    children: "∈"
                  }), createVNode(_components.mi, {
                    mathvariant: "script",
                    children: "A"
                  }), createVNode(_components.mo, {
                    fence: "true",
                    children: "}"
                  })]
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "."
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\lim_{n \\to \\infty} I_0[u_n] = \\inf\\left\\{ I_0[v] : v\\in{\\mathcal A} \\right\\}."
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
                            children: "n"
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
                class: "mord mathnormal",
                style: {
                  marginRight: "0.07847em"
                },
                children: "I"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t vlist-t2",
                  children: [createVNode(_components.span, {
                    class: "vlist-r",
                    children: [createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.3011em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-2.55em",
                          marginLeft: "-0.0785em",
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
                            children: "0"
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
              class: "mopen",
              children: "["
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                children: "u"
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
                            children: "n"
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
              class: "mclose",
              children: "]"
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
              class: "mop",
              children: ["in", createVNode(_components.span, {
                style: {
                  marginRight: "0.07778em"
                },
                children: "f"
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
                children: "{"
              }), createVNode(_components.span, {
                class: "mord",
                children: [createVNode(_components.span, {
                  class: "mord mathnormal",
                  style: {
                    marginRight: "0.07847em"
                  },
                  children: "I"
                }), createVNode(_components.span, {
                  class: "msupsub",
                  children: createVNode(_components.span, {
                    class: "vlist-t vlist-t2",
                    children: [createVNode(_components.span, {
                      class: "vlist-r",
                      children: [createVNode(_components.span, {
                        class: "vlist",
                        style: {
                          height: "0.3011em"
                        },
                        children: createVNode(_components.span, {
                          style: {
                            top: "-2.55em",
                            marginLeft: "-0.0785em",
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
                              children: "0"
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
                class: "mopen",
                children: "["
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.03588em"
                },
                children: "v"
              }), createVNode(_components.span, {
                class: "mclose",
                children: "]"
              }), createVNode(_components.span, {
                class: "mspace",
                style: {
                  marginRight: "0.2778em"
                }
              }), createVNode(_components.span, {
                class: "mrel",
                children: ":"
              }), createVNode(_components.span, {
                class: "mspace",
                style: {
                  marginRight: "0.2778em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.03588em"
                },
                children: "v"
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
              }), createVNode(_components.span, {
                class: "mord",
                children: createVNode(_components.span, {
                  class: "mord mathcal",
                  children: "A"
                })
              }), createVNode(_components.span, {
                class: "mclose delimcenter",
                style: {
                  top: "0em"
                },
                children: "}"
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
      children: ["Then the direct method can be described simply as selecting an appropriate topology ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "τ"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\tau"
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
                marginRight: "0.1132em"
              },
              children: "τ"
            })]
          })
        })]
      }), " satisfying the balance"]
    }), "\n", createVNode(_components.ol, {
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
                    children: "τ"
                  })
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "\\tau"
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
                  marginRight: "0.1132em"
                },
                children: "τ"
              })]
            })
          })]
        }), " is sufficiently coarse to ensure ", createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: [createVNode(_components.mo, {
                    stretchy: "false",
                    children: "("
                  }), createVNode(_components.msub, {
                    children: [createVNode(_components.mi, {
                      children: "u"
                    }), createVNode(_components.mi, {
                      children: "n"
                    })]
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: ")"
                  })]
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "(u_n)"
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
                class: "mopen",
                children: "("
              }), createVNode(_components.span, {
                class: "mord",
                children: [createVNode(_components.span, {
                  class: "mord mathnormal",
                  children: "u"
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
                              children: "n"
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
                class: "mclose",
                children: ")"
              })]
            })
          })]
        }), " is compact,"]
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
                    children: "τ"
                  })
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "\\tau"
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
                  marginRight: "0.1132em"
                },
                children: "τ"
              })]
            })
          })]
        }), " is sufficiently fine to ensure ", createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: createVNode(_components.msub, {
                    children: [createVNode(_components.mi, {
                      children: "I"
                    }), createVNode(_components.mn, {
                      children: "0"
                    })]
                  })
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "I_0"
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
                  height: "0.8333em",
                  verticalAlign: "-0.15em"
                }
              }), createVNode(_components.span, {
                class: "mord",
                children: [createVNode(_components.span, {
                  class: "mord mathnormal",
                  style: {
                    marginRight: "0.07847em"
                  },
                  children: "I"
                }), createVNode(_components.span, {
                  class: "msupsub",
                  children: createVNode(_components.span, {
                    class: "vlist-t vlist-t2",
                    children: [createVNode(_components.span, {
                      class: "vlist-r",
                      children: [createVNode(_components.span, {
                        class: "vlist",
                        style: {
                          height: "0.3011em"
                        },
                        children: createVNode(_components.span, {
                          style: {
                            top: "-2.55em",
                            marginLeft: "-0.0785em",
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
                              children: "0"
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
              })]
            })
          })]
        }), " is lower semi-continuous."]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["Under these conditions, proof of existence of a minimizer becomes relatively simple. Let ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mo, {
                  fence: "true",
                  children: "("
                }), createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "u"
                  }), createVNode(_components.mi, {
                    children: "n"
                  })]
                }), createVNode(_components.mo, {
                  fence: "true",
                  children: ")"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\left( u_n \\right)"
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
              class: "minner",
              children: [createVNode(_components.span, {
                class: "mopen delimcenter",
                style: {
                  top: "0em"
                },
                children: "("
              }), createVNode(_components.span, {
                class: "mord",
                children: [createVNode(_components.span, {
                  class: "mord mathnormal",
                  children: "u"
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
                              children: "n"
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
                class: "mclose delimcenter",
                style: {
                  top: "0em"
                },
                children: ")"
              })]
            })]
          })
        })]
      }), " be a minimizing sequence. In the topology ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "τ"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\tau"
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
                marginRight: "0.1132em"
              },
              children: "τ"
            })]
          })
        })]
      }), " this sequence is (sequentially) compact. Perhaps after selecting an appropriate subsequence, let ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "u"
                  }), createVNode(_components.mi, {
                    children: "n"
                  })]
                }), createVNode(_components.mo, {
                  children: "→"
                }), createVNode(_components.mi, {
                  children: "u"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "u_n \\to u"
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
                children: "u"
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
                            children: "n"
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
              class: "mord mathnormal",
              children: "u"
            })]
          })]
        })]
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: ["Then, by lower semicontinuity of ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "I"
                  }), createVNode(_components.mn, {
                    children: "0"
                  })]
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "I_0"
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
                height: "0.8333em",
                verticalAlign: "-0.15em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.07847em"
                },
                children: "I"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t vlist-t2",
                  children: [createVNode(_components.span, {
                    class: "vlist-r",
                    children: [createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.3011em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-2.55em",
                          marginLeft: "-0.0785em",
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
                            children: "0"
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
            })]
          })
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
                children: [createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "I"
                  }), createVNode(_components.mn, {
                    children: "0"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "u"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "≤"
                }), createVNode(_components.munder, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      mathvariant: "normal",
                      children: "lim inf"
                    }), createVNode(_components.mo, {
                      children: "⁡"
                    })]
                  }), createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "n"
                    }), createVNode(_components.mo, {
                      children: "→"
                    }), createVNode(_components.mi, {
                      mathvariant: "normal",
                      children: "∞"
                    })]
                  })]
                }), createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "I"
                  }), createVNode(_components.mn, {
                    children: "0"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "u"
                  }), createVNode(_components.mi, {
                    children: "n"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.munder, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "inf"
                    }), createVNode(_components.mo, {
                      children: "⁡"
                    })]
                  }), createVNode(_components.mi, {
                    mathvariant: "script",
                    children: "A"
                  })]
                }), createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "I"
                  }), createVNode(_components.mn, {
                    children: "0"
                  })]
                }), createVNode(_components.mo, {
                  separator: "true",
                  children: ","
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "I_0(u) \\leq \\liminf_{n\\to\\infty} I_0(u_n) = \\inf_{\\mathcal A} I_0,"
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
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.07847em"
                },
                children: "I"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t vlist-t2",
                  children: [createVNode(_components.span, {
                    class: "vlist-r",
                    children: [createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.3011em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-2.55em",
                          marginLeft: "-0.0785em",
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
                            children: "0"
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
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "u"
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
              children: "≤"
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
                            children: "n"
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
                          children: [createVNode(_components.span, {
                            class: "mord mathrm",
                            children: "lim"
                          }), createVNode(_components.span, {
                            class: "mspace",
                            style: {
                              marginRight: "0.1667em"
                            }
                          }), createVNode(_components.span, {
                            class: "mord mathrm",
                            style: {
                              marginRight: "0.07778em"
                            },
                            children: "inf"
                          })]
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
                class: "mord mathnormal",
                style: {
                  marginRight: "0.07847em"
                },
                children: "I"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t vlist-t2",
                  children: [createVNode(_components.span, {
                    class: "vlist-r",
                    children: [createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.3011em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-2.55em",
                          marginLeft: "-0.0785em",
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
                            children: "0"
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
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                children: "u"
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
                            children: "n"
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
                height: "1.4388em",
                verticalAlign: "-0.7443em"
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
                        top: "-2.3557em",
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
                          children: createVNode(_components.span, {
                            class: "mord mathcal mtight",
                            children: "A"
                          })
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
                          children: ["in", createVNode(_components.span, {
                            style: {
                              marginRight: "0.07778em"
                            },
                            children: "f"
                          })]
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
                      height: "0.7443em"
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
                class: "mord mathnormal",
                style: {
                  marginRight: "0.07847em"
                },
                children: "I"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t vlist-t2",
                  children: [createVNode(_components.span, {
                    class: "vlist-r",
                    children: [createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.3011em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-2.55em",
                          marginLeft: "-0.0785em",
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
                            children: "0"
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
              class: "mpunct",
              children: ","
            })]
          })]
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: ["and ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "u"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "u"
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
              children: "u"
            })]
          })
        })]
      }), " is a minimizer of ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "I"
                  }), createVNode(_components.mn, {
                    children: "0"
                  })]
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "I_0"
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
                height: "0.8333em",
                verticalAlign: "-0.15em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.07847em"
                },
                children: "I"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t vlist-t2",
                  children: [createVNode(_components.span, {
                    class: "vlist-r",
                    children: [createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.3011em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-2.55em",
                          marginLeft: "-0.0785em",
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
                            children: "0"
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
            })]
          })
        })]
      }), ". Uniqueness is clearly not guaranteed."]
    }), "\n", createVNode(_components.p, {
      children: "Now suppose that our minimization problem has more structure. That it can be represented as an integral:"
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
                children: [createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "I"
                  }), createVNode(_components.mn, {
                    children: "0"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "["
                }), createVNode(_components.mi, {
                  children: "u"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "]"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mo, {
                  children: "∫"
                }), createVNode(_components.mi, {
                  children: "f"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "u"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "x"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mi, {
                  children: "d"
                }), createVNode(_components.mi, {
                  children: "x"
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "."
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "I_0[u] = \\int f(u(x)) dx."
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
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.07847em"
                },
                children: "I"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t vlist-t2",
                  children: [createVNode(_components.span, {
                    class: "vlist-r",
                    children: [createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.3011em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-2.55em",
                          marginLeft: "-0.0785em",
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
                            children: "0"
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
              class: "mopen",
              children: "["
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "u"
            }), createVNode(_components.span, {
              class: "mclose",
              children: "]"
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
                height: "2.2222em",
                verticalAlign: "-0.8622em"
              }
            }), createVNode(_components.span, {
              class: "mop op-symbol large-op",
              style: {
                marginRight: "0.44445em",
                position: "relative",
                top: "-0.0011em"
              },
              children: "∫"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.10764em"
              },
              children: "f"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "u"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "x"
            }), createVNode(_components.span, {
              class: "mclose",
              children: "))"
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "d"
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "x"
            }), createVNode(_components.span, {
              class: "mord",
              children: "."
            })]
          })]
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: ["The following theorem tells us that ", createVNode(_components.em, {
        children: "convexity"
      }), " is really the key to applying the direct method, and the lack of convexity will result in potential difficulties finding solutions ", createVNode(_components.sup, {
        children: createVNode(_components.a, {
          href: "#user-content-fn-fonseca-modern-methods",
          id: "user-content-fnref-fonseca-modern-methods",
          "data-footnote-ref": "",
          "aria-describedby": "footnote-label",
          children: "3"
        })
      }), "."]
    }), "\n", createVNode(_components.h3, {
      id: "theorem",
      children: "Theorem"
    }), "\n", createVNode(_components.p, {
      children: ["Let ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mi, {
                  children: "f"
                }), createVNode(_components.mo, {
                  children: ":"
                }), createVNode(_components.msup, {
                  children: [createVNode(_components.mi, {
                    mathvariant: "double-struck",
                    children: "R"
                  }), createVNode(_components.mi, {
                    children: "m"
                  })]
                }), createVNode(_components.mo, {
                  children: "→"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mo, {
                  children: "−"
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "∞"
                }), createVNode(_components.mo, {
                  separator: "true",
                  children: ","
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "∞"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "]"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "f:{\\mathbb R}^m \\to (-\\infty, \\infty]"
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
                height: "0.8889em",
                verticalAlign: "-0.1944em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.10764em"
              },
              children: "f"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2778em"
              }
            }), createVNode(_components.span, {
              class: "mrel",
              children: ":"
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
                height: "0.6889em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord",
                children: createVNode(_components.span, {
                  class: "mord mathbb",
                  children: "R"
                })
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t",
                  children: createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.6644em"
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
                            class: "mord mathnormal mtight",
                            children: "m"
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
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord",
              children: "−"
            }), createVNode(_components.span, {
              class: "mord",
              children: "∞"
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
              children: "∞"
            }), createVNode(_components.span, {
              class: "mclose",
              children: "]"
            })]
          })]
        })]
      }), " be lower semicontinuous, and ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mi, {
                  children: "inf"
                }), createVNode(_components.mo, {
                  children: "⁡"
                }), createVNode(_components.mrow, {
                  children: [createVNode(_components.mo, {
                    fence: "true",
                    children: "{"
                  }), createVNode(_components.mo, {
                    children: "∫"
                  }), createVNode(_components.mi, {
                    children: "f"
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: "("
                  }), createVNode(_components.mi, {
                    children: "v"
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: "("
                  }), createVNode(_components.mi, {
                    children: "x"
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: ")"
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: ")"
                  }), createVNode(_components.mi, {
                    children: "d"
                  }), createVNode(_components.mi, {
                    children: "x"
                  }), createVNode(_components.mo, {
                    children: ":"
                  }), createVNode(_components.mi, {
                    children: "v"
                  }), createVNode(_components.mo, {
                    children: "∈"
                  }), createVNode(_components.msup, {
                    children: [createVNode(_components.mi, {
                      children: "L"
                    }), createVNode(_components.mi, {
                      children: "p"
                    })]
                  }), createVNode(_components.mo, {
                    fence: "true",
                    children: "}"
                  })]
                }), createVNode(_components.mo, {
                  children: "<"
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "∞"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\inf \\left\\{\\int f(v(x))dx : v\\in L^p\\right\\} < \\infty"
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
                height: "1.2em",
                verticalAlign: "-0.35em"
              }
            }), createVNode(_components.span, {
              class: "mop",
              children: ["in", createVNode(_components.span, {
                style: {
                  marginRight: "0.07778em"
                },
                children: "f"
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
                  class: "delimsizing size1",
                  children: "{"
                })
              }), createVNode(_components.span, {
                class: "mop op-symbol small-op",
                style: {
                  marginRight: "0.19445em",
                  position: "relative",
                  top: "-0.0006em"
                },
                children: "∫"
              }), createVNode(_components.span, {
                class: "mspace",
                style: {
                  marginRight: "0.1667em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.10764em"
                },
                children: "f"
              }), createVNode(_components.span, {
                class: "mopen",
                children: "("
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.03588em"
                },
                children: "v"
              }), createVNode(_components.span, {
                class: "mopen",
                children: "("
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                children: "x"
              }), createVNode(_components.span, {
                class: "mclose",
                children: "))"
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
                children: ":"
              }), createVNode(_components.span, {
                class: "mspace",
                style: {
                  marginRight: "0.2778em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.03588em"
                },
                children: "v"
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
              }), createVNode(_components.span, {
                class: "mord",
                children: [createVNode(_components.span, {
                  class: "mord mathnormal",
                  children: "L"
                }), createVNode(_components.span, {
                  class: "msupsub",
                  children: createVNode(_components.span, {
                    class: "vlist-t",
                    children: createVNode(_components.span, {
                      class: "vlist-r",
                      children: createVNode(_components.span, {
                        class: "vlist",
                        style: {
                          height: "0.6644em"
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
                              class: "mord mathnormal mtight",
                              children: "p"
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
                  class: "delimsizing size1",
                  children: "}"
                })
              })]
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
      }), ". Then the mapping"]
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
                  children: "v"
                }), createVNode(_components.mo, {
                  children: "↦"
                }), createVNode(_components.mo, {
                  children: "∫"
                }), createVNode(_components.mi, {
                  children: "f"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "v"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "x"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mi, {
                  children: "d"
                }), createVNode(_components.mi, {
                  children: "x"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "v\\mapsto \\int f(v(x))dx"
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
                height: "0.522em",
                verticalAlign: "-0.011em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.03588em"
              },
              children: "v"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.2778em"
              }
            }), createVNode(_components.span, {
              class: "mrel",
              children: "↦"
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
                height: "2.2222em",
                verticalAlign: "-0.8622em"
              }
            }), createVNode(_components.span, {
              class: "mop op-symbol large-op",
              style: {
                marginRight: "0.44445em",
                position: "relative",
                top: "-0.0011em"
              },
              children: "∫"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.10764em"
              },
              children: "f"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.03588em"
              },
              children: "v"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "x"
            }), createVNode(_components.span, {
              class: "mclose",
              children: "))"
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "d"
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "x"
            })]
          })]
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: ["is weakly sequentially lower semicontinuous if and only if ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "f"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "f"
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
                marginRight: "0.10764em"
              },
              children: "f"
            })]
          })
        })]
      }), " is convex."]
    }), "\n", createVNode(_components.h2, {
      id: "nonconvexity-and-oscillations",
      children: "Nonconvexity and oscillations"
    }), "\n", createVNode(_components.h3, {
      id: "example-bolza-young",
      children: "Example (Bolza, Young)"
    }), "\n", createVNode(_components.p, {
      children: "Consider the famous Bolza-Young problem:"
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
                      children: "min"
                    }), createVNode(_components.mo, {
                      children: "⁡"
                    })]
                  }), createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "u"
                    }), createVNode(_components.mo, {
                      children: "∈"
                    }), createVNode(_components.mi, {
                      mathvariant: "script",
                      children: "A"
                    })]
                  })]
                }), createVNode(_components.mi, {
                  children: "I"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "["
                }), createVNode(_components.mi, {
                  children: "u"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "]"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.munder, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "min"
                    }), createVNode(_components.mo, {
                      children: "⁡"
                    })]
                  }), createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "u"
                    }), createVNode(_components.mo, {
                      children: "∈"
                    }), createVNode(_components.mi, {
                      mathvariant: "script",
                      children: "A"
                    })]
                  })]
                }), createVNode(_components.mo, {
                  children: "∫"
                }), createVNode(_components.msup, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mo, {
                      fence: "true",
                      children: "("
                    }), createVNode(_components.msub, {
                      children: [createVNode(_components.mi, {
                        mathvariant: "normal",
                        children: "∂"
                      }), createVNode(_components.mi, {
                        children: "x"
                      })]
                    }), createVNode(_components.msup, {
                      children: [createVNode(_components.mi, {
                        children: "u"
                      }), createVNode(_components.mn, {
                        children: "2"
                      })]
                    }), createVNode(_components.mo, {
                      children: "−"
                    }), createVNode(_components.mn, {
                      children: "1"
                    }), createVNode(_components.mo, {
                      fence: "true",
                      children: ")"
                    })]
                  }), createVNode(_components.mn, {
                    children: "2"
                  })]
                }), createVNode(_components.mo, {
                  children: "+"
                }), createVNode(_components.msup, {
                  children: [createVNode(_components.mi, {
                    children: "u"
                  }), createVNode(_components.mn, {
                    children: "2"
                  })]
                }), createVNode(_components.mi, {
                  children: "d"
                }), createVNode(_components.mi, {
                  children: "x"
                }), createVNode(_components.mo, {
                  separator: "true",
                  children: ","
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\min_{u \\in \\mathcal A} I[u] = \\min_{u \\in \\mathcal A} \\int \\left(\\partial_x u ^2 - 1\\right)^2 + u^2 dx,"
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
                height: "1.5217em",
                verticalAlign: "-0.7717em"
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
                      height: "0.6679em"
                    },
                    children: [createVNode(_components.span, {
                      style: {
                        top: "-2.3557em",
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
                            children: "u"
                          }), createVNode(_components.span, {
                            class: "mrel mtight",
                            children: "∈"
                          }), createVNode(_components.span, {
                            class: "mord mathcal mtight",
                            children: "A"
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
                          children: "min"
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
                      height: "0.7717em"
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
              style: {
                marginRight: "0.07847em"
              },
              children: "I"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "["
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "u"
            }), createVNode(_components.span, {
              class: "mclose",
              children: "]"
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
                height: "2.2222em",
                verticalAlign: "-0.8622em"
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
                      height: "0.6679em"
                    },
                    children: [createVNode(_components.span, {
                      style: {
                        top: "-2.3557em",
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
                            children: "u"
                          }), createVNode(_components.span, {
                            class: "mrel mtight",
                            children: "∈"
                          }), createVNode(_components.span, {
                            class: "mord mathcal mtight",
                            children: "A"
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
                          children: "min"
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
                      height: "0.7717em"
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
              class: "mop op-symbol large-op",
              style: {
                marginRight: "0.44445em",
                position: "relative",
                top: "-0.0011em"
              },
              children: "∫"
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
                    class: "delimsizing size1",
                    children: "("
                  })
                }), createVNode(_components.span, {
                  class: "mord",
                  children: [createVNode(_components.span, {
                    class: "mord",
                    style: {
                      marginRight: "0.05556em"
                    },
                    children: "∂"
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
                              marginLeft: "-0.0556em",
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
                                children: "x"
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
                  class: "mord",
                  children: [createVNode(_components.span, {
                    class: "mord mathnormal",
                    children: "u"
                  }), createVNode(_components.span, {
                    class: "msupsub",
                    children: createVNode(_components.span, {
                      class: "vlist-t",
                      children: createVNode(_components.span, {
                        class: "vlist-r",
                        children: createVNode(_components.span, {
                          class: "vlist",
                          style: {
                            height: "0.8641em"
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
                        height: "1.0681em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-3.317em",
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
                height: "1.0585em",
                verticalAlign: "-0.1944em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                children: "u"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t",
                  children: createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.8641em"
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
                            children: "2"
                          })
                        })]
                      })
                    })
                  })
                })
              })]
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "d"
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "x"
            }), createVNode(_components.span, {
              class: "mpunct",
              children: ","
            })]
          })]
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: "over the collection of admissable functions"
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
                  mathvariant: "script",
                  children: "A"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mrow, {
                  children: [createVNode(_components.mo, {
                    fence: "true",
                    children: "{"
                  }), createVNode(_components.mi, {
                    children: "u"
                  }), createVNode(_components.mo, {
                    children: "∈"
                  }), createVNode(_components.msup, {
                    children: [createVNode(_components.mi, {
                      children: "W"
                    }), createVNode(_components.mrow, {
                      children: [createVNode(_components.mn, {
                        children: "1"
                      }), createVNode(_components.mo, {
                        separator: "true",
                        children: ","
                      }), createVNode(_components.mn, {
                        children: "2"
                      })]
                    })]
                  }), createVNode(_components.mo, {
                    children: ":"
                  }), createVNode(_components.mi, {
                    children: "u"
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: "("
                  }), createVNode(_components.mn, {
                    children: "0"
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: ")"
                  }), createVNode(_components.mo, {
                    children: "="
                  }), createVNode(_components.mi, {
                    children: "u"
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: "("
                  }), createVNode(_components.mn, {
                    children: "1"
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: ")"
                  }), createVNode(_components.mo, {
                    children: "="
                  }), createVNode(_components.mn, {
                    children: "0"
                  }), createVNode(_components.mo, {
                    fence: "true",
                    children: "}"
                  })]
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "."
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "{\\mathcal A} = \\left\\{ u \\in W^{1,2} : u(0)=u(1)=0 \\right\\}."
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
                height: "0.6833em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: createVNode(_components.span, {
                class: "mord mathcal",
                children: "A"
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
            })]
          }), createVNode(_components.span, {
            class: "base",
            children: [createVNode(_components.span, {
              class: "strut",
              style: {
                height: "1.2141em",
                verticalAlign: "-0.35em"
              }
            }), createVNode(_components.span, {
              class: "minner",
              children: [createVNode(_components.span, {
                class: "mopen delimcenter",
                style: {
                  top: "0em"
                },
                children: createVNode(_components.span, {
                  class: "delimsizing size1",
                  children: "{"
                })
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                children: "u"
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
              }), createVNode(_components.span, {
                class: "mord",
                children: [createVNode(_components.span, {
                  class: "mord mathnormal",
                  style: {
                    marginRight: "0.13889em"
                  },
                  children: "W"
                }), createVNode(_components.span, {
                  class: "msupsub",
                  children: createVNode(_components.span, {
                    class: "vlist-t",
                    children: createVNode(_components.span, {
                      class: "vlist-r",
                      children: createVNode(_components.span, {
                        class: "vlist",
                        style: {
                          height: "0.8641em"
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
                                children: "1"
                              }), createVNode(_components.span, {
                                class: "mpunct mtight",
                                children: ","
                              }), createVNode(_components.span, {
                                class: "mord mtight",
                                children: "2"
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
                children: ":"
              }), createVNode(_components.span, {
                class: "mspace",
                style: {
                  marginRight: "0.2778em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                children: "u"
              }), createVNode(_components.span, {
                class: "mopen",
                children: "("
              }), createVNode(_components.span, {
                class: "mord",
                children: "0"
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
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                children: "u"
              }), createVNode(_components.span, {
                class: "mopen",
                children: "("
              }), createVNode(_components.span, {
                class: "mord",
                children: "1"
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
              }), createVNode(_components.span, {
                class: "mord",
                children: "0"
              }), createVNode(_components.span, {
                class: "mclose delimcenter",
                style: {
                  top: "0em"
                },
                children: createVNode(_components.span, {
                  class: "delimsizing size1",
                  children: "}"
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
      children: ["Let ", createVNode(_components.span, {
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
                  children: "="
                }), createVNode(_components.msub, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "inf"
                    }), createVNode(_components.mo, {
                      children: "⁡"
                    })]
                  }), createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "u"
                    }), createVNode(_components.mo, {
                      children: "∈"
                    }), createVNode(_components.mi, {
                      mathvariant: "script",
                      children: "A"
                    })]
                  })]
                }), createVNode(_components.mi, {
                  children: "I"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "["
                }), createVNode(_components.mi, {
                  children: "u"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "]"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "m = \\inf_{u \\in \\mathcal A} I[u]"
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
              class: "mop",
              children: [createVNode(_components.span, {
                class: "mop",
                children: ["in", createVNode(_components.span, {
                  style: {
                    marginRight: "0.07778em"
                  },
                  children: "f"
                })]
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t vlist-t2",
                  children: [createVNode(_components.span, {
                    class: "vlist-r",
                    children: [createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.3283em"
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
                              children: "u"
                            }), createVNode(_components.span, {
                              class: "mrel mtight",
                              children: "∈"
                            }), createVNode(_components.span, {
                              class: "mord mathcal mtight",
                              children: "A"
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
                        height: "0.1774em"
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
              class: "mord mathnormal",
              style: {
                marginRight: "0.07847em"
              },
              children: "I"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "["
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "u"
            }), createVNode(_components.span, {
              class: "mclose",
              children: "]"
            })]
          })]
        })]
      }), ". Clearly ", createVNode(_components.span, {
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
                  children: "≥"
                }), createVNode(_components.mn, {
                  children: "0"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "m \\geq 0"
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
                height: "0.7719em",
                verticalAlign: "-0.136em"
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
              children: "≥"
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
      }), ". In fact, it isn’t too tricky to see that ", createVNode(_components.span, {
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
                  children: "="
                }), createVNode(_components.mn, {
                  children: "0"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "m = 0"
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
      }), ". Consider"]
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
                  children: "f"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "x"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mrow, {
                  children: [createVNode(_components.mo, {
                    fence: "true",
                    children: "{"
                  }), createVNode(_components.mtable, {
                    rowspacing: "0.36em",
                    columnalign: "left left",
                    columnspacing: "1em",
                    children: [createVNode(_components.mtr, {
                      children: [createVNode(_components.mtd, {
                        children: createVNode(_components.mstyle, {
                          scriptlevel: "0",
                          displaystyle: "false",
                          children: createVNode(_components.mrow, {
                            children: [createVNode(_components.mi, {
                              children: "x"
                            }), createVNode(_components.mo, {
                              separator: "true",
                              children: ","
                            })]
                          })
                        })
                      }), createVNode(_components.mtd, {
                        children: createVNode(_components.mstyle, {
                          scriptlevel: "0",
                          displaystyle: "false",
                          children: createVNode(_components.mrow, {
                            children: [createVNode(_components.mn, {
                              children: "0"
                            }), createVNode(_components.mo, {
                              children: "<"
                            }), createVNode(_components.mi, {
                              children: "x"
                            }), createVNode(_components.mo, {
                              children: "<"
                            }), createVNode(_components.mfrac, {
                              children: [createVNode(_components.mn, {
                                children: "1"
                              }), createVNode(_components.mn, {
                                children: "2"
                              })]
                            })]
                          })
                        })
                      })]
                    }), createVNode(_components.mtr, {
                      children: [createVNode(_components.mtd, {
                        children: createVNode(_components.mstyle, {
                          scriptlevel: "0",
                          displaystyle: "false",
                          children: createVNode(_components.mrow, {
                            children: [createVNode(_components.mn, {
                              children: "1"
                            }), createVNode(_components.mo, {
                              children: "−"
                            }), createVNode(_components.mi, {
                              children: "x"
                            }), createVNode(_components.mo, {
                              separator: "true",
                              children: ","
                            })]
                          })
                        })
                      }), createVNode(_components.mtd, {
                        children: createVNode(_components.mstyle, {
                          scriptlevel: "0",
                          displaystyle: "false",
                          children: createVNode(_components.mrow, {
                            children: [createVNode(_components.mfrac, {
                              children: [createVNode(_components.mn, {
                                children: "1"
                              }), createVNode(_components.mn, {
                                children: "2"
                              })]
                            }), createVNode(_components.mo, {
                              children: "<"
                            }), createVNode(_components.mi, {
                              children: "x"
                            }), createVNode(_components.mo, {
                              children: "<"
                            }), createVNode(_components.mn, {
                              children: "1"
                            })]
                          })
                        })
                      })]
                    })]
                  })]
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "f(x) =\n\\begin{cases}\nx, & 0 < x < \\frac{1}{2} \\\\\n1 - x, & \\frac{1}{2} < x < 1\n\\end{cases}"
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
                marginRight: "0.10764em"
              },
              children: "f"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "x"
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
                height: "3em",
                verticalAlign: "-1.25em"
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
                  children: "{"
                })
              }), createVNode(_components.span, {
                class: "mord",
                children: createVNode(_components.span, {
                  class: "mtable",
                  children: [createVNode(_components.span, {
                    class: "col-align-l",
                    children: createVNode(_components.span, {
                      class: "vlist-t vlist-t2",
                      children: [createVNode(_components.span, {
                        class: "vlist-r",
                        children: [createVNode(_components.span, {
                          class: "vlist",
                          style: {
                            height: "1.69em"
                          },
                          children: [createVNode(_components.span, {
                            style: {
                              top: "-3.69em"
                            },
                            children: [createVNode(_components.span, {
                              class: "pstrut",
                              style: {
                                height: "3.008em"
                              }
                            }), createVNode(_components.span, {
                              class: "mord",
                              children: [createVNode(_components.span, {
                                class: "mord mathnormal",
                                children: "x"
                              }), createVNode(_components.span, {
                                class: "mpunct",
                                children: ","
                              })]
                            })]
                          }), createVNode(_components.span, {
                            style: {
                              top: "-2.25em"
                            },
                            children: [createVNode(_components.span, {
                              class: "pstrut",
                              style: {
                                height: "3.008em"
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
                                class: "mord mathnormal",
                                children: "x"
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
                            height: "1.19em"
                          },
                          children: createVNode(_components.span, {})
                        })
                      })]
                    })
                  }), createVNode(_components.span, {
                    class: "arraycolsep",
                    style: {
                      width: "1em"
                    }
                  }), createVNode(_components.span, {
                    class: "col-align-l",
                    children: createVNode(_components.span, {
                      class: "vlist-t vlist-t2",
                      children: [createVNode(_components.span, {
                        class: "vlist-r",
                        children: [createVNode(_components.span, {
                          class: "vlist",
                          style: {
                            height: "1.69em"
                          },
                          children: [createVNode(_components.span, {
                            style: {
                              top: "-3.69em"
                            },
                            children: [createVNode(_components.span, {
                              class: "pstrut",
                              style: {
                                height: "3.008em"
                              }
                            }), createVNode(_components.span, {
                              class: "mord",
                              children: [createVNode(_components.span, {
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
                                children: "<"
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
                                                children: "2"
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
                            })]
                          }), createVNode(_components.span, {
                            style: {
                              top: "-2.25em"
                            },
                            children: [createVNode(_components.span, {
                              class: "pstrut",
                              style: {
                                height: "3.008em"
                              }
                            }), createVNode(_components.span, {
                              class: "mord",
                              children: [createVNode(_components.span, {
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
                                                children: "2"
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
                                children: "<"
                              }), createVNode(_components.span, {
                                class: "mspace",
                                style: {
                                  marginRight: "0.2778em"
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
                            height: "1.19em"
                          },
                          children: createVNode(_components.span, {})
                        })
                      })]
                    })
                  })]
                })
              }), createVNode(_components.span, {
                class: "mclose nulldelimiter"
              })]
            })]
          })]
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: ["periodically extended to ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  mathvariant: "double-struck",
                  children: "R"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "{\\mathbb R}"
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
                height: "0.6889em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: createVNode(_components.span, {
                class: "mord mathbb",
                children: "R"
              })
            })]
          })
        })]
      }), ". Let ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "f"
                  }), createVNode(_components.mi, {
                    children: "n"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "x"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mfrac, {
                  children: [createVNode(_components.mn, {
                    children: "1"
                  }), createVNode(_components.mi, {
                    children: "n"
                  })]
                }), createVNode(_components.mi, {
                  children: "f"
                }), createVNode(_components.mrow, {
                  children: [createVNode(_components.mo, {
                    fence: "true",
                    children: "("
                  }), createVNode(_components.mi, {
                    children: "n"
                  }), createVNode(_components.mi, {
                    children: "x"
                  }), createVNode(_components.mo, {
                    fence: "true",
                    children: ")"
                  })]
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "f_n(x) = \\frac{1}{n} f\\left(n x\\right)"
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
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.10764em"
                },
                children: "f"
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
                          marginLeft: "-0.1076em",
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
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "x"
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
                              class: "mord mathnormal mtight",
                              children: "n"
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
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.10764em"
              },
              children: "f"
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
                children: "("
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                children: "n"
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                children: "x"
              }), createVNode(_components.span, {
                class: "mclose delimcenter",
                style: {
                  top: "0em"
                },
                children: ")"
              })]
            })]
          })]
        })]
      }), ". This sawtooth function, with increasingly many teeth of decreasing height satisfying ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    mathvariant: "normal",
                    children: "∂"
                  }), createVNode(_components.mi, {
                    children: "x"
                  })]
                }), createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "f"
                  }), createVNode(_components.mi, {
                    children: "n"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "x"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "∈"
                }), createVNode(_components.mrow, {
                  children: [createVNode(_components.mo, {
                    fence: "true",
                    children: "{"
                  }), createVNode(_components.mo, {
                    children: "−"
                  }), createVNode(_components.mn, {
                    children: "1"
                  }), createVNode(_components.mo, {
                    separator: "true",
                    children: ","
                  }), createVNode(_components.mn, {
                    children: "1"
                  }), createVNode(_components.mo, {
                    fence: "true",
                    children: "}"
                  })]
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\partial_{x} f_n(x) \\in \\left\\{-1, 1\\right\\}"
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
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord",
                style: {
                  marginRight: "0.05556em"
                },
                children: "∂"
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
                          marginLeft: "-0.0556em",
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
                              children: "x"
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
                        height: "0.15em"
                      },
                      children: createVNode(_components.span, {})
                    })
                  })]
                })
              })]
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.10764em"
                },
                children: "f"
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
                          marginLeft: "-0.1076em",
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
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "x"
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
              class: "minner",
              children: [createVNode(_components.span, {
                class: "mopen delimcenter",
                style: {
                  top: "0em"
                },
                children: "{"
              }), createVNode(_components.span, {
                class: "mord",
                children: "−"
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
                children: "1"
              }), createVNode(_components.span, {
                class: "mclose delimcenter",
                style: {
                  top: "0em"
                },
                children: "}"
              })]
            })]
          })]
        })]
      }), " and point-wise ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "f"
                  }), createVNode(_components.mi, {
                    children: "n"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "x"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "→"
                }), createVNode(_components.mn, {
                  children: "0"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "f_n(x) \\to 0"
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
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.10764em"
                },
                children: "f"
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
                          marginLeft: "-0.1076em",
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
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "x"
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
              children: "0"
            })]
          })]
        })]
      }), " for all ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "x"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "x"
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
              children: "x"
            })]
          })
        })]
      }), ". However, clearly ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mi, {
                  children: "u"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "x"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "≡"
                }), createVNode(_components.mn, {
                  children: "0"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "u(x) \\equiv 0"
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
              children: "u"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "x"
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
              children: "≡"
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
      }), " is not a minimizer."]
    }), "\n", createVNode(_components.p, {
      children: ["This fine-scale, oscillatory behavior is a direct consequence of the nonconvexity of the energy. The two “low energy states”: ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.msup, {
                  children: [createVNode(_components.mi, {
                    children: "u"
                  }), createVNode(_components.mo, {
                    mathvariant: "normal",
                    lspace: "0em",
                    rspace: "0em",
                    children: "′"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "x"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mn, {
                  children: "1"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "u'(x)=1"
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
                height: "1.0019em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                children: "u"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t",
                  children: createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.7519em"
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
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "x"
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
                height: "0.6444em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: "1"
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
                children: [createVNode(_components.msup, {
                  children: [createVNode(_components.mi, {
                    children: "u"
                  }), createVNode(_components.mo, {
                    mathvariant: "normal",
                    lspace: "0em",
                    rspace: "0em",
                    children: "′"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mi, {
                  children: "x"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mo, {
                  children: "−"
                }), createVNode(_components.mn, {
                  children: "1"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "u'(x)=-1"
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
                height: "1.0019em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                children: "u"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t",
                  children: createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.7519em"
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
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              children: "x"
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
              children: "−"
            }), createVNode(_components.span, {
              class: "mord",
              children: "1"
            })]
          })]
        })]
      }), " allow for mixing of the two states and lowering the overall energy as a result. Not only is this mathematically interesting, but physically nonconvex problems are important. My first experience with these ideas, and ultimately what hooked me, were examples from thermodynamics."]
    }), "\n", createVNode(_components.h3, {
      id: "example-phase-mixtures",
      children: "Example (Phase mixtures)"
    }), "\n", createVNode(_components.p, {
      children: "Consider the free energy of two different material phases, as a function of mole fraction:"
    }), "\n", createVNode("figure", {
      children: [createVNode($$Image, {
        src: thermoImage,
        alt: "Schematic of the Gibbs energy for two different phases as a function of mole-fraction."
      }), createVNode("figcaption", {
        children: createVNode(_components.p, {
          children: "Schematic of the Gibbs energy for two different phases as a function of\nmole-fraction."
        })
      })]
    }), "\n", createVNode(_components.p, {
      children: "Suppose you have constrained the mole-fraction to be 0.5. Then a pure phase, in either case, will have higher energy than the mixing of two phases (with fractions given by the common tangent line). Mixing to lower the energy can be seen as a “regularization” process in which the observed energy is the convexification of the two energies."
    }), "\n", createVNode(_components.p, {
      children: "In the absence of surface energy, oscillations would equally well be a minimizer of the Gibbs energy for a mixture, provided that the overall mole-fraction constraint is satisfied."
    }), "\n", createVNode(_components.h3, {
      id: "example-phase-mixtures-distributions",
      children: "Example (Phase mixtures, distributions)"
    }), "\n", createVNode(_components.p, {
      children: "Consider the free energy of two different material phases, as a function of mole fraction:"
    }), "\n", createVNode("figure", {
      children: [createVNode($$Image, {
        src: phasesImage,
        alt: "Three equivalent distributions of phase in the lack of surface energy case."
      }), createVNode("figcaption", {
        children: createVNode(_components.p, {
          children: "Three equivalent distributions of phase in the lack of surface energy case."
        })
      })]
    }), "\n", createVNode(_components.p, {
      children: "Nonconvex energies exist and oscillations inevitably occur. Young measures represent a concise tool for organizing the information about the oscillatory behavior of minimizing sequences."
    }), "\n", createVNode(_components.h2, {
      id: "relaxation",
      children: "Relaxation"
    }), "\n", createVNode(_components.p, {
      children: ["Suppose that we’re faced with an optimization problem for which the direct method, or any other method we have tried, which guarantees the existence of a minimizer fails. One thing we can do is ", createVNode(_components.em, {
        children: "relax"
      }), " the problem, ", createVNode(_components.em, {
        children: "i.e."
      }), ", consider an alternative problem for which existence can be shown. However, if this alternative, relaxed problem is too different from the true problem, the solution to the relaxed problem will not tell us anything about our original problem."]
    }), "\n", createVNode(_components.p, {
      children: "I like to think of the process of relaxation as two distinct steps:"
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: ["Enlarge the admissable set, ", createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: [createVNode(_components.mi, {
                    mathvariant: "script",
                    children: "A"
                  }), createVNode(_components.mo, {
                    children: "⊂"
                  }), createVNode(_components.mover, {
                    accent: "true",
                    children: [createVNode(_components.mi, {
                      mathvariant: "script",
                      children: "A"
                    }), createVNode(_components.mo, {
                      children: "~"
                    })]
                  })]
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "{\\mathcal A} \\subset \\tilde{{\\mathcal A}}"
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
                  height: "0.7224em",
                  verticalAlign: "-0.0391em"
                }
              }), createVNode(_components.span, {
                class: "mord",
                children: createVNode(_components.span, {
                  class: "mord mathcal",
                  children: "A"
                })
              }), createVNode(_components.span, {
                class: "mspace",
                style: {
                  marginRight: "0.2778em"
                }
              }), createVNode(_components.span, {
                class: "mrel",
                children: "⊂"
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
                  height: "0.9202em"
                }
              }), createVNode(_components.span, {
                class: "mord accent",
                children: createVNode(_components.span, {
                  class: "vlist-t",
                  children: createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.9202em"
                      },
                      children: [createVNode(_components.span, {
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
                          children: createVNode(_components.span, {
                            class: "mord mathcal",
                            children: "A"
                          })
                        })]
                      }), createVNode(_components.span, {
                        style: {
                          top: "-3.6023em"
                        },
                        children: [createVNode(_components.span, {
                          class: "pstrut",
                          style: {
                            height: "3em"
                          }
                        }), createVNode(_components.span, {
                          class: "accent-body",
                          style: {
                            left: "-0.1111em"
                          },
                          children: createVNode(_components.span, {
                            class: "mord",
                            children: "~"
                          })
                        })]
                      })]
                    })
                  })
                })
              })]
            })]
          })]
        })]
      }), "\n", createVNode(_components.li, {
        children: ["Reformulate the energy ", createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: [createVNode(_components.msub, {
                    children: [createVNode(_components.mi, {
                      children: "I"
                    }), createVNode(_components.mn, {
                      children: "0"
                    })]
                  }), createVNode(_components.mo, {
                    children: "→"
                  }), createVNode(_components.mover, {
                    accent: "true",
                    children: [createVNode(_components.msub, {
                      children: [createVNode(_components.mi, {
                        children: "I"
                      }), createVNode(_components.mn, {
                        children: "0"
                      })]
                    }), createVNode(_components.mo, {
                      children: "~"
                    })]
                  })]
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "I_0 \\to \\tilde{I_0}"
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
                  height: "0.8333em",
                  verticalAlign: "-0.15em"
                }
              }), createVNode(_components.span, {
                class: "mord",
                children: [createVNode(_components.span, {
                  class: "mord mathnormal",
                  style: {
                    marginRight: "0.07847em"
                  },
                  children: "I"
                }), createVNode(_components.span, {
                  class: "msupsub",
                  children: createVNode(_components.span, {
                    class: "vlist-t vlist-t2",
                    children: [createVNode(_components.span, {
                      class: "vlist-r",
                      children: [createVNode(_components.span, {
                        class: "vlist",
                        style: {
                          height: "0.3011em"
                        },
                        children: createVNode(_components.span, {
                          style: {
                            top: "-2.55em",
                            marginLeft: "-0.0785em",
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
                              children: "0"
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
                  height: "1.0702em",
                  verticalAlign: "-0.15em"
                }
              }), createVNode(_components.span, {
                class: "mord accent",
                children: createVNode(_components.span, {
                  class: "vlist-t vlist-t2",
                  children: [createVNode(_components.span, {
                    class: "vlist-r",
                    children: [createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.9202em"
                      },
                      children: [createVNode(_components.span, {
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
                          children: [createVNode(_components.span, {
                            class: "mord mathnormal",
                            style: {
                              marginRight: "0.07847em"
                            },
                            children: "I"
                          }), createVNode(_components.span, {
                            class: "msupsub",
                            children: createVNode(_components.span, {
                              class: "vlist-t vlist-t2",
                              children: [createVNode(_components.span, {
                                class: "vlist-r",
                                children: [createVNode(_components.span, {
                                  class: "vlist",
                                  style: {
                                    height: "0.3011em"
                                  },
                                  children: createVNode(_components.span, {
                                    style: {
                                      top: "-2.55em",
                                      marginLeft: "-0.0785em",
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
                                        children: "0"
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
                        })]
                      }), createVNode(_components.span, {
                        style: {
                          top: "-3.6023em"
                        },
                        children: [createVNode(_components.span, {
                          class: "pstrut",
                          style: {
                            height: "3em"
                          }
                        }), createVNode(_components.span, {
                          class: "accent-body",
                          style: {
                            left: "-0.25em"
                          },
                          children: createVNode(_components.span, {
                            class: "mord",
                            children: "~"
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
                        height: "0.15em"
                      },
                      children: createVNode(_components.span, {})
                    })
                  })]
                })
              })]
            })]
          })]
        })]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["We can enlarge the admissable set, but not by too much! To this end, it’s often appropriate to ensure that ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  mathvariant: "script",
                  children: "A"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "{\\mathcal A}"
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
                height: "0.6833em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: createVNode(_components.span, {
                class: "mord mathcal",
                children: "A"
              })
            })]
          })
        })]
      }), " is dense in ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mover, {
                  accent: "true",
                  children: [createVNode(_components.mi, {
                    mathvariant: "script",
                    children: "A"
                  }), createVNode(_components.mo, {
                    children: "~"
                  })]
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\tilde{{\\mathcal A}}"
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
                height: "0.9202em"
              }
            }), createVNode(_components.span, {
              class: "mord accent",
              children: createVNode(_components.span, {
                class: "vlist-t",
                children: createVNode(_components.span, {
                  class: "vlist-r",
                  children: createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.9202em"
                    },
                    children: [createVNode(_components.span, {
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
                        children: createVNode(_components.span, {
                          class: "mord mathcal",
                          children: "A"
                        })
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-3.6023em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "accent-body",
                        style: {
                          left: "-0.1111em"
                        },
                        children: createVNode(_components.span, {
                          class: "mord",
                          children: "~"
                        })
                      })]
                    })]
                  })
                })
              })
            })]
          })
        })]
      }), ". Similarly if we adjust the energy too much, then certainly solutions may exist, but the new problem may not provide us with any insight into our true goal, ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "I"
                  }), createVNode(_components.mn, {
                    children: "0"
                  })]
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "I_0"
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
                height: "0.8333em",
                verticalAlign: "-0.15em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.07847em"
                },
                children: "I"
              }), createVNode(_components.span, {
                class: "msupsub",
                children: createVNode(_components.span, {
                  class: "vlist-t vlist-t2",
                  children: [createVNode(_components.span, {
                    class: "vlist-r",
                    children: [createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.3011em"
                      },
                      children: createVNode(_components.span, {
                        style: {
                          top: "-2.55em",
                          marginLeft: "-0.0785em",
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
                            children: "0"
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
            })]
          })
        })]
      }), ". The new energy must be less than the original, but not substantially so. All of this is very vague; I apologize."]
    }), "\n", createVNode(_components.p, {
      children: ["Pedregal describes an general approach to relaxation ", createVNode(_components.sup, {
        children: createVNode(_components.a, {
          href: "#user-content-fn-pedregalopt",
          id: "user-content-fnref-pedregalopt",
          "data-footnote-ref": "",
          "aria-describedby": "footnote-label",
          children: "4"
        })
      }), " which should be familiar to most readers."]
    }), "\n", createVNode(_components.p, {
      children: ["Choose a collection of functionals, ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mo, {
                  stretchy: "false",
                  children: "{"
                }), createVNode(_components.mi, {
                  children: "I"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "}"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\{ I \\}"
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
              class: "mopen",
              children: "{"
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.07847em"
              },
              children: "I"
            }), createVNode(_components.span, {
              class: "mclose",
              children: "}"
            })]
          })
        })]
      }), "."]
    }), "\n", createVNode(_components.ol, {
      children: ["\n", createVNode(_components.li, {
        children: "Enlarge the space of admissable objects by completion with respect to this set of functionals."
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["By this, I mean consider sequences ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mo, {
                  stretchy: "false",
                  children: "{"
                }), createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "u"
                  }), createVNode(_components.mi, {
                    children: "i"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "}"
                }), createVNode(_components.mo, {
                  separator: "true",
                  children: ","
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "{"
                }), createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "v"
                  }), createVNode(_components.mi, {
                    children: "i"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "}"
                }), createVNode(_components.mo, {
                  children: "∈"
                }), createVNode(_components.mi, {
                  mathvariant: "script",
                  children: "A"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\{u_i\\}, \\{v_i\\} \\in {\\mathcal A}"
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
              class: "mopen",
              children: "{"
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                children: "u"
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
              class: "mclose",
              children: "}"
            }), createVNode(_components.span, {
              class: "mpunct",
              children: ","
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mopen",
              children: "{"
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.03588em"
                },
                children: "v"
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
                          marginLeft: "-0.0359em",
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
              class: "mclose",
              children: "}"
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
                height: "0.6833em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: createVNode(_components.span, {
                class: "mord mathcal",
                children: "A"
              })
            })]
          })]
        })]
      }), ". These two sequences are equivalent if and only if ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mi, {
                  children: "lim"
                }), createVNode(_components.mo, {
                  children: "⁡"
                }), createVNode(_components.mi, {
                  children: "I"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "u"
                  }), createVNode(_components.mi, {
                    children: "i"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mi, {
                  children: "lim"
                }), createVNode(_components.mo, {
                  children: "⁡"
                }), createVNode(_components.mi, {
                  children: "I"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "v"
                  }), createVNode(_components.mi, {
                    children: "i"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\lim I(u_i) = \\lim I(v_i)"
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
              children: "lim"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.07847em"
              },
              children: "I"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                children: "u"
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
                height: "1em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mop",
              children: "lim"
            }), createVNode(_components.span, {
              class: "mspace",
              style: {
                marginRight: "0.1667em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.07847em"
              },
              children: "I"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.03588em"
                },
                children: "v"
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
                          marginLeft: "-0.0359em",
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
              class: "mclose",
              children: ")"
            })]
          })]
        })]
      }), " for all ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  children: "I"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "I"
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
                height: "0.6833em"
              }
            }), createVNode(_components.span, {
              class: "mord mathnormal",
              style: {
                marginRight: "0.07847em"
              },
              children: "I"
            })]
          })
        })]
      }), ". This is much like completing the rational numbers and arriving at ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mi, {
                  mathvariant: "double-struck",
                  children: "R"
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "{\\mathbb R}"
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
                height: "0.6889em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: createVNode(_components.span, {
                class: "mord mathbb",
                children: "R"
              })
            })]
          })
        })]
      }), " or completing a metric space via Cauchy sequences."]
    }), "\n", createVNode(_components.ol, {
      start: "2",
      children: ["\n", createVNode(_components.li, {
        children: ["Extend each of the functions ", createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: createVNode(_components.mi, {
                    children: "I"
                  })
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "I"
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
                  height: "0.6833em"
                }
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.07847em"
                },
                children: "I"
              })]
            })
          })]
        }), " to ", createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: createVNode(_components.mover, {
                    accent: "true",
                    children: [createVNode(_components.mi, {
                      children: "I"
                    }), createVNode(_components.mo, {
                      children: "~"
                    })]
                  })
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "\\tilde I"
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
                  height: "0.9202em"
                }
              }), createVNode(_components.span, {
                class: "mord accent",
                children: createVNode(_components.span, {
                  class: "vlist-t",
                  children: createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.9202em"
                      },
                      children: [createVNode(_components.span, {
                        style: {
                          top: "-3em"
                        },
                        children: [createVNode(_components.span, {
                          class: "pstrut",
                          style: {
                            height: "3em"
                          }
                        }), createVNode(_components.span, {
                          class: "mord mathnormal",
                          style: {
                            marginRight: "0.07847em"
                          },
                          children: "I"
                        })]
                      }), createVNode(_components.span, {
                        style: {
                          top: "-3.6023em"
                        },
                        children: [createVNode(_components.span, {
                          class: "pstrut",
                          style: {
                            height: "3em"
                          }
                        }), createVNode(_components.span, {
                          class: "accent-body",
                          style: {
                            left: "-0.1389em"
                          },
                          children: createVNode(_components.span, {
                            class: "mord",
                            children: "~"
                          })
                        })]
                      })]
                    })
                  })
                })
              })]
            })
          })]
        }), " by continuity"]
      }), "\n"]
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
                children: [createVNode(_components.mover, {
                  accent: "true",
                  children: [createVNode(_components.mi, {
                    children: "I"
                  }), createVNode(_components.mo, {
                    children: "~"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mover, {
                  accent: "true",
                  children: [createVNode(_components.mi, {
                    children: "u"
                  }), createVNode(_components.mo, {
                    children: "~"
                  })]
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
                      children: "i"
                    }), createVNode(_components.mo, {
                      children: "→"
                    }), createVNode(_components.mi, {
                      mathvariant: "normal",
                      children: "∞"
                    })]
                  })]
                }), createVNode(_components.mi, {
                  children: "I"
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "u"
                  }), createVNode(_components.mi, {
                    children: "i"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\tilde{I}(\\tilde u) = \\lim_{i \\to \\infty} I(u_i)"
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
                height: "1.1702em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mord accent",
              children: createVNode(_components.span, {
                class: "vlist-t",
                children: createVNode(_components.span, {
                  class: "vlist-r",
                  children: createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.9202em"
                    },
                    children: [createVNode(_components.span, {
                      style: {
                        top: "-3em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "mord mathnormal",
                        style: {
                          marginRight: "0.07847em"
                        },
                        children: "I"
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-3.6023em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "accent-body",
                        style: {
                          left: "-0.1389em"
                        },
                        children: createVNode(_components.span, {
                          class: "mord",
                          children: "~"
                        })
                      })]
                    })]
                  })
                })
              })
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord accent",
              children: createVNode(_components.span, {
                class: "vlist-t",
                children: createVNode(_components.span, {
                  class: "vlist-r",
                  children: createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.6679em"
                    },
                    children: [createVNode(_components.span, {
                      style: {
                        top: "-3em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "mord mathnormal",
                        children: "u"
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-3.35em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "accent-body",
                        style: {
                          left: "-0.2222em"
                        },
                        children: createVNode(_components.span, {
                          class: "mord",
                          children: "~"
                        })
                      })]
                    })]
                  })
                })
              })
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
                height: "1.4777em",
                verticalAlign: "-0.7277em"
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
                        top: "-2.3723em",
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
                            children: "i"
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
                      height: "0.7277em"
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
              style: {
                marginRight: "0.07847em"
              },
              children: "I"
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                children: "u"
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
              class: "mclose",
              children: ")"
            })]
          })]
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: ["where ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: [createVNode(_components.mo, {
                  stretchy: "false",
                  children: "{"
                }), createVNode(_components.msub, {
                  children: [createVNode(_components.mi, {
                    children: "u"
                  }), createVNode(_components.mi, {
                    children: "i"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "}"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\{u_i\\}"
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
              class: "mopen",
              children: "{"
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord mathnormal",
                children: "u"
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
              class: "mclose",
              children: "}"
            })]
          })
        })]
      }), " is any representative of ", createVNode(_components.span, {
        class: "katex",
        children: [createVNode(_components.span, {
          class: "katex-mathml",
          children: createVNode(_components.math, {
            xmlns: "http://www.w3.org/1998/Math/MathML",
            children: createVNode(_components.semantics, {
              children: [createVNode(_components.mrow, {
                children: createVNode(_components.mover, {
                  accent: "true",
                  children: [createVNode(_components.mi, {
                    children: "u"
                  }), createVNode(_components.mo, {
                    children: "~"
                  })]
                })
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\tilde{u}"
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
                height: "0.6679em"
              }
            }), createVNode(_components.span, {
              class: "mord accent",
              children: createVNode(_components.span, {
                class: "vlist-t",
                children: createVNode(_components.span, {
                  class: "vlist-r",
                  children: createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.6679em"
                    },
                    children: [createVNode(_components.span, {
                      style: {
                        top: "-3em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "mord mathnormal",
                        children: "u"
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-3.35em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "accent-body",
                        style: {
                          left: "-0.2222em"
                        },
                        children: createVNode(_components.span, {
                          class: "mord",
                          children: "~"
                        })
                      })]
                    })]
                  })
                })
              })
            })]
          })
        })]
      }), "."]
    }), "\n", createVNode(_components.ol, {
      start: "3",
      children: ["\n", createVNode(_components.li, {
        children: ["Define the topology on ", createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: createVNode(_components.mover, {
                    accent: "true",
                    children: [createVNode(_components.mi, {
                      mathvariant: "script",
                      children: "A"
                    }), createVNode(_components.mo, {
                      children: "~"
                    })]
                  })
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "\\tilde{\\mathcal A}"
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
                  height: "0.9202em"
                }
              }), createVNode(_components.span, {
                class: "mord accent",
                children: createVNode(_components.span, {
                  class: "vlist-t",
                  children: createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.9202em"
                      },
                      children: [createVNode(_components.span, {
                        style: {
                          top: "-3em"
                        },
                        children: [createVNode(_components.span, {
                          class: "pstrut",
                          style: {
                            height: "3em"
                          }
                        }), createVNode(_components.span, {
                          class: "mord mathcal",
                          children: "A"
                        })]
                      }), createVNode(_components.span, {
                        style: {
                          top: "-3.6023em"
                        },
                        children: [createVNode(_components.span, {
                          class: "pstrut",
                          style: {
                            height: "3em"
                          }
                        }), createVNode(_components.span, {
                          class: "accent-body",
                          style: {
                            left: "-0.1111em"
                          },
                          children: createVNode(_components.span, {
                            class: "mord",
                            children: "~"
                          })
                        })]
                      })]
                    })
                  })
                })
              })]
            })
          })]
        }), " as the weak-topology relative to the collection ", createVNode(_components.span, {
          class: "katex",
          children: [createVNode(_components.span, {
            class: "katex-mathml",
            children: createVNode(_components.math, {
              xmlns: "http://www.w3.org/1998/Math/MathML",
              children: createVNode(_components.semantics, {
                children: [createVNode(_components.mrow, {
                  children: [createVNode(_components.mo, {
                    stretchy: "false",
                    children: "{"
                  }), createVNode(_components.mi, {
                    children: "I"
                  }), createVNode(_components.mo, {
                    stretchy: "false",
                    children: "}"
                  })]
                }), createVNode(_components.annotation, {
                  encoding: "application/x-tex",
                  children: "\\{I\\}"
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
                class: "mopen",
                children: "{"
              }), createVNode(_components.span, {
                class: "mord mathnormal",
                style: {
                  marginRight: "0.07847em"
                },
                children: "I"
              }), createVNode(_components.span, {
                class: "mclose",
                children: "}"
              })]
            })
          })]
        }), ":"]
      }), "\n"]
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
                children: [createVNode(_components.msub, {
                  children: [createVNode(_components.mover, {
                    accent: "true",
                    children: [createVNode(_components.mi, {
                      children: "u"
                    }), createVNode(_components.mo, {
                      children: "~"
                    })]
                  }), createVNode(_components.mi, {
                    children: "j"
                  })]
                }), createVNode(_components.mo, {
                  children: "→"
                }), createVNode(_components.mover, {
                  accent: "true",
                  children: [createVNode(_components.mi, {
                    children: "u"
                  }), createVNode(_components.mo, {
                    children: "~"
                  })]
                }), createVNode(_components.mtext, {
                  children: "  "
                }), createVNode(_components.mo, {
                  children: "⟺"
                }), createVNode(_components.mtext, {
                  children: "  "
                }), createVNode(_components.munder, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "lim"
                    }), createVNode(_components.mo, {
                      children: "⁡"
                    })]
                  }), createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "i"
                    }), createVNode(_components.mo, {
                      children: "→"
                    }), createVNode(_components.mi, {
                      mathvariant: "normal",
                      children: "∞"
                    })]
                  })]
                }), createVNode(_components.mover, {
                  accent: "true",
                  children: [createVNode(_components.mi, {
                    children: "I"
                  }), createVNode(_components.mo, {
                    children: "~"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mover, {
                  accent: "true",
                  children: [createVNode(_components.msub, {
                    children: [createVNode(_components.mi, {
                      children: "u"
                    }), createVNode(_components.mi, {
                      children: "i"
                    })]
                  }), createVNode(_components.mo, {
                    children: "~"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.mover, {
                  accent: "true",
                  children: [createVNode(_components.mi, {
                    children: "I"
                  }), createVNode(_components.mo, {
                    children: "~"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mover, {
                  accent: "true",
                  children: [createVNode(_components.mi, {
                    children: "u"
                  }), createVNode(_components.mo, {
                    children: "~"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\tilde{u}_j \\to \\tilde{u} \\iff \\lim_{i\\to\\infty} \\tilde{I}(\\tilde{u_i}) = \\tilde{I}(\\tilde{u})"
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
                height: "0.954em",
                verticalAlign: "-0.2861em"
              }
            }), createVNode(_components.span, {
              class: "mord",
              children: [createVNode(_components.span, {
                class: "mord accent",
                children: createVNode(_components.span, {
                  class: "vlist-t",
                  children: createVNode(_components.span, {
                    class: "vlist-r",
                    children: createVNode(_components.span, {
                      class: "vlist",
                      style: {
                        height: "0.6679em"
                      },
                      children: [createVNode(_components.span, {
                        style: {
                          top: "-3em"
                        },
                        children: [createVNode(_components.span, {
                          class: "pstrut",
                          style: {
                            height: "3em"
                          }
                        }), createVNode(_components.span, {
                          class: "mord mathnormal",
                          children: "u"
                        })]
                      }), createVNode(_components.span, {
                        style: {
                          top: "-3.35em"
                        },
                        children: [createVNode(_components.span, {
                          class: "pstrut",
                          style: {
                            height: "3em"
                          }
                        }), createVNode(_components.span, {
                          class: "accent-body",
                          style: {
                            left: "-0.2222em"
                          },
                          children: createVNode(_components.span, {
                            class: "mord",
                            children: "~"
                          })
                        })]
                      })]
                    })
                  })
                })
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
                            style: {
                              marginRight: "0.05724em"
                            },
                            children: "j"
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
                        height: "0.2861em"
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
                height: "0.6919em",
                verticalAlign: "-0.024em"
              }
            }), createVNode(_components.span, {
              class: "mord accent",
              children: createVNode(_components.span, {
                class: "vlist-t",
                children: createVNode(_components.span, {
                  class: "vlist-r",
                  children: createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.6679em"
                    },
                    children: [createVNode(_components.span, {
                      style: {
                        top: "-3em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "mord mathnormal",
                        children: "u"
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-3.35em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "accent-body",
                        style: {
                          left: "-0.2222em"
                        },
                        children: createVNode(_components.span, {
                          class: "mord",
                          children: "~"
                        })
                      })]
                    })]
                  })
                })
              })
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
              children: "⟺"
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
            })]
          }), createVNode(_components.span, {
            class: "base",
            children: [createVNode(_components.span, {
              class: "strut",
              style: {
                height: "1.6479em",
                verticalAlign: "-0.7277em"
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
                        top: "-2.3723em",
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
                            children: "i"
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
                      height: "0.7277em"
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
              class: "mord accent",
              children: createVNode(_components.span, {
                class: "vlist-t",
                children: createVNode(_components.span, {
                  class: "vlist-r",
                  children: createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.9202em"
                    },
                    children: [createVNode(_components.span, {
                      style: {
                        top: "-3em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "mord mathnormal",
                        style: {
                          marginRight: "0.07847em"
                        },
                        children: "I"
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-3.6023em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "accent-body",
                        style: {
                          left: "-0.1389em"
                        },
                        children: createVNode(_components.span, {
                          class: "mord",
                          children: "~"
                        })
                      })]
                    })]
                  })
                })
              })
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord accent",
              children: createVNode(_components.span, {
                class: "vlist-t vlist-t2",
                children: [createVNode(_components.span, {
                  class: "vlist-r",
                  children: [createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.6679em"
                    },
                    children: [createVNode(_components.span, {
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
                        children: [createVNode(_components.span, {
                          class: "mord mathnormal",
                          children: "u"
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
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-3.35em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "accent-body",
                        style: {
                          left: "-0.25em"
                        },
                        children: createVNode(_components.span, {
                          class: "mord",
                          children: "~"
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
                      height: "0.15em"
                    },
                    children: createVNode(_components.span, {})
                  })
                })]
              })
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
                height: "1.1702em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mord accent",
              children: createVNode(_components.span, {
                class: "vlist-t",
                children: createVNode(_components.span, {
                  class: "vlist-r",
                  children: createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.9202em"
                    },
                    children: [createVNode(_components.span, {
                      style: {
                        top: "-3em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "mord mathnormal",
                        style: {
                          marginRight: "0.07847em"
                        },
                        children: "I"
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-3.6023em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "accent-body",
                        style: {
                          left: "-0.1389em"
                        },
                        children: createVNode(_components.span, {
                          class: "mord",
                          children: "~"
                        })
                      })]
                    })]
                  })
                })
              })
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord accent",
              children: createVNode(_components.span, {
                class: "vlist-t",
                children: createVNode(_components.span, {
                  class: "vlist-r",
                  children: createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.6679em"
                    },
                    children: [createVNode(_components.span, {
                      style: {
                        top: "-3em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "mord mathnormal",
                        children: "u"
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-3.35em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "accent-body",
                        style: {
                          left: "-0.2222em"
                        },
                        children: createVNode(_components.span, {
                          class: "mord",
                          children: "~"
                        })
                      })]
                    })]
                  })
                })
              })
            }), createVNode(_components.span, {
              class: "mclose",
              children: ")"
            })]
          })]
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: "Within this framework, we can define the relaxed problem:"
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
                children: [createVNode(_components.mtext, {
                  children: "Find "
                }), createVNode(_components.mover, {
                  accent: "true",
                  children: [createVNode(_components.mi, {
                    children: "u"
                  }), createVNode(_components.mo, {
                    children: "~"
                  })]
                }), createVNode(_components.mo, {
                  children: "∈"
                }), createVNode(_components.mover, {
                  accent: "true",
                  children: [createVNode(_components.mi, {
                    mathvariant: "script",
                    children: "A"
                  }), createVNode(_components.mo, {
                    children: "~"
                  })]
                }), createVNode(_components.mtext, {
                  children: " such that "
                }), createVNode(_components.mover, {
                  accent: "true",
                  children: [createVNode(_components.msub, {
                    children: [createVNode(_components.mi, {
                      children: "I"
                    }), createVNode(_components.mn, {
                      children: "0"
                    })]
                  }), createVNode(_components.mo, {
                    children: "~"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: "("
                }), createVNode(_components.mover, {
                  accent: "true",
                  children: [createVNode(_components.mi, {
                    children: "u"
                  }), createVNode(_components.mo, {
                    children: "~"
                  })]
                }), createVNode(_components.mo, {
                  stretchy: "false",
                  children: ")"
                }), createVNode(_components.mo, {
                  children: "="
                }), createVNode(_components.munder, {
                  children: [createVNode(_components.mrow, {
                    children: [createVNode(_components.mi, {
                      children: "inf"
                    }), createVNode(_components.mo, {
                      children: "⁡"
                    })]
                  }), createVNode(_components.mover, {
                    accent: "true",
                    children: [createVNode(_components.mi, {
                      mathvariant: "script",
                      children: "A"
                    }), createVNode(_components.mo, {
                      children: "~"
                    })]
                  })]
                }), createVNode(_components.mover, {
                  accent: "true",
                  children: [createVNode(_components.msub, {
                    children: [createVNode(_components.mi, {
                      children: "I"
                    }), createVNode(_components.mn, {
                      children: "0"
                    })]
                  }), createVNode(_components.mo, {
                    children: "~"
                  })]
                }), createVNode(_components.mi, {
                  mathvariant: "normal",
                  children: "."
                })]
              }), createVNode(_components.annotation, {
                encoding: "application/x-tex",
                children: "\\text{Find } \\tilde{u}\\in\\tilde{\\mathcal A} \\text{ such that } \\tilde{I_0}(\\tilde u) = \\inf_{\\tilde{\\mathcal A}} \\tilde{I_0}."
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
                height: "0.7335em",
                verticalAlign: "-0.0391em"
              }
            }), createVNode(_components.span, {
              class: "mord text",
              children: createVNode(_components.span, {
                class: "mord",
                children: "Find "
              })
            }), createVNode(_components.span, {
              class: "mord accent",
              children: createVNode(_components.span, {
                class: "vlist-t",
                children: createVNode(_components.span, {
                  class: "vlist-r",
                  children: createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.6679em"
                    },
                    children: [createVNode(_components.span, {
                      style: {
                        top: "-3em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "mord mathnormal",
                        children: "u"
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-3.35em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "accent-body",
                        style: {
                          left: "-0.2222em"
                        },
                        children: createVNode(_components.span, {
                          class: "mord",
                          children: "~"
                        })
                      })]
                    })]
                  })
                })
              })
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
                height: "1.1702em",
                verticalAlign: "-0.25em"
              }
            }), createVNode(_components.span, {
              class: "mord accent",
              children: createVNode(_components.span, {
                class: "vlist-t",
                children: createVNode(_components.span, {
                  class: "vlist-r",
                  children: createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.9202em"
                    },
                    children: [createVNode(_components.span, {
                      style: {
                        top: "-3em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "mord mathcal",
                        children: "A"
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-3.6023em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "accent-body",
                        style: {
                          left: "-0.1111em"
                        },
                        children: createVNode(_components.span, {
                          class: "mord",
                          children: "~"
                        })
                      })]
                    })]
                  })
                })
              })
            }), createVNode(_components.span, {
              class: "mord text",
              children: createVNode(_components.span, {
                class: "mord",
                children: " such that "
              })
            }), createVNode(_components.span, {
              class: "mord accent",
              children: createVNode(_components.span, {
                class: "vlist-t vlist-t2",
                children: [createVNode(_components.span, {
                  class: "vlist-r",
                  children: [createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.9202em"
                    },
                    children: [createVNode(_components.span, {
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
                        children: [createVNode(_components.span, {
                          class: "mord mathnormal",
                          style: {
                            marginRight: "0.07847em"
                          },
                          children: "I"
                        }), createVNode(_components.span, {
                          class: "msupsub",
                          children: createVNode(_components.span, {
                            class: "vlist-t vlist-t2",
                            children: [createVNode(_components.span, {
                              class: "vlist-r",
                              children: [createVNode(_components.span, {
                                class: "vlist",
                                style: {
                                  height: "0.3011em"
                                },
                                children: createVNode(_components.span, {
                                  style: {
                                    top: "-2.55em",
                                    marginLeft: "-0.0785em",
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
                                      children: "0"
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
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-3.6023em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "accent-body",
                        style: {
                          left: "-0.25em"
                        },
                        children: createVNode(_components.span, {
                          class: "mord",
                          children: "~"
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
                      height: "0.15em"
                    },
                    children: createVNode(_components.span, {})
                  })
                })]
              })
            }), createVNode(_components.span, {
              class: "mopen",
              children: "("
            }), createVNode(_components.span, {
              class: "mord accent",
              children: createVNode(_components.span, {
                class: "vlist-t",
                children: createVNode(_components.span, {
                  class: "vlist-r",
                  children: createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.6679em"
                    },
                    children: [createVNode(_components.span, {
                      style: {
                        top: "-3em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "mord mathnormal",
                        children: "u"
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-3.35em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "accent-body",
                        style: {
                          left: "-0.2222em"
                        },
                        children: createVNode(_components.span, {
                          class: "mord",
                          children: "~"
                        })
                      })]
                    })]
                  })
                })
              })
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
                height: "1.8303em",
                verticalAlign: "-0.9101em"
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
                        top: "-2.1899em",
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
                          children: createVNode(_components.span, {
                            class: "mord accent mtight",
                            children: createVNode(_components.span, {
                              class: "vlist-t",
                              children: createVNode(_components.span, {
                                class: "vlist-r",
                                children: createVNode(_components.span, {
                                  class: "vlist",
                                  style: {
                                    height: "0.9202em"
                                  },
                                  children: [createVNode(_components.span, {
                                    style: {
                                      top: "-2.7em"
                                    },
                                    children: [createVNode(_components.span, {
                                      class: "pstrut",
                                      style: {
                                        height: "2.7em"
                                      }
                                    }), createVNode(_components.span, {
                                      class: "mord mathcal mtight",
                                      children: "A"
                                    })]
                                  }), createVNode(_components.span, {
                                    style: {
                                      top: "-3.3023em"
                                    },
                                    children: [createVNode(_components.span, {
                                      class: "pstrut",
                                      style: {
                                        height: "2.7em"
                                      }
                                    }), createVNode(_components.span, {
                                      class: "accent-body",
                                      style: {
                                        left: "-0.1111em"
                                      },
                                      children: createVNode(_components.span, {
                                        class: "mord mtight",
                                        children: "~"
                                      })
                                    })]
                                  })]
                                })
                              })
                            })
                          })
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
                          children: ["in", createVNode(_components.span, {
                            style: {
                              marginRight: "0.07778em"
                            },
                            children: "f"
                          })]
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
                      height: "0.9101em"
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
              class: "mord accent",
              children: createVNode(_components.span, {
                class: "vlist-t vlist-t2",
                children: [createVNode(_components.span, {
                  class: "vlist-r",
                  children: [createVNode(_components.span, {
                    class: "vlist",
                    style: {
                      height: "0.9202em"
                    },
                    children: [createVNode(_components.span, {
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
                        children: [createVNode(_components.span, {
                          class: "mord mathnormal",
                          style: {
                            marginRight: "0.07847em"
                          },
                          children: "I"
                        }), createVNode(_components.span, {
                          class: "msupsub",
                          children: createVNode(_components.span, {
                            class: "vlist-t vlist-t2",
                            children: [createVNode(_components.span, {
                              class: "vlist-r",
                              children: [createVNode(_components.span, {
                                class: "vlist",
                                style: {
                                  height: "0.3011em"
                                },
                                children: createVNode(_components.span, {
                                  style: {
                                    top: "-2.55em",
                                    marginLeft: "-0.0785em",
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
                                      children: "0"
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
                      })]
                    }), createVNode(_components.span, {
                      style: {
                        top: "-3.6023em"
                      },
                      children: [createVNode(_components.span, {
                        class: "pstrut",
                        style: {
                          height: "3em"
                        }
                      }), createVNode(_components.span, {
                        class: "accent-body",
                        style: {
                          left: "-0.25em"
                        },
                        children: createVNode(_components.span, {
                          class: "mord",
                          children: "~"
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
                      height: "0.15em"
                    },
                    children: createVNode(_components.span, {})
                  })
                })]
              })
            }), createVNode(_components.span, {
              class: "mord",
              children: "."
            })]
          })]
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: ["Within this framework for relaxation we are guaranteed that we haven’t enlarged the admissable set too much. Density is free. Moreover by continuously extending our functions, the relaxed function approximates our original problem nicely. Moreover, a solution exists. We simply added it as a object, ", createVNode(_components.em, {
        children: "i.e."
      }), " a limit of a minimizing sequence."]
    }), "\n", createVNode(_components.p, {
      children: "So, if this framework always provides us with a relaxed problem that isn’t relaxed too much, and guarantees the existence of as solution, how is that all of our problems aren’t solved? Well, we need to find a perspective or representation that allows us to handle the limit objects. In many cases, for instance integral optimization, Young measures can be a useful representation. Herein lies the power to this very abstract concept and its application to real-world problems."
    }), "\n", createVNode(_components.h2, {
      id: "references",
      children: "References"
    }), "\n", createVNode(_components.section, {
      "data-footnotes": "",
      class: "footnotes",
      children: [createVNode(_components.h2, {
        class: "sr-only",
        id: "footnote-label",
        children: "Footnotes"
      }), "\n", createVNode(_components.ol, {
        children: ["\n", createVNode(_components.li, {
          id: "user-content-fn-cadlag-continuedfractions",
          children: ["\n", createVNode(_components.p, {
            children: ["Erik Davis, ", createVNode(_components.a, {
              href: "http://cadlag.org/posts/an-introduction-to-continued-fractions.html",
              children: "An introduction to continued fractions"
            }), ". ", createVNode(_components.a, {
              href: "#user-content-fnref-cadlag-continuedfractions",
              "data-footnote-backref": "",
              "aria-label": "Back to reference 1",
              class: "data-footnote-backref",
              children: "↩"
            })]
          }), "\n"]
        }), "\n", createVNode(_components.li, {
          id: "user-content-fn-darkside",
          children: ["\n", createVNode(_components.p, {
            children: ["Giuseppe Mingione, ", createVNode(_components.a, {
              href: "http://link.springer.com/article/10.1007/s10778-006-0110-3",
              children: "Regularity of minima: an invitation to the dark side of the calculus of variations"
            }), ", (2006). ", createVNode(_components.a, {
              href: "#user-content-fnref-darkside",
              "data-footnote-backref": "",
              "aria-label": "Back to reference 2",
              class: "data-footnote-backref",
              children: "↩"
            })]
          }), "\n"]
        }), "\n", createVNode(_components.li, {
          id: "user-content-fn-fonseca-modern-methods",
          children: ["\n", createVNode(_components.p, {
            children: ["Fonseca and Leoni, ", createVNode(_components.a, {
              href: "http://www.springer.com/us/book/9780387357843",
              children: "Modern methods in the calculus of variations"
            }), ", Springer (2007). ", createVNode(_components.a, {
              href: "#user-content-fnref-fonseca-modern-methods",
              "data-footnote-backref": "",
              "aria-label": "Back to reference 3",
              class: "data-footnote-backref",
              children: "↩"
            })]
          }), "\n"]
        }), "\n", createVNode(_components.li, {
          id: "user-content-fn-pedregalopt",
          children: ["\n", createVNode(_components.p, {
            children: ["Pedregal, ", createVNode(_components.a, {
              href: "http://www.ams.org/journals/bull/1999-36-01/S0273-0979-99-00774-0/",
              children: "Optimization, relaxation and Young measures"
            }), ", AMS, (1999). ", createVNode(_components.a, {
              href: "#user-content-fnref-pedregalopt",
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

const url = "src/content/blog/intro-young-measures-pt1.mdx";
const file = "/Users/toby/projects/blogupdate/src/content/blog/intro-young-measures-pt1.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/toby/projects/blogupdate/src/content/blog/intro-young-measures-pt1.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
