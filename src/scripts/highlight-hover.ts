/*
 * Per-hover random highlight (both themes). When the pointer or keyboard
 * focus enters an element that paints --highlight on :hover/:focus-visible,
 * we set a fresh pick from HIGHLIGHT_POOL as inline custom properties on that
 * element. That overrides the page-load pick on :root (which the banner
 * keeps) for the hovered subtree only.
 */
import { HIGHLIGHT_POOL } from "../lib/highlight-pool";

// Elements that paint --highlight as a hover/focus background.
const HOVER_SELECTOR = [
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
	".paper-body a",
	".garden-card",
	".garden-entry__breadcrumbs a",
	".garden-entry__backlinks a",
].join(",");

// The element last given a colour; re-entering it (or focusing it after
// hovering) keeps the colour rather than re-rolling.
let lastTarget: HTMLElement | null = null;

function onEnter(event: Event) {
	if (!(event.target instanceof Element)) return;
	const target = event.target.closest<HTMLElement>(HOVER_SELECTOR);
	if (!target || target === lastTarget) return;
	lastTarget = target;
	const p = HIGHLIGHT_POOL[Math.floor(Math.random() * HIGHLIGHT_POOL.length)];
	target.style.setProperty("--highlight", p.highlight);
	target.style.setProperty("--highlight-fg", p.fg);
}

function onLeave(event: PointerEvent) {
	const next = event.relatedTarget;
	if (lastTarget && !(next instanceof Node && lastTarget.contains(next))) {
		lastTarget = null;
	}
}

document.addEventListener("pointerover", onEnter);
document.addEventListener("focusin", onEnter);
document.addEventListener("pointerout", onLeave);
