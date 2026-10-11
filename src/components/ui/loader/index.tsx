import type { HTMLAttributes } from 'react'
import { LoaderIcon } from 'lucide-react'
import { cn } from '~/shared/lib/cn'
import useMessages from '~/i18n/useMessages'
import type { MessageKey } from '~/i18n/types'

export type LoaderProps = HTMLAttributes<HTMLElement> & {
  size?: number
  withText?: boolean
  direction?: 'vertical' | 'horizontal'
  message?: MessageKey
}

const Loader = ({
  size = 16,
  withText = true,
  direction = 'horizontal',
  message,
  className,
  ...props
}: LoaderProps) => {
  const t = useMessages()

  return (
    <output
      className={cn(
        'inline-flex items-center justify-center gap-2',
        direction === 'vertical' && 'flex-col',
        className
      )}
      {...props}
    >
      <LoaderIcon className='animate-spin text-primary' size={size} />
      <span className={cn('text-foreground', !withText && 'sr-only')}>
        {t(message || 'global.loading')}
      </span>
    </output>
  )
}

export default Loader
