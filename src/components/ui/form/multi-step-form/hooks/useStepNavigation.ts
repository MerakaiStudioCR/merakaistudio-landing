import { useContext } from 'react'
import StepContext, { type StepContextValue } from '../context/step-context'

const useStepNavigation = (): StepContextValue => {
  const context = useContext(StepContext)

  if (!context) {
    throw new Error('useStepNavigation must be used within a StepProvider')
  }

  return context
}

export default useStepNavigation
