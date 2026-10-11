'use client'

import Select from '~/components/ui/form/select'
import Pagination from '~/components/ui/pagination'
import useMessages from '~/i18n/useMessages'
import { PAGE_SIZE_OPTIONS } from '~/shared/hooks/usePagination'

interface PaginationControlProps {
  total: number
  current: number
  onPageChange: (page: number) => void
}

interface Props {
  pagination: PaginationControlProps | null
  limit: number
  onLimitChange: (limit: number) => void
  pageSizeOptions?: readonly number[]
}

const ListingPaginationFooter = ({
  pagination,
  limit,
  onLimitChange,
  pageSizeOptions = PAGE_SIZE_OPTIONS
}: Props) => {
  const t = useMessages()

  return (
    <div className='flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap'>
      {pagination ? <Pagination {...pagination} /> : null}
      <div className='flex shrink-0 items-center gap-2'>
        <label
          htmlFor='listing-page-size'
          className='whitespace-nowrap text-muted-foreground text-sm'
        >
          {t('global.items-per-page')}
        </label>
        <Select
          id='listing-page-size'
          label=''
          wrapperClass='w-auto shrink-0'
          value={String(limit)}
          onValueChange={(value) => onLimitChange(Number(value))}
        >
          <Select.Trigger id='listing-page-size' className='h-9 w-20 min-w-20'>
            <Select.Value />
          </Select.Trigger>
          <Select.Content>
            {pageSizeOptions.map((option) => (
              <Select.Item key={option} value={String(option)}>
                {option}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </div>
    </div>
  )
}

export default ListingPaginationFooter
