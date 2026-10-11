type ColorThreshold = {
  maxPercent?: number
  color: string
}

type ColorConfig = string | ColorThreshold[]

/**
 * Calculates the left amount of a progress bar
 * @param progress - The progress value
 * @param total - The total value
 * @returns The left amount
 */
/** Recharts draws tiny arcs as blobs when corner radius is forced; skip below ~15%. */
const MIN_CORNER_RADIUS_PERCENT = 15

export const shouldRoundBarCorners = (
  value: number,
  total: number
): boolean => {
  if (value <= 0 || total <= 0) {
    return false
  }

  return (value / total) * 100 >= MIN_CORNER_RADIUS_PERCENT
}

export const calculateLeft = (progress: number, total: number) => {
  if (progress > total) {
    return 0
  }

  if (progress <= 0) {
    return total
  }

  return total - progress
}

/**
 * Resolves the color based on the percentage and color configuration
 * @param colorConfig - Either a string color or an array of color thresholds
 * @param percentage - The current percentage value
 * @returns The resolved color
 */
export const resolveColor = (
  colorConfig: ColorConfig,
  percentage: number
): string => {
  if (typeof colorConfig === 'string') {
    return colorConfig
  }

  // Find matching threshold
  for (const threshold of colorConfig) {
    if (
      threshold.maxPercent === undefined ||
      percentage <= threshold.maxPercent
    ) {
      return threshold.color
    }
  }

  // Fallback to last color if no match
  return colorConfig[colorConfig.length - 1]?.color || 'var(--color-primary)'
}
