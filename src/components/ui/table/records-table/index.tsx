import Table from '~/components/ui/table'

export interface RecordsTableColumn {
  key: string
  header: React.ReactNode
  headerClassName?: string
  cellClassName?: string
}

export interface RecordsTableProps {
  columns: RecordsTableColumn[]
  records: Record<string, unknown>[]
  emptyMessage?: string
  getCellValue?: (
    record: Record<string, unknown>,
    columnKey: string
  ) => React.ReactNode
  getRowKey?: (record: Record<string, unknown>, index: number) => string
  tableClassName?: string
}

function defaultCellValue(
  record: Record<string, unknown>,
  columnKey: string
): React.ReactNode {
  const value = record[columnKey]
  if (value == null || value === '') return '-'
  return String(value)
}

function defaultRowKey(
  record: Record<string, unknown>,
  columns: RecordsTableColumn[],
  index: number
): string {
  const contentKey = columns
    .map((column) => `${column.key}:${String(record[column.key] ?? '')}`)
    .join('|')

  return contentKey || `records-table-row-${index + 1}`
}

const RecordsTable = ({
  columns,
  records,
  emptyMessage,
  getCellValue = defaultCellValue,
  getRowKey,
  tableClassName
}: RecordsTableProps) => {
  if (!records.length) {
    return emptyMessage ? (
      <p className='text-muted-foreground text-sm'>{emptyMessage}</p>
    ) : null
  }

  return (
    <Table variant='records' className={tableClassName}>
      <Table.Head>
        <Table.Row>
          {columns.map((column) => (
            <Table.Header key={column.key} className={column.headerClassName}>
              {column.header}
            </Table.Header>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {records.map((record, index) => (
          <Table.Row
            key={
              getRowKey?.(record, index) ??
              defaultRowKey(record, columns, index)
            }
          >
            {columns.map((column) => (
              <Table.Cell key={column.key} className={column.cellClassName}>
                {getCellValue(record, column.key)}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default RecordsTable
