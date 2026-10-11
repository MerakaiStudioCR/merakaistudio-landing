import Switch from '~/components/ui/form/switch'
import type { FilterResolverProps } from '../types'

const BooleanFilter = ({ config, value }: FilterResolverProps) => {
  const checked = Boolean(value)
  return (
    <Switch label={config.label} name={config.key} defaultChecked={checked} />
  )
}

export default BooleanFilter
