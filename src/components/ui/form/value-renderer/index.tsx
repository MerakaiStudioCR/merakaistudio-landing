import { cn } from '~/shared/lib/cn'

interface Props {
  label: string
  value?: string | number | React.ReactNode | undefined | null
  className?: string
}

const ValueRenderer = ({ label, value, className = '' }: Props) => {
  const isReactNode =
    typeof value === 'object' && value !== null && 'type' in value

  return (
    <div
      data-slot='value-renderer'
      className={cn(isReactNode && 'flex gap-2', className)}
    >
      <span className='font-bold'>{label}:</span> {value ? value : '-'}
    </div>
  )
}

export default ValueRenderer
