import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import TooltipProvider from './components/tooltip-provider'
import TooltipTrigger from './components/tooltip-trigger'
import TooltipContent from './components/tooltip-content'

const Tooltip = ({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) => {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot='tooltip' {...props} />
    </TooltipProvider>
  )
}

// Create compound components
Tooltip.Trigger = TooltipTrigger
Tooltip.Content = TooltipContent

export default Tooltip
