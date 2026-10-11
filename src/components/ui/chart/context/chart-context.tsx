import { createContext } from 'react'
import type { ChartContextValue } from '../types'

const ChartContext = createContext<ChartContextValue | null>(null)

export default ChartContext
