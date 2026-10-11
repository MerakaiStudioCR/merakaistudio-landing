import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { clearFormDraft, purgeCreationFormDraft } from './form-draft'

export function usePurgeCreationFormDraft(extraDraftKeys: string[] = []) {
  const pathname = usePathname()

  useEffect(() => {
    purgeCreationFormDraft(pathname)

    for (const key of extraDraftKeys) {
      clearFormDraft(key)
    }
  }, [extraDraftKeys, pathname])
}
