import * as SelectPrimitive from '@radix-ui/react-select'

const SelectValue = ({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) => {
  return <SelectPrimitive.Value data-slot='select-value' {...props} />
}

export default SelectValue
