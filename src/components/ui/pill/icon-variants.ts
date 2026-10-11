import { XIcon, PlusIcon } from 'lucide-react'

const iconVariants = {
  none: null,
  add: PlusIcon,
  close: XIcon
}

export type IconVariant = keyof typeof iconVariants

export const getIconVariant = (variant: IconVariant) => iconVariants[variant]

export default iconVariants
