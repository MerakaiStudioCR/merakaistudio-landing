'use client'

import { useId, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '~/shared/lib/cn'
import useMessages from '~/i18n/useMessages'

interface Props {
  size?: 'page' | 'section'
  variant?: 'light' | 'dark'
  className?: string
}

const MARK_SIZE = {
  page: { width: 96, height: 146 },
  section: { width: 68, height: 103 }
} as const

const FEATURE_LOADER_HOST_SELECTOR = '[data-feature-loader-host]'

function getFeatureLoaderHost() {
  if (typeof document === 'undefined') return null
  return document.querySelector<HTMLElement>(FEATURE_LOADER_HOST_SELECTOR)
}

const BrandMarkLoader = ({
  size = 'page',
  variant = 'light',
  className
}: Props) => {
  const t = useMessages()
  const titleId = useId()
  const { width, height } = MARK_SIZE[size]
  const isPage = size !== 'section'
  const [featureHost, setFeatureHost] = useState<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (!isPage) {
      setFeatureHost(null)
      return
    }

    setFeatureHost(getFeatureLoaderHost())
  }, [isPage])

  const fillsFeature = Boolean(isPage && featureHost)

  const loader = (
    <output
      className={cn(
        'brand-mark-loader',
        isPage && 'brand-mark-loader--page zaffiro-facet-bg',
        isPage && !fillsFeature && 'brand-mark-loader--page-viewport',
        !isPage && 'brand-mark-loader--section',
        variant === 'dark' && 'brand-mark-loader--dark',
        className
      )}
      data-slot='brand-mark-loader'
      aria-busy
      aria-live='polite'
    >
      <span className='brand-mark-loader__scene'>
        <span className='brand-mark-loader__frame'>
          <span className='brand-mark-loader__orbit' aria-hidden />
          <svg
            className='brand-mark-loader__mark'
            width={width}
            height={height}
            viewBox='0 0 210.92 320.19'
            preserveAspectRatio='xMidYMid meet'
            role='img'
            aria-labelledby={titleId}
          >
            <title id={titleId}>{t('global.loading')}</title>
            {FACETS.map((facet, index) => (
              <path
                key={facet.d}
                className={cn(
                  'brand-mark-loader__facet',
                  `brand-mark-loader__facet--${index + 1}`,
                  'gold' in facet &&
                    facet.gold &&
                    'brand-mark-loader__facet--gold'
                )}
                d={facet.d}
              />
            ))}
          </svg>
        </span>
        <span className='brand-mark-loader__label' aria-hidden>
          {t('global.loading')}
        </span>
      </span>
    </output>
  )

  if (fillsFeature && featureHost) return createPortal(loader, featureHost)

  return loader
}

/** Paths from `public/brand/logo_small.svg`. */
const FACETS = [
  {
    d: 'M101.43,15.91c34.65,62.82,43.56,108.17,43.27,138.64l25.76-44.62C143.74,55.73,101.43,15.91,101.43,15.91Z'
  },
  {
    d: 'M143.79,169.2c-.26,2.18-.56,4.27-.9,6.24l47.23,37.17c0-.09,0-.15,0-.15,5.4-32.98-2.89-66.02-16.25-95.35l-30.08,52.1Z'
  },
  {
    d: 'M14.53,275.67c14.67,15.21,30.05,23.5,44.2,27.78l27.66-47.9c-34.62,20.55-71.85,20.13-71.85,20.13Z'
  },
  {
    d: 'M113.19,303.43c52.84-15.64,69.41-54.77,74.59-76.27l-90.01,21.74-32.49,56.27c26.96,6.06,47.91-1.75,47.91-1.75Z'
  },
  {
    gold: true,
    d: 'M133.96,201.82c-1.47,2.51-2.82,5.1-4.13,7.69-6.22,12.26-14.03,22.25-22.62,30.39l81.87-19.77-47.69-37.53c-2.39,9.68-5.52,16-7.43,19.23Z'
  }
] as const

export default BrandMarkLoader
