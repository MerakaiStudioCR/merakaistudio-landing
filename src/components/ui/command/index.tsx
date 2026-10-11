'use client'

import { Command as CommandPrimitive } from 'cmdk'
import { cn } from '~/shared/lib/cn'
import CommandInput from './components/command-input'
import CommandList from './components/command-list'
import CommandEmpty from './components/command-empty'
import CommandGroup from './components/command-group'
import CommandItem from './components/command-item'
import CommandSeparator from './components/command-separator'
import CommandShortcut from './components/command-shortcut'

const Command = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) => {
  return (
    <CommandPrimitive
      data-slot='command'
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
        className
      )}
      {...props}
    />
  )
}

Command.Input = CommandInput
Command.List = CommandList
Command.Empty = CommandEmpty
Command.Group = CommandGroup
Command.Item = CommandItem
Command.Separator = CommandSeparator
Command.Shortcut = CommandShortcut

export default Command
