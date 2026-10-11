'use client'

import React from 'react'
import withFormField from '~/components/ui/form/withFormField'
import ComboboxProvider from './context/combobox-provider'
import ComboboxTrigger from './components/trigger'
import ComboboxContent from './components/content'
import ComboboxItem from './components/item'
import type { ComboboxRootProps } from './types'

const Combobox = <T = unknown>({
  children,
  value,
  defaultValue,
  onValueChange,
  fetchOptions,
  fetchInitialLabel,
  name,
  id,
  'aria-invalid': ariaInvalid
}: ComboboxRootProps<T>) => {
  return (
    <ComboboxProvider
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      fetchOptions={fetchOptions}
      fetchInitialLabel={fetchInitialLabel}
      name={name}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === ComboboxTrigger) {
          return React.cloneElement(child, {
            id,
            'aria-invalid': ariaInvalid
          } as React.ComponentProps<typeof ComboboxTrigger>)
        }
        return child
      })}
    </ComboboxProvider>
  )
}

const compoundComponents = {
  Trigger: ComboboxTrigger,
  Content: ComboboxContent,
  Item: ComboboxItem
}

const WrappedCombobox = Object.assign(
  withFormField(Combobox),
  compoundComponents
)

export default WrappedCombobox
