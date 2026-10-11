import { cn } from '~/shared/lib/cn'
import Label from './label'
import ErrorLabel from './label/error-label'
import HelperText from './label/helper-text'
import { generateFieldId, generateErrorId } from '~/shared/lib/form/fields'

interface FieldProps {
  label: string
  id?: string
  error?: string
  helperText?: string
  wrapperClass?: string
  required?: boolean
}

type FormFieldProps = React.ComponentProps<'div'> &
  FieldProps & {
    innerClassName?: string
  }

const FormField = ({
  label,
  error,
  helperText,
  id,
  children,
  className,
  wrapperClass,
  required
}: FormFieldProps) => {
  const errorId = generateErrorId(id, !!error)

  return (
    <div className={cn('w-full min-w-0', wrapperClass)}>
      <div className={className}>
        {label && (
          <Label htmlFor={id}>
            {label}
            {required && <span className='ml-0.5 text-red-500'>*</span>}
          </Label>
        )}
        {children}
      </div>
      {helperText && !error && <HelperText>{helperText}</HelperText>}
      {error && <ErrorLabel id={errorId}>{error}</ErrorLabel>}
    </div>
  )
}

interface WithFormFieldProps {
  direction?: 'horizontal' | 'vertical'
}

const withFormField = <T extends object>(
  Component: React.ComponentType<T>,
  { direction = 'vertical' }: WithFormFieldProps = {}
) => {
  return ({
    label,
    error,
    id,
    wrapperClass,
    helperText,
    required,
    ...props
  }: T & FieldProps) => {
    const fieldId = id || generateFieldId(label)
    const errorId = generateErrorId(fieldId, !!error)

    return (
      <FormField
        label={label}
        error={error}
        helperText={helperText}
        id={fieldId}
        wrapperClass={wrapperClass}
        className={cn(
          'flex flex-col gap-2',
          direction === 'horizontal' && 'flex-row-reverse items-center'
        )}
        required={required}
      >
        <Component
          {...(props as T)}
          id={fieldId}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={errorId}
        />
      </FormField>
    )
  }
}

export default withFormField
