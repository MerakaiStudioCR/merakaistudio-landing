import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const useQueryParams = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const syncQueryParams = useCallback(
    (params: Record<string, string>, keysToManage: string[]) => {
      const current = new URLSearchParams(searchParams?.toString())

      // Remove all managed keys first
      keysToManage.forEach((key) => current.delete(key))

      // Set new values
      Object.entries(params).forEach(([key, value]) => {
        if (value && value !== '') {
          current.set(key, value)
        }
      })

      router.replace(`${pathname}?${current.toString()}`)
    },
    [pathname, router, searchParams]
  )

  return { syncQueryParams }
}

export default useQueryParams
