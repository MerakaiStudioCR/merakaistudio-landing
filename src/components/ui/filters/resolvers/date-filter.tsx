import DatePicker from '~/components/ui/form/date-picker'
import type { RangeValue } from '~/components/ui/form/date-picker/types'
import type { FilterResolverProps } from '../types'

const DateFilter = ({ config, value }: FilterResolverProps) => {
  const dateVal = value instanceof Date ? (value as Date) : undefined
  return (
    <DatePicker
      label={config.label}
      name={config.key}
      key={`date-${config.key}-${dateVal?.toISOString() || ''}`}
      defaultValue={dateVal?.toISOString() || ''}
      wrapperClass={config.wrapperClass ?? 'w-full min-w-0'}
    />
  )
}

export const DateRangeFilter = ({ config, value }: FilterResolverProps) => {
  return (
    <DatePicker
      label={config.label}
      mode='range'
      name={config.key}
      key={`range-${config.key}-${JSON.stringify(value)}`}
      defaultValue={value as RangeValue}
      wrapperClass={config.wrapperClass ?? 'w-full min-w-0'}
    />
  )
}

export default DateFilter
