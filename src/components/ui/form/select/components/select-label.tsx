import * as SelectPrimitive from '@radix-ui/react-select'

import { cn } from '~/shared/lib/cn'

const SelectLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) => {
  return (
    <SelectPrimitive.Label
      data-slot='select-label'
      className={cn('px-2 py-1.5 text-muted-foreground text-xs', className)}
      {...props}
    />
  )
}

export default SelectLabel
