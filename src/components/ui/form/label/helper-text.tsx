interface Props {
  children: string
}

const HelperText = ({ children }: Props) => {
  return <span className='text-muted-foreground text-sm'>{children}</span>
}

export default HelperText
