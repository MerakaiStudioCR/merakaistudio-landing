import { useEffect, useState } from 'react'

/** True only after the component has mounted on the client. */
const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}

export default useHasMounted
