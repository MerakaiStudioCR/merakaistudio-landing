const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  'input',
  'select',
  'textarea',
  'label',
  '[role="button"]',
  '[role="menuitem"]',
  '[role="checkbox"]',
  '[data-slot="button"]',
  '[data-slot="link"]'
].join(', ')

export function isInteractiveTableRowTarget(
  target: EventTarget | null
): boolean {
  return (
    target instanceof Element && Boolean(target.closest(INTERACTIVE_SELECTOR))
  )
}
