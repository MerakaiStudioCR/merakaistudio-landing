import { cn } from '~/shared/lib/cn'

interface Props {
  children: React.ReactNode
  className?: string
}

const AuthCard = ({ children, className }: Props) => (
  <div className={cn('auth-portal-card p-6 sm:p-8 md:p-10', className)}>
    {children}
  </div>
)

export default AuthCard
