import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

const stills = {
  music: {
    src: '/kizvna/music.webp',
    alt: 'image1Alt',
    label: 'work1'
  },
  photo: {
    src: '/kizvna/photo.webp',
    alt: 'image2Alt',
    label: 'work2'
  },
  presence: {
    src: '/kizvna/presence.webp',
    alt: 'role2Alt',
    label: 'role2Title'
  },
  spot: {
    src: '/kizvna/spot.webp',
    alt: 'image4Alt',
    label: 'work4'
  },
  fashion: {
    src: '/kizvna/fashion.webp',
    alt: 'image5Alt',
    label: 'work5'
  },
  arrival: {
    src: '/kizvna/arrival.webp',
    alt: 'image0Alt',
    label: null
  }
} as const

export type KizvnaStillId = keyof typeof stills

interface KizvnaStillProps {
  still: KizvnaStillId
  stack?: readonly KizvnaStillId[]
  size?: 'story' | 'trio' | 'preview'
  priority?: boolean
}

export async function KizvnaStill({
  still,
  stack,
  size = 'story',
  priority = false
}: KizvnaStillProps) {
  const t = await getTranslations('site.items.kizvna.identity')
  const frames = stack ?? [still]
  const wide = !stack && still === 'arrival'

  return (
    <figure className={`kizvna-still kizvna-still--${size}`}>
      <div
        className={`kizvna-still__frame${wide ? ' kizvna-still__frame--wide' : ''}`}
      >
        {frames.map((item, index) => {
          const frame = stills[item]
          const layer = stack
            ? ` kizvna-still__layer kizvna-still__layer--${index}`
            : ''
          return (
            <Image
              key={item}
              src={frame.src}
              alt={t(frame.alt)}
              fill
              priority={priority && index === 0}
              sizes={
                size === 'preview' ? '8rem' : '(min-width: 1024px) 32rem, 92vw'
              }
              className={`kizvna-still__image${layer}`}
            />
          )
        })}
        {frames.map((item, index) => {
          const frame = stills[item]
          if (!frame.label) return null
          const layer = stack ? ` kizvna-still__label--${index}` : ''
          return (
            <span key={frame.label} className={`kizvna-still__label${layer}`}>
              {t(frame.label)}
            </span>
          )
        })}
      </div>
    </figure>
  )
}
