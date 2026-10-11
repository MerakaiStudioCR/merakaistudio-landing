import { useState, useCallback, type ReactNode } from 'react'
import StepContext, { type StepContextValue } from './step-context'

interface Props {
  children: ReactNode
  totalSteps: number
  initialStep?: number
  onStepChange?: (step: number) => void
}

const StepProvider = ({
  children,
  totalSteps,
  initialStep = 1,
  onStepChange
}: Props) => {
  const [currentStep, setCurrentStep] = useState(initialStep)

  const goToNextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      onStepChange?.(nextStep)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep, totalSteps, onStepChange])

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      onStepChange?.(prevStep)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep, onStepChange])

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= totalSteps) {
        setCurrentStep(step)
        onStepChange?.(step)
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [totalSteps, onStepChange]
  )

  const value: StepContextValue = {
    currentStep,
    totalSteps,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === totalSteps
  }

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>
}

export default StepProvider
