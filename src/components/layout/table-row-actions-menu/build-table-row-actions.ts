import { DownloadIcon, EyeIcon, PencilIcon, TrashIcon } from 'lucide-react'
import type { EntityAction } from '~/components/layout/entity-actions/types'

export interface TableRowActionLabels {
  view: string
  edit: string
  delete: string
  download: string
}

type ViewSpec = { kind: 'view'; href: string; id?: string }
type EditSpec = { kind: 'edit'; href: string; id?: string }
type DeleteSpec = {
  kind: 'delete'
  onClick: () => void
  id?: string
}
type DownloadSpec = {
  kind: 'download'
  onClick: () => void
  disabled?: boolean
  id?: string
}

export type TableRowActionSpec = ViewSpec | EditSpec | DeleteSpec | DownloadSpec

export function buildTableRowActions(
  specs: TableRowActionSpec[],
  labels: TableRowActionLabels
): EntityAction[] {
  return specs.map((spec) => {
    switch (spec.kind) {
      case 'view':
        return {
          id: spec.id ?? 'view',
          type: 'link',
          href: spec.href,
          label: labels.view,
          icon: EyeIcon
        }
      case 'edit':
        return {
          id: spec.id ?? 'edit',
          type: 'link',
          href: spec.href,
          label: labels.edit,
          icon: PencilIcon
        }
      case 'delete':
        return {
          id: spec.id ?? 'delete',
          type: 'action',
          onClick: spec.onClick,
          label: labels.delete,
          icon: TrashIcon,
          variant: 'destructive'
        }
      case 'download':
        return {
          id: spec.id ?? 'download',
          type: 'action',
          onClick: spec.onClick,
          label: labels.download,
          icon: DownloadIcon,
          disabled: spec.disabled
        }
    }
  })
}
