import { cn } from '~/shared/lib/cn'

const baseStyles = 'w-full px-2 [&>span]:flex [&>span]:items-center'
const withIconStyles = '[&>span]:justify-start [&>span]:gap-2'

export const destructiveStyles =
  'bg-red-50 hover:bg-red-100 active:bg-red-200 text-destructive hover:text-destructive'

export const getBaseClassName = (hasIcon: boolean) =>
  cn(baseStyles, hasIcon && withIconStyles)
