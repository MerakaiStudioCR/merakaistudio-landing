import * as TooltipPrimitive from '@radix-ui/react-tooltip'

const TooltipTrigger = ({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) => {
  return (
    <TooltipPrimitive.Trigger asChild data-slot='tooltip-trigger' {...props} />
  )
}

export default TooltipTrigger
