import { Fragment, type ReactNode } from 'react'
import { getLocale } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '~/i18n/navigation'
import '~/styles/motion/kizvna-cinema.css'
import { type ChapterCopy, cinemaCopy } from './kizvna-cinema-copy'
import { KizvnaCinemaMotion } from './kizvna-cinema-motion'
import { KizvnaCinemaNav } from './kizvna-cinema-nav'

function EmText({ text }: { text: string }) {
  const nodes: ReactNode[] = []
  const pattern = /\*([^*]+)\*/g
  let cursor = 0
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0
    if (start > cursor) nodes.push(text.slice(cursor, start))
    nodes.push(<em key={match[1]}>{match[1]}</em>)
    cursor = start + match[0].length
  }
  if (cursor === 0) return text
  if (cursor < text.length) nodes.push(text.slice(cursor))
  return nodes
}

function Lines({ text }: { text: string }) {
  const [first, ...rest] = text.split('\n')
  if (!first) return null
  return (
    <>
      <EmText text={first} />
      {rest.map((line) => (
        <Fragment key={line}>
          <br />
          <EmText text={line} />
        </Fragment>
      ))}
    </>
  )
}

function Chapter({ chapter }: { chapter: ChapterCopy }) {
  return (
    <section
      className={`chapter ${chapter.kind}`}
      id={chapter.id}
      data-chapter=''
    >
      <div className='chapter-sticky'>
        <div className='chapter-media' role='img' aria-label={chapter.alt} />
        <div className='chapter-vignette' />
        <div className='chapter-ui'>
          <span>{chapter.index}</span>
          <span>
            {chapter.scene}
            {chapter.record ? (
              <>
                {' '}
                <i className='record-dot' />
              </>
            ) : null}
          </span>
        </div>
        <div className='chapter-text'>
          <span className='chapter-overline'>{chapter.overline}</span>
          <h2>
            <Lines text={chapter.title} />
          </h2>
          <p>{chapter.body}</p>
        </div>
        <div className='chapter-detail'>
          <b>{chapter.detail}</b>
          <span>{chapter.tags}</span>
        </div>
        <div className='chapter-progress'>
          <i />
        </div>
        {chapter.bars ? (
          <div className='sound-bars' aria-hidden='true'>
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        ) : null}
      </div>
    </section>
  )
}

function Breather({ text, tone }: { text: string; tone: 'dark' | 'light' }) {
  const [kicker, ...rest] = text.split('\n')
  return (
    <section className={`breather breather-${tone}`}>
      <span>{kicker}</span>
      <p>
        <Lines text={rest.join('\n')} />
      </p>
    </section>
  )
}

export async function KizvnaStory() {
  const locale = await getLocale()
  const copy = cinemaCopy(locale)
  const year = new Date().getFullYear()
  const { chapters } = copy

  return (
    <div className='kizvna-cinema'>
      <KizvnaCinemaMotion />
      <a className='skip' href='#contenido'>
        {copy.skip}
      </a>
      <KizvnaCinemaNav {...copy.nav} />
      <main id='contenido'>
        <section className='opening' id='inicio'>
          <div className='opening-frame'>
            <div className='opening-photo' aria-hidden='true' />
            <div className='opening-shade' />
            <div className='opening-inner'>
              <div className='opening-eyebrow'>
                <span className='dot' /> {copy.opening.eyebrow}
              </div>
              <div className='opening-bottom'>
                <div className='opening-identity'>
                  <h1>
                    KIZ<span>V</span>NA<sup>®</sup>
                  </h1>
                  <p className='opening-tagline'>
                    <Lines text={copy.opening.tagline} />
                  </p>
                </div>
                <a className='scroll-link' href='#vision'>
                  {copy.opening.scroll} <b>↓</b>
                </a>
              </div>
            </div>
            <div className='opening-portal' aria-hidden='true'>
              <div className='portal-ray' />
              <span>{copy.opening.portalKicker}</span>
              <p>
                <Lines text={copy.opening.portalTitle} />
              </p>
              <small>{copy.opening.portalNote}</small>
            </div>
            <div className='frame-corner left'>{copy.opening.frameLeft}</div>
            <div className='frame-corner right'>{copy.opening.frameRight}</div>
          </div>
        </section>

        <section className='vision' id='vision'>
          <div className='eyebrow dark'>{copy.vision.eyebrow}</div>
          <h2>
            <Lines text={copy.vision.title} />
          </h2>
          <div className='vision-bottom'>
            <p>
              {copy.vision.body.includes('kizuna') ? (
                <>
                  {copy.vision.body.split('kizuna')[0]}
                  <strong>kizuna</strong>
                  {copy.vision.body.split('kizuna')[1]}
                </>
              ) : (
                copy.vision.body
              )}
            </p>
            <span>
              <Lines text={copy.vision.aside} />
            </span>
          </div>
        </section>

        <div className='chapter-intro'>
          <span>{copy.intro.kicker}</span>
          <strong>{copy.intro.line}</strong>
          <span>{copy.intro.hint}</span>
        </div>

        <Chapter chapter={chapters.cinema} />

        <section className='commitment editorial-swipe' id='compromiso'>
          <div className='editorial-pin'>
            <div className='commitment-top'>
              <span>{copy.commitment.left}</span>
              <span>{copy.commitment.right}</span>
            </div>
            <div className='commitment-heading'>
              <h2>
                <Lines text={copy.commitment.title} />
              </h2>
              <p>{copy.commitment.body}</p>
            </div>
            <div className='commitment-list editorial-track'>
              {copy.commitment.items.map((item) => (
                <article key={item.kicker}>
                  <span>{item.kicker}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Breather text={copy.breathers.scene} tone='dark' />
        <Chapter chapter={chapters.ad} />

        <section className='services service-sequence' id='servicios'>
          <div className='editorial-pin'>
            <div className='services-heading'>
              <span>{copy.services.kicker}</span>
              <h2>
                <Lines text={copy.services.title} />
              </h2>
              <p>{copy.services.body}</p>
            </div>
            <div className='service-list'>
              <span className='sr-only'>{copy.services.listLabel}</span>
              {copy.services.items.map((item, index) => (
                <article
                  key={item.num}
                  className={
                    index === 0 ? 'service-item is-current' : 'service-item'
                  }
                >
                  <span className='service-num'>{item.num}</span>
                  <h3>{item.title}</h3>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className='services-note'>
              <span>{copy.services.note}</span>
              <p>{copy.services.noteBody}</p>
              <Link href='/contact' prefetch={false}>
                {copy.services.cta}
              </Link>
            </div>
          </div>
        </section>

        <Breather text={copy.breathers.emotion} tone='light' />
        <Chapter chapter={chapters.creators} />

        <section
          className='service-interlude'
          id='puente-creadores'
          aria-label={copy.interludes.creators.label}
        >
          <div className='interlude-rule'>
            <span>{copy.interludes.creators.left}</span>
            <span>{copy.interludes.creators.right}</span>
          </div>
          <div className='interlude-core'>
            <span className='interlude-kicker'>
              {copy.interludes.creators.kicker}
            </span>
            <h2>
              <Lines text={copy.interludes.creators.title} />
            </h2>
            <p>{copy.interludes.creators.body}</p>
          </div>
          <div className='interlude-bottom'>
            <span>{copy.interludes.creators.bottom}</span>
            <span>{copy.interludes.creators.next}</span>
          </div>
        </section>

        <Chapter chapter={chapters.training} />

        <section className='workflow editorial-swipe' id='proceso'>
          <div className='editorial-pin'>
            <div
              className='workflow-image'
              role='img'
              aria-label={copy.workflow.alt}
            />
            <div className='workflow-content'>
              <span className='eyebrow'>{copy.workflow.eyebrow}</span>
              <h2>
                <Lines text={copy.workflow.title} />
              </h2>
              <p className='workflow-lead'>{copy.workflow.lead}</p>
              <ol className='editorial-track'>
                {copy.workflow.steps.map((step) => (
                  <li key={step.num}>
                    <b>{step.num}</b>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <Chapter chapter={chapters.music} />
        <Breather text={copy.breathers.frequency} tone='dark' />
        <Chapter chapter={chapters.atelier} />

        <section
          className='service-interlude interlude-fashion'
          id='puente-moda'
          aria-label={copy.interludes.fashion.label}
        >
          <div className='interlude-rule'>
            <span>{copy.interludes.fashion.left}</span>
            <span>{copy.interludes.fashion.right}</span>
          </div>
          <div className='interlude-core'>
            <span className='interlude-kicker'>
              {copy.interludes.fashion.kicker}
            </span>
            <h2>
              <Lines text={copy.interludes.fashion.title} />
            </h2>
            <p>{copy.interludes.fashion.body}</p>
          </div>
          <div className='interlude-bottom'>
            <span>{copy.interludes.fashion.bottom}</span>
            <span>{copy.interludes.fashion.next}</span>
          </div>
        </section>

        <Chapter chapter={chapters.fashion} />

        <section className='intercut' id='conexion'>
          <div className='intercut-head'>
            <span>{copy.intercut.left}</span>
            <span>{copy.intercut.right}</span>
          </div>
          <h2>
            <Lines text={copy.intercut.title} />
          </h2>
          <div className='intercut-reel'>
            <span className='sr-only'>{copy.intercut.label}</span>
            {copy.intercut.frames.map((frame) => (
              <div key={frame.num} className='reel-frame reel-type'>
                <strong>{frame.num}</strong>
                <span>{frame.label}</span>
              </div>
            ))}
          </div>
          <p>{copy.intercut.body}</p>
        </section>

        <section className='manifesto' id='codigo'>
          <div className='manifesto-top'>
            <span>{copy.manifesto.left}</span>
            <span>{copy.manifesto.right}</span>
          </div>
          <h2>
            <Lines text={copy.manifesto.title} />
          </h2>
          <div className='manifesto-bottom'>
            <p>{copy.manifesto.body}</p>
            <span>
              <Lines text={copy.manifesto.sign} />
            </span>
          </div>
        </section>

        <section
          className='manifesto-visual'
          id='vinculo-visual'
          aria-label={copy.connection.label}
          data-act='0'
        >
          <div className='connection-pin'>
            <div className='connection-photo'>
              <Image
                src='/kizvna/cinema/kizvna-manifesto-collective.webp'
                alt={copy.connection.alt}
                width={1672}
                height={941}
              />
            </div>
            <div className='connection-grain' aria-hidden='true' />
            <div className='connection-orbit' aria-hidden='true'>
              <svg
                viewBox='0 0 1000 650'
                preserveAspectRatio='xMidYMid meet'
                focusable='false'
                aria-hidden='true'
              >
                <circle className='orbit-ring' cx='610' cy='325' r='205' />
                <circle
                  className='orbit-ring orbit-ring-dashed'
                  cx='610'
                  cy='325'
                  r='136'
                />
                <path
                  className='orbit-path'
                  d='M 290 110 C 390 140, 440 260, 610 325'
                  pathLength='1'
                />
                <path
                  className='orbit-path'
                  d='M 772 104 C 740 190, 680 260, 610 325'
                  pathLength='1'
                />
                <path
                  className='orbit-path'
                  d='M 867 515 C 760 505, 715 375, 610 325'
                  pathLength='1'
                />
                <path
                  className='orbit-path'
                  d='M 285 515 C 390 485, 490 390, 610 325'
                  pathLength='1'
                />
                <circle className='orbit-dot' cx='290' cy='110' r='7' />
                <circle className='orbit-dot' cx='772' cy='104' r='7' />
                <circle className='orbit-dot' cx='867' cy='515' r='7' />
                <circle className='orbit-dot' cx='285' cy='515' r='7' />
                <circle
                  className='orbit-center-halo'
                  cx='610'
                  cy='325'
                  r='59'
                />
                <circle className='orbit-center' cx='610' cy='325' r='13' />
              </svg>
              <span className='connection-node node-image'>
                <b>01</b> {copy.connection.nodes[0]}
              </span>
              <span className='connection-node node-sound'>
                <b>02</b> {copy.connection.nodes[1]}
              </span>
              <span className='connection-node node-culture'>
                <b>03</b> {copy.connection.nodes[2]}
              </span>
              <span className='connection-node node-talent'>
                <b>04</b> {copy.connection.nodes[3]}
              </span>
              <span className='connection-core'>
                {copy.connection.core.split('\n')[0]}
                <br />
                <strong>{copy.connection.core.split('\n')[1]}</strong>
              </span>
            </div>
            <div className='connection-top'>
              <span>{copy.connection.topLeft}</span>
              <span>{copy.connection.topRight}</span>
            </div>
            {copy.connection.stories.map((story, index) => (
              <div
                key={story.kicker}
                className={`connection-story ${
                  ['story-first', 'story-second', 'story-third'][index]
                }`}
              >
                <span>{story.kicker}</span>
                <h2>
                  <Lines text={story.title} />
                </h2>
                <p>{story.body}</p>
              </div>
            ))}
            <div className='connection-progress' aria-hidden='true'>
              <i />
            </div>
          </div>
        </section>

        <section className='contact'>
          <span className='contact-eyebrow'>{copy.contact.eyebrow}</span>
          <h2>
            <Lines text={copy.contact.title} />
          </h2>
          <p>{copy.contact.body}</p>
          <Link href='/contact' prefetch={false}>
            {copy.contact.cta} <b>↗</b>
          </Link>
          <span className='contact-aside'>{copy.contact.aside}</span>
        </section>
      </main>
      <footer className='footer'>
        <a className='wordmark' href='#inicio'>
          KIZVNA<span>®</span>
        </a>
        <p>{copy.footer.line}</p>
        <Link href='/#productos' prefetch={false}>
          {copy.footer.universe}
        </Link>
        <span>
          © {year} KIZVNA · {copy.footer.note}
        </span>
      </footer>
    </div>
  )
}
