import { useContext } from 'react'
import MultiStepFormContext, {
  type MultiStepFormContextValue
} from '../context/form-context'

const useMultiStepForm = <T>(): MultiStepFormContextValue<T> => {
  const context = useContext(MultiStepFormContext)

  if (!context) {
    throw new Error(
      'useMultiStepForm must be used within a MultiStepFormProvider'
    )
  }

  return context as unknown as MultiStepFormContextValue<T>
}

export default useMultiStepForm
