import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo } from 'react'
import Button from '~/components/ui/button'
import useMessages from '~/i18n/useMessages'
import { cn } from '~/shared/lib/cn'

interface Props {
  total: number
  current: number
  onPageChange: (page: number) => void
}

const Pagination = ({ total, current, onPageChange }: Props) => {
  const t = useMessages('global')

  const pagesToShow = useMemo(() => {
    // Display exactly 4 pages consistently
    const maxPages = 4
    let start = Math.max(1, current - Math.floor(maxPages / 2))
    const end = Math.min(total, start + maxPages - 1)

    // Adjust start if we're near the end
    if (end - start + 1 < maxPages) {
      start = Math.max(1, end - maxPages + 1)
    }

    // Generate only the pages we need
    return Array.from({ length: end - start + 1 }, (_, index) => start + index)
  }, [current, total])

  const handlePageChange = (page: number) => {
    // Prevent changing to the same page or out of bounds
    if (page < 1 || page > total || page === current) return
    onPageChange(page)
  }

  return (
    <div className='flex items-center justify-center gap-1 md:gap-2'>
      <Button
        onClick={() => handlePageChange(current - 1)}
        variant='white'
        disabled={current === 1}
      >
        <ChevronLeft className='size-4' />
        <span className='sr-only md:not-sr-only'>{t('previous')}</span>
      </Button>

      {pagesToShow.map((page) => (
        <Button
          key={page}
          onClick={() => handlePageChange(page)}
          variant='white'
          className={cn(
            page === current && 'bg-primary text-primary-foreground'
          )}
          aria-current={page === current}
          aria-label={t('page', { page })}
        >
          {page}
        </Button>
      ))}

      <Button
        onClick={() => handlePageChange(current + 1)}
        variant='white'
        disabled={current === total}
      >
        <span className='sr-only md:not-sr-only'>{t('next')}</span>
        <ChevronRight className='size-4' />
      </Button>
    </div>
  )
}

export default Pagination
