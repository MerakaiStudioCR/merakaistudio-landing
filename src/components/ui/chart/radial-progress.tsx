'use client'

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'
import Chart from '~/components/ui/chart'
import useMessages from '~/i18n/useMessages'
import {
  calculateLeft,
  resolveColor,
  shouldRoundBarCorners
} from '~/components/ui/chart/utils/progress'
import { cn } from '~/shared/lib/cn'
import type { ChartConfig, ColorConfig } from './types'

type Props = {
  title: string
  progress: number
  total: number
  color: ColorConfig
  displayAsPercentage?: boolean
  showTitleInChart?: boolean
  valueColor?: string
  size?: 'default' | 'compact'
  config?: ChartConfig
} & React.ComponentProps<typeof RadialBarChart>

const RadialProgressChart = ({
  title,
  progress,
  total,
  color,
  displayAsPercentage = false,
  showTitleInChart = true,
  valueColor,
  size = 'default',
  defaultShowTooltip = true,
  config,
  ...props
}: Props) => {
  const t = useMessages('chart')
  const safeTotal = total > 0 ? total : 1
  const percentage = Math.round((progress / safeTotal) * 100)
  const resolvedColor = resolveColor(color, percentage)
  const remainder = calculateLeft(progress, safeTotal)
  const roundProgress = shouldRoundBarCorners(progress, safeTotal)
  const roundRemainder = shouldRoundBarCorners(remainder, safeTotal)
  const displayValue = displayAsPercentage
    ? `${percentage}%`
    : progress.toLocaleString()

  if (!config) {
    config = {
      progress: {
        label: t('progress')
      },
      total: {
        label: t('left')
      }
    } satisfies ChartConfig
  }

  const centerValueColor = valueColor ?? resolvedColor
  const isCompact = size === 'compact'

  return (
    <Chart
      config={config}
      className={cn(
        'mx-auto w-full',
        isCompact ? 'h-24 max-w-[7.5rem]' : 'h-44 max-w-[15rem]'
      )}
    >
      <RadialBarChart
        data={[{ progress, total: remainder }]}
        startAngle={210}
        endAngle={-30}
        innerRadius={isCompact ? 46 : 72}
        outerRadius={isCompact ? 68 : 112}
        {...props}
      >
        {defaultShowTooltip && (
          <Chart.Tooltip
            cursor={false}
            content={<Chart.TooltipContent hideLabel />}
          />
        )}
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle'>
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy || 0}
                      fill={centerValueColor}
                      className={cn(
                        'font-bold font-heading',
                        isCompact ? 'text-lg' : 'text-[1.65rem]'
                      )}
                    >
                      {displayValue}
                    </tspan>
                    {showTitleInChart ? (
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 20}
                        className='fill-muted-foreground text-xs'
                      >
                        {title}
                      </tspan>
                    ) : null}
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
        {progress > 0 && (
          <RadialBar
            dataKey='progress'
            stackId='a'
            fill={resolvedColor}
            cornerRadius={roundProgress ? 6 : 0}
            forceCornerRadius={roundProgress}
          />
        )}
        <RadialBar
          dataKey='total'
          stackId='a'
          fill='var(--muted)'
          cornerRadius={roundRemainder ? 6 : 0}
          forceCornerRadius={roundRemainder}
        />
      </RadialBarChart>
    </Chart>
  )
}

export default RadialProgressChart
