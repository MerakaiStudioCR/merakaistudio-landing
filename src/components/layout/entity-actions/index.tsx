'use client'

import { useCallback, useState } from 'react'
import { ChevronsUpDownIcon } from 'lucide-react'
import Button from '~/components/ui/button'
import Popover from '~/components/ui/popover'
import ActionItem from './action-item'
import useMessages from '~/i18n/useMessages'
import type { EntityAction, ModalAction } from './types'

type Props = {
  actions: EntityAction[]
}

const EntityActions = ({ actions }: Props) => {
  const t = useMessages()
  const [activeModal, setActiveModal] = useState<ModalAction | null>(null)

  const visibleActions = actions.filter((action) => action.visible !== false)

  const openModal = useCallback((action: ModalAction) => {
    setActiveModal(action)
  }, [])
  const closeModal = useCallback(() => setActiveModal(null), [])

  if (visibleActions.length === 0) return null

  return (
    <>
      <Popover>
        <Popover.Trigger asChild>
          <Button variant='secondary'>
            {t('global.actions')}
            <ChevronsUpDownIcon className='size-4' />
          </Button>
        </Popover.Trigger>
        <Popover.Content
          align='start'
          className='w-min max-w-72 flex-1 space-y-1'
        >
          {visibleActions.map((action) => (
            <ActionItem
              key={action.id}
              action={action}
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

export default EntityActions
