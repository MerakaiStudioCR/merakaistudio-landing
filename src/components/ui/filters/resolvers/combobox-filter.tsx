'use client'

import Combobox from '~/components/ui/form/combobox'
import type { FilterResolverProps } from '../types'

const ComboboxFilter = ({ config, value }: FilterResolverProps) => {
  if (!config.fetchOptions) {
    return null
  }

  const defaultValue = (value || config.initialValue || '') as string

  return (
    <Combobox
      key={`combobox-${config.key}-${defaultValue}`}
      name={config.key}
      defaultValue={defaultValue}
      fetchOptions={config.fetchOptions}
      fetchInitialLabel={config.fetchInitialLabel}
      label={config.label}
      wrapperClass={config.wrapperClass ?? 'w-full min-w-0'}
    >
      <Combobox.Trigger
        className='h-10 border-input px-3 text-sm shadow-xs hover:bg-white'
        placeholder={config.placeholder}
      />
      <Combobox.Content />
    </Combobox>
  )
}

export default ComboboxFilter
