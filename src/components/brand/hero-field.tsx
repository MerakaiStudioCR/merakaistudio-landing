import { cn } from '~/shared/lib/cn'
import MerakaiMark from './merakai-mark'
import { StudioIcon, type StudioIconName } from './studio-icons'

const kitIcons = [
  'brush',
  'pen',
  'code',
  'music',
  'camera',
  'spark'
] as const satisfies readonly StudioIconName[]

const HeroField = ({ className }: { className?: string }) => {
  return (
    <div className={cn('merakai-stage', className)} aria-hidden>
      <ul className='studio-kit'>
        {kitIcons.map((name) => (
          <li key={name} className={`studio-glyph studio-glyph--${name}`}>
            <StudioIcon name={name} />
          </li>
        ))}
      </ul>
      <span className='merakai-scan' />
      <span className='merakai-orbit' />
      <span className='merakai-orbit merakai-orbit--inner' />
      <span className='merakai-node merakai-node--a' />
      <span className='merakai-node merakai-node--b' />
      <span className='merakai-node merakai-node--c' />
      <MerakaiMark className='merakai-mark relative z-10 ml-auto h-72 w-72 text-merakai-navy sm:h-80 sm:w-80' />
    </div>
  )
}

export default HeroField
