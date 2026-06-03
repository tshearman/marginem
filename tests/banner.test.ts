// @vitest-environment happy-dom

import { beforeEach, describe, expect, it, vi } from "vitest";

/* -------------------------------------------------------------------------- *\
 * Canvas 2D context stub
 *
 * happy-dom doesn't ship a working canvas renderer. We replace
 * HTMLCanvasElement.prototype.getContext with a fake that records the sequence
 * of operations and snapshots context state (composite op, smoothing) at
 * drawImage time — that's enough to verify the GPU-composite pipeline does
 * the right thing in the right order.
\* -------------------------------------------------------------------------- */

type DrawState = {
	composite: GlobalCompositeOperation;
	smoothing: boolean;
};
type Call = { method: string; args: unknown[]; state?: DrawState };
type FakeCtx = {
	calls: Call[];
	canvas: HTMLCanvasElement | null;
	fillStyle: string;
	font: string;
	textAlign: CanvasTextAlign;
	textBaseline: CanvasTextBaseline;
	imageSmoothingEnabled: boolean;
	globalCompositeOperation: GlobalCompositeOperation;
	save: () => void;
	restore: () => void;
	clearRect: (...a: unknown[]) => void;
	fillRect: (...a: unknown[]) => void;
	drawImage: (...a: unknown[]) => void;
	fillText: (...a: unknown[]) => void;
	measureText: (s: string) => { width: number };
	getImageData: (x: number, y: number, w: number, h: number) => ImageData;
	putImageData: (...a: unknown[]) => void;
};

const ctxMap = new WeakMap<HTMLCanvasElement, FakeCtx>();
let ctxList: FakeCtx[] = [];

const makeFakeCtx = (): FakeCtx => {
	const stack: Array<{
		composite: GlobalCompositeOperation;
		smoothing: boolean;
	}> = [];
	// biome-ignore lint/style/useConst: forward reference for closures.
	let ctx: FakeCtx;
	const log = (method: string, args: unknown[] = [], snapshotState = false) => {
		const call: Call = { method, args };
		if (snapshotState)
			call.state = {
				composite: ctx.globalCompositeOperation,
				smoothing: ctx.imageSmoothingEnabled,
			};
		ctx.calls.push(call);
	};
	ctx = {
		calls: [],
		canvas: null,
		fillStyle: "",
		font: "",
		textAlign: "left",
		textBaseline: "alphabetic",
		imageSmoothingEnabled: true,
		globalCompositeOperation: "source-over",
		save: () => {
			stack.push({
				composite: ctx.globalCompositeOperation,
				smoothing: ctx.imageSmoothingEnabled,
			});
			log("save");
		},
		restore: () => {
			const s = stack.pop();
			if (s) {
				ctx.globalCompositeOperation = s.composite;
				ctx.imageSmoothingEnabled = s.smoothing;
			}
			log("restore");
		},
		clearRect: (...a) => log("clearRect", a),
		fillRect: (...a) => log("fillRect", a),
		// Width proportional to length keeps layout math deterministic.
		drawImage: (...a) => log("drawImage", a, true),
		fillText: (...a) => log("fillText", a),
		measureText: (s: string) => ({ width: s.length * 10 }),
		getImageData: (_x, _y, w, h) =>
			({
				width: w,
				height: h,
				data: new Uint8ClampedArray(w * h * 4),
				colorSpace: "srgb" as PredefinedColorSpace,
			}) as ImageData,
		putImageData: (...a) => log("putImageData", a),
	};
	return ctx;
};

const originalGetContext = HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.getContext = function (
	this: HTMLCanvasElement,
	type: string,
) {
	if (type !== "2d") return null;
	let ctx = ctxMap.get(this);
	if (!ctx) {
		ctx = makeFakeCtx();
		ctx.canvas = this;
		ctxMap.set(this, ctx);
		ctxList.push(ctx);
	}
	return ctx as unknown as CanvasRenderingContext2D;
} as typeof originalGetContext;

// Import AFTER the stub is installed. There are no canvases in the DOM at
// import time, so the module's auto-init loop is a no-op.
import {
	DEFAULT_CONFIG,
	initBanner,
	renderBanner,
	type BannerConfig,
} from "../src/scripts/banner";

const makeImg = (w = 200, h = 100): HTMLImageElement =>
	({
		width: w,
		height: h,
		complete: true,
		naturalWidth: w,
	}) as unknown as HTMLImageElement;

const cfg = (overrides: Partial<BannerConfig> = {}): BannerConfig => ({
	...DEFAULT_CONFIG,
	src: "/banners/test.webp",
	text: "TEST",
	height: 100,
	pixel: 2,
	...overrides,
});

const mountCanvas = (parentWidth = 400): HTMLCanvasElement => {
	const canvas = document.createElement("canvas");
	const parent = document.createElement("div");
	Object.defineProperty(parent, "clientWidth", {
		configurable: true,
		value: parentWidth,
	});
	parent.appendChild(canvas);
	document.body.appendChild(parent);
	return canvas;
};

beforeEach(() => {
	ctxList = [];
	document.body.innerHTML = "";
	Object.defineProperty(window, "devicePixelRatio", {
		configurable: true,
		value: 1,
	});
	Object.defineProperty(window, "innerWidth", {
		configurable: true,
		value: 1200,
	});
	(window as unknown as { __bannerImgs?: unknown }).__bannerImgs = undefined;
});

describe("renderBanner — pipeline", () => {
	it("creates exactly three canvases: main, mask, tiny", () => {
		const canvas = mountCanvas();
		renderBanner(canvas, cfg(), makeImg());
		expect(ctxList).toHaveLength(3);
	});

	it("paints the banner image to the main canvas before any text", () => {
		const canvas = mountCanvas();
		renderBanner(canvas, cfg({ shadow: false }), makeImg());
		const [main] = ctxList;
		const idxFillRect = main.calls.findIndex((c) => c.method === "fillRect");
		const idxDrawImg = main.calls.findIndex((c) => c.method === "drawImage");
		expect(idxFillRect).toBeGreaterThanOrEqual(0);
		expect(idxDrawImg).toBeGreaterThan(idxFillRect);
	});

	it("paints the masked-ink text last so it sits on top of image + shadow", () => {
		const canvas = mountCanvas();
		renderBanner(canvas, cfg({ shadow: true }), makeImg());
		const [main, mask] = ctxList;
		const draws = main.calls.filter((c) => c.method === "drawImage");
		// Two draws on main: (1) banner image, (2) final masked text from mask canvas.
		expect(draws).toHaveLength(2);
		const lastDraw = draws[draws.length - 1];
		expect(lastDraw.args[0]).toBe(mask.canvas);
	});

	it("constrains ink to glyph mask via source-in + nearest-neighbor upscale", () => {
		const canvas = mountCanvas();
		renderBanner(canvas, cfg(), makeImg());
		const [, mask, tiny] = ctxList;
		const inkDraw = mask.calls.find(
			(c) => c.method === "drawImage" && c.args[0] === tiny.canvas,
		);
		expect(inkDraw).toBeTruthy();
		expect(inkDraw?.state?.composite).toBe("source-in");
		expect(inkDraw?.state?.smoothing).toBe(false);
	});

	it("restores composite + smoothing on the mask context after the composite", () => {
		const canvas = mountCanvas();
		renderBanner(canvas, cfg(), makeImg());
		const [, mask] = ctxList;
		// Last operation on the mask context restored state, leaving the
		// cached context clean for the next render's fillText calls.
		expect(mask.globalCompositeOperation).toBe("source-over");
		expect(mask.imageSmoothingEnabled).toBe(true);
	});

	it("thresholds the tiny canvas to pure black or white ink", () => {
		const canvas = mountCanvas();
		renderBanner(canvas, cfg(), makeImg());
		const [, , tiny] = ctxList;
		// One drawImage (the source image downsampled), one putImageData
		// (the thresholded ink layer).
		const methods = tiny.calls.map((c) => c.method);
		expect(methods).toEqual(["drawImage", "putImageData"]);
		const put = tiny.calls.find((c) => c.method === "putImageData");
		const imageData = put?.args[0] as ImageData;
		const d = imageData.data;
		for (let i = 0; i < d.length; i += 4) {
			expect(d[i]).toBe(d[i + 1]);
			expect(d[i + 1]).toBe(d[i + 2]);
			expect(d[i] === 0 || d[i] === 255).toBe(true);
			expect(d[i + 3]).toBe(255);
		}
	});

	it("skips the shadow draw when cfg.shadow is false", () => {
		const canvas = mountCanvas();
		renderBanner(canvas, cfg({ shadow: false }), makeImg());
		const [main] = ctxList;
		expect(main.calls.filter((c) => c.method === "fillText")).toHaveLength(0);
	});

	it("draws the shadow on the main canvas when cfg.shadow is true", () => {
		const canvas = mountCanvas();
		renderBanner(canvas, cfg({ shadow: true, text: "ABCD" }), makeImg());
		const [main] = ctxList;
		expect(
			main.calls.filter((c) => c.method === "fillText").length,
		).toBeGreaterThan(0);
	});
});

describe("renderBanner — layout", () => {
	it("uses textNarrow when window.innerWidth ≤ narrowMax", () => {
		Object.defineProperty(window, "innerWidth", {
			configurable: true,
			value: 400,
		});
		const canvas = mountCanvas(300);
		renderBanner(
			canvas,
			cfg({
				text: "WIDE",
				textNarrow: "NA\nRR",
				narrowMax: 500,
				shadow: false,
			}),
			makeImg(),
		);
		const [, mask] = ctxList;
		const chars = mask.calls
			.filter((c) => c.method === "fillText")
			.map((c) => c.args[0] as string)
			.join("");
		expect(chars).toBe("NARR");
	});

	it("uses cfg.text when window.innerWidth > narrowMax", () => {
		Object.defineProperty(window, "innerWidth", {
			configurable: true,
			value: 1200,
		});
		const canvas = mountCanvas();
		renderBanner(
			canvas,
			cfg({
				text: "WIDE",
				textNarrow: "NA\nRR",
				narrowMax: 500,
				shadow: false,
			}),
			makeImg(),
		);
		const [, mask] = ctxList;
		const chars = mask.calls
			.filter((c) => c.method === "fillText")
			.map((c) => c.args[0] as string)
			.join("");
		expect(chars).toBe("WIDE");
	});

	it("splits text on literal newlines", () => {
		const canvas = mountCanvas();
		renderBanner(
			canvas,
			cfg({ text: "AB\nCD", shadow: false }),
			makeImg(),
		);
		const [, mask] = ctxList;
		const fillTexts = mask.calls.filter((c) => c.method === "fillText");
		// 4 characters total across 2 lines, drawn one char at a time.
		expect(fillTexts).toHaveLength(4);
		// All characters drawn, regardless of which line.
		const chars = fillTexts.map((c) => c.args[0] as string).join("");
		expect(chars).toBe("ABCD");
		// The two lines have distinct y-coordinates.
		const ys = new Set(fillTexts.map((c) => c.args[2]));
		expect(ys.size).toBe(2);
	});
});

describe("renderBanner — caching", () => {
	it("reuses the same mask + tiny canvases across re-renders", () => {
		const canvas = mountCanvas();
		renderBanner(canvas, cfg(), makeImg());
		expect(ctxList).toHaveLength(3);
		const [main1, mask1, tiny1] = ctxList;
		renderBanner(canvas, cfg(), makeImg());
		expect(ctxList).toHaveLength(3); // no new offscreen canvases
		const [main2, mask2, tiny2] = ctxList;
		expect(main2).toBe(main1);
		expect(mask2).toBe(mask1);
		expect(tiny2).toBe(tiny1);
	});
});

describe("initBanner", () => {
	it("returns early when src is missing", () => {
		const canvas = document.createElement("canvas");
		canvas.dataset.text = "X";
		initBanner(canvas);
		expect(ctxList).toHaveLength(0);
	});

	it("consumes a pre-warmed image from window.__bannerImgs", async () => {
		const canvas = mountCanvas();
		canvas.dataset.src = "/banners/preload.webp";
		canvas.dataset.text = "PRE";
		canvas.dataset.height = "100";

		const img = makeImg();
		const decode = vi.fn(() => Promise.resolve());
		(img as unknown as { decode: () => Promise<void> }).decode = decode;
		(
			window as unknown as { __bannerImgs: Record<string, HTMLImageElement> }
		).__bannerImgs = { "/banners/preload.webp": img };

		initBanner(canvas);
		// decode() runs first; wait for its microtask chain to resolve so the
		// follow-up render fires.
		await Promise.resolve();
		await Promise.resolve();
		await Promise.resolve();

		expect(decode).toHaveBeenCalledTimes(1);
		const mainCtx = ctxMap.get(canvas);
		expect(mainCtx).toBeTruthy();
		expect(
			mainCtx?.calls.some((c) => c.method === "drawImage"),
		).toBe(true);
	});

	it("falls back to creating a new Image with async decoding when no preload", () => {
		const canvas = mountCanvas();
		canvas.dataset.src = "/banners/fresh.webp";
		canvas.dataset.text = "FRESH";
		canvas.dataset.height = "100";

		const created: HTMLImageElement[] = [];
		const RealImage = window.Image;
		class StubImage {
			width = 0;
			height = 0;
			complete = false;
			naturalWidth = 0;
			decoding = "auto";
			fetchPriority = "auto";
			src = "";
			addEventListener = vi.fn();
			constructor() {
				created.push(this as unknown as HTMLImageElement);
			}
		}
		(window as unknown as { Image: typeof Image }).Image =
			StubImage as unknown as typeof Image;
		try {
			initBanner(canvas);
		} finally {
			(window as unknown as { Image: typeof Image }).Image = RealImage;
		}
		expect(created).toHaveLength(1);
		const img = created[0] as unknown as {
			src: string;
			decoding: string;
			fetchPriority: string;
			addEventListener: ReturnType<typeof vi.fn>;
		};
		expect(img.src).toBe("/banners/fresh.webp");
		expect(img.decoding).toBe("async");
		expect(img.fetchPriority).toBe("high");
		// Image not complete yet → load listener wired up, render hasn't fired.
		expect(img.addEventListener).toHaveBeenCalledWith(
			"load",
			expect.any(Function),
			expect.objectContaining({ once: true }),
		);
	});
});

describe("renderBanner — RenderOptions overrides (Node parity)", () => {
	it("uses option.width, option.dpr and option.viewportWidth instead of window", () => {
		// Canvas with NO parent, NO style — simulates @napi-rs/canvas in Node.
		const fakeCanvas = document.createElement("canvas");
		// Force conditions where window.* values are wrong for our target:
		Object.defineProperty(window, "innerWidth", {
			configurable: true,
			value: 2000, // would pick wide text by default
		});
		Object.defineProperty(window, "devicePixelRatio", {
			configurable: true,
			value: 1,
		});
		renderBanner(
			fakeCanvas,
			cfg({
				text: "WIDE",
				textNarrow: "N\nR",
				narrowMax: 500,
				shadow: false,
			}),
			makeImg(),
			{
				dpr: 2,
				width: 1440,
				viewportWidth: 400, // ≤ narrowMax → should pick textNarrow
			},
		);
		// Main canvas was sized by the override, not parent.clientWidth.
		expect(fakeCanvas.width).toBe(1440);
		const [, mask] = ctxList;
		const chars = mask.calls
			.filter((c) => c.method === "fillText")
			.map((c) => c.args[0] as string)
			.join("");
		// Narrow text was selected via the viewportWidth override.
		expect(chars).toBe("NR");
	});

	it("uses option.createCanvas for offscreen mask + tiny", () => {
		const main = document.createElement("canvas");
		const factoryCalls: Array<[number, number]> = [];
		const factory = (w: number, h: number) => {
			factoryCalls.push([w, h]);
			const c = document.createElement("canvas");
			c.width = w;
			c.height = h;
			return c;
		};
		renderBanner(main, cfg(), makeImg(), {
			dpr: 1,
			width: 400,
			viewportWidth: 1200,
			createCanvas: factory,
		});
		// Factory invoked at least twice (mask + tiny) — exact count is one per
		// slot when the cache is first populated.
		expect(factoryCalls.length).toBeGreaterThanOrEqual(2);
	});
});

