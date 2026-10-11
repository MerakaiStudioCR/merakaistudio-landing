import ChartContainer from './components/chart-container'
import ChartTooltip from './components/chart-tooltip'
import ChartTooltipContent from './components/chart-tooltip-content'
import ChartLegend from './components/chart-legend'
import ChartLegendContent from './components/chart-legend-content'

const Chart = ChartContainer as typeof ChartContainer & {
  Tooltip: typeof ChartTooltip
  TooltipContent: typeof ChartTooltipContent
  Legend: typeof ChartLegend
  LegendContent: typeof ChartLegendContent
}

// Create compound components
Chart.Tooltip = ChartTooltip
Chart.TooltipContent = ChartTooltipContent
Chart.Legend = ChartLegend
Chart.LegendContent = ChartLegendContent

export default Chart
