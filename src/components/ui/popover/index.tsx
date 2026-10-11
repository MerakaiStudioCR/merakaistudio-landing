import * as PopoverPrimitive from '@radix-ui/react-popover'
import PopoverTrigger from './components/popover-trigger'
import PopoverContent from './components/popover-content'
import PopoverAnchor from './components/popover-anchor'

const Popover = ({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) => {
  return <PopoverPrimitive.Root data-slot='popover' {...props} />
}

// Create compound components
Popover.Trigger = PopoverTrigger
Popover.Content = PopoverContent
Popover.Anchor = PopoverAnchor

export default Popover
