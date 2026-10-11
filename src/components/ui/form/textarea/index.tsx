import { cn } from '~/shared/lib/cn'
import withFormField from '../withFormField'

type Props = React.ComponentProps<'textarea'>

const Textarea = ({ className, ...props }: Props) => {
  return (
    <textarea
      data-slot='textarea'
      rows={4}
      cols={30}
      className={cn(
        'flex w-full rounded-md border border-input bg-white px-3 py-2 shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        className
      )}
      {...props}
    />
  )
}

export default withFormField(Textarea)
