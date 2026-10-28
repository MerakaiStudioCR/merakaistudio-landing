import Image from 'next/image'

interface CreativeSystemProps {
  label: string
  system: string
  live: string
  impact: string
  connections: string
  strategy: string
  creativity: string
  technology: string
}

export function CreativeSystem({
  label,
  system,
  live,
  impact,
  connections,
  strategy,
  creativity,
  technology
}: CreativeSystemProps) {
  return (
    <div className='idea-lab' role='img' aria-label={label}>
      <div className='lab-grid' />
      <div className='lab-head'>
        <span>{system}</span>
        <span className='lab-live'>
          <i /> {live}
        </span>
      </div>
      <div className='lab-core'>
        <span className='lab-orbit lab-orbit-one' />
        <span className='lab-orbit lab-orbit-two' />
        <div className='lab-center'>
          <Image
            src='/brand/merakai-symbol-official.png'
            alt=''
            width={840}
            height={828}
          />
          <small>{impact}</small>
        </div>
        <div className='lab-node node-strategy'>
          <b>01</b>
          <span>{strategy}</span>
          <i>↗</i>
        </div>
        <div className='lab-node node-creative'>
          <b>02</b>
          <span>{creativity}</span>
          <i>✳</i>
        </div>
        <div className='lab-node node-tech'>
          <b>03</b>
          <span>{technology}</span>
          <i>⌘</i>
        </div>
      </div>
      <div className='lab-footer'>
        <span>{connections}</span>
        <span>001 — ∞</span>
      </div>
    </div>
  )
}
