export const KIND_LABELS = {
	writing: "Writing",
	note: "Note",
	garden: "Garden",
} as const;

export type ContentKind = keyof typeof KIND_LABELS;
