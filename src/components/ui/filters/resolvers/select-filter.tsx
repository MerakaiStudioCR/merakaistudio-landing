import Select from '~/components/ui/form/select'
import type { FilterResolverProps } from '../types'

const SingleSelectFilter = ({ config, value }: FilterResolverProps) => {
  return (
    <Select
      label={config.label}
      name={config.key}
      key={`single-${config.key}-${String(value || '')}`}
      defaultValue={(value as string) || String(config.initialValue || '')}
      wrapperClass={config.wrapperClass ?? 'w-full min-w-0'}
    >
      <Select.Trigger className='w-full'>
        <Select.Value placeholder={config.placeholder} />
      </Select.Trigger>
      <Select.Content>
        {config.options?.map((opt) => (
          <Select.Item key={opt.value} value={opt.value}>
            {opt.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  )
}

export default SingleSelectFilter
