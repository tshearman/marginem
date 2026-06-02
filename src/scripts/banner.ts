/*
 * Image banner with a composited title.
 *
 * Draws a banner image scaled to "cover", then paints a title over it. The
 * glyph EDGES stay crisp (per-pixel alpha), but the black/white "ink" inside
 * each letter is decided once per PIXEL-sized block from the image's luminance
 * — white over dark regions, black over light — so the colour quantizes into
 * chunks. A hot-yellow offset copy sits behind the text for depth.
 *
 * Adapted from the cocobconcom banner (rotation + year logic stripped out).
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
	pixel: 2.5,
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
		pixel: num(d.pixel, DEFAULT_CONFIG.pixel),
		invert: bool(d.invert, DEFAULT_CONFIG.invert),
		alphaCutoff: num(d.alphaCutoff, DEFAULT_CONFIG.alphaCutoff),
		shadow: bool(d.shadow, DEFAULT_CONFIG.shadow),
		shadowColor: str(d.shadowColor, cssVar(el, "--shadow", DEFAULT_CONFIG.shadowColor)),
		shadowDX: num(d.shadowDx, DEFAULT_CONFIG.shadowDX),
		shadowDY: num(d.shadowDy, DEFAULT_CONFIG.shadowDY),
		font: str(d.font, DEFAULT_CONFIG.font),
	};
}

const fontStr = (cfg: BannerConfig, px: number): string =>
	`900 ${px}px ${cfg.font}`;

/** Width of `text` drawn with `gap` between each character. */
function measureSpaced(
	c: CanvasRenderingContext2D,
	text: string,
	gap: number,
): number {
	let total = 0;
	for (let j = 0; j < text.length; j++)
		total += c.measureText(text[j]).width + (j < text.length - 1 ? gap : 0);
	return total;
}

/** Draw `text` centered on (cx, cy) with extra `gap` between characters. */
function drawSpacedText(
	c: CanvasRenderingContext2D,
	text: string,
	cx: number,
	cy: number,
	gap: number,
): void {
	c.textAlign = "left";
	let x = cx - measureSpaced(c, text, gap) / 2;
	for (let k = 0; k < text.length; k++) {
		c.fillText(text[k], x, cy);
		x += c.measureText(text[k]).width + gap;
	}
}

/** Alpha-composite (r,g,b) at coverage `a` onto RGBA buffer at offset `i`. */
function blend(
	buf: Uint8ClampedArray,
	i: number,
	a: number,
	r: number,
	g: number,
	b: number,
): void {
	buf[i] = buf[i] * (1 - a) + r * a;
	buf[i + 1] = buf[i + 1] * (1 - a) + g * a;
	buf[i + 2] = buf[i + 2] * (1 - a) + b * a;
	buf[i + 3] = Math.max(buf[i + 3], Math.round(a * 255));
}

/** Render the banner (image + composited title) into `canvas`. */
export function renderBanner(
	canvas: HTMLCanvasElement,
	cfg: BannerConfig,
	img: HTMLImageElement,
): void {
	const ctx = canvas.getContext("2d");
	if (!ctx) return;

	const dpr = window.devicePixelRatio || 1;
	const W = Math.round((canvas.parentElement?.clientWidth ?? 1092) * dpr);
	const H = Math.round(cfg.height * dpr);
	canvas.width = W;
	canvas.height = H;
	canvas.style.height = `${cfg.height}px`;

	// Offscreen W×H canvas with white ink, for rendering the glyph mask.
	const layer = (): CanvasRenderingContext2D => {
		const cv = document.createElement("canvas");
		cv.width = W;
		cv.height = H;
		const c = cv.getContext("2d") as CanvasRenderingContext2D;
		c.fillStyle = "#fff";
		c.textBaseline = "middle";
		return c;
	};

	// 1. Draw the banner image scaled to "cover".
	ctx.clearRect(0, 0, W, H);
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, W, H);
	const scale = Math.max(W / img.width, H / img.height);
	const dw = img.width * scale;
	const dh = img.height * scale;
	ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);

	// 2. Snapshot the image-only background; all title ink is sampled from this,
	//    so the yellow shadow drawn later can't disturb it.
	const cdata = ctx.getImageData(0, 0, W, H).data;

	// 3. Render the title to an offscreen mask to capture its alpha, wrapping
	//    onto its words if a single line overflows the available width.
	const mctx = layer();
	const availW = W * 0.92;
	const availH = H * 0.86;
	let fontPx = H * 0.5;
	const maxLineWidth = (px: number, lns: string[]): number => {
		mctx.font = fontStr(cfg, px);
		const g = px * 0.1;
		let m = 0;
		for (const line of lns) m = Math.max(m, measureSpaced(mctx, line, g));
		return m;
	};

	// Pick the narrow variant on small viewports, then split on explicit "\n"
	// line breaks. If a single line still overflows, fall back to space-wrap.
	const text =
		cfg.textNarrow && window.innerWidth <= cfg.narrowMax
			? cfg.textNarrow
			: cfg.text;
	let lines = text.split("\n");
	if (lines.length === 1 && maxLineWidth(fontPx, lines) > availW)
		lines = text.split(" ");
	const mw = maxLineWidth(fontPx, lines);
	if (mw > availW) fontPx *= availW / mw;
	const totalH = lines.length * (fontPx * 1.02);
	if (totalH > availH) fontPx *= availH / totalH;
	fontPx = Math.round(fontPx);

	const baseGap = fontPx * 0.1; // manual letter spacing for the blocky feel
	const lineH = fontPx * 1.02;
	const startY = H / 2 - (lines.length * lineH) / 2 + lineH / 2;

	mctx.font = fontStr(cfg, fontPx);

	// Justify multi-line titles: stretch each line's letter-spacing so every
	// line ends up the width of the widest line — needed because the title
	// font isn't monospaced, so e.g. "INEM" is narrower than "MARG".
	const naturalWidths = lines.map((l) => measureSpaced(mctx, l, baseGap));
	const targetWidth = Math.max(...naturalWidths);
	const lineGaps = lines.map((l, i) =>
		l.length > 1
			? baseGap + (targetWidth - naturalWidths[i]) / (l.length - 1)
			: baseGap,
	);

	for (let li = 0; li < lines.length; li++)
		drawSpacedText(mctx, lines[li], W / 2, startY + li * lineH, lineGaps[li]);
	const mdata = mctx.getImageData(0, 0, W, H).data;

	// 3b. Hot-yellow offset copy behind the text, for depth.
	if (cfg.shadow) {
		ctx.save();
		ctx.fillStyle = cfg.shadowColor;
		ctx.textBaseline = "middle";
		ctx.font = fontStr(cfg, fontPx);
		for (let si = 0; si < lines.length; si++)
			drawSpacedText(
				ctx,
				lines[si],
				W / 2 + cfg.shadowDX * dpr,
				startY + si * lineH + cfg.shadowDY * dpr,
				lineGaps[si],
			);
		ctx.restore();
	}

	// 4. Snapshot the banner (image + shadow) — the surface we composite the
	//    crisp title onto and put back.
	const bg = ctx.getImageData(0, 0, W, H);
	const bd = bg.data;

	// 5. Composite the title. Glyph alpha is used per-pixel so letter EDGES stay
	//    crisp, but the black/white ink is decided once per PIXEL-sized block
	//    (from image luminance), so the COLOR inside the text quantizes.
	const block = Math.max(1, Math.round(cfg.pixel * dpr));
	for (let by = 0; by < H; by += block) {
		for (let bx = 0; bx < W; bx += block) {
			const x1 = Math.min(bx + block, W);
			const y1 = Math.min(by + block, H);
			const ci =
				(Math.min(H - 1, (by + y1) >> 1) * W +
					Math.min(W - 1, (bx + x1) >> 1)) *
				4;
			const lum =
				0.299 * cdata[ci] + 0.587 * cdata[ci + 1] + 0.114 * cdata[ci + 2];
			const dark = lum < 128;
			let ink = (cfg.invert ? dark : !dark) ? 255 : 0;
			if (cdata[ci + 3] < cfg.alphaCutoff) ink = 0; // transparent -> black

			for (let yy = by; yy < y1; yy++) {
				for (let xx = bx; xx < x1; xx++) {
					const i = (yy * W + xx) * 4;
					const a = mdata[i + 3] / 255; // crisp per-pixel glyph coverage
					if (a === 0) continue;
					blend(bd, i, a, ink, ink, ink);
				}
			}
		}
	}
	ctx.putImageData(bg, 0, 0);
}

/** Load the image for one banner canvas and (re)render it on load + resize. */
export function initBanner(canvas: HTMLCanvasElement): void {
	const cfg = readConfig(canvas);
	if (!cfg.src) return;
	const img = new Image();
	img.onload = () => {
		const render = () => renderBanner(canvas, cfg, img);
		render();
		window.addEventListener("resize", render);
	};
	img.src = cfg.src;
}

// Auto-initialize every banner on the page. Astro `<script>` modules run after
// the DOM is parsed, so the canvases are already present.
for (const canvas of document.querySelectorAll<HTMLCanvasElement>(
	"canvas[data-banner]",
)) {
	initBanner(canvas);
}
