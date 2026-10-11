import { createContext } from 'react'
import type { FiltersContextValue } from '../types/context.types'

const FiltersContext = createContext<FiltersContextValue | null>(null)

export default FiltersContext
