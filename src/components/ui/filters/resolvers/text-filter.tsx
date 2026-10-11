import Input from '~/components/ui/form/input'
import type { FilterResolverProps } from '../types'

const TextFilter = ({ config, value }: FilterResolverProps) => {
  return (
    <Input
      label={config.label}
      placeholder={config.placeholder}
      name={config.key}
      defaultValue={(value as string) || ''}
      type='text'
      wrapperClass={config.wrapperClass ?? 'w-full min-w-0'}
    />
  )
}

export default TextFilter
