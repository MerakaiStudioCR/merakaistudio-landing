import useMessages from '~/i18n/useMessages'
import type { TableRowActionLabels } from './build-table-row-actions'

export function useTableRowActionLabels(): TableRowActionLabels {
  const t = useMessages('action-button')

  return {
    view: t('view'),
    edit: t('edit'),
    delete: t('delete'),
    download: t('download')
  }
}
