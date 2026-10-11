import { isValidElement, type ReactElement, type ReactNode } from 'react'
import FormStep from '../components/form-step'

export function isFormStepElement(
  child: ReactNode
): child is ReactElement<React.ComponentProps<typeof FormStep>> {
  if (!isValidElement(child)) return false

  const type = child.type as { displayName?: string }

  return type === FormStep || type.displayName === 'MultiStepFormStep'
}
