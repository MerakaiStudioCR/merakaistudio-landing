'use client'

import { useState, useCallback } from 'react'
import useMessages from '~/i18n/useMessages'

interface GeolocationPosition {
  lat: number
  lng: number
}

interface CurrentLocation {
  position: GeolocationPosition | null
  loading: boolean
  error: string | null
  getCurrentLocation: () => void
}

const useCurrentLocation = (): CurrentLocation => {
  const [position, setPosition] = useState<GeolocationPosition | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const t = useMessages('geolocation')

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError(t('not-supported'))
      return
    }

    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (geoPosition) => {
        const { latitude, longitude } = geoPosition.coords
        setPosition({ lat: latitude, lng: longitude })
        setLoading(false)
      },
      (err) => {
        mk_debug.error('Geolocation', { error: err.message, code: err.code })
        setError(t('error'))
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  }, [t])

  return {
    position,
    loading,
    error,
    getCurrentLocation
  }
}

export default useCurrentLocation
