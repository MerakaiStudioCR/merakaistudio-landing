import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '~/shared/lib/cn'
import Button from '~/components/ui/button'

type Props = React.ComponentProps<'input'>

const withPassword = (InputComponent: React.ComponentType<Props>) => {
  return ({ className, ...props }: Props) => {
    const [showPassword, setShowPassword] = useState(false)

    const EyeIcon = showPassword ? EyeOff : Eye

    return (
      <div className='relative'>
        <InputComponent
          {...props}
          type={showPassword ? 'text' : 'password'}
          className={cn('pr-10', className)}
        />
        {!props.disabled && (
          <Button
            type='button'
            variant='icon'
            onClick={() => setShowPassword(!showPassword)}
            className='-translate-y-1/2 absolute top-1/2 right-2'
          >
            <EyeIcon className='h-4 w-4' />
          </Button>
        )}
      </div>
    )
  }
}

export default withPassword
