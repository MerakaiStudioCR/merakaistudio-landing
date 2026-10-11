const scrollToFirstInvalidField = (form: HTMLFormElement) => {
  const invalid = form.querySelector<HTMLElement>('[aria-invalid="true"]')

  if (!invalid) return

  invalid.scrollIntoView({ behavior: 'smooth', block: 'center' })

  if (typeof invalid.focus === 'function') {
    invalid.focus({ preventScroll: true })
  }
}

export default scrollToFirstInvalidField
