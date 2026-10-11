import React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import withFormField from '~/components/ui/form/withFormField'
// Components
import SelectGroup from './components/select-group'
import SelectValue from './components/select-value'
import SelectTrigger from './components/select-trigger'
import SelectContent from './components/select-content'
import SelectLabel from './components/select-label'
import SelectItem from './components/select-item'
import SelectSeparator from './components/select-separator'
import SelectScrollUpButton from './components/select-scroll-up-button'
import SelectScrollDownButton from './components/select-scroll-down-button'

type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root> & {
  id?: string
}

const Select = ({ id, ...props }: SelectProps) => {
  return (
    <SelectPrimitive.Root data-slot='select' {...props}>
      {/* Pass the id to the trigger */}
      {React.Children.map(props.children, (child) => {
        if (React.isValidElement(child) && child.type === SelectTrigger) {
          return React.cloneElement(child, {
            id,
            'aria-invalid':
              'aria-invalid' in props ? props['aria-invalid'] : undefined
          } as React.ComponentProps<typeof SelectTrigger>)
        }
        return child
      })}
    </SelectPrimitive.Root>
  )
}

// Create compound components object
const compoundComponents = {
  Group: SelectGroup,
  Value: SelectValue,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Label: SelectLabel,
  Item: SelectItem,
  Separator: SelectSeparator,
  ScrollUpButton: SelectScrollUpButton,
  ScrollDownButton: SelectScrollDownButton
}

// Create the wrapped component and attach compound components
const WrappedSelect = Object.assign(withFormField(Select), compoundComponents)

export default WrappedSelect
