'use client'

import TableHeader from './table-header'
import useMessages from '~/i18n/useMessages'
import actionsColumnClass from '../lib/actions-column-class'
import { cn } from '~/shared/lib/cn'

const TableActionsHeader = () => {
  const t = useMessages()

  return (
    <TableHeader className={cn(actionsColumnClass, 'w-12')} aria-hidden>
      <span className='sr-only'>{t('global.actions')}</span>
    </TableHeader>
  )
}

export default TableActionsHeader
