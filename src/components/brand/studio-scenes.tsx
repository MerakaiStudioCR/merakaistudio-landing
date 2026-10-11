import { cn } from '~/shared/lib/cn'

type StudioSceneId = 'studio' | 'design' | 'code'

interface StudioSceneProps {
  scene: StudioSceneId
  tone?: 'ink' | 'paper'
  className?: string
}

const titles: Record<StudioSceneId, string> = {
  studio: 'Estudio',
  design: 'Diseño',
  code: 'Código'
}

export function StudioScene({
  scene,
  tone = 'ink',
  className
}: StudioSceneProps) {
  return (
    <svg
      viewBox='0 0 400 280'
      className={cn(
        'studio-scene h-auto w-full max-w-sm',
        tone === 'paper' && 'studio-scene--paper',
        className
      )}
      aria-hidden
    >
      <title>{titles[scene]}</title>
      {scene === 'studio' ? <StudioRoom /> : null}
      {scene === 'design' ? <DesignBoard /> : null}
      {scene === 'code' ? <CodeEditor /> : null}
    </svg>
  )
}

function StudioRoom() {
  return (
    <>
      <rect
        className='studio-scene__wash'
        x='28'
        y='32'
        width='344'
        height='216'
      />
      <rect
        className='studio-scene__line'
        x='52'
        y='52'
        width='128'
        height='92'
      />
      <path className='studio-scene__line' d='M116 52v92M52 98h128' />
      <rect
        className='studio-scene__accent'
        x='118'
        y='100'
        width='60'
        height='42'
      />
      <path className='studio-scene__beam' d='M180 144 268 196H96Z' />
      <rect
        className='studio-scene__ink'
        x='64'
        y='196'
        width='272'
        height='14'
      />
      <rect
        className='studio-scene__ink'
        x='88'
        y='210'
        width='12'
        height='28'
      />
      <rect
        className='studio-scene__ink'
        x='300'
        y='210'
        width='12'
        height='28'
      />
      <rect
        className='studio-scene__paper'
        x='156'
        y='132'
        width='108'
        height='72'
      />
      <rect
        className='studio-scene__accent'
        x='170'
        y='146'
        width='40'
        height='8'
      />
      <rect
        className='studio-scene__soft'
        x='170'
        y='162'
        width='78'
        height='5'
      />
      <rect
        className='studio-scene__soft'
        x='170'
        y='174'
        width='58'
        height='5'
      />
      <path className='studio-scene__line' d='M312 196V118h42' />
      <rect
        className='studio-scene__accent'
        x='342'
        y='104'
        width='28'
        height='16'
      />
      <rect
        className='studio-scene__ink'
        x='40'
        y='214'
        width='40'
        height='8'
      />
      <path className='studio-scene__line' d='M48 222v22M72 222v22' />
    </>
  )
}

function DesignBoard() {
  return (
    <>
      <rect
        className='studio-scene__wash'
        x='168'
        y='36'
        width='188'
        height='156'
      />
      <rect
        className='studio-scene__paper'
        x='40'
        y='64'
        width='210'
        height='164'
      />
      <path
        className='studio-scene__line'
        d='M40 64h18M40 64v18M250 64h-18M250 64v18M40 228h18M40 228v-18M250 228h-18M250 228v-18'
      />
      <rect
        className='studio-scene__accent'
        x='62'
        y='88'
        width='32'
        height='32'
      />
      <rect
        className='studio-scene__ink'
        x='102'
        y='88'
        width='32'
        height='32'
      />
      <rect
        className='studio-scene__soft'
        x='142'
        y='88'
        width='32'
        height='32'
      />
      <rect
        className='studio-scene__ink'
        x='62'
        y='140'
        width='132'
        height='8'
      />
      <rect
        className='studio-scene__soft'
        x='62'
        y='158'
        width='164'
        height='5'
      />
      <rect
        className='studio-scene__soft'
        x='62'
        y='172'
        width='112'
        height='5'
      />
      <rect
        className='studio-scene__soft'
        x='62'
        y='186'
        width='140'
        height='5'
      />
      <rect
        className='studio-scene__accent'
        x='286'
        y='132'
        width='16'
        height='108'
        transform='rotate(28 294 186)'
      />
      <rect
        className='studio-scene__ink'
        x='292'
        y='228'
        width='16'
        height='18'
        transform='rotate(28 300 237)'
      />
    </>
  )
}

function CodeEditor() {
  return (
    <>
      <rect
        className='studio-scene__paper'
        x='32'
        y='36'
        width='336'
        height='212'
      />
      <rect
        className='studio-scene__ink'
        x='32'
        y='36'
        width='336'
        height='40'
      />
      <circle className='studio-scene__accent' cx='58' cy='56' r='6' />
      <circle className='studio-scene__soft' cx='80' cy='56' r='6' />
      <circle className='studio-scene__soft' cx='102' cy='56' r='6' />
      <rect
        className='studio-scene__accent'
        x='58'
        y='96'
        width='48'
        height='8'
      />
      <rect
        className='studio-scene__ink'
        x='114'
        y='96'
        width='96'
        height='8'
      />
      <rect
        className='studio-scene__soft'
        x='78'
        y='116'
        width='64'
        height='8'
      />
      <rect
        className='studio-scene__ink'
        x='150'
        y='116'
        width='132'
        height='8'
      />
      <rect
        className='studio-scene__accent'
        x='78'
        y='136'
        width='36'
        height='8'
      />
      <rect
        className='studio-scene__soft'
        x='122'
        y='136'
        width='88'
        height='8'
      />
      <rect
        className='studio-scene__ink'
        x='58'
        y='156'
        width='112'
        height='8'
      />
      <rect
        className='studio-scene__soft'
        x='78'
        y='176'
        width='150'
        height='8'
      />
      <rect
        className='studio-scene__accent'
        x='58'
        y='200'
        width='12'
        height='18'
      />
    </>
  )
}
