'use client'

import { useCallback, useState } from 'react'
import withFormField from '~/components/ui/form/withFormField'
import {
  formatAmountWithDots,
  parseAmountInput
} from '~/shared/lib/formatters/amount-input'
import { cn } from '~/shared/lib/cn'

interface MoneyAmountInputProps {
  name: string
  defaultValue?: number | string
  disabled?: boolean
  className?: string
  id?: string
  placeholder?: string
  'aria-invalid'?: boolean | 'true' | 'false'
  'aria-describedby'?: string
  required?: boolean
}

function MoneyAmountInputBase({
  name,
  defaultValue,
  disabled = false,
  className,
  id,
  placeholder,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy
}: MoneyAmountInputProps) {
  const initialRawValue =
    defaultValue === undefined || defaultValue === ''
      ? ''
      : String(parseAmountInput(String(defaultValue)) ?? '')

  const [displayValue, setDisplayValue] = useState(() =>
    formatAmountWithDots(initialRawValue)
  )
  const [rawValue, setRawValue] = useState(initialRawValue)

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const digits = event.target.value.replace(/\D/g, '')
      const parsed = parseAmountInput(digits)

      setRawValue(parsed !== undefined ? String(parsed) : '')
      setDisplayValue(formatAmountWithDots(digits))
    },
    []
  )

  return (
    <>
      <input
        type='text'
        inputMode='numeric'
        autoComplete='off'
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

const MoneyAmountInput = withFormField(MoneyAmountInputBase)

export default MoneyAmountInput
