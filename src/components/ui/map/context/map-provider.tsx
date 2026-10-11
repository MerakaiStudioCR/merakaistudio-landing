'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import useCurrentLocation from '~/shared/hooks/useCurrentLocation'
import MapContext, { type MapProviderProps } from './map-context'
import type { LatLngLiteral } from '../types'

const MapProvider = ({
  children,
  latLng,
  autoDetectLocation = true,
  onMarkerChange
}: MapProviderProps) => {
  const { position: currentPosition, getCurrentLocation } = useCurrentLocation()
  const [markerPosition, setMarkerPosition] = useState<LatLngLiteral | null>(
    null
  )

  // Determine the initial position for the map and marker
  const getInitialPosition = useCallback((): LatLngLiteral => {
    if (latLng) {
      return latLng
    }
    if (autoDetectLocation && currentPosition) {
      return currentPosition
    }
    // Default fallback
    return { lat: 10.09, lng: -83.5 }
  }, [autoDetectLocation, currentPosition, latLng])

  // Get current location on mount only when needed
  useEffect(() => {
    if (autoDetectLocation && !latLng && !currentPosition) {
      getCurrentLocation()
    }
  }, [autoDetectLocation, latLng, currentPosition, getCurrentLocation])

  // Set marker position only when we have a definitive position
  useEffect(() => {
    if (latLng) {
      setMarkerPosition(latLng)
    } else if (autoDetectLocation && currentPosition) {
      setMarkerPosition(currentPosition)
      onMarkerChange?.(currentPosition)
    }
  }, [latLng, autoDetectLocation, currentPosition, onMarkerChange])

  // Handle marker position changes
  const handleSetMarkerPosition = useCallback(
    (position: LatLngLiteral | null) => {
      setMarkerPosition(position)
      onMarkerChange?.(position)
    },
    [onMarkerChange]
  )

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      markerPosition,
      setMarkerPosition: handleSetMarkerPosition,
      getInitialPosition
    }),
    [markerPosition, handleSetMarkerPosition, getInitialPosition]
  )

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>
}

export default MapProvider
