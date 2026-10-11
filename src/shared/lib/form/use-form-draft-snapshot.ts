import { useEffect, useState } from 'react'
import { loadFormDraft, type FormDraft } from './form-draft'

export type FormDraftSnapshot<T> = FormDraft<T> | null | 'pending'

export const useFormDraftSnapshot = <T = Record<string, unknown>>(
  key: string | undefined
): FormDraftSnapshot<T> => {
  const [snapshot, setSnapshot] = useState<FormDraftSnapshot<T>>(() =>
    key ? 'pending' : null
  )

  useEffect(() => {
    if (!key) {
      setSnapshot(null)
      return
    }

    setSnapshot(loadFormDraft<T>(key))
  }, [key])

  return snapshot
}
