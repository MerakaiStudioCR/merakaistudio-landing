function escapeCsvValue(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

export function downloadCsvReport(
  headers: string[],
  rows: string[][],
  filename: string
): void {
  const headerRow = headers.map(escapeCsvValue).join(',')
  const body = rows.map((row) => row.map(escapeCsvValue).join(','))
  const csv = [headerRow, ...body].join('\n')
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
