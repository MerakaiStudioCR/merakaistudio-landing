'use client'

import Link, { type LinkProps } from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '~/shared/lib/cn'
import {
  handleGuardedLinkClick,
  shouldStartLinkNavigationProgress
} from '~/shared/lib/form/guarded-navigation'
import { startNavigationProgress } from '~/shared/lib/navigation-progress-store'
import { buttonVariants } from './variants'
import { MessageCircle } from 'lucide-react'

type ButtonVariants = VariantProps<typeof buttonVariants>
type ButtonProps = ButtonVariants &
  React.ComponentProps<'button'> & { asLink?: false }
type LinkButtonProps = ButtonVariants & LinkProps & { asLink: true }

type Props = (ButtonProps | LinkButtonProps) & {
  className?: string
  children: React.ReactNode
}

export type { ButtonProps, LinkButtonProps }

const Button = ({
  className,
  variant,
  children,
  asLink = false,
  ...props
}: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const content = (
    <span>
      {variant === 'whatsapp' && <MessageCircle className='size-5' />}
      {children}
    </span>
  )

  if (asLink) {
    const { href, onClick, ...linkProps } = props as LinkProps
    const targetHref =
      typeof href === 'string' ? href : (href.pathname ?? pathname)

    return (
      <Link
        data-slot='button'
        href={href}
        className={cn(buttonVariants({ variant, className }))}
        onClick={(event) => {
          onClick?.(event)
          handleGuardedLinkClick({
            event,
            currentPathname: pathname,
            targetHref,
            router,
            onNavigateAllowed: () => startNavigationProgress()
          })
          if (shouldStartLinkNavigationProgress(event, pathname, targetHref)) {
            startNavigationProgress()
          }
        }}
        {...linkProps}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      data-slot='button'
      className={cn(buttonVariants({ variant, className }))}
      {...(props as React.ComponentProps<'button'>)}
    >
      {content}
    </button>
  )
}

export default Button
