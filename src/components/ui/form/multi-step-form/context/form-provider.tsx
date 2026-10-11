import { useState, useCallback, type ReactNode } from 'react'
import { ZodError, type ZodType } from 'zod'
import MultiStepFormContext, {
  type MultiStepFormContextValue
} from './form-context'

interface Props<T> {
  children: ReactNode
  initialData?: T
  totalSteps: number
  stepSchemas?: ZodType[]
  onStepChange?: (step: number) => void
  formRef: React.RefObject<HTMLFormElement | null>
}

const MultiStepFormProvider = <T,>({
  children,
  initialData,
  totalSteps,
  stepSchemas,
  onStepChange,
  formRef
}: Props<T>) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<T>(initialData || ({} as T))
  const [validationErrors, setValidationErrors] = useState<
    Record<keyof T, string>
  >({} as Record<keyof T, string>)

  const updateFormData = useCallback(() => {
    if (stepSchemas?.[currentStep - 1]) {
      try {
        const currentSchema = stepSchemas[currentStep - 1]
        // Get current form values from the form ref
        let dataToValidate = {} as T
        if (formRef.current) {
          const formDataObj = new FormData(formRef.current)
          dataToValidate = Object.fromEntries(formDataObj) as T
        }

        const parsedData = currentSchema.parse(dataToValidate) as Partial<T>
        setValidationErrors({} as Record<keyof T, string>)
        setFormData((prevData) => ({
          ...prevData,
          ...parsedData
        }))

        return true
      } catch (error) {
        if (error && error instanceof ZodError) {
          const errors = {} as Record<keyof T, string>
          error.issues.forEach((issue) => {
            const path = issue.path.join('.')
            errors[path as keyof T] = issue.message
          })
          setValidationErrors(errors)
        }
      }
    }

    return false
  }, [currentStep, stepSchemas, formRef.current])

  const goToNextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      // Validate current step if schemas are provided
      const isValid = updateFormData()
      if (!isValid) {
        return
      }

      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      onStepChange?.(nextStep)
    }
  }, [currentStep, totalSteps, onStepChange, updateFormData])

  const goToPreviousStep = useCallback(() => {
    if (currentStep > 1) {
      updateFormData()
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      onStepChange?.(prevStep)
    }
  }, [currentStep, onStepChange, updateFormData])

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= totalSteps) {
        setCurrentStep(step)
        onStepChange?.(step)
      }
    },
    [totalSteps, onStepChange]
  )

  const clearValidationErrors = useCallback(() => {
    setValidationErrors({} as Record<keyof T, string>)
  }, [])

  const value: MultiStepFormContextValue<T> = {
    currentStep,
    totalSteps,
    formData,
    setFormData,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === totalSteps,
    validationErrors,
    clearValidationErrors,
    formRef
  }

  return (
    <MultiStepFormContext.Provider value={value}>
      {children}
    </MultiStepFormContext.Provider>
  )
}

export default MultiStepFormProvider
