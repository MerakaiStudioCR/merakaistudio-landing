import { describe, it, expect } from 'vitest'
import { z } from 'zod'
import { buildFiltersSchema } from './schema-builder'
import type { FiltersConfig } from '../types'

describe('schema-builder', () => {
  describe('buildFiltersSchema', () => {
    it('should build schema for text filter type', () => {
      const filters: FiltersConfig = [
        { key: 'search', type: 'text', label: 'Search' }
      ]

      const schema = buildFiltersSchema(filters)

      expect(schema).toBeInstanceOf(z.ZodObject)
      expect(schema.shape.search).toBeInstanceOf(z.ZodOptional)

      // Test valid input
      expect(() => schema.parse({ search: 'test' })).not.toThrow()
      expect(() => schema.parse({ search: undefined })).not.toThrow()
      expect(() => schema.parse({})).not.toThrow()
    })

    it('should build schema for single-option filter type', () => {
      const filters: FiltersConfig = [
        { key: 'status', type: 'single-option', label: 'Status', options: [] }
      ]

      const schema = buildFiltersSchema(filters)

      expect(schema.shape.status).toBeInstanceOf(z.ZodOptional)

      // Test valid input
      expect(() => schema.parse({ status: 'active' })).not.toThrow()
      expect(() => schema.parse({ status: undefined })).not.toThrow()
    })

    it('should build schema for multi-option filter type', () => {
      const filters: FiltersConfig = [
        { key: 'tags', type: 'multi-option', label: 'Tags', options: [] }
      ]

      const schema = buildFiltersSchema(filters)

      expect(schema.shape.tags).toBeInstanceOf(z.ZodOptional)

      // Test valid input (stored as comma-separated string)
      expect(() => schema.parse({ tags: 'tag1,tag2,tag3' })).not.toThrow()
      expect(() => schema.parse({ tags: undefined })).not.toThrow()
    })

    it('should build schema for boolean filter type', () => {
      const filters: FiltersConfig = [
        { key: 'active', type: 'boolean', label: 'Active' }
      ]

      const schema = buildFiltersSchema(filters)

      expect(schema.shape.active).toBeInstanceOf(z.ZodOptional)

      // Test valid input
      expect(() => schema.parse({ active: true })).not.toThrow()
      expect(() => schema.parse({ active: false })).not.toThrow()
      expect(() => schema.parse({ active: undefined })).not.toThrow()
    })

    it('should build schema for date filter type', () => {
      const filters: FiltersConfig = [
        { key: 'createdAt', type: 'date', label: 'Created At' }
      ]

      const schema = buildFiltersSchema(filters)

      expect(schema.shape.createdAt).toBeInstanceOf(z.ZodOptional)

      // Test valid input (stored as string)
      expect(() => schema.parse({ createdAt: '2023-10-15' })).not.toThrow()
      expect(() => schema.parse({ createdAt: undefined })).not.toThrow()
    })

    it('should build schema for date-range filter type with _from and _to suffixes', () => {
      const filters: FiltersConfig = [
        { key: 'dateRange', type: 'date-range', label: 'Date Range' }
      ]

      const schema = buildFiltersSchema(filters)

      expect(schema.shape.dateRange_from).toBeInstanceOf(z.ZodOptional)
      expect(schema.shape.dateRange_to).toBeInstanceOf(z.ZodOptional)

      // Test valid input
      expect(() =>
        schema.parse({
          dateRange_from: '2023-10-01',
          dateRange_to: '2023-10-31'
        })
      ).not.toThrow()
      expect(() => schema.parse({ dateRange_from: undefined })).not.toThrow()
      expect(() => schema.parse({})).not.toThrow()
    })

    it('should use custom schema when provided', () => {
      const customSchema = z.object({
        customField: z.string().min(3),
        anotherField: z.number()
      })

      const filters: FiltersConfig = [
        { key: 'custom', type: 'text', label: 'Custom', schema: customSchema }
      ]

      const schema = buildFiltersSchema(filters)

      expect(schema.shape.customField).toBeDefined()
      expect(schema.shape.anotherField).toBeDefined()

      // Custom schema should override default behavior
      expect(() =>
        schema.parse({
          customField: 'test',
          anotherField: 42
        })
      ).not.toThrow()

      // Should fail validation for invalid custom schema
      expect(() =>
        schema.parse({
          customField: 'ab', // too short
          anotherField: 42
        })
      ).toThrow()
    })

    it('should merge multiple custom schema fields', () => {
      const schema1 = z.object({
        field1: z.string()
      })

      const schema2 = z.object({
        field2: z.number()
      })

      const filters: FiltersConfig = [
        { key: 'custom1', type: 'text', label: 'Custom 1', schema: schema1 },
        { key: 'custom2', type: 'text', label: 'Custom 2', schema: schema2 }
      ]

      const schema = buildFiltersSchema(filters)

      expect(schema.shape.field1).toBeDefined()
      expect(schema.shape.field2).toBeDefined()

      // Both custom fields should be present
      expect(() =>
        schema.parse({
          field1: 'test',
          field2: 42
        })
      ).not.toThrow()
    })

    it('should handle mix of custom and standard schemas', () => {
      const customSchema = z.object({
        customField: z.string()
      })

      const filters: FiltersConfig = [
        { key: 'search', type: 'text', label: 'Search' },
        { key: 'custom', type: 'text', label: 'Custom', schema: customSchema },
        { key: 'active', type: 'boolean', label: 'Active' }
      ]

      const schema = buildFiltersSchema(filters)

      expect(schema.shape.search).toBeDefined()
      expect(schema.shape.customField).toBeDefined()
      expect(schema.shape.active).toBeDefined()

      // Should accept valid data for both types
      expect(() =>
        schema.parse({
          search: 'test',
          customField: 'custom',
          active: true
        })
      ).not.toThrow()
    })

    it('should build schema for all filter types together', () => {
      const filters: FiltersConfig = [
        { key: 'text', type: 'text', label: 'Text' },
        { key: 'single', type: 'single-option', label: 'Single', options: [] },
        { key: 'multi', type: 'multi-option', label: 'Multi', options: [] },
        { key: 'bool', type: 'boolean', label: 'Boolean' },
        { key: 'date', type: 'date', label: 'Date' },
        { key: 'range', type: 'date-range', label: 'Range' }
      ]

      const schema = buildFiltersSchema(filters)

      expect(schema.shape.text).toBeDefined()
      expect(schema.shape.single).toBeDefined()
      expect(schema.shape.multi).toBeDefined()
      expect(schema.shape.bool).toBeDefined()
      expect(schema.shape.date).toBeDefined()
      expect(schema.shape.range_from).toBeDefined()
      expect(schema.shape.range_to).toBeDefined()
    })

    it('should handle empty filters config', () => {
      const filters: FiltersConfig = []

      const schema = buildFiltersSchema(filters)

      expect(schema).toBeInstanceOf(z.ZodObject)
      expect(Object.keys(schema.shape)).toHaveLength(0)
      expect(() => schema.parse({})).not.toThrow()
    })

    it('should create optional fields for all standard types', () => {
      const filters: FiltersConfig = [
        { key: 'text', type: 'text', label: 'Text' },
        { key: 'bool', type: 'boolean', label: 'Boolean' }
      ]

      const schema = buildFiltersSchema(filters)

      // All fields should be optional (can be omitted)
      expect(() => schema.parse({})).not.toThrow()
      expect(() => schema.parse({ text: undefined })).not.toThrow()
      expect(() => schema.parse({ bool: undefined })).not.toThrow()
    })

    it('should handle multiple date-range filters', () => {
      const filters: FiltersConfig = [
        { key: 'created', type: 'date-range', label: 'Created' },
        { key: 'updated', type: 'date-range', label: 'Updated' }
      ]

      const schema = buildFiltersSchema(filters)

      expect(schema.shape.created_from).toBeDefined()
      expect(schema.shape.created_to).toBeDefined()
      expect(schema.shape.updated_from).toBeDefined()
      expect(schema.shape.updated_to).toBeDefined()

      expect(() =>
        schema.parse({
          created_from: '2023-01-01',
          created_to: '2023-12-31',
          updated_from: '2023-06-01',
          updated_to: '2023-06-30'
        })
      ).not.toThrow()
    })

    it('should validate parsed data correctly', () => {
      const filters: FiltersConfig = [
        { key: 'search', type: 'text', label: 'Search' },
        { key: 'count', type: 'boolean', label: 'Count' }
      ]

      const schema = buildFiltersSchema(filters)

      const validData = { search: 'test', count: true }
      const result = schema.parse(validData)

      expect(result).toEqual(validData)
    })

    it('should handle unknown filter type gracefully', () => {
      const filters: FiltersConfig = [
        // biome-ignore lint/suspicious/noExplicitAny: Test unknown filter type
        { key: 'unknown', type: 'unknown-type' as any, label: 'Unknown' }
      ]

      const schema = buildFiltersSchema(filters)

      // Unknown types should be ignored (no schema field created)
      expect(schema.shape.unknown).toBeUndefined()
    })
  })
})
