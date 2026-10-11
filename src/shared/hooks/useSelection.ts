import { useContext } from 'react'
import SelectionContext from '../context/selection-context'

const useSelection = () => {
  const context = useContext(SelectionContext)
  if (context === undefined) {
    throw new Error('useSelection must be used within a SelectionProvider')
  }
  return context
}

export default useSelection
