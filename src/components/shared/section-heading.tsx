import { cn } from '~/shared/lib/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  tone?: 'navy' | 'paper'
  className?: string
}

const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  tone = 'navy',
  className
}: SectionHeadingProps) => {
  return (
    <div className={cn('merakai-in max-w-3xl', className)}>
      {eyebrow ? (
        <p
          className={cn(
            'font-body text-xs uppercase tracking-[0.22em]',
            tone === 'paper' ? 'text-merakai-yellow' : 'text-merakai-orange'
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          'mt-4 text-balance font-heading font-semibold text-4xl tracking-[-0.03em] sm:text-5xl',
          tone === 'paper' ? 'text-merakai-paper' : 'text-merakai-navy'
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            'mt-5 max-w-2xl text-lg leading-relaxed',
            tone === 'paper' ? 'text-merakai-paper/80' : 'text-merakai-navy/75'
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

export default SectionHeading
