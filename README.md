# Marginem

A minimalist, technical blog starter built with [Astro](https://astro.build/) and MDX. It prioritizes excellent typography, runnable code snippets, math typesetting, tags, pagination, and lightweight interactive plots.

## Features

- Content collections for typed Markdown/MDX posts
- Remark/Rehype pipeline with math, footnotes, GitHub-flavored markdown, and beautiful code highlighting
- Build-time execution of fenced JavaScript snippets marked with `run`
- Margin notes, responsive figures, and a Plotly helper component out of the box
- Pagination plus tag archive pages powered by Astro routing

## Getting started

### With Nix (recommended)

1. Install [Nix](https://nixos.org/download.html) and optionally [`direnv` + `nix-direnv`](https://github.com/nix-community/nix-direnv).
2. Allow the local environment once per clone:
   ```bash
   direnv allow   # skips this step if you don't use direnv
   ```
   or enter the shell manually whenever you work on the repo:
   ```bash
   nix develop
   ```
   The dev shell bundles Node.js 20, npm/corepack, git, watchman, the `nil` Nix LSP, and the Alejandra formatter.
3. Install JS dependencies:
   ```bash
   npm install
   ```
4. Deploy a local version of the site:
   ```bash
   npm run dev [ -- --host (to host the site so it is locally accessible)]
   ```

### Without Nix

1. Install Node.js 18.17+ and npm (or pnpm/bun).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local dev server:
   ```bash
   npm run dev
   ```
4. Create new posts inside `content/blog`. Use frontmatter that matches `src/content.config.ts`.

## First-time setup

- Hooks: `npm install` runs `npm run hooks:install` via `postinstall` to enable `pre-commit` lint/test hooks for this clone.
- Verify hooks: `git config --get core.hooksPath` should return `.githooks`.
-

## MDX helpers

- Use `<PlotlyChart />`, `<ImageFigure />`, and `<MarginNote />` inside MDX documents for interactive plots, responsive images, and unobtrusive notes.
- Mark fenced code blocks with ` ```js run ` to execute snippets during build time. Output is injected below the block as ` ```output ` code for quick inspection.
- Math is rendered via KaTeX; wrap inline math with `$...$` and block math with `$$...$$`.

## Docker

Build a production image and run it locally:

```bash
docker build -t marginem .
docker run -p 4321:4321 --env PORT=4321 marginem
```

The container uses the Astro Node adapter in standalone mode (`node dist/server/entry.mjs`) and listens on `PORT` (default `4321`) with `HOST=0.0.0.0`.

The build stage also installs `ghc`, `sbcl`, and `python3-numpy`, so `runghc`, Common Lisp, and Python+NumPy MDX snippets (e.g. `content/blog/haskell-runner-demo.mdx`, `common-lisp-runner-demo.mdx`, and `python-runner-demo.mdx`) can execute during `astro build`.

## Next steps

- Update `astro.config.mjs` `site` with your production URL.
- Style or extend `src/styles/global.css` to match your brand.
- Deploy to a Node-capable host; the likes API uses `output: "server"` with the Node adapter.
- Format the flake with `nix fmt` and keep `flake.lock` under version control so teammates share the same toolchain.

## Environment variables

- Local secrets (Resend keys, HMAC secrets, audience IDs): use `.dev.vars` at the repo root. `npm run preview` already passes it to Wrangler via `--env-file ../.dev.vars`. Source it or export values in your shell for other scripts.
- Local non-secrets: copy `.env.example` to `.env` (or export in your shell) for values like `NEWSLETTER_SITE_URL`, `PUBLIC_FONT_AWESOME_KIT_ID`, `OBSIDIAN_VAULT`.
- Production non-secrets: set in `wrangler.toml` under `[vars]`.
- Production secrets: set in Cloudflare Pages → Settings → Environment variables → Secrets (`RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `SUBSCRIBE_HMAC_SECRET`).
