// Hydrates each `[data-force-graph]` stage rendered by ForceGraph.astro.
// Colours are CSS variables, so the graph follows theme changes on its own.

import {
	drag,
	forceCenter,
	forceLink,
	forceManyBody,
	forceSimulation,
	forceX,
	forceY,
	select,
} from "d3";
import type { SimulationNodeDatum } from "d3";

type GraphNode = SimulationNodeDatum & {
	id: string;
	url?: string;
	tooltipId?: string;
	[key: string]: unknown;
};

type GraphLink = {
	source: string | GraphNode;
	target: string | GraphNode;
};

type GraphPayload = {
	nodes?: GraphNode[];
	links?: GraphLink[];
	height?: number;
	labelKey?: string;
};

const BOUNDS_PADDING = 18;

function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

// Keep nodes inside the stage, bouncing them (at half speed) off the edges.
function keepNodesInBounds(nodes: GraphNode[], width: number, height: number) {
	const minX = BOUNDS_PADDING;
	const maxX = Math.max(BOUNDS_PADDING, width - BOUNDS_PADDING);
	const minY = BOUNDS_PADDING;
	const maxY = Math.max(BOUNDS_PADDING, height - BOUNDS_PADDING);

	for (const node of nodes) {
		if (typeof node.x === "number") {
			const clampedX = clamp(node.x, minX, maxX);
			if (clampedX !== node.x) {
				node.x = clampedX;
				const vx = node.vx ?? 0;
				node.vx = clampedX <= minX ? Math.abs(vx) * 0.5 : -Math.abs(vx) * 0.5;
			}
		}
		if (typeof node.y === "number") {
			const clampedY = clamp(node.y, minY, maxY);
			if (clampedY !== node.y) {
				node.y = clampedY;
				const vy = node.vy ?? 0;
				node.vy = clampedY <= minY ? Math.abs(vy) * 0.5 : -Math.abs(vy) * 0.5;
			}
		}
	}
}

function hydrateGraph(el: HTMLElement) {
	const payload = JSON.parse(el.dataset.forceGraph ?? "{}") as GraphPayload;
	const nodes = payload.nodes ?? [];
	const links = payload.links ?? [];
	const labelKey = payload.labelKey ?? "id";
	let width = el.clientWidth || 640;
	let height = el.clientHeight || payload.height || 420;

	// Move the tooltip layer to <body> so its fixed positioning is always
	// relative to the viewport, whatever the graph's ancestors do.
	const tooltips = new Map<string, HTMLElement>();
	const tooltipLayer = document.querySelector<HTMLElement>(
		`[data-force-tooltip-owner="${el.id}"]`,
	);
	if (tooltipLayer) {
		document.body.appendChild(tooltipLayer);
		for (const tip of tooltipLayer.querySelectorAll<HTMLElement>(
			"[data-force-tooltip-id]",
		)) {
			tooltips.set(tip.dataset.forceTooltipId ?? "", tip);
		}
	}

	let tooltip: HTMLElement | undefined;
	const setTooltipVisible = (visible: boolean) => {
		if (!tooltip) return;
		tooltip.style.opacity = visible ? "1" : "0";
		tooltip.style.visibility = visible ? "visible" : "hidden";
	};
	const moveTooltip = (event: PointerEvent) => {
		if (!tooltip) return;
		tooltip.style.transform = `translate(${event.clientX + 16}px, ${
			event.clientY + 16
		}px)`;
	};

	const svg = select(el)
		.append("svg")
		.attr("viewBox", `0 0 ${width} ${height}`)
		.attr("width", "100%")
		.attr("height", "100%")
		.attr("role", "img")
		.attr("aria-label", "Force-directed graph");

	const link = svg
		.append("g")
		.attr("stroke", "var(--ink)")
		.attr("stroke-opacity", 0.45)
		.attr("stroke-width", 1.5)
		.selectAll("line")
		.data(links)
		.join("line");

	const simulation = forceSimulation(nodes)
		.force(
			"link",
			forceLink<GraphNode, GraphLink>(links)
				.id((d) => d.id)
				.strength(0.25),
		)
		.force("charge", forceManyBody().strength(-500));
	const centerForces = () => {
		simulation
			.force("center", forceCenter(width / 2, height / 2))
			.force("x", forceX(width / 2).strength(0.05))
			.force("y", forceY(height / 2).strength(0.05));
	};
	centerForces();

	// One <g> per node holds its circle and label, so hover, click and drag
	// cover both.
	const node = svg
		.append("g")
		.selectAll<SVGGElement, GraphNode>("g")
		.data(nodes)
		.join("g")
		.style("cursor", (d) => (d.url ? "pointer" : "default"))
		.on("click", (_event, d) => {
			if (d.url) window.location.assign(d.url);
		})
		.on("pointerenter", (event: PointerEvent, d) => {
			tooltip = d.tooltipId ? tooltips.get(d.tooltipId) : undefined;
			moveTooltip(event);
			setTooltipVisible(true);
		})
		.on("pointermove", moveTooltip)
		.on("pointerleave", () => {
			setTooltipVisible(false);
			tooltip = undefined;
		})
		.call(
			drag<SVGGElement, GraphNode>()
				.on("start", (event, d) => {
					if (!event.active) simulation.alphaTarget(0.3).restart();
					d.fx = d.x;
					d.fy = d.y;
				})
				.on("drag", (event, d) => {
					d.fx = event.x;
					d.fy = event.y;
				})
				.on("end", (event, d) => {
					if (!event.active) simulation.alphaTarget(0);
					d.fx = null;
					d.fy = null;
				}),
		);

	node
		.append("circle")
		.attr("r", 9)
		.attr("fill", (d) =>
			d.id.startsWith("folder:") ? "var(--highlight)" : "var(--paper)",
		)
		.attr("stroke", "var(--ink)")
		.attr("stroke-width", 2.5);

	if (nodes.length <= 25) {
		node
			.append("text")
			.attr("x", 12)
			.attr("y", 4)
			.attr("font-size", "12px")
			.attr("fill", "var(--ink)")
			.attr("paint-order", "stroke")
			.attr("stroke", "var(--paper)")
			.attr("stroke-width", 3)
			.text((d) => {
				const label = d[labelKey];
				return typeof label === "string" || typeof label === "number"
					? String(label)
					: d.id;
			});
	}

	simulation.on("tick", () => {
		keepNodesInBounds(nodes, width, height);
		link
			.attr("x1", (d) => (d.source as GraphNode).x ?? 0)
			.attr("y1", (d) => (d.source as GraphNode).y ?? 0)
			.attr("x2", (d) => (d.target as GraphNode).x ?? 0)
			.attr("y2", (d) => (d.target as GraphNode).y ?? 0);
		node.attr("transform", (d) => `translate(${d.x ?? 0}, ${d.y ?? 0})`);
	});

	new ResizeObserver(([entry]) => {
		const nextWidth = Math.round(entry.contentRect.width);
		const nextHeight = Math.round(entry.contentRect.height);
		if (!nextWidth || !nextHeight) return;
		if (nextWidth === width && nextHeight === height) return;
		width = nextWidth;
		height = nextHeight;
		svg.attr("viewBox", `0 0 ${width} ${height}`);
		centerForces();
		simulation.alpha(0.6).restart();
	}).observe(el);
}

// Module scripts run after the document is parsed, so the DOM is ready.
for (const el of document.querySelectorAll<HTMLElement>("[data-force-graph]")) {
	try {
		hydrateGraph(el);
	} catch (error) {
		console.error("Failed to initialize force graph", error);
	}
}
