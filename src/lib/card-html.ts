// Pure HTML-string renderers for the site's card components.
//
// Single source of truth used by:
//   - the .astro shells (NoteCard.astro, PostPreview.astro, etc.)
//   - the /api/search.json endpoint (which prerenders fragments for the modal)
//
// These return trusted markup; callers embed via `set:html` (Astro) or
// `innerHTML` (the search modal). All user-supplied values are escaped here.

import { slugifyTag } from "./tags";

const escapeText = (value: string) =>
	value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const escapeAttr = (value: string) =>
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

// Wrap ordinal suffixes (1st, 2nd, 3rd, 4th, ...) so they can be rendered
// as <sup>. Returns escaped HTML.
const renderDateLabel = (label: string): string => {
	const pattern = /(\d{1,2})(st|nd|rd|th)/g;
	let out = "";
	let lastIndex = 0;
	let match = pattern.exec(label);
	while (match) {
		const start = match.index;
		out += escapeText(label.slice(lastIndex, start));
		out += `<span>${escapeText(match[1])}<sup>${escapeText(
			match[2],
		)}</sup></span>`;
		lastIndex = start + match[0].length;
		match = pattern.exec(label);
	}
	out += escapeText(label.slice(lastIndex));
	return out;
};

export type DateStampProps = {
	datetime: string | Date;
	label?: string;
	className?: string;
};

export const renderDateStamp = (props: DateStampProps): string => {
	const { datetime, label = "", className } = props;
	const iso = toIso(datetime);
	const cls = `date-stamp${className ? ` ${className}` : ""}`;
	return `<time datetime="${escapeAttr(iso)}" class="${escapeAttr(
		cls,
	)}">${renderDateLabel(label)}</time>`;
};

export type TagProps = {
	tag?: string;
	href?: string;
	variant?: "default" | "filter" | "display";
	size?: "small" | "medium" | "large";
	selected?: boolean;
	clickable?: boolean;
	asLink?: boolean;
	className?: string;
};

export const renderTag = (props: TagProps): string => {
	const {
		tag = "",
		href,
		variant = "default",
		size = "medium",
		selected = false,
		clickable = true,
		asLink = false,
		className,
	} = props;
	const label = tag.trim();
	if (!label) return "";

	const slug = slugifyTag(label);
	const url = href ?? (slug ? `/tags/${slug}/` : undefined);
	const classes = ["tag", `tag--${variant}`, `tag--${size}`, className]
		.filter(Boolean)
		.join(" ");
	const selectedAttr = selected ? "true" : "false";
	const shouldRenderFilterButton =
		variant === "filter" && clickable && !(asLink && clickable && url);

	if (shouldRenderFilterButton) {
		return `<button class="${escapeAttr(
			classes,
		)}" type="button" data-tag="${escapeAttr(
			label,
		)}" data-selected="${selectedAttr}" aria-pressed="${selectedAttr}">#${escapeText(
			label,
		)}</button>`;
	}
	if (clickable && url) {
		return `<a class="${escapeAttr(classes)}" href="${escapeAttr(
			url,
		)}" data-tag="${escapeAttr(
			label,
		)}" data-selected="${selectedAttr}">#${escapeText(label)}</a>`;
	}
	return `<span class="${escapeAttr(classes)}" data-tag="${escapeAttr(
		label,
	)}" data-selected="${selectedAttr}">#${escapeText(label)}</span>`;
};

export type NoteCardProps = {
	content: string;
	source?: string;
	author?: string;
	tags?: string[];
	dateLabel?: string;
	dateTime?: string | Date;
	className?: string;
	style?: string;
	id?: string;
	dataTags?: string;
	variant?: "default" | "search";
	href?: string;
	showPermalink?: boolean;
	kindLabel?: string;
	permalinkHref?: string;
};

const renderNoteInner = (props: NoteCardProps): string => {
	const {
		content,
		author,
		source,
		dateLabel,
		dateTime,
		kindLabel,
		tags = [],
	} = props;
	const attribution = [
		author ? `<div class="note-author">${escapeText(author)}</div>` : "",
		source ? `<div class="note-source">${escapeText(source)}</div>` : "",
		dateLabel
			? renderDateStamp({
					datetime: dateTime ?? "",
					label: dateLabel,
					className: "note-date",
				})
			: "",
		kindLabel
			? `<span class="search-kind">${escapeText(kindLabel)}</span>`
			: "",
	].join("");
	const tagsHtml = tags.length
		? `<div class="note-tags">${tags
				.map((t) => renderTag({ tag: t, variant: "filter", size: "small" }))
				.join("")}</div>`
		: "";
	return `<div class="note-content-wrapper"><div class="note-content"><blockquote class="note-text">${escapeText(
		content,
	)}</blockquote><div class="note-attribution">${attribution}</div></div>${tagsHtml}</div>`;
};

export const renderNoteCard = (props: NoteCardProps): string => {
	const {
		className,
		style,
		id,
		dataTags,
		variant = "default",
		href,
		showPermalink = true,
		permalinkHref,
	} = props;

	if (variant === "search") {
		return `<a class="note-card note-card--interactive" href="${escapeAttr(
			href ?? "",
		)}">${renderNoteInner(props)}</a>`;
	}

	const cls = `note-card${className ? ` ${className}` : ""}`;
	const permalink = permalinkHref ?? (id ? `#${id}` : undefined);
	const permalinkAnchor =
		showPermalink && id && permalink
			? `<a class="note-card__anchor-link" href="${escapeAttr(
					permalink,
				)}" aria-label="Permalink to this note">#</a>`
			: "";
	const idAttr = id ? ` id="${escapeAttr(id)}"` : "";
	const styleAttr = style ? ` style="${escapeAttr(style)}"` : "";
	const dataTagsAttr = dataTags ? ` data-tags="${escapeAttr(dataTags)}"` : "";
	return `<article class="${escapeAttr(
		cls,
	)}"${idAttr}${styleAttr}${dataTagsAttr}>${permalinkAnchor}${renderNoteInner(
		props,
	)}</article>`;
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

export const renderPostPreview = (props: PostPreviewProps): string => {
	const {
		id,
		title,
		url,
		pubDate = "",
		displayDate = "",
		excerpt = "",
		tags = [],
		kindLabel,
	} = props;
	const idAttr = id ? ` data-search-id="${escapeAttr(id)}"` : "";
	const dateHtml = displayDate
		? renderDateStamp({ datetime: pubDate, label: displayDate })
		: "";
	const kindHtml = kindLabel
		? `<span class="search-kind">${escapeText(kindLabel)}</span>`
		: "";
	const excerptHtml = excerpt
		? `<p class="post-preview__excerpt">${escapeText(excerpt)}</p>`
		: "";
	const metaHtml = tags.length
		? tags.map((t) => renderTag({ tag: t })).join("")
		: `<span class="post-preview__meta-empty">Research Notes</span>`;
	return `<article class="post-preview"${idAttr}><div class="post-preview__body"><h3 class="post-preview__title"><a class="post-preview__link" href="${escapeAttr(
		url,
	)}">${escapeText(
		title,
	)}</a></h3><div class="post-preview__authors">${dateHtml}${kindHtml}</div><div class="post-preview__section">${excerptHtml}</div><div class="post-preview__meta">${metaHtml}</div></div></article>`;
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

export const renderGardenNoteCard = (props: GardenNoteCardProps): string => {
	const {
		title,
		excerpt = "",
		updatedAt,
		dateLabel,
		href = "#",
		variant = "card",
		kindLabel,
	} = props;
	const isoDate = toIso(updatedAt);

	if (variant === "search") {
		const date = dateLabel
			? renderDateStamp({
					datetime: isoDate,
					label: dateLabel,
					className: "garden-search__date",
				})
			: "";
		const kind = kindLabel
			? `<span class="search-kind">${escapeText(kindLabel)}</span>`
			: "";
		const excerptHtml = excerpt
			? `<p class="garden-search__excerpt">${escapeText(excerpt)}</p>`
			: "";
		return `<a class="garden-search" href="${escapeAttr(
			href,
		)}"><div class="garden-search__header"><h3 class="garden-search__title">${escapeText(
			title,
		)}</h3>${date}${kind}</div>${excerptHtml}</a>`;
	}

	const date = dateLabel
		? renderDateStamp({
				datetime: isoDate,
				label: dateLabel,
				className: "garden-card__date",
			})
		: "";
	return `<a class="garden-card" href="${escapeAttr(
		href,
	)}"><div class="garden-card__row">${date}<h3>${escapeText(
		title,
	)}</h3></div><p class="garden-card__excerpt">${escapeText(excerpt)}</p></a>`;
};
