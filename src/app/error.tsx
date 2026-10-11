'use client'

import { useEffect } from 'react'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

function ErrorPage({ error, reset }: Props) {
  useEffect(() => {
    mk_debug.error('Error in ErrorPage', error)
  }, [error])

  return (
    <section className='mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col justify-center px-5 py-24'>
      <h1 className='font-heading font-semibold text-5xl tracking-[-0.04em]'>
        Algo salió mal
      </h1>
      <p className='mt-4 text-merakai-navy/75'>
        Hubo un problema al cargar esta página. Puedes intentarlo de nuevo.
      </p>
      <button
        type='button'
        onClick={reset}
        className='mt-8 inline-flex w-fit bg-merakai-orange px-5 py-3 font-heading font-semibold text-merakai-navy'
      >
        Intentar de nuevo
      </button>
    </section>
  )
}

export default ErrorPage
