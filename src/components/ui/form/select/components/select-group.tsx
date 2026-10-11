import * as SelectPrimitive from '@radix-ui/react-select'

const SelectGroup = ({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) => {
  return <SelectPrimitive.Group data-slot='select-group' {...props} />
}

export default SelectGroup
