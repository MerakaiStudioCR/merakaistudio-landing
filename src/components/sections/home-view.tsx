import Image from 'next/image'
import { Fragment } from 'react'
import { getTranslations } from 'next-intl/server'
import { ContactSignal } from '~/components/brand/contact-signal'
import { CreativeSystem } from '~/components/brand/creative-system'
import { MerakaiScene } from '~/components/brand/merakai-scene'
import { ServiceArt } from '~/components/brand/service-art'
import { products } from '~/content/products'
import { getPublicContactEmail } from '~/content/site'
import HomeContactForm from '~/features/contact/home-contact-form'
import { Link } from '~/i18n/navigation'

const tickerItems = [2, 3, 4, 1] as const
const tickerCopies = ['a', 'b'] as const
const services = [
  { item: 3, tone: 'brand', icon: '⌘' },
  { item: 1, tone: 'software', icon: '↗' },
  { item: 2, tone: 'product', icon: '▧' },
  { item: 4, tone: 'strategy', icon: '✳' },
  { item: 5, tone: 'content', icon: '◉' },
  { item: 6, tone: 'consult', icon: '⟡' }
] as const
const marqueeCopies = ['a', 'b'] as const
const clients = [
  { name: 'Mundo Futsal', src: '/brand/mundo-futsal.svg', tone: 'light' },
  { name: 'Klinue', src: '/brand/Klinue.svg', tone: 'light' },
  {
    name: 'Tienda de Empleados Públicos',
    src: '/brand/tep-official.png',
    tone: 'light',
    ink: 'white'
  },
  { name: 'Ritter Sport', src: '/brand/ritter-sport.svg', tone: 'light' },
  { name: 'Saeta', src: '/brand/Saeta.svg', tone: 'dark' },
  { name: 'CCDR San José', src: '/brand/san-jose-ccdr.png', tone: 'light' },
  { name: 'Katana', src: '/brand/katana-wordmark.png', tone: 'dark' },
  { name: 'Munich', src: '/brand/munich.svg', tone: 'light' },
  { name: 'Joma Futsal', src: '/brand/Joma_Logo.png', tone: 'light' }
] as const
const steps = [1, 2, 3, 4] as const
const barHeights = ['38%', '75%', '58%', '85%', '63%', '92%']
const waves = [1, 2, 3, 4, 5, 6, 7, 8]

const HomeView = async () => {
  const t = await getTranslations('site')
  const email = getPublicContactEmail()
  const zaffiro = products.find((product) => product.slug === 'zaffiro')
  const dyniq = products.find((product) => product.slug === 'dyniq')

  return (
    <div className='merakai-landing'>
      <section className='hero' id='inicio'>
        <div className='wrap hero-inner'>
          <div className='hero-copy'>
            <div className='eyebrow orange'>{t('home.hero.eyebrow')}</div>
            <h1>
              {t('home.hero.titleLead')}{' '}
              <em>{`${t('home.hero.titleAccent')}${t('home.hero.titleEnd')}`}</em>
            </h1>
            <p className='hero-sub'>{t('home.hero.subtitle')}</p>
            <div className='hero-actions'>
              <a className='btn btn-primary' href='#productos'>
                {t('home.hero.primaryCta')} <span>↗</span>
              </a>
              <a className='btn btn-ghost' href='#estudio'>
                {t('home.hero.secondaryCta')} <span>↘</span>
              </a>
            </div>
            <div className='hero-foot'>
              <span>
                <i /> {t('home.studio.discipline1Title')}
              </span>
              <span>
                <i /> {t('home.studio.discipline2Title')}
              </span>
              <span>
                <i /> {t('home.studio.discipline3Title')}
              </span>
            </div>
          </div>
          <MerakaiScene
            lab={t('home.hero.lab')}
            labLine={t('home.hero.labLine')}
            pill={t('home.hero.pill')}
            label={t('home.hero.scene')}
          />
        </div>
      </section>
      <div className='ticker ticker-seamless' aria-hidden='true'>
        <div className='ticker-track'>
          {tickerCopies.map((copy) => (
            <div className='ticker-unit' key={copy}>
              {tickerItems.map((item) => (
                <span key={`${copy}-${item}`}>
                  {t(`home.hero.ticker${item}`)}
                  <b>✳</b>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <section className='section' id='estudio'>
        <div className='wrap intro-grid'>
          <div className='intro-main'>
            <div className='eyebrow orange'>{t('home.studio.eyebrow')}</div>
            <h2 className='section-title'>
              <TitleLines value={t('home.studio.title')} />
            </h2>
            <p className='intro-lead'>{t('home.studio.body')}</p>
          </div>
          <div className='intro-right'>
            <CreativeSystem
              label={t('home.studio.scene')}
              system={t('home.studio.system')}
              live={t('home.studio.live')}
              impact={t('home.studio.impact')}
              connections={t('home.studio.connections')}
              strategy={t('home.studio.discipline1Title')}
              creativity={t('home.studio.discipline2Title')}
              technology={t('home.studio.discipline3Title')}
            />
            <p className='intro-statement'>
              <strong>{t('home.studio.asideTitle')}</strong>
              <br />
              {t('home.studio.asideBody')}
            </p>
          </div>
        </div>
      </section>
      <section className='section work-section' id='productos'>
        <div className='wrap'>
          <div className='section-heading'>
            <div>
              <div className='eyebrow orange'>{t('home.products.eyebrow')}</div>
              <h2 className='section-title'>
                <TitleLines value={t('home.products.title')} />
              </h2>
            </div>
            <p>{t('home.products.intro')}</p>
          </div>
          <article className='product-feature'>
            <div className='product-copy'>
              <div>
                <div className='eyebrow orange'>
                  {t('home.products.featureEyebrow')}
                </div>
                <h3>
                  {t('items.zaffiro.name')}
                  <span className='orange'>.</span>
                </h3>
                <p>{t('home.products.featureBody')}</p>
              </div>
              <div className='product-actions'>
                {zaffiro?.websiteUrl ? (
                  <a
                    className='product-bottom'
                    href={zaffiro.websiteUrl}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t('product.discover', { name: t('items.zaffiro.name') })}{' '}
                    <span>↗</span>
                  </a>
                ) : null}
              </div>
            </div>
            <div className='product-visual' aria-hidden>
              <div className='water' />
              <div className='water-top'>
                <div className='toolbar'>{t('home.products.panel')}</div>
                <div className='ui-grid'>
                  <div className='ui-block'>
                    <p className='ui-label'>{t('home.products.flow')}</p>
                    <div className='bars'>
                      {barHeights.map((height) => (
                        <i key={height} style={{ height }} />
                      ))}
                    </div>
                  </div>
                  <div className='ui-block'>
                    <p className='ui-label'>{t('home.products.central')}</p>
                  </div>
                  <div className='ui-block wide'>
                    <p className='ui-label'>{t('home.products.summary')}</p>
                    <svg
                      className='wave'
                      viewBox='0 0 400 85'
                      preserveAspectRatio='none'
                      role='presentation'
                      aria-hidden
                    >
                      <path
                        d='M0 70 Q30 40 60 52 T120 35 T180 55 T240 27 T300 30 T360 10 T400 19'
                        stroke='#2e9e96'
                        fill='none'
                        strokeWidth='4'
                      />
                      <path
                        d='M0 70 Q30 40 60 52 T120 35 T180 55 T240 27 T300 30 T360 10 T400 19 V85 H0Z'
                        fill='#8fc1b538'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <div className='product-grid'>
            <Link
              href='/products/kizvna'
              prefetch={false}
              className='product-tile'
            >
              <div className='tile-art kiz' aria-hidden>
                <div className='vinyl' />
                <div className='soundwave'>
                  {waves.map((bar) => (
                    <i key={bar} />
                  ))}
                </div>
              </div>
              <div className='tile-copy'>
                <div className='eyebrow orange'>
                  {t('home.products.kizvnaEyebrow')}
                </div>
                <h3>
                  {t('items.kizvna.name')}
                  <span className='orange'>.</span>
                </h3>
                <p>{t('home.products.kizvnaBody')}</p>
                <span className='tile-link'>
                  {t('product.discover', { name: t('items.kizvna.name') })}{' '}
                  <span>↗</span>
                </span>
              </div>
            </Link>
            <article className='product-tile product-tile--static'>
              <div className='tile-art vyt' aria-hidden>
                <div className='phone'>
                  <strong>{t('items.vytal.name')}</strong>
                  <span />
                  <div className='ring' />
                  <span />
                </div>
              </div>
              <div className='tile-copy'>
                <div className='eyebrow orange'>
                  {t('home.products.vytalEyebrow')}
                </div>
                <h3>
                  {t('items.vytal.name')}
                  <span className='orange'>.</span>
                </h3>
                <p>{t('home.products.vytalBody')}</p>
              </div>
            </article>
            <a
              href={dyniq?.websiteUrl}
              target='_blank'
              rel='noreferrer'
              className='product-tile'
            >
              <div className='tile-art dyn' aria-hidden>
                <div className='chatbox'>
                  <strong>{t('home.products.chatTitle')}</strong>
                  <div className='bubble'>{t('home.products.chat1')}</div>
                  <div className='bubble right'>{t('home.products.chat2')}</div>
                  <div className='bubble orange-bubble'>
                    {t('home.products.chat3')}
                  </div>
                </div>
              </div>
              <div className='tile-copy'>
                <div className='eyebrow orange'>
                  {t('home.products.dyniqEyebrow')}
                </div>
                <h3>
                  {t('items.dyniq.name')}
                  <span className='orange'>.</span>
                </h3>
                <p>{t('home.products.dyniqBody')}</p>
                <span className='tile-link'>
                  {t('product.discover', { name: t('items.dyniq.name') })}{' '}
                  <span>↗</span>
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>
      <section className='clients-section' id='clientes'>
        <div className='wrap'>
          <div className='clients-intro'>
            <div>
              <div className='eyebrow orange'>{t('home.clients.eyebrow')}</div>
              <h2 className='section-title'>
                <TitleLines value={t('home.clients.titleLead')} />
                <span className='orange'>{t('home.hero.titleEnd')}</span>
              </h2>
            </div>
            <p>{t('home.clients.subtitle')}</p>
          </div>
          <ul className='client-logos' aria-label={t('home.clients.eyebrow')}>
            {clients.map((client) => (
              <li
                className={`client-logo client-logo--${client.tone}${'ink' in client && client.ink === 'white' ? ' client-logo--white' : ''}`}
                key={client.name}
              >
                <img src={client.src} alt={client.name} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className='section service-section' id='servicios'>
        <div className='wrap'>
          <div className='eyebrow orange'>{t('home.capabilities.eyebrow')}</div>
          <div className='section-heading'>
            <h2 className='section-title'>
              <TitleLines value={t('home.capabilities.titleLead')} />
              <br />
              <span className='muted-title'>
                {t('home.capabilities.titleMuted')}
              </span>
            </h2>
            <p>{t('home.capabilities.aside')}</p>
          </div>
          <div className='service-grid'>
            {services.map((service, index) => (
              <article className='service' key={service.item}>
                <ServiceArt tone={service.tone} />
                <div className='service-number'>
                  {String(index + 1).padStart(2, '0')}{' '}
                  <span className='service-icon'>{service.icon}</span>
                </div>
                <h3>{t(`home.capabilities.item${service.item}Title`)}</h3>
                <p>{t(`home.capabilities.item${service.item}Body`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className='philosophy' id='metodo'>
        <div className='wrap'>
          <div className='philo-grid'>
            <div className='philo-art'>
              <div
                className='essence-art-v2 essence-art-craft'
                role='img'
                aria-label={t('home.philosophy.craft')}
              >
                <Image
                  className='essence-render'
                  src='/brand/merakai-essence-craft.png'
                  alt=''
                  width={1536}
                  height={1024}
                />
              </div>
            </div>
            <div className='philo-copy'>
              <div className='eyebrow orange'>
                {t('home.philosophy.eyebrow')}
              </div>
              <h2 className='section-title'>
                <TitleLines value={t('home.philosophy.title')} />
              </h2>
              <p>
                {t.rich('home.philosophy.body', {
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </p>
            </div>
          </div>
          <div className='steps'>
            {steps.map((step) => (
              <div className='step' key={step}>
                <b>0{step}.</b>
                <h3>{t(`home.process.step${step}Title`)}</h3>
                <p>{t(`home.process.step${step}Body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className='closing closing-v3' id='contacto'>
        <div className='closing-grid-overlay' />
        <div className='wrap closing-layout'>
          <div className='closing-left'>
            <div className='eyebrow'>
              {t('home.cta.eyebrow')}{' '}
              <span className='contact-status'>{t('home.cta.status')}</span>
            </div>
            <h2>
              {t('home.cta.headlineLead')}
              <br />
              <em>{t('home.cta.headlineEm')}</em>
              <br />
              {t('home.cta.headlineEnd')}
              <span className='orange'>.</span>
            </h2>
            <p className='closing-support'>{t('home.cta.title')}</p>
            <p className='closing-subtitle'>{t('home.cta.subtitle')}</p>
            <ContactSignal />
          </div>
          <div className='closing-right'>
            <div className='contact-panel' id='mensaje'>
              <div className='form-heading'>
                <span>{t('home.cta.formKicker')}</span>
                <span>↗</span>
              </div>
              <div className='form-question'>
                <TitleLines value={t('home.cta.formQuestion')} />
              </div>
              <HomeContactForm email={email} />
            </div>
          </div>
        </div>
        <div className='contact-marquee' aria-hidden>
          <div>
            {marqueeCopies.map((copy) => (
              <Fragment key={copy}>
                {t('home.cta.marquee1')} <span>✳</span> {t('home.cta.marquee2')}{' '}
                <span>✳</span> {t('home.cta.marquee3')} <span>✳</span>{' '}
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function TitleLines({ value }: { value: string }) {
  const lines = value.split('\n')
  return lines.map((line) => (
    <span key={line}>
      {line}
      {line !== lines.at(-1) ? <br /> : null}
    </span>
  ))
}

export default HomeView
