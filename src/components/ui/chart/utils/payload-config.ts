import type { ChartConfig } from '../types'

/**
 * Gets chart configuration for a specific data key.
 * Simplified to handle the most common case: direct config lookup by key.
 */
export const getConfigForKey = (config: ChartConfig, key: string) => {
  return config[key]
}
