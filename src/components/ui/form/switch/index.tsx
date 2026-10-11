import * as SwitchPrimitive from '@radix-ui/react-switch'
import withFormField from '../withFormField'

import { cn } from '~/shared/lib/cn'

const Switch = ({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) => {
  return (
    <SwitchPrimitive.Root
      data-slot='switch'
      className={cn(
        // Unchecked track uses bg-input (not bg-muted): --muted and --light-background
        // resolve to the identical cloud tone in the design tokens, and the thumb below
        // is also bg-light-background — using bg-muted here made the whole switch
        // (track + thumb + its usual row background) render as one flat, invisible blob.
        'peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent bg-input shadow-xs outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=checked]:bg-primary',
        className
      )}
      value={'checked' in props ? String(props.checked) : undefined}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot='switch-thumb'
        className={cn(
          'pointer-events-none block size-4 rounded-full bg-light-background ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0'
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export default withFormField(Switch, { direction: 'horizontal' })
