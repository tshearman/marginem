import type { ComponentChildren } from "preact";
import { DateStamp } from "./DateStamp";
import { Tag } from "./Tag";

type Props = {
	id?: string;
	title: string;
	url: string;
	pubDate?: string;
	displayDate?: string;
	excerpt?: string;
	tags?: string[];
	showLikes?: boolean;
	kindLabel?: string;
	children?: ComponentChildren;
};

export function PostPreview(props: Props) {
	const {
		id,
		title,
		url,
		pubDate = "",
		displayDate = "",
		excerpt = "",
		tags = [],
		showLikes = false,
		kindLabel,
		children,
	} = props;

	return (
		<article class="post-preview" data-search-id={id || undefined}>
			<div class="post-preview__body">
				<h3 class="post-preview__title">
					<a class="post-preview__link" href={url}>
						{title}
					</a>
				</h3>
				<div class="post-preview__authors">
					{displayDate ? (
						<DateStamp datetime={pubDate} label={displayDate} />
					) : null}
					{kindLabel ? <span class="search-kind">{kindLabel}</span> : null}
				</div>
				<div class="post-preview__section">
					{excerpt ? <p class="post-preview__excerpt">{excerpt}</p> : null}
				</div>
				<div class="post-preview__meta">
					{tags.length ? (
						tags.map((tag) => <Tag tag={tag} />)
					) : (
						<span class="post-preview__meta-empty">Research Notes</span>
					)}
				</div>
				{showLikes && children ? (
					<div class="post-preview__likes">{children}</div>
				) : null}
			</div>
		</article>
	);
}

export type PostPreviewProps = Props;
