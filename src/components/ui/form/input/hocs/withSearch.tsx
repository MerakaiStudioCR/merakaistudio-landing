import { useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '~/shared/lib/cn'
import Button from '~/components/ui/button'

type Props = React.ComponentProps<'input'>

const withSearch = (InputComponent: React.ComponentType<Props>) => {
  return ({ className, ...props }: Props) => {
    const [value, setValue] = useState(props.value || '')

    const handleClear = () => {
      setValue('')
      props.onChange?.({
        target: {
          value: ''
        }
      } as React.ChangeEvent<HTMLInputElement>)
    }

    return (
      <div className='relative'>
        <InputComponent
          {...props}
          type='search'
          className={cn(
            'pr-10 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden',
            className
          )}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            props.onChange?.(e)
          }}
        />
        {value && !props.disabled && (
          <Button
            type='button'
            variant='icon'
            onClick={handleClear}
            className='-translate-y-1/2 absolute top-1/2 right-2'
          >
            <X className='h-4 w-4' />
          </Button>
        )}
      </div>
    )
  }
}

export default withSearch
