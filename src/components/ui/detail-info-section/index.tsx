import type { LucideIcon } from 'lucide-react'
import { Info } from 'lucide-react'
import EntityDetailSubsection from '~/components/ui/entity-detail/entity-detail-subsection'
import { cn } from '~/shared/lib/cn'

interface DetailInfoSectionProps {
  title: string
  children: React.ReactNode
  className?: string
  titleAside?: React.ReactNode
  icon?: LucideIcon
  description?: string
  unwrapped?: boolean
}

const DetailInfoSection = ({
  title,
  children,
  className,
  titleAside,
  icon = Info,
  description,
  unwrapped = false
}: DetailInfoSectionProps) => (
  <section className={cn('floating-section p-4 sm:p-5', className)}>
    <EntityDetailSubsection
      icon={icon}
      title={title}
      description={description}
      aside={titleAside}
      unwrapped={unwrapped}
    >
      {children}
    </EntityDetailSubsection>
  </section>
)

export default DetailInfoSection
