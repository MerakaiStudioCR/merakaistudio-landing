import { Link } from '~/i18n/navigation'
import { cn } from '~/shared/lib/cn'
import MerakaiMark from './merakai-mark'

interface LogoProps {
  className?: string
  tone?: 'navy' | 'paper'
  label: string
}

const Logo = ({ className, tone = 'navy', label }: LogoProps) => {
  return (
    <Link
      href='/'
      prefetch={false}
      aria-label={label}
      className={cn(
        'inline-flex items-center gap-3',
        tone === 'paper' ? 'text-merakai-paper' : 'text-merakai-navy',
        className
      )}
    >
      <MerakaiMark className='h-9 w-9 shrink-0' />
      <span className='flex flex-col leading-none'>
        <span className='font-heading font-semibold text-[1.35rem] tracking-[-0.03em]'>
          Merakai
        </span>
        <span
          className={cn(
            'font-body text-[0.68rem] uppercase tracking-[0.22em]',
            tone === 'paper' && 'text-merakai-orange'
          )}
        >
          Studio
        </span>
      </span>
    </Link>
  )
}

export default Logo
