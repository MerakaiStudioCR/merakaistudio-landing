import type { FilterResolverProps } from '../types'

const MultiSelectFilter = ({ value }: FilterResolverProps) => {
  const current = Array.isArray(value) ? (value as string[]) : []
  return <p>Still working on this, {current.join(',')}</p>
}

export default MultiSelectFilter
