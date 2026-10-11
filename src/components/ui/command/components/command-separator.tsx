'use client'

import { Command as CommandPrimitive } from 'cmdk'
import { cn } from '~/shared/lib/cn'

const CommandSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) => {
  return (
    <CommandPrimitive.Separator
      data-slot='command-separator'
      className={cn('-mx-1 h-px bg-border', className)}
      {...props}
    />
  )
}

export default CommandSeparator
