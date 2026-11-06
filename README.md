# Marginem

Source for [marginem.io](https://marginem.io): a static [Astro](https://astro.build/) + MDX site of essays, a commonplace book, a garden of published Obsidian notes, and a newsletter.

## Features

- Essays in MDX with KaTeX math, Prism highlighting (with line numbers), footnotes in a bottom sheet, margin notes, image figures and ECharts charts
- Code blocks marked ` ```python run ` (also JavaScript, Haskell, Common Lisp) run at build time; their output is inserted below the block
- Commonplace quotes and Garden notes published from an Obsidian vault, with a force-directed link graph and backlinks
- Archive and tag pages with client-side tag/category filtering, plus a site-wide search modal
- Per-post dithered banners, generated from each post's `heroImage`
- Light/dark theme (stored choice, else the OS preference)
- Newsletter sign-up with double opt-in via Resend, protected by Turnstile, running as Cloudflare Pages Functions

## Getting started

With Nix (recommended): `direnv allow` (or `nix develop`) for Node 22, plus the Haskell, Lisp and Python runtimes the snippet runner uses. Without Nix: Node 22+.

```bash
npm install     # also installs the git pre-commit hook (.githooks)
npm run dev     # http://localhost:4321
```

Set `RUN_CODE_SNIPPETS=false` to skip running code blocks (for example, when `runghc` or `sbcl` isn't installed).

## Content

| Path | What |
| --- | --- |
| `content/blog/*.mdx` | Essays. Frontmatter schema in `src/content.config.ts` |
| `content/newsletter/*.mdx` | Newsletter issues |
| `content/commonplace/`, `content/garden/` | Synced from Obsidian: `npm run sync:obsidian -- --vault <path>` (or set `OBSIDIAN_VAULT`) |
| `content/snippets/` | Source files that `run` code blocks can include |

MDX components live in `src/components/` (`EChart`, `ImageFigure`, `MarginNote`); import them at the top of a post.

## Commands

| Command | |
| --- | --- |
| `npm run dev` | Dev server (regenerates banners first) |
| `npm run build` | Static build to `dist/` |
| `npm run preview` | Serve `dist/` with the Pages Functions via Wrangler (reads secrets from `.dev.vars`) |
| `npm run verify` | `astro check`, Biome, snippet lint, tests, build (what the pre-commit hook runs) |
| `npm test` | Vitest plus `run`-block checks |
| `npm run format` | Biome + snippet formatters |
| `npm run banner:image` | Regenerate the dithered banners |

## Deployment

Cloudflare Pages runs `npm run build-cloudflare` (main and dev branches only) and serves `dist/`. The subscribe/unsubscribe endpoints are Pages Functions in `src/functions/`.

- Non-secret config: `wrangler.toml` `[vars]`
- Secrets (`RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `SUBSCRIBE_HMAC_SECRET`, Turnstile secret): Cloudflare Pages → Settings → Environment variables. Locally, put them in `.dev.vars`.
- Send a newsletter issue: `node scripts/send-newsletter.mjs <slug>`. It's a dry run by default; add `--publish` to send (asks y/N first), `--prod` for the production audience, `--confirm` to poll the broadcast's status after sending, and `--force` to resend an issue already marked sent.
