import type { MessageKey } from '~/i18n/types'
import type { SelectOption } from '~/shared/types'

export type ComboboxOption<T = unknown> = SelectOption<T>

export type ComboboxContextValue<T = unknown> = {
  // Selection
  value: string
  selectedLabel: string
  onSelect: (value: string, label: string) => void
  setOpen: (open: boolean) => void
  // Async
  options: ComboboxOption<T>[]
  isLoading: boolean
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export type ComboboxRootProps<T = unknown> = {
  children: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string, option?: ComboboxOption<T>) => void
  fetchOptions: (searchTerm: string) => Promise<ComboboxOption<T>[]>
  fetchInitialLabel?: (value: string) => Promise<string | undefined>
  name?: string
  id?: string
  'aria-invalid'?: 'true' | 'false'
}

export type ComboboxTriggerProps = {
  placeholder?: string
  className?: string
  id?: string
  'aria-invalid'?: 'true' | 'false'
}

export type ComboboxContentProps<T = unknown> = {
  children?: (option: ComboboxOption<T>) => React.ReactNode
  emptyMessage?: MessageKey
  className?: string
}

export type ComboboxItemProps<T = unknown> = {
  option: ComboboxOption<T>
  children?: React.ReactNode
}
