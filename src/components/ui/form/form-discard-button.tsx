'use client'

import type { ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Button, { type ButtonProps } from '~/components/ui/button'
import {
  clearFormDraft,
  resolveFormDraftKey
} from '~/shared/lib/form/form-draft'
import { leaveWithUnsavedGuard } from '~/shared/lib/form/guarded-navigation'

interface Props extends Omit<ButtonProps, 'children' | 'type' | 'onClick'> {
  href: string
  children: ReactNode
  /** Defaults to current pathname. Pass false to only navigate without clearing. */
  persistKey?: string | boolean
  onClick?: () => void
}

const FormDiscardButton = ({
  href,
  persistKey = true,
  onClick,
  children,
  disabled,
  variant = 'secondary',
  ...props
}: Props) => {
  const pathname = usePathname()
  const router = useRouter()
  const resolvedPersistKey = resolveFormDraftKey(persistKey, pathname)

  const handleClick = () => {
    if (disabled) return

    void leaveWithUnsavedGuard().then((canLeave) => {
      if (!canLeave) return

      if (resolvedPersistKey) {
        clearFormDraft(resolvedPersistKey)
      }

      onClick?.()
      router.push(href)
    })
  }

  return (
    <Button
      type='button'
      variant={variant}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  )
}

export default FormDiscardButton
