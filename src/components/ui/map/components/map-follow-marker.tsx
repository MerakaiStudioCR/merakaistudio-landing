'use client'

import { useEffect } from 'react'
import { useMap } from '@vis.gl/react-google-maps'
import type { LatLngLiteral } from '../types'

interface Props {
  position: LatLngLiteral
  zoom: number
}

const MapFollowMarker = ({ position, zoom }: Props) => {
  const map = useMap()

  useEffect(() => {
    if (!map) return
    map.panTo(position)
    map.setZoom(zoom)
  }, [map, position, zoom])

  return null
}

export default MapFollowMarker
