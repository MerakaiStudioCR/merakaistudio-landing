'use client'

import { useCallback } from 'react'
import {
  APIProvider,
  Map as GoogleMapsMap,
  AdvancedMarker as Marker,
  type MapMouseEvent
} from '@vis.gl/react-google-maps'
import MapFollowMarker from './components/map-follow-marker'
import { useMapContext } from './hooks/useMapContext'
import type { InteractiveMapProps } from './types'

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''
const DEFAULT_ZOOM = 12

const InteractiveGoogleMap = ({
  zoom = DEFAULT_ZOOM,
  onClick,
  readOnly = false
}: InteractiveMapProps) => {
  const { markerPosition, setMarkerPosition, getInitialPosition } =
    useMapContext()

  const handleMapClick = useCallback(
    (event: MapMouseEvent) => {
      if (readOnly) return

      const clickedPosition = event?.detail?.latLng ?? null

      if (clickedPosition) {
        setMarkerPosition(clickedPosition)
        onClick?.(clickedPosition)
      }
    },
    [onClick, readOnly, setMarkerPosition]
  )

  return (
    <APIProvider apiKey={API_KEY} language='es'>
      <GoogleMapsMap
        defaultZoom={zoom}
        defaultCenter={markerPosition || getInitialPosition()}
        gestureHandling='greedy'
        disableDefaultUI={!readOnly}
        zoomControl={readOnly}
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={readOnly}
        clickableIcons={false}
        onClick={readOnly ? undefined : handleMapClick}
        mapId='DEMO_MAP_ID'
      >
        {markerPosition && (
          <>
            <MapFollowMarker position={markerPosition} zoom={zoom} />
            <Marker position={markerPosition} />
          </>
        )}
      </GoogleMapsMap>
    </APIProvider>
  )
}

export default InteractiveGoogleMap
