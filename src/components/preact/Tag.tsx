import type { ComponentProps } from "preact";

type Props = {
	tag?: string;
	href?: string;
	variant?: "default" | "filter" | "display";
	size?: "small" | "medium" | "large";
	selected?: boolean;
	clickable?: boolean;
	asLink?: boolean;
	className?: string;
};

const getTagUrl = (label: string) =>
	label ? `/tags/${encodeURIComponent(label.toLowerCase())}/` : undefined;

const baseClasses = (variant: Props["variant"], size: Props["size"], className?: string) =>
	["tag", `tag--${variant}`, `tag--${size}`, className].filter(Boolean).join(" ");

export function Tag(props: Props) {
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
	if (!label) return null;

	const url = href ?? getTagUrl(label);
	const classes = baseClasses(variant, size, className);
	const shouldRenderFilterButton =
		variant === "filter" && clickable && !(asLink && clickable && url);

	if (shouldRenderFilterButton) {
		return (
			<button
				class={classes}
				type="button"
				data-tag={label}
				data-selected={selected ? "true" : "false"}
				aria-pressed={selected ? "true" : "false"}
			>
				#{label}
			</button>
		);
	}

	if (clickable && url) {
		return (
			<a
				class={classes}
				href={url}
				data-tag={label}
				data-selected={selected ? "true" : "false"}
			>
				#{label}
			</a>
		);
	}

	return (
		<span class={classes} data-tag={label} data-selected={selected ? "true" : "false"}>
			#{label}
		</span>
	);
}

export type TagProps = ComponentProps<typeof Tag>;
