'use client'

import { useMemo } from 'react'
import { cn } from '~/shared/lib/cn'
import withFormField from '../withFormField'
// Type HOCs
import withPassword from './hocs/withPassword'
import withSearch from './hocs/withSearch'

type Props = React.ComponentProps<'input'>

const BaseInput = ({ className, type, ...props }: Props) => {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'flex w-full min-w-0 rounded-md border border-input bg-white px-3 py-2 shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        className
      )}
      {...props}
    />
  )
}

// Main Input Component with HOC logic
const Input = ({ type, ...props }: Props) => {
  const Component = useMemo(() => {
    if (type === 'password') {
      return withPassword(BaseInput)
    }
    if (type === 'search') {
      return withSearch(BaseInput)
    }
    return BaseInput
  }, [type])

  return <Component type={type} {...props} />
}

export default withFormField(Input)
