// Pure HTML-string renderers for the site's card components.
//
// Single source of truth used by:
//   - the .astro shells (NoteCard.astro, PostPreview.astro, etc.)
//   - the /api/search.json endpoint (which prerenders fragments for the modal)
//
// These return trusted markup; callers embed via `set:html` (Astro) or
// `innerHTML` (the search modal). All user-supplied values are escaped here.

import { slugifyTag } from "./tags";

const escapeHtml = (value: string) =>
	value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

const toIso = (value: string | Date | undefined): string => {
	if (!value) return "";
	if (typeof value === "string") return value;
	return value.toISOString();
};

const renderKind = (label?: string) =>
	label ? `<span class="search-kind">${escapeHtml(label)}</span>` : "";

export type DateStampProps = {
	datetime: string | Date;
	label?: string;
	className?: string;
};

/** `<time>` whose ordinal suffixes (1st, 2nd, ...) render as superscripts. */
export const renderDateStamp = ({
	datetime,
	label = "",
	className,
}: DateStampProps): string => {
	const cls = `date-stamp${className ? ` ${className}` : ""}`;
	const labelHtml = escapeHtml(label).replace(
		/(\d{1,2})(st|nd|rd|th)/g,
		"<span>$1<sup>$2</sup></span>",
	);
	return `<time datetime="${escapeHtml(toIso(datetime))}" class="${escapeHtml(
		cls,
	)}">${labelHtml}</time>`;
};

export type TagProps = {
	tag?: string;
	variant?: "default" | "filter" | "display";
	size?: "small" | "medium" | "large";
	/** Render a filter tag as a link to its tag page instead of a button. */
	asLink?: boolean;
};

export const renderTag = ({
	tag = "",
	variant = "default",
	size = "medium",
	asLink = false,
}: TagProps): string => {
	const label = tag.trim();
	if (!label) return "";

	const attrs = `class="tag tag--${variant} tag--${size}" data-tag="${escapeHtml(
		label,
	)}" data-selected="false"`;
	const text = `#${escapeHtml(label)}`;
	if (variant === "filter" && !asLink) {
		return `<button ${attrs} type="button" aria-pressed="false">${text}</button>`;
	}
	const slug = slugifyTag(label);
	return slug
		? `<a ${attrs} href="/tags/${slug}/">${text}</a>`
		: `<span ${attrs}>${text}</span>`;
};

export type NoteCardProps = {
	content: string;
	source?: string;
	author?: string;
	tags?: string[];
	dateLabel?: string;
	dateTime?: string | Date;
	kindLabel?: string;
	/** "search" renders the whole card as a link to `href`. */
	variant?: "default" | "search";
	href?: string;
	/** Anchor id; also adds a "#" permalink to the card. */
	id?: string;
	className?: string;
};

const renderNoteInner = ({
	content,
	author,
	source,
	dateLabel,
	dateTime,
	kindLabel,
	tags = [],
}: NoteCardProps): string => {
	const attribution = [
		author ? `<div class="note-author">${escapeHtml(author)}</div>` : "",
		source ? `<div class="note-source">${escapeHtml(source)}</div>` : "",
		dateLabel
			? renderDateStamp({
					datetime: dateTime ?? "",
					label: dateLabel,
					className: "note-date",
				})
			: "",
		renderKind(kindLabel),
	].join("");
	const tagsHtml = tags.length
		? `<div class="note-tags">${tags
				.map((t) => renderTag({ tag: t, variant: "filter", size: "small" }))
				.join("")}</div>`
		: "";
	return `<div class="note-content-wrapper"><div class="note-content"><blockquote class="note-text">${escapeHtml(
		content,
	)}</blockquote><div class="note-attribution">${attribution}</div></div>${tagsHtml}</div>`;
};

export const renderNoteCard = (props: NoteCardProps): string => {
	const { className, id, variant = "default", href } = props;

	if (variant === "search") {
		return `<a class="note-card note-card--interactive" href="${escapeHtml(
			href ?? "",
		)}">${renderNoteInner(props)}</a>`;
	}

	const cls = `note-card${className ? ` ${className}` : ""}`;
	const idAttr = id ? ` id="${escapeHtml(id)}"` : "";
	const permalink = id
		? `<a class="note-card__anchor-link" href="#${escapeHtml(
				id,
			)}" aria-label="Permalink to this note">#</a>`
		: "";
	return `<article class="${escapeHtml(
		cls,
	)}"${idAttr}>${permalink}${renderNoteInner(props)}</article>`;
};

export type PostPreviewProps = {
	id?: string;
	title: string;
	url: string;
	pubDate?: string;
	displayDate?: string;
	excerpt?: string;
	tags?: string[];
	kindLabel?: string;
};

export const renderPostPreview = ({
	id,
	title,
	url,
	pubDate = "",
	displayDate = "",
	excerpt = "",
	tags = [],
	kindLabel,
}: PostPreviewProps): string => {
	const idAttr = id ? ` data-search-id="${escapeHtml(id)}"` : "";
	const dateHtml = displayDate
		? renderDateStamp({ datetime: pubDate, label: displayDate })
		: "";
	const excerptHtml = excerpt
		? `<p class="post-preview__excerpt">${escapeHtml(excerpt)}</p>`
		: "";
	const metaHtml = tags.length
		? tags.map((t) => renderTag({ tag: t })).join("")
		: `<span class="post-preview__meta-empty">Research Notes</span>`;
	return `<article class="post-preview"${idAttr}><div class="post-preview__body"><h3 class="post-preview__title"><a class="post-preview__link" href="${escapeHtml(
		url,
	)}">${escapeHtml(
		title,
	)}</a></h3><div class="post-preview__authors">${dateHtml}${renderKind(
		kindLabel,
	)}</div><div class="post-preview__section">${excerptHtml}</div><div class="post-preview__meta">${metaHtml}</div></div></article>`;
};

export type GardenNoteCardProps = {
	title: string;
	excerpt?: string;
	updatedAt?: string | Date;
	dateLabel?: string;
	href?: string;
	variant?: "card" | "search";
	kindLabel?: string;
};

export const renderGardenNoteCard = ({
	title,
	excerpt = "",
	updatedAt = "",
	dateLabel,
	href = "#",
	variant = "card",
	kindLabel,
}: GardenNoteCardProps): string => {
	const block = variant === "search" ? "garden-search" : "garden-card";
	const date = dateLabel
		? renderDateStamp({
				datetime: updatedAt,
				label: dateLabel,
				className: `${block}__date`,
			})
		: "";

	if (variant === "search") {
		const excerptHtml = excerpt
			? `<p class="garden-search__excerpt">${escapeHtml(excerpt)}</p>`
			: "";
		return `<a class="garden-search" href="${escapeHtml(
			href,
		)}"><div class="garden-search__header"><h3 class="garden-search__title">${escapeHtml(
			title,
		)}</h3>${date}${renderKind(kindLabel)}</div>${excerptHtml}</a>`;
	}

	return `<a class="garden-card" href="${escapeHtml(
		href,
	)}"><div class="garden-card__row">${date}<h3>${escapeHtml(
		title,
	)}</h3></div><p class="garden-card__excerpt">${escapeHtml(excerpt)}</p></a>`;
};
