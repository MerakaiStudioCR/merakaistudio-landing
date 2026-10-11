import { cn } from '~/shared/lib/cn'

type Props = React.ComponentProps<'label'>

const Label = ({ children, className, ...props }: Props) => {
  return (
    <label
      className={cn('block font-medium text-sm', className)}
      htmlFor={props.htmlFor}
      {...props}
    >
      {children}
    </label>
  )
}

export default Label
