export interface NoteMeta {
  content: string;
  source?: string;
  author?: string;
  tags?: string[];
  date?: Date;
}

export const generateNoteId = ({ content = "", author = "", date }: NoteMeta) => {
  const baseContent = content || "";
  const baseAuthor = author || "unknown";
  const isoDate = date ? new Date(date).toISOString() : "";

  const hashSource = `${baseContent}|${baseAuthor}|${isoDate}`;
  let hash = 0;
  for (let i = 0; i < hashSource.length; i++) {
    const charCode = hashSource.charCodeAt(i);
    hash = (hash << 5) - hash + charCode;
    hash |= 0;
  }

  const hashHex = Math.abs(hash).toString(16).padStart(8, "0").slice(0, 8);
  const slugify = (value: string, max = 30) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, max);

  const contentSlug = slugify(baseContent, 30);
  const authorSlug = slugify(baseAuthor, 20);

  return `${contentSlug}-${authorSlug}-${hashHex}`;
};
