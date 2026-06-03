/*
 * Image banner with a composited title.
 *
 * Draws a banner image scaled to "cover", then paints a title over it. The
 * glyph EDGES stay crisp (per-pixel alpha), but the black/white "ink" inside
 * each letter is decided once per PIXEL-sized block from the image's luminance
 * — white over dark regions, black over light — so the colour quantizes into
 * chunks. A hot-yellow offset copy sits behind the text for depth.
 *
 * The composite is GPU-driven: a tiny W/block × H/block luminance image is
 * thresholded to black/white, nearest-neighbor upscaled to W×H to produce the
 * chunked ink layer, then constrained to the glyph alpha mask via
 * `globalCompositeOperation = "source-in"`. No per-pixel JS loop runs on the
 * full-resolution canvas.
 *
 * Usage: render a <canvas data-banner data-src="..." data-text="..."> and
 * import this module from the page. Every tunable lives as a data-* attribute
 * (see BannerConfig / DEFAULT_CONFIG below).
 */

export interface BannerConfig {
  /** Banner image URL. */
  src: string;
  /** Title text. Splits on literal "\n" first, then wraps on spaces if a
   *  single line still overflows. */
  text: string;
  /** Optional narrow-viewport title, used when window width ≤ narrowMax.
   *  Same "\n"-as-line-break rule as `text`. Empty to disable. */
  textNarrow: string;
  /** Viewport width (CSS px) at or below which `textNarrow` is used. */
  narrowMax: number;
  /** Banner height, CSS px. */
  height: number;
  /** The CSS width the source image should display at, regardless of
   *  viewport. The drawImage scale is derived from this so the image content
   *  stays at a fixed pixel scale and narrow viewports show a centered crop
   *  rather than a downscaled image. Should match `.banner`'s max CSS width. */
  naturalCssWidth: number;
  /** Ink block size: 1 = crisp, higher = chunkier. */
  pixel: number;
  /** true: white ink over dark / black over light. false flips it. */
  invert: boolean;
  /** Image pixels below this alpha count as transparent (→ black ink). */
  alphaCutoff: number;
  /** Draw the hot-yellow offset copy behind the text. */
  shadow: boolean;
  /** Shadow colour. Defaults to the `--shadow` CSS variable on the canvas. */
  shadowColor: string;
  /** Shadow offset, CSS px. */
  shadowDX: number;
  shadowDY: number;
  /** Title font stack (rendered at weight 900). */
  font: string;
}

export const DEFAULT_CONFIG: BannerConfig = {
  src: "",
  text: "",
  textNarrow: "",
  narrowMax: 720,
  height: 300,
  naturalCssWidth: 860,
  pixel: 0,
  invert: true,
  alphaCutoff: 128,
  shadow: true,
  // Sourced from the `--shadow` CSS variable at read time; this empty string
  // is only a last-resort fallback if that variable is undefined.
  shadowColor: "",
  shadowDX: 5,
  shadowDY: 5,
  font: '"Arial Black", Helvetica, sans-serif',
};

const num = (v: string | undefined, fallback: number): number =>
  v == null || v === "" ? fallback : Number(v);
const bool = (v: string | undefined, fallback: boolean): boolean =>
  v == null ? fallback : v !== "false";
const str = (v: string | undefined, fallback: string): string =>
  v == null || v === "" ? fallback : v;

/** Resolve a CSS custom property on `el`, falling back if it is unset. */
const cssVar = (el: Element, name: string, fallback: string): string =>
  getComputedStyle(el).getPropertyValue(name).trim() || fallback;

/** Build a config from a canvas element's data-* attributes. */
function readConfig(el: HTMLElement): BannerConfig {
  const d = el.dataset;
  return {
    src: str(d.src, DEFAULT_CONFIG.src),
    text: str(d.text, DEFAULT_CONFIG.text),
    textNarrow: str(d.textNarrow, DEFAULT_CONFIG.textNarrow),
    narrowMax: num(d.narrowMax, DEFAULT_CONFIG.narrowMax),
    height: num(d.height, DEFAULT_CONFIG.height),
    naturalCssWidth: num(d.naturalCssWidth, DEFAULT_CONFIG.naturalCssWidth),
    pixel: num(d.pixel, DEFAULT_CONFIG.pixel),
    invert: bool(d.invert, DEFAULT_CONFIG.invert),
    alphaCutoff: num(d.alphaCutoff, DEFAULT_CONFIG.alphaCutoff),
    shadow: bool(d.shadow, DEFAULT_CONFIG.shadow),
    shadowColor: str(
      d.shadowColor,
      cssVar(el, "--shadow", DEFAULT_CONFIG.shadowColor),
    ),
    shadowDX: num(d.shadowDx, DEFAULT_CONFIG.shadowDX),
    shadowDY: num(d.shadowDy, DEFAULT_CONFIG.shadowDY),
    font: str(d.font, DEFAULT_CONFIG.font),
  };
}

const fontStr = (cfg: BannerConfig, px: number): string =>
  `900 ${px}px ${cfg.font}`;

/** Width of `ch` under the current font, cached for the duration of one render
 *  (font changes between renders, so the cache is fresh each call). */
type WidthCache = Map<string, number>;
const charWidth = (
  c: CanvasRenderingContext2D,
  cache: WidthCache,
  ch: string,
): number => {
  let w = cache.get(ch);
  if (w === undefined) {
    w = c.measureText(ch).width;
    cache.set(ch, w);
  }
  return w;
};

/** Width of `text` drawn with `gap` between each character. */
function measureSpaced(
  c: CanvasRenderingContext2D,
  cache: WidthCache,
  text: string,
  gap: number,
): number {
  let total = 0;
  for (let j = 0; j < text.length; j++)
    total += charWidth(c, cache, text[j]) + (j < text.length - 1 ? gap : 0);
  return total;
}

/** Draw `text` centered on (cx, cy) with extra `gap` between characters. */
function drawSpacedText(
  c: CanvasRenderingContext2D,
  cache: WidthCache,
  text: string,
  cx: number,
  cy: number,
  gap: number,
): void {
  c.textAlign = "left";
  let x = cx - measureSpaced(c, cache, text, gap) / 2;
  for (let k = 0; k < text.length; k++) {
    c.fillText(text[k], x, cy);
    x += charWidth(c, cache, text[k]) + gap;
  }
}

/** Reusable offscreen canvases, attached to the destination canvas to survive
 *  across resize re-renders. `mask` holds the glyph alpha mask at W×H; `tiny`
 *  holds the downsampled luminance image at W/block × H/block. */
interface CacheSlot {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}
interface RenderCache {
  mask: CacheSlot;
  tiny: CacheSlot;
}
interface CacheHost {
  _bannerCache?: RenderCache;
}

/** Canvas factory used to allocate the offscreen mask + tiny canvases. The
 *  Node snapshot-generation script supplies @napi-rs/canvas's `createCanvas`
 *  here; the browser path uses `document.createElement`. */
export type CanvasFactory = (w: number, h: number) => HTMLCanvasElement;

const browserCanvasFactory: CanvasFactory = (w, h) => {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
};

/** Optional overrides that let `renderBanner` run outside a browser. In the
 *  browser, all four default to the live window/canvas state. */
export interface RenderOptions {
  /** Device pixel ratio. Defaults to `window.devicePixelRatio`. */
  dpr?: number;
  /** Viewport width in CSS px — used to decide between `text` and
   *  `textNarrow`. Defaults to `window.innerWidth`. */
  viewportWidth?: number;
  /** Canvas backing-store width in device pixels. Defaults to
   *  `parent.clientWidth × dpr`. */
  width?: number;
  /** Factory for the cached offscreen mask + tiny canvases. */
  createCanvas?: CanvasFactory;
}

function makeSlot(factory: CanvasFactory): CacheSlot {
  const canvas = factory(1, 1);
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  return { canvas, ctx };
}
function getCache(
  canvas: HTMLCanvasElement,
  factory: CanvasFactory,
): RenderCache {
  const host = canvas as HTMLCanvasElement & CacheHost;
  if (!host._bannerCache)
    host._bannerCache = { mask: makeSlot(factory), tiny: makeSlot(factory) };
  return host._bannerCache;
}
function ensureSize(slot: CacheSlot, w: number, h: number): void {
  if (slot.canvas.width !== w || slot.canvas.height !== h) {
    // Setting width or height auto-clears the canvas.
    slot.canvas.width = w;
    slot.canvas.height = h;
  } else {
    slot.ctx.clearRect(0, 0, w, h);
  }
}

/** Render the banner (image + composited title) into `canvas`. */
export function renderBanner(
  canvas: HTMLCanvasElement,
  cfg: BannerConfig,
  img: HTMLImageElement,
  options: RenderOptions = {},
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr =
    options.dpr ??
    (typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);
  const W =
    options.width ??
    Math.round((canvas.parentElement?.clientWidth ?? 1092) * dpr);
  const H = Math.round(cfg.height * dpr);
  const viewportWidth =
    options.viewportWidth ??
    (typeof window !== "undefined" ? window.innerWidth : W / dpr);
  const factory = options.createCanvas ?? browserCanvasFactory;
  canvas.width = W; // auto-clears
  canvas.height = H;
  // @napi-rs/canvas has no `.style`; only touch it when present.
  if (canvas.style) canvas.style.height = `${cfg.height}px`;

  const cache = getCache(canvas, factory);

  // 1. Banner image to the main canvas. The image is sized to a fixed
  //    CSS width (`naturalCssWidth`) regardless of viewport — narrow
  //    viewports show a centered crop, wide viewports may letterbox the
  //    sides (banner CSS is `min(naturalCssWidth, 100%)`, so in practice
  //    the canvas backing-store never exceeds the scaled image width).
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);
  const targetImgW = cfg.naturalCssWidth * dpr;
  const scale = targetImgW / img.width;
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);

  // 2. Set up the offscreen mask context (white text on transparent).
  ensureSize(cache.mask, W, H);
  const mctx = cache.mask.ctx;
  mctx.fillStyle = "#fff";
  mctx.textBaseline = "middle";

  // 3. Layout pass: pick narrow variant on small viewports, split on explicit
  //    "\n", then greedy-wrap on word boundaries if a single line still
  //    overflows, and finally shrink to fit the available box.
  const widths: WidthCache = new Map();
  const availW = W * 0.92;
  const availH = H * 0.86;
  let fontPx = H * 0.5;

  const maxLineWidth = (px: number, lns: string[]): number => {
    mctx.font = fontStr(cfg, px);
    widths.clear();
    const g = px * 0.1;
    let m = 0;
    for (const line of lns)
      m = Math.max(m, measureSpaced(mctx, widths, line, g));
    return m;
  };

  const text =
    cfg.textNarrow && viewportWidth <= cfg.narrowMax
      ? cfg.textNarrow
      : cfg.text;
  const greedyWrap = (line: string, px: number): string[] => {
    const words = line.split(/\s+/).filter(Boolean);
    if (words.length <= 1) return [line];
    mctx.font = fontStr(cfg, px);
    widths.clear();
    const g = px * 0.1;
    const out: string[] = [];
    let cur = words[0];
    for (let i = 1; i < words.length; i++) {
      const trial = `${cur} ${words[i]}`;
      if (measureSpaced(mctx, widths, trial, g) <= availW) cur = trial;
      else {
        out.push(cur);
        cur = words[i];
      }
    }
    out.push(cur);
    return out;
  };
  let lines = text.split("\n");
  if (maxLineWidth(fontPx, lines) > availW)
    lines = lines.flatMap((l) => greedyWrap(l, fontPx));
  const mw = maxLineWidth(fontPx, lines);
  if (mw > availW) fontPx *= availW / mw;
  const totalH = lines.length * (fontPx * 1.02);
  if (totalH > availH) fontPx *= availH / totalH;
  fontPx = Math.round(fontPx);

  const baseGap = fontPx * 0.1; // manual letter spacing for the blocky feel
  const lineH = fontPx * 1.02;
  const startY = H / 2 - (lines.length * lineH) / 2 + lineH / 2;

  mctx.font = fontStr(cfg, fontPx);
  widths.clear(); // font size just changed, drop stale widths

  // Justify multi-line titles: stretch each line's letter-spacing so every
  // line ends up the width of the widest line — needed because the title
  // font isn't monospaced.
  const naturalWidths = lines.map((l) =>
    measureSpaced(mctx, widths, l, baseGap),
  );
  const targetWidth = Math.max(...naturalWidths);
  const lineGaps = lines.map((l, i) =>
    l.length > 1
      ? baseGap + (targetWidth - naturalWidths[i]) / (l.length - 1)
      : baseGap,
  );

  // 4. Paint the glyph mask (white text on transparent — alpha encodes coverage).
  for (let li = 0; li < lines.length; li++)
    drawSpacedText(
      mctx,
      widths,
      lines[li],
      W / 2,
      startY + li * lineH,
      lineGaps[li],
    );

  // 5. Hot-yellow offset copy on the main canvas, behind the final text.
  if (cfg.shadow) {
    ctx.save();
    ctx.fillStyle = cfg.shadowColor;
    ctx.textBaseline = "middle";
    ctx.font = fontStr(cfg, fontPx);
    for (let si = 0; si < lines.length; si++)
      drawSpacedText(
        ctx,
        widths,
        lines[si],
        W / 2 + cfg.shadowDX * dpr,
        startY + si * lineH + cfg.shadowDY * dpr,
        lineGaps[si],
      );
    ctx.restore();
  }

  // 6. Build the quantized ink layer at tiny resolution. Drawing the source
  //    image into a W/block × H/block canvas lets the GPU average luminance
  //    per block during downscale; a single linear JS pass then thresholds
  //    each tiny pixel to pure black or white.
  const block = Math.max(1, Math.round(cfg.pixel * dpr));
  const tinyW = Math.max(1, Math.ceil(W / block));
  const tinyH = Math.max(1, Math.ceil(H / block));
  ensureSize(cache.tiny, tinyW, tinyH);
  const tctx = cache.tiny.ctx;
  // Tiny image position matches the main canvas at 1/block resolution, so
  // luminance sampling on tiny corresponds to the same image region the
  // final composite will paint over.
  const tscale = scale / block;
  const tdw = img.width * tscale;
  const tdh = img.height * tscale;
  tctx.drawImage(img, (tinyW - tdw) / 2, (tinyH - tdh) / 2, tdw, tdh);
  const tdata = tctx.getImageData(0, 0, tinyW, tinyH);
  const td = tdata.data;
  const invert = cfg.invert;
  const alphaCutoff = cfg.alphaCutoff;
  for (let i = 0; i < td.length; i += 4) {
    const lum = 0.299 * td[i] + 0.587 * td[i + 1] + 0.114 * td[i + 2];
    const dark = lum < 128;
    let ink = (invert ? dark : !dark) ? 255 : 0;
    if (td[i + 3] < alphaCutoff) ink = 0;
    td[i] = ink;
    td[i + 1] = ink;
    td[i + 2] = ink;
    td[i + 3] = 255;
  }
  tctx.putImageData(tdata, 0, 0);

  // 7. Constrain the ink layer to the glyph mask via source-in: this paints
  //    the upscaled (nearest-neighbor → block-quantized) ink only where the
  //    text covers, preserving crisp anti-aliased edges from the mask's
  //    alpha. One GPU op replaces the W×H per-pixel JS loop.
  mctx.save();
  mctx.globalCompositeOperation = "source-in";
  mctx.imageSmoothingEnabled = false;
  mctx.drawImage(cache.tiny.canvas, 0, 0, W, H);
  mctx.restore();

  // 8. Paint the finished masked-ink text onto the main canvas.
  ctx.drawImage(cache.mask.canvas, 0, 0);
}

/** Load the image for one banner canvas and (re)render it on load + resize. */
export function initBanner(canvas: HTMLCanvasElement): void {
  const cfg = readConfig(canvas);
  if (!cfg.src) return;
  // Reuse an inline-bootstrap-warmed Image if one is available (see
  // Banner.astro). Falling back to a fresh request keeps SSR/dev safe.
  const cache = (
    window as unknown as { __bannerImgs?: Record<string, HTMLImageElement> }
  ).__bannerImgs;
  const preloaded = cache?.[cfg.src];
  const img = preloaded ?? new Image();
  if (!preloaded) {
    img.decoding = "async";
    (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority =
      "high";
    img.src = cfg.src;
  }

  const start = () => {
    const render = () => renderBanner(canvas, cfg, img);
    render();
    window.addEventListener("resize", render);
  };

  const ready = () => {
    // img.decode() resolves once the image is fully decoded; avoids a
    // synchronous decode stall inside the first drawImage().
    const p = img.decode ? img.decode() : Promise.resolve();
    p.then(start, start);
  };

  if (img.complete && img.naturalWidth > 0) ready();
  else img.addEventListener("load", ready, { once: true });
}

// Auto-initialize every banner on the page. Astro `<script>` modules run after
// the DOM is parsed, so the canvases are already present. Skipped when the
// module is imported in Node (snapshot generator) — no `document` there.
if (typeof document !== "undefined") {
  for (const canvas of document.querySelectorAll<HTMLCanvasElement>(
    "canvas[data-banner]",
  )) {
    initBanner(canvas);
  }
}
