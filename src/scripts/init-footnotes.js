// Footnote popover: clicking a footnote reference shows the note in a panel
// pinned to the bottom of the viewport instead of jumping down the page.
// Styles live with the article styles (.footnote-panel).

const VISIBLE = "footnote-panel--visible";
const TRANSITION_MS = 300; // matches the .footnote-panel transition

let panel;
let number;
let text;
let activeLink = null;

function createPanel() {
	panel = document.createElement("aside");
	panel.className = "footnote-panel";
	panel.setAttribute("role", "note");
	panel.setAttribute("aria-live", "polite");
	panel.innerHTML =
		'<div class="footnote-panel__inner"><div class="footnote-panel__content">' +
		'<span class="footnote-panel__number"></span><div class="footnote-panel__text"></div>' +
		'</div></div><button type="button" class="footnote-panel__close" aria-label="Dismiss footnote">×</button>';
	number = panel.querySelector(".footnote-panel__number");
	text = panel.querySelector(".footnote-panel__text");
	panel.querySelector("button").addEventListener("click", hide);
	document.body.appendChild(panel);
}

// Slides the panel out; resolves once the transition has finished.
function hide() {
	if (!panel?.classList.contains(VISIBLE)) return Promise.resolve();
	panel.classList.remove(VISIBLE);
	activeLink = null;
	return new Promise((resolve) => {
		setTimeout(() => {
			// Clear stale text for screen readers, unless a note reopened meanwhile.
			if (!activeLink) {
				number.textContent = "";
				text.innerHTML = "";
			}
			resolve();
		}, TRANSITION_MS);
	});
}

async function show(link, html) {
	if (!panel) createPanel();
	await hide(); // slide the previous note out first
	const label = link.textContent.trim();
	number.textContent = label ? `${label}.` : "";
	text.innerHTML = html;
	activeLink = link;
	requestAnimationFrame(() => panel.classList.add(VISIBLE));
}

// The footnote's HTML, without its "back to text" links.
function noteHtml(link) {
	const id = (link.getAttribute("href") || "").replace(/^#/, "");
	const note =
		id &&
		(document.getElementById(id) ||
			document.getElementById(`user-content-${id}`));
	if (!note) return null;
	const clone = note.cloneNode(true);
	for (const backref of clone.querySelectorAll("[data-footnote-backref]")) {
		backref.remove();
	}
	return clone.innerHTML.trim() || null;
}

// Module scripts run after the document is parsed, so the DOM is ready.
const links = [...document.querySelectorAll("a[data-footnote-ref]")].filter(
	(link) => !link.closest(".footnotes"),
);
for (const link of links) {
	link.addEventListener("click", (event) => {
		if (activeLink === link) {
			event.preventDefault();
			hide();
			return;
		}
		const html = noteHtml(link);
		if (!html) return; // let the link jump to the note
		event.preventDefault();
		event.stopPropagation(); // keep the document handler from closing it
		show(link, html);
	});
}
if (links.length) {
	window.addEventListener("scroll", hide, { passive: true });
	document.addEventListener("click", (event) => {
		if (activeLink && !panel.contains(event.target)) hide();
	});
}
