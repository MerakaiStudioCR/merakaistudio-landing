import type { Metadata } from 'next'
import { Link } from '~/i18n/navigation'

export const metadata: Metadata = {
  title: '404',
  description: 'Página no encontrada'
}

const NotFound = () => {
  return (
    <section className='mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col justify-center px-5 py-24'>
      <p className='font-heading text-merakai-orange text-sm'>404</p>
      <h1 className='mt-4 font-heading font-semibold text-5xl tracking-[-0.04em]'>
        Esta página no está.
      </h1>
      <p className='mt-4 text-merakai-navy/75'>
        El enlace no corresponde a una sección del sitio.
      </p>
      <Link
        href='/'
        className='mt-8 inline-flex w-fit bg-merakai-orange px-5 py-3 font-heading font-semibold text-merakai-navy'
      >
        Volver al inicio
      </Link>
    </section>
  )
}

export default NotFound
