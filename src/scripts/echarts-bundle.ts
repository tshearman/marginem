// Tree-shaken ECharts entry. Only the pieces required by the charts we
// actually render get pulled into the bundle; never `import "echarts"` (the
// umbrella entry drags in every chart type and renderer).
//
// Add a new chart type or component here when a chart needs it. Re-exports
// `init` so callers don't have to thread a namespace through the dynamic
// import — see echarts-client.ts.

import { init, use } from "echarts/core";
import { BarChart, LineChart } from "echarts/charts";
import {
	GridComponent,
	LegendComponent,
	TitleComponent,
	TooltipComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

use([
	BarChart,
	LineChart,
	GridComponent,
	LegendComponent,
	TitleComponent,
	TooltipComponent,
	CanvasRenderer,
]);

export { init };
