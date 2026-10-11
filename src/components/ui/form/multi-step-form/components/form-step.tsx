import type { ReactNode } from 'react'
import { cn } from '~/shared/lib/cn'
import useStepNavigation from '../hooks/useStepNavigation'

interface FormStepProps {
  step?: number
  children: ReactNode
  className?: string
}

const FormStep = ({ step, children, className }: FormStepProps) => {
  const { currentStep } = useStepNavigation()

  const isActive = currentStep === step

  return (
    <div
      className={cn('w-full', !isActive && 'hidden', className)}
      data-step={step}
      data-active={isActive}
      aria-hidden={!isActive}
    >
      {children}
    </div>
  )
}

FormStep.displayName = 'MultiStepFormStep'

export default FormStep
