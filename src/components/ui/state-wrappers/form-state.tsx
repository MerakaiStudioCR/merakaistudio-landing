import Loader from '~/components/ui/loader'
import { useOptionalSidebar } from '~/components/ui/sidebar/hooks/useSidebar'
import { cn } from '~/shared/lib/cn'

type Props = {
  isSubmitting: boolean
  children: React.ReactNode
}

/**
 * Centralized wrapper component for handling form submission states
 * Used across all form pages (new/edit)
 *
 * Shows overlay loader when submitting to prevent interaction.
 * Outside admin shell (e.g. auth onboarding), overlay covers the full viewport.
 */
const FormState = ({ isSubmitting, children }: Props) => {
  const sidebar = useOptionalSidebar()

  const sidebarOffset =
    sidebar == null
      ? '0px'
      : sidebar.isMobile
        ? '0px'
        : sidebar.state === 'collapsed'
          ? 'var(--sidebar-width-icon)'
          : 'var(--sidebar-width)'

  const overlayTop = sidebar == null ? '0px' : 'var(--top-nav-height)'

  return (
    <div className='relative w-full' data-slot='form-state-container'>
      {children}

      {isSubmitting && (
        <output
          className={cn(
            'fixed right-0 bottom-0 z-20 transition-all duration-150',
            'flex items-center justify-center',
            'bg-background/60 backdrop-blur-sm'
          )}
          style={{
            top: overlayTop,
            left: sidebarOffset
          }}
          data-slot='form-overlay'
          aria-live='polite'
          aria-busy='true'
        >
          <Loader size={48} message='global.saving' direction='vertical' />
        </output>
      )}
    </div>
  )
}

export default FormState
