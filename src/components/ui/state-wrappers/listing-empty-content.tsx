import { SearchXIcon } from 'lucide-react'

type ListingEmptyContentProps = {
  message: string
}

export function ListingEmptyContent({ message }: ListingEmptyContentProps) {
  return (
    <div
      className='flex flex-col items-center gap-3 px-4 text-center'
      data-slot='listing-empty'
    >
      <SearchXIcon
        className='size-12 text-muted-foreground/70'
        strokeWidth={1.25}
        aria-hidden
      />
      <p className='max-w-md text-base text-muted-foreground'>{message}</p>
    </div>
  )
}
