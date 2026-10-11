type DirtyCheck = () => boolean

type ConfirmLeave = () => Promise<boolean>

interface FormUnsavedGuardRegistration {
  checkDirty: DirtyCheck
}

let activeGuard: FormUnsavedGuardRegistration | null = null
let confirmLeave: ConfirmLeave | null = null
let bypassNavigation = false

export function registerFormUnsavedGuard(
  registration: FormUnsavedGuardRegistration
) {
  activeGuard = registration
}

export function unregisterFormUnsavedGuard() {
  activeGuard = null
}

export function registerFormUnsavedConfirmHandler(handler: ConfirmLeave) {
  confirmLeave = handler
}

export function unregisterFormUnsavedConfirmHandler() {
  confirmLeave = null
}

export function bypassFormUnsavedGuardOnce() {
  bypassNavigation = true
}

function consumeBypass(): boolean {
  if (!bypassNavigation) return false
  bypassNavigation = false
  return true
}

export function isFormUnsavedGuardActive(): boolean {
  return activeGuard != null
}

export function hasUnsavedFormChanges(): boolean {
  if (!activeGuard) return false
  try {
    return activeGuard.checkDirty()
  } catch {
    return false
  }
}

export async function confirmFormUnsavedLeave(): Promise<boolean> {
  if (!activeGuard || consumeBypass()) return true
  if (!hasUnsavedFormChanges()) return true

  if (confirmLeave) {
    return confirmLeave()
  }

  return window.confirm(
    'Tiene cambios sin guardar. Si sale ahora, puede perder la información ingresada.'
  )
}

export function shouldInterceptFormNavigation(
  currentPathname: string,
  targetHref: string
): boolean {
  if (!activeGuard) return false

  const normalize = (path: string) => path.split('?')[0]?.split('#')[0] ?? path

  if (normalize(currentPathname) === normalize(targetHref)) {
    return false
  }

  return hasUnsavedFormChanges()
}
