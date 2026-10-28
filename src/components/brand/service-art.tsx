interface ServiceArtProps {
  tone: 'software' | 'brand' | 'product' | 'strategy' | 'content' | 'consult'
}

export function ServiceArt({ tone }: ServiceArtProps) {
  return (
    <div className='service-art' aria-hidden>
      {tone === 'brand' ? <BrandArt /> : null}
      {tone === 'software' ? <SoftwareArt /> : null}
      {tone === 'product' ? <ProductArt /> : null}
      {tone === 'strategy' ? <StrategyArt /> : null}
      {tone === 'content' ? <ContentArt /> : null}
      {tone === 'consult' ? <ConsultArt /> : null}
    </div>
  )
}

function BrandArt() {
  return (
    <div className='brand-board'>
      <div className='brand-sheet'>
        <span className='brand-sheet-label'>VISUAL IDENTITY / 01</span>
        <strong>Aa</strong>
        <div className='brand-lines'>
          <i />
          <i />
        </div>
        <div className='brand-swatches'>
          <b />
          <b />
          <b />
        </div>
      </div>
      <div className='brand-color-card'>
        <span>
          FORM
          <br />+ FEELING
        </span>
      </div>
      <div className='brand-star'>✳</div>
    </div>
  )
}

function SoftwareArt() {
  return (
    <div className='software-scene'>
      <div className='software-window'>
        <div className='software-bar'>MERAKAI / WORKSPACE</div>
        <div className='software-panel'>
          <b />
          <b />
          <i />
        </div>
      </div>
      <div className='software-code'>
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

function ProductArt() {
  return (
    <div className='ux-device'>
      <div className='screen-orb' />
      <i />
      <i />
    </div>
  )
}

function StrategyArt() {
  return (
    <>
      <div className='strategy-board'>
        <div className='strategy-top'>
          MERAKAI / DIRECTION <span>↗</span>
        </div>
        <svg viewBox='0 0 240 150' role='presentation' aria-hidden>
          <path
            d='M21 121 L76 84 L125 102 L180 44 L223 24'
            fill='none'
            stroke='#F57F20'
            strokeWidth='5'
            strokeLinecap='round'
          />
          <path
            d='M21 121 L76 84 L125 102 L180 44 L223 24'
            fill='none'
            stroke='#F57F20'
            strokeWidth='16'
            opacity='.1'
          />
          <g fill='#082B40' stroke='#e9f4ef' strokeWidth='3'>
            <circle cx='21' cy='121' r='10' />
            <circle cx='76' cy='84' r='10' />
            <circle cx='125' cy='102' r='10' />
            <circle cx='180' cy='44' r='10' />
            <circle cx='223' cy='24' r='10' />
          </g>
        </svg>
        <div className='strategy-bottom'>
          <b>01 / INSIGHT</b>
          <b>02 / IMPACT</b>
        </div>
      </div>
      <span className='strategy-accent'>✳</span>
    </>
  )
}

function ContentArt() {
  const frames = ['1', '2', '3', '4', '5', '6', '7', '8']
  return (
    <div className='production-scene'>
      <div className='film-frame'>
        <div className='film-sun' />
        <div className='film-horizon' />
        <div className='film-mountain' />
        <span className='film-topleft'>REC ●</span>
        <span className='film-bottomright'>FRAME 004</span>
      </div>
      <div className='film-strip'>
        {frames.map((frame) => (
          <i key={frame} />
        ))}
      </div>
      <div className='production-dot'>✳</div>
    </div>
  )
}

function ConsultArt() {
  return <div className='tech-cube' />
}
