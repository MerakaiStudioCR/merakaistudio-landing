import NextLink from 'next/link'

const Logo = () => {
  return (
    <NextLink
      href='/'
      className='font-heading font-semibold text-brand text-lg'
      aria-label='Inicio'
    >
      Merakai
    </NextLink>
  )
}

export default Logo
