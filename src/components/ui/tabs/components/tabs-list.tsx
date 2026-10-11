import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '~/shared/lib/cn'

const TabsList = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) => {
  return (
    <TabsPrimitive.List
      data-slot='tabs-list'
      className={cn(
        'inline-flex w-fit items-center justify-center rounded-lg bg-muted p-1',
        className
      )}
      {...props}
    />
  )
}

export default TabsList
