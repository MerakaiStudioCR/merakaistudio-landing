import Button from '~/components/ui/button'
import FormDiscardButton from '~/components/ui/form/form-discard-button'
import useMessages from '~/i18n/useMessages'
import useStepNavigation from '../hooks/useStepNavigation'
import scrollToFirstInvalidField from '../lib/scroll-to-first-invalid-field'
import { cn } from '~/shared/lib/cn'
import useFormData from '../hooks/useFormData'

interface Props {
  className?: string
  cancelHref?: string
}

const FormActions = ({ className, cancelHref }: Props) => {
  const t = useMessages('global')
  const { formRef, updateFormData, persistCurrentStepWithoutValidation } =
    useFormData()
  const { isFirstStep, isLastStep, goToPreviousStep, goToNextStep } =
    useStepNavigation()

  const handleNext = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (updateFormData()) {
      goToNextStep()
      return
    }

    if (formRef.current) {
      scrollToFirstInvalidField(formRef.current)
    }
  }

  const handlePrevious = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    persistCurrentStepWithoutValidation()
    goToPreviousStep()
  }

  return (
    <div className={cn('form-actions', className)}>
      {isFirstStep ? (
        cancelHref ? (
          <FormDiscardButton href={cancelHref} variant='secondary'>
            {t('go-back')}
          </FormDiscardButton>
        ) : null
      ) : (
        <Button variant='secondary' onClick={handlePrevious} type='button'>
          {t('previous-step')}
        </Button>
      )}

      {isLastStep ? (
        <Button variant='primary' type='submit'>
          {t('save')}
        </Button>
      ) : (
        <Button variant='primary' onClick={handleNext} type='button'>
          {t('next-step')}
        </Button>
      )}
    </div>
  )
}

export default FormActions
