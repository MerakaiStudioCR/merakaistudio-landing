import { describe, it, expect } from 'vitest'
import { cn } from './cn'

describe('cn utility', () => {
  it('should merge single class name', () => {
    const result = cn('text-red-500')
    expect(result).toBe('text-red-500')
  })

  it('should merge multiple class names', () => {
    const result = cn('text-red-500', 'bg-blue-500')
    expect(result).toBe('text-red-500 bg-blue-500')
  })

  it('should handle conditional classes with clsx', () => {
    const result = cn('base-class', {
      'active-class': true,
      'inactive-class': false
    })
    expect(result).toBe('base-class active-class')
  })

  it('should merge conflicting Tailwind classes with twMerge', () => {
    const result = cn('px-2 py-1', 'p-4')
    expect(result).toBe('p-4')
  })

  it('should handle arrays of class names', () => {
    const result = cn(['text-sm', 'font-bold'], 'text-red-500')
    expect(result).toBe('text-sm font-bold text-red-500')
  })

  it('should filter out falsy values', () => {
    const result = cn('base', false, null, undefined, 'end')
    expect(result).toBe('base end')
  })

  it('should handle empty input', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('should merge and deduplicate complex Tailwind classes', () => {
    const result = cn('text-red-500 hover:text-blue-500', 'text-green-500')
    expect(result).toBe('hover:text-blue-500 text-green-500')
  })
})
