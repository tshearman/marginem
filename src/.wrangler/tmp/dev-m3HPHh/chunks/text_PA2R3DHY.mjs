globalThis.process ??= {}; globalThis.process.env ??= {};
const normalizeWhitespace = (value) => value.replace(/\s+/g, " ").replace(/\s+([.,!?;:])/g, "$1").trim();
const ellipsizeText = (value, limit = 200, {
  alwaysAppend = false
} = {}) => {
  if (!value) return "";
  const normalized = normalizeWhitespace(value);
  if (!normalized) return "";
  const limited = normalized.length > limit ? normalized.slice(0, limit).trim() : normalized;
  const shouldAppend = normalized.length > limit || alwaysAppend;
  const cleaned = shouldAppend ? limited.replace(/[\s.,;:!-]+$/u, "") : limited;
  return shouldAppend ? `${cleaned}…` : cleaned;
};

export { ellipsizeText as e, normalizeWhitespace as n };
