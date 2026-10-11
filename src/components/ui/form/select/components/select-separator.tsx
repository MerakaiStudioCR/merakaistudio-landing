import * as SelectPrimitive from '@radix-ui/react-select'

import { cn } from '~/shared/lib/cn'

const SelectSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) => {
  return (
    <SelectPrimitive.Separator
      data-slot='select-separator'
      className={cn('-mx-1 pointer-events-none my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

export default SelectSeparator
