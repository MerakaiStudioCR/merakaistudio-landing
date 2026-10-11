import { ClipboardCheckIcon, type LucideIcon } from 'lucide-react'
import { cn } from '~/shared/lib/cn'

interface FormStepShellProps {
  title: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'auth'
  icon?: LucideIcon
}

export function FormStepShell({
  title,
  description,
  children,
  className,
  variant = 'default',
  icon: Icon = ClipboardCheckIcon
}: FormStepShellProps) {
  const isAuth = variant === 'auth'

  return (
    <div className={cn('space-y-6', className)}>
      <div className='floating-section p-4 sm:p-5'>
        <header className='flex items-start gap-4'>
          <div
            aria-hidden
            className={cn(
              'flex size-11 shrink-0 items-center justify-center rounded-full',
              isAuth
                ? 'bg-[var(--auth-water)] text-[var(--auth-sapphire-soft)]'
                : 'bg-primary/10 text-primary'
            )}
          >
            <Icon className='size-5' />
          </div>
          <div className='min-w-0 space-y-1'>
            <h3
              className={cn(
                'font-semibold text-base',
                isAuth ? 'text-[var(--auth-sapphire)]' : 'text-foreground'
              )}
            >
              {title}
            </h3>
            {description ? (
              <p className='text-muted-foreground text-sm'>{description}</p>
            ) : null}
          </div>
        </header>
      </div>
      {children}
    </div>
  )
}

/** @deprecated Use FormStepShell — kept for existing review steps. */
export const FormReviewStepShell = FormStepShell

export default FormStepShell
