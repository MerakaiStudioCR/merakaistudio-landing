'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
// Child components
import TabsList from './components/tabs-list'
import TabsTrigger from './components/tabs-trigger'
import TabsContent from './components/tabs-content'

import { cn } from '~/shared/lib/cn'

const Tabs = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) => {
  return (
    <TabsPrimitive.Root
      data-slot='tabs'
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

// Create compound components
Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export default Tabs
