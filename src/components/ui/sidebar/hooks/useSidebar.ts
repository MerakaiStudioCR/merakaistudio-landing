import { useContext } from 'react'
import SidebarContext from '../context/sidebar-context'
import type { SidebarContextProps } from '../context/sidebar-context'

const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }

  return context
}

export const useOptionalSidebar = (): SidebarContextProps | null =>
  useContext(SidebarContext)

export default useSidebar
