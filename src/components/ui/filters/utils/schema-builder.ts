import { z } from 'zod'
import type { FiltersConfig } from '../types'

export const buildFiltersSchema = (filters: FiltersConfig) => {
  const schemaShape: Record<string, z.ZodTypeAny> = {}

  for (const cfg of filters) {
    if (cfg.schema) {
      // Merge custom schema fields
      const fields = cfg.schema.shape
      for (const key in fields) {
        schemaShape[key] = fields[key]
      }
      continue
    }

    switch (cfg.type) {
      case 'text':
      case 'combobox':
      case 'single-option':
        schemaShape[cfg.key] = z.string().optional()
        break
      case 'multi-option':
        schemaShape[cfg.key] = z.string().optional()
        break
      case 'boolean':
        schemaShape[cfg.key] = z.boolean().optional()
        break
      case 'date':
        schemaShape[cfg.key] = z.string().optional()
        break
      case 'date-range':
        schemaShape[`${cfg.key}_from`] = z.string().optional()
        schemaShape[`${cfg.key}_to`] = z.string().optional()
        break
      default:
        break
    }
  }

  return z.object(schemaShape)
}
