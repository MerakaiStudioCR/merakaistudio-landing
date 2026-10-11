import { createContext } from 'react'

export interface StepContextValue {
  currentStep: number
  isFirstStep: boolean
  isLastStep: boolean
  totalSteps: number
  goToNextStep: () => void
  goToPreviousStep: () => void
  goToStep: (step: number) => void
}

const StepContext = createContext<StepContextValue | null>(null)

export default StepContext
