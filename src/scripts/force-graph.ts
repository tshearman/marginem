import {
  drag,
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
  scaleOrdinal,
  schemeTableau10,
  select,
} from "d3";
import type { SimulationNodeDatum } from "d3";

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

function labelFor(node: GraphNode, labelKey?: string) {
  if (!labelKey) return node.id;
  const value = (node as Record<string, unknown>)[labelKey];
  return typeof value === "string" || typeof value === "number"
    ? String(value)
    : node.id;
}

function navigateTo(node: GraphNode) {
  if (!node.url) return;
  window.location.assign(node.url);
}

function positionTooltip(
  root: HTMLElement,
  tooltip: HTMLElement,
  event: PointerEvent,
) {
  const bounds = root.getBoundingClientRect();
  const x = event.clientX - bounds.left;
  const y = event.clientY - bounds.top;
  tooltip.style.transform = `translate(${x + 16}px, ${y + 16}px)`;
}

function hydrateGraph(el: HTMLElement) {
  const raw = el.getAttribute("data-force-graph");
  if (!raw) return;

  try {
    const payload = JSON.parse(raw) as GraphPayload;
    const nodes = payload.nodes ?? [];
    const links = payload.links ?? [];
    const width = payload.width ?? DEFAULT_WIDTH;
    const height = payload.height ?? DEFAULT_HEIGHT;
    const labelKey = payload.labelKey ?? "id";

    el.removeAttribute("data-force-graph");
    el.innerHTML = "";

    const root = el.closest<HTMLElement>(".force-graph") ?? el;
    const tooltipNodes = root.querySelectorAll<HTMLElement>(
      "[data-force-tooltip-id]",
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

    let simulation = forceSimulation(nodes);

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
      positionTooltip(root, tooltip, event);
    };

    const moveTooltip = (event: PointerEvent, nodeData: GraphNode) => {
      if (!nodeData.tooltipId || !activeTooltip) return;
      if (activeTooltip.dataset.forceTooltipId !== nodeData.tooltipId) return;
      positionTooltip(root, activeTooltip, event);
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
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.4)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 9)
      .attr("fill", (d) => color(String(d.group ?? 0)))
      .style("cursor", (d) => (d.url ? "pointer" : "default"))
      .on("click", (_event, d) => {
        navigateTo(d);
      })
      .on("pointerenter", (event, d) => {
        showTooltip(event, d);
      })
      .on("pointermove", (event, d) => {
        moveTooltip(event, d);
      })
      .on("pointerleave", (_event, d) => {
        hideTooltip(d);
      })
      .call(
        drag<SVGCircleElement, GraphNode>()
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

    const labels = svg
      .append("g")
      .attr("font-size", "12px")
      .attr("fill", "rgba(15, 23, 42, 0.8)")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .style("cursor", (d) => (d.url ? "pointer" : "default"))
      .on("click", (_event, d) => {
        navigateTo(d);
      })
      .on("pointerenter", (event, d) => {
        showTooltip(event, d);
      })
      .on("pointermove", (event, d) => {
        moveTooltip(event, d);
      })
      .on("pointerleave", (_event, d) => {
        hideTooltip(d);
      })
      .text((d) => labelFor(d, labelKey));

    simulation = simulation
      .force(
        "link",
        forceLink<GraphNode, GraphLink>(links)
          .id((d) => d.id)
          .distance(75)
          .strength(0.8),
      )
      .force("charge", forceManyBody().strength(-220))
      .force("center", forceCenter(width / 2, height / 2));

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as GraphNode).x ?? 0)
        .attr("y1", (d) => (d.source as GraphNode).y ?? 0)
        .attr("x2", (d) => (d.target as GraphNode).x ?? 0)
        .attr("y2", (d) => (d.target as GraphNode).y ?? 0);

      node.attr("cx", (d) => d.x ?? 0).attr("cy", (d) => d.y ?? 0);

      labels
        .attr("x", (d) => (d.x ?? 0) + 12)
        .attr("y", (d) => (d.y ?? 0) + 4);
    });
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
