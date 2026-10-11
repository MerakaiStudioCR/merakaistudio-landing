'use client'

import { useEffect } from 'react'

const DocumentLang = ({ locale }: { locale: string }) => {
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return null
}

export default DocumentLang
