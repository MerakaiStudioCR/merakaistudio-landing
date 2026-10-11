'use client'

import BackButton from '~/components/layout/back-button'
import useMessages from '~/i18n/useMessages'
import type { MessageKey } from '~/i18n/types'

interface Props {
  titleKey?: MessageKey
  title?: string
  description?: string
  descriptionKey?: MessageKey
  actions?: React.ReactNode
  showBack?: boolean
  backHref?: string
}

/**
 * Consistent page header for admin listing pages.
 * Layout: [Back] / [Title] ——— [Actions]
 * Optional description sits under the title row.
 */
const PageHeader = ({
  titleKey,
  title,
  description,
  descriptionKey,
  actions,
  showBack,
  backHref
}: Props) => {
  const t = useMessages()
  const heading = title ?? (titleKey ? t(titleKey) : undefined)
  const descriptionText =
    description ?? (descriptionKey ? t(descriptionKey) : undefined)
  const hasBack = showBack || backHref

  return (
    <div className={hasBack ? 'mb-6 space-y-2' : 'mb-6'}>
      {hasBack ? <BackButton href={backHref} /> : null}
      <header className='page-header mb-0'>
        <div className='page-header__title'>
          {heading ? <h1>{heading}</h1> : null}
        </div>

        {actions ? <div className='page-header__actions'>{actions}</div> : null}
      </header>
      {descriptionText ? (
        <p className='mt-2 max-w-3xl text-muted-foreground leading-relaxed'>
          {descriptionText}
        </p>
      ) : null}
    </div>
  )
}

export default PageHeader
