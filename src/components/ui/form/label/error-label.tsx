type Props = React.ComponentProps<'span'>

const ErrorLabel = ({ children, ...props }: Props) => {
  return (
    <span className='mt-1 block text-destructive text-sm' {...props}>
      {children}
    </span>
  )
}

export default ErrorLabel
