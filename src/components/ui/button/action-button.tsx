import NextLink from 'next/link'
import { cn } from '~/shared/lib/cn'
import { DownloadIcon, EyeIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { type ActionButtonVariants, actionButtonVariants } from './variants'
import useMessages from '~/i18n/useMessages'
import Tooltip from '../tooltip'

type BaseProps = ActionButtonVariants & {
  className?: string
}

type ActionLinkProps = BaseProps &
  Omit<React.ComponentProps<typeof NextLink>, 'onClick'> & {
    href: string
  }

type ActionButtonProps = BaseProps &
  Omit<React.ComponentProps<'button'>, 'variant'> & {
    onClick: React.MouseEventHandler<HTMLButtonElement>
  }

type Props = ActionLinkProps | ActionButtonProps

const iconMap = {
  view: EyeIcon,
  edit: PencilIcon,
  delete: TrashIcon,
  download: DownloadIcon
}

const ActionButton = ({ className, variant, children, ...props }: Props) => {
  const t = useMessages('action-button')
  const label = (children || t(variant ?? 'view')) as string
  const Icon = iconMap[variant ?? 'view']

  const action =
    'href' in props ? (
      <NextLink
        data-slot='action-button'
        className={cn(actionButtonVariants({ variant, className }))}
        aria-label={label}
        {...(props as Omit<ActionLinkProps, 'variant'>)}
      >
        <Icon className='size-5' />
      </NextLink>
    ) : (
      <button
        type='button'
        data-slot='action-button'
        className={cn(actionButtonVariants({ variant, className }))}
        aria-label={label}
        {...(props as Omit<ActionButtonProps, 'variant'>)}
      >
        <Icon className='size-5' />
      </button>
    )

  return (
    <Tooltip>
      <Tooltip.Trigger asChild>{action}</Tooltip.Trigger>
      <Tooltip.Content>{label}</Tooltip.Content>
    </Tooltip>
  )
}

export default ActionButton
