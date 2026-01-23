globalThis.process ??= {}; globalThis.process.env ??= {};
import { l } from './_@astro-renderers_CVR09bb6.mjs';

const slugifyTag = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

var f=0;function u(e,t,n,o,i,u){t||(t={});var a,c,p=t;if("ref"in p)for(c in p={},t)"ref"==c?a=t[c]:p[c]=t[c];var l$1={type:e,props:p,key:n,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--f,__i:-1,__u:0,__source:i,__self:u};if("function"==typeof e&&(a=e.defaultProps))for(c in a) void 0===p[c]&&(p[c]=a[c]);return l.vnode&&l.vnode(l$1),l$1}

const getTagUrl = (label) => {
  const slug = slugifyTag(label);
  return slug ? `/tags/${slug}/` : void 0;
};
const baseClasses = (variant, size, className) => ["tag", `tag--${variant}`, `tag--${size}`, className].filter(Boolean).join(" ");
function Tag(props) {
  const {
    tag = "",
    href,
    variant = "default",
    size = "medium",
    selected = false,
    clickable = true,
    asLink = false,
    className
  } = props;
  const label = tag.trim();
  if (!label) return null;
  const url = href ?? getTagUrl(label);
  const classes = baseClasses(variant, size, className);
  const shouldRenderFilterButton = variant === "filter" && clickable && !(asLink && clickable && url);
  if (shouldRenderFilterButton) {
    return u("button", {
      class: classes,
      type: "button",
      "data-tag": label,
      "data-selected": selected ? "true" : "false",
      "aria-pressed": selected ? "true" : "false",
      children: ["#", label]
    });
  }
  if (clickable && url) {
    return u("a", {
      class: classes,
      href: url,
      "data-tag": label,
      "data-selected": selected ? "true" : "false",
      children: ["#", label]
    });
  }
  return u("span", {
    class: classes,
    "data-tag": label,
    "data-selected": selected ? "true" : "false",
    children: ["#", label]
  });
}

const formatDateLabelParts = (value) => {
  const parts = [];
  const pattern = /(\d{1,2})(st|nd|rd|th)/g;
  let lastIndex = 0;
  let match = pattern.exec(value);
  while (match) {
    const [full, day, suffix] = match;
    const start = match.index ?? 0;
    if (start > lastIndex) {
      parts.push(value.slice(lastIndex, start));
    }
    parts.push(u("span", {
      children: [day, u("sup", {
        children: suffix
      })]
    }));
    lastIndex = start + full.length;
    match = pattern.exec(value);
  }
  if (lastIndex < value.length) {
    parts.push(value.slice(lastIndex));
  }
  return parts;
};
function DateStamp(props) {
  const {
    datetime,
    label = "",
    className
  } = props;
  const isoDate = typeof datetime === "string" ? datetime : datetime.toISOString();
  const labelParts = label ? formatDateLabelParts(label) : null;
  return u("time", {
    datetime: isoDate,
    class: `date-stamp ${className ?? ""}`.trim(),
    children: labelParts
  });
}

export { DateStamp as D, Tag as T, slugifyTag as s, u };
