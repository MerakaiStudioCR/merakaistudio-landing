'use client'

import { createContext, type ReactNode } from 'react'
import type { LatLngLiteral } from '../types'

export interface MapContextValue {
  markerPosition: LatLngLiteral | null
  setMarkerPosition: (position: LatLngLiteral | null) => void
  getInitialPosition: () => LatLngLiteral
}

export interface MapProviderProps {
  children: ReactNode
  latLng?: LatLngLiteral
  autoDetectLocation?: boolean
  onMarkerChange?: (position: LatLngLiteral | null) => void
}

const MapContext = createContext<MapContextValue | undefined>(undefined)

export default MapContext
