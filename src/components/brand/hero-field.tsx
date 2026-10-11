import { cn } from '~/shared/lib/cn'
import MerakaiMark from './merakai-mark'

const HeroField = ({ className }: { className?: string }) => {
  return (
    <div className={cn('merakai-stage', className)} aria-hidden>
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
