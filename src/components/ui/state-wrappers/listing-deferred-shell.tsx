'use client'

interface Props {
  children: React.ReactNode
}

const ListingDeferredShell = ({ children }: Props) => {
  return (
    <div className='flex flex-col gap-4' data-slot='listing-deferred-shell'>
      {children}
    </div>
  )
}

export default ListingDeferredShell
