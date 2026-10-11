'use client'

import { useCallback, useState } from 'react'
import withFormField from '~/components/ui/form/withFormField'
import {
  formatPhoneWithHyphen,
  PHONE_DISPLAY_PLACEHOLDER,
  stripPhoneDigits
} from '~/shared/lib/formatters/phone-input'
import { cn } from '~/shared/lib/cn'

interface PhoneInputProps {
  name: string
  defaultValue?: string
  disabled?: boolean
  className?: string
  id?: string
  placeholder?: string
  'aria-invalid'?: boolean | 'true' | 'false'
  'aria-describedby'?: string
  required?: boolean
}

function PhoneInputBase({
  name,
  defaultValue = '',
  disabled = false,
  className,
  id,
  placeholder = PHONE_DISPLAY_PLACEHOLDER,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy
}: PhoneInputProps) {
  const initialDigits = stripPhoneDigits(String(defaultValue ?? ''))
  const [displayValue, setDisplayValue] = useState(() =>
    formatPhoneWithHyphen(initialDigits)
  )
  const [rawValue, setRawValue] = useState(initialDigits)

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const digits = stripPhoneDigits(event.target.value)
      setRawValue(digits)
      setDisplayValue(formatPhoneWithHyphen(digits))
    },
    []
  )

  return (
    <>
      <input
        type='tel'
        inputMode='numeric'
        autoComplete='tel'
        id={id}
        value={displayValue}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        data-slot='input'
        className={cn(
          'flex w-full min-w-0 rounded-md border border-input bg-white px-3 py-2 shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
          'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
          className
        )}
      />
      <input type='hidden' name={name} value={rawValue} />
    </>
  )
}

const PhoneInput = withFormField(PhoneInputBase)

export default PhoneInput
