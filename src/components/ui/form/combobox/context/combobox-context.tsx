'use client'

import { createContext } from 'react'
import type { ComboboxContextValue } from '../types'

// biome-ignore lint/suspicious/noExplicitAny: Generic context requires any
const ComboboxContext = createContext<ComboboxContextValue<any> | null>(null)

export default ComboboxContext
