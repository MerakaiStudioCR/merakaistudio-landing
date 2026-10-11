'use client'

import { cn } from '~/shared/lib/cn'
import { type IconVariant, getIconVariant } from './icon-variants'

interface PillProps {
  children: React.ReactNode
  onClick?: () => void
  iconVariant?: IconVariant
}

const Pill = ({ children, onClick, iconVariant = 'close' }: PillProps) => {
  const Icon = getIconVariant(iconVariant)

  return (
    <button
      type='button'
      onClick={onClick}
      data-slot='pill'
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1 text-sm text-white transition-colors hover:bg-primary/80',
        iconVariant === 'none' && 'gap-0'
      )}
    >
      <span>{children}</span>
      {Icon && <Icon className='h-3 w-3' />}
    </button>
  )
}

export default Pill
