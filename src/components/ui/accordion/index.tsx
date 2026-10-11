import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '~/shared/lib/cn'

const Accordion = ({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) => {
  return (
    <AccordionPrimitive.Root
      data-slot='accordion'
      className={cn('w-full', className)}
      {...props}
    />
  )
}

const AccordionItem = (
  props: React.ComponentProps<typeof AccordionPrimitive.Item>
) => {
  return <AccordionPrimitive.Item data-slot='accordion-item' {...props} />
}

const AccordionTrigger = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) => {
  return (
    <AccordionPrimitive.Trigger
      data-slot='accordion-trigger'
      className={cn(
        'group flex w-full flex-1 items-center justify-between transition-all',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className='size-3! shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180' />
    </AccordionPrimitive.Trigger>
  )
}

const AccordionContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) => {
  return (
    <AccordionPrimitive.Content
      data-slot='accordion-content'
      className='overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

// Create compound components
Accordion.Item = AccordionItem
Accordion.Trigger = AccordionTrigger
Accordion.Content = AccordionContent

export default Accordion
