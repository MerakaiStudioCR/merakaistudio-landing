import { ListPlusIcon } from 'lucide-react'
import Button from '~/components/ui/button'

export interface ListingEmptyInviteAction {
  label: string
  href: string
}

export interface ListingEmptyInviteProps {
  title: string
  description: string
  action?: ListingEmptyInviteAction
}

export function ListingEmptyInvite({
  title,
  description,
  action
}: ListingEmptyInviteProps) {
  return (
    <div
      className='flex max-w-lg flex-col items-center gap-5 px-6 py-4 text-center'
      data-slot='listing-empty-invite'
    >
      <ListPlusIcon
        className='size-20 text-brand-interaction'
        strokeWidth={1.25}
        aria-hidden
      />
      <div className='space-y-2'>
        <h2 className='font-bold text-2xl text-primary'>{title}</h2>
        <p className='text-base text-muted-foreground leading-relaxed'>
          {description}
        </p>
      </div>
      {action ? (
        <Button
          asLink
          href={action.href}
          variant='primary'
          className='min-w-48'
        >
          {action.label}
        </Button>
      ) : null}
    </div>
  )
}
