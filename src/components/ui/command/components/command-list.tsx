'use client'

import { Command as CommandPrimitive } from 'cmdk'
import { cn } from '~/shared/lib/cn'

const CommandList = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) => {
  return (
    <CommandPrimitive.List
      data-slot='command-list'
      className={cn(
        'max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden',
        className
      )}
      {...props}
    />
  )
}

export default CommandList
