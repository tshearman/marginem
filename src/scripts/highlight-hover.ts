/*
 * Per-hover random highlight (both light and dark mode).
 *
 * Whenever the pointer enters a known highlight-using element (a button,
 * a homepage cell, an archive row, a search result, etc.) we pick a fresh
 * entry from HIGHLIGHT_POOL and set --highlight / --highlight-fg as inline
 * custom properties on that element. The element's existing
 * `:hover { background: var(--highlight) }` rule then renders with the
 * randomized values; the inline style overrides the :root pick that the
 * banner uses, but only for the hovered subtree.
 *
 * focusin is also listened for so keyboard navigation gets the same
 * effect (search trigger, theme toggle, etc. have :focus-visible rules
 * that also paint --highlight).
 */
import { HIGHLIGHT_POOL } from "../lib/highlight-pool";

// Selectors of elements that paint --highlight (or its --paper-accent
// alias) as a hover/focus background. --paper-accent is declared as
// `var(--highlight)` on :root, so setting --highlight inline on the
// hovered element transparently re-routes through the alias.
const HOVER_SELECTORS = [
	".btn",
	".cell--link",
	".index a",
	".archive-entry",
	".tag",
	".meta__brand",
	".meta__nav a",
	".theme-toggle",
	".nav-search__trigger",
	".search-modal__close",
	".search-modal .post-preview__body",
	".search-modal .note-card--interactive",
	".search-modal .garden-search",
	// Article body links (post.css uses --paper-accent).
	".paper-body a",
	// Garden list + entry pages (use --paper-accent).
	".garden-card",
	".garden-entry__breadcrumbs a",
	".garden-entry__backlinks a",
];
const HOVER_SELECTOR = HOVER_SELECTORS.join(",");

function pick() {
	return HIGHLIGHT_POOL[Math.floor(Math.random() * HIGHLIGHT_POOL.length)];
}

let lastTarget: HTMLElement | null = null;

function apply(target: HTMLElement) {
	const p = pick();
	// --paper-accent / --paper-shadow are declared as `var(--highlight)` on
	// :root, but custom-property var() substitution resolves at the element
	// where the declaration LIVES (:root) — the aliases then inherit as a
	// frozen computed value. Setting --highlight inline on the hovered
	// element does NOT propagate through them, so we set the aliases
	// explicitly too.
	target.style.setProperty("--highlight", p.highlight);
	target.style.setProperty("--highlight-fg", p.fg);
	target.style.setProperty("--paper-accent", p.highlight);
	target.style.setProperty("--paper-shadow", p.highlight);
}

function onEnter(event: Event) {
	const node = event.target as Element | null;
	if (!node || !("closest" in node)) return;
	const target = (node as Element).closest(
		HOVER_SELECTOR,
	) as HTMLElement | null;
	if (!target || target === lastTarget) return;
	lastTarget = target;
	apply(target);
}

function onLeave(event: PointerEvent) {
	if (!lastTarget) return;
	const next = event.relatedTarget as Node | null;
	if (!next || !lastTarget.contains(next)) {
		lastTarget = null;
	}
}

document.addEventListener("pointerover", onEnter);
document.addEventListener("focusin", onEnter);
document.addEventListener("pointerout", onLeave);
