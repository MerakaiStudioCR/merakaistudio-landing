'use client'

import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from '~/components/ui/link'
import useMessages from '~/i18n/useMessages'
import { cn } from '~/shared/lib/cn'
import { leaveWithUnsavedGuard } from '~/shared/lib/form/guarded-navigation'

interface Props {
  href?: string
  label?: string
  className?: string
}

const backButtonClassName = 'shell-back-link'

const BackButton = ({ href, label, className }: Props) => {
  const router = useRouter()
  const t = useMessages()
  const text = label ?? t('global.back')

  if (href) {
    return (
      <Link href={href} className={cn(backButtonClassName, className)}>
        <ChevronLeftIcon className='size-4' aria-hidden />
        {text}
      </Link>
    )
  }

  return (
    <button
      type='button'
      onClick={() => {
        void leaveWithUnsavedGuard().then((canLeave) => {
          if (canLeave) router.back()
        })
      }}
      className={cn(backButtonClassName, className)}
    >
      <ChevronLeftIcon className='size-4' aria-hidden />
      {text}
    </button>
  )
}

export default BackButton
