import { cva, type VariantProps } from 'class-variance-authority'

export const statusVariants = cva('h-4 w-4 rounded-full', {
  variants: {
    variant: {
      success: 'bg-success',
      warning: 'bg-warning',
      destructive: 'bg-destructive',
      info: 'bg-info'
    }
  },
  defaultVariants: {
    variant: 'success'
  }
})

export type StatusVariants = VariantProps<typeof statusVariants>
