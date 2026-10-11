import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '~/i18n/navigation'
import { KizvnaStill, type KizvnaStillId } from './kizvna-still'

const trio: readonly {
  still: KizvnaStillId
  body: 'work1Body' | 'work2Body' | 'work5Body'
}[] = [
  { still: 'music', body: 'work1Body' },
  { still: 'photo', body: 'work2Body' },
  { still: 'fashion', body: 'work5Body' }
]

const coverFrames = [
  { src: '/kizvna/experience.webp', alt: 'image6Alt', focus: 'prints' },
  { src: '/kizvna/presence.webp', alt: 'role2Alt', focus: '' },
  { src: '/kizvna/music.webp', alt: 'image1Alt', focus: '' },
  { src: '/kizvna/photo.webp', alt: 'image2Alt', focus: '' }
] as const

function CoverFrames({ labels }: { labels: readonly string[] }) {
  return (
    <ul className='kizvna-cover' aria-hidden>
      {coverFrames.map((frame, index) => (
        <li
          key={frame.src}
          className={`kizvna-cover__item${frame.focus ? ` kizvna-cover__item--${frame.focus}` : ''}`}
        >
          <Image
            src={frame.src}
            alt={labels[index] ?? ''}
            fill
            sizes='(min-width: 1024px) 18rem, 42vw'
            className='kizvna-still__image'
          />
        </li>
      ))}
    </ul>
  )
}

export async function KizvnaStory() {
  const t = await getTranslations('site.items.kizvna.identity')

  return (
    <div className='kizvna-studio'>
      <section className='kizvna-reel'>
        <div className='kizvna-flow'>
          <div className='kizvna-flow__scene'>
            <div className='kizvna-reel__plate'>
              <Image
                src='/kizvna/arrival.webp'
                alt={t('image0Alt')}
                fill
                priority
                sizes='100vw'
                className='kizvna-still__image'
              />
            </div>
            <CoverFrames
              labels={[
                t('image6Alt'),
                t('role2Alt'),
                t('image1Alt'),
                t('image2Alt')
              ]}
            />
            <div className='kizvna-flow__copy'>
              <p className='kizvna-kicker'>{t('workTitle')}</p>
              <h1 className='kizvna-name'>KIZVNA</h1>
              <p className='mt-6 max-w-xl font-heading text-2xl leading-snug tracking-[-0.03em] sm:text-3xl'>
                {t('heroLead')}
              </p>
              <Link
                href='/contact'
                prefetch={false}
                className='kizvna-invite__action merakai-action mt-8 inline-flex w-fit px-6 py-4 font-heading font-semibold text-lg'
              >
                {t('inviteCta')}
              </Link>
            </div>
            <div className='kizvna-reel__hint' aria-hidden />
          </div>
          <div className='kizvna-flow__scene kizvna-flow__scene--plain'>
            <KizvnaStill still='music' priority />
          </div>
          <div className='kizvna-flow__scene kizvna-flow__scene--plain'>
            <KizvnaStill still='photo' />
          </div>
          <div className='kizvna-flow__scene kizvna-flow__scene--plain'>
            <KizvnaStill still='presence' />
            <div className='kizvna-flow__aside'>
              <p className='max-w-xl text-lg leading-relaxed'>
                {t('heroBody')}
              </p>
              <p className='mt-4 max-w-xl leading-relaxed'>{t('workBody')}</p>
            </div>
          </div>
        </div>

        <div className='kizvna-stage'>
          <div className='kizvna-reel__pin'>
            <div className='kizvna-reel__plate'>
              <Image
                src='/kizvna/arrival.webp'
                alt={t('image0Alt')}
                fill
                priority
                sizes='100vw'
                className='kizvna-still__image'
              />
            </div>
            <CoverFrames
              labels={[
                t('image6Alt'),
                t('role2Alt'),
                t('image1Alt'),
                t('image2Alt')
              ]}
            />
            <div className='kizvna-light' aria-hidden />
            <div className='kizvna-reel__copy'>
              <p className='kizvna-kicker'>{t('workTitle')}</p>
              <h1 className='kizvna-name'>KIZVNA</h1>
              <p className='mt-6 max-w-xl font-heading text-2xl leading-snug tracking-[-0.03em]'>
                {t('heroLead')}
              </p>
              <Link
                href='/contact'
                prefetch={false}
                className='kizvna-invite__action merakai-action mt-8 inline-flex w-fit px-6 py-4 font-heading font-semibold text-lg'
              >
                {t('inviteCta')}
              </Link>
            </div>
            <div className='kizvna-reel__still'>
              <KizvnaStill
                still='music'
                stack={['music', 'photo', 'presence']}
                priority
              />
              <span className='kizvna-reel__veil' aria-hidden />
            </div>
            <div className='kizvna-reel__aside'>
              <p className='text-lg leading-relaxed'>{t('heroBody')}</p>
              <p className='mt-4 leading-relaxed'>{t('workBody')}</p>
            </div>
            <div className='kizvna-reel__hint' aria-hidden />
          </div>
        </div>
      </section>

      <section className='kizvna-street'>
        <div className='kizvna-street__copy'>
          <p className='kizvna-kicker'>{t('workTitle')}</p>
          <h2 className='kizvna-street__title'>{t('work1')}</h2>
          <h2 className='kizvna-street__title kizvna-street__title--quiet'>
            {t('work5')}
          </h2>
        </div>
        <div className='kizvna-street__media'>
          <div className='kizvna-street__shot'>
            <Image
              src='/kizvna/ads.webp'
              alt={t('image3Alt')}
              fill
              sizes='(min-width: 1024px) 42vw, 100vw'
              className='kizvna-still__image'
            />
          </div>
          <div className='kizvna-street__shot kizvna-street__shot--late'>
            <Image
              src='/kizvna/fashion.webp'
              alt={t('image5Alt')}
              fill
              sizes='(min-width: 1024px) 36vw, 86vw'
              className='kizvna-still__image'
            />
          </div>
          <div className='kizvna-street__hand'>
            <KizvnaStill still='spot' size='trio' />
          </div>
        </div>
      </section>

      <section className='kizvna-trio'>
        <ul className='kizvna-trio__list'>
          {trio.map((item) => (
            <li key={item.still} className='kizvna-trio__item'>
              <KizvnaStill still={item.still} size='trio' />
              <p className='mt-5 max-w-xs text-sm leading-relaxed'>
                {t(item.body)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className='kizvna-trust'>
        <div className='kizvna-light kizvna-light--quiet' aria-hidden />
        <div className='kizvna-trust__copy mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-12'>
          <h2 className='font-heading font-semibold text-4xl tracking-[-0.04em] sm:text-5xl lg:col-span-5'>
            {t('trustTitle')}
          </h2>
          <div className='lg:col-span-6 lg:col-start-7'>
            <p className='text-xl leading-relaxed'>{t('trustBody')}</p>
          </div>
        </div>
      </section>

      <section className='kizvna-close'>
        <KizvnaStill still='arrival' />
        <p className='kizvna-name'>KIZVNA</p>
        <p className='kizvna-kofah'>{t('kofahTitle')}</p>
        <p className='kizvna-kofah__line'>{t('kofahLine')}</p>
        <h2 className='mt-10 font-heading font-semibold text-4xl tracking-[-0.04em] sm:text-5xl'>
          {t('inviteTitle')}
        </h2>
        <p className='mt-4 max-w-xl text-lg leading-relaxed'>
          {t('inviteBody')}
        </p>
        <Link
          href='/contact'
          prefetch={false}
          className='kizvna-invite__action merakai-action mt-8 inline-flex w-fit px-6 py-4 font-heading font-semibold text-lg'
        >
          {t('inviteCta')}
        </Link>
      </section>
    </div>
  )
}
