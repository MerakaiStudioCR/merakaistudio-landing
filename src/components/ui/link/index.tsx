'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import NextLink from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '~/shared/lib/cn'
import { handleGuardedLinkClick } from '~/shared/lib/form/guarded-navigation'

const variants = cva(
  'inline-flex gap-2 whitespace-nowrap font-medium disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive h-10',
  {
    variants: {
      variant: {
        default:
          'text-brand-interaction underline-offset-4 hover:text-primary hover:underline'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

type Props = React.ComponentProps<typeof NextLink> &
  VariantProps<typeof variants>

const Link = ({ className, variant, href, onClick, ...props }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const targetHref =
    typeof href === 'string' ? href : (href.pathname ?? pathname)

  return (
    <NextLink
      data-slot='link'
      href={href}
      className={cn(variants({ variant, className }))}
      onClick={(event) => {
        onClick?.(event)
        handleGuardedLinkClick({
          event,
          currentPathname: pathname,
          targetHref,
          router
        })
      }}
      {...props}
    />
  )
}

export default Link
