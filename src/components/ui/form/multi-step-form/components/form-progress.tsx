import Stepper from '~/components/ui/stepper'
import useStepNavigation from '../hooks/useStepNavigation'

const FormProgress = () => {
  const { currentStep, totalSteps } = useStepNavigation()

  if (totalSteps <= 1) {
    return null
  }

  return (
    <div className='mx-auto w-full max-w-md pb-4'>
      <Stepper total={totalSteps} current={currentStep} />
    </div>
  )
}

export default FormProgress
