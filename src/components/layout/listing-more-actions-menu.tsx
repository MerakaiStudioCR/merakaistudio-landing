'use client'

import { useState, type ComponentType } from 'react'
import {
  DownloadIcon,
  EllipsisVerticalIcon,
  FileSpreadsheetIcon,
  FileTextIcon
} from 'lucide-react'
import { getBaseClassName } from '~/components/layout/entity-actions/lib/constants'
import Button from '~/components/ui/button'
import Popover from '~/components/ui/popover'
import useMessages from '~/i18n/useMessages'
import { cn } from '~/shared/lib/cn'

interface BulkModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface Props {
  bulkActionLabel?: string
  BulkModal?: ComponentType<BulkModalProps>
  reportLogContext?: string
  onExport?: () => Promise<void>
  onGenerateReport?: () => Promise<void>
}

const menuItemClassName = cn(getBaseClassName(true), 'hover:bg-muted')

const ListingMoreActionsMenu = ({
  bulkActionLabel,
  BulkModal,
  reportLogContext = 'listing',
  onExport,
  onGenerateReport
}: Props) => {
  const t = useMessages()
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)

  const handleExport = async () => {
    if (!onExport || isExporting) return
    setIsExporting(true)
    try {
      await onExport()
    } finally {
      setIsExporting(false)
    }
  }

  const handleGenerateReport = async () => {
    if (isGeneratingReport) return
    if (!onGenerateReport) {
      mk_debug.info(`Generate ${reportLogContext} report`)
      return
    }
    setIsGeneratingReport(true)
    try {
      await onGenerateReport()
    } finally {
      setIsGeneratingReport(false)
    }
  }

  return (
    <>
      <Popover>
        <Popover.Trigger asChild>
          <Button
            type='button'
            variant='outline'
            aria-label={t('global.more-actions')}
          >
            <EllipsisVerticalIcon className='size-5' aria-hidden />
          </Button>
        </Popover.Trigger>
        <Popover.Content align='end' className='w-min max-w-72 space-y-1'>
          {bulkActionLabel ? (
            <Button
              type='button'
              variant='white'
              className={menuItemClassName}
              onClick={() => setIsBulkModalOpen(true)}
            >
              <FileSpreadsheetIcon className='size-5' aria-hidden />
              {bulkActionLabel}
            </Button>
          ) : null}
          <Button
            type='button'
            variant='white'
            disabled={isGeneratingReport}
            className={menuItemClassName}
            onClick={handleGenerateReport}
          >
            <FileTextIcon className='size-5' aria-hidden />
            {isGeneratingReport
              ? t('global.generating-report')
              : t('global.gen-report')}
          </Button>
          {onExport ? (
            <Button
              type='button'
              variant='white'
              disabled={isExporting}
              className={menuItemClassName}
              onClick={handleExport}
            >
              <DownloadIcon className='size-5' aria-hidden />
              {isExporting ? t('global.exporting') : t('global.export')}
            </Button>
          ) : null}
        </Popover.Content>
      </Popover>

      {BulkModal ? (
        <BulkModal open={isBulkModalOpen} onOpenChange={setIsBulkModalOpen} />
      ) : null}
    </>
  )
}

export default ListingMoreActionsMenu
