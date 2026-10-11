import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '~/shared/lib/cn'

const TooltipContent = ({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) => {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot='tooltip-content'
        sideOffset={sideOffset}
        className={cn(
          'fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in text-balance rounded-md bg-[var(--zaffiro-sapphire-900)] px-3 py-1.5 text-light-foreground data-[state=closed]:animate-out',
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className='z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-[var(--zaffiro-sapphire-900)] fill-[var(--zaffiro-sapphire-900)]' />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export default TooltipContent
