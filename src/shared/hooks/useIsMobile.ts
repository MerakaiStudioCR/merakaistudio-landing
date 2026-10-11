import { useEffect, useState } from 'react'
import { SIDEBAR_MOBILE_BREAKPOINT } from '~/components/ui/sidebar/lib/constants'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>()

  useEffect(() => {
    const mql = window.matchMedia(
      `(max-width: ${SIDEBAR_MOBILE_BREAKPOINT - 1}px)`
    )
    const onChange = () => {
      setIsMobile(window.innerWidth < SIDEBAR_MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < SIDEBAR_MOBILE_BREAKPOINT)

    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}

export default useIsMobile
