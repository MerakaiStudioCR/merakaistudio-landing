'use client'

import { useCallback, useState } from 'react'
import { MoreHorizontalIcon } from 'lucide-react'
import Button from '~/components/ui/button'
import Popover from '~/components/ui/popover'
import useMessages from '~/i18n/useMessages'
import type {
  EntityAction,
  ModalAction
} from '~/components/layout/entity-actions/types'
import TableRowActionItem from './table-row-action-item'

interface Props {
  actions: EntityAction[]
}

const TableRowActionsMenu = ({ actions }: Props) => {
  const t = useMessages()
  const [isOpen, setIsOpen] = useState(false)
  const [activeModal, setActiveModal] = useState<ModalAction | null>(null)

  const visibleActions = actions.filter((action) => action.visible !== false)

  const closeMenu = useCallback(() => setIsOpen(false), [])
  const openModal = useCallback((action: ModalAction) => {
    setActiveModal(action)
  }, [])
  const closeModal = useCallback(() => setActiveModal(null), [])

  if (visibleActions.length === 0) return null

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <Button
            type='button'
            variant='icon'
            className='size-8 rounded-full border-0 bg-(--zaffiro-water-100) p-0 text-(--accent-interaction) shadow-none hover:bg-[color-mix(in_srgb,var(--accent-interaction)_18%,white)] hover:text-primary has-[>svg]:px-0 data-[state=open]:bg-(--accent-interaction) data-[state=open]:text-white'
            aria-label={t('global.more-actions')}
          >
            <MoreHorizontalIcon
              className='size-4'
              strokeWidth={2.25}
              aria-hidden
            />
          </Button>
        </Popover.Trigger>
        <Popover.Content align='end' className='w-min max-w-72 space-y-1'>
          {visibleActions.map((action) => (
            <TableRowActionItem
              key={action.id}
              action={action}
              onClose={closeMenu}
              onModalOpen={openModal}
            />
          ))}
        </Popover.Content>
      </Popover>

      {activeModal?.renderModal({
        open: true,
        onOpenChange: (open) => !open && closeModal()
      })}
    </>
  )
}

export default TableRowActionsMenu
export { buildTableRowActions } from './build-table-row-actions'
export type {
  TableRowActionLabels,
  TableRowActionSpec
} from './build-table-row-actions'
