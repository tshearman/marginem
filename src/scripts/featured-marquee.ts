type MarqueeElement = HTMLDivElement & {
	dataset: DOMStringMap & {
		controlsReady?: string;
		repeatCount?: string;
		speed?: string;
	};
};

type ScrollDirection = -1 | 1;

const initFeaturedMarqueeControls = () => {
	const marqueeNodes =
		document.querySelectorAll<MarqueeElement>(".featured-marquee");
	for (const marquee of marqueeNodes) {
		if (marquee.dataset.controlsReady === "true") return;
		const viewport = marquee.querySelector<HTMLDivElement>(
			".featured-marquee__viewport",
		);
		const inner = marquee.querySelector<HTMLDivElement>(
			".featured-marquee__inner",
		);
		const prevBtn = marquee.querySelector<HTMLButtonElement>(
			"[data-control='prev']",
		);
		const nextBtn = marquee.querySelector<HTMLButtonElement>(
			"[data-control='next']",
		);
		if (!viewport || !inner || (!prevBtn && !nextBtn)) return;
		const viewportEl = viewport;
		const innerEl = inner;

		const repeatCount = Number(marquee.dataset.repeatCount) || 4;
		const baseWidth = innerEl.scrollWidth / repeatCount;
		const speed = Number(marquee.dataset.speed) || 45;
		let resumeTimer: number | undefined;
		let rafId: number | undefined;
		let lastTime: number | undefined;

		viewportEl.scrollLeft = baseWidth;
		alignToCard();

		function getCardWidth() {
			const card = marquee.querySelector<HTMLElement>(".featured-card");
			if (!card) return 220;
			const gap = Number.parseFloat(
				window.getComputedStyle(innerEl).columnGap ||
					window.getComputedStyle(innerEl).gap ||
					"0",
			);
			return card.offsetWidth + gap;
		}

		function getCenterOffset() {
			const card = marquee.querySelector<HTMLElement>(".featured-card");
			if (!card) return 0;
			return Math.max((viewportEl.clientWidth - card.offsetWidth) / 2, 0);
		}

		function normalizeScroll() {
			const maxScroll = innerEl.scrollWidth - viewportEl.clientWidth;
			if (viewportEl.scrollLeft <= baseWidth * 0.5) {
				viewportEl.scrollLeft += baseWidth;
			} else if (viewportEl.scrollLeft >= maxScroll - baseWidth * 0.5) {
				viewportEl.scrollLeft -= baseWidth;
			}
		}

		function alignToCard() {
			const cardWidth = getCardWidth();
			if (!cardWidth) return;
			const centerOffset = getCenterOffset();
			const index = Math.round(
				(viewportEl.scrollLeft + centerOffset) / cardWidth,
			);
			const target = index * cardWidth - centerOffset;
			viewportEl.scrollLeft = target;
		}

		const step = (timestamp: number) => {
			if (!lastTime) lastTime = timestamp;
			const delta = (timestamp - lastTime) / 1000;
			lastTime = timestamp;
			viewportEl.scrollLeft += speed * delta;
			normalizeScroll();
			rafId = requestAnimationFrame(step);
		};

		const startAutoScroll = () => {
			if (rafId) return;
			lastTime = undefined;
			rafId = requestAnimationFrame(step);
		};

		const stopAutoScroll = () => {
			if (!rafId) return;
			cancelAnimationFrame(rafId);
			rafId = undefined;
		};

		const resumeAfterDelay = () => {
			if (resumeTimer) clearTimeout(resumeTimer);
			resumeTimer = window.setTimeout(startAutoScroll, 1400);
		};

		const scrollToCard = (direction: ScrollDirection) => {
			stopAutoScroll();
			const cardWidth = getCardWidth();
			if (!cardWidth) return;
			const centerOffset = getCenterOffset();
			const currentIndex = Math.round(
				(viewportEl.scrollLeft + centerOffset) / cardWidth,
			);
			const targetIndex = currentIndex + direction;
			const target = targetIndex * cardWidth - centerOffset;
			viewportEl.scrollTo({ left: target, behavior: "smooth" });
			window.setTimeout(() => {
				normalizeScroll();
				alignToCard();
			}, 350);
			resumeAfterDelay();
		};

		prevBtn?.addEventListener("click", () => scrollToCard(-1));
		nextBtn?.addEventListener("click", () => scrollToCard(1));
		marquee.addEventListener("mouseenter", stopAutoScroll);
		marquee.addEventListener("mouseleave", resumeAfterDelay);
		marquee.dataset.controlsReady = "true";
		startAutoScroll();
	}
};

document.addEventListener("DOMContentLoaded", initFeaturedMarqueeControls);
document.addEventListener("astro:page-load", initFeaturedMarqueeControls);
