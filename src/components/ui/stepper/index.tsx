import { cn } from '~/shared/lib/cn'
import Step from './components/step-indicator'
import { StepState } from './types'

interface Props {
  total: number
  current: number
}

const getStepState = (step: number, current: number) => {
  if (step < current) return StepState.COMPLETED
  if (step === current) return StepState.CURRENT
  if (step > current) return StepState.NEXT
  return StepState.NEXT
}

const Stepper = ({ total, current }: Props) => {
  const steps = Array.from({ length: total }, (_, index) => index + 1)

  return (
    <div className={cn('flex items-center')} data-slot='stepper'>
      {steps.map((step, index) => {
        return (
          <Step
            key={step}
            step={step}
            state={getStepState(step, current)}
            isLast={index === steps.length - 1}
          />
        )
      })}
    </div>
  )
}

export default Stepper
