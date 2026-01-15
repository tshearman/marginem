# Notebook

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
4. Start hacking:
   ```bash
   npm run dev
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
4. Create new posts inside `src/content/blog`. Use frontmatter that matches `src/content/config.ts`.

## Likes API (posts + notes)

- On first request a `visitor_id` cookie is issued (httpOnly, same-site). Likes are stored in `data/likes.db` (SQLite via `better-sqlite3`) keyed by `visitor_id`, `type` (`post` | `note`), and `slug`.
- `GET /api/likes?type=post&slug=my-post` → `{ count, liked }`
- `POST /api/likes` with JSON `{ type, slug, action?: "like" | "unlike" | "toggle" }` → `{ count, liked }` (also available as `DELETE /api/likes` to unlike).
- The storage layer is isolated in `src/lib/likes/store.ts` so it can be swapped for a remote database later.
- Use `LIKES_DB_PATH=/absolute/or/relative/path/to/db` to point at a different database file (dev defaults to `data/likes.dev.db`, prod to `data/likes.db`).

## MDX helpers

- Use `<PlotlyChart />`, `<ImageFigure />`, and `<MarginNote />` inside MDX documents for interactive plots, responsive images, and unobtrusive notes.
- Mark fenced code blocks with ```` ```js run ```` to execute snippets during build time. Output is injected below the block as ```` ```output ```` code for quick inspection.
- Math is rendered via KaTeX; wrap inline math with `$...$` and block math with `$$...$$`.

## Next steps

- Update `astro.config.mjs` `site` with your production URL.
- Style or extend `src/styles/global.css` to match your brand.
- Deploy to a Node-capable host; the likes API uses `output: "server"` with the Node adapter.
- Format the flake with `nix fmt` and keep `flake.lock` under version control so teammates share the same toolchain.
