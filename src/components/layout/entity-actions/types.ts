type BaseAction = {
  id: string
  label: string
  icon?: React.ElementType
  visible?: boolean
}

export type LinkAction = BaseAction & {
  type: 'link'
  href: string
}

export type ButtonAction = BaseAction & {
  type: 'action'
  onClick: () => void
  variant?: 'default' | 'destructive'
  disabled?: boolean
}

export type ModalAction = BaseAction & {
  type: 'modal'
  variant?: 'default' | 'destructive'
  renderModal: (props: {
    open: boolean
    onOpenChange: (open: boolean) => void
  }) => React.ReactNode
}

export type EntityAction = LinkAction | ButtonAction | ModalAction
