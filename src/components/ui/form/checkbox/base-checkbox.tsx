import { Check } from 'lucide-react'
import { cn } from '~/shared/lib/cn'

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>

const Checkbox = ({ className, ...props }: CheckboxProps) => {
  return (
    <div className='relative flex'>
      <input
        type='checkbox'
        className={cn(
          'peer h-4 w-4 rounded border-2 border-input bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          'appearance-none checked:border-primary checked:bg-primary',
          className
        )}
        {...props}
      />
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity peer-checked:opacity-100'>
        <Check className='h-2.5 w-2.5 text-light-foreground' />
      </div>
    </div>
  )
}

export default Checkbox
