import {
	drag,
	forceCenter,
	forceLink,
	forceManyBody,
	forceSimulation,
	forceX,
	forceY,
	scaleOrdinal,
	schemeTableau10,
	select,
} from "d3";
import type { D3DragEvent, SimulationNodeDatum } from "d3";

type GraphNode = SimulationNodeDatum & {
	id: string;
	group?: number;
	url?: string;
	tooltipId?: string;
};

type GraphLink = {
	source: string | GraphNode;
	target: string | GraphNode;
	value?: number;
};

type GraphPayload = {
	nodes: GraphNode[];
	links: GraphLink[];
	width?: number;
	height?: number;
	labelKey?: string;
};

const DEFAULT_WIDTH = 640;
const DEFAULT_HEIGHT = 420;
const BOUNDS_PADDING = 18;

function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

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
				const vx = typeof node.vx === "number" ? node.vx : 0;
				node.vx = clampedX <= minX ? Math.abs(vx) * 0.5 : -Math.abs(vx) * 0.5;
			}
		}
		if (typeof node.y === "number") {
			const clampedY = clamp(node.y, minY, maxY);
			if (clampedY !== node.y) {
				node.y = clampedY;
				const vy = typeof node.vy === "number" ? node.vy : 0;
				node.vy = clampedY <= minY ? Math.abs(vy) * 0.5 : -Math.abs(vy) * 0.5;
			}
		}
	}
}

function labelFor(node: GraphNode, labelKey?: string) {
	if (!labelKey) return node.id;
	const value = (node as unknown as Record<string, unknown>)[labelKey];
	return typeof value === "string" || typeof value === "number"
		? String(value)
		: node.id;
}

function withAlpha(colorValue: string, alpha: number) {
	if (!colorValue.startsWith("#")) return colorValue;
	const hex = colorValue.slice(1);
	const normalized =
		hex.length === 3
			? hex
					.split("")
					.map((c) => c + c)
					.join("")
			: hex;
	if (normalized.length !== 6) return colorValue;
	const r = Number.parseInt(normalized.slice(0, 2), 16);
	const g = Number.parseInt(normalized.slice(2, 4), 16);
	const b = Number.parseInt(normalized.slice(4, 6), 16);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function navigateTo(node: GraphNode) {
	if (!node.url) return;
	window.location.assign(node.url);
}

function positionTooltip(tooltip: HTMLElement, event: PointerEvent) {
	const x = event.clientX;
	const y = event.clientY;
	tooltip.style.transform = `translate(${x + 16}px, ${y + 16}px)`;
}

function hydrateGraph(el: HTMLElement) {
	const raw = el.getAttribute("data-force-graph");
	if (!raw) return;

	try {
		const payload = JSON.parse(raw) as GraphPayload;
		const nodes = payload.nodes ?? [];
		const links = payload.links ?? [];
		const fallbackWidth = payload.width ?? DEFAULT_WIDTH;
		const fallbackHeight = payload.height ?? DEFAULT_HEIGHT;
		let width = el.clientWidth || fallbackWidth;
		let height = el.clientHeight || fallbackHeight;
		const labelKey = payload.labelKey ?? "id";

		el.removeAttribute("data-force-graph");
		el.innerHTML = "";

		const graphId = el.id;
		const tooltipLayer = document.querySelector<HTMLElement>(
			`[data-force-tooltip-owner="${graphId}"]`,
		);
		if (tooltipLayer && !tooltipLayer.dataset.portalized) {
			tooltipLayer.dataset.portalized = "true";
			document.body.appendChild(tooltipLayer);
		}

		const tooltipNodes = document.querySelectorAll<HTMLElement>(
			`[data-force-tooltip-owner="${graphId}"] [data-force-tooltip-id]`,
		);
		const tooltipMap = new Map<string, HTMLElement>();
		for (const tooltipEl of tooltipNodes) {
			const id = tooltipEl.dataset.forceTooltipId;
			if (id) tooltipMap.set(id, tooltipEl);
		}

		const svg = select(el)
			.append("svg")
			.attr("viewBox", `0 0 ${width} ${height}`)
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("role", "img")
			.attr("aria-label", "Force-directed graph");

		const color = scaleOrdinal<string, string>(schemeTableau10);

		const link = svg
			.append("g")
			.attr("stroke", "rgba(15, 23, 42, 0.25)")
			.attr("stroke-width", 1.4)
			.selectAll("line")
			.data(links)
			.join("line");

		const simulation = forceSimulation(nodes);

		let activeTooltip: HTMLElement | null = null;

		const showTooltip = (event: PointerEvent, nodeData: GraphNode) => {
			if (!nodeData.tooltipId) return;
			const tooltip = tooltipMap.get(nodeData.tooltipId);
			if (!tooltip) return;
			if (activeTooltip && activeTooltip !== tooltip) {
				activeTooltip.style.opacity = "0";
				activeTooltip.style.visibility = "hidden";
			}
			activeTooltip = tooltip;
			tooltip.style.opacity = "1";
			tooltip.style.visibility = "visible";
			positionTooltip(tooltip, event);
		};

		const moveTooltip = (event: PointerEvent, nodeData: GraphNode) => {
			if (!nodeData.tooltipId || !activeTooltip) return;
			if (activeTooltip.dataset.forceTooltipId !== nodeData.tooltipId) return;
			positionTooltip(activeTooltip, event);
		};

		const hideTooltip = (nodeData: GraphNode) => {
			if (!nodeData.tooltipId || !activeTooltip) return;
			if (activeTooltip.dataset.forceTooltipId !== nodeData.tooltipId) return;
			activeTooltip.style.opacity = "0";
			activeTooltip.style.visibility = "hidden";
			activeTooltip = null;
		};

		const node = svg
			.append("g")
			.selectAll<SVGGElement, GraphNode>("g")
			.data(nodes)
			.join("g")
			.style("cursor", (d: GraphNode) => (d.url ? "pointer" : "default"))
			.on("click", (_event: MouseEvent, d: GraphNode) => {
				navigateTo(d);
			})
			.on("pointerenter", (event: PointerEvent, d: GraphNode) => {
				showTooltip(event, d);
			})
			.on("pointermove", (event: PointerEvent, d: GraphNode) => {
				moveTooltip(event, d);
			})
			.on("pointerleave", (_event: PointerEvent, d: GraphNode) => {
				hideTooltip(d);
			})
			.call(
				drag<SVGGElement, GraphNode>()
					.on(
						"start",
						(
							event: D3DragEvent<SVGGElement, GraphNode, GraphNode>,
							d: GraphNode,
						) => {
							if (!event.active) simulation.alphaTarget(0.3).restart();
							d.fx = d.x;
							d.fy = d.y;
						},
					)
					.on(
						"drag",
						(
							event: D3DragEvent<SVGGElement, GraphNode, GraphNode>,
							d: GraphNode,
						) => {
							d.fx = event.x;
							d.fy = event.y;
						},
					)
					.on(
						"end",
						(
							event: D3DragEvent<SVGGElement, GraphNode, GraphNode>,
							d: GraphNode,
						) => {
							if (!event.active) simulation.alphaTarget(0);
							d.fx = null;
							d.fy = null;
						},
					),
			);

		node.append("circle").attr("r", 9).attr("fill", "#f8fafc");

		node
			.append("circle")
			.attr("r", 9)
			.attr("fill", (d: GraphNode) => {
				const stroke = color(String(d.group ?? 0));
				if (d.id.startsWith("folder:")) {
					return withAlpha(stroke, 1.0);
				}
				return "#f8fafc";
			})
			.attr("stroke", (d: GraphNode) => color(String(d.group ?? 0)))
			.attr("stroke-width", 2);

		const showLabels = nodes.length <= 25;
		const labels = showLabels
			? svg
					.append("g")
					.attr("font-size", "12px")
					.attr("fill", "rgba(15, 23, 42, 0.8)")
					.attr("paint-order", "stroke")
					.attr("stroke", "rgba(255, 255, 255, 0.95)")
					.attr("stroke-width", 3)
					.selectAll("text")
					.data(nodes)
					.join("text")
					.style("cursor", (d: GraphNode) => (d.url ? "pointer" : "default"))
					.on("click", (_event: MouseEvent, d: GraphNode) => {
						navigateTo(d);
					})
					.on("pointerenter", (event: PointerEvent, d: GraphNode) => {
						showTooltip(event, d);
					})
					.on("pointermove", (event: PointerEvent, d: GraphNode) => {
						moveTooltip(event, d);
					})
					.on("pointerleave", (_event: MouseEvent, d: GraphNode) => {
						hideTooltip(d);
					})
					.text((d: GraphNode) => labelFor(d, labelKey))
			: null;

		const updateForces = () => {
			simulation
				.force(
					"link",
					forceLink<GraphNode, GraphLink>(links)
						.id((d: GraphNode) => d.id)
						.strength(0.25),
				)
				.force("charge", forceManyBody().strength(-500))
				.force("center", forceCenter(width / 2, height / 2))
				.force("x", forceX(width / 2).strength(0.05))
				.force("y", forceY(height / 2).strength(0.05));
		};

		updateForces();

		simulation.on("tick", () => {
			keepNodesInBounds(nodes, width, height);

			link
				.attr("x1", (d: GraphLink) => (d.source as GraphNode).x ?? 0)
				.attr("y1", (d: GraphLink) => (d.source as GraphNode).y ?? 0)
				.attr("x2", (d: GraphLink) => (d.target as GraphNode).x ?? 0)
				.attr("y2", (d: GraphLink) => (d.target as GraphNode).y ?? 0);

			node.attr(
				"transform",
				(d: GraphNode) => `translate(${d.x ?? 0}, ${d.y ?? 0})`,
			);

			if (labels) {
				labels
					.attr("x", (d: GraphNode) => (d.x ?? 0) + 12)
					.attr("y", (d: GraphNode) => (d.y ?? 0) + 4);
			}
		});

		if ("ResizeObserver" in window) {
			const observer = new ResizeObserver((entries) => {
				for (const entry of entries) {
					const nextWidth = Math.round(entry.contentRect.width);
					const nextHeight = Math.round(entry.contentRect.height);
					if (!nextWidth || !nextHeight) continue;
					width = nextWidth;
					height = nextHeight;
					svg.attr("viewBox", `0 0 ${width} ${height}`);
					updateForces();
					simulation.alpha(0.6).restart();
				}
			});
			observer.observe(el);
		}
	} catch (error) {
		console.error("Failed to initialize force graph", error);
	}
}

function init() {
	const nodes = document.querySelectorAll<HTMLElement>("[data-force-graph]");
	for (const el of nodes) {
		hydrateGraph(el);
	}
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
	init();
}
