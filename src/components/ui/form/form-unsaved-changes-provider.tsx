'use client'

import { useEffect, useRef, useState } from 'react'
import Dialog from '~/components/ui/dialog'
import Button from '~/components/ui/button'
import useMessages from '~/i18n/useMessages'
import {
  registerFormUnsavedConfirmHandler,
  unregisterFormUnsavedConfirmHandler
} from '~/shared/lib/form/form-unsaved-guard'

const FormUnsavedChangesProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const t = useMessages('global.unsaved-changes')
  const [isOpen, setIsOpen] = useState(false)
  const resolverRef = useRef<((value: boolean) => void) | null>(null)

  useEffect(() => {
    registerFormUnsavedConfirmHandler(
      () =>
        new Promise<boolean>((resolve) => {
          resolverRef.current = resolve
          setIsOpen(true)
        })
    )

    return () => {
      unregisterFormUnsavedConfirmHandler()
    }
  }, [])

  const closeWith = (value: boolean) => {
    setIsOpen(false)
    resolverRef.current?.(value)
    resolverRef.current = null
  }

  return (
    <>
      {children}
      <Dialog open={isOpen} onOpenChange={(open) => !open && closeWith(false)}>
        <Dialog.Panel
          size='sm'
          showCloseButton={false}
          bodyClassName='py-5'
          className='sm:max-w-md'
          footer={
            <Dialog.Footer className='gap-3'>
              <Button
                variant='secondary'
                type='button'
                onClick={() => closeWith(false)}
              >
                {t('stay')}
              </Button>
              <Button
                variant='destructive'
                type='button'
                onClick={() => closeWith(true)}
              >
                {t('leave')}
              </Button>
            </Dialog.Footer>
          }
        >
          <div className='space-y-3'>
            <Dialog.Title className='font-semibold text-foreground text-lg'>
              {t('title')}
            </Dialog.Title>
            <Dialog.Description className='text-muted-foreground text-sm leading-relaxed'>
              {t('description')}
            </Dialog.Description>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}

export default FormUnsavedChangesProvider
