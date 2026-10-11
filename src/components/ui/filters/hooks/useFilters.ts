import { useContext } from 'react'
import FiltersContext from '../context/filters-context'

const useFilters = () => {
  const context = useContext(FiltersContext)

  if (!context) {
    throw new Error('useFilters must be used within FiltersProvider')
  }

  return context
}

export default useFilters
