'use client'

import Button from '~/components/ui/button'
import useMessages from '~/i18n/useMessages'

const NotFoundHomeLink = () => {
  const t = useMessages()

  return (
    <Button variant='primary' href='/' asLink className='w-full'>
      {t('global.go-back')}
    </Button>
  )
}

export default NotFoundHomeLink
