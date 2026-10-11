import { Check } from 'lucide-react'
import { cn } from '~/shared/lib/cn'
import { StepState } from '../types'

interface StepProps {
  step: number
  state: StepState
  isLast: boolean
}

const Step = ({ step, state, isLast }: StepProps) => {
  return (
    <div
      className={cn(
        'flex items-center',
        isLast ? 'shrink-0' : 'min-w-0 flex-1'
      )}
    >
      {/* Step Circle */}
      <div
        className={cn(
          'relative flex h-8 min-w-8 items-center justify-center rounded-full transition-all',
          state === StepState.COMPLETED && 'bg-primary text-primary-foreground',
          state === StepState.CURRENT &&
            'border-2 border-primary bg-transparent text-primary',
          state === StepState.NEXT &&
            'border-2 border-border bg-transparent text-muted-foreground/40'
        )}
      >
        {state === StepState.COMPLETED ? (
          <Check className='h-4 w-4 font-bold' />
        ) : (
          <span className='text-xs'>{step.toString().padStart(2, '0')}</span>
        )}
      </div>

      {/* Connecting Line */}
      {!isLast && (
        <div
          className={cn(
            'mx-1 h-0.5 w-full rounded-full transition-all',
            state === StepState.COMPLETED && 'bg-primary',
            state === StepState.CURRENT && 'bg-border',
            state === StepState.NEXT && 'bg-border'
          )}
        />
      )}
    </div>
  )
}

export default Step
