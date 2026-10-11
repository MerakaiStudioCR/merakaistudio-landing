import { useState, useCallback, type ReactNode } from 'react'
import { ZodError, type ZodType } from 'zod'
import getTypedFormData from '~/shared/lib/form/parser'
import FormDataContext, { type FormDataContextValue } from './form-data-context'
import useStepNavigation from '../hooks/useStepNavigation'

type ValidationErrors<T> = Partial<Record<keyof T, string>>
type ValidationResult<T> = {
  success: boolean
  errors: ValidationErrors<T>
  data: Partial<T>
}

interface Props<T> {
  children: ReactNode
  initialData?: Partial<T>
  stepSchemas?: ZodType[]
  validationFieldLabels?: Record<string, string>
  formRef: React.RefObject<HTMLFormElement | null>
  onPersist?: (data: Partial<T>, step: number) => void
}

const readFormValues = <T,>(
  formRef: React.RefObject<HTMLFormElement | null>,
  formData: T
): T => {
  if (!formRef.current) return formData

  const fromForm = getTypedFormData<T>(formRef.current)

  return {
    ...formData,
    ...Object.fromEntries(
      Object.entries(fromForm as Record<string, unknown>).filter(
        ([, value]) => value !== '' && value !== undefined && value !== null
      )
    )
  } as T
}

const FormDataProvider = <T,>({
  children,
  initialData,
  stepSchemas,
  validationFieldLabels,
  formRef,
  onPersist
}: Props<T>) => {
  const [formData, setFormData] = useState<T>((initialData ?? {}) as T)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors<T>>(
    {}
  )

  const { currentStep, goToStep } = useStepNavigation()

  const parseStepSchema = useCallback(
    (stepIndex: number, dataToValidate: T): ValidationResult<T> => {
      const errors: ValidationErrors<T> = {}
      const schema = stepSchemas?.[stepIndex]

      if (!schema) {
        return { success: false, errors, data: {} }
      }

      try {
        const parsedData = schema.parse(dataToValidate) as Partial<T>
        return { success: true, errors, data: parsedData }
      } catch (error) {
        mk_debug.error('Error validating form schema', {
          stepIndex: stepIndex + 1,
          error
        })

        if (error instanceof ZodError) {
          error.issues.forEach((issue) => {
            if (issue.path.length === 0) return

            const path = issue.path.join('.')
            errors[path as keyof T] = issue.message
          })
        }
      }

      return { success: false, errors, data: {} }
    },
    [stepSchemas]
  )

  const validateSchema = useCallback((): ValidationResult<T> => {
    const dataToValidate = readFormValues(formRef, formData)
    return parseStepSchema(currentStep - 1, dataToValidate)
  }, [currentStep, formData, formRef, parseStepSchema])

  const updateFormData = useCallback(() => {
    const result = validateSchema()

    setFormData((prevData) => {
      const nextData = {
        ...prevData,
        ...result.data
      }

      if (result.success) {
        onPersist?.(nextData, currentStep)
      }

      return nextData
    })
    setValidationErrors(result.errors)

    return result.success
  }, [currentStep, onPersist, validateSchema])

  const persistCurrentStepWithoutValidation = useCallback(() => {
    const dataToMerge = readFormValues(formRef, formData)
    const nextData = { ...formData, ...dataToMerge }

    setFormData(nextData)
    setValidationErrors({})
    onPersist?.(nextData, currentStep)
  }, [currentStep, formData, formRef, onPersist])

  const validateAllSteps = useCallback((): T | false => {
    if (!stepSchemas?.length) return formData

    let merged = readFormValues(formRef, formData)
    const errors: ValidationErrors<T> = {}

    for (let stepIndex = 0; stepIndex < stepSchemas.length; stepIndex++) {
      const result = parseStepSchema(stepIndex, merged)

      if (!result.success) {
        Object.assign(errors, result.errors)
        setValidationErrors(errors)
        goToStep(stepIndex + 1)
        return false
      }

      merged = { ...merged, ...result.data }
    }

    setFormData(merged)
    setValidationErrors({})
    onPersist?.(merged, stepSchemas.length)

    return merged
  }, [formData, formRef, goToStep, onPersist, parseStepSchema, stepSchemas])

  const value: FormDataContextValue<T> = {
    formData,
    setFormData,
    validationErrors: validationErrors as Record<keyof T, string>,
    validationFieldLabels,
    formRef,
    updateFormData,
    persistCurrentStepWithoutValidation,
    validateAllSteps
  }

  return (
    <FormDataContext.Provider value={value}>
      {children}
    </FormDataContext.Provider>
  )
}

export default FormDataProvider
