import StatusLabel from '~/components/ui/status'
import type { StatusVariants } from '~/components/ui/status/variants'

interface DetailStatusAsideProps {
  variant: NonNullable<StatusVariants['variant']>
  label: string
}

const DetailStatusAside = ({ variant, label }: DetailStatusAsideProps) => (
  <div className='rounded-lg border border-border bg-accent px-4 py-2 shadow-sm'>
    <StatusLabel
      variant={variant}
      label={label}
      className='font-medium text-primary text-sm'
    />
  </div>
)

export default DetailStatusAside
