import { cn } from '~/shared/lib/cn'

export type StudioIconName =
  | 'brush'
  | 'pen'
  | 'code'
  | 'music'
  | 'camera'
  | 'frame'
  | 'spark'
  | 'build'
  | 'agent'

const titles: Record<StudioIconName, string> = {
  brush: 'Pincel',
  pen: 'Diseño',
  code: 'Código',
  music: 'Música',
  camera: 'Cámara',
  frame: 'Composición',
  spark: 'Idea',
  build: 'Construcción',
  agent: 'Agente'
}

export function StudioIcon({
  name,
  className
}: {
  name: StudioIconName
  className?: string
}) {
  return (
    <svg
      viewBox='0 0 48 48'
      className={cn('studio-icon', className)}
      aria-hidden
    >
      <title>{titles[name]}</title>
      {name === 'brush' ? <BrushIcon /> : null}
      {name === 'pen' ? <PenIcon /> : null}
      {name === 'code' ? <CodeIcon /> : null}
      {name === 'music' ? <MusicIcon /> : null}
      {name === 'camera' ? <CameraIcon /> : null}
      {name === 'frame' ? <FrameIcon /> : null}
      {name === 'spark' ? <SparkIcon /> : null}
      {name === 'build' ? <BuildIcon /> : null}
      {name === 'agent' ? <AgentIcon /> : null}
    </svg>
  )
}

function BrushIcon() {
  return (
    <g transform='rotate(-40 24 26)'>
      <rect
        className='studio-icon__accent'
        x='16'
        y='4'
        width='16'
        height='11'
      />
      <rect className='studio-icon__ink' x='18' y='15' width='12' height='6' />
      <rect className='studio-icon__ink' x='21' y='21' width='6' height='22' />
    </g>
  )
}

function PenIcon() {
  return (
    <>
      <path className='studio-icon__line' d='M16 33 31 8l8 8L24 41l-8-8Z' />
      <path className='studio-icon__accent' d='m16 33-5 11 11-5Z' />
    </>
  )
}

function CodeIcon() {
  return (
    <>
      <path className='studio-icon__line' d='M18 13 8 24l10 11' />
      <path className='studio-icon__line' d='M30 13 40 24 30 35' />
      <path className='studio-icon__accent-line' d='M27 9 21 39' />
    </>
  )
}

function MusicIcon() {
  return (
    <>
      <circle className='studio-icon__accent' cx='15' cy='34' r='5.5' />
      <circle className='studio-icon__ink' cx='33' cy='30' r='5.5' />
      <path className='studio-icon__line' d='M20.5 34V12H33v18' />
    </>
  )
}

function CameraIcon() {
  return (
    <>
      <path className='studio-icon__ink' d='M17 16 20 10h8l3 6Z' />
      <rect className='studio-icon__line' x='6' y='16' width='36' height='22' />
      <circle className='studio-icon__accent' cx='24' cy='27' r='6.5' />
      <circle className='studio-icon__paper' cx='24' cy='27' r='2.5' />
    </>
  )
}

function FrameIcon() {
  return (
    <>
      <rect className='studio-icon__line' x='7' y='8' width='34' height='32' />
      <rect
        className='studio-icon__accent'
        x='12'
        y='13'
        width='12'
        height='9'
      />
      <path className='studio-icon__line' d='M12 28h24M12 33h16' />
    </>
  )
}

function BuildIcon() {
  return (
    <>
      <rect className='studio-icon__accent' x='8' y='22' width='12' height='8' />
      <rect className='studio-icon__ink' x='18' y='6' width='4' height='32' />
      <path className='studio-icon__ink' d='M7 38h26v4H7z' />
      <path className='studio-icon__line' d='M22 10h20' />
      <path className='studio-icon__line' d='M22 16 37 10' />
      <path className='studio-icon__accent-line' d='M37 10v16' />
      <rect className='studio-icon__accent' x='32' y='26' width='9' height='6' />
    </>
  )
}

function AgentIcon() {
  return (
    <>
      <rect className='studio-icon__line' x='6' y='8' width='36' height='22' />
      <path className='studio-icon__line' d='m14 30 6 8 6-8' />
      <circle className='studio-icon__accent' cx='16' cy='19' r='2.2' />
      <circle className='studio-icon__ink' cx='24' cy='19' r='2.2' />
      <circle className='studio-icon__ink' cx='32' cy='19' r='2.2' />
    </>
  )
}

function SparkIcon() {
  return (
    <path
      className='studio-icon__accent'
      d='M24 5 27.5 18.5 41 24 27.5 29.5 24 43 20.5 29.5 7 24l13.5-5.5Z'
    />
  )
}
